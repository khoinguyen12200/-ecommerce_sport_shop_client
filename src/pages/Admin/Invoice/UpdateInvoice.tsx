import axios from 'axios';
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { InvoiceState, mapInvoiceState, mapPaymentState, formatVND } from '../../../config/constant';
import { setLoading } from '../../../redux/loadingSlice';
import { useAppDispatch } from '../../../redux/store';
import { CouponInterface, InvoiceInterface, InvoiceItemInterface, PaymentMethodInterface, InvoicePaymentStatusInterface, InvoiceStateInterface } from '../../../types/InvoiceInterfaces';
import BaseContent from '../BaseContent'
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { v4 } from 'uuid';
import { getPaymentMethod, getProductName } from '../../../helper/ProductHelper';
import index from '../../index';
import { AiOutlineConsoleSql } from 'react-icons/ai';

type Props = {}

interface InvoiceItemProps {
    productId: string;
    quantity: number;
}

function UpdateInvoice({ }: Props) {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [invoice, setInvoice] = React.useState<InvoiceInterface>();
    const [invoiceItems, setInvoiceItems] = React.useState<InvoiceItemProps[]>([]);
    const [coupons, setCoupons] = React.useState<string[]>([]);

    React.useEffect(() => {
        fetchInvoice();
    }, [id])

    async function fetchInvoice() {
        dispatch(setLoading(true))
        const res = await axios.get(ENDPOINT + '/admin/invoice/' + id).finally(() => {
            dispatch(setLoading(false))
        })
        setInvoice(res.data.data);
        console.log(res.data.data)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //get all data from form
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());


        dispatch(setLoading(true))
        const res = await axios.put(ENDPOINT + '/admin/invoice/' + id, {
            ...invoice,
            ...data,
            couponCode: coupons,
            items: invoiceItems
        }).finally(() => {
            dispatch(setLoading(false))
        })
        setInvoice(res.data.data);
    }

    return (
        <BaseContent
            title="C???p nh???t h??a ????n"
            backLink={`/admin/invoice/${id}`}
        >
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <h5>Th??ng tin kh??ch h??ng</h5>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="email" placeholder="email" defaultValue={invoice?.email} name="email" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="userId" placeholder="userId" defaultValue={invoice?.userId} name="userId" />
                            <label htmlFor="userId">User id</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="name" placeholder="name" defaultValue={invoice?.name} name="name" />
                            <label htmlFor="name">T??n kh??ch h??ng</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="address" placeholder="address" defaultValue={invoice?.address} name="address" />
                            <label htmlFor="address">?????a ch???</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="phone" placeholder="phone" defaultValue={invoice?.phone} name="phone" />
                            <label htmlFor="phone">S??? ??i???n tho???i</label>
                        </div>

                    </div>
                    <div className="col-6">
                        <h5>Th??ng tin ????n h??ng</h5>
                        {
                            invoice?.state && (
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="state" name="state" defaultValue={invoice.state}>
                                        {
                                            //map invoice state
                                            Object.keys(InvoiceStateInterface).map((key, index) => {
                                                const value = InvoiceStateInterface[key as keyof typeof InvoiceStateInterface];

                                                return <option value={value} defaultChecked={invoice.state == value}>
                                                    {
                                                        mapInvoiceState(value)
                                                    }
                                                </option>
                                            })
                                        }
                                    </select>
                                    <label htmlFor="state">Tr???ng th??i</label>
                                </div>
                            )
                        }

                        {
                            invoice && (
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="paymentMethod" name="paymentMethod" defaultValue={invoice.paymentMethod}>
                                        {
                                            //map invoice state
                                            Object.keys(PaymentMethodInterface).map((key, index) => {
                                                const value = PaymentMethodInterface[key as keyof typeof PaymentMethodInterface] as PaymentMethodInterface;

                                                return <option value={value} defaultChecked={invoice.paymentMethod == value}>
                                                    {
                                                        getPaymentMethod(value)
                                                    }
                                                </option>
                                            })
                                        }
                                    </select>
                                    <label htmlFor="state">H??nh th???c thanh to??n</label>
                                </div>

                            )
                        }


                        {
                            invoice && (
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="paymentState" name='paymentState' defaultValue={invoice?.paymentState}>
                                        {
                                            //map invoice state
                                            Object.keys(InvoicePaymentStatusInterface).map((key, index) => {
                                                const value = InvoicePaymentStatusInterface[key as keyof typeof InvoicePaymentStatusInterface];

                                                return <option value={value} defaultChecked={invoice?.paymentState == value}>
                                                    {
                                                        mapPaymentState(value)
                                                    }
                                                </option>
                                            })
                                        }
                                    </select>
                                    <label htmlFor="state">Tr???ng th??i thanh to??n</label>
                                </div>
                            )
                        }
                    </div>
                </div>

                <hr />

                <InvoiceItems invoice={invoice} updateItems={setInvoiceItems} />

                <CouponsHandler invoice={invoice} updateCoupons={setCoupons} />

                <button className="btn btn-primary d-block w-100 mt-5">
                    C???p nh???t
                </button>
            </form>


        </BaseContent>
    )
}

function CouponsHandler({ invoice, updateCoupons }: { invoice?: InvoiceInterface, updateCoupons: (coupons: string[]) => void }) {
    const alreadyAddedCoupons = invoice?.coupons || [];

    const [coupons, setCoupons] = React.useState<CouponInterface[]>([]);

    const [addedCoupons, setAddedCoupons] = React.useState<string[]>([]);

    useEffect(() => {
        alreadyAddedCoupons.forEach(coupon => {
            handleAddCoupon(coupon.code);
        })
    }, [alreadyAddedCoupons])

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
                    M?? gi???m gi??
                </h5>
                <div className="form-floating mb-2">
                    <select className="form-select" id="coupon" name="coupon" onChange={(e) => handleAddCoupon(e.target.value)}>
                        <option value={undefined}>
                            Kh??ng ??p d???ng
                        </option>
                        {
                            coupons.map((coupon: CouponInterface, index: number) => {
                                return <option key={index} value={coupon.code}>
                                    {coupon.title}
                                </option>
                            })
                        }
                    </select>
                    <label htmlFor="coupon">M?? gi???m gi??</label>
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

function InvoiceItems({ invoice, updateItems }: { invoice?: InvoiceInterface, updateItems: (items: InvoiceItemProps[]) => void }) {

    const invoiceItems = invoice?.invoiceItems || [];

    const [items, setItems] = React.useState<InvoiceItemInterface[]>(invoiceItems || []);

    useEffect(() => {
        setItems(invoiceItems);
    }, [invoiceItems])


    function handleDelete(index: number) {
        const confirm = window.confirm("B???n c?? ch???c ch???n mu???n x??a s???n ph???m n??y?");
        if (confirm) {
            const newItems = items.filter((item, i) => i !== index);
            setItems(newItems);
        }
    }

    function onAddProduct(item: InvoiceItemInterface) {
        const index = items.findIndex(i => i.product.id === item.product.id);
        if (index !== -1) {
            alert("S???n ph???m ???? t???n t???i trong h??a ????n");
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
            <h5>Danh s??ch s???n ph???m</h5>
            <div className="text-right mb-3">
                <AddProductModal onAddProduct={onAddProduct} />
            </div>
            <table className="table table-striped border">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">T??n s???n ph???m</th>
                        <th scope="col">S??? l?????ng</th>
                        <th scope="col">Gi??</th>
                        <th scope="col">T???ng</th>
                        <th>
                            Thao t??c
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
                                        <button onClick={() => handleDelete(index)} className="btn btn-sm btn-danger">X??a</button>
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
            alert(`S??? l?????ng s???n ph???m kh??ng ???????c v?????t qu?? ${maxQuantity}`);
        }
    }

    return (
        <>
            <button onClick={() => setShow(true)} className="btn btn-sm btn-primary">?????i s??? l?????ng</button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>?????i s??? l?????ng s???n ph???m</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="quantity" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                        <label htmlFor="quantity">S??? l?????ng t???i ??a {maxQuantity}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setShow(false)} className="btn btn-secondary">????ng</button>
                    <button onClick={handleUpdate} className="btn btn-primary">L??u</button>
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
            <button onClick={() => setShow(true)} className="btn btn-sm btn-primary">Th??m s???n ph???m</button>
            <Modal fullscreen show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Th??m s???n ph???m</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="searchText" placeholder="searchText" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <label htmlFor="searchText">T??m ki???m</label>
                    </div>

                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">T??n s???n ph???m</th>
                                <th scope="col">Gi??</th>
                                <th scope="col">S??? l?????ng</th>
                                <th scope="col">Thao t??c</th>
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
        const quantity = window.prompt("Nh???p s??? l?????ng s???n ph???m");
        if (!quantity) return;

        if (parseInt(quantity) > product.quantity) {
            alert("S??? l?????ng s???n ph???m kh??ng ?????");
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
                        variants.length === 0 && <button onClick={() => addProduct(product)} className="btn btn-sm btn-primary">Th??m</button>
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
                                <button onClick={() => addProduct(variant)} className="btn btn-sm btn-primary">Th??m</button>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default UpdateInvoice