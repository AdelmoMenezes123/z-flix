import React from 'react';
import './FeaturedMovie.css';


export default ({ item }) => {

    let firstDate = new Date(item.first_air_date);

    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    let description = item.overview;

    if (description.length > 200) {
        description = description.substring(0, 200) + '...';
    }
    
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`

        }}>

            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} Pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_season} Temporada {item.number_of_season !== 1 ? 's' : ''} </div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        {/* `https://videospider.in/getvideo?key=Ez99ULqORLkSi7LH&video_id=${item.id}` */}
                        <a target="_blank" href={'https://megahdfilmes.com/api-embed/?type=tvshows&imdb='+item.external_ids['imdb_id']} className="featured--watchbutton">▶ Assitir</a>
                        <a target="_blank" href={'#'} className="featured--mylistbutton">✚ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>

                </div>
            </div>

        </section>
    );
}