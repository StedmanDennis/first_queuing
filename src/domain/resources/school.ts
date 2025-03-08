import useLocalStorage from "@/hooks/use-local-storage"

//types
export type School = {
    id: number
    name: string
}

export type AddSchool = Omit<School, 'id'>

//hooks
export default function useSchools(){
    const [schoolIdSequence, setSchoolIdSequence] = useLocalStorage<number>("schoolSequence", 0)
    const [schools, setSchools] = useLocalStorage<School[]>("schools", Array.from({length: 10}, (_,i) => ({id:1, name: (i+1).toString()})))
    function addSchool(newSchool: AddSchool){
        setSchools([...schools, {id: 10+schoolIdSequence+1,...newSchool}])
        setSchoolIdSequence(schoolIdSequence+1)
    }
    function removeSchool(id: number){
        setSchools(schools.filter(t => t.id != id))
    }
    return {schools, addSchool, removeSchool}
}