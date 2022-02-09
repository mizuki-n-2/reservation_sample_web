<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />

      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="changeRole" v-bind="attrs" v-on="on">
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
      userItems: [
        {
          icon: 'mdi-calendar-clock',
          title: '予約画面',
          to: '/',
        },
      ],
      adminItems: [
        {
          icon: 'mdi-calendar-check',
          title: '予約確認',
          to: '/admin/reservations',
        },
        {
          icon: 'mdi-cog',
          title: '設定',
          to: '/admin/reservations/settings',
        },
      ],
      miniVariant: true,
      title: '観光予約システム',
    }
  },
  computed: {
    items() {
      return this.isAdmin ? this.adminItems : this.userItems
    },
  },
  methods: {
    changeRole() {
      this.isAdmin = !this.isAdmin
      if(this.isAdmin) {
        this.$router.push('/admin')
      } else {
        this.$router.push('/')
      }
    },
  }
}
</script>
