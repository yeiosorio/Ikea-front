export const environment = {
  production: false,
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
  politicalIdCL: 'df2bbdc8-5054-4ff5-af51-df4f3590e107',
  returnBlock: false,
  MSAL_ADB2C: {
    clientId: 'FeJlnVolJoRke7LbtwEjYcSgLwgaqtVaMwzDhSpKveqhCEfV37JOQatjeCWZUQZk',
    authority_login: 'https://login.microsoftonline.com/common',
    redirectUri: '/wait',
    postLogoutRedirectUri: '/wait',
  },
  firebase: '40KkFLZXIvDQO2KMRFySFcQFrb9Js4oAY3eca5JEWwuTj1hoaniZD3rNy8DqnA7jy9TLi5WjjIyhXUEBSVmbQh4neprIoGIpMD8gfIU5Qsdka66IJXr0mQoPkNpuXA3iGK7K/IzwMMRmyWLXy9w7KO0hvG/HR4mGB33C8JV29wQc/4kczsBZUY3aHynvWn51UJBt/7+xb/ECHVoSL3QwsNfRd/t53rlWyseJSSlDRb/fz34lmEVIjZPlP81K5teRfSeI4JaW1y9Bi1lAqwYW7SPh9V4RbMwVGolHOTQsMueqwnw8y7XE5KdcbeXf3RmobROgY2mJwrFj9L9nAOOS6a28B8fqx+q1IsHvlDJLPvs5ucoltsfhJuWa42gSleVZdSYeqJ2A6aIZnrQVygT8R4ZDOwTlq8AOsCMZTAj0nsA=',
  // firebase: {
  //   apiKey: "AIzaSyCHGWLuoTlzuIdVSRRTQTNQjqkbEOIWnno",
  //   authDomain: "ikso-corp-aggregator-desa.firebaseapp.com",
  //   projectId: "ikso-corp-aggregator-desa",
  //   storageBucket: "ikso-corp-aggregator-desa.appspot.com",
  //   messagingSenderId: "579052297162",
  //   appId: "1:579052297162:web:3b8795c6baaa804f2f4d33"
  // },
  inactivity: {
    inactivityTimer: 1500,
    clockTimer: 300
  },
  accessReport: 'ikea123456',
  accessReturn: 'ikso123456',
  statesLogin: ['VV','VF','FF']
};
