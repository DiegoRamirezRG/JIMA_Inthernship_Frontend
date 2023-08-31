import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { City, Country, State, optionSelect } from '../../models/universalApiModels/UniversalApiModel';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

export const useUniversalApi = () => {

    const [countries, setCountries] = useState<optionSelect[] | null>(null);
    const [states, setStates] = useState<optionSelect[] | null>(null);
    const [cities, setCities] = useState<optionSelect[] | null>(null);

    const getCountries = async () => {
        const response = await serverRestApi.get<Response>('/api/location/getCountries', {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        });

        const formatedData = response.data.data.map(({country_name}: Country) => ({
            value: country_name,
            label: country_name
        }));        

        setCountries(formatedData);
    }

    const getStates = async (country: string) => {
        const response = await serverRestApi.get<Response>(`/api/location/getStates/${country}`, {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        });

        const formatedData = response.data.data.map(({state_name}: State) => ({
            value: state_name,
            label: state_name
        }));
        
        setStates(formatedData);
    }

    const getCities = async (state: string) => {
        const response = await serverRestApi.get<Response>(`/api/location/getCities/${state}`, {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        });

        const formatedData = response.data.data.map(({city_name}: City) => ({
            value: city_name,
            label: city_name
        }));

        setCities(formatedData)
    }

    useEffect(() => {
        const asyncFunc = async () => {
            await getCountries();
        }
        asyncFunc();
    }, [])
    
    return {
        countries,
        getStates,
        states,
        getCities,
        cities
    }
}
