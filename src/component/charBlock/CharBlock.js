
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
    TimeScale
  } from 'chart.js';
import 'chartjs-adapter-date-fns';
import ruLocale from 'date-fns/locale/ru';
import {Form, Col} from 'react-bootstrap';



function CharBlock({getArrayByCountries, dateTo, dateFrom, getDataPerDay}) {
    const [dataByCountries, setByCountries] = useState(null);
    const [dataPerDay, setDataPerDay] = useState(null);
    const [filterId, setFilterId] = useState('all');
    const [isSmallScrean, setIsSmallScrean ] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScrean(window.innerWidth < 992);
        };
        handleResize();

        window.addEventListener('resize', handleResize);  
        return () => window.removeEventListener('resize', handleResize);
        
    }, []);


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

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        TimeScale,     
      );

    const dataChar = {
        datasets: [
          {
            label: 'Заболевания',
            data: dataPerDay ? dataPerDay.map(item => ({x: item.date, y: item.cases})): [],
            borderColor: '#ffc107',
            backgroundColor: '#ffc107',
            pointStyle: false,
            tension: 0.1
          },
          {
            label: 'Смерти',
            data: dataPerDay ? dataPerDay.map(item => ({x: item.date, y: item.deaths})) : [],
            borderColor: '#dc3545',
            backgroundColor: '#dc3545',
            pointStyle: false,
            tension: 0.1
          }
        ],
    };
    const optoinsBigChar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    font: {
                        size: 20
                    }
                }
              },
            title:{ 
                display: true,
                text: 'График заболеваемости и смертности',
                font: {
                    size: 24
                }
            }
        },
        scales: {
            x: {
                adapters: {
                    date: {
                      locale: ruLocale,
                    },
                  },
                type: 'time',
            },
            y: {
                title: {
                    display: true,
                    text: 'Количество случаев',
                  },
            }
        }
    }

    const optionsSmallChar = {
        responsive: false,
        plugins: {
            legend: {
                position: 'left',
                align: 'start',
                position: 'top',
                display: true,
                labels: {
                    font: {
                        size: 14
                    }
                }
              },
            title:{ 
                align: 'start',
                display: true,
                text: 'График заболеваемости и смертности',
                font: {
                    size: 16
                }
            },
            zoom: {
                zoom: {
                  enabled: true,
                  mode: 'x',
                },
                pan: {
                  enabled: true,
                  mode: 'x',
                },
            },
        },
        scales: {
            x: {
                adapters: {
                    date: {
                      locale: ruLocale,
                    },
                  },
                type: 'time',
            },
            y: {
                title: {
                    display: true,
                  },
            }
        }
    };

    const smallChar = isSmallScrean ? <Line
                width={800}
                height={400}
                data={dataChar}
                options={optionsSmallChar}          
            />: null;
    const bigChar = !smallChar ? <Line
                data={dataChar}
                options={optoinsBigChar}          
            />: null;      
    return (
       <>
            <Form.Select aria-label="Default select example" value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                <option value='all'>Все страны</option>;
                {optionOfSelectOfCountries}
            </Form.Select>
            <Col className="overflow-auto">
                {smallChar}
                {bigChar}
            </Col>
       </>    
    );
}

export default CharBlock;