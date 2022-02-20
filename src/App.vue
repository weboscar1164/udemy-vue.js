<template>
	<div>
		<div style="width: 70%; margin: 0 auto; padding-top: 2rem">
			<router-view name="header"></router-view>
			<transition name="fade" mode="out-in" @before-enter="scrollBeforeEnter">
				<router-view></router-view>
			</transition>
		</div>
		<br />
		<hr />
		<div class="toggleOpacity">
			<!-- transitionのnameは動的に切り替えられる -->
			<div>
				<button @click="myAnimation = 'slide'">Slide</button>
				<button @click="myAnimation = 'fade'">Fade</button>
				<p>myAnimation: {{ myAnimation }}</p>
			</div>

			<br />
			<button @click="add()">add</button>
			<FadeGroup>
				<li
					style="
						cursor: pointer;
						background: lightgray;
						height: 1.6rem;
						border-radius: 0.8rem;
						margin-top: 0.5rem;
					"
					v-for="(number, index) in numbers"
					:key="number"
					@click="remove(index)"
				>
					{{ number }}
				</li>
			</FadeGroup>

			<!-- componentの切り替えをtransitionで制御する -->
			<div>
				<button @click="myComponent = 'componentA'">componentA</button>
				<button @click="myComponent = 'componentB'">componentB</button>
				<transition name="fade" mode="out-in">
					<component :is="myComponent"></component>
				</transition>
			</div>
			<br />
			<button @click="show = !show">change</button>
			<br />

			<!-- Javascriptフックを用いてtransitonを作成 -->
			<!-- Javascriptフックのみ使用する場合は:css="false"を明示的に指定 -->
			<!-- <transition
				:css="false"
				@before-enter="beforEnter"
				@enter="enter"
				@after-enter="afterEnter"
				@enter-cancelled="enterCancelled"
				@before-leave="beforLeave"
				@leave="leave"
				@after-leave="afterLeave"
				@leave-cancelled="leaveCancelled"
			> -->
			<transition
				:css="false"
				@before-enter="beforEnter"
				@enter="enter"
				@leave="leave"
			>
				<div class="circle" v-if="show"></div>
			</transition>

			<!-- 複数の要素をtransitionグループに使うときはv-ifを使う -->
			<!-- 複数の要素を切り替えるときに切り替えタイミングをmode属性で切り替える -->
			<transition name="fade" mode="out-in">
				<p v-if="show" key="night">Good night!</p>
				<p v-else key="morning">Good morning!</p>
			</transition>
			<!-- 外部プラグインなどclassを切り替えるときはenter-classとleave-classを使用する -->
			<transition
				name="fade"
				enter-active-class="animate__animated animate__bounce"
				enter-to-class=""
				leave-active-class="animate__animated animate__shakeY"
				leave-to-class=""
				appear
			>
				<p v-if="show">Hello</p>
			</transition>
			<transition :name="myAnimation" appear>
				<p v-if="show">bye</p>
			</transition>
		</div>

		<likeHeader>
			<template #[title]="slotProps">
				<h1>トータルのいいね数</h1>
				<h3>こんにちは、{{ slotProps.user.firstName }}さん</h3>
			</template>
			<p>いいねの数を表示します</p>
			<template v-slot:contents>
				<h2>{{ totalNumber }}</h2>
			</template>
		</likeHeader>
		<!-- <likeNumber :testProps="'いいねがつきました'"> </likeNumber> -->
		<!-- 子要素に設置した$emitを使用するためにv-onディレクティブを設置する -->
		<likeNumber
			:number="totalNumber"
			@my-click="totalNumber = $event"
		></likeNumber>
		<!-- v-onにはメソッドを指定することも可能 -->
		<likeNumber :number="totalNumber" @my-click="incrementNumber"> </likeNumber>
		<button @click="currentComponent = 'Home'">Home</button>
		<button @click="currentComponent = 'About'">About</button>
		<About v-if="currentComponent === 'About'"></About>
		<Home v-if="currentComponent === 'Home'"></Home>

		<keep-alive>
			<component :is="currentComponent"></component>
		</keep-alive>
		<div id="form">
			<h2>イベントのフォーム</h2>

			<EventTitle v-model="eventData.title"></EventTitle>
			<!-- 下記と同義 $eventを用いて子コンポーネントと双方向バインディングする -->
			<!-- <EventTitle
				:value="eventData.title"
				@input="eventData.title = $event"
			></EventTitle> -->

			<label for="title">最大人数</label>
			<input type="number" v-model.number="eventData.maxNumber" />
			<pre>{{ eventData.maxNumber }}:{{ typeof eventData.maxNumber }}</pre>

			<label for="host">主催者</label>
			<input id="host" type="text" v-model.trim="eventData.host" />
			<pre>{{ eventData.host }}</pre>

			<label for="detail">お問い合わせ内容</label>
			<textarea
				id="detail"
				cols="30"
				rows="10"
				v-model="eventData.detail"
			></textarea>
			<p style="white-space: pre">{{ eventData.detail }}</p>

			<input
				type="checkbox"
				name=""
				id="isPrivate"
				v-model="eventData.isPrivate"
			/>
			<label for="isPrivate">非公開</label>
			<p>{{ eventData.isPrivate }}</p>

			<p>参加条件</p>
			<input
				type="checkbox"
				name=""
				id="10"
				value="10代"
				v-model="eventData.target"
			/>
			<label for="10">10代</label>
			<input
				type="checkbox"
				name=""
				id="20"
				value="20代"
				v-model="eventData.target"
			/>
			<label for="20">20代</label>
			<input
				type="checkbox"
				name=""
				id="30"
				value="30代"
				v-model="eventData.target"
			/>
			<label for="30">30代</label>
			<p>{{ eventData.target }}</p>

			<p>参加費</p>
			<input type="radio" id="free" value="無料" v-model="eventData.price" />
			<label for="free">無料</label>
			<input type="radio" id="paid" value="有料" v-model="eventData.price" />
			<label for="paid">有料</label>
			<p>{{ eventData.price }}</p>

			<p>開催場所</p>
			<select v-model="eventData.location">
				<option v-for="location in locations" :key="location">
					{{ location }}
				</option>
			</select>
			<p>{{ eventData.location }}</p>
		</div>
	</div>
</template>
<script>
import FadeGroup from "./components/FadeGroup.vue";
import likeHeader from "@/components/likeHeader.vue";
import About from "./components/About.vue";
import Home from "./components/Home.vue";
import EventTitle from "./components/EventTitle.vue";
import CountNumber from "./components/CountNumber.vue";
import componentA from "./components/ComponentA.vue";
import componentB from "./components/ComponentB.vue";
export default {
	components: {
		FadeGroup,
		likeHeader,
		About,
		Home,
		EventTitle,
		CountNumber,
		componentA,
		componentB,
	},
	data() {
		return {
			nextNumber: 3,
			numbers: [0, 1, 2],
			myComponent: "componentA",
			myAnimation: "slide",
			show: true,
			totalNumber: 14,
			title: "title",
			currentComponent: "Home",
			locations: ["東京", "大阪", "名古屋"],
			eventData: {
				title: "",
				maxNumber: 0,
				host: "",
				detail: "",
				isPrivate: false,
				target: [],
				price: "無料",
				location: "東京",
			},
		};
	},

	methods: {
		scrollBeforeEnter() {
			this.$root.$emit("triggerScroll");
		},
		randomIndex() {
			return Math.floor(Math.random() * this.numbers.length);
		},
		add() {
			this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
			this.nextNumber += 1;
		},
		remove(index) {
			this.numbers.splice(index, 1);
		},

		//JavaScriptフック
		beforEnter(el) {
			el.style.transform = "scale(0)";
			//現れる前
		},
		enter(el, done) {
			let scale = 0;
			const interval = setInterval(() => {
				el.style.transform = `scale(${scale})`;
				scale += 0.05;
				if (scale >= 1) {
					clearInterval(interval);
					done();
				}
			}, 20);
			//現れるとき
			//引数doneはcssを併記したときには必要ない（css併記しないときは必須）
			//併記したときには長いほうが適用されるが、doneをつけることでcssが途中でも処理が停止する
		},
		// afterEnter(el) {
		// 	//現れたあと
		// },
		// enterCancelled(el) {
		// 	//現れるアニメーションがキャンセルされたとき
		// },
		// beforeLeave(el) {
		// 	//消える前
		// },
		leave(el, done) {
			let scale = 1;
			const interval = setInterval(() => {
				el.style.transform = `scale(${scale})`;
				scale -= 0.05;
				if (scale <= 0) {
					clearInterval(interval);
					done();
				}
			}, 20);
			//消えるとき
		},
		// afterLeave(el) {
		// 	//消えたあと
		// },
		// leaveCancelled(el) {
		// 	//消えるアニメーションがキャンセルされたとき
		// 	//v-showを使用したときのみ適用される
		// },
		incrementNumber(value) {
			this.totalNumber = value;
		},
	},
};
</script>
<style scoped>
.circle {
	width: 200px;
	height: 200px;
	margin: 1rem auto;
	border-radius: 100px;
	background: deeppink;
}

/* トランジショングループの作成 */
.fade-move {
	transition: transform 0.5s;
}
.fade-enter {
	opacity: 0;
	/* 出現するときの最初の状態 */
}
.fade-enter-active {
	transition: opacity 0.5s ease;
	/* 出現時のトランジションの状態 */
}
.fade-enter-to {
	opacity: 1;
	/* 出現時の最後の状態 */
}
.fade-leave {
	opacity: 1;
	/* 消えるときの最初の状態 */
}
.fade-leave-active {
	transition: opacity 0.5s ease;
	position: absolute;
	width: 100%;
	/* 消えるときのトランジションの状態 */
}
.fade-leave-to {
	opacity: 0;
	/* 消えるときの最後の状態 */
}

/* animationの作成 出現時のanimationのみの作成で出現、削除の両方対応できる */
.slide-enter,
.slide-leave-to {
	opacity: 0;
}
.slide-enter-active {
	animation: slide-in 0.5s;
	transition: opacity 0.5s;
}
.slide-leave-active {
	animation: slide-in 0.5s reverse;
	transition: opacity 0.5s;
}

@keyframes slide-in {
	from {
		transform: translateX(100px);
	}

	to {
		transform: translateX(0);
	}
}
.toggleOpacity {
	width: 70%;
	margin: 0 auto;
	padding-top: 5rem;
	text-align: center;
}
/* div {
	border: 1px solid blue;
}*/
/*slotは親要素のCSSが優先される*/
/*h1 {
	color: blue;
} */
</style>
