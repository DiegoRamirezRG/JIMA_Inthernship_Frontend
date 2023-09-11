import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { City, Country, State, optionSelect } from '../../models/universalApiModels/UniversalApiModel';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';

export const useUniversalApi = () => {

    const [countries, setCountries] = useState<optionSelect[] | null>(null);
    const [states, setStates] = useState<optionSelect[] | null>(null);
    const [cities, setCities] = useState<optionSelect[] | null>(null);

    const getCountries = async () => {
        try {
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
        } catch (error: any) {
            showErrorTost({position: 'top-center', text: error.message});
        }
    }

    const getStates = async (country: string) => {
        try {
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
        } catch (error: any) {
            showErrorTost({position: 'top-center', text: error.message})
        }
    }

    const getCities = async (state: string) => {
        try {
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
        } catch (error: any) {
            showErrorTost({position: 'top-center', text: error.message})
        }
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
