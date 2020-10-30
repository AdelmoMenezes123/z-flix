import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import './App.css';
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/header'
import FavoriteIcon from '@material-ui/icons/Favorite';


export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(()=>{
        const loadAll = async () => {
            //Pegando a lista
            let list = await Tmdb.getHomeList();
            setMovieList(list)
            console.log(list)

            //pegando o featured
            let originals = list.filter(i => i.slug === 'originals' );
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let choseanInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
            setFeaturedData(choseanInfo)
        }

        loadAll();
    }, []);

    useEffect(()=>{
        const scrollListener = () => {
            if(window.scrollY > 10){
                setBlackHeader(true);
            }else{
                setBlackHeader(false);
            }
        } 

        window.addEventListener('scroll', scrollListener );

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    },[])


    return ( 
        <div className='page'>

            <Header black={blackHeader}/>
           
           {featuredData && 
                <FeaturedMovie item={featuredData}/>
           }
            <section className="lists">
                {
                    movieList.map((item, key)=>(
                        <MovieRow key={key} title={item.title} items={item.items} />
                    ))
                }
            </section>

            <footer>
                Feito com <spam role="img" arial-label="coração"><FavoriteIcon style={{fontSize: 16}}/></spam> por Adelmo M.<br/>
                Direitos de imagem para Netflix<br/>
                Dados pegos do site TheMoviedb.org
                <a target="_blanck" class="button" href="https://adelmo.vercel.app">Adelmo Menezes</a>
            </footer>

            {movieList <= 0 &&

                <div className="loading">
                    <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando" />
                </div>
            }
        </div>
    );

}