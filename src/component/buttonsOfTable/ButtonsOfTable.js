import { useState , useEffect } from 'react';
import { Col, Button, ButtonGroup, DropdownButton, Dropdown} from 'react-bootstrap';

function ButtonsOfTable ({numOfRow, 
                            endRow, 
                            startRow, 
                            setNumOfRow, 
                            setStartRow, 
                            setEndRow,
                            data, 
                            checkIndexTable}) {
    
    const [dropdownTitle, setDropdownTitle] = useState(20)
    const [isScrollOnBtn, setIsScrollOnBtn] = useState(false);

    useEffect(() => {
        if(isScrollOnBtn) {
            window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "instant"})
            setIsScrollOnBtn(false)
        }
    }, [isScrollOnBtn])

    const onNavTable = (target) => {
        
        setIsScrollOnBtn(target)
        if (target.id === 'start') {
            setStartRow(checkIndexTable(0));
            setEndRow(data.length > numOfRow ? numOfRow : data.length)

        } if (target.id === 'end' && endRow < data.length) {
            let x = data.length - data.length % numOfRow;
            setStartRow(checkIndexTable(x === data.length ?  data.length - numOfRow: x));
            setEndRow(checkIndexTable(data.length))

        } if (target.id === 'next' && endRow < data.length) {
            setStartRow((startRow) => {
                setEndRow(checkIndexTable((startRow + numOfRow) + numOfRow))
                return checkIndexTable(startRow + numOfRow);
            });
           
        } if (target.id === 'prev' && startRow > 0) {
            setStartRow((startRow) => {
                setEndRow(checkIndexTable((startRow - numOfRow) + numOfRow))
                return checkIndexTable(startRow - numOfRow)});             
        }
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
    return (
        <Col className="d-flex justify-content-end mt-1">
            <ButtonGroup className="nav-table-btns">
                <DropdownButton onSelect={onNumOfRow} as={ButtonGroup} title={dropdownTitle} id="bg-nested-dropdown">
                    <Dropdown.Item eventKey="20" >20</Dropdown.Item>
                    <Dropdown.Item eventKey="50" >50</Dropdown.Item>
                    <Dropdown.Item eventKey="100" >100</Dropdown.Item>
                    <Dropdown.Item eventKey="all" >all</Dropdown.Item>
                </DropdownButton>
                <Button onClick={(e) => onNavTable(e.target)} id="start">start</Button>                
                <Button onClick={(e) => onNavTable(e.target)} id="prev">&larr;</Button>
                <Button onClick={(e) => onNavTable(e.target)} id="next">&rarr;</Button>
                <Button onClick={(e) => onNavTable(e.target)} id="end">end</Button>
            </ButtonGroup>
        </Col>)
}

export default ButtonsOfTable;