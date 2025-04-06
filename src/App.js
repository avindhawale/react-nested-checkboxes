import React from 'react';
import './style.css';
import { data } from './data';
import Checkbox from './Checkbox.jsx';

export default function App() {
  const [selectedNodes, setSelectedNodes] = React.useState({});

  return (
    <div className="parent">
      <Checkbox
        nodes={data}
        selectedNodes={selectedNodes}
        setSelectedNodes={setSelectedNodes}
      />
    </div>
  );
}
