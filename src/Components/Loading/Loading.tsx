import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useAppSelector } from '../../redux/store'
import './Loading.scss'


type Props = {}

const Loading = (props: Props) => {
    const isLoading = useAppSelector(state => state.loading.isLoading);

    return (
        <div className={`loadingBackground ${isLoading && 'loading'}`}>
            <div className="loadingContent">
                <div className="spinner">
                    <img src={require('../../assets/icons/logo_icon_only.png')} alt="" className="logo" />
                    <Spinner>

                    </Spinner>
                </div>
            </div>
        </div>
    )
}

export default Loading