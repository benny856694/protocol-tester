import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import React from "react"

function App() {
  const [count] = React.useState(0)

  return (
    <div className="min-h-screen bg-gray-600 text-white grid place-items-center mx-auto py-8">
      <div className=" text-2xl font-bold flex flex-col items-center space-y-4">
        <h1>Vite + React + TS + Tailwind + shadcn/ui</h1>
        <Button onClick={() => toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })} variant="destructive">
          {count >= 10 && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Count up ({count})
        </Button>
      </div>
    </div>
  )
}

export default App
