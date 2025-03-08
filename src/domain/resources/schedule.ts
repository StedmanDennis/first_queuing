import useLocalStorage from "@/hooks/use-local-storage"
import { Match } from "./match"
import { Queuer, AddQueuer } from "./queuer"

//types
export type Schedule = {
    id: number
    name: string
    matches: Match[]
}

export type AddSchedule = Omit<Schedule, 'id' | 'matches'> & {matches?: Match[]}

//hooks
export default function useQueuers(){
    const [queuerIdSequence, setQueuerIdSequence] = useLocalStorage<number>("queuerSequence", 0)
    const [queuers, setQueuers] = useLocalStorage<Queuer[]>("queuers", Array.from({length: 10}, (_,i) => ({id:1, name: (i+1).toString()})))
    function addQueuer(newQueuer: AddQueuer){
        setQueuers([...queuers, {id: 10+queuerIdSequence+1,...newQueuer}])
        setQueuerIdSequence(queuerIdSequence+1)
    }
    function removeQueuer(id: number){
        setQueuers(queuers.filter(t => t.id != id))
    }
    return {queuers, addQueuer, removeQueuer}
}