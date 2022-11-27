import React from 'react'
import { SiNike, SiAdidas, SiPuma, SiIconify, SiMega } from 'react-icons/si';


type Props = {}

function FirstSection({}: Props) {
  return (
    <section className='firstSection'>
        <div className='brandContainer justify-content-end text-white fs-2 d-flex gap-3'>
          <SiNike className='brandIcon' />
          <SiAdidas className='brandIcon' />
          <SiPuma className='brandIcon' />
          <SiIconify className='brandIcon' />
          <SiMega className='brandIcon' />
        </div>
        <div className="sectionContent">
          <video autoPlay className='bg' src={require('../../../assets/videos/first_section.mp4')} />
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
  )
}

export default FirstSection