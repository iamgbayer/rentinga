import Amplify from 'aws-amplify'

Amplify.configure({
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_region: process.env.REACT_APP_REGION,
  aws_appsync_apiKey: process.env.REACT_APP_AUTH_KEY,
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_URL
})
