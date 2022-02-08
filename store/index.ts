import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { Reservation, ReservationAvailableSchedule } from '~/types'

export const state = () => ({
  reservations: [] as Reservation[],
  reservationAvailableSchedules: [] as ReservationAvailableSchedule[],
})

export const getters = getterTree(state, {
  reservations: (state) => state.reservations,
  reservationAvailableSchedules: (state) => state.reservationAvailableSchedules,
  findAvailableSchedule: (state) => (id: number) =>
    state.reservationAvailableSchedules.find((schedule) => schedule.id === id),
})

export const mutations = mutationTree(state, {
  setReservations(state, reservations: Reservation[]) {
    state.reservations = reservations
  },
  addReservation(state, reservation: Reservation) {
    state.reservations.push(reservation)
  },
  deleteReservation(state, reservationId: number) {
    state.reservations = state.reservations.filter(
      (reservation) => reservation.id !== reservationId
    )
  },
  setReservationAvailableSchedules(
    state,
    reservationAvailableSchedules: ReservationAvailableSchedule[]
  ) {
    state.reservationAvailableSchedules = reservationAvailableSchedules
  },
  // TODO: change any type
  incrementAvailableNumber(
    state,
    reservationDateTime: any
  ) {
    const index = state.reservationAvailableSchedules.findIndex(
      (schedule) => schedule.date === reservationDateTime.date && schedule.startTime === reservationDateTime.startTime
    )
    state.reservationAvailableSchedules[index].availableNumber += 1 
  },
  decrementAvailableNumber(
    state,
    scheduleId: number,
  ) {
    const index = state.reservationAvailableSchedules.findIndex(schedule => schedule.id === scheduleId)
    state.reservationAvailableSchedules[index].availableNumber -= 1 
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getReservations({ commit }) {
      // TODO: fetch reservations from API
      const reservations = [
        {
          id: 1,
          date: '2022-06-11',
          startTime: '10:00',
          numberOfPeople: 2,
          name: 'マイケル・ジョンソン',
          email: 'aaa@sample.com',
          phoneNumber: '000-0000-0000',
          searchId: 'reservation1',
        },
        {
          id: 2,
          date: '2022-02-14',
          startTime: '10:00',
          numberOfPeople: 6,
          name: '田中太郎',
          email: 'bbb@sample.com',
          phoneNumber: '000-0000-0000',
          searchId: 'reservation2',
        },
      ]

      commit('setReservations', reservations)
    },
    async getReservationAvailableSchedules({ commit }) {
      // TODO: fetch reservation available schedules from API
      const reservationAvailableSchedules = [
        {
          id: 1,
          date: '2022-02-05',
          startTime: '9:00',
          availableNumber: 8,
          totalNumber: 10,
        },
        {
          id: 3,
          date: '2022-02-14',
          startTime: '10:00',
          availableNumber: 5,
          totalNumber: 10,
        },
        {
          id: 4,
          date: '2022-02-10',
          startTime: '12:00',
          availableNumber: 6,
          totalNumber: 10,
        },
        {
          id: 2,
          date: '2022-02-09',
          startTime: '15:00',
          availableNumber: 4,
          totalNumber: 10,
        },
      ]

      commit('setReservationAvailableSchedules', reservationAvailableSchedules)
    },
    // TODO: change any type
    async postReservation({ commit }, reservation: any) {
      // TODO: post reservation to API
      const reservationId = 3
      const searchId = 'reservation3'

      const numberOfPeople =
        Number(reservation.adultNumber) +
        Number(reservation.primarySchoolChildNumber) +
        Number(reservation.childNumber)

      const newReservation = {
        id: reservationId,
        date: reservation.date,
        startTime: reservation.startTime,
        numberOfPeople,
        name: reservation.name,
        email: reservation.email,
        phoneNumber: reservation.phoneNumber,
        searchId,
      }

      commit('addReservation', newReservation)
      commit('decrementAvailableNumber', reservation.scheduleId)
    },
    async deleteReservation({ commit }, reservationId: number) {
      // TODO: delete reservation from API
      commit('deleteReservation', reservationId)
    },
    // TODO: change any type
    async incrementAvailableNumber({ commit }, reservationDateTime: any) {
      // TODO: update available schedule status from API
      commit('incrementAvailableNumber', reservationDateTime)
    },
    async decrementAvailableNumber({ commit }, scheduleId: number) {
      // TODO: update available schedule status from API
      commit('decrementAvailableNumber', scheduleId)
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
