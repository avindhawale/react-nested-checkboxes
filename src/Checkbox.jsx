import React from 'react';
import { data as vegetablesData } from './data.js';

export default function Checkbox({ nodes, selectedNodes, setSelectedNodes }) {
  const handleChange = (isChecked, node) => {
    setSelectedNodes((prevValue) => {
      const newValue = {
        ...prevValue,
        [node.id]: isChecked,
      };

      // if node has children, mark all children checked/unchecked
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newValue[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);

      //check if all the children are checked, then select the parent
      const verifyParentNodes = (node) => {
        if (node.children.length == 0) return newValue[node.id] || false;
        const allChildrenSelected = node.children?.every((child) =>
          verifyParentNodes(child)
        );
        newValue[node.id] = allChildrenSelected;
        return allChildrenSelected;
      };
      vegetablesData.forEach((node) => verifyParentNodes(node));

      return newValue;
    });
  };

  //console.log('vegetablesData : ', vegetablesData);
  return (
    <>
      {nodes.map((node) => (
        <div className="parent" key={node.id}>
          <input
            type="checkbox"
            id={node.id}
            checked={selectedNodes[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <label htmlFor={node.id}>{node.name}</label>
          {node.children && (
            <Checkbox
              nodes={node.children}
              selectedNodes={selectedNodes}
              setSelectedNodes={setSelectedNodes}
            />
          )}
        </div>
      ))}
    </>
  );
}
