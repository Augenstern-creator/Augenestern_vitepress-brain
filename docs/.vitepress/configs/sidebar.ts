/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] =  {
    // 当用户位于 `/src/ai/python` 目录时，会显示此侧边栏
    '/src/ai/python': [
        {
            text: '🍇 Python基座',
            collapsed: false,
            items: [
                { text: 'Python环境搭建', link: '/src/ai/python/python安装' },
                { text: 'Python基础语法', link: '/src/ai/python/python' },
                { text: 'Python函数提高', link: '/src/ai/python/python(二)' },
                { text: 'Python文件操作', link: '/src/ai/python/python(三)' },
            ]
        },
        {
            text: '🍈 Python进阶',
            collapsed: false,
            items: [
                { text: 'Python面向对象', link: '/src/ai/python/python(四)' },
                { text: 'Python多任务编程', link: '/src/ai/python/python(五)' },
                { text: 'Python网络编程', link: '/src/ai/python/python(六)' },
            ]
        },
        {
            text: '🍉 Python可视化',
            collapsed: false,
            items: [
                { text: 'Pyecharts', link: '/src/ai/python/python(七)' },
            ]
        },
        {
            text: '🍊 PythonWeb',
            collapsed: false,
            items: [
                { text: 'Django5', link: '/src/ai/python/python(八)' },
                { text: 'Django5进阶', link: '/src/ai/python/python(十)' },
                { text: 'Django5高阶', link: '/src/ai/python/python(十一)' },
            ]
        },
        {
            text: '🍋 Python客户端开发',
            collapsed: false,
            items: [
                { text: 'PyQt6', link: '/src/ai/python/python(九)' },
            ]
        },
        {
            text: '🍌 Python网络爬虫',
            collapsed: false,
            items: [
                { text: '网络爬虫', link: '/src/ai/python/python(十二)' },
            ]
        },

    ],
    // 当用户位于 `/src/ai/MLearning` 目录时，会显示此侧边栏
    '/src/ai/MLearning': [
        {
            text: '🍇 机器学习',
            collapsed: false,
            items: [
                { text: '机器学习基座', link: '/src/ai/MLearning/黑马人工智能(一)' },
                { text: '机器学习相关算法(一)', link: '/src/ai/MLearning/黑马人工智能(二)' },
                { text: '机器学习相关算法(二)', link: '/src/ai/MLearning/黑马人工智能(三)' },
            ],
        },
        {
            text: '🍈 Python进阶',
            collapsed: false,
            items: [
                { text: 'Python面向对象', link: '/src/ai/python/python(四)' },
                { text: 'Python多任务编程', link: '/src/ai/python/python(五)' },
                { text: 'Python网络编程', link: '/src/ai/python/python(六)' },
            ]
        },
        {
            text: '🍉 Python可视化',
            collapsed: false,
            items: [
                { text: 'Pyecharts', link: '/src/ai/python/python(七)' },
            ]
        },
        {
            text: '🍊 PythonWeb',
            collapsed: false,
            items: [
                { text: 'Django5', link: '/src/ai/python/python(八)' },
                { text: 'Django5进阶', link: '/src/ai/python/python(十)' },
                { text: 'Django5高阶', link: '/src/ai/python/python(十一)' },
            ]
        },
        {
            text: '🍋 Python客户端开发',
            collapsed: false,
            items: [
                { text: 'PyQt6', link: '/src/ai/python/python(九)' },
            ]
        },
        {
            text: '🍌 Python网络爬虫',
            collapsed: false,
            items: [
                { text: '网络爬虫', link: '/src/ai/python/python(十二)' },
            ]
        },

    ],

}




























