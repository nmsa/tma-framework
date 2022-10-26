import {Table} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

function TableBody(props){
    //uniqueID is requested for Table items so that React can optimize rendering process 
    //It is used for the key property which must be set and be unique 
    let uniqueID = 0;
    let navigate = useNavigate();
    const tableRowBasePath = props["baserowpathlink"];

    function tableRowHandler(ev){
        navigate(tableRowBasePath + "/" + ev.currentTarget.getAttribute("rowid"),{state: {data: props["rowlinkdata"]}})
    }

    //style={{cursor:"pointer"}} onClick={tableRowHandler}
    function renderRow(rowItemData){
        let tableHeaders = props["tableHeaders"]
        return (
            <Table.Row  
            {
                ...tableRowBasePath !== undefined ? 
                {
                    style: {cursor:"pointer"},
                    onClick: tableRowHandler
                } 
                : null
            } 
            rowid={rowItemData[tableHeaders[0]]} 
            key={uniqueID++}>
                {
                    //for each row item, get the values for the header attributes respecting the table headers order
                    tableHeaders.map(headerName => renderRowCell(headerName,rowItemData))
                }
            </Table.Row>
        )
    }

    function renderRowCell(headerName,rowItemData){
        return <Table.Cell key={uniqueID++}> {rowItemData[headerName]} </Table.Cell>
    }

    return(
        <Table.Body>
            {
                //iterate over the result list to access each row item; props["data"] => list of entities
                props["data"].map((rowItemData) => renderRow(rowItemData))
            }
        </Table.Body>
    )
}

export default TableBody