import { getAccessorType, getterTree, mutationTree, actionTree } from 'typed-vuex'
import { Reservation, ReservationAvailableSchedule } from '~/types'

export const state = () => ({
  reservations: [] as Reservation[],
  reservationAvailableSchedules: [] as ReservationAvailableSchedule[],
})

export const getters = getterTree(state, {
  reservations: state => state.reservations,
  reservationAvailableSchedules: state => state.reservationAvailableSchedules,
})

export const mutations = mutationTree(state, {
  setReservations(state, reservations: Reservation[]) {
    state.reservations = reservations
  },
  addReservation(state, reservation: Reservation) {
    state.reservations.push(reservation)
  },
  setReservationAvailableSchedules(state, reservationAvailableSchedules: ReservationAvailableSchedule[]) {
    state.reservationAvailableSchedules = reservationAvailableSchedules
  }
})

export const actions = actionTree({ state, getters, mutations }, {
  async getReservations({ commit }) {
    // TODO: fetch reservations from API
    const reservations = [
      {
        id: 'reservation-id-1',
        date: '2022年6月11日(土)',
        startTime: '10:00',
        numberOfPeople: 2,
        name: 'マイケル・ジョンソン',
        email: 'aaa@sample.com',
        phoneNumber: '000-0000-0000',
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
        status: '◎',
        availableNumber: 8,
        totalNumber: 10,
      },
      {
        id: 3,
        date: '2022-02-08',
        startTime: '10:00',
        status: '×',
        availableNumber: 0,
        totalNumber: 10,
      },
      {
        id: 4,
        date: '2022-02-10',
        startTime: '12:00',
        status: '◎',
        availableNumber: 6,
        totalNumber: 10,
      },
      {
        id: 2,
        date: '2022-02-09',
        startTime: '15:00',
        status: '△',
        availableNumber: 4,
        totalNumber: 10,
      },
    ]

    commit('setReservationAvailableSchedules', reservationAvailableSchedules)
  },
  // TODO: change any type
  async postReservation({ commit }, reservation: any) {
    // TODO: post reservation to API
    const reservationId = 'reservation-id-00'

    const numberOfPeople = Number(reservation.adultNumber) + Number(reservation.primarySchoolChildNumber) + Number(reservation.childNumber)

    const newReservation = {
      id: reservationId,
      date: reservation.date,
      startTime: reservation.startTime,
      numberOfPeople,
      name: reservation.name,
      email: reservation.email,
      phoneNumber: reservation.phoneNumber,
    }

    commit('addReservation', newReservation)
  },
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
