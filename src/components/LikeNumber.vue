<template>
	<div>
		<p>いいね！({{ halfNumber }}){{ testProps }}</p>
		<button @click="increment">+1</button>
	</div>
</template>

<script>
export default {
	//親コンポーネントからデータを受け取る
	//配列で指定する場合
	// props: ["number","testProps"],

	//オブジェクトで指定する場合
	props: {
		// number: String,//型が違うと警告が出る
		number: {
			type: Number,
			default: 10, //指定したpropsを使用しなかった場合の既定値 requiredと併用できない
			// reqired: true, //指定したpropsが必須かどうか defaultとは併用できない
		},
		testProps: {
			type: String,
		},
	},

	computed: {
		halfNumber() {
			return this.number / 2;
		},
	},

	methods: {
		increment() {
			//親コンポーネントへデータを送る際は$emitを使用する
			//第1引数にはデータの名称、第2引数に実際の処理を記載
			this.$emit("my-click", this.number + 1);
		},
	},
};
</script>

<style scoped>
/* div {
	border: 1px solid red;
} */
</style>
