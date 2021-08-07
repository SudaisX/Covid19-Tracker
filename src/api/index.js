import axios from 'axios';

const url = 'https://api.covid19api.com';

export const fetchSummary = async () => {
    try {
        const {
            data: {
                Global: { TotalConfirmed, TotalDeaths, TotalRecovered, Date },
                Countries,
            },
        } = await axios.get(url + '/summary');
        return {
            Countries,
            confirmed: TotalConfirmed,
            deaths: TotalDeaths,
            recovered: TotalRecovered,
            lastUpdate: Date,
        };
    } catch (err) {
        console.log(err);
    }
};

export const fetchCountryData = async country => {
    try {
        const { data } = await axios.get(`${url}/dayone/country/${country}`);
        return {
            data: data.map(each => ({
                date: each.Date,
                confirmed: each.Confirmed,
                recovered: each.Recovered,
                deaths: each.Deaths,
                active: each.Active,
            })),
        };
    } catch (err) {
        console.log(err);
    }
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        return {
            data: data.map(each => each.Country),
        };
    } catch (err) {
        console.log(err);
    }
};
