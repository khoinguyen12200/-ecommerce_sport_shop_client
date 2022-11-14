import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

function Brands({ }: Props) {
    return (
        <section className='px-5'>
            <h1 className='mb-5'>
                Thương hiệu nổi bật
            </h1>
            <div className="Brands">
                <Brand
                    link={'/products?category=nike'}
                    src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_675,c_limit/cb91797a-6054-4201-8bee-c08700c83e47/nike-just-do-it.png"
                    name="Nike" />
                <Brand
                    link={'/products?category=adidas'}
                    src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/viVN/Images/football-fw22-worldcup-brandcampaign-launch-homepage-masthead-d_tcm337-960051.jpg"
                    name="Adidas" />
                <Brand
                    link={'/products?category=puma'}
                    src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/534870/04/mod01/fnd/PNA/fmt/png/PUMA-x-LAUREN-LONDON-Shorts"
                    name="Puma" />
                <Brand
                    link={'/products?category=fila'}
                    src="https://www.filavietnamve.com/images/tennis.jpg"
                    name="Fila" />
            </div>

        </section>
    )
}

function Brand({ link, src, name, video }: { link: string, src: string, name: string, video?: boolean }) {
    return (
        <Link to={link} className="brand">
            {video ?
                <video className='mainImage' src={src} autoPlay loop muted /> :
                <img className='mainImage' src={src} alt={name} />}

            <div className="brandName">
                <span>
                    {name}
                </span>
            </div>
        </Link>
    )
}

export default Brands