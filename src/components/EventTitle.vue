<template>
	<div>
		<label class="animate__animeted animate__bounce" for="title"
			>タイトル</label
		>
		<input
			type="text"
			:value="value"
			@input="$emit('input', $event.target.value)"
		/>
		<pre>{{ value }}</pre>
	</div>
</template>

<script>
export default {
	props: ["value"],
};
</script>
