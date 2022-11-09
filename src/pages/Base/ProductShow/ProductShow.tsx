import axios from 'axios';
import React from 'react'
import { FaTruck } from 'react-icons/fa';
import { GiStarMedal } from 'react-icons/gi';
import { MdOutlineSwapHorizontalCircle } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { getProductGalleryPath, getProductImagePath } from '../../../helper/PathHelper';
import './ProductShow.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { toast } from 'react-toastify';
import { addCartProduct } from '../../../redux/cartSlice';


type Props = {}

function ProductShow({ }: Props) {

    const cartProducts = useAppSelector(state => state.cart.products) || [];

    let params = useParams();
    const productId = params.id;
    const [product, setProduct] = React.useState<ProductInterface>();
    const [mainImage, setMainImage] = React.useState<string | null>(null);
    const [quantity, setQuantity] = React.useState(1);

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(1)
        }
    }

    function increaseQuantity() {
        setQuantity(quantity + 1);
    }

    const dispatch = useAppDispatch();


    React.useEffect(() => {
        fetchProduct();
    }, [productId]);
    async function fetchProduct() {
        const res = await axios.get(ENDPOINT + '/product/' + productId);
        setProduct(res.data);
    }

    function addToCart() {
        const variants =  document.querySelector('input[name="variant"]');
        const variantEl = document.querySelector('input[name="variant"]:checked') as HTMLInputElement;
        if(variants) {
            if (!variantEl) {
                toast.error('Vui lòng chọn loại sản phẩm');
                return;
            }
        }
        dispatch(addCartProduct({
            productId: variantEl?.value || product?.id,
            quantity
        }))
    }

    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <div className='ProductShow'>
            <div className="headSpace">
                <div className='imageSpaces'>
                    <div className="listDescImage">
                        {
                            product.productGalleries.map((image, index) => (
                                <img onClick={() => setMainImage(getProductGalleryPath(image.path))} className='img' src={getProductGalleryPath(image.path)} />
                            ))
                        }
                    </div>
                    <img className='mainImage' src={mainImage ? mainImage : getProductImagePath(product.image)} />
                </div>
                <div className='info'>
                    <div>
                        <div className='name'>{product.name}</div>
                        <div className='price'>
                            {
                                product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            }
                        </div>
                    </div>
                    <div className='slogans'>
                        <div className='slogan'>
                            <div className='icon'>
                                <GiStarMedal />
                            </div>
                            <div className='text'>
                                <div className='title'>Hàng chính hãng</div>
                                <div className='desc'>Chất lượng cao</div>
                            </div>
                        </div>
                        <div className='slogan'>
                            <div className='icon'>
                                <FaTruck />
                            </div>
                            <div className='text'>
                                <div className='title'>Giao hàng miễn phí</div>
                                <div className='desc'>Cho đơn hàng trên 100.000đ</div>
                            </div>
                        </div>
                        <div className='slogan'>
                            <div className='icon'>
                                <MdOutlineSwapHorizontalCircle />
                            </div>
                            <div className='text'>
                                <div className='title'>Thủ tục đổi trả đơn giản</div>
                                <div className='desc'>Giải quyết trong vòng 10 ngày</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sizes d-flex justify-content-end flex-wrap gap-1 mb-3">
                            {
                                product.variants && product.variants.map((variants, index) => (
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="variant" id={variants.id+'variant'} value={variants.id} />
                                        <label className="form-check-label" htmlFor={variants.id+'variant'}>{variants.variantName}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='orderSpaces d-flex justify-content-end '>
                            <div className='order input-group'>
                                <div className="btn btn-secondary">
                                    <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
                                    <span className='mx-2'>
                                        {quantity}
                                    </span>
                                    <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
                                </div>
                                <button className='btn btn-outline-dark btn-lg' onClick={addToCart} style={{ flex: 1 }}>Thêm vào giỏ hàng</button>
                                <button className='btn btn-dark btn-lg' style={{ flex: 1 }}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='description'>
                <div className='title'>Mô tả sản phẩm</div>
                <div className='content' dangerouslySetInnerHTML={{ __html: product.description }}></div>

            </div>
        </div>
    )
}

export default ProductShow