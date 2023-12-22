import React from 'react'
import { RiAdminFill, RiPieChartFill, RiUserFill, RiUserSettingsFill, RiUserStarFill } from 'react-icons/ri';
import { optionsIndexing } from '../../../../../models/stadisticsModels/stadisticsModels';

interface props{
    color: string;
    searched: string;
}

export const IconDynamicMap = ({ color, searched }: props) => {

    const iconMap = new Map<optionsIndexing, JSX.Element>([
        ['total', <RiPieChartFill color={color}/>],
        ['aspirantes', <RiUserFill color={color}/>],
        ['estudiantes', <RiUserStarFill color={color}/>],
        ['profesores', <RiUserSettingsFill color={color}/>],
        ['admins', <RiAdminFill color={color}/>],
    ])

    return iconMap.get(searched as optionsIndexing);
}
