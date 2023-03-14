import imgKorona from '../../resources/korona.png'
import { useEffect, useState } from 'react';
import { Row, Col, Image, Button} from 'react-bootstrap';
import Datepicker from '../datepicker/Datepicker';
import  useCovidService  from '../../service/CovidService';

function DatepickerBlock({setDateTo, setDateFrom}) {
    const {getMinMaxDate, loading, error} = useCovidService();
    const [baseMinDate, setBaseMinDate] = useState(null);
    const [baseMaxDate, setBaseMaxDate] = useState(null); 
    const [reset, onReset] = useState(false)
    const onBaseDate = () => {
        onReset(reset => (!reset))
    }

    useEffect(() => {
        getMinMaxDate()
            .then(res => { 
                setBaseMinDate(res.minDate)
                setBaseMaxDate(res.maxDate) 
                setDateTo(res.maxDate)
                setDateFrom(res.minDate)    
            })
   
    }, [reset])
   
    return (
        <Row>   
            <Col lg='8'>
                <h3 className='text-dark text-center mt-3'>Период статистики</h3>
            </Col>
            <Row>   
                <Col md='6' lg='4'className="d-flex justify-content-md-center flex-wrap">
                    <label className='text-center d-block w-100 fs-2'>от</label>
                    <div className="mx-auto bg-light rounded" style={{'height': '370px'}}>
                        <Datepicker
                            reset={reset}
                            baseMinDate={baseMinDate}
                            baseMaxDate={baseMaxDate}
                            setDateTo={setDateTo}
                            setDateFrom={setDateFrom}
                            select="min" 
                            loading={loading} 
                            error={error}/>  
                    </div>
                </Col>          
                <Col md='6' lg='4' className="d-flex justify-content-md-center flex-wrap">
                    <label className='text-center d-block w-100 fs-2'>до</label>
                    <div className="mx-auto bg-light rounded" style={{'height': '370px'}}>
                        <Datepicker 
                            reset={reset}
                            baseMaxDate={baseMaxDate}
                            baseMinDate={baseMinDate}
                            setDateTo={setDateTo}
                            setDateFrom={setDateFrom}
                            select="max" 
                            loading={loading} 
                            error={error}/>  
                    </div> 
                </Col> 
                <Col lg='4' className="d-none d-lg-block position-relative">
                    <Image src={imgKorona} className='h-100 position-absolute '/>
                </Col> 
                <Col lg='8' className='d-flex justify-content-center p-3'>
                    <Button onClick={onBaseDate} id="start">Отбразить все данные</Button>
                </Col>           
            </Row>
         </Row>          
    );
}

export default DatepickerBlock;