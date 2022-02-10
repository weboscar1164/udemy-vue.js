<template>
	<div>
		<!-- 参照先に何も入っていないときはslot内の記述を表示する -->
		<slot name="title" :user="user"> <h1>デフォルトのタイトル</h1> </slot>
		<slot></slot>
		<hr />
		<slot name="contents"></slot>
		<!-- <p>{{ headerText }}</p> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				firstName: "Jack",
				lastName: "Donald",
			},
		};
	},
};
</script>
<style scoped>
h1 {
	color: red;
}
</style>
