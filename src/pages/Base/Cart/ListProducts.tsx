import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import "./Cart.scss";
import { useEffect } from "react";
import axios from "axios";
import { ENDPOINT } from "../../../config/config";
import {
    deleteCart,
    toggleCheckedCart,
    addCartProduct,
} from "../../../redux/cartSlice";
import { getProductImagePath } from "../../../helper/PathHelper";
import {
    BsArrowRightCircle,
    BsArrowRightCircleFill,
    BsCartDash,
    BsCheckCircle,
    BsCheckSquare,
    BsCircle,
    BsFillCartPlusFill,
    BsSquare,
} from "react-icons/bs";
import { setLoading } from "../../../redux/loadingSlice";
import { toast } from 'react-toastify';

export default function ListProducts() {
    const products = useAppSelector((state) => state.cart.products) || [];

    const count = useMemo(() => {
        return products.reduce((a, b) => a + b.quantity, 0);
    }, [products]);
    return (
        <div className="cartSpace">
            <div className="headSpace">
                <div className="title">Giỏ hàng của bạn</div>
                <div className="count">{count} sản phẩm</div>
            </div>
            <div className="listProducts">
                {products.map((product, index) => (
                    <ProductItem product={product} key={index} />
                ))}
            </div>
        </div>
    );
}

function ProductItem({ product }: { product: ProductCartInterface }) {
    const productDetail = product.product;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(productDetail) {
            if(productDetail.quantity < product.quantity) {
                toast.warning('Số lượng sản phẩm không đủ');
            }
        }
       
    }, [product.quantity]);

    async function addOrRemoveOne(id: any, quantity: number) {
        dispatch(setLoading(true));
        await dispatch(
            addCartProduct({
                productId: id,
                quantity: quantity,
            })
        ).finally(() => {
            dispatch(setLoading(false));
        });
    }

    function addOne() {
        addOrRemoveOne(product.productId || productDetail?.id, 1);

    }

    async function minusOne() {
        if (product.quantity <= 1) {
            const agree = window.confirm(
                "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
            );
            if (!agree) {
                return;
            }
        }
        addOrRemoveOne(product.productId || productDetail?.id, -1);
    }

    function toggleChecked() {
        dispatch(toggleCheckedCart(product));
    }

    if (!productDetail) {
        return <></>;
    }

    return (
        <div className="productItem">
            <div className="img">
                <img src={getProductImagePath(productDetail.image)} />
            </div>
            <div className="info">
                <div className="name text-wrap">{productDetail.name}</div>
                <div className="price">
                    {productDetail.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
                {productDetail.variantName && (
                    <div className="size">{productDetail.variantName}</div>
                )}
                <div className="quantity text-muted">
                    {productDetail.quantity} sản phẩm có sẵn
                </div>
            </div>
            <div className="count">
                <div className="btn btn-light d-flex align-items-center">
                    <button className="btn " onClick={minusOne}>
                        -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button className="btn" onClick={addOne}>
                        +
                    </button>
                </div>
            </div>
            <div className="total ps-4 fs-5">
                {(productDetail.price * product.quantity).toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                )}
            </div>
            <div className="checkedSpace fs-2 ms-4" onClick={toggleChecked}>
                {product.checked ? (
                    <BsCheckSquare className="checked text-success" />
                ) : (
                    <BsSquare className="unchecked text-light" />
                )}
            </div>
        </div>
    );
}
