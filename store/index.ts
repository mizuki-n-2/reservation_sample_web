import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { Reservation, ReservationRequest, Schedule } from '~/types'

export const state = () => ({
  reservations: [] as Reservation[],
  schedules: [] as Schedule[],
  token: '' as string,
})

export const getters = getterTree(state, {
  reservations: (state) => state.reservations,
  schedules: (state) => state.schedules,
  findSchedule: (state) => (id: string) =>
    state.schedules.find((schedule) => schedule.id === id),
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
  setSchedules(state, schedules: Schedule[]) {
    state.schedules = schedules
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
    async postReservation({ commit }, reservationRequest: ReservationRequest) {
      console.log(reservationRequest)
      const reservation = await this.$axios.$post('/reservations', reservationRequest)
      console.log(reservation)

      commit('addReservation', reservation)
      commit('incrementReservationNumber', reservation.scheduleId)
    },
    async deleteReservation({ commit }, reservation: Reservation) {
      await this.$axios.$delete(`/reservations/${reservation.id}`)

      commit('deleteReservation', reservation.id)
      commit('decrementReservationNumber', reservation.schedule_id)
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
