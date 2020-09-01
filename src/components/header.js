import React from 'react';
import './header.css';

export default({black})=>{
    return (
       <header className={black ? 'black' : ''}>
           <div className="header--logo">
                <a href="/">
                    <img src="https://i.imgur.com/dxq3861.jpg?1" alt="logo z-flix" />
                </a>
           </div>

           <div className="user">
                <a href="/"> 
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTd2XLIERGz1ShtjjM_iU_XICBkhrJbxUoIYw&usqp=CAU" alt="logo z-flix" />
                </a>
           </div>
       </header>
    );
}
