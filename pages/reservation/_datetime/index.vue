<template>
  <div>
    <reservation-register-card @submitReservation="submitReservation"></reservation-register-card>
  </div>
</template>

<script>
import ReservationRegisterCard from '~/components/ReservationRegisterCard.vue'

export default {
  components: {
    ReservationRegisterCard,
  },
  methods: {
    submitReservation(reservation) {
      // TODO: 予約登録処理
      alert("予約に成功しました。", reservation)
      this.$router.push('/')
    },
  },
}
</script>