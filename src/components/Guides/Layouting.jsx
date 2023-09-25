import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, MiniMap, Controls, Panel, NodeToolbar, NodeResizer, applyEdgeChanges, applyNodeChanges, Position, useReactFlow, ReactFlowProvider, updateEdge } from 'reactflow';
import Dagre from '@dagrejs/dagre';

import 'reactflow/dist/style.css';  
import CustomNode from '../CustomNode';
import ResizeRotateNode from '../ResizeRotateNode';
// const defaultEdgeOptions = { animated: true };

const initialNodes = [
    { 
        id: '1', 
        position: { x: 0, y: 0 }, 
        data: { label: '1' },
        type:'resizeRotate' ,  
    },
    { 
        id: '2', 
        position: { x: 0, y: 100 }, 
        data: { label: '2' } 
    },
    { 
        id: '3', 
        position: { x: 0, y: 200 }, 
        data: { label: '3' } ,
        style:{
            backgroundColor:'#6ede87'
        }
    },
    { 
        id: 'node-1', 
        position: { x: 120, y: 400 }, 
        type: 'customNode', 
        data: { value: 123 }
    },
];

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(()=>({}));

const getLayoutedElements = (nodes, edges, options) => {
    g.setGraph({rankdir: options.direction});

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g)
    return {
        nodes: nodes.map((node) => {
          const { x, y } = g.node(node.id);
    
          return { ...node, position: { x, y } };
        }),
        edges,
    };
}
 
const initialEdges = [{ id: '1-2', source: '1', target: '2', label:'label' }];

// const nodeTypes = { customNode: CustomNode };
 function Flow() {
    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useState(initialNodes); 
    const [edges, setEdges] = useState(initialEdges);
    const [variant, setVariant] = useState('cross');

    const nodeTypes = useMemo(()=>({customNode: CustomNode, resizeRotate:ResizeRotateNode}),[])

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => {
            console.log(changes)
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {
            setEdges((eds) =>  addEdge({...connection, type:'step',label:`step ${connection.source} to ${connection.target}`}, eds) 
            )
        },
        [setEdges]
    );
    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => {
            console.log(oldEdge, newConnection, 'oldEdge')
            setEdges((els) => updateEdge(oldEdge, newConnection, els))
        },
        []
      );

    const onLayout = useCallback(
        (direction) => {
          const layouted = getLayoutedElements(nodes, edges, { direction });
          setNodes([...layouted.nodes]);
          setEdges([...layouted.edges]);
    
          window.requestAnimationFrame(() => {
            fitView();
          });
        },
        [nodes, edges]
    );
  
    const onEdgeClick = useCallback((event,edge)=>{
        console.log(edge)
    },[])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}  
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        // defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <NodeResizer   />
        <Background variant={variant} gap={12} size={1} />
        <Panel position="top-right" >
            <div>variant:</div>
            <div className={`flex gap-2 
                [&>button]:px-2
                [&>button]:py-1
                [&>button]:bg-slate-600
                [&>button]:rounded-sm
                [&>button]:text-white
                
                `}>
                <button onClick={() => setVariant('dots')}>dots</button>
                <button onClick={() => setVariant('lines')}>lines</button>
                <button onClick={() => setVariant('cross')}>cross</button>
                <button onClick={() => onLayout('TB')}>vertical layout</button>
                <button onClick={() => onLayout('LR')}>horizontal layout</button>
            </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}


export default function Layouting(){
    return (
        <ReactFlowProvider>
            <Flow/>
        </ReactFlowProvider>
    )
}