import React, { useEffect, useState } from 'react';
import {
Chart as ChartJS,
CategoryScale,
LineController,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
TimeScale,
ScatterController,
} from 'chart.js';
import {Chart, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent} from 'react-chartjs-2';
import {Loader, Button, Icon} from 'semantic-ui-react';
import { useRef } from 'react';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import 'date-fns';

function Plot(props){
    
    ChartJS.register(
        CategoryScale,
        LineController,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        TimeScale,
        ScatterController
    );

    const plotPath = props.plotPath;

    //used to control the display of the chart after font sizes have been changed/adapted
    const[adaptedFontSizes,setAdaptedFontSizes]  = useState(false);
    const adaptedFontSizesRef = useRef(adaptedFontSizes);
    adaptedFontSizesRef.current = adaptedFontSizes

    //used to show a loading state on the button that generates a PDF Image from the chart
    const [chartPDFGen,setChartPDFGen] = useState(false);
    
    const chartRef = useRef();

    //raw or metric data points dataset
    let dataSetMetric = {
        //"label" and "data" properties missing from input
        type: "line",
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        order: 2,
        pointStyle: "circle",
        radius: 7,
        hoverRadius: 10,
        parsing: {
            xAxisKey: "valueTime",
            yAxisKey: "value"
        }
    }

    //plans dataset
    let dataSetPlans = {
        //"data" property missing from input
        label: 'Adaptation Plans',
        type: "scatter",
        borderColor: 'black',
        backgroundColor: 'white',
        pointStyle: "rectRot",
        radius: 7,
        hoverRadius: 10,
        order: 1,
        parsing: {
            xAxisKey: "valueTime",
            yAxisKey: "value"
        }
    }

    //raw or metric data points dataset
    let dataSetSimulation = {
        //"label" and "data" properties missing from input
        type: "line",
        borderColor: '#ff0000',
        backgroundColor: '#ff0000',
        order: 3,
        pointStyle: "circle",
        radius: 7,
        hoverRadius: 10,
        parsing: {
            xAxisKey: "valueTime",
            yAxisKey: "value"
        }
    }

    // "datasets" is an array of dataset objects where each object holds its properties and the y and x axis values.  
    const [plotData,setPlotData] = useState(
        {
            datasets: []    
        }
    )

    //function that handles what information is shown on the plot for a point that is hovered by the user
    function plotLabelHandler(tooltipItem){
        let label
        //if datasetIndex is 1, then it is the dataset relative to Plans
        if(tooltipItem.datasetIndex === 1){
            label = "Plan Id: " + tooltipItem.raw.planId
        }
        else{
            //round the value to 3 decimal places
            label = "Value: " + Math.round(tooltipItem.raw.value * 1000) / 1000; 
        }
        
        return label;
    }

    const [plotOptions,setPlotOptions] = useState(
        {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0,
            },
            responsiveAnimationDuration: 0,
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                    },
                    reverse: true
                },
                /* //In case it is wanted to show a title for the Chart
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },*/
                tooltip: {
                    usePointStyle: true,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    callbacks: {
                        label: plotLabelHandler
                    },
                }
            },
            scales:{
                x: {
                    //this will make values received from api, which are in epoch millisecond, to be converted into the local timezone
                    //and formated into the specified formats
                    type: 'time',
                    parsing: 'false',
                    time: {
                        displayFormats:{
                            second: "dd/MM/yyyy, HH:mm:ss",
                            minute: "dd/MM/yyyy, HH:mm:ss",
                            hour: "dd/MM/yyyy, HH:mm:ss",
                            day: "dd/MM/yyyy, HH:mm:ss",
                            week: "dd/MM/yyyy, HH:mm:ss",
                            month: "dd/MM/yyyy, HH:mm:ss",
                            quarter: "dd/MM/yyyy, HH:mm:ss",
                            year: "dd/MM/yyyy, HH:mm:ss",
                        },
                        minUnit: "second",
                        tooltipFormat:"dd/MM/yyyy, HH:mm:ss",
                    },
                    title: {
                        display: true,
                        text: "Timestamp (dd/MM/yyyy, HH:mm:ss)",
                        color: '#0057b3',
                        font: {
                            family: 'Helvetica',
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        font: {
                        },
                        color: "#000000",
                        autoSkip: true,
                    },
                    min: props.startDate,
                    max: props.endDate,
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: props.plotData.ylabel,
                        color: '#0057b3',
                        font: {
                            family: 'Helvetica',
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        maxTicksLimit: 20,
                        font: {
                        },
                        color: "#000000"
                    },
                } 
            },
            onResize: resetFontVariables
        }
    )

    //this is done to readapt font sizes in case of a resize of the page
    function resetFontVariables(){
        let currLocation = window.location.href.split("/")
        if(currLocation[currLocation.length-1] !== plotPath){
           return
        }
        setAdaptedFontSizes(false)
    }

    function chartClickHandler(ev){
        console.log(getDatasetAtEvent(chartRef.current, ev));
        console.log(getElementAtEvent(chartRef.current, ev));
        console.log(getElementsAtEvent(chartRef.current, ev));
    }

    useEffect(() => {
        let datasetsTemp = []
        datasetsTemp.push(
            {
                ...dataSetMetric,
                label: props.plotData.dataSetMetric.label,
                data: props.plotData.dataSetMetric.data
            }
        )
        if(props.plotData.plansData !== undefined){
            datasetsTemp.push(
                {
                    ...dataSetPlans,
                    data: props.plotData.plansData
                }
            )
        }
        if(props.plotData.simulationData !== undefined){
            datasetsTemp.push(
                {
                    ...dataSetSimulation,
                    label: "Simulation Values",
                    data: props.plotData.simulationData
                }
            )
        }
        setPlotData(
            {
                ...plotData,
                datasets: datasetsTemp
            }
        )
    },[props])

    useEffect(() => {
        setPlotOptions((prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState))
            newState.scales.x.min = props.startDate
            newState.scales.x.max = props.endDate
            //the next lines are needed because json way to copy one object into another doesn't support types beyond
            //primitives(string,number...). In this case, onResize and label are functions
            newState.onResize = prevState.onResize
            newState.plugins.tooltip.callbacks.label = prevState.plugins.tooltip.callbacks.label
            return newState
        })
    },[props.startDate])

    const myplugins = [{
        /* Adjust font sizes according to chart size */
        beforeDraw: function(c) {
            if(!adaptedFontSizesRef.current){
                var chartHeight = c.height
                var ticksFontSize = chartHeight * 3 / 100
                var axisLabelFontSize = chartHeight * 5 / 100
                var legendFontSize = chartHeight * 3.5 / 100

                setPlotOptions((prevState)=>{
                    let newOptions = JSON.parse(JSON.stringify(prevState))
                    newOptions.scales.x.ticks.font.size = ticksFontSize
                    newOptions.scales.y.ticks.font.size = ticksFontSize

                    newOptions.scales.x.title.font.size = axisLabelFontSize
                    newOptions.scales.y.title.font.size = axisLabelFontSize

                    newOptions.plugins.legend.labels.font = {size: legendFontSize}
                    //the next lines are needed because json way to copy one object into another doesn't support types beyond
                    //primitives(string,number...). In this case, onResize and label are functions
                    newOptions.onResize = prevState.onResize
                    newOptions.plugins.tooltip.callbacks.label = prevState.plugins.tooltip.callbacks.label
                    return newOptions
                })
                setAdaptedFontSizes(true)

            }
        }
            
    }]

    return(
        plotData.datasets.length === 0 ?
            <Loader active inline='centered'> Preparing chart </Loader>
        :    
            <div>
                <Button color="grey"
                    floated='right'
                    loading = {chartPDFGen}
                    onClick={ () => {
                        setChartPDFGen(true)
                        
                        let imgFile = chartRef.current.toBase64Image("image/png",1);
                        let doc = new jsPDF('landscape',"px",[chartRef.current.width,chartRef.current.height]);
                        doc.addImage(imgFile, "PNG", 0, 0,chartRef.current.width, chartRef.current.height);
                        doc.save('Plot.pdf');
                        setChartPDFGen((prevState) => {return !prevState})

                        /*let canvasElem = chartRef.current.canvas;
                        //html2canvas used to improve quality. scale of 5 increases resolution in 5x
                        html2canvas(canvasElem, {scale: 3}).then((canvas) => {
                            let imgFile = canvas.toDataURL("image/png", 1);
                            let doc = new jsPDF('landscape',"px",[canvas.width,canvas.height],true,true);
                            doc.addImage(imgFile, "PNG", 0, 0, canvas.width,canvas.height);
                            doc.save('Plot.pdf');
                            setChartPDFGen((prevState) => {return !prevState})
                        })*/
                    }}
                >
                    <Icon name='download' />
                    Download Chart
                </Button>
                <div style={{position: "relative", width: "100%", height: "100%", display:"flex"}}>
                    <Chart ref={chartRef} onClick={chartClickHandler} options={plotOptions} data={plotData} 
                        plugins={adaptedFontSizes? null: myplugins}
                        style={{display: adaptedFontSizes? "block" : "none"}}
                    />
                </div>
            </div>
    )
}

export default Plot;