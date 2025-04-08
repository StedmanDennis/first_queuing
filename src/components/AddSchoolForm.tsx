import { addSchoolSchema, SchoolContext } from "@/lib/domain/resources/school"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "./ui/form"
import { Input } from "./ui/input"
import { useContext } from "react"

export type AddSchoolFormProps = {
    submissionCallback?: () => void
}

export default function AddSchoolForm({ submissionCallback }: AddSchoolFormProps) {
    const { addSchool } = useContext(SchoolContext)
    const addSchoolForm = useForm<z.infer<typeof addSchoolSchema>>({
        defaultValues: {
            name: ''
        },
        resolver: zodResolver(addSchoolSchema)
    })

    return (
        <Form {...addSchoolForm}>
            <form onSubmit={addSchoolForm.handleSubmit((values) => {
                addSchool(values)
                submissionCallback?.()
            })}>
                <FormField
                    control={addSchoolForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School Name</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                </FormField>
                <Button type='submit' className="bg-green-600">Add School</Button>
            </form>
        </Form>
    )
}