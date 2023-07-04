(function(){
    const searchKeyword=document.getElementById('search-key');
    const movielists=document.getElementById('movie-list')
    const favMovieLists=document.getElementById('favourites-list');
    // var i=document.getElementsByClassName('')
    addTOFavList();
    let movieList=[];
    let favMoviesList=[];
   

    searchKeyword.addEventListener('keydown',(e)=>{
        if(e.key=='Enter'){
            e.preventDefault();
        }
    });


    // Search Event
    searchKeyword.addEventListener('keyup',()=>{
        let search=searchKeyword.value;
        if(search ===""){
            movielists.innerHTML="";
            movieList=[];
        }else{
            (async ()=>{
                let data=await fetchMovies(search);
                addToList(data);
            })();
        }
    });


    // fetach data from api
    async function fetchMovies(search){
        const url= `https://www.omdbapi.com/?t=${search}&apikey=f2c74d06`;
        try{
            const response =await fetch(url);
            const data =await response.json();
            // console.log(data);
            return data;
        }catch(err){
            console.log(err);
        }
    }

    // show movies in the screen
    function addToList(data){

        let isPresent=false;
        movieList.forEach((movie)=>{
            if(movie.Title==data.Title){
                isPresent=true;
            }
        });

        if(!isPresent && data.Title != undefined){
            if(data.Poster == "N/A"){
               data.Poster= 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png' 
            }
            movieList.push(data);
        // console.log(movieList)
        const li=document.createElement('li');
            li.innerHTML=`<div class="list-container">
            <div class="image-link">
                <a href="">
                    <img src="${data.Poster}" style="width: 100%;" alt="" data-id="${data.Title}">
                </a>
            </div>
            <div class="card-body text-start">
                <h5 class="card-title" >
                  <a href="moveinfo.html" data-id = "${data.Title}"> ${data.Title} </a>
                </h5>
                <p class="card-text">
                  <i class="fa-solid fa-star">
                    <span id="rating">&nbsp;${data.imdbRating}</span>
                  </i>
                  <button class="fav-btn">
                    <i class="fa-solid fa-heart fav-btn" data-id="${data.Title}"></i>
                  </button>
                </p>
              </div>
        </div>`;
        movielists.prepend(li);
        }
    }


    // favourites to locale storage
    async function favBtn(e){
        const target=e.target;
        let data =await fetchMovies(target.dataset.id);
        let localMovies=localStorage.getItem('favMovies1');

        if(localMovies){
            favMoviesList=Array.from(JSON.parse(localMovies));
        }else{
            localStorage.setItem('favMovies1',JSON.stringify(data));
        }


        // movie is present or not
        let isPresent=false;
        favMoviesList.forEach((movie)=>{
            if(data.Title == movie.Title){
                alert('Already to your favourite list');
                isPresent=true;
            }
        });
        if(!isPresent){
            favMoviesList.push(data);
        }
        localStorage.setItem('favMovies1',JSON.stringify(favMoviesList));
        isPresent=!isPresent;

        addTOFavList();
    }


    function addTOFavList(){
        favMovieLists.innerHTML="";
        let favList=JSON.parse(localStorage.getItem('favMovies1'));
        // console.log(favList);
        if(favList){
            favList.forEach((movie)=>{
                const li=document.createElement('li');
                li.innerHTML=` <div
                class="fav-movie-card">
                <img
                  src="${movie.Poster}"
                  alt=""
                  class="fav-movie-poster">
                <div class="movie-card-details">
                  <p class="movie-name">
                  <a href = "moveinfo.html" data-id="${movie.Title}">${movie.Title}<a> 
                  </p>
                  <small class="text-muted">${movie.Year}</small>
                </div>
                
                <div class="delete-btn">
                  <i class="fa-solid fa-trash-can" data-id="${movie.Title}"></i>
                </div>
              </div>`;
              favMovieLists.prepend(li);
            });
        }
    }


    // delete from favlist
    function deleteFavMovie(movietitle){
        let favList=JSON.parse(localStorage.getItem('favMovies1'));
        let updateList=Array.from(favList).filter((movie)=>{
            return movie.Title!=movietitle;
        });

        localStorage.setItem('favMovies1', JSON.stringify(updateList));
        addTOFavList();
    }

    // click events
    async function handleclick(e){
        const target =e.target;
        if(target.classList.contains('fav-btn')){
            e.preventDefault();
            favBtn(e);
        }else if(target.classList.contains('fa-trash-can')){
            deleteFavMovie(target.dataset.id);
        }

        localStorage.setItem('movieInfo',target.dataset.id);
    }

    document.addEventListener('click',handleclick);


    



})();