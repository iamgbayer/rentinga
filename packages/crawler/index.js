const crawler = require('./services/crawler')

module.exports.crawler = async (event, context, callback) => {
  return await crawler.execute({
    type: 'apartamentos'
  })
}
