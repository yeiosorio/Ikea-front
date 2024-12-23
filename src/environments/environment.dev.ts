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
  firebase: '40KkFLZXIvDQO2KMRFySFUQyi/3YedowGvJEvZbaYIzA96cd1Not/H7k2U9Nw9ZTdFZh3Ee4G+PD3IpuNgPmuDqj3jnYysT4ef+bwJTeE+uCSHcTTOXeLtsTc9zFv/CZgQeNUJCxUne3DJ0k2/lr8pDr+r8zv7brpVmZTl6NzKZ1hSd0WQ0nhze4FTjujn0OfYp3SB96bkk6eEH6dmy71I0KXsk1AcSfcfmhGXdeEzlyEToe+KWhFRDPVSJn4JWo5WADwFjhdDYbXItb0t7OB3ppfoVAbpjIwkcZ3oPebN54cf+AUA5xTY5kTcnblkL5CT5TjBd++w9AIB2B+BTfrsoe00zfTv3vg8/+laPNBDyd1EZqpNj5N2KyQ/rXNxia5MkhQLKONlFqVCBJg/GenXHotChaB3bO1YHC89tV56JCmaPNfVcXtB8/1UAltpGv',
  // firebase: {
  //   apiKey: "AIzaSyCHGWLuoTlzuIdVSRRTQTNQjqkbEOIWnno",
  //   authDomain: "ikso-corp-aggregator-desa.firebaseapp.com",
  //   projectId: "ikso-corp-aggregator-desa",
  //   storageBucket: "ikso-corp-aggregator-desa.appspot.com",
  //   messagingSenderId: "579052297162",
  //   appId: "1:579052297162:web:3b8795c6baaa804f2f4d33"
  // },
  inactivity: {
    inactivityTimer: 15000,
    clockTimer: 3000
  },
  accessReport: 'ikea123456',
  accessReturn: 'ikso123456',
  statesLogin: ['VV','VF','FF']
};
