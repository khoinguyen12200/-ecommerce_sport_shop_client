import React from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom';

type Props = {}

function BaseContent({ title, rightContent, children, backLink }: any) {
    return (
        <Wrapper>
            <div className="card mx-4">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-end'>
                            {
                                backLink && (
                                    <Link to={backLink} className='btn btn-light'>
                                        <i className="fas fa-arrow-left"></i>
                                    </Link>
                                )
                            }
                            <h1 className='mb-0 ml-2'>
                                {title}
                            </h1>

                        </div>
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