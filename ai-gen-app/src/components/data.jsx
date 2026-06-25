import { useQuery } from '@tanstack/react-query'

export const Data = () => {
  const { data: jsonData } = useQuery({
    queryKey: ['generated-json'],
    queryFn: () => null,
  })

  const { data: loading } = useQuery({
    queryKey: ['loading'],
    queryFn: () => null,
  })

  const renderJson = (data) => {
    if (!data) return null

    if (typeof data === 'object' && !Array.isArray(data)) {
      return (
        <div style={{ paddingLeft: '20px' }}>
          <span style={{ color: '#A6E22E' }}>{'{'}</span>
          <div style={{ paddingLeft: '20px' }}>
            {Object.keys(data).map((key, i, arr) => (
              <div key={key}>
                <span style={{ color: '#A6E22E' }}>&quot;{key}&quot;</span>
                <span> : </span>
                {renderJson(data[key])}
                {i < arr.length - 1 && <span>,</span>}
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
            {data.map((item, i) => (
              <div key={i}>{renderJson(item)}</div>
            ))}
          </div>
          <span style={{ color: '#A6E22E' }}>{']'}</span>
        </div>
      )
    }

    if (typeof data === 'string') return <span>&quot;{data}&quot;</span>
    if (typeof data === 'number') return <span>{data}</span>
    if (typeof data === 'boolean') return <span>{String(data)}</span>

    return <span>{String(data)}</span>
  }

  return (
    <div
      style={{
        margin: 20,
        background: '#1e1e1e',
        padding: 10,
        borderRadius: 8,
      }}
    >
      <h2 style={{ color: 'white' }}>JSON :</h2>

      {loading && <p style={{ color: 'yellow' }}>Generating...</p>}

      {!loading &&
        jsonData?.generated_data &&
        renderJson(jsonData.generated_data)}

      {!loading && !jsonData?.generated_data && (
        <p style={{ color: 'gray' }}>No generated data yet</p>
      )}
    </div>
  )
}
