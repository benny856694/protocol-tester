import React from "react";

export interface IndicatorProps {
    normal: React.ReactNode,
    indicator: React.ReactNode,
    delay: number,
    onClick: () => Promise<void>,
}

export default function Indicator(props: IndicatorProps) {
    const [showIndicator, setShowIndicator] = React.useState(false)

    async function onClick() {
        try {
            await props.onClick()
            setShowIndicator(true)
            setTimeout(() => {
                setShowIndicator(false)
            }, props.delay);
        } catch {
            
        }
    }

    return showIndicator ? (<div>{props.indicator}</div>) : (<div onClick={onClick}>{props.normal}</div>)

}