<template>
  <div class="mt-2">
    <v-card>
      <v-card-title class="d-block text-center"> 予約情報 </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >予約日： {{ formatDate }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >予約時間：
                    {{ reservation.startTime }}開始</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >予約人数：
                    {{ reservation.numberOfPeople }}人</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >予約者： {{ reservation.name }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >メールアドレス： {{ reservation.email }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >電話番号： {{ reservation.phoneNumber }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-btn @click="deleteReservation" :disabled="!isCanBeCanceled"
                    >この予約を取り消す</v-btn
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

const BEFORE_CANCEL_DEADLINE_DAYS = 1

export default {
  props: {
    reservation: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        date: '',
        startTime: '',
        numberOfPeople: 0,
        name: '',
        email: '',
        phoneNumber: '',
        searchId: '',
      }),
    },
  },
  computed: {
    isCanBeCanceled() {
      return this.canBeCanceled(
        this.reservation.date,
        this.reservation.startTime
      )
    },
    formatDate() {
      return moment(this.reservation.date).format('YYYY年M月D日(dd)')
    },
  },
  methods: {
    deleteReservation() {
      if (
        !this.canBeCanceled(this.reservation.date, this.reservation.startTime)
      ) {
        alert(
          `予約日の${BEFORE_CANCEL_DEADLINE_DAYS}日前のため、ここから予約を取り消すことはできません。\n予約を取り消したい場合は管理者にお電話で直接お問い合わせください。`
        )
        return
      }

      if (window.confirm('この予約を取り消しますか？')) {
        this.$emit('deleteReservation', this.reservation.id)
      }
    },
    canBeCanceled(date, time) {
      return moment().isBefore(
        moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').subtract(
          BEFORE_CANCEL_DEADLINE_DAYS,
          'days'
        )
      )
    },
  },
}
</script>