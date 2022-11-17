import React from 'react'

type Props = {}

function Wrapper({ children, header, title }: any) {
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
        {header}
        <h1 className='text-white mx-4'>
          {title}
        </h1>

      </div>
      <div className="mt--7">
        {children}
      </div>
    </>
  )
}

export default Wrapper