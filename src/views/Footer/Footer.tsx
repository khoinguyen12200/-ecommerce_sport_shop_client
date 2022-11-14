import React from 'react'
import { SiAdidas, SiIconify, SiMega, SiNike, SiPuma } from 'react-icons/si'
import './Footer.scss'

type Props = {}

function Footer({ }: Props) {
    return (
        <footer className='row footer'>
            <div className="col-3 firstCol">
                <div className="fw-semibold mb-3">
                    Về chúng tôi
                </div>
                <div className="fw-light mb-3">
                    Giới thiệu
                </div>
                <div className="fw-light mb-3">
                    Liên hệ
                </div>
                <div className="fw-light mb-3">
                    Tuyển dụng
                </div>
            </div>
            <div className="col-5 secondCol">
                <div className="fw-semibold mb-3">
                    Hỗ trợ khách hàng
                </div>
                <div className="fw-light mb-3">
                    Hướng dẫn mua hàng
                </div>
                <div className="fw-light mb-3">
                    Chính sách đổi trả
                </div>
                <div className="fw-light mb-3">
                    Chính sách bảo hành
                </div>
                <div className="fw-light mb-3">
                    Chính sách vận chuyển
                </div>
                <div className="fw-light mb-3">
                    Chính sách thanh toán
                </div>

            </div>
            <div className="thirdCol col-4">
                <div className='brandContainer justify-content-end text-white fs-2 d-flex gap-3'>
                    <SiNike className='brandIcon' />
                    <SiAdidas className='brandIcon' />
                    <SiPuma className='brandIcon' />
                    <SiIconify className='brandIcon' />
                    <SiMega className='brandIcon' />
                </div>
            </div>

        </footer>
    )
}

export default Footer