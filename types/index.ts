export type Reservation = {
  id: string
  date: string
  startTime: string
  numberOfPeople: number
  name: string
  email: string
  phoneNumber: string
}

export type ReservationAvailableSchedule = {
  id: number
  date: string
  startTime: string
  status: string
  availableNumber: number
  totalNumber: number
}