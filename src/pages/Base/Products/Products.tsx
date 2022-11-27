import axios from "axios";
import React, { useMemo } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ENDPOINT } from "../../../config/config";
import {
    getLinkToPage,
    getProductGalleryPath,
    getProductImagePath,
} from "../../../helper/PathHelper";
import "./Products.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setLoading } from "../../../redux/loadingSlice";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "react-toastify";

type Props = {};

function Product({}: Props) {
    const [showFilter, setShowFilter] = useState(false);
    const categories = useAppSelector((state) => state.publicData.categories);
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    function setOneParamOfSearchParams(name: string, value: string) {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);
        setSearchParams(params);
    }

    const category = useMemo(() => {
        return searchParams.get("category");
    }, [searchParams]);

    const [categoryName, setCategoryName] = useState("Tất cả sản phẩm");

    useEffect(() => {
        if (category) {
            categories.forEach((c) => {
                if (c.slug === category) {
                    setCategoryName(c.name);
                }
            });
        } else {
            setCategoryName("Tất cả sản phẩm");
        }
    }, [category, categories]);

    const location = useLocation();
    const [products, setProducts] = React.useState([]);
    const [pages, setPages] = React.useState(0);

    async function fetchProducts() {
        const params = new URLSearchParams(window.location.search);
        const paramsString = params.toString();
        const path = ENDPOINT + "/products?" + paramsString;

        dispatch(setLoading(true));
        const res = await axios.get(path).finally(() => {
            dispatch(setLoading(false));
        });
        setProducts(res.data.data.products);
        setPages(res.data.data.pages);
    }

    React.useEffect(() => {
        fetchProducts();
    }, [location, searchParams]);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (transcript) {
            setSearchText(transcript);
        }
    }, [transcript]);

    useEffect(() => {
        if (listening) {
            resetTranscript();
            setSearchText("");
            const id = toast.loading("Đang nghe...");

            return () => {
                toast.dismiss(id);
            };
        }
    }, [listening]);

    function toggleListening() {
        if (listening) {
            SpeechRecognition.stopListening();
            applySearchText();
        } else {
            SpeechRecognition.startListening({
                continuous: true,
                language: "vi-VN",
            });
        }
    }

    function applySearchText() {
        setOneParamOfSearchParams("name", searchText);
        SpeechRecognition.stopListening();
    }

    return (
        <div className="ProductsPage pt-5">
            <Filter show={showFilter} setShow={setShowFilter} />
            <div className="d-flex justify-content-between">
                <div className="ml-4">
                    <div className="input-group overflow-hidden">
                        <span className="input-group-text fw-bold text-bg-secondary">
                            {categoryName}
                        </span>
                        <span
                            onClick={toggleListening}
                            className={`btn ${
                                listening ? "btn-success" : "btn-light"
                            }`}
                        >
                            <i className="fa-solid fa-microphone"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control ps-3"
                            placeholder="Tìm kiếm sản phẩm"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <span className="btn-light btn" onClick={applySearchText}>
                            <i
                                className="fas fa-search"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </span>
                    </div>
                </div>

                <div>
                    <button
                        className="btn btn-primary mr-4"
                        onClick={() => setShowFilter(true)}
                    >
                        Bộ lọc
                        <i className="fas fa-filter ml-2"></i>
                    </button>
                </div>
            </div>

            <div className="productsList">
                {products.map((product: ProductInterface) => (
                    <ProductItem product={product} />
                ))}
            </div>

            <div>
                {pages > 1 && (
                    <nav>
                        <ul className="pagination justify-content-center mt-3 gap-2">
                            {Array.from(Array(pages).keys()).map(
                                (page: number) => (
                                    <li className="page-item">
                                        <Link
                                            className="page-link"
                                            to={`/products?${getLinkToPage(
                                                page + 1
                                            )}`}
                                        >
                                            {page + 1}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}

function ProductItem({ product }: { product: ProductInterface }) {
    const [show, setShow] = React.useState(false);
    return (
        <Link to={`/product/${product.id}`} className="ProductItem">
            <img className="img" src={getProductImagePath(product.image)} />
            <div className="galleries">
                {product.productGalleries?.map(
                    (gallery: ProductGalleryInterface) => (
                        <img
                            className="smallimg"
                            src={getProductGalleryPath(gallery.path)}
                        />
                    )
                )}
            </div>
            <div className="info">
                <div className="name">{product.name}</div>
                <div className="price">
                    {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
            </div>
        </Link>
    );
}

function Filter({
    show,
    setShow,
}: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const SORT_BY = [
        {
            name: "Mặc định",
            value: "id",
        },
        {
            name: "Giá",
            value: "price",
        },
    ];
    const sortBy = useMemo(() => {
        return searchParams.get("sortBy");
    }, [searchParams]);

    const ORDER_BY = [
        {
            name: "Tăng dần",
            value: "asc",
        },
        {
            name: "Giảm dần",
            value: "desc",
        },
    ];

    const orderBy = useMemo(() => {
        return searchParams.get("order");
    }, [searchParams]);

    function setOneParamOfSearchParams(name: string, value: string) {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);
        setSearchParams(params);
    }

    return (
        <div className={`filter p-3 ${!show && "hide"}`}>
            <div className="closeBtn text-right">
                <i
                    className="btn fas fa-times"
                    onClick={() => setShow(false)}
                ></i>
            </div>

            <h2 className="pb-3 mb-2">Sắp xếp</h2>
            <div className="d-flex">
                {SORT_BY.map((item) => (
                    <button
                        className={`btn btn-outline-primary ${
                            sortBy === item.value ? "active" : ""
                        }`}
                        onClick={() =>
                            setOneParamOfSearchParams("sortBy", item.value)
                        }
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            <hr />
            <h2 className="pb-3 mb-2">Thứ tự</h2>
            <div className="d-flex">
                {ORDER_BY.map((item) => (
                    <button
                        className={`btn btn-outline-primary ${
                            orderBy === item.value ? "active" : ""
                        }`}
                        onClick={() =>
                            setOneParamOfSearchParams("order", item.value)
                        }
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <hr />

            <h2 className="pb-3 mb-2">Giá</h2>
            <div className="d-flex flex-column">
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        onChange={(e) =>
                            setOneParamOfSearchParams(
                                "priceFrom",
                                e.target.value
                            )
                        }
                    />
                    <label htmlFor="floatingInput">Từ</label>
                </div>
                <div className="form-floating">
                    <input
                        type="number"
                        className="form-control"
                        onChange={(e) =>
                            setOneParamOfSearchParams("priceTo", e.target.value)
                        }
                    />
                    <label htmlFor="floatingInput">Đến</label>
                </div>
            </div>
        </div>
    );
}

export default Product;
