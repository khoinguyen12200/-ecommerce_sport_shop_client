import React, { useMemo } from 'react'
import { Image, Table } from 'react-bootstrap';
import { getProductImagePath } from '../../../helper/PathHelper';
import { useAppSelector } from '../../../redux/store'
import './Cart.scss'



type Props = {}

function OrderSpace({ }: Props) {
    const products = useAppSelector(state => state.cart.products) || [];

    const countChecked = useMemo(() => {
        return products.reduce((a, b) => a + (b.checked ? b.quantity : 0), 0);
    }, [products])

    const listCheckedProducts = useMemo(() => {
        return products.filter(product => product.checked);
    }, [products])

    const totalPrice = useMemo(() => {
        return listCheckedProducts.reduce((a, b) => a + b.quantity * (b?.productDetail?.price || 0), 0);
    }, [listCheckedProducts])

    return (
        <div className="submitSpace">
            <div className="headSpace">
                <div className="title">
                    Thông tin đơn hàng
                </div>
                <div className="count">
                    {countChecked} sản phẩm
                </div>
            </div>
            <div className="listOrder">
                <Table variant="light" striped bordered hover >
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listCheckedProducts.map((product, index) => (
                                <OrderItem product={product} key={index} />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className="footSpace">
                <div className="summary">
                    <div className="total">
                        Tổng tiền: {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>

                </div>
                <button className="submitBtn">Đặt hàng</button>
            </div>
        </div>
    )
}

function OrderItem({ product }: { product: ProductCartInterface }) {
    const productDetail = product.productDetail;
    const total = useMemo(() => {
        return (productDetail?.price || 0) * product.quantity;
    }, [productDetail, product.quantity])

    return (
        <tr className="orderItem">
            <td className='orderInfo'>
                <span className="name">
                    {productDetail?.name}
                </span>
                {
                    productDetail?.variantName &&
                    <span className="size">
                        {productDetail.variantName}
                    </span>
                }
            </td>
            <td className="quantity text-center">
                {product.quantity}
            </td>
            <td className="total">
                {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </td>
        </tr>
    )
}


export default OrderSpace