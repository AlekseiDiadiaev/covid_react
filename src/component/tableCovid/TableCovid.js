import { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner} from 'react-bootstrap';
import './tableCovid.scss'
import ErrorMassage from '../errorMessage/ErrorMessage'

import ButtonsOfTable from '../buttonsOfTable/ButtonsOfTable'
import TablePucker from '../tablePucker/TablePucker';

function TableCovid({getDataByCountries, 
                        dateTo,
                        dateFrom, 
                        getSortedData, 
                        getDataAfterSearch, 
                        getFilteredData, 
                        baseData, 
                        error, 
                        setLoadingInApp, 
                        tableTitles}) {

    const [data, setData] = useState(null);
    const [tableError, setTableError] = useState(false);
    const [activeBtn, setActiveBtn] = useState('country+');
    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(20);
    const [numOfRow, setNumOfRow] = useState(20);
    const [filterFromValue, setFilterFromValue] = useState('');
    const [filterToValue, setFilterToValue] = useState('');
    const [filterId, setFilterId] = useState('cases');
    const [searchValue, setSearchValue] = useState('');
    const [togglerGetData, setTogglerGetData] = useState(false);
    const [activeCol, setActiveCol] = useState('country-cell');
    

    useEffect(() => {
        setTableError(error);
    }, [error])

    useEffect(() => {
        setTogglerGetData(!togglerGetData);     
    },[dateTo, dateFrom])

    useEffect(() => {
        if(dateTo && dateFrom){
            getDataByCountries()
                .then(res => {
                    setLoadingInApp(false); 
                    setTableError(false)
                    setData(res)
                    setNumOfRow((numOfRow) => {
                        return res.length > numOfRow ? numOfRow : res.length; 
                    })                                 
                }).catch(err => {
                    setLoadingInApp(false);
                    setTableError(true)
                    console.log(err);      
                })
        }  
    },[togglerGetData])

    useEffect(() => {
        setSearchValue('');
        const res = getFilteredData(filterId, filterFromValue ,filterToValue);
        if(res) {
            setData(res);
            setStartRow(0);
            setEndRow(res.length > numOfRow ? numOfRow : res.length);    
        }  
    }, [filterFromValue, filterToValue, filterId] )

    const onSearch = (str) => {
        setSearchValue(str);
        
        const res = getDataAfterSearch(str)
        setStartRow(0);      
        setEndRow(res.length > numOfRow ? numOfRow : res.length);  
        setData(res)
        setFilterFromValue('');
        setFilterToValue('');     
    }     

    const onSortData = (e) => {
        const colId = e.target.getAttribute('data-col');
        setActiveCol(colId);
        const res = getSortedData(e.target.id);
        setData(res);
        setActiveBtn(e.target.id);

    }
    
    const onReset = () => {
        setActiveBtn('country+');
        setFilterFromValue('');
        setFilterToValue('');
        setSearchValue('');
        setFilterId('cases');
        setData(baseData)
        setStartRow(0);
        setEndRow(numOfRow);               
    }       
  
    const checkIndexTable = (num) => { //mini-validator for cheking index of row    
        if (num < 0) {
            return  0;
        }
        if (num > data.length ) {
            return data.length ; 
        } 
        return num;
    }

    const table = <TablePucker
                    activeCol={activeCol}
                    data={data}
                    checkIndexTable={checkIndexTable}
                    startRow={startRow}
                    endRow={endRow}
                    activeBtn={activeBtn}
                    onSortData={onSortData}
                    tableTitles={tableTitles}
                    />;

    const errorMessage = tableError ? <ErrorMassage>Ошибка при получении данных. Обновите страницу.</ErrorMassage>: null;
    
    const massage = data && data.length === 0 ? <Col className="fs-1 text-center py-5">Данных не найдено.</Col>: null;
    
    const spinner = !data && !tableError ? <Col className='d-flex justify-content-center'>
                                                <Spinner animation="border" role="status" className="m-2">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </Col> : null;

    const viewTable = data && !massage ? table: null;

    const navBtns = viewTable ? <ButtonsOfTable 
                                    data={data}
                                    numOfRow={numOfRow} 
                                    endRow={endRow}
                                    startRow={startRow}
                                    setNumOfRow={setNumOfRow}
                                    setStartRow={setStartRow}
                                    setEndRow={setEndRow}
                                    checkIndexTable={checkIndexTable}/> : null;

    const optionOfSelect = tableTitles.map((item,i) => {
        if(i === 0) return false; 
        return  <option key={i} value={item.id}>{item.text}</option>;      
    })
    
   
    return (
        <>
            <Form.Label className="fs-3">Поиск по стране</Form.Label>
            <Form.Control 
                disabled={!data}
                type="getDataAfterSearch" 
                placeholder="Введите название страны на английском" 
                className="mb-3"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                />
            <Row className="mb-3">
                <Form.Label className="fs-3">Фильтрация по полю</Form.Label>
                <Col lg='6'className="mb-3">
                    <Form.Select aria-label="filterSelect" disabled={!data} value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                         {optionOfSelect}                    
                    </Form.Select>
                </Col>
                <Col lg='3' className="pb-2">
                    <Form.Label className="fs-3 d-inline d-inline-block" style={{'width': '36px'}}>от</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Введите значение от" 
                        className="m-0 ms-1 d-inline w-75 align-top" 
                        disabled={!data}
                        value={filterFromValue}
                        onChange={(e) => setFilterFromValue(e.target.value)}
                        />
                </Col>
                <Col lg='3' className="pb-2">
                    <Form.Label className="fs-3 d-inline d-inline-block" style={{'width': '40px'}}>до</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Введите значение до" 
                        className="m-0 d-inline w-75 align-top" 
                        disabled={!data}
                        value={filterToValue}
                        onChange={(e) => setFilterToValue(e.target.value)}
                        />
                </Col>
                <Col>
                    <Button onClick={onReset} disabled={!data} variant="danger" className="float-end">Сбросить фильтры</Button>
                </Col>
            </Row>
            <Row className="overflow-auto position-relative">
                {errorMessage}
                {massage}
                {spinner}
                {viewTable}
            </Row>
            {navBtns}   
        </>
    );
}
export default TableCovid;

