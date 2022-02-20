<template>
	<div>
		<h3>Home</h3>
		<button @click="toUsers">to Users</button>
		<p>{{ doubleCount }}</p>
		<p>{{ tripleCount }}</p>
		<input type="text" v-model="vmodelMessage" />
		<input type="text" :value="message" @input="updateMessage" />
		<p>{{ message }}</p>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	//gettersの取得（単体で取得する方法 namespace: true を使用する場合はgetters以降は配列で指定する）
	// computed: {
	// 	doubleCount() {
	// 		return this.$store.getters["count/doubleCount"];
	// 	},
	// 	tripleCount() {
	// 		return this.$store.getters["count/tripleCount"];
	// 	},
	// },

	//mapgetteresの使用(配列)
	// コンポーネント内にcpmputedを組み込む場合はスプレッド演算子を使用する
	computed: {
		...mapGetters("count", ["doubleCount", "tripleCount"]),
		message() {
			return this.$store.getters.message;
		},

		vmodelMessage: {
			get() {
				return this.$store.getters.message;
			},
			set(value) {
				this.$store.dispatch("updateMessage", value);
			},
		},
	},

	//mapgetteresの使用(オブジェクト)
	// computed: mapGetters({
	// 	myDoubleCount: "doubleCount",
	// }),
	methods: {
		updateMessage(e) {
			this.$store.dispatch("updateMessage", e.target.value);
		},
		toUsers() {
			this.$router.push({
				name: "users-id-profile",
				params: { id: 1 },
			});
		},
	},
};
</script>
