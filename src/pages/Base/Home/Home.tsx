import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import PlayerImage from '../../../assets/images/woman_playing_sport.png';
import * as Elements from '../../../Components/Elements/Elements';
import { motion } from 'framer-motion';
import SectionCategories from './SectionCategories';
import FirstSection from './FirstSection';
import FreeShip from './FreeShip';
import Brands from './Brands';


type Props = {}

function Home({ }: Props) {


  return (
    <div className='HomePage'>
      <FirstSection />

      <SectionCategories />
      <FreeShip />
      <Brands />


    </div>
  )
}



export default Home;