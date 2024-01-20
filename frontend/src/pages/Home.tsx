import { LogDebug } from "../../wailsjs/runtime/runtime";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import React from "react";
import ComboBox, { ComboboxItem } from "@/components/methodcombobox";
import { GetSerialPortList } from "../../wailsjs/go/main/App";
import { PortDetails } from "../models";
import { EventsOn } from "../../wailsjs/runtime";




export default function () {
    const [serialPorts, setSerialPorts] = React.useState<ComboboxItem[]>([])
    const [selCom, setSelCom] = React.useState("")
    const [src, setSrc] = React.useState("")
    const [captureRecords, setCaptureRecords] = React.useState<any[]>([])

    React.useEffect(() => {
        GetSerialPortList().then(data => {
            let ports = data as PortDetails[]
            setSerialPorts(ports.map(item => ({ value: item.Name.toLowerCase(), label: item.Name })))
        })
    })

    React.useEffect(() => EventsOn('capture-record', (data) => setCaptureRecords([data, ...captureRecords])))

    return (
        <div className="h-100% place-items-center mx-auto ">
            <ComboBox items={serialPorts} selectedValue={selCom} selectPlaceHolder="请选择串口" searchPlaceHolder="搜索串口" onSelect={setSelCom} />
            <div className=" text-2xl font-bold flex flex-col items-center space-y-4">
                <h1>Vite + React + TS + Tailwind + shadcn/ui</h1>
                <Button>
                    Enumerate Serial Ports
                </Button>
                <Input value={src} onInput={(e) => setSrc(e.currentTarget.value)} />
                {src && <img src={src} alt="an image" />}
                <ul>
                    {captureRecords.map(cr => (<li>{cr.cap_time}</li>))}
                </ul>
                <Dialog>
                    <DialogTrigger><Button>Show Dialog</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}