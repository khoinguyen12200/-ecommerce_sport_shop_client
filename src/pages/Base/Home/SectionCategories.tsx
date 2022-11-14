import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Props = {}

function SectionCategories() {

    const [visible, setVisible] = React.useState(false);


    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            const listCategories = document.querySelector('.listCategories');
            if (listCategories) {
                const rect = listCategories.getBoundingClientRect();
                if (rect.top + 100 < window.innerHeight) {
                    setVisible(true);
                }
            }
        })
    }, [])



    return (
        <section>
            <h1 className='text-center mb-5'>
                Bạn muốn mua gì?
            </h1>
            <div className="listCategories">

                <motion.div
                    initial={{ x: -1000, opacity: 0 }}
                    animate={visible && { x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <CategoryItem
                        link={'/products?category=giay'}
                        title='Giày thể thao'
                        src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto,c_scale,w_0.5/video/upload/lace-triple-black-hp-teaser-carousel-dtm_1_ppd0pi.mp4"
                        desc="Có hơn 10 hãng giày phù hợp với mọi nhu cầu thể thao" />
                </motion.div>

                <motion.div
                    initial={{ y: 1000, opacity: 0 }}
                    animate={visible && { y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >

                    <CategoryItem
                        link={'/products?category=quan-ao'}
                        title='Quần áo thể thao'
                        src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto,c_scale,w_0.5/video/upload/football-fw22-manchesterunited-away-hp-tcc_pm02ak.mp4"
                        desc="Chất thể thao trên từng đường may" />
                </motion.div>

                <motion.div
                    initial={{ x: 1000, opacity: 0 }}
                    animate={visible && { x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                > <CategoryItem
                        link={'/products?category=trang-bi-khac'}
                        title='Phụ kiện thể thao'
                        src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto,c_scale,w_0.5/video/upload/training-ss22-bra_rev-launch-hp-teaser_carousel-d_azo0a8.mp4"
                        desc="Cuối cùng nhưng không kém phần quan trọng" />
                </motion.div>
            </div>
        </section>

    )
}

function CategoryItem({ title, src, desc, link }: { title: string, src: string, desc: string, link: string }) {
    return (
        <Link to={link} className="categoryItem">
            <div className="categoryImage">
                <video className='image' autoPlay loop muted src={src}>
                </video>
            </div>
            <div className='desc'>
                <h3 className='mb-1'>
                    {title}
                </h3>
                <p className='text-muted'>
                    {desc}
                </p>
            </div>
        </Link>
    )
}

export default SectionCategories