import React, { useState } from 'react';

export default function InputExample() {

const [text, setText] = useState('');

 const curruntcount = text.trim().length;
 const maxlength = 140;
 const islimitexceed = curruntcount > maxlength;

  return (
    <div style={{ padding: '20px' }}>
      <label>Type something: </label>
      
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}   
        placeholder="Start typing..."
      />

      
      <p>You typed: <strong>{curruntcount}/{maxlength}</strong></p>
      {islimitexceed && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ⚠️ Limit Exceeded! You are {curruntcount - maxlength} characters over.
        </p>
      )}
      
    </div>

  );
}