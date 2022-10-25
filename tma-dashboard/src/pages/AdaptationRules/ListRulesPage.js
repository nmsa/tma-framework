import { Loader, Divider, Table, Icon, Header, Button, Grid, Form, Container} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect, useRef} from "react"
import TableHeader from "../../components/tables/TableHeader"
import TablePagination from '../../components/tables/TablePagination'
import { useNavigate } from 'react-router-dom';

function ListRulesPage(props){
    let navigate = useNavigate();
    const currpath = props["currpath"]
    
    const tableHeaders = ["Rules"]
    
    const [apiData, setAPIData] = useState(null);
    
    const [ruleNameFilter, setRuleNameFilter] = useState("");

    async function makeAPIRequest(queryParams){
        let res = await ApiModule().getRulesNames(queryParams)
        setAPIData(res)
    }

    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest(null)
    },[]);
    
    function filterChangeHandler(ev,atts){
        setRuleNameFilter(atts["value"])
    }

    function filterButtonHandler(){
        let queryParams = {"filter": ruleNameFilter}
        makeAPIRequest(queryParams)
    }
    
    function createRuleButtonHandler(){
        navigate("/createAdaptationRule")
    }

    function onRowClickHandler(ev){
       navigate(currpath + "/" + ev.currentTarget.getAttribute("ruleName"))
    }

    function renderCustomRow(rowItem, uniqueId){
        return(
            <Table.Row key={uniqueId} rulename={rowItem} style={{cursor:"pointer"}} onClick={onRowClickHandler} >
                <Table.Cell >
                    {rowItem}
                </Table.Cell>
            </Table.Row>
        )
    }

    function generateCustomTableBody(){
        let uniqueId = 0;
        let renderedrows = [];
        for(let rowItem of apiData){
            renderedrows.push(renderCustomRow(rowItem,uniqueId))
            uniqueId++
        }
        return renderedrows
    }

    return (
        <div>
            <Grid centered>
                <Grid.Row> 
                    <Grid.Column>
                        <Divider section horizontal>
                            <Header  as="h1" textAlign="center">List of Adaptation Rules</Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {
                //if apiData is null, then it is because the response from the API hasn't arrived
                apiData === null ? <Loader active inline='centered'> Retrieving content</Loader> :

                <Grid columns={1}> 
                    <Grid.Column>
                        <Container>
                            <p align="right">
                                <Button color='blue' onClick={createRuleButtonHandler}> Create Rule </Button>
                            </p>
                            <Form widths='equal'>
                                <Form.Group>
                                    <Form.Input name="ruleNameFilter" onChange={filterChangeHandler} label="Filter by name"/>
                                    <Form.Field style={{marginTop: "auto"}}>
                                        <Form.Button color='blue' type='submit' icon onClick={filterButtonHandler}>
                                            Filter
                                            <Icon name='filter' />
                                        </Form.Button>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                            <Table textAlign="center" compact celled selectable> 
                                <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                <Table.Body>
                                    {generateCustomTableBody()}
                                </Table.Body>
                                <TablePagination numberOfColumns={tableHeaders.length}/>
                            </Table>
                        </Container>
                    </Grid.Column>
                </Grid>
            }
        </div>
    )
}

export default ListRulesPage;