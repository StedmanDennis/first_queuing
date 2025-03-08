import { Team, QueuingTeam } from "./team"

//types
export type Alliance = {
    id: number
    name: string
    colorHex: string
    teams: Team[] | QueuingTeam[]
}