<template>
	<div>
		<h3>Users</h3>
		<router-link to="/users/1">ユーザー1</router-link>
		<router-link to="/users/2">ユーザー2</router-link>
		<hr />
		<h1>User No. {{ id }}</h1>
		<router-link :to="'/users/' + (Number(id) + 1) + '/profile?lang=ja'"
			>next user</router-link
		>
		<router-link
			:to="{
				name: 'users-id-profile',
				params: { id: Number(id) + 1 },
				query: { lang: 'ja', page: 2 },
			}"
			>next user</router-link
		>
		<router-view></router-view>
		<div style="height: 1200px"></div>

		<router-link
			id="next-user"
			:to="'/users/' + (Number(id) + 1) + '/profile?lang=ja'"
			>next user</router-link
		>
	</div>
</template>
<script>
export default {
	props: ["id"],
	beforeRouteEnter(to, from, next) {
		//他のページから遷移してきたとき、this.生成前に発火 this.が使えない(nextのクロージャーとしては使用可能)
		next((vm) => {
			console.log(vm.id);
		});
	},
	beforeRouteUpdate(to, from, next) {
		//データに変更があったときに発火
		next();
	},
	beforeRouteLeave(to, from, next) {
		//当該ページから別のページに遷移するときに発火
		const isLeave = window.confirm("このページを離れますか？");
		if (isLeave) {
			next();
		} else {
			next(false);
		}
	},
	// watch: {
	// 	$route(to, from) {
	// 		console.log(to);
	// 		console.log(from);
	// 		console.log("chaged $router");
	// 	},
	// },
};
</script>
