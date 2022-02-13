import Vue from "vue";
import App from "./App.vue";
import likeNumber from "./components/likeNumber.vue";

Vue.config.productionTip = false;
Vue.component("likeNumber", likeNumber);
// Vue.directive("border", {
// 	//オリジナルディレクティブの作成(基本の書き方)
// 	bind(el, binding, vnode) {
// 		//ディレクティブに初めて対象の要素に紐付いたとき
// 	},
// 	inserted(el, binding, vnode) {
// 		//親nodeに挿入されたとき
// 	},
// 	update(el, binding, vnode, oldVnode) {
// 		//コンポーネントが更新されるたび 子コンポーネントが更新される前
// 	},
// 	compornentUpdated(el, binding, vnode, oldVnode) {
// 		//コンポーネントが更新されるたび 子コンポーネントが更新されたあと
// 	},
// 	unbind(el, binding, vnode) {
// 		//ディレクティブが紐付いている要素から取り除かれたとき
// 	},
// });
Vue.directive("border", function (el, binding) {
	//省略記法（bindとupdateはほとんど同じ記述となり、他のメソッドはあまり使われないのでまとめてfunctionで宣言できる
	el.style.border = "solid black 2px";
	el.style.borderWidth = binding.value.width;
	el.style.borderColor = binding.value.color;
	//引数はargでとる
	el.style.borderStyle = binding.arg;
	//修飾子はif文で指定する
	if (binding.modifiers.round) {
		el.style.borderRadius = ".5rem";
	}
	if (binding.modifiers.shadow) {
		el.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.3)";
	}
});
Vue.filter("upperCase", function (value) {
	console.log("filter");
	return value.toUpperCase();
});

//グローバルでmixinを使用する場合は発火するタイミングが多いのでかなり注意する必要がある
//通常は使わない
Vue.mixin({
	created() {
		console.log("grobal mixin");
	},
});

new Vue({
	render: (h) => h(App),
}).$mount("#app");
