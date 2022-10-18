import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import PlayerImage from '../../../assets/images/woman_playing_sport.png';
import * as Elements from '../../../Components/Elements/Elements';
import { SiNike, SiAdidas, SiPuma, SiIconify, SiMega } from 'react-icons/si';


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
        </div>
      </section>
      <Elements.WaveDivider color='white' />
    </div>
  )
}

export default Home