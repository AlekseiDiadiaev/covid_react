import { useEffect, useState } from 'react';
import { Row, Col, Form, Table, Button, ButtonGroup, DropdownButton, Dropdown, Spinner} from 'react-bootstrap';
import './tableCovid.scss'
import ErrorMassage from '../errorMessage/ErrorMessage'

function TableCovid({getDataByCountries, dateTo, dateFrom, getSortedData, getDataAfterSearch, getFilteredData, baseData, error}) {
    const [data, setData] = useState(null);
    const [tableError, setTableError] = useState(false);
    const [activeBtn, setActiveBtn] = useState('country+');
    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(20);
    const [numOfRow, setNumOfRow] = useState(20);
    const [dropdownTitle, setDropdownTitle] = useState(20)
    const [filterFromValue, setFilterFromValue] = useState('');
    const [filterToValue, setFilterToValue] = useState('');
    const [filterId, setFilterId] = useState('cases');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setTableError(error);
    }, [error])

    useEffect(() => {
        if(dateTo && dateFrom){
            getDataByCountries()
                .then(res => {
                    setTableError(false)
                    setData(res)
                    setNumOfRow((numOfRow) => {
                        return res.length > numOfRow ? numOfRow : res.length; 
                    })                
                }).catch(err => {
                    setTableError(true)
                    console.log(err);
                })
        }
       
    },[dateTo, dateFrom])

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
        const col = document.querySelectorAll(`.${colId}`);
        const cells = document.querySelectorAll(`.cell`);
        cells.forEach(item => {
            item.classList.remove('active-cell')
        })
        col.forEach(item => {
            item.classList.add('active-cell')
        })

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

    const onNumOfRow = (id) => {
        setDropdownTitle(id)
        if (id === 'all') {
            setNumOfRow(data.length)
            setStartRow(0)
            setEndRow(data.length)
        } else {
            setNumOfRow(+id)
            setStartRow(0)
            setEndRow(+id)
        }

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

    const onNavTable = (direction) => {
        if (direction === 'start') {
            setStartRow(checkIndexTable(0));
            setEndRow(data.length > numOfRow ? numOfRow : data.length)

        } if (direction === 'end' && endRow < data.length) {
            let x = data.length - data.length % numOfRow;
            setStartRow(checkIndexTable(x === data.length ?  data.length - numOfRow: x));
            setEndRow(checkIndexTable(data.length))

        } if (direction === 'next' && endRow < data.length) {
            setStartRow((startRow) => {
                setEndRow(checkIndexTable((startRow + numOfRow) + numOfRow))
                return checkIndexTable(startRow + numOfRow);
            });
           
        } if (direction === 'prev' && startRow > 0) {
            setStartRow((startRow) => {
                setEndRow(checkIndexTable((startRow - numOfRow) + numOfRow))
                return checkIndexTable(startRow - numOfRow)});             
        }
    }

    const tableRows = [];    
    if (data && data.length > 0){
        const limit = checkIndexTable(endRow)
            
        for (let i = startRow; i < limit; i++){
            if (!data[i]){
                break;
            }
            const {country, cases, deaths, allCases, allDeaths, casesPer1000, deathsPer1000, 
                averageCasesPerDay, averageDeathsPerDay, maxCasesPerDay, maxDeathsPerDay } = data[i];

            tableRows.push(<tr key={i + 1}>
                            <td>{i + 1}</td>
                            <td  className='country-cell cell active-cell'style={{maxWidth: '120px', overflowWrap: 'break-word'}}>{country}</td>
                            <td className='cases-cell cell'>{cases}</td>
                            <td className='deaths-cell cell'>{deaths}</td>
                            <td className='allCases-cell cell'>{allCases}</td>
                            <td className='allDeaths-cell cell'>{allDeaths}</td>
                            <td className='casesPer1000-cell cell'>{casesPer1000}</td>
                            <td className='deathsPer1000-cell cell'>{deathsPer1000}</td>
                            <td className='averageCasesPerDay-cell cell'>{averageCasesPerDay}</td>
                            <td className='averageDeathsPerDay-cell cell'>{averageDeathsPerDay}</td>
                            <td className='maxCasesPerDay-cell cell'>{maxCasesPerDay}</td>
                            <td className='maxDeathsPerDay-cell cell'>{maxDeathsPerDay}</td>
                        </tr>)
        }   
    }
  
    const tableTitles = [{text: 'Страна', id: 'country'}, 
                            {text: 'Заболеваний за выбранный период', id: 'cases'}, 
                            {text: 'Смертей за выбранный период', id: 'deaths'},
                            {text: 'Заболеваний за весь период', id: 'allCases'},
                            {text: 'Смертей за весь период', id: 'allDeaths'},
                            {text: 'Заболеваний на 1000 жителей', id: 'casesPer1000'},
                            {text: 'Смертей на 1000 жителей', id: 'deathsPer1000'},
                            {text: 'Средннее количество заболеаний в день', id: 'averageCasesPerDay'},
                            {text: 'Средннее количество смертей в день', id: 'averageDeathsPerDay'},
                            {text: 'Максимум заболеваний в день за выбранный период', id: 'maxCasesPerDay'},
                            {text: 'Максимум смертей в день за выбранный период', id: 'maxDeathsPerDay'},
                        ]

                  
    const tableHeader = tableTitles.map((item, i) => {          
        return <th 
                key={i} 
                className={`position-relative align-middle pb-4 cell ${item.id}-cell ${item.id === 'country' ? 'active-cell': null}`} 
                style={{'fontSize': '14px'}}>                       
                    {`${item.text}`} 
                    <Col className="m-1  position-absolute bottom-0 end-0" >
                        <Button 
                            active={activeBtn === `${item.id}-`? true: false}
                            id={`${item.id}-`} 
                            onClick={(e) => onSortData(e)} 
                            variant="outline-primary" 
                            className="p-0 ms-1" 
                            size="sm" 
                            style={{'width': '20px'}}
                            data-col={`${item.id}-cell`}>
                            &darr;
                        </Button>
                        <Button 
                            active={activeBtn === `${item.id}+`? true: false}
                            id={`${item.id}+`} 
                            onClick={(e) => onSortData(e)} 
                            variant="outline-primary" 
                            className="p-0 ms-1" 
                            size="sm" 
                            style={{'width': '20px'}}
                            data-col={`${item.id}-cell`}>
                            &uarr;
                        </Button>
                    </Col>                                
                </th>
    })

    const table = <>
                    <Table striped bordered hover size="sm">
                            <thead>   
                            <tr>
                                <th className="align-middle">#</th>
                                {tableHeader}
                            </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                    </Table>
                </>;

    const errorMessage = tableError ? <ErrorMassage>Ошибка при получении данных. Обновите страницу.</ErrorMassage>: null;
    const massage = data && data.length === 0 ? <Col className="fs-1 text-center py-5">Данных не найдено.</Col>: null;
    
    const spinner = !data && !tableError ? <Col className='d-flex justify-content-center'>
                                                <Spinner animation="border" role="status" className="m-2">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </Col> : null;

    const viewTable = data && !massage ? table: null;

    const navBtns = viewTable ? <Col className="d-flex justify-content-end mt-1">
                                    <ButtonGroup className="nav-table-btns">
                                        <DropdownButton onSelect={onNumOfRow} as={ButtonGroup} title={dropdownTitle} id="bg-nested-dropdown">
                                            <Dropdown.Item eventKey="20" >20</Dropdown.Item>
                                            <Dropdown.Item eventKey="50" >50</Dropdown.Item>
                                            <Dropdown.Item eventKey="100" >100</Dropdown.Item>
                                            <Dropdown.Item eventKey="all" >all</Dropdown.Item>
                                        </DropdownButton>
                                        <Button onClick={(e) => onNavTable(e.target.id)} id="start">start</Button>                
                                        <Button onClick={(e) => onNavTable(e.target.id)} id="prev">&larr;</Button>
                                        <Button onClick={(e) => onNavTable(e.target.id)} id="next">&rarr;</Button>
                                        <Button onClick={(e) => onNavTable(e.target.id)} id="end">end</Button>
                                    </ButtonGroup>
                                </Col> : null; 

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
                placeholder="Вевдите название страны на английском" 
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
                        placeholder="Вевдите значение от" 
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
                        placeholder="Вевдите значение до" 
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