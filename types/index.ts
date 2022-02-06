export type Reservation = {
  id: number
  date: string
  startTime: string
  numberOfPeople: number
  name: string
  email: string
  phoneNumber: string
  searchId: string
}

export type ReservationAvailableSchedule = {
  id: number
  date: string
  startTime: string
  status: string
  availableNumber: number
  totalNumber: number
}