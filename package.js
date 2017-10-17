/* global Package */

Package.describe({
  name: 'orionsoft:banco-chile-notifications',
  version: '0.0.7',
  // Brief, one-line summary of the package.
  summary: 'Transactions notifications for Banco de Chile enterprise',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/orionsoft/banco-chile-notifications',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Npm.depends({cheerio: '0.19.0'})

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3')
  api.use('ecmascript')
  api.use('http')
  api.mainModule('main.js', 'server')
})

Package.onTest(function(api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('orionsoft:stripe-graphql')
  api.mainModule('main-tests.js')
})
