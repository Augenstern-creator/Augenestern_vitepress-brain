import { defineConfig } from 'vitepress'
import {nav} from "./configs";
import {sidebar} from "./configs/sidebar";
// MD的TODO
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
// 禁用F12
import vitepressProtectPlugin from "vitepress-protect-plugin"

import markdownItMark from 'markdown-it-mark'

export default defineConfig({
  lang: 'zh-CN',
  title: "锁の匠| AI Locksmith",
  description: "📖智能时代的安全锁匠",
  //fav图标
  head: [
    ['link',{ rel: 'icon', href: '/icon/favicon.ico'}],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }
    ]
  ],
  // 忽略死链接
  ignoreDeadLinks: true,
  //markdown配置
  markdown: {
    // 允许在 Markdown 中使用特殊字符
    breaks: true,

    image: {
      // 开启图片懒加载
      lazyLoading: true,
      // toc显示1-6级标题
    },
    // 开启 Markdown 扩展语法
    config: md => {
      // 启用高亮语法
      md.use(markdownItMark)
      // 启用Todo
      md.use(markdownItTaskCheckbox)
    },

  },

  themeConfig: {
    //左上角logo
    logo: '/logo.jpg',
    //本地搜索 //
    search: {
      provider: 'local'
    },
    // 子目录显示
    outline: {
      level: [1,5], // 显示1-5级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },
    //自定义上下页名 //
    docFooter: {
      prev: '上一章',
      next: '下一章',
    },

    // 导航栏
    nav,

    // 侧边栏
    sidebar,

    //社交链接 //
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      // Wechat
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: 'https://weixin.qq.com/',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat'
      },
      // QQ
      {
        icon: {
          svg: '<svg t="1745316394213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5746" width="200" height="200"><path d="M980.79827 694.105946c-21.144216-122.796973-109.844757-203.250162-109.844757-203.250162 12.647784-111.477622-33.792-131.26573-33.792-131.26573C827.392 14.668108 530.985514 20.67373 524.730811 20.839784 518.476108 20.67373 222.01427 14.668108 212.300108 359.590054c0 0-46.467459 19.788108-33.819676 131.26573 0 0-88.700541 80.453189-109.817081 203.250162 0 0-11.291676 207.484541 101.403676 25.40627 0 0 25.350919 69.161514 71.790703 131.26573 0 0-83.082378 28.256865-75.997405 101.625081 0 0-2.87827 81.836973 177.401081 76.218811 0 0 126.699243-9.852541 164.753297-63.515676l16.605405 0 0.276757 0 16.633081 0c38.026378 53.635459 164.725622 63.515676 164.725622 63.515676 180.224 5.618162 177.401081-76.218811 177.401081-76.218811 7.029622-73.368216-75.997405-101.625081-75.997405-101.625081 46.439784-62.104216 71.790703-131.26573 71.790703-131.26573C992.034595 901.590486 980.79827 694.105946 980.79827 694.105946z" p-id="5747"></path></svg>'
        },
        link: 'https://weixin.qq.com/',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'QQ'
      },
      // Gitee
      {
        icon: {
          svg: '<svg t="1745316558924" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6718" width="200" height="200"><path d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z" p-id="6719"></path></svg>'
        },
        link: 'https://weixin.qq.com/',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'QQ'
      },
    ],
  },

  vite: {
    plugins: [
      vitepressProtectPlugin({
        disableF12: false, // 禁用F12开发者模式
        disableCopy: true, // 禁用文本复制
        disableSelect: true, // 禁用文本选择
      }),
    ],
  },
})
