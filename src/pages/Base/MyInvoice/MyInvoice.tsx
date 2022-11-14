import React, { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { InvoiceInterface, InvoicePaymentStatusInterface, PaymentMethodInterface } from '../../../types/InvoiceInterfaces';
import './MyInvoice.scss'
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { Spinner, Table } from 'react-bootstrap';
import { mapInvoiceState, mapPaymentState } from '../../../config/constant';


type Props = {}

function MyInvoice({ }: Props) {
    const [params] = useSearchParams();
    const [id, hash] = useMemo(() => {
        return [params.get('id'), params.get('hash')]
    }, [params])
    const [invoice, setInvoice] = useState<InvoiceInterface | null>(null)
    const [paymentLink, setPaymentLink] = useState<string | null>(null)

    useEffect(() => {
        if (id && hash) {
            fetchInvoice(id, hash)
        }
    }, [id, hash])

    async function fetchInvoice(id: string, hash: string) {
        const res = await axios.get(ENDPOINT + `/invoice/${id}/${hash}`);
        const { invoice, paymentLink } = res.data.data;
        setInvoice(invoice)
        setPaymentLink(paymentLink)
    }


    if (!invoice) return <div className="contentOrderProcess PaymentPage">
        <div className="d-flex justify-content-center align-items-center m-5 mx-auto fs-1">
            <Spinner animation='border' variant='secondary' />
        </div>
    </div>;

    return (
        <div className='MyInvoice p-3'>
            <h1 className=''>
                Thông tin hoá đơn
            </h1>
            <hr />
            <InvoiceInformation invoice={invoice} paymentLink={paymentLink} />
        </div>
    )
}

function InvoiceInformation(
    { invoice, paymentLink }:
        { invoice: InvoiceInterface, paymentLink: string | null }
) {

    return (
        <div className='row'>
            <div className="col-5">
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Trạng thái</td>
                            <td className='fw-bold'>{mapInvoiceState(invoice.state)}</td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{invoice.id}</td>
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
            <div className="col-7">
                <Table striped bordered hover>
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
                            invoice.paymentMethod !== PaymentMethodInterface.CASH && (
                                <tr>
                                    <td className='text-center fw-bold' colSpan={3}>
                                        {mapPaymentState(invoice.paymentState)}
                                    </td>
                                </tr>
                            )
                        }
                        {
                            paymentLink && invoice.paymentState != InvoicePaymentStatusInterface.COMPLETED && (
                                <tr>
                                    <td className='p-0' colSpan={3}>
                                        <a href={paymentLink} target='_blank' className='rounded-0 m-0 btn btn-dark w-100'>
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
    )
}

export default MyInvoice