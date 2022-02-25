<template>
  <div>
    <v-data-table :headers="headers" :items="reservations" class="elevation-1">
      <template #top>
        <v-toolbar flat>
          <v-btn icon @click="backToSchedules">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title v-if="schedule">{{ formatDateTime }}の予約</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="exportCsv">
            <v-icon left dark> mdi-export </v-icon>
            csv出力
          </v-btn>
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
      <template #no-data>
        予約はありません。
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
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
    }
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
    this.reservations = this.$accessor.filterReservationsByScheduleId(scheduleId)
  },
  methods: {
    exportCsv() {
      // TODO: 予約一覧をCSV形式でダウンロード or 印刷？
      alert('予約一覧をCSV形式でダウンロードしました。')
    },
    backToSchedules() {
      this.$router.push('/admin/schedules')
    },
  },
}
</script>