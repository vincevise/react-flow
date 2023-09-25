import React, { useEffect, useState, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeResizer } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from './styles.module.css';

export default function ResizeRotateNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data,
  selected
}) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(true); 

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div
         
        className={`${styles.node} rounded-full bg-red-100`}
      >
        <NodeResizer isVisible={selected} minWidth={180} minHeight={100} />
        
        <div className=''>
          {data?.label}
          <div>
            <label>
              <input
                type="checkbox"
                checked={resizable}
                onChange={(evt) => setResizable(evt.target.checked)}
              />
              resizable
            </label>
          </div>
          <div>
             
          </div>
        </div>
        <Handle style={{ opacity: 1 }} position={sourcePosition} type="source" />
        <Handle style={{ opacity: 1 }} position={targetPosition} type="target" />
      </div>
    </>
  );
}
