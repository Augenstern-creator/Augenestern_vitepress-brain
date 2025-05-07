/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] =  {
    // 当用户位于 `guide` 目录时，会显示此侧边栏
    '/src/web/': [
        {
            text: 'HTML',
            collapsed: false,
            items: [
                { text: 'HTML', link: '/src/web/HTML(一)' },
                { text: 'HTML5', link: '/src/web/HTML5(二)' },
            ]
        },
        {
            text: 'CSS',
            collapsed: false,
            items: [
                { text: 'CSS', link: '/src/web/HTML(一)' },
                { text: 'HTML5', link: '/src/web/HTML5(二)' },
            ]
        }
    ],

    // 当用户位于 `config` 目录时，会显示此侧边栏
    '/config/': [
        {
            text: 'Config',
            items: [
                { text: 'Index', link: '/config/' },
                { text: 'Three', link: '/config/three' },
                { text: 'Four', link: '/config/four' }
            ]
        }
    ]
}
