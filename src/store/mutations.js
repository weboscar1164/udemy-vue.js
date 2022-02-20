export default {
	//mutations以外でstateの値を変更しないようにする（可読性の向上・予期しないバグの排除）
	//component内でstateの変更は可能だが、規模が大きくなったら参照・変更の区別がつかずにコードが煩雑になりやすい
	//mutationは非同期的な書き方ができない
	updateMessage(state, newMessage) {
		state.message = newMessage;
	},
};
