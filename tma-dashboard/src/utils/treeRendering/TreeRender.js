import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas, Edge, Node, Label } from 'reaflow';
import {Loader, Button, Icon} from "semantic-ui-react"
import TreeLabel from "./TreeLabel"


function TreeRender (props,ref) {
    const data = props["data"];
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [treeReady,setTreeReady] = useState(false);
    const canvasRef = useRef();
    const canvasDivRef = useRef();

    //If it is to render a configuration profile, show the weights
    const configurationProfile = props["configurationProfile"];
    const preferences = props["preferences"];
    
    //Use of auxiliar variables to hold nodes and edges information while that information is being retrieved
    //Later, once all the information is retrieved, use state variables "edges" and "nodes" to render 
    var nodesaux = [];
    var edgesaux = [];
    
    //function that allows formating received data into the format requested by reaflow (tree rendering library)
    function processData(parent){

      //add current node (which is the parent) to list of nodes
      let nodeToAdd = {
        id: parent["metricId"].toString(),
        text: parent["metricName"]
      }
      nodesaux.push(nodeToAdd);

      //iterate over each child of parent node, add edge information and recursively call this function "processData"
      //for each child to repeat the process
      for(let child of parent["childMetrics"]){
        let edgeToAdd = {
          id: parent["metricId"].toString() + child["metricId"].toString(),
          from: child["metricId"].toString(),
          to: parent["metricId"].toString(),
        }
        if(configurationProfile){
          edgeToAdd.text = preferences.find(preference => preference.metricId === child.metricId).weight;
        }
        edgesaux.push(edgeToAdd)
        processData(child)
      }
    }
    
    useEffect(() => {
        //Once the component is rendered, deal with the transformation of the format of the data received from the API 
        //into the format needed by the tree library 
        processData(data)
        if(configurationProfile){
          let rootNode = nodesaux.find(node => parseInt(node.id) === data.metricId)
          rootNode.text = rootNode.text.split("\n")[0] + "\n" + 
            preferences.find(preference => preference.metricId === parseInt(rootNode.id)).weight;
        }
        //use state to set and render processed nodes and edges information  
        setNodes(nodesaux)
        setEdges(edgesaux)
        setTreeReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data]);

    useEffect(() => {
      //if the Tree has been rendered, the div is no longer undefined and thereby wheel event can be added
      // to later allow CRTL + MOUSEWHEEl to zoom in/out on the canvas, if buttons aren't wished to be used
      if(canvasDivRef.current !== undefined){
        canvasDivRef.current.addEventListener('wheel', mouseWheelHandler,{passive:false});
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[treeReady]);
    
    const zoomIn = () => {
      canvasRef.current.zoomIn()
    }

    const zoomOut = () => {
      canvasRef.current.zoomOut()
    }

    const fitCanvas = () => {
      canvasRef.current.fitCanvas()
    }

    function mouseWheelHandler(event){
      if(event.ctrlKey === true){
        event.preventDefault();
        //Wheel down
        if(event.wheelDelta < 0) {
            zoomOut()
        }
        //Wheel up
        else {
          zoomIn()
        }
      }
    }

    function updateWeightsHandler(metricIdToUpdateWeight,weightToApply){
      let newEdges = JSON.parse(JSON.stringify(edges))
      let foundEdge = false
      for(let edgeInfo of newEdges){
        if(edgeInfo.id.endsWith(metricIdToUpdateWeight)){
          foundEdge = true
          edgeInfo.text = weightToApply
          setEdges(newEdges)
          fitCanvas()
          break;
        }
      }
      //didn't found Edge, which means the weight its being applied on the root node. Thereby, add an extra label to
      //show the node's weight assigned
      if(!foundEdge){
        //copy state variable and find the node to which the extra label will be added
        let newNodes = JSON.parse(JSON.stringify(nodes))
        let nodeRef = newNodes.find(node => parseInt(node.id) === metricIdToUpdateWeight)
        //after finding the node split its display text by '\n' and take the 1st word which is the original text. Then, add the
        //text of the weight to show on the extra label. This split by '\n' is needed as multiple changes would add multiple
        //'\n' to the text and that would render multiple extra labels
        nodeRef.text = nodeRef.text.split("\n")[0] + "\n" + weightToApply
        setNodes(newNodes)
      }
    }

    //Needed to expose tree update functions to outside components
    useImperativeHandle(ref, () => ({
      updateWeightsHandler
    }));

    //Followed the demos and docs of reaflow libray at https://reaflow.dev/?path=/story/docs-getting-started-components--page
    return (
      treeReady === true ?
      <div>
        <div>
          <p style={{marginBottom:"5px"}} align="right">
            <Button icon color='blue' onClick={zoomIn}> 
              <Icon name='zoom-in'/>
            </Button>
            <Button icon color='blue' onClick={zoomOut}> 
              <Icon name='zoom-out'/>
            </Button>
          </p>
        </div>  
        <div ref={canvasDivRef}>
          <Canvas
              disabled={true}
              arrow={null}
              height={ props["height"]}
              width={ props["width"]}
              nodes={nodes}
              edges={edges}
              readonly = {true}
              animated = {false}
              direction= "UP"
              ref= {canvasRef}
              fit = {true}
              minZoom = {-0.9}
              zoomable = {false}
              node={
                <Node
                  style={{ stroke: 'black', fill: '#ffe6cc', strokeWidth: 3}}
                  label={<TreeLabel node={true}/>}
                />
              }
              edge={<Edge 
                      style={{ stroke: 'black', strokeWidth: 2 }}
                      label={<TreeLabel node={false}/>}
                    />}
          />
          {/* NODE LABEL:            label={<Label style={{ fill: 'black', fontWeight: "900"}}>*/ }
        </div> 
      </div>: <Loader active inline='centered'> Constructing tree </Loader>
    )
}

//forwardRef necessary so that methods can be invoked and state variables be accessed
export default forwardRef(TreeRender);