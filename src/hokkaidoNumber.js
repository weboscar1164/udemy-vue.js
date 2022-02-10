export const hokkaidoNumber = {
	data() {
		return {
			title: "Welcome to Hokkaido",
			subTitle: "Hokkaido has great nature",
			number: 0,
		};
	},

	filters: {
		lowerCase(value) {
			return value.toLowerCase();
		},
	},
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
