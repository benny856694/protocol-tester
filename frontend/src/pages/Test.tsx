import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MethodCombobox, { ComboboxItem } from "@/components/methodcombobox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from 'jotai'
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "sonner";
import { CommandSelection } from "@/components/commandselect";

let items: ComboboxItem[] = [
    { value: "get", label: "GET" },
    { value: "post", label: "POST" },
]

const methodAtom = atom<'get' | 'post'>('post')
const jsonCommandAtom = atom('')
const deviceUrlAtom = atom('')
const resAtom = atom('')
const sendBtnDisableAtom = atom((get) => {
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
    const [busy, setBusy] = useState(false)
    async function sendCommand() {
        setRes("")
        setBusy(true)

        try {
            let resp = await fetch(url, {
                method,
                body: cmd
            })
            await new Promise(resolve => setTimeout(resolve, 500));
            let res = await resp.json()
            setRes(JSON.stringify(res, null, 2))
        } catch (error) {
            toast("发生错误，请重试")
        } finally {
            setBusy(false)
        }

    }

    return (
        <div className="flex flex-col h-full w-full p-2 gap-4">
            <div className="  mb-2 flex flex-row items-center gap-x-4">
                <MethodCombobox items={items} selectedValue={method} onSelect={(v) => setMethod(v as 'get' | 'post')} />
                <Label className="flex items-center gap-2 ">URL:
                    <Input className="inline-block flex-1 w-96"
                        value={url}
                        onInput={v => setUrl(v.currentTarget.value)}
                        placeholder="设备Url (http://192.168.0.167:8000)" />
                </Label>
                <Button
                    disabled={sendButtonDisabled || busy}
                    onClick={sendCommand}>
                    {busy && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    发送命令
                </Button>
            </div>
            <div className="w-full flex-1  rounded  flex flex-col gap-2 ">

                <CommandSelection onSelectCmd={cmd=>{
                    setCmd(JSON.stringify(cmd, null, 2))
                }} />
                <Textarea className="flex-1" disabled={method == 'get'} value={cmd} onChange={v => setCmd(v.currentTarget.value)}></Textarea>

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