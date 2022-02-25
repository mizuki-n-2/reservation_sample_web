<template>
  <div>
    <v-data-table :headers="headers" :items="reservations" class="elevation-1">
      <template #top>
        <v-toolbar flat>
          <v-btn icon @click="backToSchedules">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title v-if="schedule"
            >{{ formatDateTime }}の予約</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <vue-json-to-csv
            v-if="schedule"
            :json-data="csvData"
            :labels="csvLabels"
            :csv-title="csvTitle"
          >
            <v-btn color="primary" dark>
              <v-icon left dark> mdi-export </v-icon>
              csv出力
            </v-btn>
          </vue-json-to-csv>
        </v-toolbar>
      </template>
      <template #[`body.append`]>
        <tr>
          <td>
            <v-text-field
              v-model="filterName"
              label="予約者名検索"
            ></v-text-field>
          </td>
          <td colspan="6"></td>
        </tr>
      </template>
      <template #no-data> 予約はありません。 </template>
    </v-data-table>
  </div>
</template>

<script>
import * as moment from 'moment'
import 'moment/locale/ja'
import VueJsonToCsv from 'vue-json-to-csv'

export default {
  components: {
    VueJsonToCsv,
  },
  data() {
    return {
      filterName: '',
      reservations: [],
      schedule: null,
    }
  },
  computed: {
    headers() {
      return [
        {
          text: '予約者名',
          value: 'name',
          filter: (value) => {
            if (!this.filterName) return true

            return value.includes(this.filterName)
          },
        },
        { text: 'メールアドレス', value: 'email' },
        { text: '電話番号', value: 'phone_number' },
        { text: '住所', value: 'address' },
        { text: '大人人数', value: 'adult_number' },
        { text: '小学生人数', value: 'primary_school_child_number' },
        { text: '子供人数', value: 'child_number' },
      ]
    },
    formatDateTime() {
      const date = moment(this.schedule.date).format('YYYY年M月D日(dd)')
      const startTime = moment(this.schedule.start_time, 'HH:mm').format('H:mm')
      return `${date} ${startTime}`
    },
    csvTitle() {
      const date = moment(this.schedule.date).format('YYYY年M月D日(dd)')
      const startTime = moment(this.schedule.start_time, 'HH:mm').format('H時mm分')
      return `${date} ${startTime}の予約`
    },
    csvData() {
      return this.reservations.map((reservation) => {
        return {
          name: reservation.name,
          email: reservation.email,
          phone_number: "'" + reservation.phone_number,
          address: reservation.address,
          adult_number: reservation.adult_number,
          primary_school_child_number: reservation.primary_school_child_number,
          child_number: reservation.child_number,
        }
      })
    },
    csvLabels() {
      return {
        name: { title: '予約者名' },
        email: { title: 'メールアドレス' },
        phone_number: { title: '電話番号' },
        address: { title: '住所(都道府県のみ)' },
        adult_number: { title: '大人人数' },
        primary_school_child_number: { title: '小学生人数' },
        child_number: { title: '子供人数' },
      }
    },
  },
  async created() {
    const isAdmin = this.$accessor.isAdmin
    if (!isAdmin) {
      this.$router.push('/')
    }

    await this.$accessor.getSchedules()
    await this.$accessor.getReservations()

    const scheduleId = this.$route.params.scheduleId
    this.schedule = this.$accessor.findSchedule(scheduleId)
    this.reservations =
      this.$accessor.filterReservationsByScheduleId(scheduleId)
  },
  methods: {
    backToSchedules() {
      this.$router.push('/admin/schedules')
    },
  },
}
</script>