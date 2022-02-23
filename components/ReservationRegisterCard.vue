<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <v-card>
        <v-card-title class="d-block text-center"> 予約登録 </v-card-title>
        <v-form ref="form">
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    予約日時： {{ reservationDatetime }}開始
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="name"
                    prefix="お名前： "
                    :counter="20"
                    :rules="[rules.required, rules.maxLengthName]"
                    required
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="email"
                    prefix="メールアドレス： "
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="emailConfirm"
                    prefix="メールアドレス(確認用)： "
                    :rules="[rules.required, rules.email, rules.emailConfirm]"
                    required
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="phoneNumber"
                    prefix="電話番号(ハイフンなし)： "
                    :counter="13"
                    :rules="[rules.required, rules.phoneNumber]"
                    required
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="address"
                    prefix="住所(都道府県のみ)： "
                    :counter="10"
                    :rules="[rules.required, rules.maxLengthAddress]"
                    required
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >当日さくらんぼ狩りをする人数を教えてください。</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model.number="adultNumber"
                    prefix="大人(中学生~)： "
                    suffix="人"
                    :rules="[rules.positiveInteger]"
                    required
                  ></v-text-field>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-content>
                  <v-list-item-title
                    >大人料金(お一人様)： {{ adultAmount }}円</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model.number="primarySchoolChildNumber"
                    prefix="小学生： "
                    suffix="人"
                    :rules="[rules.positiveInteger]"
                    required
                  ></v-text-field>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-content>
                  <v-list-item-title
                    >小学生料金(お一人様)：
                    {{ primarySchoolChildAmount }}円</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model.number="childNumber"
                    prefix="子供(3歳~小学生未満)： "
                    suffix="人"
                    :rules="[rules.positiveInteger]"
                    required
                  ></v-text-field>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-content>
                  <v-list-item-title
                    >子供料金(お一人様)： {{ childAmount }}円</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    合計金額： {{ totalAmount }}円
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-checkbox
                    v-model="finalCheck"
                    :rules="[rules.required]"
                    label="上記の内容でよろしいですか？"
                    required
                  ></v-checkbox>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-btn @click="backToTop">キャンセル</v-btn>
                </v-list-item-content>
                <v-list-item-content>
                  <v-btn
                    color="primary"
                    :disabled="!valid"
                    @click="submitReservation"
                    >登録する</v-btn
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as moment from 'moment'
import 'moment/locale/ja'

export default {
  data() {
    return {
      scheduleId: null,
      date: '',
      startTime: '',
      name: '',
      email: '',
      emailConfirm: '',
      phoneNumber: '',
      address: '',
      adultNumber: 0,
      adultAmount: 2200,
      primarySchoolChildNumber: 0,
      primarySchoolChildAmount: 1700,
      childNumber: 0,
      childAmount: 1100,
      finalCheck: false,
      rules: {
        required: (value) => !!value || '必須項目です。',
        email: (value) => {
          const EMAIL_PATTERN = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/
          return (
            EMAIL_PATTERN.test(value) ||
            'メールアドレスの形式が正しくありません。'
          )
        },
        emailConfirm: (value) => {
          return value === this.email || 'メールアドレスが一致しません。'
        },
        phoneNumber: (value) => {
          const PHONE_NUMBER_PATTERN = /^0[0-9]{9,12}$/
          return (
            PHONE_NUMBER_PATTERN.test(value) ||
            '電話番号の形式が正しくありません。'
          )
        },
        positiveInteger: (value) => {
          const POSITIVE_INTEGER_PATTERN = /^[0-9]*$/
          const MAX_NUMBER = 100
          return (
            (POSITIVE_INTEGER_PATTERN.test(value) && value <= MAX_NUMBER) ||
            '不正な値です。'
          )
        },
        maxLengthName: (value) => {
          const NAME_MAX_LENGTH = 20
          return (
            value.length <= NAME_MAX_LENGTH ||
            `文字数は${NAME_MAX_LENGTH}以下にしてください。`
          )
        },
        maxLengthAddress: (value) => {
          const ADDRESS_MAX_LENGTH = 10
          return (
            value.length <= ADDRESS_MAX_LENGTH ||
            `文字数は${ADDRESS_MAX_LENGTH}以下にしてください。`
          )
        },
      },
    }
  },
  computed: {
    reservationDatetime() {
      return moment(
        `${this.date} ${this.startTime}`,
        'YYYY-MM-DD HH:mm'
      ).format('YYYY年M月D日(dd) H:mm')
    },
    totalAmount() {
      return (
        this.adultNumber * this.adultAmount +
        this.primarySchoolChildNumber * this.primarySchoolChildAmount +
        this.childNumber * this.childAmount
      )
    },
    valid() {
      return this.finalCheck ?? this.$refs.form.validate()
    },
  },
  async created() {
    await this.$accessor.getSchedules()
    this.scheduleId = this.$route.params.scheduleId
    const schedule = this.$accessor.findSchedule(
      this.scheduleId
    )
    this.date = schedule.date
    this.startTime = schedule.start_time
  },
  methods: {
    submitReservation() {
      if (!this.$refs.form.validate()) {
        alert('フォームに不正な値があります。')
        return
      }

      if (this.totalAmount === 0) {
        alert('ご予約は1人以上必要です。')
        return
      }

      const reservation = {
        name: this.name,
        email: this.email,
        phone_number: this.phoneNumber,
        address: this.address,
        adult_number: this.adultNumber,
        primary_school_child_number: this.primarySchoolChildNumber,
        child_number: this.childNumber,
        schedule_id: this.scheduleId,
      }
      this.$emit('submitReservation', reservation)
    },
    backToTop() {
      this.$router.push('/')
    },
  },
}
</script>