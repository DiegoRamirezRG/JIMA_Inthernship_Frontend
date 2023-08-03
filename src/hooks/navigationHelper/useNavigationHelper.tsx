import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const useNavigationHelper = () => {
    const navigate = useNavigate();
    const [indexShowPage, setIndexShowPage] = useState<number>(100);

    const hanlderChangeShowPageIndex = (newIndexPage: number, route: string) => {
        localStorage.setItem('showedPage', newIndexPage.toString());
        setIndexShowPage(newIndexPage);
        navigate(route);
    }

    useEffect(() => {
        if(localStorage.getItem('showedPage') != null && localStorage.getItem('showedPage') != ''){
            setIndexShowPage(parseInt(localStorage.getItem('showedPage')!));
        }else{
            localStorage.setItem('showedPage', '100');
            setIndexShowPage(100);
        }
    }, [])
    
    
    return{
        indexShowPage,
        hanlderChangeShowPageIndex
    }

}
