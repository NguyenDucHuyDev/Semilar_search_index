import React from 'react'
import notFound from '../assets/image/notFound.gif'

const NoMatch = () => {
  return (
    <div className='NoMatch flex justify-center'>
        <img src={notFound} />
    </div>
  )
}

export default NoMatch