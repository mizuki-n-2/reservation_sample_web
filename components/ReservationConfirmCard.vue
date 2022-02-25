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
                    {{ formatStartTime }}開始</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >予約人数：
                    {{ numberOfPeople }}人</v-list-item-title
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
                    >電話番号： {{ reservation.phone_number }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-btn :disabled="!isCanBeCanceled" @click="deleteReservation"
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
import * as moment from 'moment'
import 'moment/locale/ja'

const BEFORE_CANCEL_DEADLINE_DAYS = 1

export default {
  props: {
    reservation: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      date: '',
      startTime: '',
    }
  },
  computed: {
    isCanBeCanceled() {
      return this.canBeCanceled(
        this.date,
        this.startTime
      )
    },
    formatDate() {
      return moment(this.date).format('YYYY年M月D日(dd)')
    },
    formatStartTime() {
      return moment(this.startTime, 'HH:mm').format('H:mm')
    },
    numberOfPeople() {
      return (
        this.reservation.adult_number +
        this.reservation.primary_school_child_number +
        this.reservation.child_number
      )
    },
  },
  async created() {
    await this.$accessor.getSchedules()
    const schedule = this.$accessor.findSchedule(
      this.reservation.schedule_id
    )
    this.date = schedule.date
    this.startTime = schedule.start_time
  },
  methods: {
    deleteReservation() {
      if (
        !this.canBeCanceled(this.date, this.startTime)
      ) {
        alert(
          `予約日の${BEFORE_CANCEL_DEADLINE_DAYS}日前のため、ここから予約を取り消すことはできません。\n予約を取り消したい場合は管理者にお電話で直接お問い合わせください。`
        )
        return
      }

      if (window.confirm('この予約を取り消しますか？')) {
        this.$emit('deleteReservation', this.reservation)
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