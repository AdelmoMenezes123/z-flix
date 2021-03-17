import React, { useState } from 'react';
import './MovieRow.css';
import Tmdb from '../Tmdb';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
    const [scrollX, setScrollX] = useState(-400);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if (x > 0) {
            x = 0;
        }
        setScrollX(x)
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;

        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }

    const handleClick = async (item) => {
        let lista, idTmdb;

        if (item.video === false) {
            lista = await Tmdb.getMovieInfo(item.id, 'movie')
            idTmdb = 'https://megahdfilmes.com/api-embed/?type=movies&imdb=' + lista.external_ids['imdb_id']
            // link para filmes
            // https://imdbapi.xyz/movie/?c=tt0944947
        } else {
            lista = await Tmdb.getMovieInfo(item.id, 'tv')
            idTmdb = 'https://megahdfilmes.com/api-embed/?type=tvshows&imdb=' + lista.external_ids['imdb_id']
            // link series
            // https://imdbapi.xyz/tv/?c=1399&sea=1&epi=1
        }
        
        document.querySelector(`[id="${item.id}"]`).setAttribute("href", idTmdb)
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className='movieRow--right' onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={
                    {
                        marginLeft: scrollX,
                        width: items.results.length * 150
                    }
                }>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <a target="_blank" id={item.id} onClick={() => handleClick(item)}>
                                <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.title} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}