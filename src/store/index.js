import Vue from "vue";
import Vuex from "vuex";
import count from "./modules/count";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);
export default new Vuex.Store({
	//moduleで分解したときに変数名が重複するとエラーになるが、
	//namespaced:trueを設定することで重複を避けることができる
	state: {
		message: "",
	},

	//modulesを用いて機能ごとの分割を行う
	getters,
	mutations,
	actions,
	modules: {
		count,
	},
});
