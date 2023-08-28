import React from 'react'
import './UserCard.scss'
import { persona } from '../../../models/usersModels/UserModel'
import defaultImg from '../../../assets/img/default.jpg'
import { useNavigate } from 'react-router-dom'

interface props{
    user: persona
}

export const UserCard = ({user}: props) => {

    const navigate = useNavigate();

    return (
        <div className="UserCardContainer" onClick={(e) => navigate(`/admin_users/edit/${user.ID_Persona}`)}>
            <div className="UserImage">
                <img src={user.Imagen != null ? user.Imagen : defaultImg} alt="USER" />
            </div>
            <div className="sideSection">
                <div className="UserInformation">
                    <p>{`${user.Nombre} ${user.Apellido_Paterno}`+`${user.Apellido_Materno != null ? ' '+user.Apellido_Materno : ''}`}</p>
                    <p>{user.Rol}</p>
                </div>
                <div className="UserStatus">
                    <div className={`indicatorCircle ${user.Active ? 'active' : 'inactive'}`}></div>
                    <div className="informationSection">
                        {user.Active ? 'Activo' : 'Inactivo'}
                    </div>
                </div>
            </div>
        </div>
    )
}
