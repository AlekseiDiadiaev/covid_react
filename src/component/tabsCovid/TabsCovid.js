import {Container, Tab, Tabs} from 'react-bootstrap';
import './tabsCovid.scss'
import TableCovid from '../tableCovid/TableCovid';
import CharBlock from '../charBlock/CharBlock';

function TabsCovid({getArrayByCountries, dateTo, dateFrom, sortData, search, filter, baseData, getDataPerDay, error}) {
    return (
       <>
            <Tabs defaultActiveKey="table" id="tabs" className="rounded fs-3" fill>
                <Tab eventKey="table" title="Таблица" >
                    <Container  className='bg-light p-4 border border-top-0 mb-2'>
                        <TableCovid getArrayByCountries={getArrayByCountries} 
                                    dateTo={dateTo} 
                                    dateFrom={dateFrom} 
                                    sortData={sortData}
                                    search={search}
                                    filter={filter}
                                    baseData={baseData}
                                    error={error}
                                    />
                    </Container>
                </Tab>
                <Tab eventKey="char" title="График" >
                    <Container className='bg-light p-4 border border-top-0  mb-2'>
                        <CharBlock  getArrayByCountries={getArrayByCountries} 
                                    dateTo={dateTo} 
                                    dateFrom={dateFrom}
                                    getDataPerDay={getDataPerDay} />
                    </Container>
                </Tab>
            </Tabs> 
       </>    
    );
}

export default TabsCovid;