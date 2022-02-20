<template>
	<nav>
		<h2>Users</h2>
		<router-link class="link" active-class="link--active" exact to="/"
			>Home</router-link
		>
		<router-link class="link" active-class="link--active" exact to="/users/1"
			>Users</router-link
		>
	</nav>
</template>
<style scoped>
.link {
	margin-right: 1rem;
}

.link--active {
	font-size: 20px;
}
</style>
