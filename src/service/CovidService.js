/* {
    "records" : [
       {
          "dateRep" : "14/12/2020",
          "day" : "14",
          "month" : "12",
          "year" : "2020",
          "cases" : 746,
          "deaths" : 6,
          "countriesAndTerritories" : "Afghanistan",
          "geoId" : "AF",
          "countryterritoryCode" : "AFG",
          "popData2019" : 38041757,
          "continentExp" : "Asia",
          "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000" : "9.01377925"
       }, */
import useHttp from '../hooks/http.hook';
import { useState } from 'react';

const useCovidService = () => {
    const {loading, request, error, clearError} = useHttp();
    const [dateTo, setDateTo] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [baseData, setBaseData] = useState()
    const [data, setData] = useState()
    const _api = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/';
   

    const getInitialData = async () => {
        return  await request(_api);   
    }

    const  getMinMaxDate = async() => {
        const initialData = await getInitialData(); 
        
        const DateSortByDate = initialData.records.sort((x, y) => {
            let first = Date.parse(`${x.year}-${x.month}-${x.day}`);
            let second = Date.parse(`${y.year}-${y.month}-${y.day}`);
            return first - second;
        })
  
        const minItem = DateSortByDate[0]
        const minDate = Date.parse(`${minItem.year}-${minItem.month}-${minItem.day}`);

        const maxItem = DateSortByDate[DateSortByDate.length - 1]
        const maxDate = Date.parse(`${maxItem.year}-${maxItem.month}-${maxItem.day}`);

        setDateFrom(minDate);
        setDateTo(maxDate);
        return {minDate: minDate, maxDate: maxDate};

    }

  
    const getFilteredDataPerDate = async (dateFrom = dateFrom, dateTo = dateTo) => {
        const initialData = await getInitialData();  

        const res = initialData.records.filter(item => {
            const time = Date.parse(`${item.year}-${item.month}-${item.day}`);
            return (time >= (dateFrom) && time <= (dateTo +  86401000));
        }); 
        
        return res;    
    }
    
    const getArrayByCountries = async () => {
        const initialData = await getInitialData();
        
        function formatNumber(number, decimalPlaces) {
            const roundedNumber = Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
            if (Number.isInteger(roundedNumber)) {
              return roundedNumber.toString();
            } else {
              return roundedNumber.toFixed(decimalPlaces);
            }
        }

        const filteredDataPerDate = await getFilteredDataPerDate(dateFrom, dateTo)
        
        const arrAllCounrties = initialData.records.map((item , i) => {
            return item.countriesAndTerritories
        })
        const arrUniqueCountries = Array.from(new Set(arrAllCounrties))

        
        const DataByCountries = arrUniqueCountries.map(item =>{ 
                return {country: item,
                        popData2019: 0,
                        cases: 0,
                        deaths: 0,
                        allCases: 0,
                        allDeaths: 0,
                        casesPer1000: 0,
                        deathsPer1000: 0,
                        averageCasesPerDay: 0,
                        averageDeathsPerDay: 0,
                        maxCasesPerDay: 0,
                        maxDeathsPerDay: 0
                        }
            })
        
        initialData.records.forEach((item, i)=> {
            const indexFindedElem = DataByCountries.findIndex(elem => elem.country === item.countriesAndTerritories)
                if(!(indexFindedElem  === -1)) {
                    DataByCountries[indexFindedElem].allCases += item.cases;
                    DataByCountries[indexFindedElem].allDeaths += item.deaths;
                    DataByCountries[indexFindedElem].popData2019 = item.popData2019;        
                }   
        })  
        
        filteredDataPerDate.forEach(item => {
            const indexFindedElem = DataByCountries.findIndex(elem => elem.country === item.countriesAndTerritories)
            if(!(indexFindedElem  === -1)) {
                DataByCountries[indexFindedElem].cases += item.cases;
                DataByCountries[indexFindedElem].deaths += item.deaths;                       
            } 
        })
 
        DataByCountries.forEach(item => {
            let casesRes;
            let deathesRes;

            if(item.allCases && item.popData2019) { 
                casesRes = formatNumber((item.allCases / (item.popData2019 / 1000 )), 5)
            } else {
                casesRes = 0
            }

            if(item.allCases && item.popData2019) { 
                deathesRes = formatNumber((item.allDeaths / (item.popData2019 / 1000 )), 5)
            } else {
                deathesRes = 0
            }

            item.casesPer1000 = casesRes;
            item.deathsPer1000 = deathesRes;
            
            const days = (dateTo - dateFrom) /1000 /60 /60 /24 + 1;
            item.averageCasesPerDay = Math.round(item.cases / days);
            item.averageDeathsPerDay = Math.round(item.deaths / days);
            
            function getMaxNumPerDay(arg) {
                const arrDaysCurrentCountry =  filteredDataPerDate.filter(elem => elem.countriesAndTerritories === item.country);
                const arrCasesPerDays = arrDaysCurrentCountry.map(elem => elem[arg]);
                return Math.max(...arrCasesPerDays)
            }

            item.maxCasesPerDay = getMaxNumPerDay('cases');
            item.maxDeathsPerDay =  getMaxNumPerDay('deaths');
        })
        setBaseData(DataByCountries);
        setData(DataByCountries);
        return DataByCountries;
    }
    
    const sortData = (id) => {
        const tempData = [...data]
        
        function sortByCountry(isAscending) {
            if (isAscending) {
                return tempData.sort((a, b) => {
                    return a.country > b.country ? 1 : a.country < b.country ? -1 : 0;
                });
            } else {
                return tempData.sort((b, a) => {
                    return a.country > b.country ? 1 : a.country < b.country ? -1 : 0;
                });
            }
            
        }

        function sortByNumber(isAscending, name) {
            name = name.slice(0, -1)
            if(isAscending) {
                return tempData.sort((a, b) => {
                    return a[name] - b[name];
                });
            } else {
                return tempData.sort((a, b) => {
                    return b[name] - a[name];
                });
            }
        }

        
         

        if(id === 'country-'){
            return sortByCountry(false)
        } if(id === 'country+') {
            return sortByCountry(true)
        } 

        for(let key in baseData[0]) {
            
            if(id === key + '-'){
                return sortByNumber(false, id)
            }
            if(id === key + '+'){
                return sortByNumber(true, id)
            }
        }
    }

    const search = (str) => {
        const res = () =>{
            return baseData.filter(item => {
                return item.country.toLowerCase().includes(str.toLowerCase());
            })
        }
        setData(res());
        return res();
    }

    const filter = (id, from, to) => {
        if(from === '' || to === '') {
            setData(baseData);
            return baseData;           
        } else {
            const res = baseData.filter(item => {
                return item[id] < +to &&  item[id] > +from;
            })
            setData(res);
            return res;
        }
    }

    const getDataPerDay = async (country) => {
        
        if(!dateFrom || !dateTo || !country){
            return false;
        }

        const filteredDataPerDate = await getFilteredDataPerDate(dateFrom, dateTo)
        const arrAllDays = filteredDataPerDate.map((item , i) => {
            return item.dateRep
        })

        const arrUniqueDays = Array.from(new Set(arrAllDays)).map(item => {
            let arr = item.split('/');
            return {dateRep: item, date: `${arr[2]}-${arr[1]}-${arr[0]}`, parsedDate: Date.parse(`${arr[2]}-${arr[1]}-${arr[0]}`)};
        })

        arrUniqueDays.sort((a, b) => a.parsedDate - b.parsedDate);
        
        if(country === 'all') {
            let resArr = arrUniqueDays.map(item => {
                const resArr = filteredDataPerDate.filter(elem => elem.dateRep === item.dateRep)
                const resCases = resArr.reduce((acc, curr) => acc + curr.cases, 0)
                const resDeaths = resArr.reduce((acc, curr) => acc + curr.deaths, 0)
                return {cases: resCases, date: item.date, deaths: resDeaths}              
            })
            return resArr    
        } else {
            let daysOfCountry = filteredDataPerDate.filter(item => item.countriesAndTerritories === country); 
                let resArr = arrUniqueDays.map(item => {
                    let resArr = daysOfCountry.find(elem => elem.dateRep === item.dateRep)
                    const resCases = resArr ? resArr.cases : 0;
                    const resDeaths = resArr ? resArr.deaths : 0;
                    return {cases: resCases, date: item.date, deaths: resDeaths}
                })
            return resArr;
        }
    }
    return {loading, 
            error, 
            clearError, 
            getInitialData, 
            getArrayByCountries, 
            getFilteredDataPerDate,
            getDataPerDay,
            setDateTo, 
            setDateFrom, 
            getMinMaxDate, 
            dateTo, 
            dateFrom, 
            sortData, 
            search,
            filter,
            baseData};
}


export default useCovidService;