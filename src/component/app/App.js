
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,  Col, Spinner, Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import DatepickerBlock from '../datepickerblock/DatepickerBlock';
import TabsCovid from '../tabsCovid/TabsCovid';
import useCovidService  from '../../service/CovidService';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {
    const {setDateTo, 
            setDateFrom, 
            getDataByCountries, 
            dateTo, 
            dateFrom, 
            getSortedData, 
            getDataAfterSearch, 
            getFilteredData, 
            baseData, 
            getDataByDays,
            error} = useCovidService();
    const [loadingInApp, setLoadingInApp] = useState(true)

    const spinner = loadingInApp ? <Modal
                        show={true}
                        backdrop='true'
                        centered
                        contentClassName='bg-transparent border-0'
                        backdropClassName='bg-secondary'
                    >
                        <Col className='d-flex justify-content-center align-item-center'>
                            <Spinner style={{width: '4rem', height: '4rem'}}  role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Modal> : null;      
    return (
        
        <Container fluid className='bg-body min-vh-100 p-0'>
            <Col className="bg-dark py-2">
                <h1 className='text-light text-center display-1'>Covid statistics</h1>
            </Col>           
            <Container> 
                    {spinner}
                    <ErrorBoundary>
                        <DatepickerBlock setDateTo={setDateTo} setDateFrom={setDateFrom} dateTo={dateTo} dateFrom={dateFrom} setLoadingInApp={setLoadingInApp} /> 
                    </ErrorBoundary>       
                    <ErrorBoundary>
                        <TabsCovid  getDataByCountries={getDataByCountries} 
                            dateTo={dateTo} 
                            dateFrom={dateFrom}
                            getSortedData={getSortedData}
                            getDataAfterSearch={getDataAfterSearch}
                            getFilteredData={getFilteredData}
                            baseData={baseData}
                            getDataByDays={getDataByDays}
                            error={error}
                            setLoadingInApp={setLoadingInApp}
                            />  
                    </ErrorBoundary>                                  
            </Container>    
        </Container>
    );
}

export default App;
