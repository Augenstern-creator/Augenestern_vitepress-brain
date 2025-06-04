/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '🎖️PyAI 智穹',
        items: [
            {
                // 分组标题1
                text: 'Py基座',
                items: [
                    { text: 'Python环境搭建', link: '/src/ai/python/python安装' },
                    { text: 'Python基础语法', link: '/src/ai/python/python' },
                    { text: 'Python函数提高', link: '/src/ai/python/python(二)' },
                    { text: 'Python文件操作', link: '/src/ai/python/python(三)' },
                ],
            },
            {
                // 分组标题2
                text: 'Py进阶',
                items: [
                    { text: 'Python面向对象', link: '/src/ai/python/python(四)' },
                    { text: 'Python多任务编程', link: '/src/ai/python/python(五)' },
                    { text: 'Python网络编程', link: '/src/ai/python/python(六)' },
                ],
            },
            {
                // 分组标题3
                text: 'Py可视化',
                items: [
                    { text: 'Pyecharts', link: '/src/ai/python/python(七)' },
                ],
            },
            {
                // 分组标题4
                text: 'PyWeb',
                items: [
                    { text: 'Django5', link: '/src/ai/python/python(八)' },
                    { text: 'Django5进阶', link: '/src/ai/python/python(十)' },
                    { text: 'Django5高阶', link: '/src/ai/python/python(十一)' },
                ],
            },
            {
                // 分组标题5
                text: 'Py客户端开发',
                items: [
                    { text: 'PyQt6', link: '/src/ai/python/python(九)' },
                ],
            },
            {
                // 分组标题6
                text: 'Py网络爬虫',
                items: [
                    { text: '网络爬虫', link: '/src/ai/python/python(十二)' },
                ],
            },
        ],
    },
    {
        text: '🏆人工智能',
        items: [
            {
                // 分组标题1
                text: '机器学习',
                items: [
                    { text: '机器学习基座', link: '/src/ai/MLearning/黑马人工智能(一)' },
                    { text: '机器学习相关算法(一)', link: '/src/ai/MLearning/黑马人工智能(二)' },
                    { text: '机器学习相关算法(二)', link: '/src/ai/MLearning/黑马人工智能(三)' },
                ],
            },
            {
                // 分组标题2
                text: 'Py进阶',
                items: [
                    { text: 'Python面向对象', link: '/src/ai/python/python(四)' },
                    { text: 'Python多任务编程', link: '/src/ai/python/python(五)' },
                    { text: 'Python网络编程', link: '/src/ai/python/python(六)' },
                ],
            },
            {
                // 分组标题3
                text: 'Py可视化',
                items: [
                    { text: 'Pyecharts', link: '/src/ai/python/python(七)' },
                ],
            },
            {
                // 分组标题4
                text: 'PyWeb',
                items: [
                    { text: 'Django5', link: '/src/ai/python/python(八)' },
                    { text: 'Django5进阶', link: '/src/ai/python/python(十)' },
                    { text: 'Django5高阶', link: '/src/ai/python/python(十一)' },
                ],
            },
            {
                // 分组标题5
                text: 'Py客户端开发',
                items: [
                    { text: 'PyQt6', link: '/src/ai/python/python(九)' },
                ],
            },
            {
                // 分组标题6
                text: 'Py网络爬虫',
                items: [
                    { text: '网络爬虫', link: '/src/ai/python/python(十二)' },
                ],
            },
        ],
    },
]
