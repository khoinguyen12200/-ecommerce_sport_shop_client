import axios from 'axios';
import React from 'react'
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { mapInvoiceState, mapPaymentState } from '../../../config/constant';
import { setLoading } from '../../../redux/loadingSlice';
import { useAppDispatch } from '../../../redux/store';
import { InvoiceInterface, InvoicePaymentStatusInterface, PaymentMethodInterface } from '../../../types/InvoiceInterfaces';
import BaseContent from '../BaseContent';

type Props = {}

function InvoiceDetail({ }: Props) {
    const { id, hash } = useParams();
    const [invoice, setInvoice] = React.useState<InvoiceInterface | null>(null);
    const [paymentLink, setPaymentLink] = React.useState('');

    const dispatch = useAppDispatch();

    async function fetchInvoice() {
        dispatch(setLoading(true))
        const res = await axios.get(ENDPOINT + `/invoice/${id}/${hash}`).finally(() => {
            dispatch(setLoading(false))
        })
        setInvoice(res.data.data.invoice)
        setPaymentLink(res.data.data.paymentLink)
    }

    React.useEffect(() => {
        fetchInvoice()
    }, [])



    return (
        <BaseContent
            title='Chi tiết hoá đơn'
        >
            <div className='mb-5'>
                <div className="mb-3">
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>Trạng thái</td>
                                <td className='fw-bold'>{mapInvoiceState(invoice?.state)}</td>
                            </tr>
                            <tr>
                                <td>ID</td>
                                <td>{invoice?.id}</td>
                            </tr>
                            <tr>
                                <td>Họ và tên</td>
                                <td>{invoice?.name}</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại</td>
                                <td>{invoice?.phone}</td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>{invoice?.address}</td>
                            </tr>

                            <tr>
                                <td>Địa chỉ</td>
                                <td>{invoice?.address}</td>
                            </tr>
                            <tr>
                                <td>Thành phố</td>
                                <td>{invoice?.city}</td>
                            </tr>
                            <tr>
                                <td>Ghi chú</td>
                                <td>{invoice?.note}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="">
                    <Table striped bordered hover variant=''>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoice?.invoiceItems.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            {item.product.name}
                                            {
                                                item.product.variantName && (
                                                    <span style={{ fontSize: 10 }} className='ms-2 badge rounded-pill text-bg-secondary'>
                                                        ({item.product.variantName})
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {
                                                item.cost.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={2}>Phí vận chuyển</td>
                                <td>
                                    {
                                        invoice?.shippingFee.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })
                                    }
                                </td>
                            </tr>
                            {
                                invoice?.coupons.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td colSpan={2}>Mã giảm giá {item.code}</td>
                                        <td className='text-success'>
                                            {
                                                item.discount.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={2}>Tổng tiền</td>
                                <th>
                                    {
                                        invoice?.total.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })
                                    }
                                </th>
                            </tr>
                            {
                                invoice?.paymentMethod !== PaymentMethodInterface.CASH && (
                                    <tr>
                                        <td className='text-center fw-bold' colSpan={3}>
                                            {mapPaymentState(invoice?.paymentState)}
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                paymentLink && invoice?.paymentState != InvoicePaymentStatusInterface.COMPLETED && (
                                    <tr>
                                        <td className='p-0' colSpan={3}>
                                            <a href={paymentLink} target='_blank' className='rounded-0 m-0 btn btn-lg btn-primary w-100'>
                                                Thanh toán
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </BaseContent>
    )
}

export default InvoiceDetail