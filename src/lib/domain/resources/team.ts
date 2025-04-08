import useLocalStorage from "@/hooks/use-local-storage"
import { z } from "zod"
import { School } from "./school"

//types
export type Team = {
    teamNumber: number
    schoolId: number 
    name: string
}

export type AddTeam = Team
export type QueuingTeam = Team & {queuingStatus: 'Queuing | Queued', assignedQueuerId: number | null}

//parsers
export const teamSchema = (schools: School[]) => z.object({
    teamNumber: z.number(),
    schoolId: z.number().refine(
        (val) => schools.some((school) => school.id === val)
    )
})

//hooks
export function useTeams(){
    const [localTeams, updateTeams] = useLocalStorage<Team[]>("teams")
    const teams = localTeams ?? []
    
    function addTeam(newTeam: AddTeam){
        updateTeams([...teams, newTeam])
    }
    function removeTeam(id: number){
        updateTeams(teams.filter(t => t.teamNumber != id))
    }
    return {teams, addTeam, removeTeam}
}