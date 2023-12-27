<template>
    <div class="page">
        输入月份数字<input v-model="inputVal" type="text" /><button @click="change">点击</button>
        <ul class="calendar">
            <li class="header">
                {{ new Date().getFullYear() + '年' + (currentMonth + 1) + '月' }}
            </li>
            <li class="week">
                <p>日</p>
                <p>一</p>
                <p>二</p>
                <p>三</p>
                <p>四</p>
                <p>五</p>
                <p>六</p>
            </li>
            <li class="row day">
                <span class="prevDay date" v-for="item in prevDays" :key="'A' + item">{{ item }}</span>
                <span v-for="item in currentDays" :key="'B' + item" class="nowDay date">{{ item }}</span>
                <span class="nextDay date" v-for="item in nextDays" :key="'A' + item">{{ item }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                week: ['日', '一', '二', '三', '四', '五', '六'],
                currentDay: new Date().getDate(),
                currentMonth: new Date().getMonth(),
                currentYear: new Date().getFullYear(),
                inputVal: '',
            };
        },
        computed: {
            currentMonthChinese() {
                return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'short' });
            },
            currentDays() {
                return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            },
            prevDays() {
                let data = new Date(this.currentYear, this.currentMonth, 0).getDate();
                let num = new Date(this.currentYear, this.currentMonth, 1).getDay();
                var days = [];
                while (num > 0) {
                    days.push(data--);
                    num--;
                }
                return days.sort();
            },
            nextDays() {
                const m = this.currentMonth + 1;
                let num = new Date(this.currentYear, m, 1).getDay();
                var days = [];
                let number = 0;
                while (num < 7) {
                    number++;
                    days.push(number);
                    num++;
                }
                return days.sort();
            },
        },
        methods: {
            change() {
                this.currentMonth = Number(this.inputVal) - 1;
            },
        },
    };
</script>

<style lang="scss">
    .calendar {
        width: 730px;
        .header {
            display: flex;
            align-items: center;
            height: 64px;
            background: #f9f9f9;
            border-radius: 4px 4px 0px 0px;
            border: 2px solid #f4f4f4;
            font-size: 28px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #404040;
            padding-left: 20px;
        }
        .week {
            display: flex;
            height: 64px;
            background: #fefefe;
            border: 2px solid #f4f4f4;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #404040;
            p {
                width: 100px;
                height: 64px;
            }
        }
        .row {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .day {
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            span {
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
            }
            .date {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 94px;
                background: #fefefe;
                border: 2px solid #f4f4f4;
                font-size: 28px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #9b9b9b;
            }
            .nowDay {
                background: #404040;
            }
        }
    }
</style>
