import { Loader, Divider, Container, Header, Grid, Segment, Form, Icon} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import TreeRender from '../../utils/treeRendering/TreeRender';

function ViewMetricPage(){
    
    const [apiData, setAPIData] = useState(null);
    const metricId = useParams()["id"];

    const leafAggregationOptions = {
        0: "Average",
        1: "Minimum",
        2: "Maximum",
        3: "Sum"
    }

    const leafNormalizationKindOptions = {
        0: "BENEFIT",
        1: "COST",
        2: "Maximum",
        3: "Sum"
    }

    const metricAggregationOptions = {
        0: "Neutrality",
        1: "Simultaneity",
        2: "Replaceability",
    }

    function makeAPIRequest(){
        ApiModule().getMetricById(metricId, setAPIData)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    useEffect(()=>{
        console.log(apiData)
    },[apiData])

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center"> Metric Details</Header> 
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
                    <Grid.Column>
                        <Segment>
                            <Header as="h3" textAlign="center"> Metric Information</Header>
                            <Divider/>
                            <Form widths="equal">
                                <Form.Group >
                                    <Form.Field>
                                        <label>Id:</label>
                                        {apiData["metricId"]}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Name:</label>
                                        {apiData["metricName"]}
                                    </Form.Field>
                                    {/* uncomment to show Metric's "Block level" attribute
                                    <Form.Field>
                                        <label>Block Level:</label>
                                        {apiData["blockLevel"]}
                                    </Form.Field>
                                    */}
                                    <Form.Field>
                                        <label>Leaf Attribute:</label>
                                        {
                                            apiData["leafAttribute"] === null ?
                                            <Icon 
                                                color='red' 
                                                size='big' 
                                                name='remove' 
                                            />
                                            :   
                                            <Icon
                                                color='green' 
                                                size='big'
                                                name='checkmark' 
                                            />
                                        }
                                    </Form.Field>
                                    {apiData["leafAttribute"] === null ? 
                                    <Form.Field>
                                        <label>Attribute Aggregation Operator:</label>
                                        { metricAggregationOptions[apiData["attributeAggregationOperator"]]}
                                    </Form.Field>
                                    :
                                    null
                                    }
                                </Form.Group>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    {apiData["leafAttribute"] === null ?
                    <Grid.Column>
                        <Segment>
                            <Header as="h3" textAlign="center"> Metrics tree</Header>
                            <Divider/>
                            <TreeRender width={"100%"} height={"50vh"} data={apiData}/>
                        </Segment>
                    </Grid.Column>
                    :   
                    <Grid.Column>
                        <Segment>
                            <Header as="h3" textAlign="center"> Leaf Attribute information</Header>
                            <Divider/>
                            <Form widths="equal">
                                <Form.Group>
                                    <Form.Field>
                                        <label>Description:</label>
                                        {
                                            "[id = " + apiData["leafAttribute"]["description"]["descriptionId"] + "] " + 
                                            apiData["leafAttribute"]["description"]["descriptionName"] + " (" + 
                                            apiData["leafAttribute"]["description"]["unit"] + ")"
                                        }
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Metric Aggregation Operator:</label>
                                        {leafAggregationOptions[apiData["leafAttribute"]["metricAggregationOperator"]]}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Number of Samples:</label>
                                        {apiData["leafAttribute"]["numSamples"]}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Normalization Method:</label>
                                        {apiData["leafAttribute"]["normalizationMethod"]}
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field>
                                        <label>Normalization Kind:</label>
                                        {leafNormalizationKindOptions[apiData["leafAttribute"]["normalizationKind"]]}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Minimum Threshold:</label>
                                        {apiData["leafAttribute"]["minimumThreshold"]}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Maximum Threshold:</label>
                                        {apiData["leafAttribute"]["maximumThreshold"]}
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    }
                </Grid>
            </Container>
            }
        
        </div>
    )
}

export default ViewMetricPage;