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
                { text: 'Django5进阶', link: '/src/bug/bug' },
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
    '/src/ai/Intelligence': [
        {
            text: '🍇 机器学习',
            collapsed: false,
            items: [
                { text: '机器学习基座', link: '/src/ai/Intelligence/MLearning/黑马人工智能(一)' },
                { text: '机器学习相关算法(一)', link: '/src/bug/bug' },
                { text: '机器学习相关算法(二)', link: '/src/ai/Intelligence/MLearning/黑马人工智能(三)' },
            ],
        },
        {
            text: '🍈 深度学习',
            collapsed: false,
            items: [
                { text: '神经网络', link: '/src/ai/Intelligence/DLearning/黑马深度学习(四)' },
                { text: '卷积神经网络', link: '/src/ai/Intelligence/DLearning/黑马卷积神经网络CNN(五)' },
            ]
        },
        {
            text: '🍉 李宏毅',
            collapsed: false,
            items: [
                { text: '李宏毅DeepLearning', link: '/src/ai/Intelligence/DLearning/LiHongYi/李宏毅深度学习(一)' },
            ]
        },
        {
            text: '🍊 自然语言处理',
            collapsed: false,
            items: [
                { text: 'RNN模型', link: '/src/ai/Intelligence/NLP/黑马自然语言处理(六)' },
                { text: 'Seq2Seq', link: '/src/ai/Intelligence/NLP/黑马自然语言处理(七)' },
                { text: 'Transformer', link: '/src/ai/Intelligence/NLP/黑马Transformer(八)' },
            ]
        },
        {
            text: '🍋 迁移学习',
            collapsed: false,
            items: [
                { text: 'Transfer Learning', link: '/src/ai/Intelligence/TLearning/黑马迁移学习(九)' },
            ]
        },

    ],
    // 当用户位于 `/src/ai/Tools` 目录时，会显示此侧边栏
    '/src/ai/Tools': [
        {
            text: '🍇 Pytorch',
            collapsed: false,
            items: [
                { text: 'Pytorch基座', link: '/src/ai/Tools/Pytorch/小土堆Pytorch(一)' },
                { text: 'Pytorch进阶', link: '/src/ai/Tools/Pytorch/小土堆Pytorch(二)' },
            ],
        },
        {
            text: '🍈 图表可视化',
            collapsed: false,
            items: [
                { text: 'Matplotlib', link: '/src/ai/Tools/Matplotlib/黑马Matplotlib(一)' },
            ],
        },
        {
            text: '🍉 数据分析',
            collapsed: false,
            items: [
                { text: 'Numpy', link: '/src/ai/Tools/Numpy/黑马Numpy(一)' },
            ],
        },
        {
            text: '🍊 数据标准化',
            collapsed: false,
            items: [
                { text: 'Pandas基座', link: '/src/bug/bug' },
                { text: 'Pandas进阶', link: '/src/ai/Tools/Pandas/黑马Pandas(二)' },
            ],
        },
        {
            text: '🍋 计算机视觉',
            collapsed: false,
            items: [
                { text: 'OpenCV', link: '/src/ai/Tools/OpenCV/黑马OpenCV(一)' },
            ],
        },

    ],

}




























