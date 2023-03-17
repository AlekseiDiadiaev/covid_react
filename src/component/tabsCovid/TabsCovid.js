import {Container, Tab, Tabs} from 'react-bootstrap';
import './tabsCovid.scss'
import TableCovid from '../tableCovid/TableCovid';
// import CharBlock from '../charBlock/CharBlock';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import React, { Suspense } from 'react';
const CharBlock = React.lazy(() => import('../charBlock/CharBlock'));

function TabsCovid({getDataByCountries, dateTo, dateFrom, getSortedData, getDataAfterSearch, getFilteredData, baseData, getDataByDays, error, setLoadingInApp}) {
    return (
       <>
            <Tabs defaultActiveKey="table" id="tabs" className="rounded fs-3" fill>
                <Tab eventKey="table" title="Таблица" >
                    <Container  className='bg-light p-4 border border-top-0 mb-2'>
                        <ErrorBoundary>
                            <TableCovid getDataByCountries={getDataByCountries} 
                                dateTo={dateTo} 
                                dateFrom={dateFrom} 
                                getSortedData={getSortedData}
                                getDataAfterSearch={getDataAfterSearch}
                                getFilteredData={getFilteredData}
                                baseData={baseData}
                                error={error}
                                setLoadingInApp={setLoadingInApp}
                                />
                        </ErrorBoundary>          
                    </Container>
                </Tab>
                <Tab eventKey="char" title="График" >
                    <Container className='bg-light p-4 border border-top-0  mb-2'>
                        <Suspense>
                            <CharBlock  getDataByCountries={getDataByCountries} 
                                        dateTo={dateTo} 
                                        dateFrom={dateFrom}
                                        getDataByDays={getDataByDays} />
                        </Suspense>
                    </Container>
                </Tab>
            </Tabs> 
       </>    
    );
}

export default TabsCovid;