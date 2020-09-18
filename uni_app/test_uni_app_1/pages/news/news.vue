<template>
	<view class="news">
		<view class="scroll-list">
			<view class="left">
				<view :key="index" v-for="(item, index) in titles" :class="{active: currentIndex === index}" @click="changeId(index)">
					{{item.title}}
				</view>
			</view>
			<scroll-view class="right" scroll-y :scroll-into-view="rightId" scroll-with-animation @scroll="scroll"
			 @scrolltolower="scrollToLower">
				<view class="scroll" :key="index" v-for="(item, index) in titles">
					<view class="title-right" :id="'title'+index">{{item.title}}</view>
					<view :key="ind" v-for="(it, ind) in item.list">
						<view>{{it}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'news',
		data() {
			return {
				titles: [{
						title: '字母',
						list: ['a', 'b', 'c', 'd']
					},
					{
						title: '数字',
						list: ['1', '2', '3', '4']
					},
					{
						title: '语言',
						list: ['java', 'python', 'c', 'c++']
					}
				],
				currentIndex: 0,
				rightId: '',
				scrollTop: 0,
				tops: null
			};
		},
		onReady() {
			this.querySelect()
		},
		methods: {
			clickId() {

			},
			changeId(index) {
				this.currentIndex = index
				this.rightId = 'title' + index
			},
			scroll(e) {
				// console.log(e)
				this.scrollTop = e.detail.scrollTop
				// console.log(this.tops)
				for (let i = 0; i < this.tops.length; i++) {
					let top1 = this.tops[i]
					let top2 = this.tops[i + 1]
					if (this.scrollTop > top1 && this.scrollTop < top2) {
						this.currentIndex = i
					}
				}
			},
			querySelect() {
				const query = uni.createSelectorQuery().in(this)
				query.selectAll('.title-right').boundingClientRect().exec(res => {
					let data = res[0]
					let tops = []
					data.map(item => {
						tops.push(item.top)
					})
					this.tops = tops
				})
			},
			scrollToLower() {
				this.currentIndex = this.tops.length - 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news .scroll-list {
		display: flex;
	}

	.news .scroll-list .left {
		width: 200rpx;
		height: 300rpx;
		border: 2rpx solid #007AFF;
	}

	.news .scroll-list .right {
		flex: 1;
		height: 300rpx;
		border: 2rpx solid #4CD964;
	}

	.title-right {
		background-color: blue;
		color: white;
	}

	.active {
		background-color: green;
		color: white;
	}
</style>
