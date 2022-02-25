import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { Reservation, ReservationRequest, Schedule, LoginRequest, ScheduleRequest } from '~/types'

export const state = () => ({
  reservations: [] as Reservation[],
  schedules: [] as Schedule[],
  token: '' as string,
  isAdmin: false as boolean,
})

export const getters = getterTree(state, {
  reservations: (state) => state.reservations,
  schedules: (state) => state.schedules,
  findSchedule: (state) => (id: string) =>
    state.schedules.find((schedule) => schedule.id === id),
  filterReservationsByScheduleId: (state) => (scheduleId: string) =>
    state.reservations.filter((reservation) => reservation.schedule_id === scheduleId),
  token: (state) => state.token,
  isAdmin: (state) => state.isAdmin,
})

export const mutations = mutationTree(state, {
  setReservations(state, reservations: Reservation[]) {
    state.reservations = reservations
  },
  addReservation(state, reservation: Reservation) {
    state.reservations.push(reservation)
  },
  deleteReservation(state, reservationId: string) {
    state.reservations = state.reservations.filter(
      (reservation) => reservation.id !== reservationId
    )
  },
  deleteReservationByScheduleId(state, scheduleId: string) {
    state.reservations = state.reservations.filter(
      (reservation) => reservation.schedule_id !== scheduleId
    )
  },
  setSchedules(state, schedules: Schedule[]) {
    state.schedules = schedules
  },
  addSchedule(state, schedule: Schedule) {
    state.schedules.push(schedule)
  },
  updateSchedule(state, schedule: Schedule) {
    const index = state.schedules.findIndex(
      (s) => s.id === schedule.id
    )
    if (index === -1) return
    state.schedules[index] = schedule
  },
  deleteSchedule(state, scheduleId: string) {
    state.schedules = state.schedules.filter(
      (schedule) => schedule.id !== scheduleId
    )
  },
  incrementReservationNumber(state, scheduleId: string) {
    const index = state.schedules.findIndex(
      (schedule) => schedule.id === scheduleId
    )
    if (index === -1) return
    state.schedules[index].reservation_number += 1
  },
  decrementReservationNumber(state, scheduleId: string) {
    const index = state.schedules.findIndex(
      (schedule) => schedule.id === scheduleId
    )
    if (index === -1) return
    state.schedules[index].reservation_number -= 1
  },
  setToken(state, token: string) {
    state.token = token
  },
  setIsAdmin(state, isAdmin: boolean) {
    state.isAdmin = isAdmin
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getReservations({ commit }) {
      const reservations = await this.$axios.$get('/reservations')

      commit('setReservations', reservations)
    },
    async getSchedules({ commit }) {
      const schedules = await this.$axios.$get('/schedules')
      const sortedSchedules = schedules.sort((a: Schedule, b: Schedule) => {
        return a.date > b.date ? 1 : -1
      })

      commit('setSchedules', sortedSchedules)
    },
    async createReservation({ commit }, reservationRequest: ReservationRequest) {
      const reservation = await this.$axios.$post('/reservations', reservationRequest)

      commit('addReservation', reservation)
      commit('incrementReservationNumber', reservation.scheduleId)
    },
    async deleteReservation({ commit }, reservation: Reservation) {
      await this.$axios.$delete(`/reservations/${reservation.id}`)

      commit('deleteReservation', reservation.id)
      commit('decrementReservationNumber', reservation.schedule_id)
    },
    async createSchedule({ commit }, scheduleRequest: ScheduleRequest) {
      this.$axios.setToken(this.state.token, 'Bearer')
      const schedule = await this.$axios.$post('/admin/schedules', scheduleRequest)

      commit('addSchedule', schedule)
    },
    async updateScheduleMaxNumber({ commit }, scheduleInfo: { id: string; max_number: number }) {
      this.$axios.setToken(this.state.token, 'Bearer')
      const schedule = await this.$axios.$patch(`/admin/schedules/${scheduleInfo.id}`, {
        max_number: scheduleInfo.max_number,
      })

      commit('updateSchedule', schedule)
    },
    async deleteSchedule({ commit }, scheduleId: string) {
      this.$axios.setToken(this.state.token, 'Bearer')
      await this.$axios.$delete(`/admin/schedules/${scheduleId}`)

      commit('deleteSchedule', scheduleId)
      commit('deleteReservationByScheduleId', scheduleId)
    },
    async login({ commit }, loginRequest: LoginRequest) {      
      const res = await this.$axios.$post('/login', loginRequest)

      commit('setToken', res.token)
    },
    changeRole({ commit }, isAdmin: boolean) {
      commit('setIsAdmin', isAdmin)
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
