<template>
  <v-row>
    <v-col>
      <h2 class="my-3">予約状況</h2>
      <reservation-status
        :reservation-available-schedules="reservationAvailableSchedules"
        @sendReservationDatetime="goToRegister"
      ></reservation-status>
    </v-col>
    <v-col>
      <h2 class="my-3">予約確認</h2>
      <v-text-field
        v-model="searchReservationId"
        label="確認したい予約のIDを入力してください"
        append-outer-icon="mdi-magnify"
        @click:append-outer="searchReservation"
        @keydown.enter="searchReservation"
      ></v-text-field>
      <div v-if="matchedReservation">
        <reservation-confirm-card
          :reservation="matchedReservation"
        ></reservation-confirm-card>
      </div>
      <p v-if="!beforeSearch && !matchedReservation">
        一致する予約はありません
      </p>
    </v-col>
  </v-row>
</template>

<script>
import ReservationStatus from '~/components/ReservationStatus.vue'
import ReservationConfirmCard from '~/components/ReservationConfirmCard.vue'

export default {
  components: {
    ReservationStatus,
    ReservationConfirmCard,
  },
  data() {
    return {
      beforeSearch: true,
      searchReservationId: '',
      text: '日程未選択です',
      // 時間昇順->日付昇順にする
      reservationAvailableSchedules: [
        {
          id: 1,
          date: '2022-01-31',
          startTime: '9:00',
          status: '◎',
        },
        {
          id: 3,
          date: '2022-06-12',
          startTime: '10:00',
          status: '×',
        },
        {
          id: 4,
          date: '2022-06-18',
          startTime: '12:00',
          status: '◎',
        },
        {
          id: 2,
          date: '2022-02-02',
          startTime: '15:00',
          status: '△',
        },
      ],
      reservations: [
        {
          id: 'reservation-id-1',
          date: '2022年6月11日(土)',
          hour: '10:00',
          number: 2,
          name: 'マイケル・ジョンソン',
          email: 'aaa@sample.com',
          phone: '000-0000-0000',
        },
      ],
      matchedReservation: null,
    }
  },
  methods: {
    searchReservation() {
      this.beforeSearch = false
      this.matchedReservation = this.reservations.find(
        (reservation) => reservation.id === this.searchReservationId
      )
    },
    goToRegister(reservationDatetimeText) {
      this.$router.push(`/reservation/${reservationDatetimeText}`)
    },
  },
}
</script>