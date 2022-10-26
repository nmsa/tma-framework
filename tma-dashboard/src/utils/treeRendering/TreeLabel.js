import React, { useEffect, useState } from "react";

function TreeLabel(props){
    const [extraLabelForNodes, setExtraLabelForNodes] = useState(
            {
                text: (props["text"].toString().split("\n")[0])
            }
        )

    useEffect(()=>{
        //if this is a node's label, it might be needed to add an extra label to represent weights. Thereby, check if this is
        // a node's label and then split received text by "\n". If the size is > 1, it means it has an extra label to render.
        //Then, save both texts, the original and the extra label. In the return statement add extra label if its set on the 
        //state variable
        if(props.node === true){
            let labelsText = props.text.split("\n")
            let extraLabelForNodesTemp = JSON.parse(JSON.stringify(extraLabelForNodes))
            extraLabelForNodesTemp.text = labelsText[0]
            if(labelsText.length > 1){
                extraLabelForNodesTemp.weightLabel = labelsText[1]
            }
            setExtraLabelForNodes(extraLabelForNodesTemp)
        }    
    },[props.text])
    
    //Default customization of <Canvas> tag from reaflow library generated graphically bad labels. The examples were followed and
    //used for edge property => <Edge 
    //                    style={{ stroke: 'black', strokeWidth: 2 }}
    //                    label={<Label style={{ fill: 'red', fontWeight: "900"}} />}
    //                  />}
    //Thereby html tags generated with the default configs were analyzed, and found out the node graphs were being 
    //generated with SVG. 
    //Next, props being passed to the label were analyzed to understand the way the library renders the graph. Found 
    //out 'transform="translate(x,y)" was used to position the labels.
    //All the information passed to the label is retrieved from the props, which are the 'x' and 'y' assigned positions 
    //for the label inside the canvas, and the 'text' which the label presents on the screen.
    //Finally, used svg elements to customize the labels in a own way. 
    return props["node"] === false ?
        <g transform={"translate(" + props.x + "," + props.y + ")"}> 
            <circle fill="white" stroke="#4287f5" strokeWidth="2" r="20" /> 
            <text textAnchor="middle" dominantBaseline = "middle" fill="black">{props.text}</text>   
        </g>
        : 
        (
            <React.Fragment>
                <g transform={"translate(" + props.x + "," + props.y + ")"}> 
                    <text fill="black">{extraLabelForNodes.text}</text>   
                </g>
                {
                    extraLabelForNodes.weightLabel !== undefined && extraLabelForNodes.weightLabel !== "" ?
                    <g transform={"translate(" + props.x + "," + props.y + ")"}> 
                        <circle cx= {props.x + props.width} cy={props.y + 6*props.height} fill="white" stroke="#4287f5" strokeWidth="2" r="20" />
                        <text 
                            textAnchor="middle"
                            dominantBaseline = "middle"
                            x={props.x + props.width} 
                            y={props.y + 6*props.height} 
                            fill="black">
                                {extraLabelForNodes.weightLabel}
                        </text>      
                    </g>
                    :null
                }               
            </React.Fragment>
        ) 
}

export default TreeLabel;