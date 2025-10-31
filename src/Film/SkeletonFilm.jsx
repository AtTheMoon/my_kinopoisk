import React from 'react'
import './Film.css'

const SkeletonFilm = () => {
  return (
    <div className='film skeleton'>
      <div className="film__wrap">
        <div className="film__img skeleton-box"></div>
        <div className="film__title skeleton-box short"></div>
        <div className="film__genre skeleton-box"></div>
      </div>
    </div>
  )
}

export default SkeletonFilm
