import DefaultTheme from 'vitepress/theme'
//引入 var.css
import './style/index.css'
import {h,onMounted, watch, nextTick} from "vue";
// 首页文字下划线
import HomeUnderline from "./components/HomeUnderline.vue"
// 首页欢呼特效
import confetti from "./components/confetti.vue"
// 黑白切换视图过渡
import MyLayout from './components/MyLayout.vue'
// 图片缩放
import mediumZoom from 'medium-zoom';
import { useRoute,inBrowser } from 'vitepress';
// 顶部进度条
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
// 链接卡片
import Linkcard from "./components/Linkcard.vue"


// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined


export default {
    extends: DefaultTheme,
    Layout() {
        return h(MyLayout)
    },
    // 图片缩放
    setup() {
        const route = useRoute();
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },

    enhanceApp({app , router }) {

        // 注册全局组件: 首页文字下划线
        app.component('HomeUnderline' , HomeUnderline)
        // 注册全局组件: 首页欢呼特效
        app.component('confetti' , confetti)
        // 注册全局组件: 链接卡片
        app.component('Linkcard' , Linkcard)

        if (inBrowser) {
            NProgress.configure({ showSpinner: false })
            router.onBeforeRouteChange = () => {
                NProgress.start() // 开始进度条
            }
            router.onAfterRouteChanged = () => {
                NProgress.done() // 停止进度条
            }
        }
        // 彩虹背景动画样式
        if (typeof window !== 'undefined') {
            watch(
                () => router.route.data.relativePath,
                () => updateHomePageStyle(location.pathname === '/'),
                { immediate: true },
            )
        }

    },
}

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return

        homePageStyle = document.createElement('style')
        homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
        document.body.appendChild(homePageStyle)
    } else {
        if (!homePageStyle) return

        homePageStyle.remove()
        homePageStyle = undefined
    }
}





























