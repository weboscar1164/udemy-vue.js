<template>
	<div>
		<!-- filter -->
		<h2>{{ title | lowerCase | upperCase }}</h2>
		<p>{{ subTitle | lowerCase }}</p>
		<p>{{ number }}</p>
		<!-- filterを使うと他のデータ処理を行っても再計算してしまう -->
		<!-- パフォーマンスはcomputedが優れているが、書き方が冗長になる -->
		<button @click="number++">+1</button>
	</div>
</template>

<script>
import { hokkaidoNumber } from "@/hokkaidoNumber";
export default {
	mixins: [hokkaidoNumber],
	created() {
		console.log("created in components");
	},

	//カスタムディレクティブの作成（local）
	//directives内ではthisは使用できない
};
</script>
