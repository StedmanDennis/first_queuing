'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { useTeams } from "@/domain/resources/team"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function TeamManagementTable(){
    const {teams, addTeam, removeTeam} = useTeams()
    const table = useReactTable({
        data: teams,
        columns: [
            {
                accessorKey: 'teamNumber',
                header: 'Team number'
            },
            {
                accessorKey: 'name',
                header: 'Team name'
            }
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
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                        <TableCell className="grid grid-rows-2 gap-y-1 sm:flex gap-x-1">
                            <Button className='bg-blue-600'>Edit</Button>
                            <Button className='bg-red-600' onClick={()=>removeTeam(row.getValue('teamNumber'))}>Delete</Button>
                        </TableCell>
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
                <DialogTrigger className='bg-green-600'>Add Team</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Team</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter details of new team
                    </DialogDescription>
                    <form onSubmit={(e)=>{
                            e.preventDefault()
                            const data = new FormData(e.target as HTMLFormElement)
                            addTeam({schoolId: 1, teamNumber: parseInt(data.get('teamNumber')!.valueOf() as string), name: data.get('teamName')!.valueOf() as string})
                        }}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="teamNumber" className="text-right">
                                Team Number
                            </Label>
                            <Input
                            id="teamNumber"
                            name="teamNumber"
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="teamName" className="text-right">
                            Team Name
                            </Label>
                            <Input
                            id="teamName"
                            name="teamName"
                            className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose type='submit'>
                            Add Team
                        </DialogClose>
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}