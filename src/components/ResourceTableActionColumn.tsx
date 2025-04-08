import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

type Props = PropsWithChildren & {
    editAction?: () => void
    deleteAction?: () => void
}

export default function ResourceTableActionColumn({ editAction, deleteAction, children }: Props) {
    return (
        <div className="grid grid-flow-row gap-1 sm:grid-flow-col">
            <Button disabled={editAction === undefined} className='bg-blue-600' onClick={() => editAction?.()}>Edit</Button>
            <Button disabled={deleteAction === undefined} className='bg-red-600' onClick={() => deleteAction?.()}>Delete</Button>
            {children}
        </div>
    )
}