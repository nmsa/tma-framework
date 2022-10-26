import { Loader, Divider, Container, Header, Grid, Segment, Form,Table, Button} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import TableHeader from "../../components/tables/TableHeader"
import TableBody from "../../components/tables/TableBody"
import TablePagination from '../../components/tables/TablePagination'
import TreeRender from '../../utils/treeRendering/TreeRender';

function ViewQualityModelPage(){
    const tableHeaders = ["Id","Name"]
    const tableBoodyJSONProps = ["configurationProfileId","profileName"]
    
    const [apiData, setAPIData] = useState(null);
    const qualityModelId = useParams()["id"];

    let navigate = useNavigate();

    function makeAPIRequest(){
        ApiModule().getQualityModelById(qualityModelId, setAPIData)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    function addProfileButtonHandler(){
        console.log(apiData)
        navigate("/createConfigurationProfile",{state: {qm: apiData}})
    }

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center"> Quality Model Details</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            <br/>
            {
                //if apiData is null, then it is because the response from the API hasn't arrived
                apiData === null ? <Loader active inline='centered'> Retrieving content</Loader> :
                <Container>
                    <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column width="16">

                                <Segment>
                                    <Form widths="equal">
                                        <Form.Group>
                                            <Form.Field>
                                                <label>Id:</label>
                                                {apiData["qualityModelId"]}
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Name:</label>
                                                {apiData["modelName"]}
                                            </Form.Field>
                                            {/* uncomment to show quality model's 
                                            "Model Description Reference" and "Business Threshold" attributes
                                            <Form.Field>
                                                <label>Description Reference:</label>
                                                {apiData["modelDescriptionReference"]}
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Business Threshold:</label>
                                                {apiData["businessThreshold"]}
                                            </Form.Field>
                                            */}
                                            <Form.Field>
                                                <label>Metric Id:</label>
                                                {apiData["metric"]["metricId"]}
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Metric Name:</label>
                                                {apiData["metric"]["metricName"]}
                                            </Form.Field>
                                        </Form.Group>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment>
                                    <Header as="h4" textAlign="center"> Metrics tree</Header>
                                    <Divider/>
                                    <TreeRender width={"100%"} height={"50vh"} data={apiData["metric"]}/>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment >
                                    <Grid columns={1}>
                                        <Grid.Column>
                                    <Header as="h4" textAlign="center"> Configuration Profiles associated</Header>
                                    <Divider/>
                                    <p align="right">
                                        <Button color='blue' onClick={addProfileButtonHandler}>Add Profile</Button>
                                    </p>
                                    <Table style = {{marginLeft: "auto", marginRight: "auto"}} 
                                        textAlign="center"    
                                        celled 
                                        selectable
                                        compact
                                    > 
                                        <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                        <TableBody 
                                            rowlinkdata={apiData}
                                            baserowpathlink={"/getConfigurationProfile"} 
                                            data={apiData["configurationProfiles"]} 
                                            tableHeaders = {tableBoodyJSONProps}
                                        />
                                        <TablePagination numberOfColumns={tableHeaders.length}/>
                                    </Table>
                                    </Grid.Column>  
                                    </Grid> 
                                </Segment>
                            </Grid.Column> 
                        </Grid.Row>
                    </Grid>
                </Container>
            }
        
        </div>
    )
}

export default ViewQualityModelPage;