export default [
  {
    name: '首页',
    auth: false,
    route: 'console-start',
    icon: 'el-icon-house',
    sub: false,
  },
  {
    name: '菜单',
    icon: 'el-icon-bangzhu',
    auth: false,
    collapse: false,
    sub: [
      {
        name: '菜单',
        route: 'console-merchant-market',
        auth: false,
      },
    ],
  },
  {
    name: '系统设置',
    icon: 'el-icon-set-up',
    auth: ['admin'],
    collapse: false,
    sub: [
      {
        name: '参数',
        route: 'console-setting-merchant',
        auth: ['admin'],
      },
      {
        name: '管理',
        route: 'console-setting-users',
        auth: ['admin'],
      },
    ],
  }
]
