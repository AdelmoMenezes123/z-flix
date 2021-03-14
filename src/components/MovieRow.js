import React, { useState } from 'react';
import './MovieRow.css';
import Tmdb from '../Tmdb';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
    const [scrollX, setScrollX] = useState(-400);
    const [Id, setId] = useState("tt6470478");

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


    const handleClick = async (lista_id) => {
        let id = items.results.[lista_id].id;
        let filme = await Tmdb.getMovieInfo(id, 'tv');
        let idFilme = filme.external_ids['imdb_id'];
        console.log(idFilme)
        setId(idFilme)
        // this.preventDefault()

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
                        <div key={key} className="movieRow--item" onClick={() => handleClick(key)}>
                            <a target="_blank" href={'https://megahdfilmes.com/api-embed/?type=tvshows&imdb=' + Id}>
                                <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.original_title} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}