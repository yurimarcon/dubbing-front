import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify'],
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
  },
  css: ['~/assets/main.scss'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "@pinia/nuxt",
    "vue-clerk/nuxt"
  ],
  clerk: {
    appearance: { 
      variables: { colorPrimary: 'rgb(117, 89, 255)' },
      elements: {
        formButtonPrimary:'',
        socialButtonsBlockButton:'',
        socialButtonsBlockButtonText: '',
        formButtonReset:'',
        membersPageInviteButton:'',
        userButtonAvatarBox: '',
        card: '',
      },
    }
  },
  publicRuntimeConfig: {
    clerkFrontendApi: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
  },
  privateRuntimeConfig: {
    clerkApiKey: process.env.NUXT_CLERK_SECRET_KEY || '',
  },
  app: {
    head: {
      htmlAttrs:{
        lang:"pt-BR",
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap'}
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
