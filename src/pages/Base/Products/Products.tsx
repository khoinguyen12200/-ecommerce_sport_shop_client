import axios from 'axios';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { getProductImagePath } from '../../../helper/PathHelper';
import './Products.scss';


type Props = {}

function Product({ }: Props) {

    const location = useLocation();
    const [products, setProducts] = React.useState([]);

    async function fetchProducts() {
        const params = new URLSearchParams(window.location.search);
        const paramsString = params.toString();
        const path = ENDPOINT+'/products?'+paramsString;
        console.log(path);
        const res = await axios.get(path);
        setProducts(res.data);
    }

    React.useEffect(() => {
        fetchProducts();
    }, [location])

    return (
        <div className='ProductsPage'>
            <div>

            </div>
            <div className='productsList'>
                {
                    products.map((product: ProductInterface) => (
                        <ProductItem product={product} />
                    ))

                }
            </div>
        </div>
    )
}

function ProductItem({product}: {product: ProductInterface}) {
    return (
        <Link to={`/product/${product.id}`} className='ProductItem'>
            <img className='img' src={getProductImagePath(product.image)} />
            <div className='info'>
                <div className='name'>{product.name}</div>
                <div className='price'>
                    {
                        product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    }
                </div>
            </div>
        </Link>
    )
}

export default Product