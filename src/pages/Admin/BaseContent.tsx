import React from 'react'
import Wrapper from './Wrapper'

type Props = {}

function BaseContent({ title, rightContent, children }: any) {
    return (
        <Wrapper>
            <div className="card mx-4">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h1>
                            {title}
                        </h1>
                        <div className="">
                            {rightContent}
                        </div>
                    </div>
                    <hr />
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default BaseContent