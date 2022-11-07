import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import './Cart.scss'
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { removeProductFromCart, updateProduct } from '../../../redux/cartSlice';
import { getProductImagePath } from '../../../helper/PathHelper';
import { BsArrowRightCircle, BsArrowRightCircleFill, BsCartDash, BsCheckCircle, BsCircle, BsFillCartPlusFill } from 'react-icons/bs';



export default function ListProducts() {
    const products = useAppSelector(state => state.cart.products) || [];

    const count = useMemo(() => {
        return products.reduce((a, b) => a + b.quantity, 0);
    }, [products])
    return (
        <div className="cartSpace">
            <div className="headSpace">
                <div className="title">
                    Giỏ hàng của bạn
                </div>
                <div className="count">
                    {count} sản phẩm
                </div>
            </div>
            <div className="listProducts">
                {
                    products.map((product, index) => (
                        <ProductItem product={product} key={index} />
                    ))
                }
            </div>
        </div>

    )
}

function ProductItem({ product }: { product: ProductCartInterface }) {
    const productDetail = product.productDetail;
    const dispatch = useAppDispatch();

    useEffect(() => {
        getProductDetail();
    }, [product.productId])

    async function getProductDetail() {
        const res = await axios.get(ENDPOINT + `/product/${product.productId}`);
        const newProduct = { ...product, productDetail: res.data };
        console.log(newProduct);
        dispatch(updateProduct(newProduct))
    }

    function addOne() {
        const newProduct = { ...product, quantity: product.quantity + 1 };
        dispatch(updateProduct(newProduct))
    }

    function minusOne() {
        if (product.quantity <= 1) {
            const agree = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?');
            if (agree) {
                dispatch(removeProductFromCart(product));
            }

            return;
        }
        const newProduct = { ...product, quantity: product.quantity - 1 };
        dispatch(updateProduct(newProduct))
    }

    function toggleChecked() {
        const newProduct = { ...product, checked: !product.checked };
        dispatch(updateProduct(newProduct))
    }

    if (!productDetail) {
        return <></>
    }
    return (
        <div className="productItem">
            <div className="img">
                <img src={getProductImagePath(productDetail.image)} />
            </div>
            <div className='info'>
                <div className='name text-wrap'>{productDetail.name}</div>
                <div className='price'>
                    {
                        productDetail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    }
                </div>
                {
                    productDetail.variantName && (
                        <div className="size">
                            {productDetail.variantName}
                        </div>
                    )
                }
            </div>
            <div className="count">
                <div className="btn btn-light d-flex align-items-center">
                    <button className="btn " onClick={minusOne}>-</button>
                    <span className='mx-2'>
                        {product.quantity}
                    </span>
                    <button className="btn" onClick={addOne}>+</button>
                </div>
            </div>
            <div className="total ps-4 fs-5">
                {
                    (productDetail.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                }
            </div>
            <div className='checkedSpace fs-2 ms-4' onClick={toggleChecked}>
                {
                    product.checked ? (
                        <BsCheckCircle className='checked text-success' />
                    ) : (
                        <BsArrowRightCircle className='unchecked text-secondary' />
                    )
                }
            </div>
        </div>
    )
}