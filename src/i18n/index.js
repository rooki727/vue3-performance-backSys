import { createI18n } from 'vue-i18n'
import messages from './langs/messages'
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'zhCn',
  messages
})

export default i18n
