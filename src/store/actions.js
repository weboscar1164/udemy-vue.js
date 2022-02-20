export default {
	//非同期の処置を行うときはactionsを使用
	//getters・mutation・actionsいずれの方法でもcomponentにアクセスできるが、一つに絞ったほうが可読性は良い
	//ベストプラクティスではないが、ルールの作成は必要
	updateMessage({ commit }, newMessage) {
		commit("updateMessage", newMessage);
	},
};
