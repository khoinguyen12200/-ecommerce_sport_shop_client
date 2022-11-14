import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ENDPOINT } from '../../../config/config'
import { fetchProducts } from '../../../redux/adminDataSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import BaseLayout from '../BaseLayout/BaseLayout'
import BaseContent from '../BaseContent';
import ReactQuill from 'react-quill';

type Props = {}

function AddProduct({ }: Props) {

    const categories = useAppSelector(state => state.admin.categories)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [description, setDescription] = useState('');

    const [show, setShow] = useState(false);

    //loading
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const categories = document.querySelectorAll('input[name="categories[]"]:checked');
        if (categories.length === 0) {
            toast.error('Vui lòng chọn ít nhất một loại sản phẩm');
            return;
        }

        setLoading(true);
        

        //get all form data to json
        const formData = new FormData(e.currentTarget);
        const data = {
            ...Object.fromEntries(formData.entries()) ,
            description,
            categories: Array.from(categories).map((category: any) => category.value)
        };
       
        //toastify loading
        await toast.promise(
            sendForm(data),
            {
                pending: 'Đang thêm sản phẩm',
                success: 'Thêm sản phẩm thành công',
                error: 'Thêm sản phẩm thất bại'
            }
        ).finally(() => {
            setLoading(false);
            handleClose();
        })

    }

    async function sendForm(data: any) {
        let res = await axios.post(ENDPOINT + '/admin/product', data)

        navigate('/admin/products')
    }

    return (
        <BaseContent title="Thêm sản phẩm">
            <form onSubmit={handleSubmitForm}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Mô tả sản phẩm</label>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} />
                </div>
                {/* categories multiple */}
                <div className="mb-3">
                    <label htmlFor="categories" className="form-label">
                        Loại sản phẩm
                    </label>
                    <div className="form-check d-flex flex-wrap gap-2">
                        {categories && categories.map((category: any, index: number) => (
                            <div className='px-3'>
                                <input className="form-check-input" type="checkbox" name="categories[]" id={category.id} value={category.id}/>
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
                {/* quantity */}
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Số lượng</label>
                    <input type="number" className="form-control" name="quantity" id="quantity" />
                </div>
                {/* unit */}
                <div className="mb-3">
                    <label htmlFor="unit" className="form-label">Đơn vị</label>
                    <input type="text" className="form-control" id="unit" />
                </div>

                <Button disabled={loading} type="submit" variant="primary">
                    Lưu
                    {loading && <Spinner className='ms-2' animation="grow" size='sm' />}
                </Button>
            </form>
        </BaseContent>
    )
}

export default AddProduct