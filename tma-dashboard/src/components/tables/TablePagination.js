import {Icon, Menu, Table} from 'semantic-ui-react'
import {useState} from "react"

function TablePagination(props){
    const [paginationItems, setPaginationItems] = useState([1,2,3]);
    const [currIndex,setCurrIndex] = useState(0);
    
    function paginationPageHandler(ev, atts){
        setCurrIndex(atts["index"])
    }

    function goBackPaginationHandler(ev, atts){
        if(currIndex === 0){
            let paginationItemsCopy = [...paginationItems];
            for (let i =0; i< paginationItems.length; i++){
                paginationItemsCopy[i] = paginationItemsCopy[i] - 1
            }
            setPaginationItems(paginationItemsCopy)
        }
        else{
            setCurrIndex(currIndex - 1)
        }
    }

    function goForwardPaginationHandler(ev, atts){
        if(currIndex === 2){
            let paginationItemsCopy = [...paginationItems];
            for (let i =0; i< paginationItems.length; i++){
                paginationItemsCopy[i] = paginationItemsCopy[i] + 1
            }
            setPaginationItems(paginationItemsCopy)
        }
        else{
            setCurrIndex(currIndex + 1)
        }
    }
    
    return(
        null
        /* uncomment and remove "null" from above to show pagination menu
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={props["numberOfColumns"]}>
                    <Menu pointing secondary compact stackable>
                        <Menu.Item 
                            as={(currIndex === 0 && paginationItems[0] === 1) ? "div" : "a" }
                            disabled = {currIndex === 0 && paginationItems[0] === 1 } icon onClick={goBackPaginationHandler}>
                            <Icon name='chevron left' />
                        </Menu.Item>
                        
                        <Menu.Item as='a' index = {0} active={ 0 === currIndex } onClick={paginationPageHandler}>
                            {paginationItems[0]}
                        </Menu.Item>
                        
                        <Menu.Item as='a' index = {1} active={ 1 === currIndex } onClick={paginationPageHandler}> 
                            {paginationItems[1]}
                        </Menu.Item>

                        <Menu.Item as='a' index = {2} active={ 2 === currIndex } onClick={paginationPageHandler}> 
                            {paginationItems[2]}
                        </Menu.Item>

                        <Menu.Item as='a' icon onClick={goForwardPaginationHandler}>
                            <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>*/
    )
}

export default TablePagination;