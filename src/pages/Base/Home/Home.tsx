import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

type Props = {}

function Home({}: Props) {
  return (
    <div>
        <Link to='/login'>Login</Link>
    </div>
  )
}

export default Home