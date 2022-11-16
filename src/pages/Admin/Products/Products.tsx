import React, { FormEvent, useEffect } from 'react'
import { Button, Image, Modal, Spinner, Table } from 'react-bootstrap'
import { ENDPOINT } from '../../../config/config'
import useFetch from '../../../hooks/useFetch'
import BaseLayout from '../BaseLayout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { getLinkToPage, getProductGalleryPath, getProductImagePath } from '../../../helper/PathHelper'
import { setProducts } from '../../../redux/adminDataSlice'
import { Link, useSearchParams } from 'react-router-dom'
import Wrapper from '../Wrapper'
import BaseContent from '../BaseContent';
import { setLoading } from '../../../redux/loadingSlice'

type Props = {}

function Product({ }: Props) {
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const DEFAULT_SEARCH_PARAMS = {
        root: true,
        limit: 10,
        page: 1,
    };

    const [products, setProduct] = useState<ProductInterface[]>([])
    const [pages, setPages] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, [searchParams])

    async function fetchProducts() {
        dispatch(setLoading(true));
        
        await fetchProductAction();

        dispatch(setLoading(false));
    }

    async function fetchProductAction() {
        const jsonParams = Object.fromEntries(searchParams.entries())

        let params = {
            ...DEFAULT_SEARCH_PARAMS,
            ...jsonParams
        };

        const res = await axios.get(ENDPOINT + '/products', { params });
        setProduct(res.data.data.products);
        setPages(res.data.data.pages);
    }

    return (
            <BaseContent
                title='Danh sách sản phẩm'
                rightContent = {
                    <Link to='/admin/product/add' className='btn btn-primary'>Thêm sản phẩm</Link>
                }
            >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Ảnh</th>
                            <th className='text-center'>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: ProductInterface, index: number) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <div>
                                        {product.name}
                                    </div>
                                    {
                                        product.variants && (
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                {product.variants.map((variant: ProductInterface, index: number) => (
                                                    <Link to={`/admin/product/edit/${variant.id}`} className="btn btn-sm btn-outline-dark">
                                                        {variant.variantName}
                                                    </Link>
                                                ))}
                                            </div>
                                        )
                                    }
                                </td>
                                <td>{product.price}</td>
                                <td>
                                    <Image thumbnail style={{ maxWidth: 100, maxHeight: 100 }} src={getProductImagePath(product.image)} />
                                </td>

                                <td className='text-center'>
                                    <Link to={`/admin/product/edit/${product.id}`} className="btn btn-sm btn-primary me-1">Sửa</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>



                <nav>
                    <ul className="pagination justify-content-center mt-3">
                        {
                            Array.from(Array(pages).keys()).map((page: number) => (
                                <li className="page-item">
                                    <Link className="page-link" to={`/admin/product?${getLinkToPage(page + 1)}`}>{page + 1}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </BaseContent>
    )
}

function ProductGalleryItem({ gallery, product, reload }: { gallery: ProductGalleryInterface, product: ProductInterface, reload: any }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function sendDelete() {
        toast.promise(
            deleteGallery(),
            {
                pending: 'Đang xóa',
                success: 'Xóa thành công',
                error: 'Xóa thất bại'
            }
        )
    }

    async function deleteGallery() {
        await (await axios.delete(ENDPOINT + '/admin/product/' + product.id + '/gallery/' + gallery.id))
        handleClose();
        reload();
    }

    return (

        <div className='position-relative'>
            <Image thumbnail style={{ maxWidth: 100, maxHeight: 100 }} src={getProductGalleryPath(gallery.path)} />
            <div className='position-absolute bottom-0 end-0'>
                <button onClick={handleShow} className='btn btn-danger btn-sm'>x</button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xóa ảnh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa ảnh này?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button variant="primary" onClick={sendDelete}>
                            Xoá
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>

    )
}

function ModalAddProductGallery({ product, reload }: { product: ProductInterface, reload: any }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [file, setFile] = useState<File | null | undefined>(null);
    const [loading, setLoading] = useState(false);

    async function sendAdd() {
        toast.promise(
            addGallery(),
            {
                pending: 'Đang thêm',
                success: 'Thêm thành công',
                error: 'Thêm thất bại'
            }
        )
    }

    async function addGallery() {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file as File);
        await axios.post(ENDPOINT + '/admin/product/' + product.id + '/gallery', formData)

        reload();
        setLoading(false);
    }

    async function onChangeFile(e: any) {
        setFile(e.target.files[0]);
        sendAdd();
    }

    return (
        <>
            <button onClick={handleShow} className='btn btn-primary btn-sm ms-1'>+</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='file' onChange={onChangeFile}
                        className='form-control' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={sendAdd}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Product