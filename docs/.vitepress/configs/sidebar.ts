/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] =  {
    // 当用户位于 `/src/web/` 目录时，会显示此侧边栏
    '/src/web/': [
        {
            text: '🍦 HTML',
            collapsed: false,
            items: [
                { text: 'HTML', link: '/src/web/01_HTML/HTML(一)' },
                { text: 'HTML5', link: '/src/web/01_HTML/HTML5(二)' },
            ]
        },
        {
            text: '🍧 CSS',
            collapsed: false,
            items: [
                { text: 'CSS基础训练', link: '/src/web/02_CSS/CSS(一)' },
                { text: 'CSS三大特性', link: '/src/web/02_CSS/CSS(二)' },
                { text: 'CSS盒子模型', link: '/src/web/02_CSS/CSS(三)' },
                { text: 'CSS精灵图', link: '/src/web/02_CSS/CSS(四)' },
                { text: 'CSS移动布局', link: '/src/web/02_CSS/CSS(五)' },
            ]
        },
        {
            text: '🍨 JavaScript',
            collapsed: false,
            items: [
                { text: '初识JS', link: '/src/web/03_JavaScript/JavaScript(一)' },
                { text: 'DOM', link: '/src/web/03_JavaScript/JavaScript(二)_DOM' },
                { text: 'BOM', link: '/src/web/03_JavaScript/JavaScript(三)_BOM' },
                { text: '函数', link: '/src/web/03_JavaScript/JavaScript(四)_函数' },
                { text: '动画', link: '/src/web/03_JavaScript/JavaScript(四)' },
                { text: '对象', link: '/src/web/03_JavaScript/JavaScript(五)_对象' },
                { text: '面向对象', link: '/src/web/03_JavaScript/JavaScript(六)_面向对象' },
                { text: '高阶函数', link: '/src/web/03_JavaScript/JavaScript(七)_高阶函数' },
                { text: '补充知识点', link: '/src/web/03_JavaScript/JavaScript(八)_补充知识点' },
                { text: '初识ES6', link: '/src/web/03_JavaScript/JavaScript(九)_ES6' },
                { text: 'ES6-ES7', link: '/src/web/03_JavaScript/尚硅谷ES6' },
                { text: 'ES7-ES11', link: '/src/web/03_JavaScript/尚硅谷ES6(二)' },
            ]
        },
        {
            text: '🍩 Bootstrap',
            collapsed: false,
            items: [
                { text: 'BootStrap', link: '/src/web/05_Bootstrap/Bootstrap(一)' },
            ]
        },
        {
            text: '🍪 LayUI',
            collapsed: false,
            items: [
                { text: '初识LayUI', link: '/src/web/06_LayUI/LayUI' },
                { text: 'LayUI进阶', link: '/src/web/06_LayUI/LayUI(二)' },
            ]
        },
        {
            text: '🎂JQuery',
            collapsed: false,
            items: [
                { text: '初识JQuery', link: '/src/web/07_jQuery/jQuery' },
                { text: 'JQuery进阶', link: '/src/web/07_jQuery/jQuery(二)' },
            ]
        },
        {
            text: '🧁 Echarts',
            collapsed: false,
            items: [
                { text: '初识JQuery', link: '/src/web/07_jQuery/jQuery' },
                { text: 'JQuery进阶', link: '/src/web/07_jQuery/jQuery(二)' },
            ]
        },
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
