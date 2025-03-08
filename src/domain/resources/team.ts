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
    //const [teamIdSequence, setTeamIdSequence] = useLocalStorage<number>("teamSequence", 0)
    const [teams, setTeams] = useLocalStorage<Team[]>("teams", []/*Array.from({length: 10}, (_,i) => ({teamNumber: i+1, schoolId:1, name: `Team ${i+1}`})*/)
    function addTeam(newTeam: AddTeam){
        setTeams([...teams, newTeam])
        //setTeamIdSequence(teamIdSequence+1)
    }
    function removeTeam(id: number){
        setTeams(teams.filter(t => t.teamNumber != id))
    }
    return {teams, addTeam, removeTeam}
}