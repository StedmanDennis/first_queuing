'use client'

import { SchoolContext, useSchools } from "@/lib/domain/resources/school";
import { PropsWithChildren } from "react";

export default function ResourceProvider({ children }: PropsWithChildren) {
    const schools = useSchools()
    return (
        <SchoolContext value={schools}>
            {children}
        </SchoolContext>
    )

}