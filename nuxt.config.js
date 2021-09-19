export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s管理系统 - 蚂蚁创想`,
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '蚂蚁创想' },
      // { name: 'color-scheme', content: 'light dark' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: false,

  router: {
    mode: 'history',
    middleware: [
      'authentication'
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/element-ui/element-variables.scss',
    '@/assets/style/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/persistedState.client.js' },
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/api-routes'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/device', //https://github.com/nuxt-community/device-module
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/setup
    '@nuxtjs/dotenv', // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/style-resources', // https://github.com/nuxt-community/style-resources-module
  ],

  styleResources: {
    scss: [
      '@/assets/style/vars/*.scss',
      '@/assets/style/abstracts/_mixins.scss',
    ],
    hoistUseStatements: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',  // https://github.com/nuxt-community/axios-module
    '@nuxtjs/dayjs', // https://github.com/nuxt-community/dayjs-module
  ],

  dayjs: {
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    defaultTimeZone: 'Asia/Shanghai',
    plugins: [
      'timezone'
    ]
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_HOST,
    },
    projectName: process.env.PROJECT_NAME,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    transpile: [/^element-ui/],
    // optimization: {
    //   runtimeChunk: 'single',
    //   minimize: undefined,
    //   minimizer: undefined,
    //   splitChunks: {
    //     chunks: 'all',
    //     automaticNameDelimiter: '.',
    //     maxAsyncRequests: 7,
    //     cacheGroups: {
    //       dingtalk_jsapi: {
    //         test: /node_modules[\\/]dingtalk-jsapi/,
    //         chunks: 'all',
    //         priority: 20,
    //         name: true
    //       },
    //       lodash: {
    //         test: /node_modules[\\/]lodash/,
    //         chunks: 'all',
    //         priority: 20,
    //         name: true
    //       },
    //       element_ui: {
    //         test: /node_modules[\\/]element-ui/,
    //         chunks: 'all',
    //         priority: 20,
    //         name: true
    //       }
    //     },
    //   },
    // },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    extend(config, ctx) {
    }
  }
}
