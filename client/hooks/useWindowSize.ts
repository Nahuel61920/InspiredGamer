import { useState, useEffect } from "react";
export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined as any,
        height: undefined as any
    })

    useEffect(() => {
        function handleResize () {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize)
    }, [])
    
    return windowSize
}
