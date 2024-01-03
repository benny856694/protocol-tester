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
import { toast } from "sonner";
import React from "react";

export default function () {
    const [count] = React.useState(0)
    return (
        <div className="h-full  place-items-center mx-auto">
            <div className=" text-2xl font-bold flex flex-col items-center space-y-4">
                <h1>Vite + React + TS + Tailwind + shadcn/ui</h1>
                <Button onClick={() => toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => LogDebug("Undo"),
                    },
                })} variant="destructive">
                    {count >= 10 && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Count up ({count})
                </Button>
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