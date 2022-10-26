import { Divider, Label, Header, Grid, Form, Container, Segment,Table, Loader} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import React, {useState, useEffect, useRef} from "react"
import {useLocation} from "react-router-dom"
import TreeRender from '../../utils/treeRendering/TreeRender';
import TableHeader from "../../components/tables/TableHeader"
import ValidInputs from '../../utils/ValidInputs';
import Plot from '../../components/Plot';
import CustomModal from '../../components/CustomModal';

function SimulateResourceMetricsPage(){
    const tableHeaders = [
        "metricName", 
        <p>Original weight</p>,
        <p>Simulation weight<font color='#990000'>*</font></p>
    ]

    //used to disable the appearence of errors when a 1st submission of the form hasn't been done
    const [formErrorDisplay, setFormErrorDisplay] = useState(false);

    //holds message from API response to request and any other messages to be presented to the user
    const [serverResponseMessage, setServerResponseMessage] = useState({"openModal": false})

    //reads data from previous page
    const data = useLocation()["state"]

    //used to update plot according to simulation
    const [plotData,setPlotData] = useState(data.plotData);

    //ref for the metric tree representation, so updates can be performed during form filling
    const metricsTreeRef = useRef();

    const [loadingSimulationData,setLoadingSimulationData] = useState(false);

    const [metricsList,setMetricsList] = useState(null);
    const [originalPreferences,setOriginalPreferences] = useState(null);
    const [simulationPreferences, setSimulationPreferences] = useState(null);

    useEffect(()=>{
        console.log(data)

        let listOfMetrics = []
        let listOfMetricsIds = []
        getMetricsList(data.metricToSimulate, listOfMetrics,listOfMetricsIds);
        setMetricsList(listOfMetrics) 

        //As preferences passed from previous page may contain preferences of other metrics that are not needed
        //in the simulation, filter for the ones strictly necessary which must match the ones present in the listOfMetricsIds array 
        let originalPreferencesTemp = [] 
        let simulationPreferencesTemp = {}

        listOfMetricsIds.forEach((item) => {
            let weight = data.preferences.find(preference => preference.metricId === item).weight
            originalPreferencesTemp.push(
                {
                    "metricId": item,
                    "weight": weight
                }
            )
            //Now create simulation preferences object with metricId as key and weight as value to use as request for API and
            //rendering purposes. As a starting point also set the simulation preferences with the same values as the originals 
            simulationPreferencesTemp[item] = weight
        })

        setOriginalPreferences(originalPreferencesTemp)
        setSimulationPreferences(simulationPreferencesTemp)

    },[])

    //from tree of metrics, find all the metric nodes and their names and ids, to later construct the form
    function getMetricsList(metric, listOfMetrics, listOfMetricsIds){
        listOfMetrics.push(
            {
                "metricName": metric["metricName"],
                "metricId": metric["metricId"]
            })
        listOfMetricsIds.push(metric["metricId"])    
        for(let child of metric["childMetrics"]){
            getMetricsList(child,listOfMetrics, listOfMetricsIds)
        }
    }


    function generateCustomTableBody(){
        let uniqueId = -4;
        return (
            <Table.Body>
                {
                    metricsList.map((metric) => 
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
        return(
            <Table.Row key={uniqueId++}>
                <Table.Cell key={uniqueId++}>
                    {metric["metricName"]}
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    {originalPreferences.find(item => item.metricId === metric.metricId).weight}
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    <Form.Input name="weight" metricid={metric["metricId"]} 
                    onChange={weightInputChangeHandler} required 
                    defaultValue={simulationPreferences[metric.metricId]}
                    error={
                        formErrorDisplay && !ValidInputs().validFloatBetweenZeroAndOne(simulationPreferences[metric.metricId]) ?
                        { content: 'Please enter a float number where  0.0 <= number <= 1.0', pointing: 'above' }
                        :
                        null
                    }
                    />
                </Table.Cell>
            </Table.Row>
        )
    }

    async function weightInputChangeHandler(ev,atts){   
        let newSimulationPreferences = {...simulationPreferences}
        newSimulationPreferences[atts["metricid"]] = atts["value"]
        setSimulationPreferences(newSimulationPreferences)
        metricsTreeRef.current.updateWeightsHandler(atts["metricid"], atts["value"])
    }
    
    //used to validate that childs of a parent metric have a sum of weights = 1
    function validWeightsSum(parentMetric){
        //reached a leaf metric
        if(parentMetric.childMetrics.length === 0){
            return true
        }
        else{
            let sum = 0
            for(let child of parentMetric.childMetrics){
                if(!validWeightsSum(child))
                    return false
                sum += parseFloat(simulationPreferences[child.metricId])
            }
            if(sum !== 1){
                return false
            }
            return true
        }
    }

    async function submitHandler(ev){
        ev.preventDefault()
        let valid = true
        
        for(let metricWeight of Object.values(simulationPreferences)){
            if(!ValidInputs().validFloatBetweenZeroAndOne(metricWeight)){
                valid=false
                break;
            }
        }

        if(valid){
            setFormErrorDisplay(false)

            //then it is not valid and customize message
            if(!validWeightsSum(data.metricToSimulate)){
                setServerResponseMessage(
                    {
                        messageType: "error",
                        message: "Sibling metrics must have the sum of their weights equal to 1. Please, adjust the weights.",
                        openModal: true
                    }
                )
                return
            }

            setLoadingSimulationData(true)
            
            //process data into a format acceptable by the API
            let requestBody = {
                resourceId: data.resourceId,
                metricToSimulate: data.metricToSimulate,
                preferences: simulationPreferences
            }

            //send dates in UTC seconds and mind if the values passed were from live plot or not. If received from live plot
            //they are already date objects.
            if(typeof(data.startDate) === "object"){
                requestBody.startDate = parseInt(data.startDate.valueOf()/1000)
                requestBody.endDate = parseInt(data.endDate.valueOf()/1000)
            }
            else{
                requestBody.startDate = new Date(data.startDate).valueOf()/1000
                requestBody.endDate = new Date(data.endDate).valueOf()/1000
            }

            let resData = await ApiModule().getSimulationData(requestBody)
            
            let newPlotData = JSON.parse(JSON.stringify(plotData))
            
            newPlotData.simulationData = resData
            //newPlotData.dataSetMetric.data = resData
            setPlotData(newPlotData)
            
            setLoadingSimulationData(false);
        }
        else{
            setFormErrorDisplay(true)
        }
    }

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={15}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center">Simulate Resource Metrics </Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            {simulationPreferences === null ?
                <Loader active inline='centered'> Processing data... Please Wait</Loader>
            :
                <Container >
                    <Segment>
                        <Label ribbon as='b' color="grey">
                            <Header as="h3"> Note: </Header> 
                            Scroll down to visualize the Plot area.
                        </Label>
                        <br/>
                        <br/>
                        <Grid stackable columns={2}>
                            <Grid.Column>
                                <Segment >
                                    <Header as="h3" textAlign="center"> Simulation Information</Header>
                                    <Form>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Metric to simulate:</label>
                                                {data.metricToSimulate.metricName}
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Start timestamp:</label>
                                                {typeof(data.startDate) === "object" ?
                                                    data.startDate.toLocaleString()
                                                :
                                                    new Date(data.startDate).toLocaleString()
                                                }
                                            </Form.Field>
                                            <Form.Field>
                                                <label>End timestamp:</label>
                                                {typeof(data.endDate) === "object" ?
                                                    data.endDate.toLocaleString()
                                                :
                                                    new Date(data.endDate).toLocaleString()
                                                }
                                            </Form.Field>
                                            <Form.Field >
                                                <label>Resource Id:</label>
                                                {data.resourceId}
                                            </Form.Field>
                                        </Form.Group>
                                    </Form>
                                    <Divider section horizontal>
                                        <Header as="h5" textAlign="center">Simulation weighted metrics tree</Header>     
                                    </Divider>
                                    <TreeRender ref={metricsTreeRef} width={"100%"} height={"50vh"} 
                                        data={data.metricToSimulate} 
                                        preferences={originalPreferences} 
                                        configurationProfile={true}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column> 
                                <Form>
                                <Segment>
                                    <Header as="h3" textAlign="center"> Simulation weights</Header>
                                        <Form.Group grouped>
                                            <Table  
                                            style = {{marginLeft: "auto", marginRight: "auto"}} 
                                            textAlign="center" 
                                            compact 
                                            collapsing  
                                            celled 
                                            selectable> 
                                                <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                                {generateCustomTableBody()}
                                            </Table>   
                                        </Form.Group>
                                        <Form.Button loading={loadingSimulationData} color= "blue" circular 
                                            type='submit' floated="right" onClick={submitHandler}
                                        > 
                                            Simulate
                                        </Form.Button> 
                                        <br/>
                                        <br/>
                                </Segment> 
                                </Form>
                            </Grid.Column>          
                        </Grid>
                        <Segment>
                        {loadingSimulationData ?
                            <Loader active inline='centered'> Performing simulation... Please Wait  </Loader>
                        :
                            null 
                        }
                        <div style={{display: loadingSimulationData? "none":"block"}}>
                            <Plot 
                                plotPath="simulateMetrics" plotData={plotData}
                                startDate={
                                    typeof(data.startDate) === "object" ?
                                        data.startDate
                                    :
                                        new Date(data.startDate * 1000)
                                } 
                                endDate={
                                    typeof(data.endDate) === "object" ?
                                        data.endDate
                                    :
                                        new Date(data.endDate * 1000)
                                } 
                            />
                        </div>
                        </Segment>
                    </Segment>
                </Container>
            }
            <CustomModal 
                successPath={"simulateMetrics"}
                modalInfo={serverResponseMessage} 
            />
        </div>
    )
}

export default SimulateResourceMetricsPage;