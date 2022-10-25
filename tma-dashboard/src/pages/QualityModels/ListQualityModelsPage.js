import { Loader, Divider, Table, Icon, Header, Button, Grid, Form, Container, Segment} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import TableHeader from "../../components/tables/TableHeader"
import TableBody from "../../components/tables/TableBody"
import TablePagination from '../../components/tables/TablePagination'
import { useNavigate } from 'react-router-dom';

function ListQualityModelsPage(props){
    let navigate = useNavigate();
    const currpath = props["currpath"]
    
    const tableBodyJSONProps = ["qualityModelId","modelName","metricId","metricName"]; 
    //above add the following strings: "modelDescriptionReference","businessThreshold"
    //and add below: "Description Reference", "Business Threshold" to show these properties
    const tableHeaders = ["Id", "Name", "Metric Id", "Metric Name"];

    
    const [apiData, setAPIData] = useState(null);
    const [apiDataProcessed, setAPIDataProcessed] = useState(false);
    const [filters, setFilters] = useState({
        "qualityModelsFilter": "",
        "metricsFilter": ""
    });
    
    
    function makeAPIRequest(queryParams){
        ApiModule().getQualityModels(queryParams, setAPIData)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest(null)
    },[]);
    
    useEffect(() => {
        if(apiData !== null && apiDataProcessed === false){
            processAPIData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[apiData]);

    function processAPIData(){
        let apiDataNew = []
        for(let apiDataElem of apiData){
            apiDataElem["metricId"] =  apiDataElem["metric"]["metricId"]
            apiDataElem["metricName"] = apiDataElem["metric"]["metricName"]
            delete apiDataElem["metric"]
            apiDataNew.push(apiDataElem)
        }
        setAPIData(apiDataNew);
        setAPIDataProcessed(true);
    }

    function filterChangeHandler(ev,atts){
        if(atts["name"] === "qualityModelsFilter"){
            setFilters({
                    ...filters,
                    "qualityModelsFilter": atts["value"]
                })
        }
        else{
            setFilters({
                    ...filters,
                    "metricsFilter": atts["value"]
                })
        }
    }

    function filterSubmitHandler(ev){
        let queryParams = {
            "qualityModelsFilter": filters["qualityModelsFilter"],
            "metricsFilter": filters["metricsFilter"]
        }
        setAPIDataProcessed(false)
        makeAPIRequest(queryParams)
    }
    
    function createQualityModelButtonHandler(){
        navigate("/createQualityModel")
    }

    return(
        <div>
            <Grid centered>
                <Grid.Row >
                    <Grid.Column>
                        <Divider section horizontal>
                            <Header as="h1" textAlign="center">List of Quality Models</Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {
            //if apiData is null, then it is because the response from the API hasn't arrived
            apiData === null ? <Loader active inline='centered'> Retrieving content</Loader> :
                <Grid columns={1} centered> 
                    <Grid.Column>
                        <Container>
                            <p align="right">
                                <Button color='blue' onClick={createQualityModelButtonHandler}> 
                                    Create Quality Model 
                                </Button>
                            </p>
                            <Form widths='equal'  onSubmit={filterSubmitHandler}> 
                                <Form.Group>
                                    <Form.Input name="qualityModelsFilter" onChange={filterChangeHandler} label="Filter by name or id"/>
                                    <Form.Input name = "metricsFilter" onChange={filterChangeHandler} label="Filter by Metric's name or id"/>
                                    <Form.Field style={{marginTop: "auto"}}>
                                        <Form.Button color='blue' type='submit' icon>
                                            Filter
                                            <Icon name='filter' />
                                        </Form.Button>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                            { 
                            apiDataProcessed === false ? <Loader active inline='centered'> Retrieving content </Loader>:
                            
                            <Table textAlign="center" celled selectable> 
                                <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                <TableBody baserowpathlink={currpath} data={apiData} tableHeaders = {tableBodyJSONProps}></TableBody>
                                <TablePagination numberOfColumns={tableHeaders.length}/>
                            </Table>   
                            }
                        </Container>
                    </Grid.Column>
                </Grid>
            }
        
        </div>
    )
}

export default ListQualityModelsPage;