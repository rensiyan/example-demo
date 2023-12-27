<template>
  <!-- <div id="app-Contain"> -->
     <div class="calender-class">
       <div class="batch-add-Work-class">
         <el-button class="add-btn-class" size="small" type="primary" @click="batchAddDrawer = true">批量排班</el-button>
         <el-button class="add-btn-class" size="small" type="primary" @click="changeDateDrawer = true">日期选择</el-button>
       </div>
       <el-calendar>
         <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
         <template v-slot:dateCell="{  data }" >
           <div class="day-content-class">
             <template v-if="viewDate[data.day]">
               <div class="header-class">
                 <div class="day-class">
                   {{
                     data.day
                       .split("-")
                       .slice(1)
                       .join("-")
                   }}
                 </div>
                 <div class="handle-class">
                   <el-button icon="el-icon-edit" size="mini" circle @click="handleWorkInfo(viewDate[data.day], data)">
                   </el-button>
                 </div>
               </div>
               <div class="paiban-class">
                 <div v-for="(dayValue, i) in viewDate[data.day]" :class="[
                     'draggable-div' + i,
                     'each-paiban-class',
                     setWorkClass(dayValue.sort),
                   ]" draggable="true" @dragstart="handleDragStart($event, dayValue, data.day)"
                   @dragover.prevent="handleDragOver($event)" @dragenter="handleDragEnter($event, dayValue)"
                   @dragend="handleDragEnd()"
                  :key="i"
                   >
                   <i :class="[
                       setIconClass(dayValue.shiftName),
                       'paiban-icon-class',
                     ]"></i>
                   <div class="paiban-name-class">{{ dayValue.groupName }}</div>
                 </div>
               </div>
             </template>
             <template v-else>
               <div class="header-class">
                 <div class="day-class">
                   {{
                     data.day
                       .split("-")
                       .slice(1)
                       .join("-")
                   }}
                 </div>
                 <div class="handle-class">
                   <el-button icon="el-icon-edit" size="mini" circle @click="handleWorkInfo(viewDate[data.day], data)">
                   </el-button>
                 </div>
               </div>
               <div class="no-work-class">
                 <div class="icon-class"><i class="el-icon-date"></i></div>
                 <div class="tips-class">
                   暂无排班
                 </div>
               </div>
             </template>
           </div>
         </template>
       </el-calendar>
     </div>
    <!-- 批量排班抽屉弹窗 -->
     <div>
       <el-drawer title="批量排班" v-model:visible="batchAddDrawer" size="40%">
         <div class="demo-drawer__content">
           <el-form :model="batchAddForm">
             <el-form-item label="排班日期" label-width="80px">
               <el-date-picker v-model="batchAddForm.batchDate" value-format="yyyy-MM-dd" type="daterange"
                 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
               </el-date-picker>
             </el-form-item>
             <el-button type="primary" icon="el-icon-plus" circle @click="addDomain"></el-button>
             <el-form-item label-width="80px" v-for="(data, index) in batchAddForm.classData"
               :label="'排班' + (index + 1) + '：'" :key="data.key">
               <p></p>
               <span>班次：</span>
               <el-radio-group v-model="data.shiftName">
                 <el-radio label="早">早</el-radio>
                 <el-radio label="中">中</el-radio>
                 <el-radio label="晚">晚</el-radio>
               </el-radio-group>
               <p></p>
               <span>班别：</span>
               <el-radio-group class="margin-left:80px" v-model="data.groupName">
                 <el-radio label="甲">甲</el-radio>
                 <el-radio label="乙">乙</el-radio>
                 <el-radio label="丙">丙</el-radio>
               </el-radio-group>
               <el-button class="remove-domain-class" @click.prevent="removeDomain(data)" type="danger"
                 icon="el-icon-delete" circle></el-button>
             </el-form-item>
           </el-form>
         </div>
         <div class="demo-drawer__footer">
           <el-button @click="handleBatchClose">取 消</el-button>
           <el-button type="primary" @click="batchAddWork()">
             确定
           </el-button>
         </div>
       </el-drawer>
     </div>
     <!-- 单独排班 -->
     <div>
       <el-drawer :title="'【' + hanleDay.day + '】排班'" v-model:visible="drawer" size="40%">
         <div class="add-work-class">
           <el-button class="add-btn-class" type="primary" @click="innerDrawer = true">添加</el-button>
           <el-drawer title="添加排班" :append-to-body="true" :before-close="handleClose" v-model:visible="innerDrawer">
             <div class="demo-drawer__content">
               <el-form :model="addForm">
                 <el-form-item label="班次：" label-width="80px">
                   <el-radio-group v-model="addForm.shiftName">
                     <el-radio label="早">早</el-radio>
                     <el-radio label="中">中</el-radio>
                     <el-radio label="晚">晚</el-radio>
                   </el-radio-group>
                 </el-form-item>
                 <el-form-item label="班别：" label-width="80px">
                   <el-radio-group v-model="addForm.groupName">
                     <el-radio label="甲">甲</el-radio>
                     <el-radio label="乙">乙</el-radio>
                     <el-radio label="丙">丙</el-radio>
                   </el-radio-group>
                 </el-form-item>
               </el-form>
             </div>
             <div class="demo-drawer__footer">
               <el-button @click="handleClose">取 消</el-button>
               <el-button type="primary" @click="addWork()">
                 确定
               </el-button>
             </div>
           </el-drawer>
         </div>
         <el-table :data="workInfoList">
           <el-table-column property="date" label="日期" width="100"></el-table-column>
           <el-table-column property="shiftName" label="班次"></el-table-column>
           <el-table-column property="groupName" label="班别"></el-table-column>
           <el-table-column property="startTime" label="开始时间" width="160"></el-table-column>
           <el-table-column property="endTime" label="结束时间" width="160"></el-table-column>
           <el-table-column fixed="right" label="操作" width="120">
             <template v-slot="scope">
               <el-button @click.prevent="deleteRow(scope, workInfoList)" type="text" size="small">
                 移除
               </el-button>
             </template>
           </el-table-column>
         </el-table>
       </el-drawer>
     </div>
     <!-- 日期选择 -->
     <div>
       <el-drawer title="日期选择" v-model:visible="changeDateDrawer" class="change-date-drawer-class" size="30%">
         <el-calendar>
           <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
           <template v-slot:dateCell="{ date, data }" >
             <div :class="['day-content-class',setDisabled(data.day)]">
               <template>
                 <div class="header-class no-drop-class" v-show="data.type === 'current-month'"
                   @click="selectDate(date,data)">
                   <div class="day-class">
                     {{
                     data.day
                       .split("-")
                       .slice(1)
                       .join("-")
                   }}
                   </div>
                   <div :key="data.day" :id="data.day">{{ initHolidayDate(data) }}</div>
                 </div>
               </template>
             </div>
           </template>
         </el-calendar>
         <div style="margin:10px">
           <div>选中的日期：</div>
           <span v-for="(day,i) in currentDate" :key="i">
             {{day.date}} 
           </span>
         </div>
       </el-drawer>
     </div>
   <!-- </div> -->
 </template>
  
 <script>
   import moment from "moment";
   export default {
     data() {
       return {
         viewDate: {
           "2023-10-10": [{
               id: "2023-10-10" + Math.random(1000),
               ruleName: "三班两运转",
               shiftName: "早",
               groupName: "甲",
               startTime: "2023-10-10 08:30",
               endTime: "2023-10-10 20:30",
               isNotHoliday: 0,
               classId: 1,
               date: "2023-10-10",
               sort: 1,
             },
             {
               id: "2023-10-10" + Math.random(1000),
               ruleName: "三班两运转",
               shiftName: "中",
               groupName: "乙",
               startTime: "2023-10-10 20:30",
               endTime: "2023-10-08 08:30",
               isNotHoliday: 0,
               classId: 1,
               date: "2023-10-10",
               sort: 2,
             },
           ],
           "2023-10-08": [{
               id: "2023-10-08" + Math.random(1000),
               ruleName: "三班两运转",
               shiftName: "早",
               groupName: "甲",
               startTime: "2023-10-08 08:30",
               endTime: "2023-10-08 20:30",
               isNotHoliday: 0,
               classId: 1,
               date: "2023-10-08",
               sort: 1,
             },
             {
               id: "2023-10-08" + Math.random(1000),
               ruleName: "三班两运转",
               shiftName: "中",
               groupName: "乙",
               startTime: "2023-10-08 08:30",
               endTime: "2023-10-08 20:30",
               isNotHoliday: 0,
               classId: 1,
               date: "2023-10-08",
               sort: 2,
             },
             {
               id: "2023-10-08" + Math.random(1000),
               ruleName: "三班两运转",
               shiftName: "晚",
               groupName: "丙",
               startTime: "2023-10-08 08:30",
               endTime: "2023-10-09 20:30",
               isNotHoliday: 0,
               classId: 1,
               date: "2023-10-08",
               sort: 3,
             },
           ],
         },
         thisDay: null,
         thisDayWork: null,
         ending: null,
         dragging: null,
  
         batchAddDrawer: false,
         // 批量添加
         batchAddForm: {
           batchDate: [],
           classData: [{
             shiftName: "早",
             groupName: "甲",
           }, ],
         },
         // 单日添加
         addForm: {
           shiftName: "早",
           groupName: "甲",
           sort: 1,
         },
         drawer: false,
         innerDrawer: false,
         hanleDay: "",
         workInfoList: [],
  
         // 时间范围
         dateRange: ['2023-10-1', '2023-10-20'],
         changeDateDrawer: false,
         // 点击月中已选中的日期
         currentDate: [],
       };
     },
     watch: {
       "addForm.shiftName"(newVal, oldVal) {
         switch (newVal) {
           case "早":
             this.addForm.sort = 1;
             break;
           case "中":
             this.addForm.sort = 2;
             break;
           case "晚":
             this.addForm.sort = 3;
             break;
           default:
             break;
         }
       },
     },
     computed: {},
     methods: {
       handleDragStart(e, item, thisDay) {
         this.dragging = item;
         this.thisDay = thisDay;
         this.thisDayWork = this.viewDate[thisDay];
       },
       handleDragEnd() {
         if (this.ending.id === this.dragging.id) {
           return;
         }
         const newItems = [...this.thisDayWork];
         const src = newItems.indexOf(this.dragging);
         const dst = newItems.indexOf(this.ending);
         newItems.splice(src, 1, ...newItems.splice(dst, 1, newItems[src]));
         this.$set(this.viewDate, this.thisDay, newItems);
         this.$nextTick(() => {
           this.dragging = null;
           this.ending = null;
         });
         console.log(
           "🚀 ~ file: App.vue:286 ~ handleDragEnd ~ this.viewDate:",
           this.viewDate
         );
       },
       handleDragOver(e) {
         // 首先把div变成可以放置的元素，即重写dragenter/dragover
         e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
       },
       handleDragEnter(e, item) {
         e.dataTransfer.effectAllowed = "move"; // 为需要移动的元素设置dragstart事件
         this.ending = item;
       },
       // 获取时间范围中的所有日期
       enumerateDaysBetweenDates(startDate, endDate) {
         const daysList = [];
         const SDate = moment(startDate);
         const EDate = moment(endDate);
         daysList.push(SDate.format("YYYY-MM-DD"));
         while (SDate.add(1, "days").isBefore(EDate)) {
           daysList.push(SDate.format("YYYY-MM-DD"));
         }
         daysList.push(EDate.format("YYYY-MM-DD"));
         return daysList;
       },
       setSortValue(value) {
         let sort = 1;
         switch (value) {
           case "早":
             sort = 1;
             break;
           case "中":
             sort = 2;
             break;
           case "晚":
             sort = 3;
             break;
           default:
             break;
         }
         return sort;
       },
       setWorkClass(value) {
         let classValue = "no-work-class";
         switch (value) {
           case 1:
             classValue = "zao-work-class";
             break;
           case 2:
             classValue = "wan-work-class";
             break;
           case 3:
             classValue = "ye-work-class";
             break;
           default:
             break;
         }
         return classValue;
       },
       setIconClass(value) {
         let classValue = "el-icon-sunrise-1";
         switch (value) {
           case "早":
             classValue = "el-icon-sunrise-1";
             break;
           case "中":
             classValue = "el-icon-sunny";
             break;
           case "晚":
             classValue = "el-icon-moon";
             break;
           default:
             break;
         }
         return classValue;
       },
       // 编辑单日排班
       handleWorkInfo(info, data) {
         this.hanleDay = data;
         this.drawer = true;
         if (info && info.length > 0) {
           this.workInfoList = info;
         } else {
           this.workInfoList = [];
         }
       },
       handleClose() {
         this.innerDrawer = false;
       },
       // 添加单日排班
       addWork() {
         const info = {
           id: this.hanleDay.day + Math.random(1000),
           ruleName: "三班两运转",
           shiftName: this.addForm.shiftName,
           groupName: this.addForm.groupName,
           startTime: this.hanleDay.day + " 08:30",
           endTime: this.hanleDay.day + " 20:30",
           isNotHoliday: 0,
           classId: 1,
           date: this.hanleDay.day,
           sort: this.addForm.sort,
         };
         this.workInfoList.push(info);
         this.$set(this.viewDate, this.hanleDay.day, this.workInfoList);
         this.innerDrawer = false;
       },
       // 清除单日排班数据
       deleteRow(row, tableData) {
         const index = row.$index;
         tableData.splice(index, 1);
         if (tableData.length > 0) {
           this.$set(this.viewDate, this.hanleDay.day, tableData);
         } else {
           this.$delete(this.viewDate, this.hanleDay.day);
         }
       },
       addDomain() {
         this.batchAddForm.classData.push({
           shiftName: "早",
           groupName: "甲",
           key: Date.now(),
         });
       },
       removeDomain(item) {
         if (this.batchAddForm.classData.length > 1) {
           const index = this.batchAddForm.classData.indexOf(item);
           if (index !== -1) {
             this.batchAddForm.classData.splice(index, 1);
           }
         } else {
           this.$message({
             message: "请至少安排一个排班",
             type: "error",
           });
         }
       },
       // 批量添加排班数据
       batchAddWork() {
         const dateList = this.batchAddForm.batchDate;
         const classList = this.batchAddForm.classData;
         let list = [];
         if (dateList && dateList.length > 0) {
           list = this.enumerateDaysBetweenDates(dateList[0], dateList[1]);
         }
         list.forEach((item) => {
           const workList = [];
           classList.forEach((work) => {
             const info = {
               id: item + Math.random(1000),
               ruleName: "三班两运转",
               shiftName: work.shiftName,
               groupName: work.groupName,
               startTime: item + " 08:30",
               endTime: item + " 20:30",
               isNotHoliday: 0,
               classId: 1,
               date: item,
               sort: this.setSortValue(work.shiftName),
             };
             workList.push(info);
           });
           this.$set(this.viewDate, item, workList);
         });
  
         this.batchAddDrawer = false;
         this.batchAddForm = {
           batchDate: [],
           classData: [{
             shiftName: "早",
             groupName: "甲",
           }, ],
         };
       },
       handleBatchClose() {
         this.batchAddDrawer = false;
       },
  
       //初始化已选中的日期
       initHolidayDate(data) {
         for (const i in this.currentDate) {
           if (data.day === this.currentDate[i].date) {
             data.isSelected = true;
             // return '✔️'
             return '✔'
           }
         }
       },
       //点击选中或取消选中
       selectDate(date, data) {
         console.log("🚀 ~ file: App.vue:510 ~ selectDate ~ data:", data)
         const day = date.getDate();
         const span = document.getElementById(data.day);
         if (span.innerText) {
           span.innerText = ''
           for (const i in this.currentDate) {
             if (day === this.currentDate[i].day) {
               this.currentDate.splice(i, 1)
             }
           }
         } else {
           span.innerText = '✔';
           this.currentDate.push({
             day: day,
             date: data.day
           })
         }
         console.log("this.currentDate:", this.currentDate)
       },
       // 设置禁用值
       setDisabled(date) {
         // console.log("🚀 ~ file: App.vue:537 ~ setDisabled ~ date:", date)
         if (moment(date).isBefore(this.dateRange[0]) || moment(date).isAfter(this.dateRange[1])) {
           return 'disabled-date-class'
         }
       }
     },
   };
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