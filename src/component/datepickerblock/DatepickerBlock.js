import imgKorona from '../../resources/korona.png'
import './datepickerBlock.scss'

import { useEffect, useState } from 'react';
import { Row, Col, Image, Button, Collapse, Accordion, Spinner} from 'react-bootstrap';

import Datepicker from '../datepicker/Datepicker';
import { format, } from 'date-fns';
import { ru } from 'date-fns/locale';

import  useCovidService  from '../../service/CovidService';


function DatepickerBlock({setDateTo, setDateFrom, dateTo ,dateFrom}) {
    const {getMinMaxDate, loading, error} = useCovidService();

    const [baseMinDate, setBaseMinDate] = useState(null);
    const [baseMaxDate, setBaseMaxDate] = useState(null); 
    const [isVisibleFrom, setIsVisibleFrom] = useState(window.innerWidth > 768 ? true: false);
    const [isVisibleTo, setIsVisibleTo] = useState(window.innerWidth > 768 ? true: false);
    const [activeKeyFrom, setActiveKeyFrom] = useState('0')
    const [activeKeyTo, setActiveKeyTo] = useState('0')
    const [reset, onReset] = useState(false)

    useEffect(() => {   // Change state for mobile screen
        const handleResize = () => {
            setIsVisibleFrom(window.innerWidth > 768);
            setIsVisibleTo(window.innerWidth > 768);
        };
        handleResize(); 

        window.addEventListener('resize', handleResize);  
        return () => window.removeEventListener('resize', handleResize); 
    }, []);

    useEffect(() => {   
        getMinMaxDate()
            .then(res => { 
                setBaseMinDate(res.minDate)
                setBaseMaxDate(res.maxDate) 
                setDateTo(res.maxDate)
                setDateFrom(res.minDate)    
            })
    }, [reset])

    const onBaseDate = () => {
        onReset(reset => (!reset))
    }
    
    const closeAccordion = () => {
        setIsVisibleFrom(false);
        setIsVisibleTo(false);
        setActiveKeyFrom('0');
        setActiveKeyTo('0');
    };

    return (
        <Row>   
            <Col xl='8'>
                <h3 className='text-dark text-center mt-3'>Период статистики</h3>
            </Col>

            <Col xl='4'></Col>
                <Col md='6' xl='4' className="d-flex justify-content-md-center flex-wrap">
                    <div className='text-center d-block w-100 fs-2'>от</div>
                    
                    <Accordion className='w-100 date-button' activeKey={activeKeyFrom} >
                        <Accordion.Item   
                            eventKey="1"                         
                            onClick={() => {
                                if(baseMinDate) {
                                    setActiveKeyFrom((activeKeyFrom) => activeKeyFrom === '0' ? '1' : '0')
                                    setIsVisibleFrom(isVisibleFrom => !isVisibleFrom)
                                }                               
                            }}>
                            <Accordion.Header>
                                {!baseMinDate ? <Spinner size="sm"/> : null}
                                {baseMinDate ? <span>Выбрана дата {dateFrom ? format(dateFrom, 'PP', {locale: ru}) : null}</span>: null}
                            </Accordion.Header>
                        </Accordion.Item>
                    </Accordion>

                    <Collapse in={isVisibleFrom}>
                        <div className="mx-auto bg-light rounded" style={{'height': '370px'}} >
                            <Datepicker
                                closeAccordion={closeAccordion}
                                reset={reset}
                                baseMinDate={baseMinDate}
                                baseMaxDate={baseMaxDate}
                                setDateTo={setDateTo}
                                setDateFrom={setDateFrom}
                                idPicker="min" 
                                loading={loading} 
                                error={error}/>  
                        </div>
                    </Collapse>
                </Col>      

                <Col md='6' xl='4' className="d-flex justify-content-md-center flex-wrap">
                    <div className='text-center d-block w-100 fs-2'>до</div>

                    <Accordion className='w-100 date-button' activeKey={activeKeyTo}>
                        <Accordion.Item 
                            eventKey="1"    
                            onClick={() => {
                                if(baseMinDate) {
                                    setActiveKeyTo((activeKeyTo) => activeKeyTo === '0' ? '1' : '0');
                                    setIsVisibleTo(isVisibleTo => !isVisibleTo)
                                }                               
                            }}>
                            <Accordion.Header className={baseMinDate ? 'text-secondary': null}>
                                {!baseMinDate ? <Spinner size="sm"/> : null}
                                {baseMinDate ? <span>Выбрана дата {dateTo? format(dateTo, 'PP', {locale: ru}) : null}</span>: null}
                            </Accordion.Header>
                        </Accordion.Item>
                    </Accordion>

                    <Collapse in={isVisibleTo}>
                    <div className="mx-auto bg-light rounded" style={{'height': '370px'}} >
                        <Datepicker 
                            closeAccordion={closeAccordion}
                            reset={reset}
                            baseMaxDate={baseMaxDate}
                            baseMinDate={baseMinDate}
                            setDateTo={setDateTo}
                            setDateFrom={setDateFrom}
                            idPicker="max" 
                            loading={loading} 
                            error={error}/>  
                    </div> 
                    </Collapse>
                </Col> 

                <Col xl='4' className="d-none d-xl-block position-relative">
                    <Image src={imgKorona} className='h-100 position-absolute'/>
                </Col> 

                <Col xl='8' className='d-flex justify-content-center p-3'>
                    <Button onClick={onBaseDate} id="start">Отобразить все данные</Button>
                </Col>           
         </Row>          
    );
}

export default DatepickerBlock;