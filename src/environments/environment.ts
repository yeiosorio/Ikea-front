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
    // tenant_name: 'yapedev',
    clientId: 'FeJlnVolJoRke7LbtwEjYcSgLwgaqtVaMwzDhSpKveqhCEfV37JOQatjeCWZUQZk', // 'd2c60867-8042-4ae7-a73f-b45677b9eb71', // iksoADAbril
    authority_login: 'https://login.microsoftonline.com/common',
    // authority_login: 'https://yapedev.b2clogin.com/tfp/yapedev.onmicrosoft.com/B2C_1A_mfa_phone_or_email',
    // authority_reset: 'https://yapedev.b2clogin.com/tfp/yapedev.onmicrosoft.com/B2C_1_PasswordResetBackOfficeInterno',
    // redirectUri: 'https://wapceu2yaped20.azurewebsites.net/wait',
    // postLogoutRedirectUri: 'https://wapceu2yaped20.azurewebsites.net/wait',
    redirectUri: '/wait',
    postLogoutRedirectUri: '/wait',
    // codeUserFlowReset: 'AADB2C90118',
    // codeCancelUserFlow: 'AADB2C90091',
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
    inactivityTimer: 1500, // tiempo de inactividad en segundos (25min)
    clockTimer: 300 // tiempo del aviso en segundos (5min)
  },
  accessReport: 'ikea123456',
  accessReturn: 'ikso123456',
  // VV: sesion(v) permiso(v) -> Accede
  // VF: sesion(v) permiso(f) -> Hacer logout
  // FF: sesion(f) permiso(x) -> Hacer login
  statesLogin: ['VV','VF','FF']
};
