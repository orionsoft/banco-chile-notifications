# Banco de Chile payments notifications

```js
import {startWatching} from 'meteor/orionsoft:banco-chile-notifications'

startWatching({
  rut: process.env.BANCO_CHILE_RUT,
  userRut: process.env.BANCO_CHILE_USER_RUT,
  password: process.env.BANCO_CHILE_PASSWORD,
  callback: payment => {
    console.log('new payment', payment)
  }
})
```
