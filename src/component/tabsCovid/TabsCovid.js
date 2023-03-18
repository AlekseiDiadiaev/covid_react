import {Container, Tab, Tabs} from 'react-bootstrap';
import './tabsCovid.scss'
import TableCovid from '../tableCovid/TableCovid';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import React, { Suspense, useState} from 'react';
const CharBlock = React.lazy(() => import('../charBlock/CharBlock'));

function TabsCovid({getDataByCountries, 
                    dateTo, 
                    dateFrom, 
                    getSortedData, 
                    getDataAfterSearch, 
                    getFilteredData, 
                    baseData, 
                    getDataByDays,
                    error, 
                    setLoadingInApp, 
                    tableTitles, 
                    countriesList}) {
    const [wasCharOpen, setWasCharOpen] = useState(false)
    return (
       <>
            <Tabs 
                defaultActiveKey="table" 
                id="tabs" 
                className="rounded fs-3" 
                fill 
                onSelect={(e) => e === 'char' ? setWasCharOpen(true) : setWasCharOpen(false)}
            >
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
                                tableTitles={tableTitles}
                                />
                        </ErrorBoundary>          
                    </Container>
                </Tab>

                <Tab eventKey="char" title="График" >
                    <Container className='bg-light p-4 border border-top-0  mb-2'>
                        <Suspense>
                            <CharBlock  dateTo={dateTo} 
                                        dateFrom={dateFrom}
                                        getDataByDays={getDataByDays} 
                                        countriesList={countriesList}
                                        wasCharOpen={wasCharOpen}/>
                        </Suspense>
                    </Container>
                </Tab>
            </Tabs> 
       </>    
    );
}

export default TabsCovid;