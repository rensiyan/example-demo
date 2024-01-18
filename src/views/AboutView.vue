<template>
  <div style="display: flex; justify-content: space-between;">


    <div>
      年：
      <Select v-model="model" style="width:200px" @on-change="selectYear">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      月：
      <Select v-model="month" style="width:200px" @on-change="selectMonth">
        <Option v-for="item in mouthList" :value="item.month" :key="item.month">{{ item.month }}</Option>
      </Select>
    </div>

    <div style="margin: 0px;">
      <Button type="" @click="preMonth">上个月</Button>
      <Button type="" @click="currMonth">本月</Button>
      <Button type="" @click="nextMonth">下个月</Button>

    </div>
  </div>
  <FullCalendar style="margin-top: 30px" class="calenderCon" ref="fullCalendar" :options="calendarOptions">

  </FullCalendar>
</template>
  
<script lang="ts" setup>
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multimonth from "@fullcalendar/multimonth";

import FullCalendar from "@fullcalendar/vue3"
import locale from "@fullcalendar/core/locales/zh-cn"
import { ref, onMounted } from 'vue'
const model = ref()
const month = ref()
const fullDay = ref()
const fullCalendar = ref()
// 数据格式（根据实际情况来,均为后台返回）：
const matchList = ref([
  {
    id: "1",
    title: "第一个任务",
    start: "2023-05-26 13:22:24",
    allDay: true,
    color: "#FECACA",
    textColor: "#6B7280"
  },
  {
    id: "11",
    title: "第二个任务",
    start: "2023-05-26 13:22:24",
    allDay: true,
    color: "#6EE7B7"
  },
  {
    id: "12",
    title: "第三个任务",
    start: "2023-05-26 13:22:24",
    allDay: true,
    color: "#93C5FD"
  },
  {
    id: "13",
    title: "劳动节",
    start: "2023-05-01 00:00:00",
    allDay: true,
    color: "#F59E0B",
    editable: false
  },
  {
    id: "2",
    title: "第二个任务",
    start: "2023-05-27 13:22:24",
    end: "2023-04-27 23:22:24",
    allDay: true,
    color: "#FBCFE8"
  },
  {
    id: "4",
    title: "第三个任务",
    start: "2023-05-28 13:22:24",
    end: "2023-04-28 23:22:24",
    allDay: true,
    color: "#EDE9FE"
  }
]);

const cityList = [{
  value: '2024',
  label: '2024'
},
{
  value: '2025',
  label: '2025'
},
{
  value: '2026',
  label: '2026'
},

]

const calendarOptions = ref({
  // 日历插件配置
  plugins: [dayGridPlugin, timeGridPlugin, multimonth],
  // 日历模式
  // initialView: 'dayGridMonth(月)',//dayGridWeek(周)/timeGridDay(时)/listWeek(周列表),

  headerToolbar: {
    left: "",
    center: "",
    right: "",
  },
  locale: "zh-cn", // 切换语言，当前为中文
  eventColor: "#ffffff", // 全部日历日程背景色
  // initialDate: proxy.$dayjs().format("YYYY-MM-DD"), // 自定义设置背景颜色时一定要初始化日期时间
  allDaySlot: false,
  height: "422px",
  // buttonText: {
  //   prev: "上个月",
  //   next: "下个月",
  //   today: "本月",
  //   day: "日",
  // },


  firstDay: 1,
  // 日程
  businessHours: {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Monday - Thursday
    startTime: "10:00", // a start time (10am in this example)
    endTime: "18:00", // an end time (6pm in this example)
  },
  // 强调日历上的特定时间段。默认为周一至周五，上午9点至下午5点。
  selectConstraint: {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Monday - Thursday
    startTime: "10:00", // a start time (10am in this example)
    endTime: "18:00", // an end time (6pm in this example)
  },

  // 限制用户选择特定的时间窗口。
  // 事件
  // eventClick: eventClick, // 点击日历日程事件
  // eventDrop: eventDrop, // 拖动日历日程事件
  // eventResize: eventResize, // 修改日历日程大小事件
  // select: handleDateSelect, // 选中日历格事件
  // eventDidMount: this.eventDidMount, // 安装提示事件
  // loading: loading, // 视图数据加载中、加载完成触发（用于配合显示/隐藏加载指示器。）
  // selectAllow: selectAllow, //编程控制用户可以选择的地方，返回true则表示可选择，false表示不可选择
  // eventMouseEnter: eventMouseEnter, // 鼠标滑过
  editable: true, // 是否可以进行（拖动、缩放）修改
  eventStartEditable: true, // Event日程开始时间可以改变，默认true，如果是false其实就是指日程块不能随意拖动，只能上下拉伸改变他的endTime
  eventDurationEditable: true, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
  selectable: true, // 是否可以选中日历格
  selectMinDistance: 10, // 选中日历格的最小距离
  dayMaxEvents: true,
  weekends: true, // 是否在任何日历视图中包括周六/周日列。
  navLinks: false, // 确定日名和周名是否可单击
  schedulerLicenseKey: "GPL-My-Project-Is-Open-Source", // 此配置是为了消除右下角的版权提示
  slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
  resourceAreaColumns: [
    {
      headerContent: "车型",
      field: "room_name",
    },
    {
      headerContent: "车牌",
      field: "car_code",
    },
  ],
  resourceAreaWidth: "15%",
  // resources: resourcesData.value,  // 后台给 渲染的数据
  events: matchList.value,// 后台给 渲染的数据
})


// matchList.value
// {
//   id: item.id,
//     resourceId: item.id,
//       title:
//   "用车人：" +
//     item.use_person_name +
//     " 用车时间：" +
//     item.start_time +
//     "~" +
//     item.end_time +
//     "用途：" +
//     item.purpose,
//     start: item.start_time,
//       end: item.end_time,
//         color: "yellow",
//           textColor: "black",

// }

//下一个月
const nextMonth = () => {
  let calendarApi = fullCalendar.value.getApi();
  calendarApi.next();

}
//上一个月
const preMonth = () => {
  let calendarApi = fullCalendar.value.getApi();
  calendarApi.prev();

}
let mouthList = []

//本月
const currMonth = () => {
  let calendarApi = fullCalendar.value.getApi();
  calendarApi.today();
  month.value = calendarApi.view.title.substring(5, 6)
  console.log( calendarApi.view.title.substring(5,6));
  
  model.value = calendarApi.view.title.substring(0, 4)
  // this.title = this.calendarApi.view.title;
  getFullList(model.value)

  console.log(calendarApi.view.title.substring(0, 5), "val");


}

//选择年
const selectYear = (val: any) => {
  getFullList(val)
  let calendarApi = fullCalendar.value.getApi();
  let newMonth=mouthList.filter(item=>item.month==month.value)
  calendarApi.gotoDate(newMonth[0].windowDate);
  
}
const selectMonth=(val:any)=>{
  let calendarApi = fullCalendar.value.getApi();
  let newMonth=mouthList.filter(item=>item.month==val)
  calendarApi.gotoDate(newMonth[0].windowDate);

}
const getFullList=(val:any)=>{
  mouthList=[]
  for (var i = 1; i < 13; i++) {
    let M = i < 10 ? "0" + i : i;
    mouthList.push({
      year: val,
      month: i.toString(),
      date: `${val}-${i}`,
      windowDate: `${val}-${M}-01`,
    });
  }
  console.log("mouthList",mouthList);

}
onMounted(() => {
  currMonth()
})
</script>
  
<style>
#Contain {
  width: 100%;
  height: 90%;
  margin: 0;
  padding: 0;
}

.el-table__fixed-right {
  height: 100% !important;
}

.calender-class {
  width: 100%;
  height: 100%;
}

.is-selected {
  color: #1989fa;
}

.el-calendar__body {
  height: 85vh;
}

.el-calendar-table {
  height: 100%;
}

.el-calendar-day {
  height: 100% !important;
}

.day-content-class {
  height: 100px;
  display: flex;
  flex-direction: column;
}

.header-class {
  flex: 1;
  display: flex;
  height: 28px;
  flex-direction: row;
  justify-content: space-between;
}

.day-class {
  flex: 4;
}

.handle-class {
  flex: 1;
}

.paiban-class {
  flex: 4;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}

.paiban-icon-class {
  font-size: 22px;
  margin: 8px 0 10px 0;
}

.paiban-name-class {
  padding-top: 10px;
}

.each-paiban-class {
  text-align: center;
  max-width: 50px;
  margin: 5px 5px 0 5px;
  border-radius: 5px;
  padding: 0 0 5px 0;
  flex: 1;
}

.zao-work-class {
  background-color: #d9ffd9;
  color: #11be11;
}

.wan-work-class {
  background-color: #fff0bd;
  color: #fccb2c;
}

.ye-work-class {
  background-color: #ddeffb;
  color: #2dabff;
}

.no-work-class {
  text-align: center;
  color: #cacaca;
}

.icon-class {
  font-size: 20px;
  margin-bottom: 20px;
}

/* 侧边弹窗 */
.add-btn-class {
  margin: 10px;
  float: right;
}

.change-date-drawer-class .el-calendar__body {
  height: 45%;
}

.change-date-drawer-class .day-content-class {
  height: 30px
}

.disabled-date-class {
  color: #ccc;
  pointer-events: none;
}
</style>