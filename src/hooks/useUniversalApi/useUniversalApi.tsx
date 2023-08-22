import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { City, Country, GetAccess, State, optionSelect } from '../../models/universalApiModels/UniversalApiModel';

export const useUniversalApi = () => {

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [countries, setCountries] = useState<optionSelect[] | null>(null);
    const [states, setStates] = useState<optionSelect[] | null>(null);
    const [cities, setCities] = useState<optionSelect[] | null>(null);

    const getAuthorizateToken = async () => {
        const { data } = await axios.get<GetAccess>('https://www.universal-tutorial.com/api/getaccesstoken', {
            headers: {
                Accept: 'application/json',
                'api-token': 'IoYyr5HYOpf2GnXVennlZk5tzxYXz1r9RKiQG4OkCQxME7RQc74ZMAmGCkrXZIesgUY',
                'user-email': 'dieghoramreyes@gmail.com'
            }
        });
        setAccessToken(data.auth_token);
        return data.auth_token;
    }

    const getCountries = async (token: string) => {
        const response = await axios.get<Country[]>('https://www.universal-tutorial.com/api/countries/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const formatedData = response.data.map(({country_name}) => ({
            value: country_name,
            label: country_name
        }));

        setCountries(formatedData);
    }

    const getStates = async (country: string) => {
        const response = await axios.get<State[]>(`https://www.universal-tutorial.com/api/states/${country}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const formatedData = response.data.map(({state_name}) => ({
            value: state_name,
            label: state_name
        }));
        
        setStates(formatedData);
    }

    const getCities = async (state: string) => {
        const response = await axios.get<City[]>(`https://www.universal-tutorial.com/api/cities/${state}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const formatedData = response.data.map(({city_name}) => ({
            value: city_name,
            label: city_name
        }));

        setCities(formatedData)
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const token = await getAuthorizateToken();
            await getCountries(token);
        }
        asyncFunc();
    }, [])
    
    return {
        accessToken,
        countries,
        getStates,
        states,
        getCities,
        cities
    }
}
