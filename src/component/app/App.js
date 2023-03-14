import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from 'react-bootstrap';

import DatepickerBlock from '../datepickerblock/DatepickerBlock';
import TabsCovid from '../tabsCovid/TabsCovid';
import  useCovidService  from '../../service/CovidService';

function App() {
    const {setDateTo, 
            setDateFrom, 
            getInitialData ,
            getArrayByCountries, 
            dateTo, 
            dateFrom, 
            sortData, 
            search, 
            filter, 
            baseData, 
            getFilteredDataPerDate,
            getDataPerDay} = useCovidService();

    return (
        
        <Container fluid className='bg-body min-vh-100 p-0'>
            <Row className="bg-dark py-2">
                <h1 className='text-light text-center display-1'>Covid statistics</h1>
            </Row>
            
            <Container>
                
                    <DatepickerBlock setDateTo={setDateTo} setDateFrom={setDateFrom}/>
                
                    <TabsCovid getInitialData={getInitialData} 
                                getArrayByCountries={getArrayByCountries} 
                                dateTo={dateTo} 
                                dateFrom={dateFrom}
                                sortData={sortData}
                                search={search}
                                filter={filter}
                                baseData={baseData}
                                getFilteredDataPerDate={getFilteredDataPerDate}
                                getDataPerDay={getDataPerDay}
                                />    
            </Container>    
        </Container>
    );
}

export default App;
