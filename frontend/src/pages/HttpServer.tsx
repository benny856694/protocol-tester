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
import { cn, normalizeImageData } from '@/lib/utils';
import { ReaderIcon } from '@radix-ui/react-icons';
import { Toggle } from '@/components/ui/toggle';
import { useTranslation } from 'react-i18next';

const smallThumbnailSize = 32
const bigThumbnailSize = 100


const selRecordAtomConfig = atom<CaptureRecord | null>(null)
const detailsVisibleAtomConfig = atom(false)

export default function HttpServer({ records }: { records: CaptureRecord[] }) {
    const [selRecord, setSelRecord] = useAtom(selRecordAtomConfig)
    const [detailsVisible, setDetailsVisible] = useAtom(detailsVisibleAtomConfig)
    const { t } = useTranslation()

    

    function toggleDetailsView() {
        setDetailsVisible(!detailsVisible)
    }

   



    return (
        <div className='h-full flex flex-col overflow-y-auto'>
            <div className='col-span-2 flex flex-row items-center border rounded px-2 py-1 mb-2'>
                {t('httpServerUrl')}: http://*:18080/upload/record
                <Toggle className='ml-auto' size="sm" pressed={detailsVisible} onPressedChange={toggleDetailsView}><ReaderIcon className='h-4 w-4 p-0 mr-1' />{t('details')}</Toggle>
            </div>
            <div className='flex-1 overflow-y-auto flex flex-row gap-2'>
                <ScrollArea className='self-start flex-[3_3_0%] h-full rounded border'>
                    {records.length > 0 && <Table className='relative'>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader >
                            <TableRow className='sticky top-0'>
                                <TableHead className="">Images</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>ID</TableHead>
                                {/* <TableHead>Sequence</TableHead> */}
                                <TableHead className="">Device SN</TableHead>
                                <TableHead className="">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((r) => (
                                <TableRow onClick={() => setSelRecord(r)} key={r.cap_time + r.device_sn}>
                                    <TableCell className={cn('w-full flex flex-row  gap-4')}>
                                        {r.closeup_pic?.data && <img className='rounded' src={normalizeImageData(r.closeup_pic?.data)} alt="closeup" width={smallThumbnailSize} height={smallThumbnailSize} />}
                                        {r.match?.image && <img className='rounded' src={normalizeImageData(r.match?.image)} alt="template" width={smallThumbnailSize} height={smallThumbnailSize} />}
                                    </TableCell>
                                    <TableCell>{r.match?.person_name}</TableCell>
                                    <TableCell>{r.match?.person_id}</TableCell>
                                    {/* <TableCell>{r.sequence_no}</TableCell> */}
                                    <TableCell className="">{r.device_sn}</TableCell>
                                    <TableCell className="font-medium">{r.cap_time}</TableCell>
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
                            <div className={cn(' w-full flex flex-row justify-center gap-4')}>
                                {selRecord?.closeup_pic?.data && <img className='rounded' src={normalizeImageData(selRecord?.closeup_pic?.data)} alt="closeup" width={bigThumbnailSize} height={bigThumbnailSize} />}
                                {selRecord?.match?.image && <img className='rounded' src={normalizeImageData(selRecord?.match?.image)} alt="template" width={bigThumbnailSize} height={bigThumbnailSize} />}
                            </div>
                            {!selRecord && <p className='flex justify-center items-center h-full text-center'>{t('clickOneRowToViewDetail')}</p>}
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
