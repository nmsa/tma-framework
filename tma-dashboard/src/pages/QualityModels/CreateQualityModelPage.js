import { Loader, Divider, Container, Header, Grid, Segment, Form, Label} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import DropDownDataFormat from '../../utils/dropDownDataFormat/DropDownDataFormat'
import TreeRender from '../../utils/treeRendering/TreeRender';
import ValidInputs from '../../utils/ValidInputs'
import CustomModal from '../../components/CustomModal';

function CreateQualityModelPage(){

    const [metrics, setMetrics] = useState(null);
    const [formData,setFormData] = useState({});
    const [metricTreeData, setMetricTreeData] = useState(null);

    const [postResponseMessage, setPostResponseMessage] = useState({"openModal": false})

    const [formErrorDisplay, setFormErrorDisplay] = useState(false);

    async function makeAPIRequestMetrics(queryParams){
        let res = await ApiModule().getMetrics(queryParams);
        DropDownDataFormat().convertMetrics(res, setMetrics)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request to retrieve metrics which are available for association with new Quality Models
        makeAPIRequestMetrics({"createQualityModel": "true"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

    //whenever the root metrics is changed, rerender metrics tree
    async function rootMetricChangeHandler(ev, atts){
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData["metricId"] = atts["value"]
        setFormData(newFormData)
        if(atts["value"] !== ""){
            await ApiModule().getMetricById(atts["value"], setMetricTreeData)
    
        }
        else{
            setMetricTreeData(null)
        }
    }

    function validInput(formInputName){
        if(formErrorDisplay){
            if (formInputName === "modelName"){
                if(!ValidInputs().validStringOrDropDownSelection(formData["modelName"])){
                    return { content: 'Please enter a name for the Quality Model', pointing: 'above' }
                }
            }
            else if (formInputName === "modelDescriptionReference"){
                if(!ValidInputs().validIntGreaterOrEqualThanZero(formData["modelDescriptionReference"])){
                    return { content: 'Please enter an integer number >= 0', pointing: 'above' }
                }
            }
            else if (formInputName === "businessThreshold"){
                if(!ValidInputs().validFloatBetweenZeroAndOne(formData["businessThreshold"])){
                    return { content: 'Please enter a float number where  0.0 <= number <= 1.0 ', pointing: 'above' }
                }
            }
            else if (formInputName === "metricId"){
                if(!ValidInputs().validStringOrDropDownSelection(formData["metricId"])){
                    return { content: 'Please choose a metric', pointing: 'above' }
                }
            }
        }
        return null;
    }

    function formFieldInputChangeHandler(ev){
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData[ev.currentTarget.name] = ev.currentTarget.value
        setFormData(newFormData)
    }

    async function submitHandler(ev){
        ev.preventDefault()
        if (ValidInputs().validStringOrDropDownSelection(formData["modelName"])){
            //if(ValidInputs().validIntGreaterOrEqualThanZero(formData["modelDescriptionReference"]))
                //if(ValidInputs().validFloatBetweenZeroAndOne(formData["businessThreshold"]))
                    if(ValidInputs().validStringOrDropDownSelection(formData["metricId"])){
                        //process data into a format acceptable by the API
                        let postData = JSON.parse(JSON.stringify(formData))
                        postData["metric"] = {"metricId": formData["metricId"]}
                        delete postData["metricId"]
                        //contains message and messageType
                        let resData = await ApiModule().createQualityModel(postData)
                        resData["openModal"] = true
                        setPostResponseMessage(resData)
                        return
                    }
        }
        
        setPostResponseMessage(
            {
                messageType: "error",
                message: "Please fill in all the required fields (marked with  * ) and respect the fields notes",
                openModal: true
            }
        )

        setFormErrorDisplay(true)
    }
    
    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center"> Create Quality Model</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            <br/>
            {
                //if apiData is null, then it is because the response from the API hasn't arrived
                metrics === null ? <Loader active inline='centered'> Retrieving content</Loader> :
                <div>
                    <Container>
                            <Segment>
                                <Form>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <Form.Input fluid required
                                                name="modelName"
                                                label='Name'
                                                onChange={formFieldInputChangeHandler}
                                                error={validInput("modelName")}
                                            />
                                        </Form.Field>
                                        {/* uncomment to add model Description Reference and businessThreshold
                                        <Form.Field>
                                            <Form.Input fluid required
                                                name="modelDescriptionReference" 
                                                label='modelDescriptionReference' 
                                                onChange={formFieldInputChangeHandler}
                                                error={validInput("modelDescriptionReference")}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input fluid required step="0.01" 
                                                name="businessThreshold" 
                                                label='businessThreshold' 
                                                onChange={formFieldInputChangeHandler}
                                                error={validInput("businessThreshold")}
                                            />
                                        </Form.Field>
                                        */}
                                        <Form.Dropdown
                                            selectOnBlur={false}
                                            selectOnNavigation={false}
                                            required
                                            clearable
                                            search
                                            selection
                                            options={metrics}
                                            placeholder='Filter metrics by something'
                                            label='Associate Metric'
                                            onChange={rootMetricChangeHandler}
                                            name="metricId"
                                            error={validInput("metricId")}
                                        />
                                        <Form.Button color="grey" circular type='submit' floated="right" onClick={submitHandler}> 
                                            Create Quality Model
                                        </Form.Button>
                                    </Form.Group>
                                </Form>
                                <Divider section horizontal>
                                    <Header as="h3" textAlign="center"> Preview metrics tree</Header>
                                </Divider>
                                {metricTreeData !== null ?
                                <TreeRender width={"100%"} height={"50vh"} data={metricTreeData}/>
                                : 
                                <Label active ribbon as='b' color='grey'>
                                    <Header as="h3"> Warning! </Header> 
                                    Metrics tree will only be displayed once a metric is chosen
                                </Label>
                                }
                            </Segment>
                    </Container>
                    <CustomModal 
                        successPath="/getQualityModels" 
                        modalInfo={postResponseMessage} 
                    />
                </div>
            }
        
        </div>
    )
}

export default CreateQualityModelPage