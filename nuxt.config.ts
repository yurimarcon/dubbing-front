import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
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
    "vue-clerk/nuxt",
    "@nuxtjs/pwa"
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
  app: {
    head: {
      htmlAttrs:{
        lang:"pt-BR",
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap'}
      ],
      script:[
        { src: 'https://js.stripe.com/v3/pricing-table.js' }
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
