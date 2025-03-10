import useLocalStorage from "@/hooks/use-local-storage"

//types
export type Team = {
    teamNumber: number
    schoolId: number 
    name: string
}

export type AddTeam = Team
export type QueuingTeam = Team & {queuingStatus: 'Queuing | Queued', assignedQueuerId: number | undefined}

//hooks
export function useTeams(){
    const [teams, setTeams] = useLocalStorage<Team[]>("teams", [])
    function addTeam(newTeam: AddTeam){
        setTeams([...teams, newTeam])
    }
    function removeTeam(id: number){
        setTeams(teams.filter(t => t.teamNumber != id))
    }
    return {teams, addTeam, removeTeam}
}