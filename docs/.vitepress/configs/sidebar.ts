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

    // 当用户位于 `/src/javabase/` 目录时，会显示此侧边栏
    '/src/java/': [
        {
            text: '🍇 JavaSE',
            collapsed: true,
            items: [
                { text: '1、Java历史', link: '/src/java/javabase/Readme' },
                { text: '2、Java环境搭建', link: '/src/java/javabase/00.java环境搭建' },
                { text: '3、Java基础总结', link: '/src/java/javabase/00_java基础大总结' },
                { text: '4、Java继承', link: '/src/java/javabase/01_Java继承' },
                { text: '5、Java接口和内部类', link: '/src/java/javabase/02_Java_接口和内部类' },
                { text: '6、Java多态', link: '/src/java/javabase/03_Java_多态和内部类' },
                { text: '7、Java常用API与Collection集合', link: '/src/java/javabase/04_Java_常用API与Collection集合' },
                { text: '8、Java迭代器与List、Set集合', link: '/src/java/javabase/05_Java_迭代器与List、Set集合' },
                { text: '9、JavaMap集合', link: '/src/java/javabase/06_Java_Map集合' },
                { text: '10、Java异常与线程', link: '/src/java/javabase/07_Java_异常与线程' },
                { text: '11、Java线程池与并发', link: '/src/java/javabase/08_Java_线程池与并发' },
                { text: '12、Java Stream流与字节流', link: '/src/java/javabase/09_Java_Stream流与字节流' },
                { text: '13、Java各种流与属性集', link: '/src/java/javabase/10_Java_各种流与属性集' },
                { text: '14、Java网络编程与NIO', link: '/src/java/javabase/11_Java_网络编程与NIO' },
                { text: '15、Java注解反射与动态代理', link: '/src/java/javabase/12_Java_注解反射与动态代理' },
                { text: '16、Java XML和Dom4j', link: '/src/java/javabase/13_Java_XML和Dom4j' },
            ]
        },
        {
            text: '🍈 MySQL',
            collapsed: true,
            items: [
                { text: 'MySQL(一)', link: '/src/java/mysql/黑马MySQL(一)' },
                { text: 'MySQL(二)', link: '/src/java/mysql/黑马MySQL(二)' },
                { text: 'MySQL(三)', link: '/src/java/mysql/黑马MySQL(三)' },
                { text: 'MySQL(四)', link: '/src/java/mysql/黑马MySQL(四)' },
            ]
        },
        {
            text: '🍉 JDBC',
            collapsed: true,
            items: [
                { text: 'JDBC', link: '/src/java/jdbc/狂神说JDBC' },
            ]
        },
        {
            text: '🍊 JavaWeb',
            collapsed: true,
            items: [
                { text: '1、JavaWeb之Tomcat', link: '/src/java/javaweb/狂神说Tomcat' },
                { text: '2、JavaWeb之Servlet', link: '/src/java/javaweb/狂神说Servlet' },
                { text: '3、JavaWeb之Cookie和Session', link: '/src/java/javaweb/cookie和session' },
                { text: '4、JavaWeb之Filter和listener', link: '/src/java/javaweb/过滤器和监听器' },
                { text: '5、JavaWeb之JSP', link: '/src/java/javaweb/狂神说JSP' },
            ]
        },
        {
            text: '🍋 JavaEE',
            collapsed: true,
            items: [
                { text: '1、Spring(一)', link: '/src/java/javaee/传智spring(一)' },
                { text: '2、Spring(二)', link: '/src/java/javaee/传智spring(二)' },
                { text: '3、Spring(三)', link: '/src/java/javaee/传智spring(三)' },
                { text: '4、MyBatis(一)', link: '/src/java/javaee/传智mybatis' },
                { text: '5、MyBatis(二)', link: '/src/java/javaee/传智mybatis(二)' },
                { text: '6、SpringMvc(一)', link: '/src/java/javaee/传智SpringMvc(一)' },
                { text: '7、SpringMvc(二)', link: '/src/java/javaee/传智SpringMvc(二)' },
                { text: '8、SpringMvc(三)', link: '/src/java/javaee/传智SpringMvc(三)' },
                { text: '9、SSM整合', link: '/src/java/javaee/SSM整合' },
                { text: '10、SSM之Ajax', link: '/src/java/javaee/SSM框架课程扩展之Ajax学习' },
            ]
        },
        {
            text: '🍌 SpringBoot',
            collapsed: true,
            items: [
                { text: '1、SpringBoot(一)', link: '/src/java/springboot/三更SpringBoot(一)' },
                { text: '2、SpringBoot(二)', link: '/src/java/springboot/三更SpringBoot(二)' },
                { text: '3、SpringBoot(三)', link: '/src/java/springboot/三更SpringBoot(三)' },
                { text: '4、SpringBoot(四)', link: '/src/java/springboot/三更SpringBoot(三)' },
                { text: '5、SpringBoot(五)', link: '/src/java/springboot/三更SpringBoot(三)' },
            ]
        },
        {
            text: '🍇 SpringCloud',
            collapsed: true,
            items: [
                { text: '1、SpringCloud(一)', link: '/src/java/springcloud/SpringCloud(一)' },
                { text: '2、SpringCloud(二)', link: '/src/java/springcloud/SpringCloud(二)' },

            ]
        },
        {
            text: '🍈 Zookeeper',
            collapsed: true,
            items: [
                { text: '1、zookeeper(一)', link: '/src/java/zookeeper/zookeeper(一)' },
            ]
        },
        {
            text: '🍉 Dubbo',
            collapsed: true,
            items: [
                { text: '1、Dubbo(一)', link: '/src/java/dubbo/Dubbo(一)' },
            ]
        },
        {
            text: '🍊 Shiro',
            collapsed: true,
            items: [
                { text: '1、Shiro(一)', link: '/src/java/shiro/不良人Shiro(一)' },
                { text: '2、Shiro(二)', link: '/src/java/shiro/不良人Shiro(二)' },
            ]
        },
        {
            text: '🍋 RabbitMQ',
            collapsed: true,
            items: [
                { text: '1、RabbitMQ(一)', link: '/src/java/rabbitmq/RabbitMQ(一)' },
            ]
        },

    ],

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

    '/src/cloud/': [
        {
            text: '🍇 Nginx',
            collapsed: false,
            items: [
                { text: 'Nginx', link: '/src/cloud/nginx/狂神说Nginx' },
            ]
        },
        {
            text: '🍇 Redis',
            collapsed: false,
            items: [
                { text: '1、redis', link: '/src/cloud/redis/redis(一)' },
                { text: '2、redis', link: '/src/cloud/redis/redis(二)' },
                { text: '3、redis', link: '/src/cloud/redis/redis(三)' },
            ]
        },
        {
            text: '🍇 Docker',
            collapsed: false,
            items: [
                { text: '1、Docker(一)', link: '/src/cloud/docker/01_Docker' },
                { text: '2、Docker(二)', link: '/src/cloud/docker/02_Docker' },
                { text: '3、Docker(三)', link: '/src/cloud/docker/03_Docker' },
            ]
        },
        {
            text: '🍇 阿里云ACP',
            collapsed: false,
            items: [
                { text: '1、ACP云计算', link: '/src/cloud/acp/ACP云计算(一)' },
                { text: '2、ACP云计算', link: '/src/cloud/acp/ACP云计算(二)' },
            ]
        },

    ]
}




























