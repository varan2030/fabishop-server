'use strict';
var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
var CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-19', region: process.env.COGNITO_AWS_REGION });

export async function main(req, res, next) {

  const confirmationCode = req.query.code
  const username = req.query.username
  const clientId = req.query.clientId
  const region = req.query.region
  const email = req.query.email

  let params = {
    ClientId: clientId,
    ConfirmationCode: confirmationCode,
    Username: username
  }

  var confirmSignUp = CognitoIdentityServiceProvider.confirmSignUp(params).promise()

  confirmSignUp.then(
    (data) => {
      let redirectUrl = process.env.POST_REGISTRATION_VERIFICATION_REDIRECT_URL
      res.redirect(redirectUrl);
    }
  ).catch(
    (error) => {
      next(error)
    }
  )
}