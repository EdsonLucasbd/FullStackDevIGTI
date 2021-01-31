import React from 'react'

export default function Check({title}) {
  return (
    <div>
      <label>
        <input type="checkbox" />
        <span>{title}</span>
      </label>
    </div>
  )
}
