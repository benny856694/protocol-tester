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
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { atom, useAtom } from 'jotai';
import { JsonView } from 'react-json-view-lite';
import JsonViewer from '@/components/json-viewer';
import { normalizeImageData } from '@/lib/utils';


const recordsAtomConfig = atom<CaptureRecord[]>([])
const selRecordAtomConfig = atom<CaptureRecord | null>(null)

export default function HttpServer({ onNewRecord }: { onNewRecord?: (r: CaptureRecord) => void }) {
    const [records, setRecords] = useAtom(recordsAtomConfig)
    const [currentRecord, setCurrentRecord] = React.useState<CaptureRecord>()
    const [selRecord, setSelRecord] = useAtom(selRecordAtomConfig)

    function addRecord(r: CaptureRecord) {
        setRecords([r, ...records])
    }

    React.useEffect(() => {
        return EventsOn('capture-record', r => {
            setCurrentRecord(r);
        });
    }, []);

    React.useEffect(() => {
        if (currentRecord) {
            addRecord(currentRecord)
            onNewRecord?.(currentRecord)
        }
    }, [currentRecord])

    return (
        <div className='border h-full flex flex-col rounded overflow-y-auto'>
            <div className='p-2 col-span-2'>
                服务器上传数据URL: http://*:8080/upload/record
            </div>
            <div className='flex-1 overflow-y-auto flex flex-row gap-2'>
                <ScrollArea className='self-start flex-[2_2_0%] h-full'>
                    {records.length > 0 && <Table className='relative'>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader >
                            <TableRow className='sticky top-0'>
                                <TableHead className="">Time</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Sequence</TableHead>
                                <TableHead className="">Device SN</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((r) => (
                                <TableRow onClick={() => setSelRecord(r)} key={r.sequence_no + r.device_sn}>
                                    <TableCell className="font-medium">{r.cap_time}</TableCell>
                                    <TableCell>{r.match?.person_name}</TableCell>
                                    <TableCell>{r.match?.person_id}</TableCell>
                                    <TableCell>{r.sequence_no}</TableCell>
                                    <TableCell className="">{r.device_sn}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{records.length}</TableCell>
                        </TableRow>
                    </TableFooter> */}
                    </Table>}
                </ScrollArea>

                {
                    selRecord && (
                        <div className='flex-1 flex flex-col overflow-auto'>
                            <div className='max-h-[64px] w-full flex flex-row justify-center gap-4'>
                                {selRecord?.closeup_pic?.data && <img src={normalizeImageData(selRecord?.closeup_pic?.data)} alt="closeup" width={64} height={64} />}
                                {selRecord?.match?.image && <img src={normalizeImageData(selRecord?.match?.image)} alt="template" width={64} height={64} />}
                            </div>
                            <ScrollArea>
                                <JsonViewer data={selRecord} />
                            </ScrollArea>
                        </div>
                    )
                }

            </div>

        </div>
    )
}
