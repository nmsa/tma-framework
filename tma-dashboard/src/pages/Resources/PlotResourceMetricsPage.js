import React, { useEffect, useState } from 'react';
import { Container, Grid, Segment, Divider, Header, Form, Loader, Step, Label, Button } from 'semantic-ui-react';
import ApiModule from '../../utils/api/ApiModule';
import DropDownDataFormat from '../../utils/dropDownDataFormat/DropDownDataFormat';
import TreeRender from '../../utils/treeRendering/TreeRender';
import ValidInputs from '../../utils/ValidInputs';
import Plot from "../../components/Plot";
import 'chartjs-adapter-date-fns';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

let liveDataAPIRequestFunctionTimer = null;

function PlotResourceMetricsPage(){ 
    let navigate = useNavigate();
    
    const [activeResources, setActiveResources] = useState(null);
    const [chosenResource, setChosenResource] = useState(null);
    const [configurationProfile, setConfigurationProfile] = useState(null);
    const [qualityModel, setQualityModel] = useState(null);
    const [listOfMetrics, setListOfMetrics] = useState(null);
    const [formData, setFormData] = useState(
        {
            resourceId: null,
            dataType: "raw",
            metricId: null,
            startDate: null,
            endDate: null,
            livePlot: false,
            addPlansInfo: false
        }
    );
    

    //used to disable the appearence of errors when a 1st submission of the form hasn't been done
    const [formErrorDisplay, setFormErrorDisplay] = useState(false);
    const [step, setStep] = useState(1);
    
    useEffect(()=>{
        async function makeAPIRequest(){
            let unprocessedResources = await ApiModule().getActiveResources();
            DropDownDataFormat().convertResources(unprocessedResources,setActiveResources)
        }
        makeAPIRequest()
    },[])

    // data to pass to the Plot component
    const [plotData,setPlotData] = useState(null)

    function cleanStep2FormData(){
        //set ChosenResource null so that when step1 is submitted, on step2 the indication of loading data will appear
        setChosenResource(null);
        setFormData(
            {
                ...formData,
                metricId: null,
                startDate: null,
                endDate: null,
                addPlansInfo: false,
                livePlot: false
            }
        )
    }

    function formDataOnChangeHandler(ev, props){
        let newFormData = JSON.parse(JSON.stringify(formData))
        newFormData[props.name] = props.value
        setFormData(newFormData)
    }

    async function submitStep1Handler(ev){
        ev.preventDefault()
        if (ValidInputs().validStringOrDropDownSelection(formData.resourceId)){
            //remore error appearance on next step, using this same variable used on step 1 to control error messages displaying
            setFormErrorDisplay(false)
            //request render of step 2
            setStep(2)

            //get Resource Weights And Metrics Tree by performing synchronous request to the api
            let res = await ApiModule().getResourceWeightsAndMetricsTree(formData.resourceId)
            setConfigurationProfile(res.configurationProfile)
            setQualityModel(res.qualityModel)

            let queryParams
            if(formData.dataType === "raw"){
                queryParams = {leafAttributes: true}
            }
            else{
                queryParams = {leafAttributes: false}
            }
            console.log(res)
            
            //get List Of Metrics depending on selected input(raw or metric data)
            res = await ApiModule().getConfigurationProfileListOfMetrics(res.configurationProfile.configurationProfileId, queryParams)
            DropDownDataFormat().convertMetrics(res,setListOfMetrics)

            //set a value on this variable so step 2 is informed to stop showing feedback of loading contents 
            setChosenResource(formData.resourceId)
        }
        else{
            //enable error display
            setFormErrorDisplay(true)
        }
    }

    async function submitStep2Handler(ev){
        ev.preventDefault()
        if (ValidInputs().validStringOrDropDownSelection(formData.metricId)){
            if(formData.livePlot || 
                (ValidInputs().validTimeStamp(formData.startDate) && ValidInputs().validTimeStamp(formData.endDate))   ){
                
                setStep(3)
                let queryParams = {
                    metricId: formData.metricId,
                    dataType: formData.dataType,
                    addPlansInfo: formData.addPlansInfo
                }

                //if it is not a live plot, then dates were defined in inputs
                if(!formData.livePlot){
                    queryParams.startDate = new Date(formData.startDate).valueOf() / 1000
                    queryParams.endDate = new Date(formData.endDate).valueOf() / 1000
                }
                else{
                    let currDate = new Date();
                    //subtract 60000 to value of currDate to get the timestamp 1 minute ago
                    let currDateMinus1Minute = new Date(currDate.getTime() - 60000)

                    //update form data, because it may be used if simulate metrics button is pressed
                    setFormData({
                        ...formData,
                        startDate: currDateMinus1Minute,
                        endDate: currDate
                    })

                    queryParams.startDate = parseInt(currDateMinus1Minute.valueOf() / 1000)
                    queryParams.endDate = parseInt(currDate.valueOf() / 1000)
                }
                
                console.log(queryParams)
                //get data to plot from API 
                let res = await ApiModule().getResourceData(formData.resourceId, queryParams)

                let dataSetMetric = {
                    label: listOfMetrics.find(elem => elem.value === formData.metricId).text.replace(/\[.*\] /,""),
                    data: res[0].listOfDataPoints
                }   

                let newPlotData = {}
                newPlotData.dataSetMetric = dataSetMetric
                
                //define y axis label based on being raw data or metric data. If it is raw data then use the description 
                //information retrieved by the API
                if(formData.dataType === "raw"){
                    newPlotData.ylabel = res[0].descriptionInfo
                }
                else{
                    newPlotData.ylabel = "Metric value ( 0<= y <=1)"

                    //access plansInfo data points and add them to the plot if addPlans option was set 
                    if(formData.addPlansInfo){
                        res[0].listOfPlansInfo.forEach((item, index, array) => { 
                            //set y coordinate of plans dataset points to the same value of the metrics dataset
                            item.value = res[0].listOfDataPoints.find(elem => elem.valueTime === item.valueTime).value
                        })

                        //set the plans dataset after processing y coordinate.
                        newPlotData.plansData = res[0].listOfPlansInfo
                    }
                }

                //update state variable to trigger render
                setPlotData(newPlotData)
                
                //if live plot was set, perform API data request each second
                if(formData.livePlot){
                    liveDataAPIRequestFunctionTimer = setInterval(step3LiveData,1000)
                }
                return
            }
        }
        // if form validation wasn't successful, then present form field errors
        setFormErrorDisplay(true)
    }
    
    async function step3LiveData(){
        //get current location to verify if navbar was clicked and thereby stop executing this function in a loop
        let currLocation = window.location.href.split("/")
        //May have to change this path when more features considering resources are added
        if(currLocation[currLocation.length-1] !== "getResources"){
            clearInterval(liveDataAPIRequestFunctionTimer);
            return;
        }
        
        let queryParams = {
            metricId: formData.metricId,
            dataType: formData.dataType,
            addPlansInfo: formData.addPlansInfo
        }

        let currDate = new Date();
        //subtract 60000 to value of currDate to get the timestamp 1 minute ago
        let currDateMinus1Minute = new Date(currDate.getTime() - 60000)
        
        //update form data, because it may be used if simulate metrics button is pressed
        setFormData({
            ...formData,
            startDate: currDateMinus1Minute,
            endDate: currDate
        })

        queryParams.startDate = parseInt(currDateMinus1Minute.valueOf() / 1000)
        queryParams.endDate = parseInt(currDate.valueOf() / 1000)

        //get data to plot from API 
        let res = await ApiModule().getResourceData(formData.resourceId, queryParams)

        //access plansInfo data points
        if(formData.addPlansInfo){
            res[0].listOfPlansInfo.forEach((item, index, array) => { 
                //set y coordinate of plans dataset points to the same value of the metrics dataset
                item.value = res[0].listOfDataPoints.find(elem => elem.valueTime === item.valueTime).value
            })
        }

        //update state variable to trigger render. The changes have to be made upon last state submitted that not might be 
        //rendered yet. That's why prevStatePlotData is used to get last state even though it is not rendered
        setPlotData((prevStatePlotData) => {
                let newPlotData = JSON.parse(JSON.stringify(prevStatePlotData))
                newPlotData.dataSetMetric.data = res[0].listOfDataPoints

                if(formData.addPlansInfo){
                    newPlotData.plansData = res[0].listOfPlansInfo
                }
                return newPlotData
            }
        )
    }

    function simulateMetricsButtonHandler(){
        clearInterval(liveDataAPIRequestFunctionTimer);
        let nextPageParams = {
            state: {
                metricToSimulate: null,
                preferences: null,
                resourceId: formData.resourceId
            } 
        }

        let rootMetric = qualityModel.metric;
        let metricToSimulate = findMetricTreeOnTreeTranverse(rootMetric, parseInt(formData.metricId))
        nextPageParams.state.metricToSimulate = metricToSimulate
        nextPageParams.state.preferences = configurationProfile.preferences
        nextPageParams.state.startDate = formData.startDate
        nextPageParams.state.endDate = formData.endDate
        nextPageParams.state.plotData = plotData
        navigate("/simulateMetrics", nextPageParams);
    }

    function findMetricTreeOnTreeTranverse(currMetric, metricIdToFind){
        if(currMetric.metricId !== metricIdToFind){
            let queryResult
            for(let child of currMetric.childMetrics){
                queryResult = findMetricTreeOnTreeTranverse(child,metricIdToFind)
                if( queryResult !== null ) {
                    return queryResult
                }
            }
            return null
        }
        else{
            return currMetric
        }
    }

    function exportPlotConfigsButtonHandler(){
        let obj = JSON.parse(JSON.stringify(formData))
        
        obj.startDate = Math.floor(new Date(obj.startDate).valueOf() / 1000)
        obj.endDate = Math.floor(new Date(obj.endDate).valueOf() / 1000)
        
        obj.metricLabel = plotData.dataSetMetric.label
        let blob = new Blob([JSON.stringify(obj,null, 2)],
                { type: "application/json" });

        saveAs(blob, "plotConfig.txt");
    }

    function step1(){
        return (
            <Segment compact style={{marginLeft: "auto", marginRight: "auto"}}>
                <Form>
                    <Form.Group grouped>
                        <Form.Group>
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
                        </Form.Group>
                        <Form.Group grouped>
                            <label>Choose a type of data: </label>
                            <Form.Group inline>
                                <Form.Checkbox
                                    radio
                                    label='Raw Data'
                                    name='dataType'
                                    value='raw'
                                    checked={formData.dataType === 'raw'}
                                    onChange={formDataOnChangeHandler}
                                />
                                <Form.Checkbox
                                    radio
                                    label='Metric Data'
                                    name='dataType'
                                    value='metric'
                                    checked={formData.dataType === 'metric'}
                                    onChange={formDataOnChangeHandler}
                                />
                            </Form.Group>
                            <Form.Button color="blue" circular type='submit' floated='right' onClick={submitStep1Handler}> 
                                Confirm
                            </Form.Button>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }

    function step2(){
        return (
            <div>
            {
            chosenResource === null ?
                <Loader active inline='centered'> Retrieving content </Loader>
            :
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
                        <Segment>
                            <Form>
                                <Form.Group grouped>  
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
                                        label='Choose a metric'
                                        name="metricId"
                                        onChange={formDataOnChangeHandler}
                                        error = {
                                            (formErrorDisplay && !ValidInputs().validStringOrDropDownSelection(formData.metricId)) ? 
                                                { content: 'Please choose a Metric', pointing: 'above' } 
                                            : 
                                                null
                                        }
                                    />
                                    <p/>
                                    { formData.dataType === "raw" ?
                                        null
                                    :
                                    <React.Fragment>
                                        <Form.Checkbox checked={formData.addPlansInfo} label='Add Plans Info'
                                            onClick={ () =>{
                                                setFormData({
                                                    ...formData, 
                                                    addPlansInfo: !formData.addPlansInfo}
                                                )
                                                }} 
                                        />
                                        <p/>
                                    </React.Fragment>
                                    }
                                    <Form.Checkbox checked={formData.livePlot} toggle label="Live plot"
                                        onClick={ () =>{
                                            setFormData({
                                                ...formData, 
                                                livePlot: !formData.livePlot}
                                            )
                                            }} 
                                    />
                                    { 
                                    !formData.livePlot ?
                                        <div>
                                            <br/>
                                            <label>Chose a time window: </label>
                                            <Form.Input required
                                                type='datetime-local'
                                                defaultValue = {formData.startDate !== null ? formData.startDate : null}
                                                name="startDate"  
                                                label='Start date'
                                                step="1"
                                                onChange={formDataOnChangeHandler}
                                                error={
                                                    (formErrorDisplay && !ValidInputs().validTimeStamp(formData.startDate)) ? 
                                                        { content: 'Please insert a valid TimeStamp', pointing: 'above' } 
                                                    : 
                                                        null
                                                    }
                                            />
                                            <Form.Input required
                                                type='datetime-local'
                                                defaultValue = {formData.endDate !== null ? formData.endDate : null}
                                                name="endDate"  
                                                label='End date'
                                                step="1"
                                                onChange={formDataOnChangeHandler}
                                                error={
                                                    (formErrorDisplay && !ValidInputs().validTimeStamp(formData.endDate)) ? 
                                                        { content: 'Please insert a valid TimeStamp', pointing: 'above' } 
                                                    : 
                                                        null
                                                    }
                                            />
                                        </div>
                                       
                                    :
                                        null
                                    }
                                    <Form.Button color="blue" circular type='submit' floated='right' onClick={submitStep2Handler}> 
                                        Confirm
                                    </Form.Button>
                                    <br/>
                                    <br/>
                                </Form.Group>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            }
            </div>
        )
    }

    function step3(){
        return(
            <Segment>
            { 
            plotData === null ? 
                <Loader active inline='centered'> Retrieving content </Loader>
            : 
                <div>
                    {plotData.dataSetMetric.data.length === 0 ?
                        <Label ribbon as='b' color="red">
                            <Header as="h3"> Warning! </Header> 
                            There are no data available for the defined selections. If "Live plot" option was selected, 
                            data may appear in the plot if any arrive in the database.
                        </Label>
                    : formData.dataType === "metric" ?
                        <Button color='blue' onClick={simulateMetricsButtonHandler}>
                            Simulate Metrics
                        </Button>
                    :
                        null
                    }
                    <Button color='grey' floated='right' onClick={exportPlotConfigsButtonHandler}>
                            Export Plot Config
                    </Button>
                    <p/>
                    <Plot 
                        plotPath="getResources"
                        plotData = {plotData} 
                        startDate={
                            typeof(formData.startDate) === "object" ?
                                formData.startDate
                            :
                                new Date(formData.startDate)
                        } 
                        endDate={
                            typeof(formData.endDate) === "object" ?
                                formData.endDate
                            :
                                new Date(formData.endDate)
                        } 
                    />
                </div>
            }
            </Segment>
        )
    }

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
    
    return( 
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center"> Visualize Resource Metrics</Header> 
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
                            clearInterval(liveDataAPIRequestFunctionTimer);
                            setPlotData(null)
                            cleanStep2FormData(); 
                            setStep(1)
                        }}
                    >
                        <Step.Content>
                            <Step.Title>Resource and Data Type</Step.Title>
                            <Step.Description>Select a Resource and the type of data to plot</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step 
                        completed = {step > 2} 
                        disabled = {step < 2} 
                        link
                        onClick={() =>{
                            clearInterval(liveDataAPIRequestFunctionTimer); 
                            setPlotData(null)
                            setStep(2)
                        }} 
                    >
                        <Step.Content>
                            <Step.Title>Metric and Time Window</Step.Title>
                            <Step.Description>Selec Metric and time window to plot data</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step completed = {step > 2} disabled = {step < 3} link>
                        <Step.Content>
                            <Step.Title>Plot data</Step.Title>
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

export default PlotResourceMetricsPage;