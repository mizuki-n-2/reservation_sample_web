<template>
  <div>
    <v-data-table :headers="headers" :items="reservations" class="elevation-1">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>予約一覧</v-toolbar-title>
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
              v-model="filterDate"
              type="date"
              label="予約日検索"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="filterStartTime"
              type="time"
              label="開始時間検索"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="filterName"
              label="予約者名検索"
            ></v-text-field>
          </td>
          <td colspan="5"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      filterDate: '',
      filterStartTime: '',
      filterName: '',
      reservations: [
        {
          date: '2022年2月13日(日)',
          startTime: '9:00',
          name: '山田太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中次郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 4,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月19日(土)',
          startTime: '15:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月9日(水)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          name: '田中太郎',
          email: 'aaa@sample.com',
          phoneNumber: '090-1234-5678',
          adultNumber: 2,
          primarySchoolChildNumber: 1,
          childNumber: 0,
        },
      ],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: '予約日',
          value: 'date',
          filter: (value) => {
            if (!this.filterDate) return true

            return moment(value, 'YYYY年M月D日(dd)')
              .format('YYYY-MM-DD')
              .includes(this.filterDate)
          },
        },
        {
          text: '開始時間',
          value: 'startTime',
          filter: (value) => {
            if (!this.filterStartTime) return true

            return moment(value, 'H:mm')
              .format('HH:mm')
              .includes(this.filterStartTime)
          },
        },
        {
          text: '予約者名',
          value: 'name',
          filter: (value) => {
            if (!this.filterName) return true

            return value.includes(this.filterName)
          },
        },
        { text: 'メールアドレス', value: 'email' },
        { text: '電話番号', value: 'phoneNumber' },
        { text: '大人人数', value: 'adultNumber' },
        { text: '小学生人数', value: 'primarySchoolChildNumber' },
        { text: '子供人数', value: 'childNumber' },
      ]
    },
  },
  methods: {
    exportCsv() {
      // TODO: 予約一覧をCSV形式でダウンロード or 印刷？
      alert('予約一覧をCSV形式でダウンロードしました。')
    },
  },
}
</script>