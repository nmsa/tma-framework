import { Loader, Divider, Step, Header, Table, Grid, Form, Container, Segment, Icon, Button} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import DropDownDataFormat from '../../utils/dropDownDataFormat/DropDownDataFormat';
import ValidInputs from '../../utils/ValidInputs';
import TreeRender from '../../utils/treeRendering/TreeRender';
import TableHeader from "../../components/tables/TableHeader"
import CustomModal from '../../components/CustomModal';

function ViewRulePage(props){
    //====================== RENDER PURPOSE variables ==================================
    const [step, setStep] = useState(1);

    //====================== GENERAL variables ==================================
    const [formErrorDisplay, setFormErrorDisplay] = useState(false);
    const [formData, setFormData] = useState(
        {
            resourceId: null,
            ruleName: null,
            metricId: "",
            operator: "",
            activationThreshold: "",
            actionList: []
        }
    );
    
    //====================== STEP 1 variables ==================================
    const [activeResources, setActiveResources] = useState(null);

    //====================== STEP 2 variables ==================================
    const [configurationProfile, setConfigurationProfile] = useState(null);
    const [qualityModel, setQualityModel] = useState(null);
    const [listOfMetrics, setListOfMetrics] = useState(null);
    const ruleConditionOperatorOptions = [
        {
            key: 0, value: "<", text: "<"
        },
        {
            key: 1, value: ">", text: ">"
        },
        {
            key: 2, value: ">=", text: ">="
        },
        {
            key: 3, value: "<=", text: "<="
        },
        {
            key: 4, value: "==", text: "=="
        },
        {
            key: 5, value: "!=", text: "!="
        }
    ]

    //====================== STEP 3 variables ==================================
    const [listOfActions, setListOfActions] = useState(null);
    const [listOfActionsDropDown, setListOfActionsDropDown] = useState(null);
    const [tempActionChosen, setTempActionChosen] = useState(null);

    const tableHeadersActionList = ["Execution Order","Action Id","Action Name", "Options"]
    const tableHeadersConfigurationList = ["Action Id","Key Name", "Value"]

    const [createRuleResponseMessage, setCreateRuleResponseMessage] = useState({"openModal": false})
    //============================== GENERAL FUNCTIONS ============================================/
    
    function choseStepRender(){
        switch(step){
            case 1:
                return step1();
            case 2:
                return step2();
            case 3:
                return step3();
            default:
                return <h1>ERROR!!!!!!!! SOMETHING WENT WRONG!</h1>
        }
    }

    function formDataOnChangeHandler(ev, props){
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData[props.name] = props.value
        setFormData(newFormData)
    }
    
    //============================== STEP 1 RELATED FUNCTIONS ============================================/
    useEffect(()=>{
        async function makeAPIRequest(){
            let queryParams = {
                createRule: "true"
            }
            let unprocessedResources = await ApiModule().getActiveResources(queryParams);
            DropDownDataFormat().convertResources(unprocessedResources,setActiveResources)
        }
        makeAPIRequest()
    },[])

    async function submitStep1Handler(ev){
        ev.preventDefault()
        if (ValidInputs().validStringOrDropDownSelection(formData.resourceId)){
            //remore error appearance on next step, using this same variable used on step 1 to control error messages display
            setFormErrorDisplay(false)
            //request render of step 2
            setStep(2)
            //get Resource Weights And Metrics Tree by performing synchronous request to the api
            let res = await ApiModule().getResourceWeightsAndMetricsTree(formData.resourceId)
            setConfigurationProfile(res.configurationProfile)
            setQualityModel(res.qualityModel)
            
            //get list of metrics and convert it to dropdown format
            let queryParams = {leafAttributes: false}
            res = await ApiModule().getConfigurationProfileListOfMetrics(res.configurationProfile.configurationProfileId, queryParams)
            DropDownDataFormat().convertMetrics(res,setListOfMetrics)
        }
        else{
            //enable error display
            setFormErrorDisplay(true)
        }
    }

    function backToStep1Clean(){
        let newFormData = {
            resourceId: formData.resourceId,
            ruleName: null,
            metricId: "",
            operator: "",
            activationThreshold: "",
            actionList: []
        }
        setFormData(newFormData)
        setFormErrorDisplay(false)
    }

    function step1(){
        return ( 
            <div>
                {activeResources === null ?
                    <Loader active inline='centered'> Retrieving content </Loader>
                :
                    <Segment compact style={{marginLeft: "auto", marginRight: "auto"}}>
                        <Form>
                            <Form.Group grouped>
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    defaultValue={formData.resourceId !== null ? formData.resourceId : null}
                                    required
                                    clearable
                                    search
                                    selection
                                    options={activeResources}
                                    placeholder='Filter active resources by something'
                                    label='Choose an active Resource'
                                    name="resourceId"
                                    onChange={formDataOnChangeHandler}
                                    error = {
                                        (formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(formData.resourceId)) ? 
                                            { content: 'Please choose a Resource', pointing: 'above' } 
                                        : 
                                            null
                                    }  
                                />
                                <Form.Button color="blue" floated='right' circular type='submit' onClick={submitStep1Handler}> 
                                    Confirm
                                </Form.Button>
                            </Form.Group>
                        </Form>
                    </Segment>
                }
            </div>
        )
    }

    //============================== STEP 2 RELATED FUNCTIONS ============================================/

    async function submitStep2Handler(ev){
        ev.preventDefault()

        if (ValidInputs().validStringOrDropDownSelection(formData.ruleName))
            if (ValidInputs().validStringOrDropDownSelection(formData.metricId))
                if (ValidInputs().validStringOrDropDownSelection(formData.operator))
                    if (ValidInputs().validFloatBetweenZeroAndOne(formData.activationThreshold)){
                        //remore error appearance on next step, using this same variable used 
                        //on step 1 to control error messages display
                        setFormErrorDisplay(false)
                        //request render of step 3
                        setStep(3)
                        let queryParams = {
                            resourceId: formData.resourceId
                        }
                        //get List of Actions and their configurations
                        let res = await ApiModule().getActionsAndConfigsByResource(queryParams)
                        setListOfActions(res.actions)
                        
                        //convert actions into dropdown format
                        DropDownDataFormat().convertActions(res.actions,setListOfActionsDropDown)
                        return
                    }
        
        //enable error display
        setFormErrorDisplay(true)
    }
    
    function backToStep2Clean(){
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData.actionList = []
        setFormData(newFormData)
        setFormErrorDisplay(false)
    }

    function step2(){
        return( 
        <div>
        {listOfMetrics !== null ?
            <Grid stackable columns={2}>
                <Grid.Column>
                    <Segment>
                        <Header as="h3" textAlign="center"> Weighted metrics tree</Header>
                        <Divider/>
                        <TreeRender width={"100%"} height={"50vh"} 
                            preferences={configurationProfile.preferences}
                            data={qualityModel["metric"]} 
                            configurationProfile={true}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment style={{marginLeft: "auto", marginRight: "auto"}}>
                        <Form widths='equal'>
                            <Form.Group>
                                <Form.Input required
                                    defaultValue = {formData.ruleName}
                                    name="ruleName"  
                                    label='Rule name'
                                    onChange={formDataOnChangeHandler}
                                    error={
                                        formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(formData.ruleName) ?
                                        { content: 'Please enter a name for the Rule', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    defaultValue={formData.metricId !== null ? formData.metricId : null}
                                    required
                                    clearable
                                    search
                                    selection
                                    options={listOfMetrics}
                                    placeholder='Filter metrics by something'
                                    label='Metric to apply the rule'
                                    name="metricId"
                                    onChange={formDataOnChangeHandler}
                                    error = {
                                        (formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(formData.metricId)) ? 
                                            { content: 'Please choose a Metric on which the rule will be applied', pointing: 'above' } 
                                        : 
                                            null
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Dropdown
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                    defaultValue={formData.operator !== null ? formData.operator : null}
                                    required
                                    clearable
                                    selection
                                    options={ruleConditionOperatorOptions}
                                    label='Condition Operator'
                                    name="operator"
                                    onChange={formDataOnChangeHandler}
                                    error = {
                                        (formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(formData.operator)) ? 
                                            { content: 'Please choose an operator for the rule condition', pointing: 'above' } 
                                        : 
                                            null
                                    }
                                />
                                <Form.Input required
                                    defaultValue = {formData.activationThreshold}
                                    name="activationThreshold"  
                                    label='Condition activation threshold'
                                    onChange={formDataOnChangeHandler}
                                    error={
                                        formErrorDisplay && !ValidInputs().validFloatBetweenZeroAndOne(formData.activationThreshold) ?
                                        { content: 'Please enter an activation threshold between 0 and 1 as a float number (p.e. 0.33)', pointing: 'above' }
                                        :
                                        null
                                    }
                                />
                            </Form.Group>
                            <Divider horizontal section>
                                <Header as="h5" textAlign="center"> 
                                    Rule condition Preview
                                    <Icon name='arrow down' />
                                </Header>
                            </Divider>
                            <Container>
                                <Segment compact style={{margin: "auto"}}>
                                    <code style={{whiteSpace: "pre-wrap", color: "#0057b3"}}>
                                        {`resourceId == ${formData.resourceId} && score.get(${formData.metricId}) ${formData.operator} ${formData.activationThreshold}`}
                                    </code>
                                </Segment>
                            </Container>
                            <Form.Group>
                                <Form.Button color="blue" floated='right' circular type='submit' onClick={submitStep2Handler}> 
                                    Confirm
                                </Form.Button>
                            </Form.Group>
                        </Form>
                    </Segment> 
                </Grid.Column>
            </Grid>
        :
            <Loader active inline='centered'> Retrieving content </Loader>
        }
        </div>)
    }

    //============================== STEP 3 RELATED FUNCTIONS ============================================/
    
    function step3AddActionHandler(ev, atts){
        ev.preventDefault();
        ev.stopPropagation();

        //due to what gets saved on "tempActionChosen" and the selected state on the dropdown, this verification becomes
        //mandatory to keep coherence, because there may be times where it is tried to add to the list something that's already there
        if(formData.actionList.filter((action) => action.actionId === tempActionChosen).length > 0){
            return
        }

        //set added action as chosen on the dropwdown list so it doesnt appear on the list again 
        let newActionDropDownList = JSON.parse(JSON.stringify(listOfActionsDropDown))
        newActionDropDownList.filter((actionDropDown) => actionDropDown.value === tempActionChosen)[0].chosen = "true"
        
        
        //add the action object to adaptation plan
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData.actionList.push(listOfActions.filter((action) => action.actionId === tempActionChosen)[0])
        
        //update state variables so that rerender is triggered
        setFormData(newFormData)
        setListOfActionsDropDown(newActionDropDownList)
    }

    function removeActionFromPlanHandler(ev, atts){
        setListOfActionsDropDown((prevList) => {
            //set removed action as not chosen on the dropwdown list so it reappears on the list 
            let newActionDropDownList = JSON.parse(JSON.stringify(prevList))
            let itemToRemove = newActionDropDownList.filter((actionDropDown) => actionDropDown.value === atts.actionid)[0]
            itemToRemove.chosen = "false"
            return newActionDropDownList
        
        })
        setFormData((prevData) => {
            //remove the action object from the adaptation plan
            let newFormData = JSON.parse(JSON.stringify(prevData))
            newFormData.actionList.splice(atts.index,1)
            return newFormData
        })
    }

    function increaseActionPriorityHandler(ev, atts){
        //to increase an action's priority, it has to switch with the previous array index
        let newFormData = JSON.parse(JSON.stringify(formData))

        let prevItem = newFormData.actionList[atts.index -1]
        newFormData.actionList[atts.index -1] = newFormData.actionList[atts.index]
        newFormData.actionList[atts.index] = prevItem
        
        setFormData(newFormData)
    }

    function decreaseActionPriorityHandler(ev, atts){
        //to decrease an action's priority, it has to switch with the next array index
        let newFormData = JSON.parse(JSON.stringify(formData))

        let nextItem = newFormData.actionList[atts.index +1]
        newFormData.actionList[atts.index +1] = newFormData.actionList[atts.index]
        newFormData.actionList[atts.index] = nextItem
        
        setFormData(newFormData)
    }

    function configurationDataHandler(ev, atts){
        ev.preventDefault();
        ev.stopPropagation();
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData.actionList[atts.actionindex].configurations[atts.configurationindex].value = atts.value
        setFormData(newFormData)
    }
        
    async function createRuleHandler(ev){
        ev.preventDefault()

        let valid = true;

        //list of plan actions has to be at least 1
        if (formData.actionList.length > 0){
            for(let i=0; i < formData.actionList.length && valid === true; i++){
                if(formData.actionList[i].configurations !== null){
                    //plan actions which have configurations need to have a value
                    for(let j=0; j < formData.actionList[i].configurations.length; j++){
                        if(!formData.actionList[i].configurations[j].hasOwnProperty("value")  
                            || !ValidInputs().validStringOrDropDownSelection(formData.actionList[i].configurations[j].value)){
                            valid = false
                            break;
                        }
                    }
                }
            }
        }
        else{
            valid = false
        }

        if(valid){
            //remore error appearance
            setFormErrorDisplay(false)

            //get List of Actions and their configurations
            let resData = await ApiModule().createRule(formData)
            resData["openModal"] = true
            setCreateRuleResponseMessage(resData)
            return
        }
             
        //enable error display
        setFormErrorDisplay(true)
    }

    function generateActionListCustomTableBodyStep3(){
        let renderListToReturn = []
        let uniqueId = 0;
        for(let i=0; i < formData.actionList.length; i++){
            renderListToReturn.push(
                <Table.Row key={uniqueId} >
                    <Table.Cell >
                        {i + 1}
                    </Table.Cell>
                    <Table.Cell >
                        {formData.actionList[i].actionId}
                    </Table.Cell>
                    <Table.Cell >
                        {formData.actionList[i].actionName}
                    </Table.Cell>
                    <Table.Cell>
                        { i === 0 ? null :
                        <Button icon color='blue' index={i} onClick={increaseActionPriorityHandler}>
                            <Icon name='angle double up' />
                        </Button>
                        }
                        { i === formData.actionList.length -1 ? null :
                        <Button icon color='teal' index={i} onClick={decreaseActionPriorityHandler}>
                            <Icon name='angle double down' />
                        </Button>
                        }
                        <Button icon color='red' index={i} actionid={formData.actionList[i].actionId} 
                            onClick={removeActionFromPlanHandler}
                        >
                            <Icon name='delete'/>
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )
            uniqueId++
        }
        return renderListToReturn
    }

    function generateConfigurationListCustomTableBodyStep3(){
        let renderListToReturn = []
        let uniqueId = 0;

        for(let i=0; i < formData.actionList.length; i++){
            if(formData.actionList[i].configurations !== null){
                for(let j=0; j < formData.actionList[i].configurations.length; j++){
                    renderListToReturn.push(
                        <Table.Row key={uniqueId} >
                            <Table.Cell >
                                {formData.actionList[i].actionId}
                            </Table.Cell>
                            <Table.Cell >
                                {formData.actionList[i].configurations[j].keyName}
                            </Table.Cell>
                            <Table.Cell >
                                <Form.Input name="value" actionindex={i} configurationindex={j} 
                                    onChange={configurationDataHandler} required
                                    error={(formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(formData.actionList[i].configurations[j].value)) ? 
                                            { content: 'Please enter a value for this configuration', pointing: 'above' }
                                        :
                                            null
                                    }
                                />
                            </Table.Cell>
                        </Table.Row>
                    )
                    uniqueId++
                }
            }
        }
        return renderListToReturn
    }

    function step3(){
        return (
        <div>
            {listOfActionsDropDown !== null ?
            <div>
                <Grid columns={1}>
                    <Grid.Column>
                        <Button color='grey' circular floated='right' onClick={createRuleHandler}> Create Rule</Button>
                    </Grid.Column>
                </Grid>
                <Grid doubling stackable columns={2}>
                    <Grid.Column>
                        <Segment style={{marginLeft: "auto", marginRight: "auto"}}>
                            <Header as="h5" textAlign="center"> Configure adaptation plan actions</Header>
                            <Divider/>
                            {listOfActionsDropDown.filter((action) => action.chosen === "false").length > 0 ?
                                <Form widths='equal'>
                                    <Form.Group>
                                        <Form.Dropdown
                                            onChange={(ev,atts) => {setTempActionChosen(atts.value)}}
                                            selectOnBlur={false}
                                            selectOnNavigation={false}
                                            required
                                            selection
                                            options={listOfActionsDropDown.filter((action) => action.chosen === "false")}
                                            label='Add actions to the adaptation plan'
                                            name="actionList"
                                            error={
                                                formErrorDisplay && !ValidInputs().validDropDownMultipleSelection(formData.actionList) ?
                                                { content: 'Please choose, at least, one action for the adaptation', pointing: 'above' }
                                                :
                                                null
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Button color="blue" floated='right' circular type='submit' onClick={step3AddActionHandler}> 
                                            <Icon name='plus'/>
                                            Add Action
                                        </Form.Button>
                                    </Form.Group>
                                </Form>
                            :
                                null
                            }
                            <Table textAlign="center" compact celled selectable> 
                                <TableHeader tableHeaders = {tableHeadersActionList} ></TableHeader>
                                <Table.Body>{
                                    generateActionListCustomTableBodyStep3()
                                }
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment style={{marginLeft: "auto", marginRight: "auto"}}>
                            <Header as="h5" textAlign="center"> Necessary actions' configurations</Header>
                            <Divider/>
                            <Form>
                                <Table textAlign="center" compact celled selectable> 
                                    <TableHeader tableHeaders = {tableHeadersConfigurationList} ></TableHeader>
                                    <Table.Body>{
                                        generateConfigurationListCustomTableBodyStep3()
                                    }
                                    </Table.Body>
                                </Table>
                            </Form>
                        </Segment> 
                    </Grid.Column>
                </Grid>
                <CustomModal 
                    successPath="/getAdaptationRules" 
                    modalInfo={createRuleResponseMessage} 
                />
            </div>
            :
                <Loader active inline='centered'> Retrieving content </Loader>
            }
        </div> 
        )
    }

    return (
        <div>
            <Grid centered>
                <Grid.Row> 
                    <Grid.Column>
                        <Divider section horizontal>
                            <Header  as="h1" textAlign="center">Create Adaptation Rule</Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br/>
            <Container>
                <Step.Group ordered widths={3}>
                    <Step  
                        completed = {step > 1} 
                        link
                        onClick={() =>{
                            setStep(1)
                            backToStep1Clean()
                        }}
                    >
                        <Step.Content>
                            <Step.Title>Rule's resource </Step.Title>
                            <Step.Description>Select a resource for a rule to apply</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step 
                        completed = {step > 2} 
                        disabled = {step < 2} 
                        link
                        onClick={() =>{
                            setStep(2)
                            backToStep2Clean()
                        }} 
                    >
                        <Step.Content>
                            <Step.Title>Rule's name and condition</Step.Title>
                            <Step.Description>Define the name of the adaptation rule and the condition that triggers it</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled = {step < 3} link>
                        <Step.Content>
                            <Step.Title>Rule's adaptation plan</Step.Title>
                            <Step.Description>Define the actions, and their configurations, of the plan to execute
                                when the condition is triggered
                            </Step.Description>
                        </Step.Content>
                    </Step>
                </Step.Group>
                { 
                activeResources === null ? 
                    <div>
                        <Loader active inline='centered'> Retrieving content </Loader>
                        <br/>
                    </div>
                :
                    choseStepRender()
                }
            </Container>
        </div>
    )
}

export default ViewRulePage;