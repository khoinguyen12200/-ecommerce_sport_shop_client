import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Spinner, Tab, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../../../config/config';
import { setCartCouponCode } from '../../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { InvoiceInterface, PaymentMethodInterface } from '../../../types/InvoiceInterfaces';
import './Payment.scss'

type Props = {}

function Payment({ }: Props) {
    const { orderInformation, products, couponCode } = useAppSelector(state => state.cart);

    const [loaded, setLoaded] = React.useState(false);
    const navigate = useNavigate();

    const [invoice, setInvoice] = React.useState<InvoiceInterface | null>(null);
    const [paymentMethod, setPaymentMethod] = React.useState(PaymentMethodInterface.CASH);


    useEffect(() => {
        setLoaded(true);
    }, [])

    useEffect(() => {
        if (loaded) {
            if (!orderInformation) {
                toast.warning('Bạn chưa điền thông tin đặt hàng');
                navigate('/cart');
            }
        }
    }, [loaded, orderInformation])

    useEffect(() => {
        checkInvoice()
    }, [products, couponCode, paymentMethod])

    function onPaymentChange(e: any) {
        console.log(e.target.value);
    }

    async function checkInvoice() {
        const data = {
            ...orderInformation,
            items: products,
            paymentMethod: paymentMethod,
            couponCode: couponCode
        }
        const res = await axios.post(ENDPOINT + '/invoice_check', data);
        setInvoice(res.data.data.invoice)
        console.log(res.data.data.invoice);
    }

    async function handleSubmit() {
        toast.promise(
            sendOrder(), {
            pending: 'Đang gửi đơn hàng',
            success: 'Đơn hàng đã được gửi',
            error: 'Đã có lỗi xảy ra'
        }
        )
    }
    async function sendOrder() {
        const data = {
            ...orderInformation,
            items: products,
            paymentMethod: paymentMethod,
            couponCode: couponCode
        }
        const res = await axios.post(ENDPOINT + '/invoice', data);
        const { invoiceLink } = res.data.data;
        window.location.href = invoiceLink;
    }

    if (!invoice) return <div className="contentOrderProcess PaymentPage">
        <div className="d-flex justify-content-center align-items-center m-5 mx-auto fs-1">
            <Spinner animation='border' variant='secondary' />
        </div>
    </div>;

    return (
        <div className='contentOrderProcess PaymentPage'>
            <div className="paymentContent">
                <Table striped bordered hover>
                    <tbody>
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
                <AddCoupon />
                <Table variant='success' striped bordered hover>
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
                                    <td>
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
                    </tbody>
                </Table>
                <div className=' mb-3 mt-3' onChange={onPaymentChange}>
                    <div className="form-check" onClick={() => setPaymentMethod(PaymentMethodInterface.CASH)}>
                        <input className="form-check-input" type="radio" name="paymentMethod" checked={paymentMethod === PaymentMethodInterface.CASH} />
                        <label className="form-check-label" htmlFor="cash">
                            Thanh toán tiền mặt
                        </label>
                    </div>
                    <div className="form-check" onClick={() => setPaymentMethod(PaymentMethodInterface.VNPAY)}>
                        <input className="form-check-input" type="radio" name="paymentMethod" checked={paymentMethod === PaymentMethodInterface.VNPAY} />
                        <label className="form-check-label" htmlFor="vnpay" >
                            VNPay
                        </label>
                    </div>
                </div>
                <div>
                    <Button style={{ width: '100%' }} className='mt-3' variant='dark' onClick={handleSubmit}>Xác nhận</Button>
                </div>
            </div>
        </div>
    )
}

function AddCoupon() {
    const { couponCode } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const [coupon, setCoupon] = React.useState<string>('');

    function addCoupon() {
        if (coupon == '') {
            return;
        }
        let arr = couponCode || [];
        arr = [...arr, coupon];
        dispatch(setCartCouponCode(arr))
        setCoupon('');
    }
    return (
        <div className="input-group mb-3">
            <span className="input-group-text">
                Mã giảm giá
            </span>
            <input type="text" className="form-control" placeholder="GIAM_GIA" aria-label="000" value={coupon} onChange={e => setCoupon(e.target.value)} />
            <button className="btn btn-outline-secondary" type="button" onClick={addCoupon}>Kiểm tra</button>
        </div>
    )
}

export default Payment