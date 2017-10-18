import getCookies from './getCookies'
import getData from './getData'
import Payments from './Payments'
import parseData from './parseData'
import {Meteor} from 'meteor/meteor'

const job = function({rut, userRut, password, callback}) {
  const cookies = getCookies({rut, userRut, password})
  const data = getData({cookies})
  const payments = parseData(data)

  for (const payment of payments) {
    const has = !!Payments.find({hash: payment.hash}).count()
    if (!has) {
      Payments.insert(payment)
      callback(payment)
    }
  }
}

const runJob = function(params) {
  try {
    while (true) {
      Meteor._sleepForMs(params.loopDuration)
      job(params)
    }
  } catch (error) {
    console.error('Error in banco de chile payments')
    console.error(error)
  }
}

export default function({rut, userRut, password, callback, loopDuration = 30000}) {
  Meteor.defer(function() {
    while (true) {
      runJob({rut, userRut, password, callback, loopDuration})
    }
  })
}
