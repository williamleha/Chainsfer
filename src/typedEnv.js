// @flow
const env = ((process.env: any): {[string]: string}) // if you're sure that everything will be defined

function getChainsferAPIEndpoint () {
  if (env.NODE_ENV === 'development') {
    return env.REACT_APP_CHAINSFER_API_ENDPOINT_TEST
  }
  if (env.NODE_ENV === 'production') {
    return env.REACT_APP_CHAINSFER_API_ENDPOINT_PROD
  }
}

export default {
  REACT_APP_GOOGLE_CLIENT_ID: env.REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_GOOGLE_API_SCOPE: env.REACT_APP_GOOGLE_API_SCOPE,
  REACT_APP_GOOGLE_API_DISCOVERY_DOCS: env.REACT_APP_GOOGLE_API_DISCOVERY_DOCS,
  REACT_APP_NETWORK_NAME: env.REACT_APP_NETWORK_NAME,
  REACT_APP_INFURA_API_KEY: env.REACT_APP_INFURA_API_KEY,
  REACT_APP_BTC_NETWORK: env.REACT_APP_BTC_NETWORK,
  REACT_APP_LEDGER_API_URL: env.REACT_APP_LEDGER_API_URL,
  REACT_APP_BLOCKCYPHER_API_URL: env.REACT_APP_BLOCKCYPHER_API_URL,
  REACT_APP_DAI_ADDRESS: env.REACT_APP_DAI_ADDRESS,
  REACT_APP_BTC_FEE_ENDPOINT: env.REACT_APP_BTC_FEE_ENDPOINT,
  REACT_APP_CHAINSFER_API_ENDPOINT: getChainsferAPIEndpoint(),
  REACT_APP_PREFILLED_ACCOUNT_ENDPOINT: env.NODE_ENV === 'production' ? env.REACT_APP_PREFILLED_ACCOUNT_ENDPOINT : null
  // ...
}
