import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

 export default function Comparison() {
  const [stateCount, setStateCount] = useState(0);
  const [name] = useState<String>('Bob')
  const refCount = useRef(0);
    const renderCount = useRef(0);

   


  function handleStateClick() {
    setStateCount(stateCount + 1); 
  }

  function handleRefClick() {
    refCount.current = refCount.current + 1; 
    console.log(refCount.current); 
  }
    useEffect(() => {
        renderCount.current += 1;
        console.log(`${name} rendered ${renderCount.current} times`);
    });
  return (
    <div>
      <p>State: {stateCount}</p>
      <button onClick={handleStateClick}>State +1</button>

      <p>Ref: {refCount.current}</p> 
      <button onClick={handleRefClick}>Ref +1</button>
      <p>{name}</p>
    </div>
    
  );
}