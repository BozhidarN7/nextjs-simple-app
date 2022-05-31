import { useEffect, useState } from 'react';

const usePageScroll = () => {
    const [pageScroll, setPageScroll] = useState<number>(0);

    const savePageScrollHanlder = () => {
        setPageScroll(window.scrollY);
    };

    return {
        pageScroll,
        savePageScrollHanlder,
    };
};

export default usePageScroll;
