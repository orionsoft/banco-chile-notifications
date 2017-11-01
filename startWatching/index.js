import getData from './getData'
import Payments from './Payments'
import parseData from './parseData'
import {Meteor} from 'meteor/meteor'

const job = function({rut, userRut, password, callback}) {
  const data = getData({rut, userRut, password})
  if (!data) return
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
      job(params)
      Meteor._sleepForMs(params.loopDuration)
    }
  } catch (error) {
    console.error('Error in banco de chile payments')
    console.error(error.message)
    Meteor._sleepForMs(params.loopDuration)
  }
}

export default function({rut, userRut, password, callback, loopDuration = 30000}) {
  Meteor.defer(function() {
    while (true) {
      runJob({rut, userRut, password, callback, loopDuration})
    }
  })
}
