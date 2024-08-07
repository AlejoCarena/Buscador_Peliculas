import { useState } from "react"
export const BuscadorPeliculas = () => {

  const UrlBase ='https://api.themoviedb.org/3/search/movie'

  const Api_key = 'd9d506208d965926dbc9eb56b2e1ce4f'

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPeliculas()
  }

  const fetchPeliculas = async () =>{
    try {
      const response = await fetch(`${UrlBase}?query=${busqueda}&api_key=${Api_key}`)
      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }
      const data = await response.json()
      setPeliculas(data.results)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador De Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="buscar pelicula"
        value={busqueda}
        onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            {pelicula.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
              />
            )}
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
