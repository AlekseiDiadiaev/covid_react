
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,  Col} from 'react-bootstrap';

import DatepickerBlock from '../datepickerblock/DatepickerBlock';
import TabsCovid from '../tabsCovid/TabsCovid';
import useCovidService  from '../../service/CovidService';

function App() {
    const {setDateTo, 
            setDateFrom, 
            getArrayByCountries, 
            dateTo, 
            dateFrom, 
            sortData, 
            search, 
            filter, 
            baseData, 
            getDataPerDay,
            error} = useCovidService();

    return (
        
        <Container fluid className='bg-body min-vh-100 p-0'>
            <Col className="bg-dark py-2">
                <h1 className='text-light text-center display-1'>Covid statistics</h1>
            </Col>           
            <Container>                
                    <DatepickerBlock setDateTo={setDateTo} setDateFrom={setDateFrom} dateTo={dateTo} dateFrom={dateFrom} />               
                    <TabsCovid  getArrayByCountries={getArrayByCountries} 
                                dateTo={dateTo} 
                                dateFrom={dateFrom}
                                sortData={sortData}
                                search={search}
                                filter={filter}
                                baseData={baseData}
                                getDataPerDay={getDataPerDay}
                                error={error}
                                />    
            </Container>    
        </Container>
    );
}

export default App;
