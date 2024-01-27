import React from 'react'
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';

export default function JsonViewer({data}:{data: Object|any[]}) {
  return (
    <JsonView data={data} style={{...darkStyles, container: ''}}  />
  )
}
