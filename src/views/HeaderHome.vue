<template>
	<nav>
		<h2>Home</h2>
		<router-link class="link" active-class="link--active" exact to="/"
			>Home</router-link
		>
		<router-link
			class="link"
			active-class="link--active"
			exact
			to="/users/1/#next-user"
			>Users</router-link
		>
		<button @click="increment(1)">mutations+1</button>
		<button @click="decrement(1)">mutations-1</button>
		<button @click="actionsIncrement(2)">action+2</button>
		<button @click="actionsDecrement(2)">action-2</button>
	</nav>
</template>
<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
	//mutations・actionsを個別に設定する（引数はmethodsに書き込む）
	// methods: {
	// 	increment() {
	// 		this.$store.commit("increment", 1);
	// 	},
	// 	decrement() {
	// 		this.$store.commit("decrement", 1);
	// 	},
	// actionsIncrement() {
	// 		this.$store.dispatch("actionsIncrement", 2);
	// 	},
	// 	actionsDecrement() {
	// 		this.$store.dispatch("actionsDecrement", 2);
	// 	},
	// },

	//mapMutation・mapActionsを用いて配列で指定（引数は使用する場所に記載）
	methods: {
		...mapMutations("count", ["increment", "decrement"]),
		...mapActions("count", ["actionsIncrement", "actionsDecrement"]),
	},
};
</script>
<style scoped>
.link {
	margin-right: 1rem;
}

.link--active {
	font-size: 20px;
}
</style>
