import React, { useContext, useEffect, useState } from 'react'
import { MaxContainerComponent } from '../maxContainerComponent/MaxContainerComponent';
import { MenuOptionComponent } from '../menuOptionComponent/MenuOptionComponent';
import { BiMenu, BiMenuAltLeft } from 'react-icons/bi';
import { sidebardOptions } from '../../../utils/userOptions/userOptions';
import AuthContext from '../../../contexts/authContext/AuthContext';
import { useNavigationHelper } from '../../../hooks/navigationHelper/useNavigationHelper';
import { RxGear } from 'react-icons/rx';
import prof from '../../../assets/img/default.jpg'
import './NavigationComponent.scss'
import { API_ADDR, APT_PORT } from '../../../utils/env/config';

export const NavigationComponent = ({children}: any) => {

    const [closeMenu, setCloseMenu] = useState<boolean>(false);
    const [name, setName] = useState('');

    const renderOptions = sidebardOptions.get('Administrativo');
    const { indexShowPage, hanlderChangeShowPageIndex } = useNavigationHelper();
    const { state } = useContext(AuthContext);
    
    useEffect(() => {
        if(state.loggedUser != null){
            setName(state.loggedUser.Nombre.split(" ")[0]+' '+state.loggedUser.Apellido_Paterno);
        }
    }, [state.loggedUser])
    

    return (
        <MaxContainerComponent>
            <div className="mainScreenRealContainer">
                <div className="sidebarMenu">
                    <div className="buttonSection" onClick={(e) => setCloseMenu(!closeMenu)}>
                        <div className={`icon ${closeMenu ? 'hide': ''}`}>
                            <BiMenuAltLeft />   
                        </div>
                        <div className={`icon ${!closeMenu ? 'hide': ''}`}>
                            <BiMenu />
                        </div>
                    </div>
                    <div className="menuSection">
                        <div className="optionsArticles">

                            {
                                renderOptions?.map((item, index) => (
                                    <MenuOptionComponent key={index} option={item} isMenuOpen={closeMenu} isShow={ indexShowPage == index ? true : false } handleNavigation={() => hanlderChangeShowPageIndex(index, item.route!)}/>
                                ))
                            }

                        </div>
                        <div className="helpersArticles">
                            <div className="settingsMenuComponent">
                                <MenuOptionComponent isMenuOpen={closeMenu} isShow={false} handleNavigation={() => hanlderChangeShowPageIndex(100, '/settings')} option={{icon: <RxGear/>, id: 'settings', text: 'Configuración', route: '/settings'}}/>
                            </div>
                            <div className="dividerDesingDiv"></div>
                            <div className="userInformationComponent">
                                <div className="imageUserSection">
                                    <img src={ state.loggedUser?.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${state.loggedUser.ID_Persona}/${state.loggedUser.Imagen}` : prof } alt="IMG" />
                                </div>
                                <div className={`informationUserSection ${closeMenu ? 'menuOpened' : 'menuClosed'}`}>
                                    <p>{name}</p>
                                    <p>{state.loggedUser?.Rol}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`contentContainer ${closeMenu === false ? 'close' :  'open'}`}>
                    {children}
                </div>
            </div>
        </MaxContainerComponent>
    )

}
