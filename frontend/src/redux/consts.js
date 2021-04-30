const env = process.env.NODE_ENV

// const REACT_APP_PROD_BASE_URL='https://shopping-app-backend-api.herokuapp.com/api/v1/'
console.log(env === 'development')
const url = (env === 'development') ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PROD_BASE_URL
console.log(env)
console.log(process.env.REACT_APP_DEV_BASE_URL)
console.log(process.env.REACT_APP_PROD_BASE_URL)
export const baseUrl = url
