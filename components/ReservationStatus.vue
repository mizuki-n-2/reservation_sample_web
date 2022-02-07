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
            <td v-for="(availability, j) in hourlyAvailabilityList[i]" :key="j">
              <a
                class="white--text d-block text-center"
                @click="
                  sendReservation(availability, dateList[j], availableHour)
                "
              >
                {{ availability.status }}
              </a>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as moment from 'moment'
import 'moment/locale/ja'
import _ from 'lodash'

export default {
  props: {
    reservationAvailableSchedules: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dateList: [],
      weekNumber: 7,
      availableHourList: [
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
      ],
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
  async created() {
    await this.setDateList(this.startDate)
    await this.setHourlyAvailabilityList()
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
      dateListClone.push(this.formatDate(date))
      for (let i = 0; i < this.weekNumber - 1; i++) {
        dateListClone.push(this.formatDate(date.add(1, 'day')))
      }
      this.dateList = dateListClone
    },
    setAvailabilityList(index) {
      const returnArray = []

      const availableSchedules = _.intersectionWith(
        this.reservationAvailableSchedules,
        this.dateList,
        (a, b) => {
          return (
            !this.isBeforeCurrentTime(this.formatDate(a.date), a.startTime) &&
            this.formatDate(a.date) === b &&
            a.startTime === this.availableHourList[index]
          )
        }
      )

      for (let i = 0; i < this.weekNumber; i++) {
        const pushedObject = {}
        if (
          availableSchedules.length &&
          this.dateList[i] === this.formatDate(availableSchedules[0].date)
        ) {
          pushedObject.id = availableSchedules[0].id
          pushedObject.status = availableSchedules[0].status
        } else {
          pushedObject.id = 0
          pushedObject.status = '-'
        }
        returnArray.push(pushedObject)
      }

      return returnArray
    },
    setHourlyAvailabilityList() {
      for (let i = 0; i < this.availableHourList.length; i++) {
        this.hourlyAvailabilityList.push(this.setAvailabilityList(i))
      }
    },
    isBeforeCurrentTime(date, time) {
      return moment(date + ' ' + time, 'M/D(dd) H:mm').isBefore()
    },
    formatDate(date) {
      return moment(date).format('M/D(dd)')
    },
    sendReservation(availability, date, time) {
      if (availability.status === '-') {
        alert('販売期間外のため、予約できません。')
        return
      }

      if (availability.status === '×') {
        alert('既に予約がいっぱいのため、予約できません。')
        return
      }


      if (this.isBeforeCurrentTime(date, time)) {
        alert('現在時刻より前に予約できません。')
        return
      }

      if (availability.id === 0) {
        alert('予期せぬエラーが発生しました。')
        return
      }

      this.$emit('sendReservationDatetime', availability.id)
    },
  },
}
</script>
