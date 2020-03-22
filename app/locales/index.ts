import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'

const translationGetters = {
  en: () => require('../../resources/locales/en.json')
}

const translate = memoize(
  (key: any, config: any) => i18n.t(key, config),
  (key: string, config: any) => (config ? key + JSON.stringify(config) : key)
)

const setI18nConfig = () => {
  const fallback = { languageTag: 'en' }
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  translate.cache.clear()

  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

export default i18n;