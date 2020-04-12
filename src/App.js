import React from 'react';

import Upload from './components/upload';
function App() {
  return (
    <div>
      <div className="text-center text-danger" style = {{fontSize: "50px"}}>
        Upload your Bills
      </div>
      <Upload />
    </div>
  );
}

export default App;
