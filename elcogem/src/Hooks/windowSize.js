import React, {useState, useEffect} from 'react';

export const useWindowWidth = () => {
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const handelWinResize = () => {
        //console.log('handelWinResize', window.innerHeight, window.innerWidth);
        setWinWidth(window.innerWidth);
    }
    useEffect(()=>{
        //console.log('useAfeect starts', window);
        window.addEventListener('resize', handelWinResize);

        return ()=>{
            window.removeEventListener('resize', handelWinResize);
        }
    });

    return winWidth;
}