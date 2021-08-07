import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { fetchCountryData } from '../../api';

const Chart = ({ country, globalData }) => {
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                if (country) {
                    if (country !== 'global') {
                        const { data } = await fetchCountryData(country);
                        setCountryData(data);
                    }
                }
            } catch (err) {
                return 'loading';
            }
        };
        fetch();
    }, [country]);

    console.log(country);

    const lineChart = countryData.length ? (
        <Line
            data={{
                labels: countryData.map(({ date }) => new Date(date).toDateString()),
                datasets: [
                    {
                        data: countryData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: countryData.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    {
                        data: countryData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5',
                        fill: true,
                    },
                    {
                        data: countryData.map(({ active }) => active),
                        label: 'Active',
                        borderColor: 'rgba(255, 238, 0, 0.698)',
                        fill: true,
                    },
                ],
            }}
        />
    ) : null;

    const barChart = globalData ? (
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [globalData.confirmed, globalData.recovered, globalData.deaths]
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: 'Current state Globally' },
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>
            {country !== 'global' && lineChart}
            {country === 'global' && barChart}
        </div>
    );
};

export default Chart;
