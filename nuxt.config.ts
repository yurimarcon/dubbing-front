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
  app: {
    head: {
      htmlAttrs:{
        lang:"pt-BR",
      },
      title: 'ClassDub',
      meta: [
        { hid: 'description', name: 'description', content: 'Traduza video aulas com poucos cliques.' },
        { hid: 'keywords', name: 'keywords', content: 'tradução, video, aula, video-aula, curso' },
        // Meta tags para redes sociais
        { hid: 'og:title', property: 'og:title', content: 'ClassDub' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'ClassDub' },
        { hid: 'og:description', property: 'og:description', content: 'Traduza video aulas com poucos cliques.' },
        { hid: 'og:image', property: 'og:image', content: 'https://classdub.com/web-app-manifest-512x512.png' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
        // { hid: 'og:url', property: 'og:url', content: 'https://classdub.com' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap'}
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ClassDub",
            "url": "https://classdub.com"
          }
        }
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
