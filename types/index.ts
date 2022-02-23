import { components } from './generated-schema'

export type Reservation = components['schemas']['ReservationResponse']
export type ReservationRequest = components['schemas']['ReservationRequest']

export type Schedule = components['schemas']['ScheduleResponse']
export type ScheduleRequest = components['schemas']['ScheduleRequest']

export type LoginRequest = components['schemas']['LoginRequest']