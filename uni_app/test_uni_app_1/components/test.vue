<template>
	<view>
		<text>组件{{mes}}</text>
		<button type="primary" @click="btnClick">点击</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			mes: {
				type: String,
				default () {
					return ''
				}
			}
		},
		methods: {
			btnClick() {
				/* this.$emit('mesEvent', {
					name: 'xjw',
					age: 18
				}) */
				uni.$emit('mesEvent', {
					name: 'xjw',
					age: 18
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
