import React from 'react'
import { MaxContainerComponent } from '../../components/generalComponents/maxContainerComponent/MaxContainerComponent'
import './MainScreen.scss'
import { useState } from 'react';

export const MainScreen = () => {

    const [closeMenu, setCloseMenu] = useState<boolean>(false);

    return (
        <MaxContainerComponent>
            <div className="mainScreenRealContainer">

                <div className="sidebarMenu">
                    <button onClick={(e) => { setCloseMenu(!closeMenu) }}>Close me</button>
                </div>

                <div className={`contentContainer ${closeMenu === false ? 'close' :  'open'}`}>

                </div>
            </div>
        </MaxContainerComponent>
    )
}
