import useLocalStorage from "@/hooks/use-local-storage"

//types
export type School = {
    id: number
    name: string
}

export type AddSchool = Omit<School, 'id'>

//hooks
export function useSchools(){
    const [localSchoolIdSequence, setSchoolIdSequence] = useLocalStorage<number>("schoolSequence")
    const [localSchools, setSchools] = useLocalStorage<School[]>("schools")

    const schoolIdSequence = localSchoolIdSequence ?? 0
    const schools = localSchools ?? []

    function addSchool(newSchool: AddSchool){
        const newSchoolId = schoolIdSequence+1
        setSchools([...schools, {id: newSchoolId,...newSchool}])
        setSchoolIdSequence(newSchoolId)
    }
    function removeSchool(id: number){
        setSchools(schools.filter(t => t.id != id))
    }
    return {schools, addSchool, removeSchool}
}