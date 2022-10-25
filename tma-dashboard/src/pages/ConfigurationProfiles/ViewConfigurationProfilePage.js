import {Divider, Label, Header, Grid, Form, Container, Segment, Table,Loader} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import React, {useState, useEffect} from "react"
import {useLocation,useParams} from "react-router-dom"
import TreeRender from '../../utils/treeRendering/TreeRender';
import TableHeader from "../../components/tables/TableHeader"

function ViewConfigurationProfilePage(props){
    const configurationProfileId = useParams()["id"];
    const tableHeaders = [
        "metricName", 
        "weight"
    ]
    // add "threshold" above to visualize a node's threshold attribute

    //configurationProfile data received from API
    const [configurationProfile,setConfigurationProfile] = useState(null)

    //read quality model from passed variable
    const qualityModelData = useLocation()["state"]["data"]
    
    function makeAPIRequest(){
        ApiModule().getConfigurationProfileById(configurationProfileId, setConfigurationProfile)
    }

    useEffect(()=>{
        //perform API request
        makeAPIRequest()
    },[])
    
    //from quality model's tree of metrics, find all the metric nodes and their names and ids, to later construct the form
    function getMetricsList(metric, listOfMetrics){
        listOfMetrics.push(
            {
                "metricName": metric["metricName"],
                "metricId": metric["metricId"]
            })
        for(let child of metric["childMetrics"]){
            getMetricsList(child,listOfMetrics)
        }
    }

    function generateCustomTableBody(){
        let listOfMetrics = []
        getMetricsList(qualityModelData["metric"], listOfMetrics);
        let uniqueId = -4;
        return (
            <Table.Body>
                {
                    listOfMetrics.map((metric) => 
                        {
                            uniqueId = uniqueId+4
                            return generateCustomTableRow(metric,uniqueId); 
                        }
                    )
                }
            </Table.Body>
        )
    }

    function generateCustomTableRow(metric,uniqueId){
        let preference = configurationProfile.preferences.find(preference => preference.metricId === metric.metricId)
        return(
            <Table.Row key={uniqueId++}>
                <Table.Cell key={uniqueId++}>
                    {metric["metricName"]}
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    <Form.Field>
                        {preference.weight}
                    </Form.Field>
                </Table.Cell>
                {/* uncomment to visualize a node's threshold attribute
                <Table.Cell key={uniqueId++}>
                    <Form.Field>
                        {preference.threshold}
                    </Form.Field>
                </Table.Cell>
                */}
            </Table.Row>
        )
    }

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center">Configuration Profile Details</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            {configurationProfile !== null ?
                <Container>
                    <Grid stackable columns={2}>
                        <Grid.Column>
                            <Segment>
                                <Header as="h3" textAlign="center"> Quality Model information</Header>
                                <Divider/>
                                <Form widths='equal'>
                                    <Form.Group >
                                        <Form.Field>
                                            <label>Id:</label>
                                            {qualityModelData["qualityModelId"]}
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Name:</label>
                                            {qualityModelData["modelName"]}
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Segment>
                            <Segment>
                                <Header as="h3" textAlign="center"> Weighted metrics tree</Header>
                                <Divider/>
                                <TreeRender width={"100%"} height={"50vh"} 
                                    preferences={configurationProfile.preferences}
                                    data={qualityModelData["metric"]} 
                                    configurationProfile={true}
                                />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as="h3" textAlign="center"> Configuration Profile information</Header>
                                <Divider/>
                                <Form>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>Id:</label>
                                            {configurationProfile["configurationProfileId"]}   
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Name:</label>
                                            {configurationProfile["profileName"]}   
                                        </Form.Field>
                                    </Form.Group>
                                    <Divider section horizontal>
                                        <Header as="h5" textAlign="center">Metrics weigths 
                                        {/*uncomment to visualize thresholds
                                            and thresholds
                                        */}
                                        </Header>     
                                    </Divider>
                                    <Table  
                                    style = {{marginLeft: "auto", marginRight: "auto"}} 
                                    textAlign="center" 
                                    compact   
                                    celled 
                                    selectable> 
                                        <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                        {generateCustomTableBody()}
                                    </Table> 
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>  
                </Container>
                :<Loader active inline='centered'> Retrieving content </Loader>
            }
        </div>
    )
}

export default ViewConfigurationProfilePage;