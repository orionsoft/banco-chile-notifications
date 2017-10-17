import moment from 'moment'
import parseBankAccount from './parseBankAccount'
import cheerio from 'cheerio'

export default function(data) {
  const $ = cheerio.load(data)

  const lines = $('#tablaLista tbody').find('tr')

  const payments = []

  lines.each(function(i, elem) {
    const payment = {}
    $(this)
      .find('td')
      .each(function(i, elem) {
        const text = $(this)
          .text()
          .trim()
        if (i === 0) {
          payment.date = moment(text, 'DD/MM/YYYY').toDate()
        }
        if (i === 1) {
          payment.origin = parseBankAccount(text)
        }
        if (i === 2) {
          payment.destiny = parseBankAccount(text)
        }
        if (i === 3) {
          payment.originName = text
        }
        if (i === 4) {
          payment.originRut = text.replace(/\./g, '')
        }
        if (i === 5) {
          payment.originBank = text
        }
        if (i === 6) {
          payment.amount = Number(text.replace(/[$.,]/g, ''))
        }
        if (i === 7) {
          payment.approved = text === 'Aprobada'
        }
      })
    payments.push(payment)
  })

  payments.reverse()

  const hashes = {}

  return payments
    .map(payment => {
      const date = moment(payment.date).format('DD/MM/YYYY')
      const hash = `${date}-${payment.origin}-${payment.originRut}-${payment.amount}`
      hashes[hash] = hashes[hash] ? hashes[hash] + 1 : 1
      const index = hashes[hash]
      return Object.assign({}, payment, {
        hash: index + '.' + hash,
        index
      })
    })
    .filter(payment => payment.approved)
}
