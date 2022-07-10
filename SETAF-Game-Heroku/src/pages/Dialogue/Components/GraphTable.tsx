import React, {useEffect, useState} from "react";
import Graph from "react-graph-vis";
import SETAF from "../../../structure/model_SETAF/SETAF";
import {Argument} from "../../../structure/model_SETAF/Argument";


interface IProps {
    SETAF: SETAF
}

const GraphTable: React.FC<IProps> = (props) => {

    const initGraph = (SETAF: SETAF) => {
        let arrArg: any = [];
        let arrAtt: any = [];
        let currentIndex = 0;
        const listOfArgument = [...SETAF.getListOfArguments()]
        const listOfRelation = [...SETAF.getListOfRelations()]

        listOfArgument.forEach((j) => {
            j.forEach((i: Argument) => {
                currentIndex += 1;
                arrArg.push({
                    id: i.getDescription(),
                    label: 'Arg:' + i.getDescription(),
                    font: {color: '#ffffff'},
                    color: '#0099ff'
                })
            })

        });
        currentIndex = 0;
        listOfRelation.forEach((value) => {
            currentIndex += 1;
            arrArg.push({id: currentIndex, label: 'r' + currentIndex, font: {color: '#ffffff'}, color: '#ff3300'});
            value.getOrigin().forEach((i: Argument) => {
                arrAtt.push({from: i.getDescription(), to: currentIndex, color: '#0099ff'});
                arrAtt.push({
                    from: currentIndex,
                    to: value.getTarget().values().next().value.getDescription(),
                    color: '#ff3300'
                })
            });
        });
        return {arrArg, arrAtt}
    };

    const {SETAF} = props;
    const {arrArg, arrAtt} = initGraph(SETAF);
    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        },
    };
    const [state, setState] = useState({
        graph: {
            nodes: [],
            edges: [],
        },
        events: {
            // select: ({nodes, edges}:any) => {
            //     // console.log("Selected nodes:");
            //     // console.log(nodes);
            //     // console.log("Selected edges:");
            //     // console.log(edges);
            //     // alert("Selected node: " + nodes);
            // },
            // doubleClick: ({pointer: {canvas}}: any) => {
            //     // createNode(canvas.x, canvas.y);
            // }
        }
    })
    const {graph, events} = state;
    useEffect(() => {
        setState({
            graph: {
                nodes: arrArg,
                edges: arrAtt,
            },
            events: {
                // select: ({nodes, edges}:any) => {
                //     // console.log("Selected nodes:");
                //     // console.log(nodes);
                //     // console.log("Selected edges:");
                //     // console.log(edges);
                //     // alert("Selected node: " + nodes);
                // },
                // doubleClick: ({pointer: {canvas}}: any) => {
                //     // createNode(canvas.x, canvas.y);
                // }
            }
        })
    }, [SETAF]);
    return (
        <Graph
            style={{flex: 4, height: "640px"}}
            graph={graph}
            events={events}
            options={options}
            getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />

    )
}

export default GraphTable
