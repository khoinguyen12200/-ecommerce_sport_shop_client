import axios from 'axios';
import React, { FormEvent } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../../../config/config';
import { useAppSelector } from '../../../redux/store';
import BaseLayout from '../BaseLayout/BaseLayout';

type Props = {}

function EditProduct({ }: Props) {
    const categories = useAppSelector(state => state.admin.categories);
    let params = useParams();
    const productId = params.id;
    const [product, setProduct] = React.useState<ProductInterface | null>(null);
    async function fetch() {
        const res = await axios.get(ENDPOINT + '/product/' + productId);
        setProduct(res.data);
    }
    React.useEffect(() => {
        fetch();
    }, [productId]);



    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(e.currentTarget);

        await toast.promise(
            sendForm(formData),
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

    async function sendForm(formData: FormData) {
        let res = await axios.post(ENDPOINT + '/admin/product/edit/' + product?.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    async function handleDeleteProduct() {
        const sure = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (!sure) {
            return;
        }

        toast.promise(
            sendDelete(),
            {
                pending: 'Đang xóa sản phẩm',
                success: 'Xóa sản phẩm thành công',
                error: 'Xóa sản phẩm thất bại'
            }
        )
    }

    async function sendDelete() {
        await axios.delete(ENDPOINT + '/admin/product/' + product?.id);
    }



    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <BaseLayout 
        title={product.parent ? 'Sửa biến thể sản phẩm' : 'Sửa sản phẩm'}
        rightSpace={ 
            product.parent ?
            <Link to={`/admin/product/edit/${product.parent}`} className="btn btn-outline-dark btn-sm">
                <FaArrowLeft></FaArrowLeft> Quay lại
            </Link> :
            <Link to={`/admin/product`} className="btn btn-outline-dark btn-sm">
            <FaArrowLeft></FaArrowLeft> Quay lại
        </Link>
        }
        >

            <form onSubmit={handleSubmitForm} method="POST" className='EditProductForm'>
                {
                    product.parent && (
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
                <Variants product={product} reload={fetch} />
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
        </BaseLayout>
    )
}

function Variants({ product, reload }: { product: ProductInterface, reload: any }) {


    async function addVariant() {
        const name = prompt('Nhập tên biến thể');
        if (name) {
            const formData = new FormData();
            formData.append('variantName', name);
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price.toString());
            formData.append('quantity', product.quantity.toString());
            formData.append('unit', product.unit);

            const res = await axios.post(ENDPOINT + `/admin/product/${product.id}/variant`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            reload();
        }
    }

    async function sendAddVarirant() {
        toast.promise(
            addVariant(),
            {
                pending: 'Đang thêm biến thể',
                success: 'Thêm biến thể thành công',
                error: 'Thêm biến thể thất bại'
            }
        )
    }

    if(product.parent) {
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