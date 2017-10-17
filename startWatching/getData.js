import {HTTP} from 'meteor/http'
import querystring from 'querystring'
import moment from 'moment'

export default function({cookies}) {
  const postData = querystring.stringify({
    accion: 'buscarOperaciones',
    initDate: moment()
      .subtract(30, 'day')
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

  return result.content
}
