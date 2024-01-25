"use client"

import * as React from "react"
import { Calendar, MoreHorizontal, Tags, Trash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CaretSortIcon } from "@radix-ui/react-icons"

import _commandsZh from '@/assets/commands-zh.json'
import _commandsEn from '@/assets/commands-en.json'
import i18next from "i18next"
import { useTranslation } from "react-i18next"

const commandsZh: { [index: string]: { [index: string]: object } } = _commandsZh
const commandsEn: { [index: string]: { [index: string]: object } } = _commandsEn



const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
]




export function CommandSelection({placeHolder, onSelectCmd }: {placeHolder: string, onSelectCmd?: (cmd: object) => void }) {
    const [label, setLabel] = React.useState("feature")
    const [open, setOpen] = React.useState(false)
    const {t} = useTranslation()
    const commands = i18next.resolvedLanguage == "zh" ? commandsZh : commandsEn

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="">
                    {placeHolder}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                {Object.keys(commands).map(k => (
                    <DropdownMenuSub key={k} >
                        <DropdownMenuSubTrigger>
                            {k}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="p-0">
                            <Command>
                                <CommandList id={k}>
                                    {Object.keys(commands[k]).map(subk => (
                                        <CommandItem key={subk} value={subk} onSelect={() => {
                                            onSelectCmd?.(commands[k][subk])
                                            setOpen(false)
                                        }}>
                                            {subk}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>

                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
