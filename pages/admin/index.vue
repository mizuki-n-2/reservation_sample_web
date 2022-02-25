<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="mt-3">
        <v-card-title class="d-flex justify-center"
          >管理者ログイン</v-card-title
        >
        <v-form ref="form">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="メールアドレス"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                rules.required,
                rules.minLengthPassword,
                rules.maxLengthPassword,
              ]"
              :type="showPassword ? 'text' : 'password'"
              label="パスワード"
              hint="8文字以上30文字以下にしてください"
              counter
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" class="mb-3" @click="login">
              ログイン
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules: {
        required: (value) => !!value || '必須項目です。',
        email: (value) => {
          const EMAIL_PATTERN = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/
          return (
            EMAIL_PATTERN.test(value) ||
            'メールアドレスの形式が正しくありません。'
          )
        },
        minLengthPassword: (value) => {
          const PASSWORD_MIN_LENGTH = 8
          return (
            value.length >= PASSWORD_MIN_LENGTH ||
            `パスワードは${PASSWORD_MIN_LENGTH}文字以上にしてください。`
          )
        },
        maxLengthPassword: (value) => {
          const PASSWORD_MAX_LENGTH = 30
          return (
            value.length <= PASSWORD_MAX_LENGTH ||
            `パスワードは${PASSWORD_MAX_LENGTH}文字以下にしてください。`
          )
        },
      },
    }
  },
  created() {
    const isAdmin = this.$accessor.isAdmin
    if (!isAdmin) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return
      }

      await this.$accessor.login({
        email: this.email,
        password: this.password,
      })

      this.$router.push('/admin/schedules')
    },
  },
}
</script>
