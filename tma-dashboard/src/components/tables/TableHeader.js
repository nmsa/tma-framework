import {Table} from 'semantic-ui-react'

function TableHeader(props){
    let uniqueId = 0;
    function returnTableHeader(headerName){
        //key property must be set and be unique because React uses it to optimize rendering process 
        return <Table.HeaderCell key={uniqueId++}> {headerName}</Table.HeaderCell>
    }

    return(
    <Table.Header>
      <Table.Row>
        {props["tableHeaders"].map(headerName => returnTableHeader(headerName))}
      </Table.Row>
    </Table.Header>
    )
}

export default TableHeader