import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import PlayerImage from '../../../assets/images/woman_playing_sport.png';
import * as Elements from '../../../Components/Elements/Elements';
import { SiNike, SiAdidas, SiPuma, SiIconify, SiMega } from 'react-icons/si';
import { motion } from 'framer-motion';


type Props = {}

function Home({ }: Props) {


  return (
    <div className='HomePage'>
      <section className='firstSection'>
        <div className='brandContainer justify-content-end text-white fs-2 d-flex gap-3'>
          <SiNike className='brandIcon' />
          <SiAdidas className='brandIcon' />
          <SiPuma className='brandIcon' />
          <SiIconify className='brandIcon' />
          <SiMega className='brandIcon' />
        </div>
        <div className="sectionContent">
          <img className='bg' src="https://img.freepik.com/free-photo/young-healthy-man-athlete-posing-confident-with-ropes-gym_155003-32053.jpg?w=1800&t=st=1667472075~exp=1667472675~hmac=e468cadb051f39a54404fce9cbb40366e177524c3fd7aee7704e4c16edc97d08" />
          <div className='textContainer'>
            <div className='slogan'>
              <p>
                SPORTERUS - Cửa hàng thể thao
              </p>
              <h1>
                Nơi chuẩn bị cho chiến trường của bạn
              </h1>
            </div>
          </div>
        </div>
      </section>
      <SectionCategories />

      <section className='bg-black text-white p-5'>
        <div className='slogan1 text-center' >
          <div className="txt1">
            Miễn phí giao hàng toàn quốc
          </div>
          <div className="txt2">
            với các đơn hàng trị giá từ
            <span className="txt3 ms-2">
              100.000 ĐỒNG
            </span>
          </div>
        </div>
      </section>

    </div>
  )
}

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
            title='Quần áo thể thao'
            src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto,c_scale,w_0.5/video/upload/football-fw22-manchesterunited-away-hp-tcc_pm02ak.mp4"
            desc="Chất thể thao trên từng đường may" />
        </motion.div>

        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          animate={visible && { x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        > <CategoryItem
            title='Phụ kiện thể thao'
            src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto,c_scale,w_0.5/video/upload/training-ss22-bra_rev-launch-hp-teaser_carousel-d_azo0a8.mp4"
            desc="Cuối cùng nhưng không kém phần quan trọng" />
        </motion.div>
      </div>
    </section>

  )
}

function CategoryItem({ title, src, desc }: { title: string, src: string, desc: string }) {
  return (
    <div className="categoryItem">
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
    </div>
  )
}

export default Home;