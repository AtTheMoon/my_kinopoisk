import React from 'react'
import '../Film/Film.css'

const Film = ({film}) => {
    
  return (
    <div className='film'>
        <div className="film__wrap">
            <div className="film__img">
                <img src={film.posterUrl !== 'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png' ? film.posterUrl : 'https://35mmco.com/cdn/shop/files/35MM_ALBUMS_HIGHRES-24_1200x.jpg?v=1760247678'} alt="" />
            </div>
            <div className="film__title">{film.nameRu}</div>
            <div className="film__genre">{film.genres.map(g=>g.genre).join(', ')}</div>
        </div>
    </div>
  )
}

export default Film