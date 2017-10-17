import {HTTP} from 'meteor/http'
import querystring from 'querystring'

export default function({rut, userRut, password}) {
  const postData = querystring.stringify({
    pagnav: 'privado/index',
    rut_emp: rut.split('-')[0],
    dv_emp: rut.split('-')[1],
    rut_apo: userRut.split('-')[0],
    dv_apo: userRut.split('-')[1],
    pin: password
  })

  const result = HTTP.post('https://www.empresas.bancochile.cl/cgi-bin/login', {
    content: postData,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://www.empresas.bancochile.cl',
      Referer: 'https://www.empresas.bancochile.cl/cgi-bin/navega?pagina=enlinea/login_fus'
    }
  })

  return result.headers['set-cookie']
    .map(setCookie => {
      return setCookie.split('path=/')[0]
    })
    .join('')
}
