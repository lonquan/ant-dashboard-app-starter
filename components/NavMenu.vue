<template>
  <ul class="menu-nav shadow rounded overflow-y-auto overflow-x-hidden">
    <li class="menu-loop"
      v-for="(menu, idx) in menus"
      v-if="checkRoles(menu.auth)"
    >
      <div class="menu-title rounded"
        :class="{active: current.main === idx && !menu.sub}"
        @click="handleClickMenu(menu, idx)"
      >
        <i :class="menu.icon" class="icon"></i>
        <div class="title" v-text="menu.name"></div>
        <i class="menu-arrow el-icon-arrow-up" :class="{'menu-arrow-down': !menu.collapse}" v-if="menu.sub"></i>
      </div>
      <template v-if="menu.sub">
        <ul class="menu-sub" v-show="!menu.collapse">
          <li class="menu-sub-loop"
            v-for="(subMenu, subIdx) in menu.sub"
            :class="{'menu-group': subMenu.group}"
          >
            <div class="group-name" v-if="subMenu.group" v-text="subMenu.name"></div>
            <div class="menu-title rounded"
              v-else
              :class="{active: current.sub === subIdx && current.main === idx}"
              @click="handleClickSubMenu(subMenu, subIdx, menu, idx)"
            >
              <div class="title" v-text="subMenu.name"></div>
            </div>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: "NavMenu",
  data() {
    return {}
  },

  computed: mapState({
    menus: state => state.navMenu.menus,
    current: state => state.navMenu.current,
    roles: state => state.user.roles,
  }),

  methods: {
    ...mapMutations({
      open: 'navMenu/open',
      close: 'navMenu/close',
      select: "navMenu/select"
    }),

    checkRoles(needRoles) {
      if (!needRoles) {
        return true
      }

      return needRoles.findIndex(role => this.roles.findIndex(userRole => userRole === role) !== -1) !== -1
    },

    // 点击二级菜单
    handleClickSubMenu(subMenu, subIdx, menu, idx) {
      this.$router.push({ name: subMenu.route })
      this.select({
        main: idx,
        sub: subIdx,
      })
      this.open(idx)
    },

    // 点击菜单
    handleClickMenu(menu, index) {
      // 一级
      if (!menu.sub) {
        this.$router.push({ name: menu.route })
        this.select({ main: index })
        return
      }

      // 含二级
      menu.collapse ? this.open(index) : this.close(index)
    }
  }
}
</script>

<style scoped lang="scss">
.menu-nav {
  width: 200px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  user-select: none;
  padding: 0 10px;
  background: var(--nav-bg-color);

  .menu-loop {
    padding: 4px 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }
  }

  .menu-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: var(--font-color);
    list-style: none;
    cursor: pointer;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    background: var(--nav-bg-color);
    padding: 0px 10px;

    .icon {
      font-size: 20px;
    }

    .title {
      padding-left: 8px;
    }

    .menu-arrow {
      position: absolute;
      top: 15px;
      right: 10px;
      font-size: 18px;
      color: var(--font-color);
      transition: transform 0.2s linear;

      &.menu-arrow-down {
        transform: rotate(180deg);
      }
    }

    &:hover, &.active {
      background: var(--nav-hover-bg-color);
      color: $color-primary;
    }
  }

  .menu-sub {
    .menu-sub-loop {
      background: var(--nav-bg-color);
      padding: 4px 20px 0px 30px;

      .group-name {
        padding: 10px 10px 0;
        height: 38px;
        line-height: 28px;
        font-size: 12px;
        color: $text-color-grey;
        border-top: 1px solid var(--border-color);
      }

      .menu-title {
        height: 38px;
        line-height: 38px;
        font-size: 14px;

        .title {
          padding-left: 0px;
        }
      }
    }

    .menu-group:first-child {
      .group-name {
        padding: 0 10px;
        border-top: none;
        height: 28px;
      }
    }
  }
}
</style>
