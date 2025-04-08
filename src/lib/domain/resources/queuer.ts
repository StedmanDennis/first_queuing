import useLocalStorage from "@/hooks/use-local-storage"

//types
export type Queuer = {
    id: number
    name: string
}

export type AddQueuer = Omit<Queuer, 'id'>

//hooks
export function useQueuers(){
    const [localQueuerIdSequence, setQueuerIdSequence] = useLocalStorage<number>("queuerSequence")
    const [localQueuers, setQueuers] = useLocalStorage<Queuer[]>("queuers")

    const queuerIdSequence = localQueuerIdSequence ?? 0
    const queuers = localQueuers ?? []

    function addQueuer(newQueuer: AddQueuer){
        const newQueuerId = queuerIdSequence+1
        setQueuers([...queuers, {id: newQueuerId,...newQueuer}])
        setQueuerIdSequence(newQueuerId)
    }
    function removeQueuer(id: number){
        setQueuers(queuers.filter(t => t.id != id))
    }
    return {queuers, addQueuer, removeQueuer}
}