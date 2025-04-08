import useLocalStorage from "@/hooks/use-local-storage"
import { localStorageGet } from "@/lib/storage"
import { createContext } from "react"
import { z } from "zod"

//types
export type School = {
    id: number
    name: string
}

export type AddSchool = Omit<School, 'id'>

//parsers
export const schoolSchema = z.object(
    {
        id: z.number().positive(),
        name: z.string().trim().nonempty().refine(      
            (val) => {
                const schools = getSchools()
                return !schools.some((school) => school.name === val)
            },
            'There is already a school with this name.'
        )
    }
)

export const addSchoolSchema = schoolSchema.omit({id: true})

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

//utilities
function getSchools(): School[]{
    const localSchools = localStorageGet<School[]>('schools')
    let schools: School[] = []
    if (localSchools){
        schools = localSchools
    }
    return schools
}

// function setSchools(value: School[]){
//     localStorageSet('schools', value)
// }

// function getSchoolIdSequence(){
//     localStorageGet<number>('schoolSequence')
//     const localSchoolIdSequence = localStorageGet<number>('schoolSequence')
//     return localSchoolIdSequence ?? 0
// }

// function setSchoolIdSequence(value: number){
//     localStorageSet('schoolSequence', value)
// }

// function addSchool(newSchool: AddSchool){
//     const schools = getSchools()
//     const localSchoolIdSequence = getSchoolIdSequence()
//     const newSchoolId = localSchoolIdSequence + 1
//     const updatedSchools = [...schools, {id: newSchoolId,...newSchool}]
//     setSchools(updatedSchools)
//     setSchoolIdSequence(newSchoolId)
// }

// function removeSchool(id: number){
//     const schools = getSchools()
//     const updatedSchools = schools.filter(s => s.id != id)
//     setSchools(updatedSchools)
// }

//contexts
type SchoolContextState = {
    schools: School[]
    addSchool(newSchool: AddSchool): void
    removeSchool(id: number): void
}

export const SchoolContext = createContext<SchoolContextState>({} as SchoolContextState)