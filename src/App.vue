<template>
	<div>
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
		<div>
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
import likeHeader from "@/components/likeHeader.vue";
import About from "./components/About.vue";
import Home from "./components/Home.vue";
import EventTitle from "./components/EventTitle.vue";
import CountNumber from "./components/CountNumber.vue";
export default {
	components: {
		likeHeader,
		About,
		Home,
		EventTitle,
		CountNumber,
	},
	data() {
		return {
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
		incrementNumber(value) {
			this.totalNumber = value;
		},
	},
};
</script>
<style scoped>
/* div {
	border: 1px solid blue;
}*/
/*slotは親要素のCSSが優先される*/
/*h1 {
	color: blue;
} */
</style>
