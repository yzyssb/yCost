<template>
	<u-popup v-model="visible" mode="bottom">
		<view class="dialog">
			<view class="dialog-title">
				<text @click="cancel">取消</text>
				<view class="tabs">
					<text v-for="item in tabs" :key="item.value" :class="{active:tabValue==item.value}"
						@click="tabClick(item.value)">{{item.label}}</text>
				</view>
				<text @click="save">保存</text>
			</view>

			<scroll-view class="list" scroll-y style="height:600rpx;">
				<view class="item" v-for="item in list" :key="item.value" :class="{active:listValue==item.value}"
					@click="cateClick(item.value)">
					<view class="icon">{{item.label.slice(0,2)}}</view>
					<view class="title">{{item.label.slice(0,5)}}</view>
				</view>
			</scroll-view>

			<view class="fixed-bot" :style="{
				bottom:focus?keyboardH+'px':'0'
			}">
				<view class="input-box">
					<view class="input">￥{{money||'0.00'}}</view>
					<view class="date-remark">
						<view class="date" @click="showCalendar">
							<u-icon name="clock" size="20"></u-icon>
							<text>{{date.label}}</text>
						</view>
						<input type="text" placeholder="点击填写备注" :adjust-position="false" :fixed="true"
							@keyboardheightchange="hChange" @focus="inputFocus" @blur="inputBlur">
					</view>
				</view>
				<view class="keyboard" v-if="!focus">
					<text v-for="item in keys" :key="item" @click="numberClick(item)">{{item}}</text>
				</view>
			</view>
		</view>
	</u-popup>

	<u-calendar v-model="dateVisible" mode="date" @change="dateChange"></u-calendar>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	data () {
		const date = new Date(),
			Y = date.getFullYear(),
			M = date.getMonth() + 1,
			D = date.getDate()
		return {
			tabs: [{
					label: '支出',
					value: 1
				},
				{
					label: '收入',
					value: 2
				}
			],
			tabValue: 1,
			list: [{
					label: '购物',
					value: 1
				},
				{
					label: '住房住房住房',
					value: 2
				},
				{
					label: '通话',
					value: 3
				},
				{
					label: '汽车',
					value: 4
				},
				{
					label: '日用',
					value: 5
				},
				{
					label: '骑车',
					value: 6
				},
				{
					label: '游玩',
					value: 7
				},
				{
					label: '购物',
					value: 8
				},
				{
					label: '住房',
					value: 9
				},
				{
					label: '通话',
					value: 10
				},
				{
					label: '汽车',
					value: 11
				},
				{
					label: '日用',
					value: 12
				},
			],
			listValue: 1,
			keys: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'x'
			],
			money: '',
			focus: false,
			keyboardH: '0',
			today: `${Y}-${String(M).padStart(2,'0')}-${String(D).padStart(2,'0')}`,
			date: {
				label: '今日',
				value: `${Y}-${String(M).padStart(2,'0')}-${String(D).padStart(2,'0')}`
			},
			dateVisible: false,
		}
	},
	created () {
		uni.onKeyboardHeightChange(this.keyboardFun)
	},
	beforeDestroy () {
		uni.offKeyboardHeightChange(this.keyboardFun)
	},
	methods: {
		keyboardFun (res) {
			this.keyboardH = res.height
		},
		cancel () {
			this.$emit('close')
		},
		save () {
			this.cancel()
		},
		tabClick (value) {
			this.tabValue = value
		},
		cateClick (value) {
			this.listValue = value
		},
		numberClick (val) {
			if (val == 'x') {
				this.money = this.money.slice(0, -1)
			} else {
				this.money += val
			}
		},
		hChange (e) {
			let h = e.detail.height
			this.focus = h > 0
		},
		inputFocus () {
			this.focus = true
		},
		inputBlur () {
			this.focus = false
		},
		showCalendar () {
			this.dateVisible = true
		},
		dateChange (e) {
			this.date = {
				label: e.result == this.today ? '今日' : e.result,
				value: e.result
			}
		},
	}
}

</script>

<style lang="scss" scoped>
.dialog {
	background-color: #f4f4f4;
	padding-bottom: 700rpx;

	.dialog-title {
		@include space-between();

		>text:nth-child(1) {
			padding: 20rpx;
			@include font(28rpx, #999);
		}

		.tabs {
			padding: 4rpx;
			background-color: #e4e4e5;
			border-radius: 12rpx;
			@include flex();

			text {
				@include whb(70rpx, 40rpx, transparent);
				@include font(20rpx, #333);
				text-align: center;
				line-height: 40rpx;

				&.active {
					background-color: #fff;
					border-radius: 12rpx;
					color: #000;
				}
			}
		}

		>text:nth-child(3) {
			padding: 20rpx;
			@include font(28rpx, #71a0f4);
		}
	}

	.list {
		padding: 0 30rpx 30rpx;
		@include flex();
		flex-wrap: wrap;

		.item {
			width: 136rpx;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			.icon {
				@include whb(80rpx, 80rpx, #ececec);
				border-radius: 50%;
				text-align: center;
				line-height: 80rpx;
				@include font(28rpx, #333);
			}

			.title {
				@include font(24rpx, #333);
				text-align: center;
				margin-top: 6rpx;
			}

			&.active {
				.icon {
					background-color: #df6d5b;
					color: #fff;
				}
			}
		}
	}

	.fixed-bot {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		padding: 20rpx;

		.input-box {
			@include whb(100%, 100%, #fff);
			padding: 10rpx;
			border-radius: 12rpx;

			.input {
				@include font(40rpx, #de6450);
				padding: 20rpx;
			}

			.date-remark {
				padding: 20rpx;
				@include flex();
				border-top: 1rpx solid #e6e6e6;

				.date {
					background-color: #f4f4f5;
					padding: 4rpx 10rpx;
					border-radius: 50rpx;
					@include flex-center();
					@include font(24rpx, #333);

					text {
						margin-left: 6rpx;
					}
				}

				input {
					flex: 1;
					padding: 0 20rpx;
				}
			}
		}

		.keyboard {
			@include flex();
			flex-wrap: wrap;

			text {
				@include whb(calc((710rpx - 40rpx) / 3), 100rpx, #fff);
				@include font(32rpx, #333);
				border-radius: 12rpx;
				text-align: center;
				line-height: 100rpx;
				margin: 20rpx 20rpx 0 0;

				&:nth-child(3n+3) {
					margin-right: 0;
				}
			}
		}
	}
}

</style>
