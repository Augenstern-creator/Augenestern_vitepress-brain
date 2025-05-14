/* 导航栏 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '🍉前端苍穹',
        items: [
            {
                // 分组标题1
                text: '前端三大件',
                items: [
                    { text: 'HTML', link: '/src/web/01_HTML/HTML(一)' },
                    { text: 'CSS', link: '/src/web/02_CSS/CSS(一)' },
                    { text: 'JavaScript', link: '/src/web/03_JavaScript/JavaScript(一)' },
                ],
            },
            {
                // 分组标题2
                text: '进阶玩法',
                items: [
                    { text: 'BootStrap', link: '/src/web/05_Bootstrap/Bootstrap(一)' },
                    { text: 'LayUI', link: '/src/web/06_LayUI/LayUI' },
                    { text: 'JQuery', link: '/src/web/07_jQuery/jQuery' },
                    { text: 'Ajax', link: '/src/web/08_ajax/黑马Ajax' },
                    { text: 'Echarts', link: '/src/web/09_Echarts/Echarts' },
                ],
            },
            {
                // 分组标题3
                text: '进阶玩法',
                items: [
                    { text: 'Node', link: '/src/web/10_Node/01_尚硅谷Node' },
                    { text: 'Vue3', link: '/src/web/11_Vue3/Vue3(一)' },
                    { text: 'WebPack', link: '/src/web/12_WebPack/01_尚硅谷WebPack5' },
                    { text: 'ElementPlus', link: '/src/web/14_Element Plus/01_Element Plus' },
                    { text: 'Ant Design of Vue', link: '/src/web/13_Ant Design of Vue/01_AntDesignVue' },
                    { text: 'TypeScript', link: '/src/web/15_TypeScript/01_TypeScript' },
                    { text: 'uni-app', link: '/src/web/16_uni-app/01_uni-app' },
                ],
            },
        ],
    },
    {
        text: '🍉Java星球',
        items: [
            {
                // 分组标题1
                text: 'Java基础',
                items: [
                    { text: 'JavaSE', link: '/src/java/javabase/Readme' },
                ],
            },
            {
                // 分组标题2
                text: 'Java进阶',
                items: [
                    { text: 'MySQL', link: '/src/java/mysql/黑马MySQL(一)' },
                    { text: 'JDBC', link: '/src/java/jdbc/狂神说JDBC' },
                ],
            },
            {
                // 分组标题3
                text: 'JavaWeb',
                items: [
                    { text: 'JavaWeb', link: '/src/java/javaweb/狂神说Tomcat' },
                ],
            },
            {
                // 分组标题4
                text: 'JavaEE',
                items: [
                    { text: 'Spring', link: '/src/java/javaee/传智spring(一)' },
                    { text: 'MyBatis', link: '/src/java/javaee/传智mybatis' },
                    { text: 'SpringMvc', link: '/src/java/javaee/传智SpringMvc(一)' },
                    { text: 'SpringBoot', link: '/src/java/springboot/三更SpringBoot(一)' },
                    { text: 'SpringCloud', link: '/src/java/springcloud/SpringCloud(一)' },
                ],
            },
        ],
    },
    {
        text: '🍉微筑云枢',
        items: [
            {
                // 分组标题1
                text: 'Nginx',
                items: [
                    { text: 'Nginx', link: '/src/cloud/nginx/狂神说Nginx' },
                ],
            },
        ],
    },
    {
        text: '🍎PyAI 智穹',
        items: [
            {
                // 分组标题1
                text: 'PyThon',
                items: [
                    { text: 'Python Base', link: '/src/ai/python/python安装' },
                ],
            },
            {
                // 分组标题2
                text: 'Java进阶',
                items: [
                    { text: 'MySQL', link: '/src/java/mysql/黑马MySQL(一)' },
                    { text: 'JDBC', link: '/src/java/jdbc/狂神说JDBC' },
                ],
            },
            {
                // 分组标题3
                text: 'JavaWeb',
                items: [
                    { text: 'JavaWeb', link: '/src/java/javaweb/狂神说Tomcat' },
                ],
            },
            {
                // 分组标题4
                text: 'JavaEE',
                items: [
                    { text: 'Spring', link: '/src/java/javaee/传智spring(一)' },
                    { text: 'MyBatis', link: '/src/java/javaee/传智mybatis' },
                    { text: 'SpringMvc', link: '/src/java/javaee/传智SpringMvc(一)' },
                    { text: 'SpringBoot', link: '/src/java/springboot/三更SpringBoot(一)' },
                    { text: 'SpringCloud', link: '/src/java/springcloud/SpringCloud(一)' },
                ],
            },
        ],
    },
]
