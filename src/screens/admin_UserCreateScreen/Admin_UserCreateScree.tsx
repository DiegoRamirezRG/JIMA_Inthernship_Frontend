import React from 'react'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'

export const Admin_UserCreateScree = () => {
    return (
        <NavigationComponent>
            <div className="CreateUserMaxContainer">
                <LoadingComponent/>
            </div>
        </NavigationComponent>
    )
}
