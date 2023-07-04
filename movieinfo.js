(function(){
    const Moviename=document.getElementById('title');
    Moviename.innerHTML=localStorage.getItem('movieInfo')
    // console.log(Moviename);
    const year = document.getElementById("year");
    const runtime = document.getElementById("runtime");
    const rated=document.getElementById("rated");
    const rating = document.getElementById("rating");
    const poster = document.getElementById("poster");
    const plot = document.getElementById("plot");
    const directorsName = document.getElementById("director-names");
    const castName = document.getElementById("cast-names");
    const genre = document.getElementById("genre");


    fetchMovies(Moviename.innerHTML);

    async function fetchMovies(search){
        const url= `https://www.omdbapi.com/?t=${search}&apikey=f2c74d06`;
        try{
            const response =await fetch(url);
            const data =await response.json();

            
            
            year.innerHTML=data.Year;
            rated.innerHTML=data.Rated;
            rating.innerHTML=`${data.imdbRating}/10`;
            runtime.innerHTML=data.Runtime
            poster.setAttribute("src",`${data.Poster}`);
            plot.innerHTML=data.Plot;
            directorsName.innerHTML=data.Director;
            castName.innerHTML=data.Actors;
            genre.innerHTML=data.Genre;

        }catch(err){
            console.log(err);
        }
    }

})();