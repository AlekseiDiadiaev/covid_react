import { useEffect, useState } from 'react';
import { Row, Col, Form, Table, Button, ButtonGroup, DropdownButton, Dropdown, Spinner} from 'react-bootstrap';


function TableCovid({getArrayByCountries, dateTo, dateFrom, sortData, search, filter, baseData}) {
    const [data, setData] = useState(null);
    const [activeBtn, setActiveBtn] = useState('country+');
    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(20);
    const [numOfRow, setNumOfRow] = useState(20);
    const [dropdownTitle, setDropdownTitle] = useState(20)
    const [filterFromValue, setFilterFromValue] = useState('');
    const [filterToValue, setFilterToValue] = useState('');
    const [filterId, setFilterId] = useState('cases');
    const [searchValue, setSearchValue] = useState('');
    // console.log({
    //     startRow, endRow, numOfRow, data
    // })
    useEffect(() => {
        if(dateTo && dateFrom){
            getArrayByCountries()
                .then(res => {
                    setData(res)
                    setNumOfRow((numOfRow) => {
                        return res.length > numOfRow ? numOfRow : res.length; 
                    })                
                })   
        }
       
    },[dateTo, dateFrom])

    useEffect(() => {
        setSearchValue('');
        const res = filter(filterId, filterFromValue ,filterToValue);
        if(res) {
            setData(res);
            setStartRow(0);
            setEndRow(res.length > numOfRow ? numOfRow : res.length);    
        }  
    }, [filterFromValue, filterToValue, filterId] )

    const onSearch = (str) => {
        setSearchValue(str);
        setStartRow(0);      
        const res = search(str)  
        setEndRow(res.length > numOfRow ? numOfRow : res.length);  
        setData(res)
        setFilterFromValue('');
        setFilterToValue('');     
    }     

    const onSortData = (e) => {
        const res = sortData(e.target.id);
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

    const checkIndexTable = (num) => {       
        if (num < 0) {
            return  0;
        }
        if (num > data.length ) {
            return data.length ; 
        } 
        return num;
    }

    const navTable = (direction) => {
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
                            <td style={{maxWidth: '120px', overflowWrap: 'break-word'}}>{country}</td>
                            <td>{cases}</td>
                            <td>{deaths}</td>
                            <td>{allCases}</td>
                            <td>{allDeaths}</td>
                            <td>{casesPer1000}</td>
                            <td>{deathsPer1000}</td>
                            <td>{averageCasesPerDay}</td>
                            <td>{averageDeathsPerDay}</td>
                            <td>{maxCasesPerDay}</td>
                            <td>{maxDeathsPerDay}</td>
                        </tr>)
        }   
    }
  
    const tableTitles = [{text: 'Страна', id: 'country'}, 
                            {text: 'Количество случаев', id: 'cases'}, 
                            {text: 'Количество смертей', id: 'deaths'},
                            {text: 'Количество случаев за весь период', id: 'allCases'},
                            {text: 'Количество смертей за весь период', id: 'allDeaths'},
                            {text: 'Количество случаев на 1000 жителей', id: 'casesPer1000'},
                            {text: 'Количество смертей на 1000 жителей', id: 'deathsPer1000'},
                            {text: 'Среднне количество случаев в день', id: 'averageCasesPerDay'},
                            {text: 'Среднне количество смертей в день', id: 'averageDeathsPerDay'},
                            {text: 'Максимум случаев в день за выбранный период', id: 'maxCasesPerDay'},
                            {text: 'Максимум смертей в день за выбранный период', id: 'maxDeathsPerDay'},
                        ]

                  
    const tableHeader = tableTitles.map((item, i) => {          
        return <th key={i} className="position-relative align-middle pb-4" style={{'fontSize': '14px'}}>                       
                    {`${item.text}`} 
                    <Col className="m-1  position-absolute bottom-0 end-0" >
                        <Button 
                            active={activeBtn === `${item.id}-`? true: false}
                            id={`${item.id}-`} 
                            onClick={(e) => onSortData(e)} 
                            variant="outline-primary" 
                            className="p-0 ms-1" 
                            size="sm" 
                            style={{'width': '20px'}}>
                            &darr;
                        </Button>
                        <Button 
                            active={activeBtn === `${item.id}+`? true: false}
                            id={`${item.id}+`} 
                            onClick={(e) => onSortData(e)} 
                            variant="outline-primary" 
                            className="p-0 ms-1" 
                            size="sm" 
                            style={{'width': '20px'}}>
                            &uarr;
                        </Button>
                    </Col>                                
                </th>
    })

    const table = <>
                    <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                {tableHeader}
                            </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                    </Table>
                    <Col className="d-flex justify-content-end">
                        <ButtonGroup>
                            <DropdownButton onSelect={onNumOfRow} as={ButtonGroup} title={dropdownTitle} id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="20" >20</Dropdown.Item>
                                <Dropdown.Item eventKey="50" >50</Dropdown.Item>
                                <Dropdown.Item eventKey="100" >100</Dropdown.Item>
                                <Dropdown.Item eventKey="all" >all</Dropdown.Item>
                            </DropdownButton>
                            <Button onClick={(e) => navTable(e.target.id)} id="start">start</Button>                
                            <Button onClick={(e) => navTable(e.target.id)} id="prev">&larr;</Button>
                            <Button onClick={(e) => navTable(e.target.id)} id="next">&rarr;</Button>
                            <Button onClick={(e) => navTable(e.target.id)} id="end">end</Button>
                        </ButtonGroup>
                    </Col> 
                </>;


    const tableOrMassage = data ? (data.length === 0 ?<Col className="fs-1 text-center py-5">Данных не найдено.</Col>  : table) : false;

    const optionOfSelect = tableTitles.map((item,i) => {
        if(i === 0) return false; 
        return  <option key={i} value={item.id}>{item.text}</option>;      
    })

    return (
        <>
            <Form.Label className="fs-3">Поиск по стране</Form.Label>
            <Form.Control 
                disabled={!data}
                type="search" 
                placeholder="Вевдите название страны на английском" 
                className="mb-3"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                />
            <Row className="mb-3">
                <Form.Label className="fs-3">Фильтрация по полю</Form.Label>
                <Col lg='6'>
                    <Form.Select aria-label="filterSelect" disabled={!data} value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                         {optionOfSelect}                    
                    </Form.Select>
                </Col>
                <Col lg='3'>
                    <Form.Label className="fs-3 d-inline me-2 align-text-bottom">от</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Вевдите значение от" 
                        className="m-0 d-inline w-75 align-top" 
                        disabled={!data}
                        value={filterFromValue}
                        onChange={(e) => setFilterFromValue(e.target.value)}
                        />
                </Col>
                <Col lg='3'>
                    <Form.Label className="fs-3 d-inline me-2">до</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Вевдите значение до" 
                        className="m-0 d-inline w-75 align-top" 
                        disabled={!data}
                        value={filterToValue}
                        onChange={(e) => setFilterToValue(e.target.value)}
                        />
                </Col>
            </Row>
            <Button onClick={onReset} disabled={!data} variant="danger" className="mb-3 float-end">Сбросить фильтры</Button>
            {tableOrMassage ? tableOrMassage : <Spinner/>}
               
        </>
    );
}


export default TableCovid;