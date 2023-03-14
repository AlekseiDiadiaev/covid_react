
import { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Container, Tab, Tabs, Form} from 'react-bootstrap';



function CharBlock({getArrayByCountries, dateTo, dateFrom, getInitialData, getFilteredDataPerDate, getDataPerDay}) {
    const [dataByCountries, setByCountries] = useState(null);
    const [dataPerDay, setDataPerDay] = useState(null);
    const [filterId, setFilterId] = useState('all');

    useEffect(() => {
        getDataPerDay(filterId)
            .then(res => {
                setDataPerDay(res)

            })  
    }, [filterId])

    useEffect(() => {
        getDataPerDay()  
        if(dateTo && dateFrom){
            getArrayByCountries()
                .then(res => {
                    setByCountries(res)            
                }) 
            getDataPerDay(filterId)
                .then(res => {
                    setDataPerDay(res)
         
                })      
        }
       
    },[dateTo, dateFrom])
   
    let optionOfSelectOfCountries;
    if(dataByCountries) {
        optionOfSelectOfCountries =  dataByCountries.map((item,i) => {
            return <option key={i} value={item.country}>{item.country}</option>;
        })
    }
   
    const data = {
        labels: dataPerDay ? dataPerDay.map(item => item.date) : [],
        
        datasets: [
          {
            label: 'Заболевания',
            data: dataPerDay ? dataPerDay.map(item => item.cases) : [],
            borderColor: '#ffc107',
            backgroundColor: '#ffc107',
            pointStyle: false,
            tension: 0.1
          },
          {
            label: 'Смерти',
            data: dataPerDay ? dataPerDay.map(item => item.deaths) : [],
            borderColor: '#dc3545',
            backgroundColor: '#dc3545',
            pointStyle: false,
            tension: 0.1
          }
        ],
      };

      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
    return (
       <>
            <Form.Select aria-label="Default select example" value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                <option value='all'>Все страны</option>;
                {optionOfSelectOfCountries}
            </Form.Select>
            {<Line
                data={data}
                // options={options}          
            />}
       </>    
    );
}

export default CharBlock;