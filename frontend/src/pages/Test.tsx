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
import { CheckIcon, ClipboardCopyIcon, CopyIcon, ExternalLinkIcon, GlobeIcon, PaperPlaneIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner";
import { CommandSelection } from "@/components/commandselect";
import { buildUrl, cn, isValidJSON } from "@/lib/utils";
import { object, z } from "zod";
import { useTranslation, Trans } from 'react-i18next';

import 'react-json-view-lite/dist/index.css';
import { OpenInBrowser } from "../../wailsjs/go/main/App";
import i18next from "i18next";
import { StyleProps } from "react-json-view-lite/dist/DataRenderer";
import Indicator from "@/components/indicator-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import JsonViewer from "@/components/json-viewer";

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
        set(resAtom, null)
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
const resAtom = atom(null)
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


function openInExtBrowser() {

}


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
        setRes(null)
        setBusy(true)
        let url = buildUrl(urlOrIp, false);

        try {
            let resp = await fetch(url, {
                method,
                body: cmd
            })
            await new Promise(resolve => setTimeout(resolve, 250));
            let res = await resp.json()
            setRes(res)
        } catch (error) {
            toast(t("error-tip"))
        } finally {
            setBusy(false)
        }

    }



    async function openInBrowser() {
        const url = buildUrl(urlOrIp, true)

        await OpenInBrowser(url, [])
    }

    async function copyToClipboard() {
        await navigator.clipboard.writeText(JSON.stringify(res, null, 2))
        //toast.success(t('copySucceed'))
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex flex-row items-center gap-x-4">
                <MethodCombobox items={items} selectedValue={method} onSelect={(v) => setMethod(v as 'get' | 'post')} />
                <Label className="flex items-center gap-2 ">IP/URL:
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
                    className=""
                    onClick={sendCommand}>
                    {busy ?
                        <ReloadIcon className={cn("mr-2 h-4 w-4", { "animate-spin": busy })} /> :
                        <PaperPlaneIcon className={cn("mr-2 h-4 w-4", { "animate-spin": busy })} />}
                    {t('send-command')}
                </Button>
                <Button
                    disabled={!urlOrIp}
                    className="mr-auto"
                    onClick={openInBrowser}>
                    {t('open')}
                    <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Button>



            </div>
            <div className="flex-1 grid grid-cols-2 grid-rows-[auto_1fr] gap-2 overflow-y-auto">
                <div className="flex gap-4 items-center capitalize">
                    <CommandSelection placeHolder={t('select-command')} onSelectCmd={cmd => {
                        setCmd(JSON.stringify(cmd, null, 2))
                    }} />
                    {selCommand}
                </div>
                <div className="flex items-center">
                    <Label> {t('response')}</Label>
                    <Button variant="link" size="icon" className="h-auto">
                        <Indicator normal={<CopyIcon />} indicator={<CheckIcon />} delay={1000} onClick={copyToClipboard} />
                    </Button>
                </div>
                <div className="flex flex-col gap-2 relative">
                    <Textarea className="flex-1 resize-none focus-visible:ring-0"
                        disabled={method == 'get'}
                        //aria-errormessage={jsonValidateMsg}
                        value={cmd}
                        onInput={v => { setCmd(v.currentTarget.value) }}>
                    </Textarea>
                    {jsonValidateMsg && <p className="text-red-600 text-sm absolute left-px rounded-tl top-px px-1 bg-background">{t(jsonValidateMsg)}</p>}
                </div>
                <ScrollArea className="border rounded">
                    {res && <JsonViewer data={res} />}
                </ScrollArea>
            </div>
        </div>
    )
}


