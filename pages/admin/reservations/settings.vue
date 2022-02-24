<template>
  <v-data-table :headers="headers" :items="schedules" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>予約可能日程</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              <v-icon left dark> mdi-plus-thick </v-icon>
              新規作成
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.date"
                      :rules="[rules.required]"
                      label="予約可能日"
                      :type="dateType"
                      :disabled="editedIndex !== -1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.start_time"
                      :rules="[rules.required]"
                      label="開始時間"
                      type="time"
                      :disabled="editedIndex !== -1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model.number="editedItem.max_number"
                      :rules="[rules.integer, rules.maxNumber]"
                      label="予約上限数"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                キャンセル
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >本当にこの日程を消去してもよろしいですか?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >キャンセル</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      まだデータがありません。予約可能日を登録してください。
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '予約可能日',
        value: 'date',
      },
      { text: '開始時間', value: 'start_time', sortable: false },
      { text: '予約上限数', value: 'max_number' },
      { text: '現在の予約数', value: 'reservation_number' },
      { text: '予約可能数', value: 'available_number' },
      { text: '', value: 'actions', sortable: false },
    ],
    schedules: [],
    editedIndex: -1,
    editedItem: {
      date: '',
      start_time: '',
      max_number: 0,
      reservation_number: 0,
      available_number: 0,
    },
    defaultItem: {
      date: '',
      start_time: '',
      max_number: 0,
      reservation_number: 0,
      available_number: 0,
    },
    rules: {
      required: (value) => !!value || '必須項目です。',
      integer: (value) =>
        /^[0-9]+$/.test(value) || '整数を入力してください。',
      maxNumber: (value) => {
        const MAX_MAX_NUMBER = 100
        const MIN_MAX_NUMBER = 1

        return (
          (value >= MIN_MAX_NUMBER && value <= MAX_MAX_NUMBER) ||
          `予約上限数は${MIN_MAX_NUMBER}以上${MAX_MAX_NUMBER}以下にしてください。`
        )
      },
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新規作成' : '編集'
    },
    dateType() {
      return this.editedIndex === -1 ? 'date' : 'text'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  async created() {
    await this.$accessor.getSchedules()
    this.schedules = this.$accessor.schedules.map((item) => {
      return {
        ...item,
        date: this.formatDate(item.date),
        start_time: this.formatStartTime(item.start_time),
        available_number: item.max_number - item.reservation_number,
      }
    })
  },

  methods: {
    formatDate(date) {
      return moment(date).format('YYYY年M月D日(dd)')
    },
    formatStartTime(startTime) {
      return moment(startTime, 'HH:mm').format('H:mm')
    },
    editItem(item) {
      this.editedIndex = this.schedules.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.schedules.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.$accessor.deleteSchedule(this.schedules[this.editedIndex].id)
      this.schedules.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.$accessor.updateScheduleMaxNumber({
          id: this.schedules[this.editedIndex].id,
          max_number: this.editedItem.max_number,
        })
        Object.assign(this.schedules[this.editedIndex], this.editedItem)
      } else {
        await this.$accessor.createSchedule({
          date: this.editedItem.date,
          start_time: this.editedItem.start_time,
          max_number: this.editedItem.max_number,
        })
        this.schedules.push({
          ...this.editedItem,
          date: this.formatDate(this.editedItem.date),
          start_time: this.formatStartTime(this.editedItem.start_time),
          available_number: this.editedItem.max_number - this.editedItem.reservation_number,
        })
      }
      this.close()
    },
  },
}
</script>