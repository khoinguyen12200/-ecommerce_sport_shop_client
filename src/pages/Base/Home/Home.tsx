import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import PlayerImage from '../../../assets/images/woman_playing_sport.png';
import * as Elements from '../../../Components/Elements/Elements';

type Props = {}

function Home({ }: Props) {
  return (
    <div className='HomePage'>
      <section className='firstSection'>
        {/* <img src={PlayerImage} className='bg'/> */}
        <div className='imageContainer'>
          <img className='playerImage' src={PlayerImage} />
        </div>
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
      </section>
      <Elements.WaveDivider color='white' />
    </div>
  )
}

export default Home