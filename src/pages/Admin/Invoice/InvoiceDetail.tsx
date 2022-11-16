import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { setLoading } from '../../../redux/loadingSlice';
import { useAppDispatch } from '../../../redux/store';
import { InvoiceInterface } from '../../../types/InvoiceInterfaces';
import BaseContent from '../BaseContent'
import { mapInvoiceState, formatVND } from '../../../config/constant';

type Props = {}

function InvoiceDetail({ }: Props) {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [invoice, setInvoice] = React.useState<InvoiceInterface>();

    React.useEffect(() => {
        fetchInvoice();
    }, [id])

    async function fetchInvoice() {
        dispatch(setLoading(true))
        const res = await axios.get(ENDPOINT + '/admin/invoice/' + id).finally(() => {
            dispatch(setLoading(false))
        })
        setInvoice(res.data.data);
    }

    console.log('123123123',mapInvoiceState(invoice?.state))

    return (
        <BaseContent
            backLink="/admin/invoice"
            title="Chi tiết hóa đơn"
            rightContent = {
                <Link to={`/admin/invoice/${id}/update`} className="btn btn-primary">Cập nhật</Link>
            }
        >
            <div className="row mb-5">
                <div className="col-6">
                    <h5>Thông tin khách hàng</h5>
                    <p>Tên: {invoice?.name}</p>
                    <p>Địa chỉ: {invoice?.address}</p>
                    <p>Số điện thoại: {invoice?.phone}</p>
                </div>
                <div className="col-6">
                    <h5>Thông tin đơn hàng</h5>
                    <p>Ngày đặt hàng: {new Date(invoice?.createdAt.date || '').toLocaleDateString()}</p>
                    <p>Trạng thái: {mapInvoiceState(invoice?.state)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-5">
                    <h5>Danh sách sản phẩm</h5>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice?.invoiceItems.map((invoiceDetail, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{invoiceDetail.product.name}</td>
                                    <td>{invoiceDetail.product.price}</td>
                                    <td>{invoiceDetail.quantity}</td>
                                    <td>{formatVND(invoiceDetail.cost)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-12 mb-5">
                    <h5>
                        Chi phí khác
                    </h5>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <td>Phí vận chuyển</td>
                                <td>{formatVND(invoice?.shippingFee || 0)}</td>
                            </tr>
                            {
                                invoice?.coupons.map((coupon, index) => (
                                    <tr key={index}>
                                        <td>Mã giảm giá {coupon.code}</td>
                                        <td className='text-success'>- {formatVND(coupon.discount)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h4>Tổng tiền: {formatVND(invoice?.total || 0)}</h4>
                    </div>
                </div>
            </div>

        </BaseContent>
    )
}

export default InvoiceDetail