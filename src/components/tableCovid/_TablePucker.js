import checkIndexTable from '../../utils/checkIndexTable';
import { Col, Table, Button } from 'react-bootstrap';

const TablePucker = ({ shownData, startRow, endRow, activeBtn, onSortData, tableTitles, activeCol }) => {
    const tableRows = [];
    if (shownData && shownData.length > 0) {
        const limit = checkIndexTable(endRow, shownData)
        for (let i = startRow; i < limit; i++) {

            if (!shownData[i]) {
                break;
            }
            const { country, cases, deaths, allCases, allDeaths, casesPer1000, deathsPer1000,
                averageCasesPerDay, averageDeathsPerDay, maxCasesPerDay, maxDeathsPerDay } = shownData[i];

            tableRows.push(<tr key={i + 1}>
                <td>{i + 1}</td>
                <td className={`country-cell cell ${activeCol === 'country-cell' ? 'active-cell' : ''}`}
                    style={{ maxWidth: '120px', overflowWrap: 'break-word' }}>{country}</td>
                <td className={`cases-cell cell ${activeCol === 'cases-cell' ? 'active-cell' : ''}`}>{cases}</td>
                <td className={`deaths-cell cell ${activeCol === 'deaths-cell' ? 'active-cell' : ''}`}>{deaths}</td>
                <td className={`allCases-cell cell ${activeCol === 'allCases-cell' ? 'active-cell' : ''}`}>{allCases}</td>
                <td className={`allDeaths-cell cell ${activeCol === 'allDeaths-cell' ? 'active-cell' : ''}`}>{allDeaths}</td>
                <td className={`casesPer1000-cell cell ${activeCol === 'casesPer1000-cell' ? 'active-cell' : ''}`}>{casesPer1000}</td>
                <td className={`deathsPer1000-cell cell ${activeCol === 'deathsPer1000-cell' ? 'active-cell' : ''}`}>{deathsPer1000}</td>
                <td className={`averageCasesPerDay-cell cell ${activeCol === 'averageCasesPerDay-cell' ? 'active-cell' : ''}`}>{averageCasesPerDay}</td>
                <td className={`averageDeathsPerDay-cell cell ${activeCol === 'averageDeathsPerDay-cell' ? 'active-cell' : ''}`}>{averageDeathsPerDay}</td>
                <td className={`maxCasesPerDay-cell cell ${activeCol === 'maxCasesPerDay-cell' ? 'active-cell' : ''}`}>{maxCasesPerDay}</td>
                <td className={`maxDeathsPerDay-cell cell ${activeCol === 'maxDeathsPerDay-cell' ? 'active-cell' : ''}`}>{maxDeathsPerDay}</td>
            </tr>)
        }
    }

    const tableHeader = tableTitles.map((item, i) => {
        return <th
            key={i}
            className={`position-relative align-middle pb-4 cell ${item.id}-cell ${activeCol === item.id + '-cell' ? 'active-cell' : ''}`}
            style={{ 'fontSize': '14px' }}>
            {`${item.text}`}
            <Col className="m-1  position-absolute bottom-0 end-0" >
                <Button
                    active={activeBtn === `${item.id}-` ? true : false}
                    id={`${item.id}-`}
                    onClick={(e) => onSortData(e)}
                    variant="outline-primary"
                    className="p-0 ms-1"
                    size="sm"
                    style={{ 'width': '20px' }}
                    data-col={`${item.id}-cell`}>
                    &darr;
                </Button>
                <Button
                    active={activeBtn === `${item.id}+` ? true : false}
                    id={`${item.id}+`}
                    onClick={(e) => onSortData(e)}
                    variant="outline-primary"
                    className="p-0 ms-1"
                    size="sm"
                    style={{ 'width': '20px' }}
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


