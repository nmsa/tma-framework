import { Loader, Divider, Label, Header, Grid, Form, Container, Segment, Message} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import React, {useState, useEffect} from "react"
import TreeRender from '../../utils/treeRendering/TreeRender';
import TreeRenderFunctionsUtils from '../../utils/treeRendering/TreeRenderFunctionsUtils';
import DropDownDataFormat from '../../utils/dropDownDataFormat/DropDownDataFormat';
import ValidInputs from '../../utils/ValidInputs'
import CustomModal from '../../components/CustomModal';

function CreateMetricPage(props){
    //============================================= VARIABLES DECLARATIONS ============================================//

    //variables used to control the pre-load of the descriptions and metrics
    const [descriptions, setDescriptions] = useState(null);
    const [metrics, setMetrics] = useState(null);

    const leafAggregationOptions = [
        {
            key: 0, value: 0, text: "Average"
        },
        {
            key: 1, value: 1, text: "Minimum"
        },
        {
            key: 2, value: 2, text: "Maximum"
        },
        {
            key: 3, value: 3, text: "Sum"
        }
    ]

    const leafNormalizationMethodOptions = [
        {
            key: 0, value: "MIN-MAX", text: "MIN-MAX"
        },
    ]

    const leafNormalizationKindOptions = [
        {
            key: 0, value: 0, text: "BENEFIT"
        },
        {
            key: 1, value: 1, text: "COST"
        },
    ]

    const metricAggregationOptions = [
        {
            key: 0, value: 0, text: "Neutrality"
        },
        {
            key: 1, value: 1, text: "Simultaneity"
        },
        {
            key: 2, value: 2, text: "Replaceability"
        },
    ]

    //variables used to save and get form data. "metricToCreate" also used for rendering preview metric tree
    const [metricToCreate, setMetricToCreate] = useState(
        {
            //variable for adjusting preview metric tree with currently selected childs
            "valid": false,
            //only required for the metrics tree rendering
            "metricId": -1,
            "metricName": "",
            "childMetrics": [],
            "attributeAggregationOperator": "",
            "metricAggregationOperator": "",
            "numSamples": null,
            "normalizationMethod": "",
            "normalizationKind": "",
            "minimumThreshold": null,
            "maximumThreshold": null,
            "descriptionId" : ""
        }
    );

    //Variable use to toggle different views on the form fields depending of the choice of creatint or not a Leaf Metric
    const[leafAttribute, setLeafAttribute] = useState(false);

    const [formErrorDisplay, setFormErrorDisplay] = useState(false);

    const [postResponseMessage, setPostResponseMessage] = useState({"openModal": false})

    //=========================================== PRE-LOAD OF DESCRIPTIONS AND METRICS ========================================//
    
    async function preLoadData(){
        let unprocessedDescriptions = await makeAPIRequestDescriptions(null);
        let unprocessedMetrics = await makeAPIRequestMetrics(null);
        DropDownDataFormat().convertMetrics(unprocessedMetrics, setMetrics)
        DropDownDataFormat().convertDescriptions(unprocessedDescriptions, setDescriptions)
    }
    //Execute API REQUESTS to pre-load necessary data upon component rendering
    useEffect(() => {
        preLoadData()
    },[]);

    //functions for performing api requests to retrieve data necessary before being able to interact with the page
    //[TODO ?] - Leverage these functions for making some kind of pagination by not retrieving all the contents from
    //         the database for each entity.
    function makeAPIRequestDescriptions(queryParams){
        return ApiModule().getDescriptions(queryParams);
    }

    function makeAPIRequestMetrics(queryParams){
        return ApiModule().getMetrics(queryParams);
    }
    
    //============================================= HANDLERS ============================================//

    //toggle different form fields depending of being or not a leaf metric 
    function leafAttributeToggleHandler(){
        let metricToCreateTemp = JSON.parse(JSON.stringify(metricToCreate))
        //transiting to leaf attribute form from metric childs association form
        if(!leafAttribute){
            metricToCreateTemp.attributeAggregationOperator = ""
            metricToCreateTemp["childMetrics"] = []
            metricToCreateTemp.valid = true
            setMetricToCreate(metricToCreateTemp)
        }
        //going from leaf attribue form to metric child association form
        else{
            metricToCreateTemp.childMetrics = []
            metricToCreateTemp.metricAggregationOperator =  ""
            metricToCreateTemp.numSamples = null
            metricToCreateTemp.normalizationMethod = ""
            metricToCreateTemp.normalizationKind =  ""
            metricToCreateTemp.minimumThreshold = null
            metricToCreateTemp.maximumThreshold = null
            setMetricToCreate(metricToCreateTemp)
        }
        setLeafAttribute(!leafAttribute);
    }

    //whenever the list of child metrics is changed, it becomes necessary to check validity because a descendant metric 
    //might become repeated
    async function childMetricsChangeHandler(ev, atts){
        //get current selected metrics, represented by their ids
        let childMetricsIds = atts["value"]

        //auxiliar variable and function to help retrieving each selected metric's childs 
        let aux
        const setAux = (tempMetric) => {aux = tempMetric}

        //hold currently selected child metrics data to later replace the old array  
        let childMetrics = []
        for(let metricId of childMetricsIds){
            //wait for response
            await ApiModule().getMetricById(metricId, setAux)
            childMetrics.push(aux)   
        }

        //check if there are repeated descendant nodes with currently selected childs
        if(TreeRenderFunctionsUtils().validChildMetrics(childMetrics)){
            setMetricToCreate({...metricToCreate, "childMetrics": childMetrics,"valid": true})
        }
        else{
            setMetricToCreate({...metricToCreate, "childMetrics": childMetrics,"valid": false})
        }
    }
    
    //Form submit verifications
    async function submitHandler(ev){
        ev.preventDefault()

        //valid current formData depending on being a leaf attribute or not
        if(leafAttribute){
            if (ValidInputs().validStringOrDropDownSelection(metricToCreate["metricName"])){
                    if(ValidInputs().validStringOrDropDownSelection(metricToCreate["descriptionId"]))
                        if(ValidInputs().validStringOrDropDownSelection(metricToCreate["metricAggregationOperator"]))
                            if(ValidInputs().validIntGreaterOrEqualThanZero(metricToCreate["numSamples"]))
                                if(ValidInputs().validStringOrDropDownSelection(metricToCreate["normalizationMethod"]))
                                    if(ValidInputs().validStringOrDropDownSelection(metricToCreate["normalizationKind"]))
                                        if(ValidInputs().validFloat(metricToCreate["minimumThreshold"]))
                                            if(ValidInputs().validFloat(metricToCreate["maximumThreshold"])){
                                                //process data into a format acceptable by the API
                                                let postData =
                                                    {
                                                        "metricName" : metricToCreate["metricName"],
                                                        "childMetrics": metricToCreate["childMetrics"],
                                                        "leafAttribute": 
                                                            {
                                                                "metricAggregationOperator": metricToCreate["metricAggregationOperator"],
                                                                "numSamples": metricToCreate["numSamples"],
                                                                "normalizationMethod": metricToCreate["normalizationMethod"],
                                                                "normalizationKind": metricToCreate["normalizationKind"],
                                                                "minimumThreshold": metricToCreate["minimumThreshold"],
                                                                "maximumThreshold": metricToCreate["maximumThreshold"],
                                                                "description": 
                                                                    {
                                                                        "descriptionId" : metricToCreate["descriptionId"]
                                                                    }
                                                            }
                                                    }
                                                
                                                //contains message and messageType
                                                let resData = await ApiModule().createMetric(postData)
                                                resData["openModal"] = true
                                                setPostResponseMessage(resData)
                                                return
                                            }
            }
        }
        else{
            if (ValidInputs().validStringOrDropDownSelection(metricToCreate["metricName"])){
                if (ValidInputs().validStringOrDropDownSelection(metricToCreate["attributeAggregationOperator"]))
                    if (ValidInputs().validDropDownMultipleSelection(metricToCreate["childMetrics"]))
                        if(metricToCreate.valid){
                            let postData =
                            {
                                "metricName" : metricToCreate["metricName"],
                                "childMetrics": metricToCreate["childMetrics"],
                                "attributeAggregationOperator": metricToCreate["attributeAggregationOperator"]
                            }
                            //contains message and messageType
                            let resData = await ApiModule().createMetric(postData)
                            resData["openModal"] = true
                            setPostResponseMessage(resData)
                            return
                        }
                        else{
                            setPostResponseMessage(
                                {
                                    messageType: "error",
                                    message: "Currently selected child metrics are not valid because, at least, " +
                                    "one of the descendant nodes gets repeated",
                                    openModal: true
                                }
                            )
                            return
                        }
            }
        }
        
        //When form fields aren't valid 
        setPostResponseMessage(
            {
                messageType: "error",
                message: "Please fill in all the required fields (marked with  * ) and respect the fields notes",
                openModal: true
            }
        )
        setFormErrorDisplay(true)
        
    }

    function formFieldInputChangeHandler(ev,atts){
        let newFormData = JSON.parse(JSON.stringify(metricToCreate))
        newFormData[atts.name] = atts.value
        setMetricToCreate(newFormData)
    }
    
    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center">Create Metric</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            {metrics === null || descriptions === null ?
            <div>
                <Loader active inline='centered'> Retrieving content </Loader>
                <br/>
            </div>
            :
            <Container >
                <Segment>
                    <Form widths="equal">  
                        <Form.Group >
                            <Form.Input required
                                name="metricName"  
                                label='Metric name'
                                onChange={formFieldInputChangeHandler}
                                error={
                                    formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(metricToCreate.metricName) ?
                                    { content: 'Please enter a name for the Metric', pointing: 'above' }
                                    :
                                    null
                                }
                            />
                            <Form.Button color="grey" circular type='submit' floated="right" onClick={submitHandler}> 
                                Create Metric
                            </Form.Button>
                        </Form.Group>
                        <Form.Checkbox onClick={leafAttributeToggleHandler} toggle label="Leaf Attribute?"/>
                        { leafAttribute ? 
                        <div>
                            <Form.Group>
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    required
                                    clearable
                                    search
                                    selection
                                    options={descriptions}
                                    placeholder='Filter descriptions by something'
                                    label='Associate Description'
                                    onChange={formFieldInputChangeHandler}
                                    name="descriptionId"
                                    error={
                                        formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(metricToCreate.descriptionId) ?
                                        { content: 'Please choose a description', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    required
                                    clearable
                                    selection
                                    options={leafAggregationOptions}
                                    label='Metric Aggregation Operator'
                                    onChange={formFieldInputChangeHandler}
                                    name="metricAggregationOperator"
                                    error={
                                        formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(metricToCreate.metricAggregationOperator) ?
                                        { content: 'Please select an aggregation operator', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    required
                                    clearable
                                    selection
                                    options={leafNormalizationMethodOptions}
                                    label='Normalization Method'
                                    onChange={formFieldInputChangeHandler}
                                    name="normalizationMethod"
                                    error={
                                        formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(metricToCreate.normalizationMethod) ?
                                        { content: 'Please select a normalization method', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    required
                                    clearable
                                    selection
                                    options={leafNormalizationKindOptions}
                                    label='Normalization Kind'
                                    onChange={formFieldInputChangeHandler}
                                    name="normalizationKind"
                                    error={
                                        formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(metricToCreate.normalizationKind) ?
                                        { content: 'Please select a normalization kind', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input required 
                                    name="numSamples"
                                    label='Number of Samples'
                                    onChange={formFieldInputChangeHandler}
                                    error={
                                        formErrorDisplay && !ValidInputs().validIntGreaterThanZero(metricToCreate.numSamples) ?
                                        { content: 'Please enter an integer number > 0', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Input  required
                                    name="minimumThreshold"
                                    label='Minimum Threshold'
                                    onChange={formFieldInputChangeHandler}
                                    error={
                                        formErrorDisplay && !ValidInputs().validFloat(metricToCreate.minimumThreshold) ?
                                        { content: 'Please enter a float number like 2.33', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Input required 
                                    name="maximumThreshold"
                                    label='Maximum Threshold' 
                                    onChange={formFieldInputChangeHandler}
                                    error={
                                        formErrorDisplay && !ValidInputs().validFloat(metricToCreate.maximumThreshold) ?
                                        { content: 'Please enter a float number like 2.33', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                            </Form.Group>
                            
                        </div>
                        : 
                        <div>
                            <Divider section horizontal>
                                <Header as="h3" textAlign="center"> Associate child metrics and preview metric tree</Header> 
                            </Divider>
                            <Form.Group>
                                <Form.Dropdown
                                    onChange={childMetricsChangeHandler}
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    required
                                    clearable
                                    search
                                    selection
                                    multiple
                                    options={metrics}
                                    placeholder='Filter metrics by something'
                                    label='Associate child metrics'
                                    name="childMetrics"
                                    error={
                                        formErrorDisplay && !ValidInputs().validDropDownMultipleSelection(metricToCreate.childMetrics) ?
                                        { content: 'Please choose, at least, one child metric', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    required
                                    clearable
                                    selection
                                    options={metricAggregationOptions}
                                    label='Attribute Aggregation Operator'
                                    onChange={formFieldInputChangeHandler}
                                    name="attributeAggregationOperator"
                                    error={
                                        formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(metricToCreate.attributeAggregationOperator) ?
                                        { content: 'Please select an attribute aggregation operator', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                            </Form.Group>
                            { metricToCreate["metricName"] === "" || metricToCreate.childMetrics.length === 0 ?
                            <Label ribbon as='b' color='grey'>
                                <Header as="h3"> Warning! </Header> 
                                Metric tree will only be displayed once a name is given for the metric and, at least, one 
                                child metric is selected
                            </Label>
                            : metricToCreate.valid ?
                            <TreeRender width={"100%"} height={"50vh"} data={metricToCreate}></TreeRender>
                            :
                            <Message negative>
                                <Message.Header>Can't generate metric tree</Message.Header>
                                <p>At least one of the descendant metrics is repeated with the 
                                    current list of chosen child metrics</p>
                            </Message>
                            } 
                        </div>
                        }
                    </Form>
                </Segment>
                <CustomModal 
                    successPath="/getMetrics" 
                    modalInfo={postResponseMessage} 
                />
            </Container>
            }
        </div>
    )
}

export default CreateMetricPage;