import React from 'react'
import styles from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
export default function Home() {
  return <>
   
     <CategorySlider></CategorySlider>
     <FeaturedProducts></FeaturedProducts>
    </>
  
}
