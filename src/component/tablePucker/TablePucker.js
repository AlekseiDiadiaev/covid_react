
import { Col,  Table, Button } from 'react-bootstrap';

const TablePucker = ({data, checkIndexTable, startRow, endRow, activeBtn, onSortData, tableTitles}) => {
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
    return (
        <>
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
        </>
    )
}

export default TablePucker;


