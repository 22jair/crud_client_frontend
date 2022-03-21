import React from 'react'

export const AlertErrors = ({ errors=[] }) => {
  return (
    <div style={{
      width: '100%',
      padding: '10px',
      backgroundColor: '#ffe1df',
      border: '1px solid #ffa299',
      marginBottom: '5px'
     }}>

      {errors.map((error, index) => (
        <div key={index}>
          <span><b style={{color:'#f55a4c'}}>* {error.param}:</b> {error.msg}</span>
        </div>
      ))}
    </div>
  )
}
