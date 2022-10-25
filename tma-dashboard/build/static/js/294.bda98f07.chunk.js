"use strict";(self.webpackChunktma_dashboard=self.webpackChunktma_dashboard||[]).push([[294],{6117:function(e,n,t){var r=t(1413),i=t(885),o=t(2791),a=t(6739),l=t(1460),c=t(834),s=t(6871),u=t(184);n.Z=function(e){var n=(0,s.s0)(),t=(0,o.useState)({successPath:e.successPath,openModal:!1,messageType:null,message:null}),d=(0,i.Z)(t,2),h=d[0],x=d[1];function p(t,i){"success"===h.messageType&&n(h.successPath),e.modalInfo.openModal=!1,x((0,r.Z)((0,r.Z)({},h),{},{openModal:!1}))}return(0,o.useEffect)((function(){x((0,r.Z)((0,r.Z)({},h),{},{openModal:e.modalInfo.openModal,messageType:e.modalInfo.messageType,message:e.modalInfo.message}))}),[e]),(0,u.jsxs)(a.Z,{centered:!1,closeIcon:!0,open:h.openModal,onClose:p,children:[(0,u.jsx)(a.Z.Header,{children:"Message"}),(0,u.jsx)(a.Z.Content,{children:(0,u.jsx)(l.Z,{color:"success"===h.messageType?"green":"warning"===h.messageType?"orange":"red",children:(0,u.jsx)(l.Z.Header,{children:h.message})})}),(0,u.jsx)(a.Z.Actions,{children:(0,u.jsx)(c.Z,{color:"grey",onClick:p,children:"Close"})})]})}},4829:function(e,n,t){var r=t(8900),i=t(184);n.Z=function(e){var n=0;return(0,i.jsx)(r.Z.Header,{children:(0,i.jsx)(r.Z.Row,{children:e.tableHeaders.map((function(e){return function(e){return(0,i.jsxs)(r.Z.HeaderCell,{children:[" ",e]},n++)}(e)}))})})}},7294:function(e,n,t){t.r(n);var r=t(5861),i=t(885),o=t(7757),a=t.n(o),l=t(2417),c=t(899),s=t(9402),u=t(4581),d=t(4863),h=t(2966),x=t(2836),p=t(6605),f=t(8900),Z=t(834),g=t(2025),j=t(5409),v=t(2791),m=t(2043),b=t(5051),S=t(5392),y=t(4829),C=t(6117),w=t(184);n.default=function(e){var n=(0,v.useState)(1),t=(0,i.Z)(n,2),o=t[0],k=t[1],O=(0,v.useState)(!1),I=(0,i.Z)(O,2),L=I[0],D=I[1],N=(0,v.useState)({resourceId:null,ruleName:null,metricId:"",operator:"",activationThreshold:"",actionList:[]}),R=(0,i.Z)(N,2),A=R[0],P=R[1],T=(0,v.useState)(null),J=(0,i.Z)(T,2),M=J[0],B=J[1],q=(0,v.useState)(null),G=(0,i.Z)(q,2),H=G[0],E=G[1],V=(0,v.useState)(null),F=(0,i.Z)(V,2),W=F[0],z=F[1],_=(0,v.useState)(null),K=(0,i.Z)(_,2),Q=K[0],U=K[1],X=[{key:0,value:"<",text:"<"},{key:1,value:">",text:">"},{key:2,value:">=",text:">="},{key:3,value:"<=",text:"<="},{key:4,value:"==",text:"=="},{key:5,value:"!=",text:"!="}],Y=(0,v.useState)(null),$=(0,i.Z)(Y,2),ee=$[0],ne=$[1],te=(0,v.useState)(null),re=(0,i.Z)(te,2),ie=re[0],oe=re[1],ae=(0,v.useState)(null),le=(0,i.Z)(ae,2),ce=le[0],se=le[1],ue=["Execution Order","Action Id","Action Name","Options"],de=["Action Id","Key Name","Value"],he=(0,v.useState)({openModal:!1}),xe=(0,i.Z)(he,2),pe=xe[0],fe=xe[1];function Ze(e,n){var t=JSON.parse(JSON.stringify(A));t[n.name]=n.value,P(t)}function ge(e){return je.apply(this,arguments)}function je(){return(je=(0,r.Z)(a().mark((function e(n){var t,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!(0,b.Z)().validStringOrDropDownSelection(A.resourceId)){e.next=16;break}return D(!1),k(2),e.next=6,(0,j.Z)().getResourceWeightsAndMetricsTree(A.resourceId);case 6:return t=e.sent,E(t.configurationProfile),z(t.qualityModel),r={leafAttributes:!1},e.next=12,(0,j.Z)().getConfigurationProfileListOfMetrics(t.configurationProfile.configurationProfileId,r);case 12:t=e.sent,(0,m.Z)().convertMetrics(t,U),e.next=17;break;case 16:D(!0);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ve(e){return me.apply(this,arguments)}function me(){return(me=(0,r.Z)(a().mark((function e(n){var t,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!(0,b.Z)().validStringOrDropDownSelection(A.ruleName)){e.next=14;break}if(!(0,b.Z)().validStringOrDropDownSelection(A.metricId)){e.next=14;break}if(!(0,b.Z)().validStringOrDropDownSelection(A.operator)){e.next=14;break}if(!(0,b.Z)().validFloatBetweenZeroAndOne(A.activationThreshold)){e.next=14;break}return D(!1),k(3),t={resourceId:A.resourceId},e.next=10,(0,j.Z)().getActionsAndConfigsByResource(t);case 10:return r=e.sent,ne(r.actions),(0,m.Z)().convertActions(r.actions,oe),e.abrupt("return");case 14:D(!0);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function be(e,n){if(e.preventDefault(),e.stopPropagation(),!(A.actionList.filter((function(e){return e.actionId===ce})).length>0)){var t=JSON.parse(JSON.stringify(ie));t.filter((function(e){return e.value===ce}))[0].chosen="true";var r=JSON.parse(JSON.stringify(A));r.actionList.push(ee.filter((function(e){return e.actionId===ce}))[0]),P(r),oe(t)}}function Se(e,n){oe((function(e){var t=JSON.parse(JSON.stringify(e));return t.filter((function(e){return e.value===n.actionid}))[0].chosen="false",t})),P((function(e){var t=JSON.parse(JSON.stringify(e));return t.actionList.splice(n.index,1),t}))}function ye(e,n){var t=JSON.parse(JSON.stringify(A)),r=t.actionList[n.index-1];t.actionList[n.index-1]=t.actionList[n.index],t.actionList[n.index]=r,P(t)}function Ce(e,n){var t=JSON.parse(JSON.stringify(A)),r=t.actionList[n.index+1];t.actionList[n.index+1]=t.actionList[n.index],t.actionList[n.index]=r,P(t)}function we(e,n){e.preventDefault(),e.stopPropagation();var t=JSON.parse(JSON.stringify(A));t.actionList[n.actionindex].configurations[n.configurationindex].value=n.value,P(t)}function ke(e){return Oe.apply(this,arguments)}function Oe(){return(Oe=(0,r.Z)(a().mark((function e(n){var t,r,i,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),t=!0,!(A.actionList.length>0)){e.next=19;break}r=0;case 4:if(!(r<A.actionList.length&&!0===t)){e.next=17;break}if(null===A.actionList[r].configurations){e.next=14;break}i=0;case 7:if(!(i<A.actionList[r].configurations.length)){e.next=14;break}if(A.actionList[r].configurations[i].hasOwnProperty("value")&&(0,b.Z)().validStringOrDropDownSelection(A.actionList[r].configurations[i].value)){e.next=11;break}return t=!1,e.abrupt("break",14);case 11:i++,e.next=7;break;case 14:r++,e.next=4;break;case 17:e.next=20;break;case 19:t=!1;case 20:if(!t){e.next=28;break}return D(!1),e.next=24,(0,j.Z)().createRule(A);case 24:return(o=e.sent).openModal=!0,fe(o),e.abrupt("return");case 28:D(!0);case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ie(){for(var e=[],n=0,t=0;t<A.actionList.length;t++)e.push((0,w.jsxs)(f.Z.Row,{children:[(0,w.jsx)(f.Z.Cell,{children:t+1}),(0,w.jsx)(f.Z.Cell,{children:A.actionList[t].actionId}),(0,w.jsx)(f.Z.Cell,{children:A.actionList[t].actionName}),(0,w.jsxs)(f.Z.Cell,{children:[0===t?null:(0,w.jsx)(Z.Z,{icon:!0,color:"blue",index:t,onClick:ye,children:(0,w.jsx)(x.Z,{name:"angle double up"})}),t===A.actionList.length-1?null:(0,w.jsx)(Z.Z,{icon:!0,color:"teal",index:t,onClick:Ce,children:(0,w.jsx)(x.Z,{name:"angle double down"})}),(0,w.jsx)(Z.Z,{icon:!0,color:"red",index:t,actionid:A.actionList[t].actionId,onClick:Se,children:(0,w.jsx)(x.Z,{name:"delete"})})]})]},n)),n++;return e}function Le(){for(var e=[],n=0,t=0;t<A.actionList.length;t++)if(null!==A.actionList[t].configurations)for(var r=0;r<A.actionList[t].configurations.length;r++)e.push((0,w.jsxs)(f.Z.Row,{children:[(0,w.jsx)(f.Z.Cell,{children:A.actionList[t].actionId}),(0,w.jsx)(f.Z.Cell,{children:A.actionList[t].configurations[r].keyName}),(0,w.jsx)(f.Z.Cell,{children:(0,w.jsx)(s.Z.Input,{name:"value",actionindex:t,configurationindex:r,onChange:we,required:!0,error:L&&!(0,b.Z)().validStringOrDropDownSelection(A.actionList[t].configurations[r].value)?{content:"Please enter a value for this configuration",pointing:"above"}:null})})]},n)),n++;return e}return(0,v.useEffect)((function(){function e(){return(e=(0,r.Z)(a().mark((function e(){var n,t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={createRule:"true"},e.next=3,(0,j.Z)().getActiveResources(n);case 3:t=e.sent,(0,m.Z)().convertResources(t,B);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),(0,w.jsxs)("div",{children:[(0,w.jsx)(u.Z,{centered:!0,children:(0,w.jsx)(u.Z.Row,{children:(0,w.jsx)(u.Z.Column,{children:(0,w.jsx)(h.Z,{section:!0,horizontal:!0,children:(0,w.jsx)(d.Z,{as:"h1",textAlign:"center",children:"Create Adaptation Rule"})})})})}),(0,w.jsx)("br",{}),(0,w.jsxs)(p.Z,{children:[(0,w.jsxs)(g.Z.Group,{ordered:!0,widths:3,children:[(0,w.jsx)(g.Z,{completed:o>1,link:!0,onClick:function(){k(1),function(){var e={resourceId:A.resourceId,ruleName:null,metricId:"",operator:"",activationThreshold:"",actionList:[]};P(e),D(!1)}()},children:(0,w.jsxs)(g.Z.Content,{children:[(0,w.jsx)(g.Z.Title,{children:"Rule's resource "}),(0,w.jsx)(g.Z.Description,{children:"Select a resource for a rule to apply"})]})}),(0,w.jsx)(g.Z,{completed:o>2,disabled:o<2,link:!0,onClick:function(){k(2),function(){var e=JSON.parse(JSON.stringify(A));e.actionList=[],P(e),D(!1)}()},children:(0,w.jsxs)(g.Z.Content,{children:[(0,w.jsx)(g.Z.Title,{children:"Rule's name and condition"}),(0,w.jsx)(g.Z.Description,{children:"Define the name of the adaptation rule and the condition that triggers it"})]})}),(0,w.jsx)(g.Z,{disabled:o<3,link:!0,children:(0,w.jsxs)(g.Z.Content,{children:[(0,w.jsx)(g.Z.Title,{children:"Rule's adaptation plan"}),(0,w.jsx)(g.Z.Description,{children:"Define the actions, and their configurations, of the plan to execute when the condition is triggered"})]})})]}),null===M?(0,w.jsxs)("div",{children:[(0,w.jsx)(l.Z,{active:!0,inline:"centered",children:" Retrieving content "}),(0,w.jsx)("br",{})]}):function(){switch(o){case 1:return(0,w.jsx)("div",{children:null===M?(0,w.jsx)(l.Z,{active:!0,inline:"centered",children:" Retrieving content "}):(0,w.jsx)(c.Z,{compact:!0,style:{marginLeft:"auto",marginRight:"auto"},children:(0,w.jsx)(s.Z,{children:(0,w.jsxs)(s.Z.Group,{grouped:!0,children:[(0,w.jsx)(s.Z.Dropdown,{selectOnBlur:!1,selectOnNavigation:!1,defaultValue:null!==A.resourceId?A.resourceId:null,required:!0,clearable:!0,search:!0,selection:!0,options:M,placeholder:"Filter active resources by something",label:"Choose an active Resource",name:"resourceId",onChange:Ze,error:L&&!(0,b.Z)().validStringOrDropDownSelection(A.resourceId)?{content:"Please choose a Resource",pointing:"above"}:null}),(0,w.jsx)(s.Z.Button,{color:"blue",floated:"right",circular:!0,type:"submit",onClick:ge,children:"Confirm"})]})})})});case 2:return(0,w.jsx)("div",{children:null!==Q?(0,w.jsxs)(u.Z,{stackable:!0,columns:2,children:[(0,w.jsx)(u.Z.Column,{children:(0,w.jsxs)(c.Z,{children:[(0,w.jsx)(d.Z,{as:"h3",textAlign:"center",children:" Weighted metrics tree"}),(0,w.jsx)(h.Z,{}),(0,w.jsx)(S.Z,{width:"100%",height:"50vh",preferences:H.preferences,data:W.metric,configurationProfile:!0})]})}),(0,w.jsx)(u.Z.Column,{children:(0,w.jsx)(c.Z,{style:{marginLeft:"auto",marginRight:"auto"},children:(0,w.jsxs)(s.Z,{widths:"equal",children:[(0,w.jsxs)(s.Z.Group,{children:[(0,w.jsx)(s.Z.Input,{required:!0,defaultValue:A.ruleName,name:"ruleName",label:"Rule name",onChange:Ze,error:L&&!(0,b.Z)().validStringOrDropDownSelection(A.ruleName)?{content:"Please enter a name for the Rule",pointing:"above"}:null}),(0,w.jsx)(s.Z.Dropdown,{selectOnBlur:!1,selectOnNavigation:!1,defaultValue:null!==A.metricId?A.metricId:null,required:!0,clearable:!0,search:!0,selection:!0,options:Q,placeholder:"Filter metrics by something",label:"Metric to apply the rule",name:"metricId",onChange:Ze,error:L&&!(0,b.Z)().validStringOrDropDownSelection(A.metricId)?{content:"Please choose a Metric on which the rule will be applied",pointing:"above"}:null})]}),(0,w.jsxs)(s.Z.Group,{children:[(0,w.jsx)(s.Z.Dropdown,{selectOnBlur:!1,selectOnNavigation:!1,defaultValue:null!==A.operator?A.operator:null,required:!0,clearable:!0,selection:!0,options:X,label:"Condition Operator",name:"operator",onChange:Ze,error:L&&!(0,b.Z)().validStringOrDropDownSelection(A.operator)?{content:"Please choose an operator for the rule condition",pointing:"above"}:null}),(0,w.jsx)(s.Z.Input,{required:!0,defaultValue:A.activationThreshold,name:"activationThreshold",label:"Condition activation threshold",onChange:Ze,error:L&&!(0,b.Z)().validFloatBetweenZeroAndOne(A.activationThreshold)?{content:"Please enter an activation threshold between 0 and 1 as a float number (p.e. 0.33)",pointing:"above"}:null})]}),(0,w.jsx)(h.Z,{horizontal:!0,section:!0,children:(0,w.jsxs)(d.Z,{as:"h5",textAlign:"center",children:["Rule condition Preview",(0,w.jsx)(x.Z,{name:"arrow down"})]})}),(0,w.jsx)(p.Z,{children:(0,w.jsx)(c.Z,{compact:!0,style:{margin:"auto"},children:(0,w.jsx)("code",{style:{whiteSpace:"pre-wrap",color:"#0057b3"},children:"resourceId == ".concat(A.resourceId," && score.get(").concat(A.metricId,") ").concat(A.operator," ").concat(A.activationThreshold)})})}),(0,w.jsx)(s.Z.Group,{children:(0,w.jsx)(s.Z.Button,{color:"blue",floated:"right",circular:!0,type:"submit",onClick:ve,children:"Confirm"})})]})})})]}):(0,w.jsx)(l.Z,{active:!0,inline:"centered",children:" Retrieving content "})});case 3:return(0,w.jsx)("div",{children:null!==ie?(0,w.jsxs)("div",{children:[(0,w.jsx)(u.Z,{columns:1,children:(0,w.jsx)(u.Z.Column,{children:(0,w.jsx)(Z.Z,{color:"grey",circular:!0,floated:"right",onClick:ke,children:" Create Rule"})})}),(0,w.jsxs)(u.Z,{doubling:!0,stackable:!0,columns:2,children:[(0,w.jsx)(u.Z.Column,{children:(0,w.jsxs)(c.Z,{style:{marginLeft:"auto",marginRight:"auto"},children:[(0,w.jsx)(d.Z,{as:"h5",textAlign:"center",children:" Configure adaptation plan actions"}),(0,w.jsx)(h.Z,{}),ie.filter((function(e){return"false"===e.chosen})).length>0?(0,w.jsxs)(s.Z,{widths:"equal",children:[(0,w.jsx)(s.Z.Group,{children:(0,w.jsx)(s.Z.Dropdown,{onChange:function(e,n){se(n.value)},selectOnBlur:!1,selectOnNavigation:!1,required:!0,selection:!0,options:ie.filter((function(e){return"false"===e.chosen})),label:"Add actions to the adaptation plan",name:"actionList",error:L&&!(0,b.Z)().validDropDownMultipleSelection(A.actionList)?{content:"Please choose, at least, one action for the adaptation",pointing:"above"}:null})}),(0,w.jsx)(s.Z.Group,{children:(0,w.jsxs)(s.Z.Button,{color:"blue",floated:"right",circular:!0,type:"submit",onClick:be,children:[(0,w.jsx)(x.Z,{name:"plus"}),"Add Action"]})})]}):null,(0,w.jsxs)(f.Z,{textAlign:"center",compact:!0,celled:!0,selectable:!0,children:[(0,w.jsx)(y.Z,{tableHeaders:ue}),(0,w.jsx)(f.Z.Body,{children:Ie()})]})]})}),(0,w.jsx)(u.Z.Column,{children:(0,w.jsxs)(c.Z,{style:{marginLeft:"auto",marginRight:"auto"},children:[(0,w.jsx)(d.Z,{as:"h5",textAlign:"center",children:" Necessary actions' configurations"}),(0,w.jsx)(h.Z,{}),(0,w.jsx)(s.Z,{children:(0,w.jsxs)(f.Z,{textAlign:"center",compact:!0,celled:!0,selectable:!0,children:[(0,w.jsx)(y.Z,{tableHeaders:de}),(0,w.jsx)(f.Z.Body,{children:Le()})]})})]})})]}),(0,w.jsx)(C.Z,{successPath:"/getAdaptationRules",modalInfo:pe})]}):(0,w.jsx)(l.Z,{active:!0,inline:"centered",children:" Retrieving content "})});default:return(0,w.jsx)("h1",{children:"ERROR!!!!!!!! SOMETHING WENT WRONG!"})}}()]})]})}}}]);
//# sourceMappingURL=294.bda98f07.chunk.js.map