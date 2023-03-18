
import { useEffect, useState } from 'react';
import { Row, Spinner, Alert, Modal} from 'react-bootstrap';
import { format, } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DatePiсker({setDateTo, setDateFrom, idPicker, loading, error, reset, baseMinDate, baseMaxDate, closeAccordion, setLoadingInApp, limitChangedDate}) {
    const [selected, setSelected] = useState();
    const [onSelected, setOnSelected] = useState(null);
    const [month, setMonth] = useState();

    useEffect(() => {
        if(onSelected){
            setTimeout(() => {
                if(idPicker === 'min') {      
                    setDateFrom(onSelected);
                    
                } else {
                    setDateTo(onSelected);
                } 
            },400)
        } 
    },[onSelected]);

    useEffect(() => {
        setMonth(idPicker === 'min'? baseMinDate: baseMaxDate)
        setSelected(idPicker === 'min'? baseMinDate: baseMaxDate)
        
    }, [reset, baseMinDate])

    useEffect(() => {
        if(baseMinDate && baseMaxDate) {
            setTimeout(() => {
                if(idPicker === 'min') {      
                    setDateFrom(baseMinDate);
                    
                } else {
                    setDateTo(baseMaxDate);
                } 
            },400)
        }   
    }, [reset])

    const onSelectDate = (e) => {
        const dateUTC = e - (new Date().getTimezoneOffset() * 60 * 1000)
        setLoadingInApp(true)
        setSelected(dateUTC)
        setOnSelected(dateUTC)
        if (window.innerWidth < 768){
            closeAccordion(dateUTC, idPicker);
        } 
    }

    let footer = <p>Пожалуйста выберите дату</p>;
    if (selected) {
        footer = <p>Выбрана дата {format(selected, 'PP', {locale: ru})}.</p>;
    }
    
    // const getLimitDateFrom = () => {
    //     if (idPicker === "min") {
    //         return baseMinDate
    //     } else {
    //         limitChangedDate;
    //     }
    // }

    const limitDateFrom = idPicker === "min" ? baseMinDate: limitChangedDate;
    const limitDateTo = idPicker === "max" ? baseMaxDate: limitChangedDate;

    const spinner = loading ? <Row className="d-flex align-items-center justify-content-center h-100"  style={{'width': '312px'}}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Row> : null;

    const errormassage = error ?  <Modal
                                        show    
                                        size="lg"
                                        centered>
                                         <Alert variant="danger" onClose={() => window.location.reload()} dismissible className='m-0'>
                                            <Alert.Heading>Произошла ошибка</Alert.Heading>
                                            <p>
                                            К сожалению, не удалось получить данные. Пожалуйста, закройте это окно и попробуйте еще раз. 
                                            Если проблема сохраняется, пожалуйста, попробуйте позже. Извините за неудобства.
                                            </p>
                                        </Alert>
                                    </Modal>
                                   : null;

    const datepicker = selected && !loading && !error ? <DayPicker
                                    required={true}
                                    defaultMonth={selected}
                                    month={month}
                                    onMonthChange={setMonth} 
                                    fromDate={limitDateFrom}
                                    toDate={limitDateTo}                              
                                    locale={ ru }
                                    // captionLayout="dropdown" 
                                    mode="single"
                                    selected={new Date(selected)}
                                    onSelect={(e) => e ? onSelectDate(e): null}
                                    footer={footer}
                                    modifiersStyles={{
                                        selected: { background: '#0d6efd', }
                                    }}
                                    /> : null;

    return (
        <>
        {datepicker}
        {spinner}
        {errormassage}
        </>
    );
}



