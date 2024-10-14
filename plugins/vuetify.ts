// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme:{
      defaultTheme: 'dark',
      themes:{
        light:{
          colors:{
            primary: 'rgb(117, 89, 255)',
            secondary: 'rgb(0, 191, 143)',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          }
        },
        dark:{
          colors:{
            primary: 'rgb(117, 89, 255)',
            secondary: 'rgb(0, 191, 143)',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
