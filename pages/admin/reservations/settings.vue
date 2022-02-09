<template>
  <v-data-table
    :headers="headers"
    :items="availableSchedules"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>予約可能日程</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              <v-icon
                left
                dark
              >
                mdi-plus-thick
              </v-icon>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date"
                      label="予約可能日"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.startTime"
                      label="開始時間"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.totalNumber"
                      label="予約上限数"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> キャンセル </v-btn>
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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '予約可能日',
        value: 'date',
      },
      { text: '開始時間', value: 'startTime', sortable: false },
      { text: '予約上限数', value: 'totalNumber' },
      { text: '現在の予約数', value: 'reservationNumber' },
      { text: '予約可能数', value: 'availableNumber' },
      { text: '', value: 'actions', sortable: false },
    ],
    availableSchedules: [],
    editedIndex: -1,
    editedItem: {
      date: '',
      startTime: '',
      totalNumber: 0,
      reservationNumber: 0,
      availableNumber: 0,
    },
    defaultItem: {
      date: '',
      startTime: '',
      totalNumber: 0,
      reservationNumber: 0,
      availableNumber: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新規作成' : '編集'
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

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.availableSchedules = [
        {
          date: '2022年2月13日(日)',
          startTime: '9:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '10:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '11:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '12:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '13:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '14:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月13日(日)',
          startTime: '15:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月19日(土)',
          startTime: '9:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月19日(土)',
          startTime: '10:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
        {
          date: '2022年2月19日(土)',
          startTime: '11:00',
          totalNumber: 10,
          reservationNumber: 6,
          availableNumber: 4,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.availableSchedules.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.availableSchedules.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.availableSchedules.splice(this.editedIndex, 1)
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.availableSchedules[this.editedIndex], this.editedItem)
      } else {
        this.availableSchedules.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>