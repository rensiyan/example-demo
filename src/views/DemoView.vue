<template>
    <div>
        <Calendar v-model="value"  :locale="locale" hide-type="true" @on-next="onNext" @on-today="onToday">
            <template #month="{ data }">
                <div v-if="data.day === '2024-1-11'">
                    <div
                        style="
                            background-color: rgb(228, 23, 190);
                            width: 25px;
                            height: 25px;
                            float: right;
                            color: white;
                            border-radius: 5px;
                        "
                    >
                        休
                    </div>
                </div>
                <div style="padding-top: 0px" v-else>
                    <div
                        style="
                            background-color: rgb(18, 18, 123);
                            width: 25px;
                            height: 25px;
                            float: right;
                            color: white;
                            border-radius: 5px;
                            margin-bottom: 5px;
                        "
                         v-if="data.mouth === '2023-12-11'"
                    >
                        班
                    </div>
                    <div style="padding-top: 25px">
                        <div style="background-color: rgb(86, 220, 86); margin-bottom: 5px">白班：张三：产线1</div>
                        <div style="background-color: rgb(0, 136, 255)">夜班：李四：产线2</div>
                    </div>
                </div>
            </template>
            <!-- <template #header>
                <div style="display: flex; justify-content: space-between; width: 90%">
                    <div>
                        {{ value }}
                    </div>
                    <div style="width: 100px; display: flex; flex-wrap: nowrap">
                        <Button>上个月</Button>
                        <Button>本月</Button>
                        <Button  @click="onNext">下个月</Button>
                    </div>
                </div>
            </template> -->
        </Calendar>
    </div>
</template>
<script lang="ts" setup>
    const value = new Date();
    const locale = {
        today: '今天',
        type: {
        month: '月'
    },
        weekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    };
const onNext=()=>{
    console.log('next',);

}
const change=()=>{
    console.log('change');

}
const onToday=()=>{
    console.log('s');
    
}
</script>
