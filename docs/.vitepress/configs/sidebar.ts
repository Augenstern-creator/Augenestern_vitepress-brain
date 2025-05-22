/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] =  {
    // 当用户位于 `/src/ai/` 目录时，会显示此侧边栏
    '/src/ai/': [
        {
            text: '🍇 Python',
            collapsed: false,
            items: [
                { text: '1、Python环境搭建', link: '/src/ai/python/python安装' },
                { text: '2、Python(一)', link: '/src/ai/python/python' },
                { text: '3、Python(二)', link: '/src/ai/python/python(二)' },
                { text: '4、Python(三)', link: '/src/ai/python/python(三)' },
                { text: '5、Python(四)', link: '/src/ai/python/python(四)' },
                { text: '6、Python(五)', link: '/src/ai/python/python(五)' },
                { text: '7、Python(六)', link: '/src/ai/python/python(六)' },
                { text: '8、Python(七)', link: '/src/ai/python/python(七)' },
                { text: '9、Python(八)', link: '/src/ai/python/python(八)' },
                { text: '10、Python(九)', link: '/src/ai/python/python(九)' },
                { text: '11、Python(十)', link: '/src/ai/python/python(十)' },
                { text: '12、Python(十一)', link: '/src/ai/python/python(十一)' },
                { text: '12、Python(十二)', link: '/src/ai/python/python(十二)' },

            ]
        },

    ],

}




























