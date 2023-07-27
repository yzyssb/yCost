import {
	createSSRApp
} from "vue";
import uView from "vk-uview-ui";
import App from "./App.vue";
export function createApp () {
	const app = createSSRApp(App);
	app.use(uView)
	// 如此配置即可
	uni.$u.config.unit = 'rpx'
	return {
		app
	};
}
