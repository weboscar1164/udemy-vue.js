<template>
	<!-- transition-group -->
	<!-- transition-groupとtransitonの違い -->
	<!-- 複数の要素を設定可能 必ずkeyを設定する transition-groupはspanタグとなる -->
	<!-- transitionのmodeが無い（必要ない） v-moveクラスを使用 -->
	<div>
		<ul
			style="
				list-style-type: none;
				text-align: center;
				width: 250px;
				margin: 0 auto;
				padding: 0;
			"
		>
			<transition-group class="list-fade" name="listFade">
				<slot> </slot>
			</transition-group>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},

	methods: {
		randomIndex() {
			return Math.floor(Math.random() * this.numbers.length);
		},
		add() {
			this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
			this.nextNumber += 1;
		},
	},
};
</script>

<style scoped>
/* scopedでカプセル化するとカスタム属性によって選別されてしまう */
/* これを回避するためにclassをつけて>>>を付する */
/* 単純なcomponentならばscopedを外すだけでよい */
.list-fade >>> .listFade-move {
	transition: transform 1s;
}
.list-fade >>> .listFade-enter {
	opacity: 0;
	/* 出現するときの最初の状態 */
}
.list-fade >>> .listFade-enter-active {
	transition: opacity 0.5s ease;
	/* 出現時のトランジションの状態 */
}
.list-fade >>> .listFade-enter-to {
	opacity: 1;
	/* 出現時の最後の状態 */
}
.list-fade >>> .listFade-leave {
	opacity: 1;
	/* 消えるときの最初の状態 */
}
.list-fade >>> .listFade-leave-active {
	transition: opacity 0.5s ease;
	position: absolute;
	width: 250px;
	/* 消えるときのトランジションの状態 */
}
.list-fade >>> .listFade-leave-to {
	opacity: 0;
	/* 消えるときの最後の状態 */
}
</style>
