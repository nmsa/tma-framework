"use strict";(self.webpackChunktma_dashboard=self.webpackChunktma_dashboard||[]).push([[811],{6117:function(e,t,n){var r=n(1413),a=n(885),i=n(2791),l=n(6739),s=n(1460),o=n(834),c=n(6871),u=n(184);t.Z=function(e){var t=(0,c.s0)(),n=(0,i.useState)({successPath:e.successPath,openModal:!1,messageType:null,message:null}),d=(0,a.Z)(n,2),f=d[0],h=d[1];function g(n,a){"success"===f.messageType&&t(f.successPath),e.modalInfo.openModal=!1,h((0,r.Z)((0,r.Z)({},f),{},{openModal:!1}))}return(0,i.useEffect)((function(){h((0,r.Z)((0,r.Z)({},f),{},{openModal:e.modalInfo.openModal,messageType:e.modalInfo.messageType,message:e.modalInfo.message}))}),[e]),(0,u.jsxs)(l.Z,{centered:!1,closeIcon:!0,open:f.openModal,onClose:g,children:[(0,u.jsx)(l.Z.Header,{children:"Message"}),(0,u.jsx)(l.Z.Content,{children:(0,u.jsx)(s.Z,{color:"success"===f.messageType?"green":"warning"===f.messageType?"orange":"red",children:(0,u.jsx)(s.Z.Header,{children:f.message})})}),(0,u.jsx)(l.Z.Actions,{children:(0,u.jsx)(o.Z,{color:"grey",onClick:g,children:"Close"})})]})}},6895:function(e,t,n){var r=n(1413),a=n(885),i=n(2791),l=n(6152),s=n(1257),o=n(2417),c=n(834),u=n(2836),d=(n(5498),n(5125)),f=n(184);t.Z=function(e){l.kL.register(l.uw,l.ST,l.f$,l.od,l.jn,l.Dx,l.u,l.De,l.FB,l.ho);var t=e.plotPath,n=(0,i.useState)(!1),h=(0,a.Z)(n,2),g=h[0],p=h[1],m=(0,i.useRef)(g);m.current=g;var x=(0,i.useState)(!1),v=(0,a.Z)(x,2),y=v[0],Z=v[1],b=(0,i.useRef)(),j={type:"line",borderColor:"#007bff",backgroundColor:"#007bff",order:2,pointStyle:"circle",radius:7,hoverRadius:10,parsing:{xAxisKey:"valueTime",yAxisKey:"value"}},w={label:"Adaptation Plans",type:"scatter",borderColor:"black",backgroundColor:"white",pointStyle:"rectRot",radius:7,hoverRadius:10,order:1,parsing:{xAxisKey:"valueTime",yAxisKey:"value"}},D={type:"line",borderColor:"#ff0000",backgroundColor:"#ff0000",order:3,pointStyle:"circle",radius:7,hoverRadius:10,parsing:{xAxisKey:"valueTime",yAxisKey:"value"}},S=(0,i.useState)({datasets:[]}),k=(0,a.Z)(S,2),M=k[0],E=k[1],P=(0,i.useState)({animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,maintainAspectRatio:!0,responsive:!0,plugins:{legend:{position:"top",labels:{usePointStyle:!0},reverse:!0},tooltip:{usePointStyle:!0,backgroundColor:"rgba(0, 0, 0, 0.5)",callbacks:{label:function(e){return 1===e.datasetIndex?"Plan Id: "+e.raw.planId:"Value: "+Math.round(1e3*e.raw.value)/1e3}}}},scales:{x:{type:"time",parsing:"false",time:{displayFormats:{second:"dd/MM/yyyy, HH:mm:ss",minute:"dd/MM/yyyy, HH:mm:ss",hour:"dd/MM/yyyy, HH:mm:ss",day:"dd/MM/yyyy, HH:mm:ss",week:"dd/MM/yyyy, HH:mm:ss",month:"dd/MM/yyyy, HH:mm:ss",quarter:"dd/MM/yyyy, HH:mm:ss",year:"dd/MM/yyyy, HH:mm:ss"},minUnit:"second",tooltipFormat:"dd/MM/yyyy, HH:mm:ss"},title:{display:!0,text:"Timestamp (dd/MM/yyyy, HH:mm:ss)",color:"#0057b3",font:{family:"Helvetica",weight:"bold"}},ticks:{font:{},color:"#000000",autoSkip:!0},min:e.startDate,max:e.endDate},y:{beginAtZero:!0,title:{display:!0,text:e.plotData.ylabel,color:"#0057b3",font:{family:"Helvetica",weight:"bold"}},ticks:{maxTicksLimit:20,font:{},color:"#000000"}}},onResize:function(){var e=window.location.href.split("/");if(e[e.length-1]!==t)return;p(!1)}}),I=(0,a.Z)(P,2),R=I[0],C=I[1];(0,i.useEffect)((function(){var t=[];t.push((0,r.Z)((0,r.Z)({},j),{},{label:e.plotData.dataSetMetric.label,data:e.plotData.dataSetMetric.data})),void 0!==e.plotData.plansData&&t.push((0,r.Z)((0,r.Z)({},w),{},{data:e.plotData.plansData})),void 0!==e.plotData.simulationData&&t.push((0,r.Z)((0,r.Z)({},D),{},{label:"Simulation Values",data:e.plotData.simulationData})),E((0,r.Z)((0,r.Z)({},M),{},{datasets:t}))}),[e]),(0,i.useEffect)((function(){C((function(t){var n=JSON.parse(JSON.stringify(t));return n.scales.x.min=e.startDate,n.scales.x.max=e.endDate,n.onResize=t.onResize,n.plugins.tooltip.callbacks.label=t.plugins.tooltip.callbacks.label,n}))}),[e.startDate]);var N=[{beforeDraw:function(e){if(!m.current){var t=e.height,n=3*t/100,r=5*t/100,a=3.5*t/100;C((function(e){var t=JSON.parse(JSON.stringify(e));return t.scales.x.ticks.font.size=n,t.scales.y.ticks.font.size=n,t.scales.x.title.font.size=r,t.scales.y.title.font.size=r,t.plugins.legend.labels.font={size:a},t.onResize=e.onResize,t.plugins.tooltip.callbacks.label=e.plugins.tooltip.callbacks.label,t})),p(!0)}}}];return 0===M.datasets.length?(0,f.jsx)(o.Z,{active:!0,inline:"centered",children:" Preparing chart "}):(0,f.jsxs)("div",{children:[(0,f.jsxs)(c.Z,{color:"grey",floated:"right",loading:y,onClick:function(){Z(!0);var e=b.current.toBase64Image("image/png",1),t=new d.ZP("landscape","px",[b.current.width,b.current.height]);t.addImage(e,"PNG",0,0,b.current.width,b.current.height),t.save("Plot.pdf"),Z((function(e){return!e}))},children:[(0,f.jsx)(u.Z,{name:"download"}),"Download Chart"]}),(0,f.jsx)("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex"},children:(0,f.jsx)(s.kL,{ref:b,onClick:function(e){console.log((0,s.Lm)(b.current,e)),console.log((0,s.cX)(b.current,e)),console.log((0,s.E9)(b.current,e))},options:R,data:M,plugins:g?null:N,style:{display:g?"block":"none"}})})]})}},4829:function(e,t,n){var r=n(8900),a=n(184);t.Z=function(e){var t=0;return(0,a.jsx)(r.Z.Header,{children:(0,a.jsx)(r.Z.Row,{children:e.tableHeaders.map((function(e){return function(e){return(0,a.jsxs)(r.Z.HeaderCell,{children:[" ",e]},t++)}(e)}))})})}},6811:function(e,t,n){n.r(t);var r=n(1413),a=n(5861),i=n(7762),l=n(885),s=n(7757),o=n.n(s),c=n(8900),u=n(9402),d=n(4581),f=n(2966),h=n(4863),g=n(2417),p=n(6605),m=n(899),x=n(6303),v=n(5409),y=n(2791),Z=n(6871),b=n(5392),j=n(4829),w=n(5051),D=n(6895),S=n(6117),k=n(184);t.default=function(){var e=["metricName",(0,k.jsx)("p",{children:"Original weight"}),(0,k.jsxs)("p",{children:["Simulation weight",(0,k.jsx)("font",{color:"#990000",children:"*"})]})],t=(0,y.useState)(!1),n=(0,l.Z)(t,2),s=n[0],M=n[1],E=(0,y.useState)({openModal:!1}),P=(0,l.Z)(E,2),I=P[0],R=P[1],C=(0,Z.TH)().state,N=(0,y.useState)(C.plotData),A=(0,l.Z)(N,2),H=A[0],G=A[1],T=(0,y.useRef)(),O=(0,y.useState)(!1),z=(0,l.Z)(O,2),L=z[0],B=z[1],F=(0,y.useState)(null),J=(0,l.Z)(F,2),W=J[0],K=J[1],q=(0,y.useState)(null),Q=(0,l.Z)(q,2),U=Q[0],$=Q[1],X=(0,y.useState)(null),V=(0,l.Z)(X,2),_=V[0],Y=V[1];function ee(e,t,n){t.push({metricName:e.metricName,metricId:e.metricId}),n.push(e.metricId);var r,a=(0,i.Z)(e.childMetrics);try{for(a.s();!(r=a.n()).done;){ee(r.value,t,n)}}catch(l){a.e(l)}finally{a.f()}}function te(e,t){return ne.apply(this,arguments)}function ne(){return(ne=(0,a.Z)(o().mark((function e(t,n){var a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(a=(0,r.Z)({},_))[n.metricid]=n.value,Y(a),T.current.updateWeightsHandler(n.metricid,n.value);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function re(e){if(0===e.childMetrics.length)return!0;var t,n=0,r=(0,i.Z)(e.childMetrics);try{for(r.s();!(t=r.n()).done;){var a=t.value;if(!re(a))return!1;n+=parseFloat(_[a.metricId])}}catch(l){r.e(l)}finally{r.f()}return 1===n}function ae(){return(ae=(0,a.Z)(o().mark((function e(t){var n,r,a,i,l,s,c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),n=!0,r=0,a=Object.values(_);case 3:if(!(r<a.length)){e.next=11;break}if(i=a[r],(0,w.Z)().validFloatBetweenZeroAndOne(i)){e.next=8;break}return n=!1,e.abrupt("break",11);case 8:r++,e.next=3;break;case 11:if(!n){e.next=28;break}if(M(!1),re(C.metricToSimulate)){e.next=16;break}return R({messageType:"error",message:"Sibling metrics must have the sum of their weights equal to 1. Please, adjust the weights.",openModal:!0}),e.abrupt("return");case 16:return B(!0),l={resourceId:C.resourceId,metricToSimulate:C.metricToSimulate,preferences:_},"object"===typeof C.startDate?(l.startDate=parseInt(C.startDate.valueOf()/1e3),l.endDate=parseInt(C.endDate.valueOf()/1e3)):(l.startDate=new Date(C.startDate).valueOf()/1e3,l.endDate=new Date(C.endDate).valueOf()/1e3),e.next=21,(0,v.Z)().getSimulationData(l);case 21:s=e.sent,(c=JSON.parse(JSON.stringify(H))).simulationData=s,G(c),B(!1),e.next=29;break;case 28:M(!0);case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,y.useEffect)((function(){console.log(C);var e=[],t=[];ee(C.metricToSimulate,e,t),K(e);var n=[],r={};t.forEach((function(e){var t=C.preferences.find((function(t){return t.metricId===e})).weight;n.push({metricId:e,weight:t}),r[e]=t})),$(n),Y(r)}),[]),(0,k.jsxs)("div",{children:[(0,k.jsx)(d.Z,{centered:!0,children:(0,k.jsx)(d.Z.Row,{children:(0,k.jsx)(d.Z.Column,{width:15,children:(0,k.jsx)(f.Z,{section:!0,horizontal:!0,children:(0,k.jsx)(h.Z,{as:"h1",textAlign:"center",children:"Simulate Resource Metrics "})})})})}),null===_?(0,k.jsx)(g.Z,{active:!0,inline:"centered",children:" Processing data... Please Wait"}):(0,k.jsx)(p.Z,{children:(0,k.jsxs)(m.Z,{children:[(0,k.jsxs)(x.Z,{ribbon:!0,as:"b",color:"grey",children:[(0,k.jsx)(h.Z,{as:"h3",children:" Note: "}),"Scroll down to visualize the Plot area."]}),(0,k.jsx)("br",{}),(0,k.jsx)("br",{}),(0,k.jsxs)(d.Z,{stackable:!0,columns:2,children:[(0,k.jsx)(d.Z.Column,{children:(0,k.jsxs)(m.Z,{children:[(0,k.jsx)(h.Z,{as:"h3",textAlign:"center",children:" Simulation Information"}),(0,k.jsx)(u.Z,{children:(0,k.jsxs)(u.Z.Group,{widths:"equal",children:[(0,k.jsxs)(u.Z.Field,{children:[(0,k.jsx)("label",{children:"Metric to simulate:"}),C.metricToSimulate.metricName]}),(0,k.jsxs)(u.Z.Field,{children:[(0,k.jsx)("label",{children:"Start timestamp:"}),"object"===typeof C.startDate?C.startDate.toLocaleString():new Date(C.startDate).toLocaleString()]}),(0,k.jsxs)(u.Z.Field,{children:[(0,k.jsx)("label",{children:"End timestamp:"}),"object"===typeof C.endDate?C.endDate.toLocaleString():new Date(C.endDate).toLocaleString()]}),(0,k.jsxs)(u.Z.Field,{children:[(0,k.jsx)("label",{children:"Resource Id:"}),C.resourceId]})]})}),(0,k.jsx)(f.Z,{section:!0,horizontal:!0,children:(0,k.jsx)(h.Z,{as:"h5",textAlign:"center",children:"Simulation weighted metrics tree"})}),(0,k.jsx)(b.Z,{ref:T,width:"100%",height:"50vh",data:C.metricToSimulate,preferences:U,configurationProfile:!0})]})}),(0,k.jsx)(d.Z.Column,{children:(0,k.jsx)(u.Z,{children:(0,k.jsxs)(m.Z,{children:[(0,k.jsx)(h.Z,{as:"h3",textAlign:"center",children:" Simulation weights"}),(0,k.jsx)(u.Z.Group,{grouped:!0,children:(0,k.jsxs)(c.Z,{style:{marginLeft:"auto",marginRight:"auto"},textAlign:"center",compact:!0,collapsing:!0,celled:!0,selectable:!0,children:[(0,k.jsx)(j.Z,{tableHeaders:e}),function(){var e=-4;return(0,k.jsx)(c.Z.Body,{children:W.map((function(t){return function(e,t){return(0,k.jsxs)(c.Z.Row,{children:[(0,k.jsx)(c.Z.Cell,{children:e.metricName},t++),(0,k.jsx)(c.Z.Cell,{children:U.find((function(t){return t.metricId===e.metricId})).weight},t++),(0,k.jsx)(c.Z.Cell,{children:(0,k.jsx)(u.Z.Input,{name:"weight",metricid:e.metricId,onChange:te,required:!0,defaultValue:_[e.metricId],error:s&&!(0,w.Z)().validFloatBetweenZeroAndOne(_[e.metricId])?{content:"Please enter a float number where  0.0 <= number <= 1.0",pointing:"above"}:null})},t++)]},t++)}(t,e+=4)}))})}()]})}),(0,k.jsx)(u.Z.Button,{loading:L,color:"blue",circular:!0,type:"submit",floated:"right",onClick:function(e){return ae.apply(this,arguments)},children:"Simulate"}),(0,k.jsx)("br",{}),(0,k.jsx)("br",{})]})})})]}),(0,k.jsxs)(m.Z,{children:[L?(0,k.jsx)(g.Z,{active:!0,inline:"centered",children:" Performing simulation... Please Wait  "}):null,(0,k.jsx)("div",{style:{display:L?"none":"block"},children:(0,k.jsx)(D.Z,{plotPath:"simulateMetrics",plotData:H,startDate:"object"===typeof C.startDate?C.startDate:new Date(1e3*C.startDate),endDate:"object"===typeof C.endDate?C.endDate:new Date(1e3*C.endDate)})})]})]})}),(0,k.jsx)(S.Z,{successPath:"simulateMetrics",modalInfo:I})]})}},5051:function(e,t){t.Z=function(){return{validIntGreaterThanZero:function(e){return!!new RegExp("^[0]*[1-9][0-9]*$").test(e)},validIntGreaterOrEqualThanZero:function(e){return!!new RegExp("^[0-9]+$").test(e)},validFloatBetweenZeroAndOne:function(e){return!!new RegExp("(^0((\\.?)|(\\.[0-9]*))$)|(^1((\\.?)|(\\.0*))$)").test(e)},validStringOrDropDownSelection:function(e){return void 0!==e&&null!==e&&""!==e},validFloat:function(e){return!!new RegExp("^[0-9]+(\\.?)[0-9]*$").test(e)},validDropDownMultipleSelection:function(e){return 0!==e.length},validTimeStamp:function(e){if(null===e)return!1;var t=e.split("T");if(2!==t.length)return!1;var n=t[0].split("-"),r=t[1].split(":"),a=parseInt(n[1]),i=parseInt(n[2]);if(a<=7){if(a%2===0)if(2===a){if(function(e){if(e%4===0){if(e%100!==0)return!0;if(e%400===0)return!0}return!1}(parseInt(n[0]))){if(i>29)return!1}else if(i>28)return!1}else if(i>30)return!1}else if(a%2===1&&i>30)return!1;return!(r[2]>59)}}}},5409:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(4569),a=n.n(r);var i=function(){var e="http://192.168.1.68:8080/";return{getMetrics:function(e){return a().get("http://192.168.1.68:8080/getMetrics",{params:e}).then((function(e){return e.data.metrics})).catch((function(e){return console.log("Error:",e.message),null}))},getMetricById:function(t,n){var r=e+"getMetrics/"+t;return a().get(r).then((function(e){n(e.data.metric)})).catch((function(e){return console.log("Error:",e.message),null}))},createMetric:function(e){return a().post("http://192.168.1.68:8080/createMetric",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))},getDescriptions:function(e){return a().get("http://192.168.1.68:8080/getDescriptions",{params:e}).then((function(e){return e.data.descriptions})).catch((function(e){return console.log("Error:",e.message),null}))},getQualityModels:function(e,t){return a().get("http://192.168.1.68:8080/getQualityModels",{params:e}).then((function(e){t(e.data.qualityModels)})).catch((function(e){return console.log("Error:",e.message),null}))},getQualityModelById:function(t,n){var r=e+"getQualityModels/"+t;return a().get(r).then((function(e){n(e.data.qualityModel)})).catch((function(e){return console.log("Error:",e.message),null}))},createQualityModel:function(e){return a().post("http://192.168.1.68:8080/createQualityModel",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))},createConfigurationProfile:function(e){return a().post("http://192.168.1.68:8080/createConfigurationProfile",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))},getConfigurationProfileById:function(t,n){var r=e+"getConfigurationProfile/"+t;return a().get(r).then((function(e){n(e.data.configurationProfile)})).catch((function(e){return console.log("Error:",e.message),null}))},getActiveResources:function(e){return a().get("http://192.168.1.68:8080/getResources",{params:e}).then((function(e){return e.data.resources})).catch((function(e){return console.log("Error:",e.message),null}))},getResourceWeightsAndMetricsTree:function(t){var n=e+"getResources/"+t+"/weightedTree";return a().get(n).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),null}))},getConfigurationProfileListOfMetrics:function(t,n){var r=e+"getConfigurationProfile/"+t+"/listOfMetrics";return a().get(r,{params:n}).then((function(e){return e.data.listOfMetrics})).catch((function(e){return console.log("Error:",e.message),null}))},getResourceData:function(t,n){var r=e+"getResources/"+t+"/data";return a().get(r,{params:n}).then((function(e){return e.data.plotData})).catch((function(e){return console.log("Error:",e.message),null}))},getSimulationData:function(e){return a().patch("http://192.168.1.68:8080/simulateData",e).then((function(e){return e.data.simulationData})).catch((function(e){return console.log("Error:",e.message),null}))},getPlotsConfigs:function(){return a().get("http://192.168.1.68:8080/getPlotsConfigs").then((function(e){return e.data.plotsConfigs})).catch((function(e){return console.log("Error:",e.message),null}))},savePlotConfig:function(e){return a().post("http://192.168.1.68:8080/addPlotConfig",e).then((function(e){return e})).catch((function(e){return console.log("Error:",e.message),e.response}))},replacePlotConfig:function(e){return a().put("http://192.168.1.68:8080/replacePlotConfig",e).then((function(e){return e})).catch((function(e){return console.log("Error:",e.message),e.response}))},deletePlotConfig:function(t){var n=e+"deletePlotConfig/"+t;return a().delete(n).then((function(e){return e.status})).catch((function(e){return console.log("Error:",e.message),null}))},getRulesNames:function(e){return a().get("http://192.168.1.68:8080/getRules",{params:e}).then((function(e){return e.data.rulesNames})).catch((function(e){return console.log("Error:",e.message),null}))},getRuleCode:function(t){var n=e+"getRules/"+t;return a().get(n).then((function(e){return e.data.ruleDetail})).catch((function(e){return console.log("Error:",e.message),null}))},removeRule:function(t){var n=e+"removeRule/"+t;return a().delete(n).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),null}))},getActionsAndConfigsByResource:function(e){return a().get("http://192.168.1.68:8080/getActions/",{params:e}).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),null}))},createRule:function(e){return a().post("http://192.168.1.68:8080/addRule",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))}}}},5392:function(e,t,n){n.d(t,{Z:function(){return h}});var r=n(7762),a=n(885),i=n(2791),l=n(972),s=n(834),o=n(2836),c=n(2417),u=n(184);var d=function(e){var t=(0,i.useState)({text:e.text.toString().split("\n")[0]}),n=(0,a.Z)(t,2),r=n[0],l=n[1];return(0,i.useEffect)((function(){if(!0===e.node){var t=e.text.split("\n"),n=JSON.parse(JSON.stringify(r));n.text=t[0],t.length>1&&(n.weightLabel=t[1]),l(n)}}),[e.text]),!1===e.node?(0,u.jsxs)("g",{transform:"translate("+e.x+","+e.y+")",children:[(0,u.jsx)("circle",{fill:"white",stroke:"#4287f5",strokeWidth:"2",r:"20"}),(0,u.jsx)("text",{textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:e.text})]}):(0,u.jsxs)(i.Fragment,{children:[(0,u.jsx)("g",{transform:"translate("+e.x+","+e.y+")",children:(0,u.jsx)("text",{fill:"black",children:r.text})}),void 0!==r.weightLabel&&""!==r.weightLabel?(0,u.jsxs)("g",{transform:"translate("+e.x+","+e.y+")",children:[(0,u.jsx)("circle",{cx:e.x+e.width,cy:e.y+6*e.height,fill:"white",stroke:"#4287f5",strokeWidth:"2",r:"20"}),(0,u.jsx)("text",{textAnchor:"middle",dominantBaseline:"middle",x:e.x+e.width,y:e.y+6*e.height,fill:"black",children:r.weightLabel})]}):null]})};function f(e,t){var n=e.data,f=(0,i.useState)([]),h=(0,a.Z)(f,2),g=h[0],p=h[1],m=(0,i.useState)([]),x=(0,a.Z)(m,2),v=x[0],y=x[1],Z=(0,i.useState)(!1),b=(0,a.Z)(Z,2),j=b[0],w=b[1],D=(0,i.useRef)(),S=(0,i.useRef)(),k=e.configurationProfile,M=e.preferences,E=[],P=[];function I(e){var t={id:e.metricId.toString(),text:e.metricName};E.push(t);var n,a=(0,r.Z)(e.childMetrics);try{var i=function(){var t=n.value,r={id:e.metricId.toString()+t.metricId.toString(),from:t.metricId.toString(),to:e.metricId.toString()};k&&(r.text=M.find((function(e){return e.metricId===t.metricId})).weight),P.push(r),I(t)};for(a.s();!(n=a.n()).done;)i()}catch(l){a.e(l)}finally{a.f()}}(0,i.useEffect)((function(){if(I(n),k){var e=E.find((function(e){return parseInt(e.id)===n.metricId}));e.text=e.text.split("\n")[0]+"\n"+M.find((function(t){return t.metricId===parseInt(e.id)})).weight}p(E),y(P),w(!0)}),[n]),(0,i.useEffect)((function(){void 0!==S.current&&S.current.addEventListener("wheel",N,{passive:!1})}),[j]);var R=function(){D.current.zoomIn()},C=function(){D.current.zoomOut()};function N(e){!0===e.ctrlKey&&(e.preventDefault(),e.wheelDelta<0?C():R())}function A(e,t){var n,a=JSON.parse(JSON.stringify(v)),i=!1,l=(0,r.Z)(a);try{for(l.s();!(n=l.n()).done;){var s=n.value;if(s.id.endsWith(e)){i=!0,s.text=t,y(a),D.current.fitCanvas();break}}}catch(u){l.e(u)}finally{l.f()}if(!i){var o=JSON.parse(JSON.stringify(g)),c=o.find((function(t){return parseInt(t.id)===e}));c.text=c.text.split("\n")[0]+"\n"+t,p(o)}}return(0,i.useImperativeHandle)(t,(function(){return{updateWeightsHandler:A}})),!0===j?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{children:(0,u.jsxs)("p",{style:{marginBottom:"5px"},align:"right",children:[(0,u.jsx)(s.Z,{icon:!0,color:"blue",onClick:R,children:(0,u.jsx)(o.Z,{name:"zoom-in"})}),(0,u.jsx)(s.Z,{icon:!0,color:"blue",onClick:C,children:(0,u.jsx)(o.Z,{name:"zoom-out"})})]})}),(0,u.jsx)("div",{ref:S,children:(0,u.jsx)(l.Canvas,{disabled:!0,arrow:null,height:e.height,width:e.width,nodes:g,edges:v,readonly:!0,animated:!1,direction:"UP",ref:D,fit:!0,minZoom:-.9,zoomable:!1,node:(0,u.jsx)(l.Node,{style:{stroke:"black",fill:"#ffe6cc",strokeWidth:3},label:(0,u.jsx)(d,{node:!0})}),edge:(0,u.jsx)(l.Edge,{style:{stroke:"black",strokeWidth:2},label:(0,u.jsx)(d,{node:!1})})})})]}):(0,u.jsx)(c.Z,{active:!0,inline:"centered",children:" Constructing tree "})}var h=(0,i.forwardRef)(f)},8900:function(e,t,n){n.d(t,{Z:function(){return k}});var r=n(7462),a=n(4210),i=n(8182),l=n(2791),s=n(7826),o=n(6755),c=n(6246),u=n(5831);function d(e){var t=e.children,n=e.className,a=(0,i.Z)(n),s=(0,o.Z)(d,e),u=(0,c.Z)(d,e);return l.createElement(u,(0,r.Z)({},s,{className:a}),t)}d.handledProps=["as","children","className"],d.defaultProps={as:"tbody"},d.propTypes={};var f=d,h=n(570),g=n(2836);function p(e){var t=e.active,n=e.children,a=e.className,d=e.collapsing,f=e.content,h=e.disabled,m=e.error,x=e.icon,v=e.negative,y=e.positive,Z=e.selectable,b=e.singleLine,j=e.textAlign,w=e.verticalAlign,D=e.warning,S=e.width,k=(0,i.Z)((0,s.lG)(t,"active"),(0,s.lG)(d,"collapsing"),(0,s.lG)(h,"disabled"),(0,s.lG)(m,"error"),(0,s.lG)(v,"negative"),(0,s.lG)(y,"positive"),(0,s.lG)(Z,"selectable"),(0,s.lG)(b,"single line"),(0,s.lG)(D,"warning"),(0,s.X4)(j),(0,s.Ok)(w),(0,s.H0)(S,"wide"),a),M=(0,o.Z)(p,e),E=(0,c.Z)(p,e);return u.kK(n)?l.createElement(E,(0,r.Z)({},M,{className:k}),g.Z.create(x),f):l.createElement(E,(0,r.Z)({},M,{className:k}),n)}p.handledProps=["active","as","children","className","collapsing","content","disabled","error","icon","negative","positive","selectable","singleLine","textAlign","verticalAlign","warning","width"],p.defaultProps={as:"td"},p.propTypes={},p.create=(0,h.u5)(p,(function(e){return{content:e}}));var m=p;function x(e){var t=e.children,n=e.className,a=e.content,d=e.fullWidth,f=(0,i.Z)((0,s.lG)(d,"full-width"),n),h=(0,o.Z)(x,e),g=(0,c.Z)(x,e);return l.createElement(g,(0,r.Z)({},h,{className:f}),u.kK(t)?a:t)}x.handledProps=["as","children","className","content","fullWidth"],x.defaultProps={as:"thead"},x.propTypes={};var v=x;function y(e){var t=e.as,n=(0,o.Z)(y,e);return l.createElement(v,(0,r.Z)({},n,{as:t}))}y.handledProps=["as"],y.propTypes={},y.defaultProps={as:"tfoot"};var Z=y;function b(e){var t=e.as,n=e.className,a=e.sorted,c=(0,i.Z)((0,s.cD)(a,"sorted"),n),u=(0,o.Z)(b,e);return l.createElement(m,(0,r.Z)({},u,{as:t,className:c}))}b.handledProps=["as","className","sorted"],b.propTypes={},b.defaultProps={as:"th"};var j=b;function w(e){var t=e.active,n=e.cellAs,d=e.cells,f=e.children,h=e.className,g=e.disabled,p=e.error,x=e.negative,v=e.positive,y=e.textAlign,Z=e.verticalAlign,b=e.warning,j=(0,i.Z)((0,s.lG)(t,"active"),(0,s.lG)(g,"disabled"),(0,s.lG)(p,"error"),(0,s.lG)(x,"negative"),(0,s.lG)(v,"positive"),(0,s.lG)(b,"warning"),(0,s.X4)(y),(0,s.Ok)(Z),h),D=(0,o.Z)(w,e),S=(0,c.Z)(w,e);return u.kK(f)?l.createElement(S,(0,r.Z)({},D,{className:j}),(0,a.Z)(d,(function(e){return m.create(e,{defaultProps:{as:n}})}))):l.createElement(S,(0,r.Z)({},D,{className:j}),f)}w.handledProps=["active","as","cellAs","cells","children","className","disabled","error","negative","positive","textAlign","verticalAlign","warning"],w.defaultProps={as:"tr",cellAs:"td"},w.propTypes={},w.create=(0,h.u5)(w,(function(e){return{cells:e}}));var D=w;function S(e){var t=e.attached,n=e.basic,d=e.celled,h=e.children,g=e.className,p=e.collapsing,m=e.color,x=e.columns,y=e.compact,b=e.definition,j=e.fixed,w=e.footerRow,k=e.headerRow,M=e.headerRows,E=e.inverted,P=e.padded,I=e.renderBodyRow,R=e.selectable,C=e.singleLine,N=e.size,A=e.sortable,H=e.stackable,G=e.striped,T=e.structured,O=e.tableData,z=e.textAlign,L=e.unstackable,B=e.verticalAlign,F=(0,i.Z)("ui",m,N,(0,s.lG)(d,"celled"),(0,s.lG)(p,"collapsing"),(0,s.lG)(b,"definition"),(0,s.lG)(j,"fixed"),(0,s.lG)(E,"inverted"),(0,s.lG)(R,"selectable"),(0,s.lG)(C,"single line"),(0,s.lG)(A,"sortable"),(0,s.lG)(H,"stackable"),(0,s.lG)(G,"striped"),(0,s.lG)(T,"structured"),(0,s.lG)(L,"unstackable"),(0,s.sU)(t,"attached"),(0,s.sU)(n,"basic"),(0,s.sU)(y,"compact"),(0,s.sU)(P,"padded"),(0,s.X4)(z),(0,s.Ok)(B),(0,s.H0)(x,"column"),"table",g),J=(0,o.Z)(S,e),W=(0,c.Z)(S,e);if(!u.kK(h))return l.createElement(W,(0,r.Z)({},J,{className:F}),h);var K={defaultProps:{cellAs:"th"}},q=(k||M)&&l.createElement(v,null,D.create(k,K),(0,a.Z)(M,(function(e){return D.create(e,K)})));return l.createElement(W,(0,r.Z)({},J,{className:F}),q,l.createElement(f,null,I&&(0,a.Z)(O,(function(e,t){return D.create(I(e,t))}))),w&&l.createElement(Z,null,D.create(w)))}S.handledProps=["as","attached","basic","celled","children","className","collapsing","color","columns","compact","definition","fixed","footerRow","headerRow","headerRows","inverted","padded","renderBodyRow","selectable","singleLine","size","sortable","stackable","striped","structured","tableData","textAlign","unstackable","verticalAlign"],S.defaultProps={as:"table"},S.propTypes={},S.Body=f,S.Cell=m,S.Footer=Z,S.Header=v,S.HeaderCell=j,S.Row=D;var k=S}}]);
//# sourceMappingURL=811.05685c62.chunk.js.map