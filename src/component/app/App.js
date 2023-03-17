
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,  Col} from 'react-bootstrap';

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

    return (
        
        <Container fluid className='bg-body min-vh-100 p-0'>
            <Col className="bg-dark py-2">
                <h1 className='text-light text-center display-1'>Covid statistics</h1>
            </Col>           
            <Container> 
                    <ErrorBoundary>
                        <DatepickerBlock setDateTo={setDateTo} setDateFrom={setDateFrom} dateTo={dateTo} dateFrom={dateFrom} /> 
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
                            />  
                    </ErrorBoundary>                                  
            </Container>    
        </Container>
    );
}

export default App;
