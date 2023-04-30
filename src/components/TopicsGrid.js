import React from 'react'

const TopicsGrid = ({children}) => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        { children }
    </div>
  )
}

export default TopicsGrid