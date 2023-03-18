
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

import {Form, Col, Spinner} from 'react-bootstrap';


function CharBlock({dateTo, dateFrom, getDataByDays, countriesList, wasCharOpen}) {
    const [dataByDays, setDataPerDay] = useState(null);
    const [filterId, setFilterId] = useState('all');
    const [isSmallScrean, setIsSmallScrean ] = useState(false)
    const [dataFromWhenOPen, setDataFromWhenOPen] = useState(null);
    const [dataToWhenOPen, setDataToWhenOPen] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScrean(window.innerWidth < 992);
        };
        handleResize();

        window.addEventListener('resize', handleResize);  
        return () => window.removeEventListener('resize', handleResize);
        
    }, []);

    useEffect(() => {
        setTimeout(() => {
            getDataByDays(filterId)
            .then(res => {
                setDataPerDay(res)

            })  
        },150)
    }, [filterId])

    useEffect(() => {
        if(!wasCharOpen) return;
        if(dateFrom === dataFromWhenOPen && dateTo === dataToWhenOPen) return;
        setDataToWhenOPen(dateTo);
        setDataFromWhenOPen(dateFrom);
        
        if(dateTo && dateFrom){
            setTimeout(() => {
                getDataByDays(filterId)
                .then(res => {
                    setDataPerDay(res)
    
                })  
            },150)     
        }   
    },[dateTo, dateFrom, wasCharOpen])
   
    let optionOfSelectOfCountries;
    if(countriesList) {
        optionOfSelectOfCountries =  countriesList.map((item,i) => {
            return <option key={i} value={item}>{item}</option>;
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
            data: dataByDays ? dataByDays.map(item => ({x: item.date, y: item.cases})): [],
            borderColor: '#ffc107',
            backgroundColor: '#ffc107',
            pointStyle: false,
            tension: 0.1
          },
          {
            label: 'Смерти',
            data: dataByDays ? dataByDays.map(item => ({x: item.date, y: item.deaths})) : [],
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

    const smallChar = isSmallScrean && dataByDays? <Line
                width={800}
                height={400}
                data={dataChar}
                options={optionsSmallChar}          
            />: null;
    const bigChar = !smallChar && dataByDays ? <Line
                data={dataChar}
                options={optoinsBigChar}          
            />: null;    
    const spinner = !bigChar && !smallChar ? <Col className='d-flex justify-content-center'>
                                                <Spinner animation="border" role="status" className="m-2">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </Col> : null;
    return (
       <>
            <Form.Select aria-label="Default select example" value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                <option value='all'>Все страны</option>;
                {optionOfSelectOfCountries}
            </Form.Select>
            <Col className="overflow-auto">
                {smallChar}
                {bigChar}
                {spinner}
            </Col>
       </>    
    );
}

export default CharBlock;