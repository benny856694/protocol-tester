import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { CaptureRecord, Convert } from "../models/capture-record";
import { EventsOn } from '../../wailsjs/runtime/runtime';


export default function HttpServer() {
    const [records, setRecords] = React.useState<CaptureRecord[]>([])
    React.useEffect(()=>{
        return EventsOn('capture-record', (data) => setRecords([data, ...records])); 
    }, []);
    return (
        <div className='border h-full rounded'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Time</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Sequence</TableHead>
                        <TableHead className="text-right">Device SN</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.map((r) => (
                        <TableRow key={r.sequence_no}>
                            <TableCell className="font-medium">{r.cap_time}</TableCell>
                            <TableCell>{r.match?.person_name}</TableCell>
                            <TableCell>{r.sequence_no}</TableCell>
                            <TableCell className="text-right">{r.device_sn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{records.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
