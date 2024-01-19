import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Combobox, { ComboboxItem } from "@/components/combobox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from 'jotai'

let items: ComboboxItem[] = [
    { value: "get", label: "GET" },
    { value: "post", label: "POST" },
] 

const methodAtom = atom<'get'|'post'>('post')
const jsonCommandAtom = atom('')
const deviceUrlAtom = atom('')
const resAtom = atom('')
const sendBtnDisableAtom = atom((get)=>{
    const method = get(methodAtom);
    const url = get(deviceUrlAtom);
    const jsonCmd = get(jsonCommandAtom)
    if (method === 'get') {
        return !url
    } else {
        return !url || !jsonCmd
    }
})


export default function () {
    const [method, setMethod] = useAtom(methodAtom)
    const [res, setRes] = useAtom(resAtom)
    const [url, setUrl] = useAtom(deviceUrlAtom)
    const [cmd, setCmd] = useAtom(jsonCommandAtom)
    const [sendButtonDisabled] = useAtom(sendBtnDisableAtom)

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
            <div className="  mb-2 flex flex-row items-center gap-x-4">
                <Combobox items={items} selectedValue={method} onSelect={(v) => setMethod(v as 'get'|'post')} />
                <Label className="flex items-center gap-2 ">URL:
                    <Input className="inline-block flex-1 w-96" 
                    value={url} 
                    onInput={v => setUrl(v.currentTarget.value)} 
                    placeholder="设备Url (http://192.168.0.167:8000)" />
                </Label>
                <Button disabled={sendButtonDisabled} onClick={sendCommand}>发送命令</Button>
            </div>
            <div className="w-full flex-1  rounded  flex flex-col gap-2 ">
                <Label className="flex-1 h-full flex flex-col gap-2">
                    JSON 命令
                    <Textarea className="flex-1" disabled={method=='get'} value={cmd} onChange={v => setCmd(v.currentTarget.value)}></Textarea>
                </Label>
            </div>
            <div className="w-full flex-1 rounded  flex flex-col gap-2 ">
                <Label className="flex-1 h-full flex flex-col gap-2">
                    设备应答
                    <Textarea className="flex-1" defaultValue={res} readOnly></Textarea>
                </Label>
            </div>
        </div>
    )
}