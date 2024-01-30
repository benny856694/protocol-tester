
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Test from "./pages/Test";
import { cn } from "./lib/utils";
import { useTranslation, Trans } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { Button } from "./components/ui/button";
import { GlobeIcon } from "@radix-ui/react-icons";
import i18next from "i18next";
import HttpServer from "./pages/HttpServer";
import { useState } from "react";

function App() {
  const {t} = useTranslation()
  const [count, setCount] = useState(0)
  function switchLanguages() {
    i18next.changeLanguage(i18next.resolvedLanguage === 'zh' ? 'en' : 'zh')
}
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col  p-2">
        <div className="flex justify-center items-center gap-2 pb-4">
          <NavLink to="/" className={({isActive})=>cn("px-4 py-1 rounded", {"bg-secondary": isActive})}>{t('protocolTester')}</NavLink>
          <NavLink to="/httpsvr" className={({isActive})=>cn("px-4 py-1 rounded", {"bg-secondary": isActive})}>{t('httpServer')+(count>0?` (${count}) `:'')}</NavLink>
          <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="link" size="icon" className="absolute right-4 hover:no-underline" onClick={switchLanguages}>
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
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/httpsvr" element={<HttpServer />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
