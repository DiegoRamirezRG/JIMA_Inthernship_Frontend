import React, { useContext, useEffect, useState } from 'react';
import './MainScreen.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent';
import { sidebardOptions } from '../../utils/userOptions/userOptions';
import AuthContext from '../../contexts/authContext/AuthContext';
import moment from 'moment';
import { formatMonthDate } from '../../utils/dateSpanishFormater/dateSpanishFormater';
import kyubi from '../../../public/Kyubi - logo.svg'
import { useNavigate } from 'react-router-dom';
import { useNavigationHelper } from '../../hooks/navigationHelper/useNavigationHelper';
import schoolImg from '../../assets/svg/TSJ_OL.svg';

export const MainScreen = () => {

    const { state } = useContext(AuthContext);
    const { hanlderChangeShowPageIndex } = useNavigationHelper();

    const renderOptions = sidebardOptions.get(state.loggedUser?.Rol!);

    return (
        <NavigationComponent>
            <div className="mainScreenContainer">
                <div className="mainScreenHeader">
                    <div className="welcomeBanner">
                        <p>Hola {state.loggedUser?.Nombre}!</p>
                        <p>{state.loggedUser?.Rol}</p>
                        <p>{moment().format('DD') + ' ' + formatMonthDate(moment().format('MM')) + ' ' + moment().format('YYYY')}</p>
                    </div>
                    <div className="schoolLogo">
                        <img src={schoolImg} alt="" />
                    </div>
                </div>
                <div className="containerMainBody">
                    <p>Que vas a hacer hoy:</p>
                    <div className="dinamycHeight">
                        {
                            renderOptions?.map((opt, index) => (
                                <div className='menuRenderOpt' key={index} onClick={() => hanlderChangeShowPageIndex(index, opt.route!)}>
                                    <p className='icon'>{ opt.icon }</p>
                                    <p>{ opt.text }</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="bannerBrand">
                    <p>powered by</p>
                    <img src={kyubi} alt="" />
                </div>
            </div>
        </NavigationComponent>
    )
}
