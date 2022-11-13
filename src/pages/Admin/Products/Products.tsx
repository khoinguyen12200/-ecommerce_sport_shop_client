import React, { FormEvent, useEffect } from 'react'
import { Button, Image, Modal, Spinner, Table } from 'react-bootstrap'
import { ENDPOINT } from '../../../config/config'
import useFetch from '../../../hooks/useFetch'
import BaseLayout from '../BaseLayout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { getProductGalleryPath, getProductImagePath } from '../../../helper/PathHelper'
import { setProducts } from '../../../redux/adminDataSlice'
import { Link, useSearchParams } from 'react-router-dom'

type Props = {}

function Product({ }: Props) {
    let [searchParams, setSearchParams] = useSearchParams();

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
        const jsonParams = Object.fromEntries(searchParams.entries())

        let params = {
            ...DEFAULT_SEARCH_PARAMS,
            ...jsonParams
        };

        const res = await axios.get(ENDPOINT + '/products', { params });
        setProduct(res.data.data.products);
        setPages(res.data.data.pages);
    }

    function getLinkToPage(page: number) {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.toString();
    }

    return (
        <BaseLayout title="Sản phẩm" rightSpace={
            <Link to='/admin/product/add' className="btn me-1 btn-dark">Thêm</Link>
        }>
            <div>
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
                                    <ModalDeleteProduct reload={fetch} product={product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>



                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            Array.from(Array(pages).keys()).map((page: number) => (
                                <li className="page-item">
                                    <Link className="page-link" to={`/admin/product?${getLinkToPage(page+1)}`}>{page + 1}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </BaseLayout>
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

function ModalAddProduct({ reload }: any) {
    const categories = useAppSelector(state => state.admin.categories)

    const [show, setShow] = useState(false);

    //loading
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.target as HTMLFormElement;
        //get all value to json
        const formData = new FormData(e.currentTarget);

        //toastify loading
        await toast.promise(
            sendForm(formData),
            {
                pending: 'Đang thêm sản phẩm',
                success: 'Thêm sản phẩm thành công',
                error: 'Thêm sản phẩm thất bại'
            }
        ).then(() => {
            form.reset();
            reload();
        }).finally(() => {
            setLoading(false);
            handleClose();
        })

    }

    async function sendForm(formData: FormData) {
        let res = await axios.post(ENDPOINT + '/admin/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }


    return (
        <>
            <button className="btn btn-sm me-1 btn-info" onClick={handleShow}>Thêm</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitForm}>
                    <Modal.Body>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="name" name="name" required />
                        </div>
                        {/* description */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô tả</label>
                            <textarea className="form-control" id="description" name="description" rows={3}></textarea>
                        </div>
                        {/* categories multiple */}
                        <div className="mb-3">
                            <label htmlFor="categories" className="form-label">
                                Loại sản phẩm
                            </label>
                            <div className="form-check d-flex flex-wrap gap-2">
                                {categories && categories.map((category: any, index: number) => (
                                    <div className='px-3'>
                                        <input className="form-check-input" type="checkbox" name="categories[]" id={category.id} value={category.id} required />
                                        <label className="form-check-label" htmlFor={category.id}>
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Giá</label>
                            <input type="number" className="form-control" id="price" name="price" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Ảnh</label>
                            <input type="file" className="form-control" id="image" name="image" />
                        </div>
                        {/* array size */}
                        <div className="mb-3">
                            <label htmlFor="sizes" className="form-label">Size</label>
                            <input type="text" className="form-control" id="sizes" name="sizes" />
                        </div>
                        {/* quantity */}
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Số lượng</label>
                            <input type="number" className="form-control" id="quantity" />
                        </div>
                        {/* unit */}
                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">Đơn vị</label>
                            <input type="text" className="form-control" id="unit" />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type='button' onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button disabled={loading} type="submit" variant="primary">
                            Lưu
                            {loading && <Spinner className='ms-2' animation="grow" size='sm' />}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

function ModalEditProduct({ reload, product }: any) {

    const [show, setShow] = useState(false);
    const categories = useAppSelector(state => state.admin.categories);

    //loading
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(e.currentTarget);

        //toastify loading
        await toast.promise(
            sendForm(formData),
            {
                pending: 'Đang sửa sản phẩm',
                success: 'Sửa sản phẩm thành công',
                error: 'Sửa sản phẩm thất bại'
            }
        ).then(() => {
            form.reset();
            reload();
        }).finally(() => {
            setLoading(false);
            handleClose();
        })

    }

    async function sendForm(formData: FormData) {
        let res = await axios.post(ENDPOINT + '/admin/product/edit/' + product.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    return (
        <>
            <button className="btn btn-sm btn-success me-1" onClick={handleShow}>Sửa</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitForm}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="name" name="name" required defaultValue={product.name} />
                        </div>
                        {/* description */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô tả</label>
                            <textarea className="form-control" id="description" name="description" rows={3}
                                defaultValue={product.description}
                            ></textarea>
                        </div>
                        {/* categories multiple */}
                        <div>
                            <label htmlFor="categories" className="form-label">
                                Loại sản phẩm
                            </label>
                            <div className="form-check d-flex flex-wrap gap-2">
                                {
                                    categories && categories.map((category: CategoryInterface, index: number) => (
                                        <div className='px-3'>
                                            <input className="form-check-input" type="checkbox" name="categories[]" id={category.id} value={category.id}
                                                defaultChecked={product.categories.filter((c: any) => c.id === category.id).length > 0}
                                            />
                                            <label className="form-check-label" htmlFor={category.id}>
                                                {category.name}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Giá</label>
                            <input type="number" className="form-control" id="price" name="price" required defaultValue={product.price} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Ảnh</label>
                            <input type="file" className="form-control" id="image" name="image" />
                        </div>
                        {/* array size */}
                        <div className="mb-3">
                            <label htmlFor="sizes" className="form-label">Size</label>
                            <input type="text" className="form-control" id="sizes" name="sizes" defaultValue={product.sizes} />
                        </div>
                        {/* quantity */}
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Số lượng</label>
                            <input type="number" className="form-control" id="quantity" defaultValue={product.quantity} />
                        </div>
                        {/* unit */}
                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">Đơn vị</label>
                            <input type="text" className="form-control" id="unit" defaultValue={product.unit} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type='button' onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button disabled={loading} type="submit" variant="primary">
                            Lưu
                            {loading && <Spinner className='ms-2' animation="grow" size='sm' />}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

function ModalDeleteProduct({ product, reload }: any) {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleDelete() {
        setLoading(true)
        await toast.promise(
            sendForm(),
            {
                pending: 'Đang xoá ...',
                success: 'Xoá xong',
                error: 'Có lỗi xảy ra'
            }
        ).then(() => {
            reload()
        }).finally(() => {
            handleClose();
            setLoading(false)
        })

    }

    async function sendForm() {
        await axios.delete(ENDPOINT + '/admin/product/' + product.id);
    }

    return (
        <>
            <button onClick={handleShow} className="btn btn-sm btn-danger">Xóa</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button disabled={loading} variant="danger" onClick={handleDelete}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Product