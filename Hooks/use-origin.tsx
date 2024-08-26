import { useEffect, useState } from "react"


export const useOrigin = () => {
    const [mount, setMount] = useState(false);
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    useEffect(() => {
        setMount(true)
    }, [])

    if(!mount){
        return ""
    }
    return origin
}