const request = require('retry-request', {
  request: require('request')
})

const iconv = require('iconv-lite')

const ROOT_URL = ({ type, page, city = 10 }) =>
  `${process.env.URI}/imoveis/locacao/${type}/${city}/ordem-imoveis.valor/pag-${page}`

const RENT_URL = url => `${process.env.URI}${url}`

const encoding = html =>
  iconv.decode(Buffer.concat(new Array(html)), 'latin1').toString()

const execute = url => {
  return new Promise((resolve, reject) => {
    const callable = (error, response, body) => {
      error && console.error(`${url}, had error.`)

      return !error ? resolve(encoding(body)) : reject(error)
    }

    request(
      {
        url,
        jar: true,
        followRedirect: true,
        followAllRedirects: true,
        maxRedirects: 3,
        encoding: null,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
        }
      },
      callable
    )
  })
}

const getAll = ({ page, type }) => execute(ROOT_URL({ page, type }))
const getByUrl = url => execute(RENT_URL(url))

module.exports = {
  getAll,
  getByUrl
}
