import React, {useState, useEffect}  from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import {fetchCountries} from '../../api'
import styles from './CountryPicker.module.css'

const CountryPicker = ({setCountry, onCountryChange,isGlobal , setIsGlobal}) => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchCountries()
            setCountries(res.data.sort())
        }
        fetch()
    // eslint-disable-next-line
    }, [])

    const countryChangeHandler = (e) => {
        const country = e.target.value
        if (country !== 'global'){
            onCountryChange(country)
            setCountry(country)
        } else {
            setIsGlobal(!isGlobal)
            setCountry(country)
        }
        
    }

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="Pakistan" onChange={countryChangeHandler}>
                <option value="global">Global</option>
                {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
