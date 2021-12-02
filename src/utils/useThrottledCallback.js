import { useRef, useEffect, useCallback } from "react";

export default function useThrottledCallback(fn, timeout = 0, deps = null) {
    const timer = useRef(null);
    const args = useRef(null);
    
    const callback = useCallback(() => {
        if (timer.current === null) {
            args.current = arguments;
            timer.current = setTimeout(() => {
                timer.current = null;
                fn.apply(null, args.current);                
            }, timeout);
        } else {
            args.current = arguments;
        }
    }, deps);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        }
    }, deps);

    return callback;
}