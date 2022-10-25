import React from 'react'

type Props = {
    children: React.ReactNode
    rightSpace?: React.ReactNode
    title: string
}

function BaseLayout({ title, rightSpace, children }: Props) {
    return (
        <div className='adminBaseLayout m-4'>
            <div className='d-flex align-items-end justify-content-between'>
                <h3 className='m-0'>{title}</h3>
                <div className="rightSpace">
                    {rightSpace}
                </div>
            </div>
            <hr />
            <div>
                {children}
            </div>
        </div>
    )
}

export default BaseLayout