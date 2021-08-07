import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Cards, Chart, CountryPicker } from './components';
import { fetchSummary } from './api';
import coronaImage from './images/image.png';

const App = () => {
    const [summary, setSummary] = useState({});
    const [dailyData, setDailyData] = useState({});
    const [country, setCountry] = useState('');
    const [isGlobal, setIsGlobal] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const { confirmed, deaths, recovered, lastUpdate, Countries } = await fetchSummary();
            setSummary({ confirmed, deaths, recovered, lastUpdate });
            setDailyData({ countries: Countries });
        };
        fetch();
        // eslint-disable-next-line
    }, [isGlobal]);

    const countryChangeHandler = cntry => {
        const data = dailyData.countries.filter(each => each.Country === cntry)[0];
        if (data) {
            const { TotalConfirmed, TotalDeaths, TotalRecovered, Date } = data;
            setSummary({ confirmed: TotalConfirmed, deaths: TotalDeaths, recovered: TotalRecovered, lastUpdate: Date });
        }
    };

    return (
        <div className={styles.container}>
            <img src={coronaImage} className={styles.image} alt='Covid-19' />
            <Cards summary={summary} />
            <CountryPicker
                setCountry={setCountry}
                onCountryChange={countryChangeHandler}
                setIsGlobal={setIsGlobal}
                isGlobal={isGlobal}
            />
            <Chart country={country} globalData={summary} />
        </div>
    );
};

export default App;
