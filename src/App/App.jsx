import React, { useEffect, useState } from 'react'
import '../App/App.css'
import Film from '../Film/Film'
import SkeletonFilm from '../Film/SkeletonFilm'

const App = () => {
  const filmNums = [1, 2, 3, 4, 5]
  const key = process.env.REACT_APP_API_KEY
  const [films, setFilms] = useState([])
  const [filteredFilms, setFilteredFilms] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const filmsPerPage = 20

useEffect(() => {
  async function fetchData() {
    try {
      const requests = filmNums.map(num =>
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?page=${num}`, {
          method: 'GET',
          headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
          },
        }).then(res => res.json())
      );

      const results = await Promise.all(requests);
      const allFilms = results.flatMap(f => f?.films || []);
      setFilms(allFilms);
      setFilteredFilms(allFilms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (key) fetchData();

}, []);



  function handlePerPage(num) {
    window.scrollTo(0, 0)
    setCurrentPage(num)
  }

  function searchFilm(text) {
    if (!text) {
      setFilteredFilms(films)
      setCurrentPage(1)
      return
    }
    const filterArr = films.filter(f =>
      f.nameRu?.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredFilms(filterArr)
    setCurrentPage(1)
  }

  const lastIndex = currentPage * filmsPerPage
  const firstIndex = lastIndex - filmsPerPage
  const currentFilms = filteredFilms.slice(firstIndex, lastIndex)
  const totalPage = Math.ceil(filteredFilms.length / filmsPerPage)

  return (
    <div className='home'>
      <div className="home__title">Kino-gallery</div>
      <input type="text" onChange={(e) => searchFilm(e.target.value)} placeholder='Поиск' />
      {loading ? (
        <div className="home__container">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonFilm key={i} />)}
        </div>
        ) : (
        <>
            <div className="home__container">
            {currentFilms.map(film => film ? <Film key={film.filmId} film={film} /> : null)}
            </div>
            <div className="pagi">
            {Array.from({ length: totalPage }, (_, i) => {
              const pageNum = i + 1;
              return (
                <div
                    onClick={() => handlePerPage(pageNum)}
                    className={`pagi__item ${currentPage === pageNum ? 'active' : ''}`}
                    key={i}
                    >
                    {pageNum}
                  </div>
                );
              })}
            </div>
        </>
      )}
    </div>
  )
}

export default App