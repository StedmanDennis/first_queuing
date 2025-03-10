import { Match } from "./match"

//types
export type Schedule = {
    id: number
    name: string
    matches: Match[]
}

export type AddSchedule = Omit<Schedule, 'id' | 'matches'> & {matches?: Match[]}

//hooks