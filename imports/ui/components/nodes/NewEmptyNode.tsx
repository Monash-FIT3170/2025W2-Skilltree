import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export function NewEmptyNode({ data, id }: NodeProps<any>) {
  const [title, setTitle] = useState(data.label || '');
  const [description, setDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const toggle = () => setShowPopup(!showPopup);

  return (
    <div className="react-flow__node-default" style={{ padding: '10px' }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label}</strong>
        <button onClick={toggle} style={{ display: 'block', marginTop: '8px' }}>
          Edit
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />

      {showPopup && (
        <div className="popup-overlay" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ccc',
          padding: '10px',
          zIndex: 10
        }}>
          <form onSubmit={(e) => {
            data.onEdit(e); 
            toggle();        
          }}>
            <label>
              Node Title:
              <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={toggle} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
