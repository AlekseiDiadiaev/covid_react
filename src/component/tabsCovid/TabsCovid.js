import {Container, Tab, Tabs} from 'react-bootstrap';
import './tabsCovid.scss'

import TableCovid from '../tableCovid/TableCovid';
import CharBlock from '../charBlock/CharBlock';
function TabsCovid({getInitialData , getFilteredDataPerDate, getArrayByCountries, dateTo, dateFrom, sortData, search, filter, baseData, getDataPerDay}) {
    return (
       <>
            <Tabs
                defaultActiveKey="table"
                id="tabs"
                className="rounded fs-3"
                fill
                >
                <Tab eventKey="table" title="Таблица" >
                    <Container  className='bg-light p-4 border border-top-0'>
                        <TableCovid getInitialData={getInitialData} 
                                    getArrayByCountries={getArrayByCountries} 
                                    dateTo={dateTo} 
                                    dateFrom={dateFrom} 
                                    sortData={sortData}
                                    search={search}
                                    filter={filter}
                                    baseData={baseData}
                                    />
                    </Container>
                </Tab>
                <Tab eventKey="char" title="График">
                    <Container className='bg-light p-4 border border-top-0'>
                        <CharBlock  getArrayByCountries={getArrayByCountries} 
                                    dateTo={dateTo} 
                                    dateFrom={dateFrom}
                                    getFilteredDataPerDate={getFilteredDataPerDate}
                                    getInitialData={getInitialData}
                                    getDataPerDay={getDataPerDay} />
                    </Container>
                </Tab>
            </Tabs> 
       </>    
    );
}

export default TabsCovid;