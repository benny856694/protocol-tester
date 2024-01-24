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
import { ClipboardCopyIcon, CopyIcon, ExternalLinkIcon, GlobeIcon, PaperPlaneIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner";
import { CommandSelection } from "@/components/commandselect";
import { buildUrl, isValidJSON } from "@/lib/utils";
import { object, z } from "zod";
import { useTranslation, Trans } from 'react-i18next';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { OpenInBrowser } from "../../wailsjs/go/main/App";
import i18next from "i18next";
import { StyleProps } from "react-json-view-lite/dist/DataRenderer";

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

const mystyle: StyleProps = Object.assign({}, darkStyles, { container: "" })

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

    function switchLanguages() {
        i18next.changeLanguage(i18next.resolvedLanguage === 'zh' ? 'en' : 'zh')
    }

    async function openInBrowser() {
        const url = buildUrl(urlOrIp, true)

        await OpenInBrowser(url, [])
    }

    async function copyToClipboard() {
       await navigator.clipboard.writeText(JSON.stringify(res, null, 2))
       toast.success(t('copySucceed'))
    }

    return (
        <div className="flex flex-col h-screen p-2 gap-4">
            <div className="flex flex-row items-center gap-x-4">
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
                    className=""
                    onClick={sendCommand}>
                    {busy && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    {!busy && <PaperPlaneIcon className="mr-2 h-4 w-4" />}
                    {t('send-command')}
                </Button>
                <Button
                    disabled={!urlOrIp}
                    className="mr-auto"
                    onClick={openInBrowser}>
                    {t('open')}
                    <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Button>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="link" size="icon" className="justify-self-end" onClick={switchLanguages}>
                                <GlobeIcon className="mr-1" />
                                {i18next.resolvedLanguage === 'zh' ? "中" : "En"}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t('switch-language-tip')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
            <div className="flex-1 flex flex-col gap-2">
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
                {jsonValidateMsg && <p className="text-red-600 text-sm self-start">{t(jsonValidateMsg)}</p>}

            </div>
            {
                res &&
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="flex  items-center pb-2">
                        <Label> {t('response')}</Label>
                        <Button variant="link" size="icon" className="h-auto" onClick={copyToClipboard}>
                            <ClipboardCopyIcon />
                        </Button>
                    </div>
                    <div className="border rounded overflow-y-auto flex-1">
                        <JsonView data={res} style={mystyle} />
                    </div>

                </div>
            }

        </div>
    )
}


