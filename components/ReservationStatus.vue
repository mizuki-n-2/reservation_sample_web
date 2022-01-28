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
        <template v-for="hourlyAvailabilityList in hourlyAvailabilityList">
          <tr :key="hourlyAvailabilityList.time">
            <td>{{ hourlyAvailabilityList.time }}</td>
            <td
              v-for="(availability, i) in hourlyAvailabilityList.availabilityList"
              :key="hourlyAvailabilityList.time + '_' + i"
            >
              <a
                @click="sendReservation(dateList[i], hourlyAvailabilityList.time, availability)"
                class="white--text d-block text-center"
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
      hourlyAvailabilityList: [],
    }
  },
  created() {
    this.setDateList(this.startDate)
    this.setHourlyAvailabilityList()
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
  methods: {
    moveNextWeek() {
      this.startDate = this.startDate.add(this.weekNumber, 'day')
    },
    movePreviousWeek() {
      this.startDate = this.startDate.subtract(this.weekNumber, 'day')
    },
    setDateList() {
      var dateListClone = this.dateList
      dateListClone = []
      var date = moment(this.startDate)
      dateListClone.push(date.format('M/D(dd)'))
      for (var i = 0; i < this.weekNumber - 1; i++) {
        dateListClone.push(date.add(1, 'day').format('M/D(dd)'))
      }
      this.dateList = dateListClone
    },
    setAvailabilityList() {
      //ダミー配列データ生成
      var array = []
      for (let i = 0; i < this.weekNumber; i++) {
        array.push(['◎', '○', '△', '×', '-'][Math.floor(Math.random()*10%5)])
      }
      return array
    },
    setHourlyAvailabilityList() {
      this.hourlyAvailabilityList = [
        {
          time: '9:00',
          availabilityList: this.setAvailabilityList(),
        },
        {
          time: '10:00',
          availabilityList: this.setAvailabilityList(),
        },
        {
          time: '11:00',
          availabilityList: this.setAvailabilityList(),
        },
        {
          time: '12:00',
          availabilityList: this.setAvailabilityList(),
        },
        {
          time: '13:00',
          availabilityList: this.setAvailabilityList(),
        },
        {
          time: '14:00',
          availabilityList: this.setAvailabilityList(),
        },
        {
          time: '15:00',
          availabilityList: this.setAvailabilityList(),
        },
      ]
    },
    sendReservation(date, time, availability) {
      var text = ''
      if (availability != '-' && availability != '×') {
        text = date + time
      } else {
        text = 'この日程は選択できません。'
      }
      this.$emit('sendReservation', text)
    },
  },
}
</script>
