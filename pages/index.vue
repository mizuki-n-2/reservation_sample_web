<template>
  <v-row>
    <v-col>
      <reservation-status @sendReservation="text = $event"></reservation-status>
      <p>{{ text }}</p>
    </v-col>
  </v-row>
</template>

<script>
import ReservationStatus from '~/components/ReservationStatus.vue'

export default {
  components: {
    ReservationStatus
  },
  data() {
    return {
      text: '日程未選択です'
    }
  },
}
</script>