import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import MethodCombobox, { ComboboxItem } from "@/components/methodcombobox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from "jotai/utils";
import { GlobeIcon, PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "sonner";
import { CommandSelection } from "@/components/commandselect";
import { isValidJSON } from "@/lib/utils";
import { z } from "zod";
import { useTranslation, Trans } from 'react-i18next';
import i18next from "i18next";

let items: ComboboxItem[] = [
    { value: "get", label: "GET" },
    { value: "post", label: "POST" },
]

const deviceIp = "device_ip"

const methodAtom = atom<'get' | 'post'>('post')
const jsonCommandAtom = atom<string>('')
const readWriteJsonCommandAtom = atom(
    (get) => get(jsonCommandAtom),
    (_, set, newValue: string) => {
        set(jsonCommandAtom, newValue)
        set(resAtom, '')
    })
const jsonValidateMsgAtom = atom((get) => {
    const json = get(jsonCommandAtom)
    const method = get(methodAtom)
    if (method == 'get') {
        return ''
    } else {
        if (!json) {
            return "cmd-empty"
        } else {
            return isValidJSON(json) ? "" : "invalid-json"
        }
    }
})
const selectedCommandAtom = atom((get) => {
    const jsonValidateMsg = get(jsonValidateMsgAtom)
    const json = get(jsonCommandAtom)
    if (jsonValidateMsg) {
        return ""
    }
    return JSON.parse(json).cmd ?? ""
})
const deviceUrlAtom = atomWithStorage(deviceIp, '')
const resAtom = atom('')
const sendBtnDisableAtom = atom((get) => {
    const method = get(methodAtom);
    const url = get(deviceUrlAtom);
    const jsonCmd = get(jsonCommandAtom)
    const jsonValidateMsg = get(jsonValidateMsgAtom)
    if (method === 'get') {
        return !url
    } else {
        return !url || !jsonCmd || !!jsonValidateMsg
    }
})


export default function () {
    const [method, setMethod] = useAtom(methodAtom)
    const [res, setRes] = useAtom(resAtom)
    const [urlOrIp, setUrl] = useAtom(deviceUrlAtom)
    const [cmd, setCmd] = useAtom(readWriteJsonCommandAtom)
    const [sendButtonDisabled] = useAtom(sendBtnDisableAtom)
    const [busy, setBusy] = useState(false)
    const [jsonValidateMsg] = useAtom(jsonValidateMsgAtom)
    const [selCommand] = useAtom(selectedCommandAtom)
    const { t } = useTranslation()
    async function sendCommand() {
        setRes("")
        setBusy(true)
        const ip = z.string().ip({ version: 'v4' })

        let url = urlOrIp;
        if (ip.safeParse(urlOrIp).success) {
            url = `http://${urlOrIp}:8000`
        }

        try {
            let resp = await fetch(url, {
                method,
                body: cmd
            })
            await new Promise(resolve => setTimeout(resolve, 250));
            let res = await resp.json()
            setRes(JSON.stringify(res, null, 2))
        } catch (error) {
            toast(t("error-tip"))
        } finally {
            setBusy(false)
        }

    }

    function switchLanguages() {
        i18next.changeLanguage(i18next.resolvedLanguage === 'zh' ? 'en' : 'zh')
    }

    return (
        <div className="flex flex-col h-full w-full p-2 gap-4">
            <div className="mb-2 flex flex-row items-center gap-x-4">
                <MethodCombobox items={items} selectedValue={method} onSelect={(v) => setMethod(v as 'get' | 'post')} />
                <Label className="flex items-center gap-2 ">URL:
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Input className="inline-block flex-1 w-96"
                                    value={urlOrIp}
                                    onInput={v => setUrl(v.currentTarget.value)}
                                    placeholder={t('url-input-placeholder')} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('url-input-tip')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Label>
                <Button
                    disabled={sendButtonDisabled || busy}
                    className="mr-auto"
                    onClick={sendCommand}>
                    {busy && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    {!busy && <PaperPlaneIcon className="mr-2 h-4 w-4" />}
                    {t('send-command')}
                </Button>
                <Button variant="ghost" className="justify-self-end" onClick={switchLanguages}>
                    <GlobeIcon className="mr-1" />
                    {i18next.resolvedLanguage === 'zh' ? "中": "En"}
                </Button>
            </div>
            <div className="w-full flex-1  rounded  flex flex-col gap-2 ">
                <Label className="self-start flex gap-4 items-center">
                    <CommandSelection placeHolder={t('select-command')} onSelectCmd={cmd => {
                        setCmd(JSON.stringify(cmd, null, 2))
                    }} />
                    {selCommand}
                </Label>

                <Textarea className="flex-1"
                    disabled={method == 'get'}
                    //aria-errormessage={jsonValidateMsg}
                    value={cmd}
                    onInput={v => { setCmd(v.currentTarget.value) }}>
                </Textarea>
                {jsonValidateMsg && <Label className="text-red-600 text-sm self-start">{t(jsonValidateMsg)}</Label>}

            </div>
            <div className="w-full flex-1 rounded  flex flex-col gap-2 ">
                <Label className="flex-1 h-full flex flex-col gap-2">
                    {t('response')}
                    <Textarea className="flex-1" defaultValue={res} readOnly></Textarea>
                </Label>
            </div>
        </div>
    )
}