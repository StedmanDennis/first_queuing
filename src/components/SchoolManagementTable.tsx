'use client'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { School, useSchools } from "@/domain/resources/school"

export default function SchoolManagementTable(){
    const {schools, addSchool, removeSchool} = useSchools()

    const columnhelper = createColumnHelper<School>()

    const table = useReactTable({
        data: schools,
        columns: [
            columnhelper.accessor('id',{
                header: 'Identifier',
                cell: col => col.getValue(),
            }),
            columnhelper.accessor('name',{
                header: 'School name',
                cell: col => col.getValue(),
            }),
            columnhelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (props) => (
                <div className="grid grid-rows-2 gap-y-1 sm:flex gap-x-1">
                    <Button className='bg-blue-600'>Edit</Button>
                    <Button className='bg-red-600' onClick={()=>removeSchool(props.row.getValue('id'))}>Delete</Button>
                </div>)
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
                    {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={table.getAllColumns().length+1} className="h-24 text-center">
                            No data
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog>
                <DialogTrigger className='bg-green-600'>Add School</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add School</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter details of new school
                    </DialogDescription>
                    <form onSubmit={(e)=>{
                            e.preventDefault()
                            const data = new FormData(e.target as HTMLFormElement)
                            addSchool({name: data.get('schoolName')!.valueOf() as string})
                        }}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="schoolName" className="text-right">
                                School Name
                            </Label>
                            <Input
                            id="schoolName"
                            name="schoolName"
                            className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose type='submit'>
                            Add School
                        </DialogClose>
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}