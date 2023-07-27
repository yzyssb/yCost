<template>
	<view class="page">
		<view class="search-input">
			<u-input v-model="kw" placeholder="输入关键词" />
		</view>

		<view class="total">
			<view class="title">
				<u-icon name="rmb-circle"></u-icon>
				<text>总支出</text>
			</view>
			<view class="money">￥33,222.91</view>
			<view class="cont">
				<text>总收入 ￥101,473.43</text>
				<text>结余 ￥101,473.43</text>
			</view>
		</view>

		<view class="list">
			<view class="item" v-for="(item,index) in [1,2,3,4,5]" :key="index">
				<view class="date">
					<text>07/26 星期三</text>
					<text>支出：￥60.00 收入：￥300.00</text>
				</view>
				<view class="sub-list">
					<view class="sub-item">
						<text class="icon get">收</text>
						<view class="cont">
							<view class="type">其他</view>
							<view class="desc line-two">买了水果2斤 肉1斤</view>
						</view>
						<text>+￥300.00</text>
					</view>
					<view class="sub-item">
						<text class="icon ">支</text>
						<view class="cont">
							<view class="type">其他</view>
							<view class="desc line-two">描述描述描述描述描述</view>
						</view>
						<text>-￥300.00</text>
					</view>
				</view>
			</view>
		</view>

		<view class="fixed-plus" @click="visible=true">
			<u-icon name="plus" size="60" color="#fff"></u-icon>
		</view>
	</view>

	<custom-edit :visible="visible" @close="visible=false"></custom-edit>
</template>
<script>
import customEdit from './comEdit.vue'
export default {
	data () {
		return {
			kw: '',
			visible: false,
		}
	},
	components: {
		customEdit
	},
	onLoad () {},
	methods: {}
}

</script>
<style lang="scss" scoped>
.page {
	padding: 30rpx;

	.search-input {
		background-color: #fff;
		border-radius: 50rpx;
		overflow: hidden;

		:deep(.u-input__input) {
			padding: 0 40rpx;
		}
	}

	.total {
		@include box();
		padding: 20rpx;
		margin-top: 30rpx;

		.title {
			color: red;
		}

		.money {
			font-size: 40rpx;
			font-weight: bold;
			margin-top: 10rpx;
		}

		.cont {
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;

			text+text {
				margin-left: 40rpx;
			}
		}
	}

	.list {
		margin-top: 30rpx;

		.item {
			&+.item {
				margin-top: 20rpx;
			}

			.date {
				@include space-between();
				font-size: 24rpx;
				color: #999;
			}

			.sub-list {
				@include box();
				padding: 0 20rpx;
				margin-top: 10rpx;

				.sub-item {
					@include flex();
					padding: 20rpx 0;

					.icon {
						@include whb(80rpx, 80rpx, red);
						@include font(40rpx, #fff);
						border-radius: 50%;
						text-align: center;
						line-height: 80rpx;

						&.get {
							background-color: #95ec69;
						}
					}

					.cont {
						@include fx-1();
						margin-left: 20rpx;

						.type {
							font-weight: bold;
						}

						.desc {
							@include font(22rpx, #999);
						}
					}

					&+.sub-item {
						border-top: 1rpx solid #f8f8f8;
					}
				}
			}
		}
	}

	.fixed-plus {
		position: fixed;
		right: 40rpx;
		bottom: 100rpx;
		@include whb(100rpx, 100rpx, #d59d00);
		border-radius: 50%;
		@include flex-center();
	}
}

</style>
