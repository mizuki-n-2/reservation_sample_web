<template>
  <div>
    <table border="1" align="center">
      <caption>
        <p class="d-flex justify-space-between">
          <button @click="movePreviousWeek">◀︎ 前の週へ</button>
          <strong>{{ startDate.format('M') }}月</strong>
          <button @click="moveNextWeek">次の週へ ▶︎</button>
        </p>
      </caption>
      <thead>
        <tr>
          <td></td>
          <template v-for="date in dateList">
            <th :key="date">
              {{ date }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(availableHour, i) in availableHourList">
          <tr :key="availableHour">
            <td>{{ availableHour }}</td>
            <td
              v-for="(availability, j) in hourlyAvailabilityList[i]"
              :key="j"
            >
              <a
                class="white--text d-block text-center"
                @click="sendReservation(dateList[j], availableHour, availability)"
              >
                {{ availability }}
              </a>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ja')

export default {
  data() {
    return {
      dateList: [],
      weekNumber: 7,
      availableHourList: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
      hourlyAvailabilityList: [],
    }
  },
  computed: {
    startDate: {
      get() {
        return moment()
      },
      set(date) {
        this.setDateList(date)
        this.setHourlyAvailabilityList()
      },
    },
  },
  created() {
    this.setDateList(this.startDate)
    this.setHourlyAvailabilityList()
  },
  methods: {
    moveNextWeek() {
      this.startDate = this.startDate.add(this.weekNumber, 'day')
    },
    movePreviousWeek() {
      this.startDate = this.startDate.subtract(this.weekNumber, 'day')
    },
    setDateList() {
      let dateListClone = this.dateList
      dateListClone = []
      const date = moment(this.startDate)
      dateListClone.push(date.format('M/D(dd)'))
      for (let i = 0; i < this.weekNumber - 1; i++) {
        dateListClone.push(date.add(1, 'day').format('M/D(dd)'))
      }
      this.dateList = dateListClone
    },
    setAvailabilityList() {
      // ダミー配列データ生成
      const array = []
      for (let i = 0; i < this.weekNumber; i++) {
        array.push(['◎', '○', '△', '×', '-'][Math.floor(Math.random()*10%5)])
      }
      return array
    },
    setHourlyAvailabilityList() {
      for(let i = 0; i < this.availableHourList.length; i++) {
        this.hourlyAvailabilityList.push(this.setAvailabilityList())
      }
    },
    sendReservation(date, time, availability) {
      if (availability === '-') {
        alert('販売期間外のため、予約できません。')
        return
      }

      if (availability === '×') {
        alert('既に予約がいっぱいのため、予約できません。')
        return
      }

      if (moment().isAfter(moment(date + ' ' + time, 'M/D(dd) H:mm'))) {
        alert('現在時刻より前に予約できません。')
        return
      }

      const datetimeText = moment(`${date} ${time}`, 'M/D(dd) HH:mm').format('YYYY-M-D-H:mm')
      this.$emit('sendReservationDatetime', datetimeText)
    },
  },
}
</script>
