/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '🍎PyAI 智穹',
        items: [
            {
                // 分组标题1
                text: 'PyThon基础',
                items: [
                    { text: 'Python Base', link: '/src/ai/python/python安装' },
                ],
            },
        ],
    },
]
