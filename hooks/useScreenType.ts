import { useEffect, useState } from "react";

type ScreenType = 'large' | 'largium' | 'medium' | 'small';

const getScreenType = () => {
    if(typeof window === 'undefined') return 'large';

    const width = window.innerWidth;

    if(width < 500) return 'small';
    if(width < 700) return 'medium';
    if(width < 1000) return 'largium';
    return 'large';
}

export const useScreenType = () => {
    const [type, setType] = useState<ScreenType>(getScreenType());

    useEffect(() => {
        const onResize = () => setType(getScreenType());

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return type;
}