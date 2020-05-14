import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.description,
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
      color: '#ffa069',
      throttle: 0,
      height: '2px'
  },

  /*
  ** Global CSS
  */
  css: [
      '~/assets/stylus/app.styl',
      '~/assets/stylus/mobile.styl',
      '~/assets/stylus/fonts.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      { src: '~/plugins/vue-scrollto', ssr: false },
      { src: '~/plugins/vue-line-clamp', ssr: false },
      { src: '~/plugins/vue-moment' },
      { src: '~/plugins/vue-click-outside' },
      { src: '~/plugins/vue-cookie' },
      { src: '~/plugins/vee-validate' },
      { src: '~/plugins/mixins'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: (process.env.NODE_ENV == "development") ? 'http://dc3e5bdf.ngrok.io' : 'http://api-riderev.designbluemanila.ph',
    // baseURL: (process.env.NODE_ENV == "development") ? 'http://c1b0206e.ngrok.io' : 'http://api-riderev.designbluemanila.ph',
    // baseURL: (process.env.NODE_ENV == "development") ? 'http://api.riderevolution.test' : 'http://api-riderev.designbluemanila.ph',
    credentials: false
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://riderev.designbluemanila.ph'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
