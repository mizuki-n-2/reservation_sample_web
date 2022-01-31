<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <v-card>
        <v-card-title class="d-block text-center"> 予約登録 </v-card-title>
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
                  required
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="furigana"
                  prefix="ふりがな： "
                  required
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="email"
                  prefix="メールアドレス： "
                  required
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="emailConfirm"
                  prefix="メールアドレス(確認用)： "
                  required
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="phone"
                  prefix="電話番号： "
                  required
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="address"
                  prefix="住所(都道府県のみ)： "
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
                  v-model="adultNumber"
                  prefix="大人(中学生~)： "
                  suffix="人"
                  required
                ></v-text-field>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content>
                <v-list-item-title
                  >大人料金(お一人様)： 2200円</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="primarySchoolChildNumber"
                  prefix="小学生： "
                  suffix="人"
                  required
                ></v-text-field>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content>
                <v-list-item-title
                  >小学生料金(お一人様)： 1700円</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="childNumber"
                  prefix="子供(3歳~小学生未満)： "
                  suffix="人"
                  required
                ></v-text-field>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content>
                <v-list-item-title
                  >子供料金(お一人様)： 1100円</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >さくらんぼ狩りは初めてですか？</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content>
                <v-radio-group v-model="isFirst" row>
                  <v-radio label="はい" :value="true"></v-radio>
                  <v-radio label="いいえ" :value="false"></v-radio>
                </v-radio-group>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >いいえと答えた方、当園は何回目ですか？</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content>
                <v-select :items="numberOfVisitsList" dense></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>質問があればこちらに</v-list-item-title>
                <v-textarea v-model="question"></v-textarea>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-item-list-content class="mx-auto">
                <v-btn @click="submitReservation">登録する</v-btn>
              </v-item-list-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as moment from 'moment';
import 'moment/locale/ja'

export default {
  data() {
    return {
      numberOfVisitsList: ['初めて', '2回目', '3回目', '4回目以上'],
    }
  },
  computed: {
    reservationDatetime() {
      const datetime = this.$route.params.datetime

      return moment(datetime, 'YYYY-M-D-H:mm').format('YYYY年M月D日(dd) H:mm')
    },
  },
  methods: {
    submitReservation() {
      // TODO: 予約登録処理
      alert('予約を登録しました。メールをご確認ください。')
      this.$router.push('/')
    },
  }
}
</script>