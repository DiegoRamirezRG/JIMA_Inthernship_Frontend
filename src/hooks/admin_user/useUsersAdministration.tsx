import React, { ChangeEvent, useEffect, useState } from 'react'
import { persona, typeFilter, typeFilterToSqlQuery } from '../../models/usersModels/UserModel';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel'
import { SelectOptionModel } from '../../models/utilsModels/SelectOptionModel';
import { useNavigate } from 'react-router-dom';

interface postBody {
    offset: number;
    order_by: string;
    nombre: string;
    rol: string;
    grado: string;
    grupo: string;
    turno: string;
}

export const useUsersAdministration = () => {

    const navigate = useNavigate();

    const [userList, setuserList] = useState<null | persona[]>(null);
    const [pagination, setpagination] = useState<number>(1);
    const [maxPagination, setMaxPagination] = useState(1);

    const filterOptions: SelectOptionModel | any = [
        { value: '', label: 'Selecciona...' },
        { value: 'Nombre ASC', label: 'Nombre: A-Z' },
        { value: 'Nombre DESC', label: 'Nombre: Z-A' },
        { value: 'Apellido_Paterno ASC, Apellido_Materno ASC', label: 'Apellidos A-Z' },
        { value: 'Apellido_Paterno DESC, Apellido_Materno DESC', label: 'Apellidos Z-A' },
    ];

    const [filterType, setfilterType] = useState<typeFilter>('all');
    const [filterOrder, setFilterOrder] = useState(filterOptions[0]);
    const [nameFilter, setNameFilter] = useState('');

    //Axios Config
    const [getUsersFilterState, setGetUsersFilterState] = useState<postBody>({
        offset: 0,
        order_by: '',
        nombre: '',
        rol: '',
        grado: '',
        grupo: '',
        turno: ''
    });

    //Loaders
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);

    //Name Changer
    const handleInputSearch = ({target}: ChangeEvent<HTMLInputElement>) => {
        setNameFilter(target.value);
        if(target.value.length != 0){
            setGetUsersFilterState(prevstate => ({
                ...prevstate,
                nombre: `CONCAT(Nombre, ' ', Apellido_Paterno, ' ', Apellido_Materno) LIKE '%${target.value}%'`
            }));
        }else{
            setGetUsersFilterState(prevstate => ({
                ...prevstate,
                nombre: ''
            }));
        }
    }

    //hangle filter changers
    const handleChangeFilter = (filter: typeFilter) => {
        setfilterType(filter);
        setGetUsersFilterState(prevstate => ({
            ...prevstate,
            rol: typeFilterToSqlQuery[filter]
        }));
    }

    const handleChangeOrder = (order: SelectOptionModel) => {
        setFilterOrder(order);
        setGetUsersFilterState(prevstate => ({
            ...prevstate,
            order_by: order.value
        }));
    }

    //Pagination changer

    const addPagination = () => {
        if(pagination < maxPagination){
            setpagination(pagination + 1);
            setGetUsersFilterState(prevState => ({
                ...prevState,
                offset: prevState.offset + 10
            }));
        }
    }

    const resPagination = () => {
        if(pagination > 1){
            setpagination(pagination - 1);
            setGetUsersFilterState(prevstate => ({
                ...prevstate,
                offset: prevstate.offset - 10
            }));
        }
    }

    const paginationOnIndex = (index: number) => {
        setpagination(index);
        setGetUsersFilterState(prevstate => ({
            ...prevstate,
            offset: (index - 1) * 10
        }))
    }

    //data getters

    const getData = async () => {
        setIsInitialDataLoading(true);
        const getListUsers = serverRestApi.post<Response>('/api/users/getAllUsers', {...getUsersFilterState, token: localStorage.getItem('token')}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        const getPagination = serverRestApi.post<Response>('/api/users/getPagination', {...getUsersFilterState}, {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        });

        const response = await Promise.all([
            getListUsers,
            getPagination
        ]);
        
        setMaxPagination(response[1].data.data);
        setuserList(response[0].data.data);
        setIsInitialDataLoading(false);
        
    }

    //Navigation Funcst

    const createNewUser = () => {
        navigate('/admin_users/create')
    }

    //Trigger Effects

    useEffect(() => {
        const awaitFunct = async() => {
            await getData();
        }

        awaitFunct();
    }, []);

    useEffect(() => {
        const awaitFunc = async() => {
            await getData();
        }
        awaitFunc();
    }, [getUsersFilterState])
    
    

    return{
        userList,
        filterOptions,
        filterType,
        filterOrder,
        nameFilter,
        handleChangeFilter,
        handleChangeOrder,
        handleInputSearch,
        maxPagination,
        pagination,
        addPagination,
        resPagination,
        paginationOnIndex,
        isInitialDataLoading,
        createNewUser
    }
}
