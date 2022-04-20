import {useEffect, useRef} from "react";

 const useIntersecting = (callback: () => void) => {
    const infiniteScrollObserver = useRef<IntersectionObserver>();

    const lastElement = useRef<HTMLElement>(null);

    useEffect(() => {
        if (infiniteScrollObserver.current) infiniteScrollObserver.current?.disconnect();

        infiniteScrollObserver.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                callback()
            }
        });

        infiniteScrollObserver.current.observe(lastElement.current as HTMLElement);

        return () => infiniteScrollObserver.current?.disconnect();
    })

    return [lastElement]
}

export default useIntersecting;