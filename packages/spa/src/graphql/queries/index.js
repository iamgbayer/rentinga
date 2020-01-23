export const listRents = `
  query listRents($garage: [Int], $bedroom: [Int], $total: [Int]) {
    listRents(
      filter: {
        garage: {
          between: $garage
        },
        rooms: {
          between: $bedroom
        },
        total: {
          between: $total
        }
      },
      limit: 99999
    ) {
      items {
        id,
        latitude,
        longitude,
        number,
        street,
        zip,
        city,
        title,
        price,
        tax,
        condominium,
        total,
        building,
        photos,
        suites,
        rooms,
        garage,
        neighborhood,
        type
      }
    }
  }
`

export const getRent = `
  query getRent($id: String) {
    getRents(id: $id) {
      id,
      latitude,
      longitude,
      number,
      street,
      zip,
      city,
      title,
      price,
      tax,
      condominium,
      total,
      building,
      photos,
      suites,
      rooms,
      garage,
      neighborhood,
      type
    }
  }
`
