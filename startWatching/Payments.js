import {Mongo} from 'meteor/mongo'

const BancoChilePayments = new Mongo.Collection('banco_chile_payments')
global.BancoChilePayments = BancoChilePayments
export default BancoChilePayments
