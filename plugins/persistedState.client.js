// https://github.com/robinvdvleuten/vuex-persistedstate#readme
import createPersistedState from 'vuex-persistedstate'

// https://github.com/softvar/secure-ls
import SecureLS from "secure-ls"

let ls = new SecureLS({
  isCompression: false,
  // encodingType: 'aes',
  // encryptionSecret: 'app_secret_key',
  // encryptionNamespace: null,
})

export default ({ store }) => {
  createPersistedState({
    key: 'app_state',
    paths: [ // 指定仅需要持久化的数据
      'user.profile',
      'user.authToken',
      'user.roles',
      // 'navMenu.menus'
      'navMenu.current'
    ],
    // storage: {
    //   getItem: (key) => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   removeItem: (key) => ls.remove(key),
    // },
  })(store)
}
