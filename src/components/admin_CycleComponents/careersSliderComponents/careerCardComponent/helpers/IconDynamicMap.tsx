import React from 'react'
import { RiAdminFill, RiUserFill, RiUserSettingsFill, RiUserStarFill } from 'react-icons/ri';

interface props{
    color: string;
    searched: string;
}

export const IconDynamicMap = ({ color, searched }: props) => {

    const iconMap = new Map<string, JSX.Element>([
        ['asp', <RiUserFill color={color}/>],
        ['est', <RiUserStarFill color={color}/>],
        ['pro', <RiUserSettingsFill color={color}/>],
        ['adm', <RiAdminFill color={color}/>],
    ])

    return iconMap.get(searched);
}
