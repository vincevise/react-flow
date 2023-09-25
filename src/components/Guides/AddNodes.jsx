import React, { useCallback, useMemo, useState } from 'react'
import CustomNode from '../CustomNode';
import ResizeRotateNode from '../ResizeRotateNode';
import { Background, MiniMap, ReactFlow, ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';

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

 
const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];

const Flow = () => {

  const [nodes, setNodes] = useState(initialNodes); 
    const [edges, setEdges] = useState(initialEdges);
    const [variant, setVariant] = useState('cross');

    const nodeTypes = useMemo(()=>({
      customNode: CustomNode, 
      resizeRotate:ResizeRotateNode
    }),[])

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {
            setEdges((eds) =>  addEdge({...connection, type:'step',label:`step ${connection.source} to ${connection.target}`}, eds) 
            )
        },
        [setEdges]
    );

  return (
    <ReactFlow 
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} 
      onConnect={onConnect} 
      nodeTypes={nodeTypes}
    >
      <Background/>
      <MiniMap/>
    </ReactFlow>
  )
}

export default function AddNodes(){
  return (
    <ReactFlowProvider>
      <Flow/>
    </ReactFlowProvider>
  )
}


