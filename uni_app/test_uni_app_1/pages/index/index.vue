<template>
	<view class="content">
		<test :mes="mes" @mesEvent="mesEvent"></test>
	</view>
</template>

<script>
	import Test from '../../components/test.vue'

	export default {
		data() {
			return {
				title: 'Hello',
				mes: 'message'
			}
		},
		components: {
			Test
		},
		onLoad() {
			uni.$on('mesEvent', (mes) => {
				console.log(mes)
			})
		},
		methods: {
			mesEvent(mes) {
				// console.log(mes)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
