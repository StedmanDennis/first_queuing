import { Alliance } from "./alliance"

//types
export type MatchStage = 'Qualifier' | 'Semi-finals' | 'Finals'
export type MatchStatus = 'Pending' | 'Queuing' | 'Queued' |'Completed'

export type Match = {
    id: number
    order: number
    stage: MatchStage
    status: MatchStatus
    alliances: Alliance[]
}