import React, { useCallback } from 'react';

import Lesson1 from './components/lesson1';
import Lesson2 from './components/Lesson2';
import SubFlow from './components/Guides/SubFlow';
import { ReactFlowProvider, useReactFlow } from 'reactflow';
import AddNodes from './components/Guides/AddNodes';
import Layouting from './components/Guides/Layouting';
import DnDFlow from './components/Guides/DND';


export default function App() {

  

  return (
    <div className='w-screen h-screen'>
      
      {/* <AddNodes/> */}
      {/* <Layouting/> */}
      <DnDFlow/>
    </div>
  );
}