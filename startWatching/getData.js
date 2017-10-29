import {HTTP} from 'meteor/http'
import getCookies from './getCookies'
import {Meteor} from 'meteor/meteor'

const makeRequest = function({cookies, listEndpoint}) {
  const result = HTTP.post(listEndpoint, {
    content: cookies
  })
  return result.data
}

let cookies = null

export default function({rut, userRut, password, listEndpoint}) {
  if (!cookies) {
    console.log('Refetching bchile cookies')
    cookies = getCookies({rut, userRut, password})
    console.log('cookies', cookies)
  }

  try {
    return makeRequest({cookies, listEndpoint})
  } catch (error) {
    cookies = null
    console.error('BChile error:')
    console.error(error)
    Meteor._sleepForMs(30 * 1000)
  }
}
