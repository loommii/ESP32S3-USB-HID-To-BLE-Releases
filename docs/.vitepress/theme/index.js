import DefaultTheme from 'vitepress/theme'
import FirmwarePicker from './components/FirmwarePicker.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FirmwarePicker', FirmwarePicker)
  },
}
