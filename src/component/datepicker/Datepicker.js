
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { format, } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import ErrorMessage from '../errorMessage/ErrorMessage';

export default function DatePiсker({setDateTo, setDateFrom, select, loading, error, reset, baseMinDate, baseMaxDate}) {
    const [selected, setSelected] = useState(null);
    const onSelectDate = (e) => {
        setSelected(e)
        if(select === 'min') {
            setDateFrom(Date.parse(e));
        } else {
            setDateTo(Date.parse(e));
        }
    }

    useEffect(() => {
        setSelected(select === 'min'? baseMinDate: baseMaxDate)
    }, [reset, baseMinDate])

    let footer = <p>Пожалуйста выберите дату</p>;
    if (selected) {
        footer = <p>Выбрана дата {format(selected, 'PP', {locale: ru})}.</p>;
    }
    
    
    const datepicker = selected && !loading && !error ? <DayPicker
                                    defaultMonth={selected}
                                    fromDate={baseMinDate}
                                    toDate={baseMaxDate}                              
                                    locale={ ru }
                                    captionLayout="dropdown" 
                                    mode="single"
                                    selected={selected}
                                    onSelect={(e) => e ? onSelectDate(e): null}
                                    footer={footer}
                                    /> : null;

    const spinner = loading ? <Row className="d-flex align-items-center justify-content-center h-100"  style={{'width': '312px'}}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Row> : null;

    const errormassage = error ? <Row className="d-flex align-items-center h-100"  style={{'width': '312px'}}>
                                    <Col  >
                                        <ErrorMessage className="d-block w-100"/>
                                     </Col>
                                     <Col className="fs-5 text-center">
                                        Произошла ошибка. Поробуйте обновить страницу.
                                     </Col>
                                  </Row> : null;
    return (
        <>
        {datepicker}
        {spinner}
        {errormassage}
        </>
    );
}
