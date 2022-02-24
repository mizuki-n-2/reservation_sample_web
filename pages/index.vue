<template>
  <v-row>
    <v-col>
      <h2 class="my-3">予約状況</h2>
      <reservation-status
        v-if="isShow"
        :schedules="schedules"
        @sendSchedule="goToRegister"
      ></reservation-status>
    </v-col>
    <v-col>
      <h2 class="my-3">予約確認</h2>
      <v-text-field
        v-model="searchId"
        label="確認したい予約の検索用IDを入力してください"
        append-outer-icon="mdi-magnify"
        @click:append-outer="searchReservation"
        @keydown.enter="searchReservation"
      ></v-text-field>
      <div v-if="matchedReservation">
        <reservation-confirm-card
          :reservation="matchedReservation"
          @deleteReservation="deleteReservation"
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
      isShow: false,
      beforeSearch: true,
      searchId: '',
      schedules: [],
      matchedReservation: null,
    }
  },
  computed: {
    reservations() {
      return this.$accessor.reservations
    },
  },
  async created() {
    await this.$accessor.getReservations()
    await this.$accessor.getSchedules()
    this.schedules = this.$accessor.schedules

    this.isShow = true
  },
  methods: {
    searchReservation() {
      this.beforeSearch = false
      this.matchedReservation = this.reservations.find(
        (reservation) => reservation.search_id === this.searchId
      )
    },
    goToRegister(scheduleId) {
      this.$router.push(`/reservations/${scheduleId}`)
    },
    async deleteReservation(reservation) {
      await this.$accessor.deleteReservation(reservation)

      alert('予約に取り消しに成功しました。')
    },
  },
}
</script>