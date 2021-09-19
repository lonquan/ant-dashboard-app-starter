export const state = () => ({
  profile: {},
  authToken: null,
  roles: [],
})

export const mutations = {
  login(state, val) {
    state.profile = val.profile || {}
    state.authToken = val.token || null
    state.roles = val.roles || []
  },

  logout(state, val) {
    state.profile = {}
    state.authToken = null
    state.roles = []
  }
}
