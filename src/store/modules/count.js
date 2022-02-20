const state = {
	count: 2,
};
const getters = {
	doubleCount: (state) => state.count * 2,
	tripleCount: (state) => state.count * 3,
};
const mutations = {
	increment(state, number) {
		state.count += number;
	},
	decrement(state, number) {
		state.count -= number;
	},
};

const actions = {
	actionsIncrement(context, number) {
		context.commit("increment", number);
	},

	//第1引数をオブジェクトでとって記載の省略・用途の限定をすることもできる
	actionsDecrement({ commit }, number) {
		commit("decrement", number);
	},
};
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
