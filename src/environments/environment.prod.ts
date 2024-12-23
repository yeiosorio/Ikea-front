export const environment = {
  production: true,
  KEYENCRYPT: 'IKSO',
  country: 'CL',
  API_BASE: '/api',
  API_URL_MOCK: 'http://localhost:3000',
  orderDetail: 'iomc/orders',
  listStores: 'rlo/nodes',
  reasons: 'rlo/reasons',
  products: 'rlo/products',
  geographic: 'rlo/geographic/political',
  availability: 'rlo/orders/reserve/availability',
  reservation: 'rlo/orders/reservation/create',
  reverseOrder: 'rlo/orders/create',
  logisticDetail: 'rlo/orders/logistic/detail',
  politicalIdCL: 'c4d77661-939e-487a-b645-356f0429c719',
  returnBlock: true,
  MSAL_ADB2C: {
    clientId: process.env.PROD_AZURE_AD,
    authority_login: 'https://login.microsoftonline.com/common',
    redirectUri: '/wait',
    postLogoutRedirectUri: '/wait',
  },
  firebase: process.env.PROD_FIREBASE,
  inactivity: {
    inactivityTimer: 15000,
    clockTimer: 3000
  },
  accessReport: process.env.PROD_ACCESS_REPORT,
  accessReturn: 'ikso123456',
  statesLogin: ['VV','VF','FF']
};
