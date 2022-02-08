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
    async submitReservation(reservation) {
      await this.$accessor.postReservation(reservation)

      await this.$accessor.decrementAvailableNumber(reservation.scheduleId)
      
      alert("予約に成功しました。")
      this.$router.push('/')
    },
  },
}
</script>