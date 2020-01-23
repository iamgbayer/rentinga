const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
})

const persist = rents => {
  rents.map(async rent => {
    await dynamo
      .put({
        TableName: 'rents',
        Item: {
          id: rent.id,
          rentId: rent.id,
          title: rent.title,
          type: rent.type,
          latitude: rent.coordinates.latitude,
          longitude: rent.coordinates.longitude,
          city: rent.city,
          building: rent.building,
          neighborhood: rent.neighborhood,
          number: rent.street.number,
          street: rent.street.name,
          zip: rent.street.zip,
          url: rent.url,
          condominium: rent.condominium,
          tax: rent.tax,
          price: rent.price,
          updated: rent.updated,
          totalArea: rent.area.total,
          total: rent.total,
          privateArea: rent.area.private,
          suites: rent.spaces.suites,
          garage: rent.spaces.garage,
          rooms: rent.spaces.rooms,
          photos: rent.photos,
          pagesTotal: rent.pages.total,
          pagesCurrent: rent.pages.current
        }
      })
      .promise()
      .catch(console.error)
  })
}

module.exports = {
  persist
}
