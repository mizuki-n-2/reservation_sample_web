<template>
  <v-app>
    <v-app-bar fixed app>
      <v-icon left>mdi-calendar-clock</v-icon>
      <v-toolbar-title v-text="title" />

      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" @click="changeRole" v-on="on">
            <v-icon>mdi-{{ `${isAdmin ? 'account' : 'account-tie'}` }}</v-icon>
          </v-btn>
        </template>
        <span v-if="isAdmin">ユーザー画面へ</span>
        <span v-else>管理者画面へ</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }} mizuki-n-2(仮)</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: false,
      title: '観光予約システム',
    }
  },
  computed: {
    items() {
      return this.isAdmin ? this.adminItems : this.userItems
    },
  },
  created() {
    this.isAdmin = this.$accessor.isAdmin
  },
  methods: {
    changeRole() {
      this.$accessor.changeRole(!this.isAdmin)

      if (!this.isAdmin) {
        this.$router.push('/admin')
      } else {
        this.$router.push('/')
      }

      this.isAdmin = !this.isAdmin
    },
  },
}
</script>
