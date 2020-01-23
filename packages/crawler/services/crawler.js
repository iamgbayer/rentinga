const cheerio = require('cheerio')
const NodeGeocoder = require('node-geocoder')

const { getAll, getByUrl } = require('../infra/api')
const { persist } = require('../infra/repository')

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.API_KEY
})

const extract = async (type, html) => {
  const page = cheerio.load(html)
  const rents = page('.resultados_imoveis') || []

  return await Promise.all(
    rents
      .map(async (index, element) => {
        const rent = cheerio.load(element)

        const url =
          rent('.resultados_imoveis_listadescricao.resultados_imoveis_border')
            .find('.link_botao')
            .attr('href') || ''

        const id = String(
          /\/imoveis\/(\d+)\//.test(url)
            ? url.match(/\/imoveis\/(\d+)\//)[1]
            : 0
        )

        const title =
          rent('.resultados_imoveis_listatitulo .texto_laranja12').text() || ''

        const details = cheerio.load(await getByUrl(url))

        const city = details('.ficha_dadosprincipais_informacoes_medio')
          .last()
          .find('.texto_cinza16')
          .text()
          .replace(/\t/g, '')
          .trim()

        const address = details('.ficha_dadosprincipais_informacoes_maior')
          .last()
          .find('.texto_cinza16')
          .text()
          .replace(/\t/g, '')
          .trim()

        const building = details('.ficha_dadosprincipais_informacoes_maior')
          .first()
          .find('.texto_cinza16')
          .text()
          .replace(/\t/g, '')
          .trim()

        const [informative, value] = details('.texto_cinza11')
          .eq(1)
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')
          .split('$')

        const tax = informative.includes('IPTU')
          ? Number(value.trim().replace(',', '.'))
          : 0

        const condominium = informative.includes('condomínio')
          ? Number(value.trim().replace(',', '.'))
          : 0

        const price =
          Number(
            rent('.resultados_imoveis_listadescricao')
              .eq(0)
              .find('.texto_cinza18')
              .text()
              .slice(2)
              .trim()
              .replace(',', '.')
          ) || 0

        const updated = rent('.resultados_imoveis_listadata .texto_cinza11')
          .text()
          .split(':')
          .pop()
          .trim()

        const pages = {
          total:
            Number(
              page('.resultados_paginacao_descricao')
                .text()
                .match(/de (\d*)/)[1]
            ) || 0,
          current:
            Number(
              page('.resultados_paginacao_descricao')
                .text()
                .match(/P.gina (\d*) de/)[1]
            ) || 0
        }

        const spaces =
          rent('.resultados_imoveis_listadescricao')
            .first()
            .text() || ''

        const suitesExpression = /(\d+) su.te/
        const suites = Number(
          suitesExpression.test(spaces) ? spaces.match(suitesExpression)[1] : 0
        )

        const roomsExpression = /(\d+) quarto/
        const rooms = Number(
          roomsExpression.test(spaces) ? spaces.match(roomsExpression)[1] : 0
        )

        const garageExpression = /(\d+) vaga\(s\) de garagem/
        const garage = Number(
          garageExpression.test(spaces) ? spaces.match(garageExpression)[1] : 0
        )

        const area =
          rent('.resultados_imoveis_listadescricao')
            .last()
            .text() || ''

        const totalAreaExpression = /área total: ((\d+),(\d+)) m²/
        const totalArea = totalAreaExpression.test(area)
          ? area.match(totalAreaExpression)[1]
          : ''

        const privateExpression = /área privativa: ((\d+),(\d+)) m²/
        const private = privateExpression.test(area)
          ? area.match(privateExpression)[1]
          : ''

        const script = details('script:not([src])').filter(function() {
          return cheerio(this)
            .html()
            .includes('var mycarousel_itemList =')
        })

        const photos = cheerio(script).html()
          ? cheerio(script)
              .html()
              .match(/url:\s"(.*?)"/g)
              .map(photo => photo.slice(5))
          : []

        const total = price + tax + condominium

        await sleep(1000)

        const [geocoded] = await geocoder.geocode(`${address} ${city}`)

        return {
          id,
          title,
          city: geocoded.administrativeLevels.level2long,
          type,
          coordinates: {
            latitude: geocoded.latitude,
            longitude: geocoded.longitude
          },
          building,
          neighborhood: geocoded.extra.neighborhood,
          street: {
            number: geocoded.streetNumber,
            name: geocoded.streetName,
            zip: geocoded.zipcode
          },
          url,
          condominium,
          tax,
          price,
          updated,
          total,
          area: {
            totalArea,
            private
          },
          spaces: {
            suites,
            garage,
            rooms
          },
          photos,
          pages
        }
      })
      .toArray()
  )
}

const sleep = delay => {
  const start = new Date().getTime()
  while (new Date().getTime() < start + delay);
}

const recursivly = async ({ type, page = 0 }) => {
  const data = await extract(type, await getAll({ page, type }))
  const [first] = data

  if (first.pages.total > first.pages.current) {
    await persist(data)
    return recursivly({ page: first.pages.current, type })
  }
}

const execute = async ({ type }) => {
  return recursivly({ type })
}

module.exports = { execute }
