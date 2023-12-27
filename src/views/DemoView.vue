<template>
  <div>
      <Calendar v-model="value" hide-type :locale="locale">
          <template #month="{ data}">
            <div style="background-color: rgb(18, 18, 123); width: 30px;height: 30px;float: right;color:white ;border-radius: 5px;">班</div>
            <div></div>
              <div>
                  <Badge status="warning" text="看苹果发布会" v-if="data.day === '2023-12-11'" />
                  <Badge status="success" text="中秋节" v-if="data.day === '2023-12-13'" />
                  <Badge status="error" text="国庆节" v-if="data.day === '2023-12-01'" />
              </div>
          </template>
          <template #header>
            <div>
              <div>
                {{ value }}
              </div>
              <div>
                
              </div>
            </div>

          </template>
      </Calendar>
  </div>
</template>
<script  lang="ts" setup>
const value=new Date()
const locale={
    today: '今天',
    type: {
        month: '月',
        year: '年'
    },
    weekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
}
</script>