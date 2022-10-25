import React, { FormEvent, useEffect } from 'react'
import { Button, Image, Modal, Spinner, Table } from 'react-bootstrap'
import { ENDPOINT } from '../../../config/config'
import useFetch from '../../../hooks/useFetch'
import BaseLayout from '../BaseLayout/BaseLayout'
import { useAppDispatch } from '../../../redux/store';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { getProductImagePath } from '../../../helper/PathHelper'

type Props = {}

function Product({ }: Props) {

    const [products, setProducts] = useState([]);

    async function fetch() {
        const res = await  axios.get(ENDPOINT + '/admin/product');
        const data = res?.data?.products;
        setProducts(data);
    }

    useEffect(() => {
        fetch()
    },[])

    return (
        <BaseLayout title="Sản phẩm" rightSpace={<ModalAddProduct reload={fetch} />}>
            <div style={{ height: 5000 }}>
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
                        {products.map((product: any, index: number) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Image thumbnail style={{maxWidth:100, maxHeight:100}} src={getProductImagePath(product.image)}/>
                                </td>
                                <td className='text-center'>
                                    <button className="btn btn-sm me-1 btn-primary">Sửa</button>
                                    <ModalDeleteProduct reload={fetch} product={product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </BaseLayout>
    )
}

function ModalAddProduct({ }: any) {
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
            <button className="btn btn-sm btn-success" onClick={handleShow}>Thêm</button>
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
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Giá</label>
                            <input type="number" className="form-control" id="price" name="price" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Ảnh</label>
                            <input type="file" className="form-control" id="image" name="image" />
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

function ModalEditProduct({ }: Props) {
    return (
        <div>

        </div>
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
        }).finally(() =>{
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