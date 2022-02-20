import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
// import Users from "./views/Users.vue";
// import UsersPosts from "./views/UsersPosts.vue";
// import UsersProfile from "./views/UsersProfile.vue";
// import HeaderHome from "./views/HeaderHome.vue";
// import HeaderUsers from "./views/HeaderUsers.vue";

//遅延ローディング vue cli3ではprefechでアイドル時間のうちに取得する（動的インポート）
//パフォーマンスに影響
const Home = () => import(/* webpackChunkName: "Home"*/ "./views/Home.vue");
const Users = () => import(/* webpackChunkName: "Users"*/ "./views/Users.vue");
const UsersProfile = () =>
	import(/* webpackChunkName: "UserProfile"*/ "./views/UsersProfile.vue");
const UsersPosts = () =>
	import(/* webpackChunkName: "UserPosts"*/ "./views/UsersPosts.vue");
const HeaderHome = () =>
	import(/* webpackChunkName: "HeaderHome"*/ "./views/HeaderHome.vue");
const HeaderUsers = () =>
	import(/* webpackChunkName: "Headerusers"*/ "./views/HeaderUsers.vue");

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			components: {
				default: Home,
				header: HeaderHome,
			},
			//特定のページ遷移時に処理を追加する
			beforeEnter(to, from, next) {
				console.log("beforeEnter");
				next();
			},
		},
		{
			path: "/users/:id",
			components: {
				default: Users,
				header: HeaderUsers,
			},
			props: {
				default: true,
				header: false,
			},
			children: [
				//pathに/をつけない
				{ path: "posts", component: UsersPosts },
				{ path: "profile", component: UsersProfile, name: "users-id-profile" },
			],
		},
		{
			path: "*",
			redirect: "/",
		},
	],
	scrollBehavior(to, from, savedPosition) {
		console.log(to, from, savedPosition);
		return new Promise((resolve) => {
			this.app.$root.$once("triggerScroll", () => {
				let position = { x: 0, y: 0 };
				if (savedPosition) {
					position = savedPosition;
				}
				if (to.hash) {
					position = {
						selector: to.hash,
					};
				}
				resolve(position);
			});
		});
		// if (to.hash) {
		// 	return {
		// 		selector: to.hash,
		// 		offset: { x: 0, y: 100 },
		// 	};
		// }
		// return { x: 0, y: 0 };
	},
});
