/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

function MovieList() {
  const [movies, setMovies] = useState([])


  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=28a2e66cb67dc5d4f8e6f5f7471ffe6e&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results)
      })
  }, [])

  if (movies.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    )
  } else {
    const movieItems = movies.map((movie, index) =>
      <MovieListItem key={index} movie={movie} />
    );

    return (
      <div style={{ flex: 1, padding: 20 }}>
        {movieItems}
      </div>
    )
  }
}

function MovieListItem(props) {
  const [movie, setMovie] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [videoKey, setvideoKey] = useState("")

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(1, 1, 1, 75%)',
    },
  };

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + props.movie.id + '?api_key=28a2e66cb67dc5d4f8e6f5f7471ffe6e&append_to_response=videos')
      .then(response => {
        setMovie(response.data)
      })
  }, [])

  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
  let imageurl = IMAGEPATH + props.movie.poster_path;

  // get genres
  var genres = "";
  if (movie !== undefined && movie.genres !== undefined) {
    for (var i = 0; i < movie.genres.length; i++) {
      genres += movie.genres[i].name + " ";
    }
  }

  // get first youtube video
  var video = "";
  if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined) {
    video = <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => videoPressed(movie.videos.results[0].key)} >{movie.videos.results[0].name}</span>
  }

  const videoPressed = (key) => {
    console.log("Key " + key)
    setvideoKey(key);
    openModal();

  }


  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const opts = {
    height: '480',
    width: '720',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="Movie">
      <img src={imageurl} />
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br />
      <span className="VideosText">Video: {video}</span>
      <Modal
        style={customStyles}
        appElement={document.getElementById('root') || undefined}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
      >
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="content">
          <div>
            <p className="MovieTitle">{props.movie.original_title}</p>
          </div>
          <div>
            <YouTube videoId={videoKey} opts={opts} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <h1>Now playing @ Movie DB</h1>
      <MovieList />
    </div>
  );
}

export default App;
