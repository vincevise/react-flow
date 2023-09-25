import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 

export default function CustomNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='border border-black p-2 rounded-sm flex gap-2 items-center'>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag py-1 px-2 rounded-sm border border-gray-600 outline-none" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" /> 
    </>
  );
}