'use client'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { School, SchoolContext } from "@/lib/domain/resources/school"
import { useContext, useState } from "react"
import AddSchoolForm from "./AddSchoolForm"

export default function SchoolManagementTable() {
    const { schools, removeSchool } = useContext(SchoolContext)
    const [addFormOpen, setAddFormOpen] = useState(false)

    const columnhelper = createColumnHelper<School>()

    const table = useReactTable({
        data: schools,
        initialState: {
            columnVisibility: {
                id: false
            }
        },
        columns: [
            columnhelper.accessor('id', {
                header: 'Identifier'
            }),
            columnhelper.accessor('name', {
                header: 'School Name'
            }),
            columnhelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (props) => (
                    <div className="grid grid-rows-2 gap-y-1 sm:flex gap-x-1">
                        <Button className='bg-blue-600'>Edit</Button>
                        <Button className='bg-red-600' onClick={() => removeSchool(props.row.getValue('id'))}>Delete</Button>
                    </div>
                )
            })

        ],
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="h-full grid grid-rows-[1fr_auto]">
            <Table>
                <TableHeader>
                    <TableRow>
                        {table.getLeafHeaders().map((header) => (
                            <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={addFormOpen} onOpenChange={setAddFormOpen}>
                <DialogTrigger className='bg-green-600'>Add School</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add School</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter details of new school
                    </DialogDescription>
                    <AddSchoolForm submissionCallback={() => { setAddFormOpen(false) }} />
                </DialogContent>
            </Dialog>
        </div>
    )
}