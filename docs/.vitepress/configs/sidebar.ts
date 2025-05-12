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
                { text: '面向对象', link: '/src/web/03_JavaScript/JS面向对象(六)_面向对象' },
                { text: '高阶函数', link: '/src/web/03_JavaScript/JS面向对象(七)_高阶函数' },
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
            text: '🍰 Ajax',
            collapsed: false,
            items: [
                { text: '初识Ajax', link: '/src/web/08_ajax/黑马Ajax' },
                { text: 'Ajax进阶', link: '/src/web/08_ajax/黑马Ajax(二)' },
            ]
        },
        {
            text: '🧁 Echarts',
            collapsed: false,
            items: [
                { text: '初识Echarts', link: '/src/web/09_Echarts/Echarts' },
                { text: 'Echarts基础', link: '/src/web/09_Echarts/Echarts(二)' },
                { text: 'Echarts进阶', link: '/src/web/09_Echarts/Echarts(三)' },
            ]
        },
        {
            text: '🥧 Node',
            collapsed: false,
            items: [
                { text: '初识Node', link: '/src/web/10_Node/01_尚硅谷Node' },
                { text: 'Node模块化与npm', link: '/src/web/10_Node/02_尚硅谷Node' },
                { text: 'MongoDB数据库', link: '/src/web/10_Node/03_尚硅谷Mongodb' },
                { text: '接口与会话', link: '/src/web/10_Node/04_尚硅谷Node' },
                { text: 'pnpm包管理工具', link: '/src/web/10_Node/05_pnpm' },
            ]
        },
        {
            text: '🍫 Vue3',
            collapsed: false,
            items: [
                { text: '初识Vue3', link: '/src/web/11_Vue3/Vue3(一)' },
                { text: 'Vue3组件', link: '/src/web/11_Vue3/Vue3(二)' },
                { text: 'Vue3组合式API', link: '/src/web/11_Vue3/Vue3(三)' },
                { text: 'WebPack与Vite', link: '/src/web/11_Vue3/Vue3(四)' },
                { text: 'VueX', link: '/src/web/11_Vue3/Vue3(五)' },
                { text: 'axios', link: '/src/web/11_Vue3/axios(一)' },
                { text: 'Pinia', link: '/src/web/11_Vue3/Pinia(一)' },
            ]
        },
        {
            text: '🍫 Vue3',
            collapsed: false,
            items: [
                { text: '初识Vue3', link: '/src/web/11_Vue3/Vue3(一)' },
                { text: 'Vue3组件', link: '/src/web/11_Vue3/Vue3(二)' },
                { text: 'Vue3组合式API', link: '/src/web/11_Vue3/Vue3(三)' },
                { text: 'WebPack与Vite', link: '/src/web/11_Vue3/Vue3(四)' },
                { text: 'VueX', link: '/src/web/11_Vue3/Vue3(五)' },
                { text: 'axios', link: '/src/web/11_Vue3/axios(一)' },
                { text: 'Pinia', link: '/src/web/11_Vue3/Pinia(一)' },
            ]
        },
        {
            text: '🍬 WebPack',
            collapsed: false,
            items: [
                { text: '初识WebPack', link: '/src/web/12_WebPack/01_尚硅谷WebPack5' },
                { text: 'WebPack进阶', link: '/src/web/12_WebPack/02_尚硅谷WebPack5' },
                { text: 'WebPack高阶', link: '/src/web/12_WebPack/03_尚硅谷WebPack5' },

            ]
        },
        {
            text: '🍭 ElementPlus',
            collapsed: false,
            items: [
                { text: 'ElementPlus基础', link: '/src/web/14_Element Plus/01_Element Plus' },
                { text: 'ElementPlus进阶', link: '/src/web/14_Element Plus/02_Element Plus' },
            ]
        },
        {
            text: '🍯 Ant Design of Vue',
            collapsed: false,
            items: [
                { text: '初识Ant Design of Vue', link: '/src/web/13_Ant Design of Vue/01_AntDesignVue' },
            ]
        },
        {
            text: '🧉 TypeScript',
            collapsed: false,
            items: [
                { text: '初识TypeScript', link: '/src/web/15_TypeScript/01_TypeScript' },
                { text: 'TypeScript进阶', link: '/src/web/15_TypeScript/02_TypeScript' },
                { text: 'TypeScript高阶', link: '/src/web/15_TypeScript/03_TypeScript' },
            ]
        },
        {
            text: '🥂 uni-app',
            collapsed: false,
            items: [
                { text: '初识uni-app', link: '/src/web/16_uni-app/01_uni-app' },
            ]
        },
    ],

    // 当用户位于 `/src/java/` 目录时，会显示此侧边栏
    '/src/java/': [
        {
            text: '🍇 JavaSE',
            items: [
                { text: 'Java历史', link: '/src/java/Readme' },
                { text: 'Java环境搭建', link: '/src/java/00.java环境搭建' },
                { text: 'Java基础总结', link: '/src/java/00_java基础大总结' },
                { text: 'Java继承', link: '/src/java/00_java基础大总结' },
            ]
        },
        {
            text: '🍇 面向对象',
            items: [
                { text: '继承', link: '/src/java/01_Java继承' },
                { text: '接口和内部类', link: '/src/java/02_Java_接口和内部类' },
                { text: '多态', link: '/src/java/03_Java_多态和内部类' },
                { text: '常用API与Collection集合', link: '/src/java/04_Java_常用API与Collection集合' },
                { text: '迭代器与List、Set集合', link: '/src/java/04_Java_常用API与Collection集合' },
            ]
        },

    ]
}
