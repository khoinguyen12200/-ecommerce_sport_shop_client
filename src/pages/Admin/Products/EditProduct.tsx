import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../../../config/config';
import { getProductGalleryPath, getProductImagePath } from '../../../helper/PathHelper';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import BaseLayout from '../BaseLayout/BaseLayout';
import ReactQuill from 'react-quill';
import BaseContent from '../BaseContent';
import { setLoading } from '../../../redux/loadingSlice';

type Props = {}

function EditProduct({ }: Props) {
    const categories = useAppSelector(state => state.admin.categories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let params = useParams();
    const productId = params.id;
    const [product, setProduct] = React.useState<ProductInterface | null>(null);
    async function fetch() {
        dispatch(setLoading(true));
        try {
            const res = await axios.get(ENDPOINT + '/product/' + productId);
            setProduct(res.data.data);
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu sản phẩm');
        }
        dispatch(setLoading(false));
    }
    React.useEffect(() => {
        fetch();
    }, [productId]);


    //product description
    const [description, setDescription] = useState<string>(product?.description || '');
    useEffect(() => {
        setDescription(product?.description || '');
    }, [product?.description])


    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const categories = document.querySelectorAll('input[name="categories[]"]:checked');
        if (categories.length === 0) {
            toast.error('Vui lòng chọn ít nhất một loại sản phẩm');
            return;
        }

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            ...Object.fromEntries(formData.entries()),
            description,
            categories: Array.from(categories).map((category: any) => category.value)
        };

        await toast.promise(
            sendForm(data),
            {
                pending: 'Đang sửa sản phẩm',
                success: 'Sửa sản phẩm thành công',
                error: 'Sửa sản phẩm thất bại'
            }
        ).then(() => {
            form.reset();
            fetch();
        })

    }

    async function sendForm(formData: any) {
        let res = await axios.put(ENDPOINT + '/admin/product/' + product?.id, formData)
    }

    async function handleDeleteProduct() {
        const sure = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (!sure) {
            return;
        }

        dispatch(setLoading(true));

        toast.promise(
            sendDelete(),
            {
                pending: 'Đang xóa sản phẩm',
                success: 'Xóa sản phẩm thành công',
                error: 'Xóa sản phẩm thất bại'
            }
        )

        dispatch(setLoading(false));
        navigate('/admin/product');
    }

    async function sendDelete() {
        await axios.delete(ENDPOINT + '/admin/product/' + product?.id);
    }



    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <BaseContent
            title={product.parentId ? 'Sửa biến thể sản phẩm' : 'Sửa sản phẩm'}
            rightContent={
                product.parentId ?
                    <Link to={`/admin/product/edit/${product.parentId}`} className="btn btn-outline-dark btn-sm">
                        <FaArrowLeft></FaArrowLeft> Quay lại
                    </Link> :
                    <Link to={`/admin/product`} className="btn btn-outline-dark btn-sm">
                        <FaArrowLeft></FaArrowLeft> Quay lại
                    </Link>
            }
        >

            <form onSubmit={handleSubmitForm} method="POST" className='EditProductForm'>
                {
                    product.parentId && (
                        <div className="mb-3">
                            <label htmlFor="variantName" className="form-label">
                                <b>
                                    Tên biến thể
                                </b>
                            </label>
                            <input required type="text" className="form-control" name="variantName" id="variantName" defaultValue={product.variantName} />
                        </div>
                    )
                }
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                    <input type="text" className="form-control" id="name" name="name" required defaultValue={product.name} />
                </div>
                <ProductImage product={product} fetch={fetch} />
                <ProductGalleryImages product={product} fetch={fetch} />
                <Variants product={product} reload={fetch} />

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Mô tả sản phẩm</label>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} />
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
                {/* quantity */}
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Số lượng</label>
                    <input type="number" className="form-control" name="quantity" id="quantity" defaultValue={product.quantity} />
                </div>
                {/* unit */}
                <div className="mb-3">
                    <label htmlFor="unit" className="form-label">Đơn vị</label>
                    <input type="text" className="form-control" id="unit" defaultValue={product.unit} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Sửa sản phẩm
                </button>

                <button type="button" onClick={handleDeleteProduct} className="btn btn-outline-danger ms-2">
                    Xóa
                </button>
            </form>
        </BaseContent>
    )
}

function ProductImage({ product, fetch }: { product: ProductInterface, fetch: any }) {

    const [image, setImage] = useState<any>(null);

    function onChangeImage(e: any) {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const formData = new FormData();
            files.forEach((file: any, i) => {
                setImage(file);
            })
        }
    }

    useEffect(() => {
        if (image) {
            sendImages();
        }
    }, [image])

    async function sendImages() {
        const formData = new FormData();
        formData.append('image', image);
        await axios.post(`${ENDPOINT}/admin/product/${product.id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.success('Cập nhật ảnh thành công');
        fetch();
    }

    return (
        <div className="mb-3">
            <label htmlFor="image" className="form-label">Ảnh đại diện</label>
            <input className="form-control" type="file" id="image" onChange={onChangeImage} />
            {
                product.image && (
                    <div className='p-2'>
                        <Image src={getProductImagePath(product.image)} alt={product.name} thumbnail width={100} height={100} />
                    </div>
                )
            }
        </div>
    )
}

function ProductGalleryImages({ product, fetch }: { product: ProductInterface, fetch: any }) {

    const [image, setImage] = useState<any>(null);

    function onChangeImage(e: any) {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const formData = new FormData();
            files.forEach((file: any, i) => {
                setImage(file);
            })
        }
    }

    useEffect(() => {
        if (image) {
            sendImages();
        }
    }, [image])

    async function sendImages() {
        const formData = new FormData();
        formData.append('file', image);
        await axios.post(`${ENDPOINT}/admin/product/${product.id}/gallery`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setImage(null);
        toast.success('Cập nhật ảnh thành công');
        fetch();
    }

    async function handleDeleteGallery(id: string) {
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa ảnh này?');
        if (confirm) {
            await axios.delete(`${ENDPOINT}/admin/product/${product.id}/gallery/${id}`);
            toast.success('Xóa ảnh thành công');
            fetch();
        }
    }

    return (
        <div className="mb-3">
            <label htmlFor="image" className="form-label">Ảnh mô tả sản phẩm</label>
            <input className="form-control" type="file" onChange={onChangeImage} />
            {
                product.productGalleries && (
                    <div className='p-2 d-flex flex-wrap align-items-end'>
                        {
                            product.productGalleries.map((gallery: ProductGalleryInterface) => (
                                <div className='p-3 position-relative'>
                                    <img className='border rounded p-1' src={getProductGalleryPath(gallery.path)} alt={product.name} width={100} height={100} />
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-secondary position-absolute top-0 end-0 m-1"
                                        onClick={() => handleDeleteGallery(gallery.id)}>
                                        Xóa
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

function Variants({ product, reload }: { product: ProductInterface, reload: any }) {


    async function addVariant(name: string) {
        const variantData = {
            variantName: name,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            unit: product.unit,
            parentId: product.id,
            categories: product.categories.map((category: CategoryInterface) => category.id),
        };

        const res = await axios.post(ENDPOINT + `/admin/product`, variantData);
        reload();
    }

    async function sendAddVarirant() {
        const name = prompt('Nhập tên biến thể');
        if (name) {
            toast.promise(
                addVariant(name),
                {
                    pending: 'Đang thêm biến thể',
                    success: 'Thêm biến thể thành công',
                    error: 'Thêm biến thể thất bại'
                }
            )
        }
    }

    if (product.parentId) {
        return <></>
    }

    return (
        <div className="variants mb-3">
            <label>Biến thể</label>
            <div className="variants-list p-2 gap-2 d-flex flex-wrap align-items-center">
                {
                    product.variants.map((variant: ProductInterface, index: number) => (
                        <Link to={`/admin/product/edit/${variant.id}`} className="variant btn btn-sm btn-outline-secondary px-4">
                            {
                                variant.variantName
                            }
                        </Link>
                    ))
                }
                <button type="button" onClick={sendAddVarirant} className="btn btn-sm btn-outline-primary">
                    Thêm biến thể +
                </button>
            </div>
        </div>
    )
}

export default EditProduct