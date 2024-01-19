import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Combobox, { ComboboxItem } from "@/components/combobox";
import { useState } from "react";
import { Button } from "@/components/ui/button";

let items: ComboboxItem[] = [
    { value: "get", label: "GET" },
    { value: "post", label: "POST" },
]

export default function () {
    var [method, setMethod] = useState('post')
    var [res, setRes] = useState('')
    var [url, setUrl] = useState('')
    var [cmd, setCmd] = useState('')

    async function sendCommand() {
        let resp = await fetch(url, {
            method,
            body: cmd
        })
        let res = await resp.json()
        setRes(JSON.stringify(res, null, 2))
    }

    return (
        <div className="flex flex-col h-full w-full p-2 gap-4">
            <div className="text-nowrap  mb-2 flex flex-row items-center gap-x-2">
                <Combobox items={items} selectedValue={method} onSelect={v => setMethod(v)} />
                <Label className="flex flex-row w-80 items-center gap-2 ">URL:
                    <Input className="inline-block w-full" value={url} onInput={v => setUrl(v.currentTarget.value)} placeholder="设备Url (http://192.168.0.167:8000)" /></Label>
                <Button disabled={!url || !method || !cmd} onClick={sendCommand}>发送命令</Button>
            </div>
            <div className="w-full flex-1  rounded  flex flex-col gap-2 ">
                <Label className="flex-1 h-full flex flex-col gap-2">
                    JSON 命令
                    <Textarea className="flex-1" value={cmd} onChange={v => setCmd(v.currentTarget.value)}></Textarea>
                </Label>
            </div>
            <div className="w-full flex-1 rounded  flex flex-col gap-2 ">
                <Label className="flex-1 h-full flex flex-col gap-2">
                    设备应答
                    <Textarea className="flex-1" value={res}></Textarea>
                </Label>
            </div>
        </div>
    )
}