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
                    { text: 'Django5进阶', link: '/src/bug/bug' },
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
                    { text: '机器学习基座', link: '/src/ai/Intelligence/MLearning/黑马人工智能(一)' },
                    { text: '机器学习相关算法(一)', link: '/src/ai/Intelligence/MLearning/黑马人工智能(二)' },
                    { text: '机器学习相关算法(二)', link: '/src/ai/Intelligence/MLearning/黑马人工智能(三)' },
                ],
            },
            {
                // 分组标题2
                text: '深度学习',
                items: [
                    { text: '神经网络', link: '/src/ai/Intelligence/DLearning/黑马深度学习(四)' },
                    { text: '卷积神经网络', link: '/src/ai/Intelligence/DLearning/黑马卷积神经网络CNN(五)' },
                ],
            },
            {
                // 分组标题2
                text: '李宏毅',
                items: [
                    { text: '李宏毅DeepLearning', link: '/src/ai/Intelligence/DLearning/LiHongYi/李宏毅深度学习(一)' },
                ],
            },
            {
                // 分组标题3
                text: '自然语言处理',
                items: [
                    { text: 'RNN模型', link: '/src/ai/Intelligence/NLP/黑马自然语言处理(六)' },
                    { text: 'Seq2Seq', link: '/src/ai/Intelligence/NLP/黑马自然语言处理(七)' },
                    { text: 'Transformer', link: '/src/ai/Intelligence/NLP/黑马Transformer(八)' },
                ],
            },
            {
                // 分组标题4
                text: '迁移学习',
                items: [
                    { text: 'Transfer Learning', link: '/src/ai/Intelligence/TLearning/黑马迁移学习(九)' },
                ],
            },
        ],
    },
    {
        text: '🏅AI库',
        items: [
            {
                // 分组标题1
                text: 'Pytorch',
                items: [
                    { text: 'Pytorch基座', link: '/src/ai/Tools/Pytorch/小土堆Pytorch(一)' },
                    { text: 'Pytorch进阶', link: '/src/ai/Tools/Pytorch/小土堆Pytorch(二)' },
                ],
            },
            {
                // 分组标题2
                text: '图表可视化',
                items: [
                    { text: 'Matplotlib', link: '/src/ai/Tools/Matplotlib/黑马Matplotlib(一)' },
                ],
            },
            {
                // 分组标题3
                text: '数据分析',
                items: [
                    { text: 'Numpy', link: '/src/ai/Tools/Numpy/黑马Numpy(一)' },
                ],
            },
            {
                // 分组标题4
                text: '数据标准化',
                items: [
                    { text: 'Pandas基座', link: '/src/bug/bug' },
                    { text: 'Pandas进阶', link: '/src/ai/Tools/Pandas/黑马Pandas(二)' },
                ],
            },
            {
                // 分组标题4
                text: '计算机视觉',
                items: [
                    { text: 'OpenCV', link: '/src/ai/Tools/OpenCV/黑马OpenCV(一)' },
                ],
            },
        ],
    },
]
