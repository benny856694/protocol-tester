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
import { ReaderIcon } from '@radix-ui/react-icons';
import { Toggle } from '@/components/ui/toggle';
import { useTranslation } from 'react-i18next';


const recordsAtomConfig = atom<CaptureRecord[]>([])
const selRecordAtomConfig = atom<CaptureRecord | null>(null)
const detailsVisibleAtomConfig = atom(false)

export default function HttpServer({ onNewRecord }: { onNewRecord?: (r: CaptureRecord) => void }) {
    const [records, setRecords] = useAtom(recordsAtomConfig)
    const [currentRecord, setCurrentRecord] = React.useState<CaptureRecord>()
    const [selRecord, setSelRecord] = useAtom(selRecordAtomConfig)
    const [detailsVisible, setDetailsVisible] = useAtom(detailsVisibleAtomConfig)
    const { t } = useTranslation()

    function addRecord(r: CaptureRecord) {
        setRecords([r, ...records])
    }

    function toggleDetailsView() {
        setDetailsVisible(!detailsVisible)
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
        <div className='h-full flex flex-col overflow-y-auto'>
            <div className='col-span-2 flex flex-row items-center border rounded px-2 py-1 mb-2'>
                {t('httpServerUrl')}: http://*:8080/upload/record
                <Toggle className='ml-auto' size="sm" pressed={detailsVisible} onPressedChange={toggleDetailsView}><ReaderIcon className='h-4 w-4 p-0 mr-1' />{t('details')}</Toggle>
            </div>
            <div className='flex-1 overflow-y-auto flex flex-row gap-2'>
                <ScrollArea className='self-start flex-[3_3_0%] h-full rounded border'>
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
                    detailsVisible && (
                        <div className='flex-1 flex flex-col overflow-auto rounded border p-2'>
                            <div className='max-h-[64px] w-full flex flex-row justify-center gap-4'>
                                {selRecord?.closeup_pic?.data && <img src={normalizeImageData(selRecord?.closeup_pic?.data)} alt="closeup" width={64} height={64} />}
                                {selRecord?.match?.image && <img src={normalizeImageData(selRecord?.match?.image)} alt="template" width={64} height={64} />}
                            </div>
                            {!selRecord && <p className='flex justify-center items-center h-full'>{t('clickOneRowToViewDetail')}</p>}
                            {selRecord && <ScrollArea>
                                {<JsonViewer data={selRecord} />}
                            </ScrollArea>}
                        </div>
                    )
                }

            </div>

        </div>
    )
}
