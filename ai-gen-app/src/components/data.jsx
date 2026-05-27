// Sample JSON data

import { mockJsonData } from '../mocks/JsonData'

// Recursive function to render the JSON data
const renderJson = (data) => {
  if (typeof data === 'object' && !Array.isArray(data)) {
    return (
      <div style={{ paddingLeft: '20px' }}>
        <span style={{ color: '#A6E22E' }}>{'{'}</span>
        <div style={{ paddingLeft: '20px' }}>
          {Object.keys(data).map((key, index, array) => (
            <div key={key}>
              <span style={{ color: '#A6E22E' }}>"{key}"</span>
              <span style={{ color: 'white' }}>{' : '}</span>
              {renderJson(data[key])}
              {index < array.length - 1 && (
                <span style={{ color: 'white' }}>{','}</span>
              )}
            </div>
          ))}
        </div>
        <span style={{ color: '#A6E22E' }}>{'}'}</span>
      </div>
    )
  }

  if (Array.isArray(data)) {
    return (
      <div style={{ paddingLeft: '20px' }}>
        <span style={{ color: '#A6E22E' }}>{'['}</span>
        <div style={{ paddingLeft: '20px' }}>
          {data.map((item, index, array) => (
            <div key={index}>
              {renderJson(item)}
              {index < array.length - 1 && (
                <span style={{ color: 'white' }}>{','}</span>
              )}
            </div>
          ))}
        </div>
        <span style={{ color: '#A6E22E' }}>{']'}</span>
      </div>
    )
  }

  // For string values
  if (typeof data === 'string') {
    return <span style={{ color: 'orange' }}>"{data}"</span>
  }

  // For number values
  if (typeof data === 'number') {
    return <span style={{ color: 'red' }}>{data}</span>
  }

  // For boolean values
  if (typeof data === 'boolean') {
    return <span style={{ color: 'purple' }}>{data ? 'true' : 'false'}</span>
  }

  return <span>{data}</span>
}

// Main component
export const Data = () => {
  return (
    <div
      style={{
        margin: '20px',
        backgroundColor: '#1e1e1e',
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ color: 'white' }}>JSON :</h2>
      {renderJson(mockJsonData)}
    </div>
  )
}
