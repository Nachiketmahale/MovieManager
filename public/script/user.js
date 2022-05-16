// header styling 

function shrinkheader(){
    if(document.body.scrollTop>40 || document.documentElement.scrollTop>40){
        $('header').addClass('newnavbar');
    }else{
        $('header').removeClass('newnavbar');
    }
}
window.onscroll=function(){shrinkheader()}

const moviename=document.getElementById('mn');
const MovieContainer=document.getElementById('movie-container');
//movie shower from backend
for(let x of movie){
        const Element=document.createElement('div');
        Element.classList.add('movie');
        Element.classList.add('col');
        Element.innerHTML=`
            <h3 id="name" class="nam">${x.MovieName}</h3>
            <div id="star" class="str">
                <p id="actor" class="act">Actor :${x.LeadActor}</p>
                <p id="actress" class="act">Actress:${x.LeadActress}</p>
            </div>
            <h3 id="url" class="link">
                <a href=${x.URL}>Url:${x.URL}</a>
            </h3>
        `;
        MovieContainer.append(Element);
}

//filteration of movies
const SearchBtn=document.getElementById('searchbtn');
const text=$('.movie>#name').value;

console.log(text);

// entry point for filteration
SearchBtn.addEventListener('click',()=>{
    MovieContainer.innerHTML="";
    const searchedmovie=movie.filter(movies=>movies.MovieName===moviename.value);
    console.log(moviename.value);
    console.log(searchedmovie);
    for(let x of searchedmovie){
        console.log('in loop');
        const Element=document.createElement('div');
        Element.classList.add('movie');
        Element.innerHTML=`
            <h3 id="name" class="nam">${x.MovieName}</h3>
            <div id="star" class="str">
                <p id="actor" class="act">Actor :${x.LeadActor}</p>
                <p id="actress" class="act">Actress:${x.LeadActress}</p>
            </div>
            <h3 id="url" class="link">
                <a href=${x.URL}>Url:${x.URL}</a>
            </h3>
        `;
        console.log('after');
        console.log(MovieContainer);
        MovieContainer.append(Element);

    }
    if(searchedmovie.length===0){
        MovieContainer.innerHTML=`<h1 style="text-align: center; margin-top: 2rem;">We don't have movie like this</h1>`
    }
})
