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
  created() {
    const isAdmin = this.$accessor.isAdmin
    if (isAdmin) {
      this.$router.push('/admin')
    }
  },
  methods: {
    async submitReservation(reservation) {
      await this.$accessor.createReservation(reservation)
      
      alert("予約に成功しました。")
      this.$router.push('/')
    },
  },
}
</script>