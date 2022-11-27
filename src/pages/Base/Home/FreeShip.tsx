import React from 'react'

type Props = {}

function FreeShip({ }: Props) {
    return (
        <section className='bg-black text-white p-5'>
            <div className='slogan1 text-center' >
                <div className="txt1">
                    Miễn phí giao hàng toàn quốc
                </div>
                <div className="txt2">
                    với các đơn hàng trị giá từ
                    <span className="txt3 ms-2">
                        1.000.000 ĐỒNG
                    </span>
                </div>
            </div>
        </section>
    )
}

export default FreeShip