import {HTTP} from 'meteor/http'
import querystring from 'querystring'
import moment from 'moment'
import getCookies from './getCookies'
import {Meteor} from 'meteor/meteor'

const makeRequest = function({cookies}) {
  const postData = querystring.stringify({
    accion: 'buscarOperaciones',
    initDate: moment()
      .subtract(1, 'day')
      .format('DD/MM/YYYY'),
    endDate: moment().format('DD/MM/YYYY'),
    ctaCorriente: 'TODAS',
    nada: 'nada'
  })

  const url =
    'https://www.empresas.bancochile.cl/GlosaInternetEmpresaRecibida/RespuestaConsultaRecibidaAction.do'
  const result = HTTP.post(url, {
    content: postData,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://www.empresas.bancochile.cl',
      Referer: url,
      Cookie: cookies
    }
  })

  if (!result.content.includes('div id="expoDato_child"')) {
    // console.log(result.content)
    throw new Error('Error de contenido')
  }
  return result.content
}

let cookies = null

export default function({rut, userRut, password}) {
  if (!cookies) {
    console.log('Refetching bchile cookies')
    cookies = getCookies({rut, userRut, password})
    console.log('cookies', cookies)
  }

  try {
    return makeRequest({cookies})
  } catch (error) {
    cookies = null
    console.error('BChile error:')
    console.error(error.message)
    Meteor._sleepForMs(30 * 1000)
  }
}
