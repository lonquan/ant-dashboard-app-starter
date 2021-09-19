import menus from '@/config/nav-menu'

export const state = () => ({
  menus: menus,
  current: {
    main: 0,
    sub: 0,
  },
})

export const mutations = {
  // 展开菜单
  open(state, idx) {
    state.menus[idx].collapse = false
  },

  // 折叠菜单
  close(state, idx) {
    // state.menus[idx].collapse = state.current.main === idx ? false : true
    state.menus[idx].collapse = true
  },

  // 选择菜单
  select(state, val) {
    state.current = {
      main: val.main || 0,
      sub: val.sub || 0,
    }
  }
}

export const getters = {}
