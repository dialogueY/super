/*
 * @Author: yangfeng
 * @Date: 2023-08-28 13:02:26
 * @LastEditors: yangfeng
 * @LastEditTime: 2023-08-28 13:13:08
 * @FilePath: \super\packages\components\src\main.ts
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// element plus
import ElementPlus from "element-plus";
// element css
import "element-plus/dist/index.css";

createApp(App).use(ElementPlus).mount('#app')
