import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import './App.css';
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/header'


export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader,setBlackHeader] = useState(true);

    useEffect(()=>{
        const loadAll = async () => {
            //Pegando a lista
            let list = await Tmdb.getHomeList();
            setMovieList(list)

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
        </div>
    );

}