import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { InvoiceState, mapInvoiceState, PaymentState, mapPaymentState, formatVND } from '../../../config/constant';
import { setLoading } from '../../../redux/loadingSlice';
import { useAppDispatch } from '../../../redux/store';
import { CouponInterface, InvoiceInterface, InvoiceItemInterface, PaymentMethodInterface } from '../../../types/InvoiceInterfaces';
import BaseContent from '../BaseContent'
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { v4 } from 'uuid';
import { getPaymentMethod, getProductName } from '../../../helper/ProductHelper';
import index from '../../index';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { toast } from 'react-toastify';

type Props = {}

interface InvoiceItemProps {
    productId: string;
    quantity: number;
}

function UpdateInvoice({ }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const [invoice, setInvoice] = React.useState<InvoiceInterface>();
    const [invoiceItems, setInvoiceItems] = React.useState<InvoiceItemProps[]>([]);
    const [coupons, setCoupons] = React.useState<string[]>([]);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //get all data from form
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        toast.promise(
            handleAddInvoiceItem(data),
            {
                pending: 'Đang thêm đơn hàng',
                success: 'Thêm đơn hàng thành công',
                error: 'Thêm đơn hàng thất bại'
            }
        )
    }

    async function handleAddInvoiceItem(data: any) {
        dispatch(setLoading(true))
        const res = await axios.post(ENDPOINT + '/admin/invoice', {
            ...data,
            couponCode: coupons,
            items: invoiceItems
        }).finally(() => {
            dispatch(setLoading(false))
            navigate('/admin/invoice')
        })
    }

    return (
        <BaseContent
            title="Thêm đơn hàng"
            backLink={`/admin/invoice`}
        >
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <h5>Thông tin khách hàng</h5>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="email" placeholder="email" name="email" required/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="userId" placeholder="userId" name="userId" />
                            <label htmlFor="userId">User id</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="name" placeholder="name" name="name" required />
                            <label htmlFor="name">Tên khách hàng</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="address" placeholder="address"  name="address" required/>
                            <label htmlFor="address">Địa chỉ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="city" placeholder="city"  name="city" required/>
                            <label htmlFor="city">Thành phố</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="phone" placeholder="phone" name="phone" required/>
                            <label htmlFor="phone">Số điện thoại</label>
                        </div>

                    </div>
                    <div className="col-6">
                        <h5>Thông tin đơn hàng</h5>
                        <div className="form-floating mb-3">
                            <select className="form-select" id="state" name="state">
                                {
                                    //map invoice state
                                    Object.keys(InvoiceState).map((key, index) => {
                                        const value = InvoiceState[key as keyof typeof InvoiceState];

                                        return <option value={value}>
                                            {
                                                mapInvoiceState(value)
                                            }
                                        </option>
                                    })
                                }
                            </select>
                            <label htmlFor="state">Trạng thái</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-select" id="paymentMethod" name="paymentMethod">
                                {
                                    //map invoice state
                                    Object.keys(PaymentMethodInterface).map((key, index) => {
                                        const value = PaymentMethodInterface[key as keyof typeof PaymentMethodInterface] as PaymentMethodInterface;

                                        return <option value={value}>
                                            {
                                                getPaymentMethod(value)
                                            }
                                        </option>
                                    })
                                }
                            </select>
                            <label htmlFor="state">Hình thức thanh toán</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select className="form-select" id="paymentState" name='paymentState'>
                                {
                                    //map invoice state
                                    Object.keys(PaymentState).map((key, index) => {
                                        const value = PaymentState[key as keyof typeof PaymentState];

                                        return <option value={value}>
                                            {
                                                mapPaymentState(value)
                                            }
                                        </option>
                                    })
                                }
                            </select>
                            <label htmlFor="state">Trạng thái thanh toán</label>
                        </div>
                    </div>
                </div>

                <hr />

                <InvoiceItems updateItems={setInvoiceItems} />

                <CouponsHandler updateCoupons={setCoupons} />

                <button className="btn btn-primary d-block w-100 mt-5">
                    Xác nhận
                </button>
            </form>


        </BaseContent>
    )
}

function CouponsHandler({  updateCoupons }: { updateCoupons: (coupons: string[]) => void }) {

    const [coupons, setCoupons] = React.useState<CouponInterface[]>([]);

    const [addedCoupons, setAddedCoupons] = React.useState<string[]>([]);

    function handleAddCoupon(code: string) {
        if (code && addedCoupons.includes(code)) {
            return;
        }
        setAddedCoupons([...addedCoupons, code]);
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    async function fetchCoupons() {
        const res = await axios.get(ENDPOINT + '/admin/coupons');
        setCoupons(res.data.data);
    }

    useEffect(() => {
        updateCoupons(addedCoupons);
    }, [addedCoupons])

    return (
        <div className="row mb-4">
            <div className="col-12">
                <h5>
                    Mã giảm giá
                </h5>
                <div className="form-floating mb-2">
                    <select className="form-select" id="coupon" name="coupon" onChange={(e) => handleAddCoupon(e.target.value)}>
                        <option value={undefined}>
                            Không áp dụng
                        </option>
                        {
                            coupons.map((coupon: CouponInterface, index: number) => {
                                return <option key={index} value={coupon.code}>
                                    {coupon.title}
                                </option>
                            })
                        }
                    </select>
                    <label htmlFor="coupon">Mã giảm giá</label>
                </div>
                <div className="">
                    {
                        addedCoupons.map((code: string, index: number) => {
                            return <div className="m-2 badge text-bg-secondary">
                                {code}
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function InvoiceItems({ updateItems }: { updateItems: (items: InvoiceItemProps[]) => void }) {
    const [items, setItems] = React.useState<InvoiceItemInterface[]>([]);


    function handleDelete(index: number) {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirm) {
            const newItems = items.filter((item, i) => i !== index);
            setItems(newItems);
        }
    }

    function onAddProduct(item: InvoiceItemInterface) {
        const index = items.findIndex(i => i.product.id === item.product.id);
        if (index !== -1) {
            alert("Sản phẩm đã tồn tại trong hóa đơn");
        } else {
            setItems([...items, item]);
        }
    }

    function onUpdateQuantity(index: number, quantity: number) {
        const newItems = [...items];
        newItems[index].quantity = quantity;
        newItems[index].cost = newItems[index].product.price * quantity;
        setItems(newItems);
    }

    useEffect(() => {
        const mappedItem = items.map(item => {
            return {
                productId: item.product.id,
                quantity: item.quantity
            }
        })
        updateItems(mappedItem);
    }, [items])

    return (
        <div className='mb-3'>
            <h5>Danh sách sản phẩm</h5>
            <div className="text-right mb-3">
                <AddProductModal onAddProduct={onAddProduct} />
            </div>
            <table className="table table-striped border">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Tổng</th>
                        <th>
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((invoiceItem, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {getProductName(invoiceItem.product)}
                                    </td>
                                    <td>{invoiceItem.quantity}</td>
                                    <td>{formatVND(invoiceItem.product.price)}</td>
                                    <td>{formatVND(invoiceItem.cost)}</td>
                                    <td>
                                        <UpdateProductQuantityModal invoiceItem={invoiceItem} onUpdateQuantity={(quantity) => onUpdateQuantity(index, quantity)} />
                                        <button onClick={() => handleDelete(index)} className="btn btn-sm btn-danger">Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

function UpdateProductQuantityModal({ invoiceItem, onUpdateQuantity }: { invoiceItem: InvoiceItemInterface, onUpdateQuantity: (quantity: number) => void }) {
    const [show, setShow] = React.useState(false);
    const [quantity, setQuantity] = React.useState(invoiceItem.quantity);
    const maxQuantity = invoiceItem.product.quantity;

    function handleUpdate() {
        if (quantity <= maxQuantity) {
            invoiceItem.quantity = quantity;
            onUpdateQuantity(quantity);
            setShow(false);
        } else {
            alert(`Số lượng sản phẩm không được vượt quá ${maxQuantity}`);
        }
    }

    return (
        <>
            <button onClick={() => setShow(true)} className="btn btn-sm btn-primary">Đổi số lượng</button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Đổi số lượng sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="quantity" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                        <label htmlFor="quantity">Số lượng tối đa {maxQuantity}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setShow(false)} className="btn btn-secondary">Đóng</button>
                    <button onClick={handleUpdate} className="btn btn-primary">Lưu</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


function AddProductModal({ onAddProduct }: { onAddProduct: (product: InvoiceItemInterface) => void }) {
    const [show, setShow] = React.useState(false);
    const [products, setProducts] = React.useState<ProductInterface[]>([]);
    const [searchText, setSearchText] = React.useState("");

    async function fetchProducts() {
        const res = await axios.get(ENDPOINT + '/products');
        setProducts(res.data.data.products);
    }

    useEffect(() => {
        if (show) {
            fetchProducts();
        }
    }, [show])



    return (
        <>
            <button onClick={() => setShow(true)} className="btn btn-sm btn-primary">Thêm sản phẩm</button>
            <Modal fullscreen show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="searchText" placeholder="searchText" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <label htmlFor="searchText">Tìm kiếm</label>
                    </div>

                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index) => {
                                    if (product.name.toLowerCase().includes(searchText.toLowerCase())) {
                                        return (
                                            <ProductHandle product={product} key={index} onAddProduct={(value) => { onAddProduct(value); setShow(false) }} />
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>

                </Modal.Body>
            </Modal>
        </>
    )
}

function ProductHandle({ product, onAddProduct }: { product: ProductInterface, onAddProduct: (product: InvoiceItemInterface) => void }) {
    const variants = product.variants || [];


    async function addProduct(product: ProductInterface) {
        const quantity = window.prompt("Nhập số lượng sản phẩm");
        if (!quantity) return;

        if (parseInt(quantity) > product.quantity) {
            alert("Số lượng sản phẩm không đủ");
            return;
        }

        onAddProduct(
            {
                quantity: parseInt(quantity),
                product: product,
                productId: product.id,
                cost: product.price * parseInt(quantity),
                id: v4()
            }
        )
    }

    return (
        <>
            <tr>
                <th scope="row">#{product.id}</th>
                <td>{product.name}</td>
                <td>{formatVND(product.price)}</td>
                <td>{(product.quantity)}</td>
                <td>
                    {
                        variants.length === 0 && <button onClick={() => addProduct(product)} className="btn btn-sm btn-primary">Thêm</button>
                    }
                </td>
            </tr>

            {
                variants.map((variant, index) => {
                    return (
                        <tr>
                            <th className='p-2 pl-5' scope="row">#{variant.id}</th>
                            <td className='p-2 pl-5' >{variant.variantName}</td>
                            <td className='p-2' >{formatVND(variant.price)}</td>
                            <td className='p-2' >{(variant.quantity)}</td>
                            <td className='p-2' >
                                <button onClick={() => addProduct(variant)} className="btn btn-sm btn-primary">Thêm</button>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default UpdateInvoice