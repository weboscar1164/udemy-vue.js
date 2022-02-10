<template>
	<div>
		<!-- カスタムディレクティブの作成 -->
		<p v-border:solid.round.shadow="{ width: '3px', color: 'brown' }">
			Home(global)
		</p>
		<p v-border2:solid.round.shadow="{ width: '5px', color: 'blue' }">
			Home(local)
		</p>

		<!-- filter -->
		<!-- |で区切って複数のfilterを設置できる 機能が衝突するときはあとに設置したfilterが適用される -->
		<h2>{{ title | lowerCase | upperCase }}</h2>
		<p>{{ subTitle | lowerCase }}</p>
		<p>{{ number }}</p>
		<!-- filterを使うと他のデータ処理を行っても再計算してしまう -->
		<!-- パフォーマンスはcomputedが優れているが、書き方が冗長になる -->
		<button @click="number++">+1</button>
		<CountNumber></CountNumber>
	</div>
</template>

<script>
import CountNumber from "./CountNumber.vue";
import { hokkaidoNumber } from "@/hokkaidoNumber";
export default {
	mixins: [hokkaidoNumber],
	components: {
		CountNumber,
	},

	//カスタムディレクティブの作成（local）
	//directives内ではthisは使用できない
	directives: {
		border2(el, binding) {
			//省略記法（bindとupdateはほとんど同じ記述となり、他のメソッドはあまり使われないのでまとめてfunctionで宣言できる
			el.style.border = "solid black 2px";
			el.style.borderWidth = binding.value.width;
			el.style.borderColor = binding.value.color;
			//引数はargでとる
			el.style.borderStyle = binding.arg;
			//修飾子はif文で指定する
			if (binding.modifiers.round) {
				el.style.borderRadius = ".5rem";
			}
			if (binding.modifiers.shadow) {
				el.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.3)";
			}
		},
	},
};
</script>
