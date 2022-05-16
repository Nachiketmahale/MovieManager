const MovieContainer=document.getElementById('movie-container');
const moviename=document.getElementById('mn');
// const Actor=;
// const Actress;
// const URl;
let counter=0;
const SearchBtn=document.getElementById('searchbtn');
const text=$('.movie>#name').value;
// header styling 
//utility functions

function shrinkheader(){
    if(document.body.scrollTop>40 || document.documentElement.scrollTop>40){
        $('header').addClass('newnavbar');
    }else{
        $('header').removeClass('newnavbar');
    }
}

window.onscroll=function(){shrinkheader()}

function Delete(id){
    console.log(id[0]);
    const MOVIENAME=document.getElementById(`${id[0]}moviename`).textContent;
    const ACTOR=document.getElementById(`${id[0]}actor`).textContent;
    const ACTRESS=document.getElementById(`${id[0]}actress`).textContent;
    const URL=document.getElementById(`${id[0]}url`).textContent;
    $.post("/delete",
    {
        oldname:MOVIENAME,
        oldactor:ACTOR,
        oldactress:ACTRESS,
        oldurl:URL,
    },
     function (data, status) {
        console.log(data);
        alert('movie deleted successfully');
        location.reload();
     }
     );
}

function showoverlay(MOVIENAME,ACTOR,ACTRESS,URL){
    $('body').addClass('overflow-hidden');
    // $('movieditform form').addClass('overflow-y');
    $('#movieditform').removeClass('hide');
    console.log(MOVIENAME);
    $('#mon').val(MOVIENAME);
    $('#la').val(ACTOR);
    $('#mn').val(ACTOR);
    $('#lac').val(ACTRESS);
    $('#url').val(URL);
}

function hideoverlay(){
    $('body').removeClass('overflow-hidden');
    // $('movieditform').removeClass('overflow-y');
    $('#movieditform').addClass('hide');
}

function onedit(){
    console.log('new movie');
    const data1= document.getElementById('mon').value;
    // const data1= $('#mon').value;
    const data2= document.getElementById('la').value;
    const data3=document.getElementById('lac').value;
    const data4= document.getElementById('url').value;
    console.log('NAme:', data1);
    console.log('Actor:', data2);
    console.log('Actress:', data3);
    console.log('url:',data4);
    return {
        name:data1,
        actor:data2,
        actress:data3,
        url:data4
    }
}

// document.getElementById('change').onclick=onedit;
function Modify(id){
    //collect the data of clicked item;
    console.log(id[0]);
    const MOVIENAME=document.getElementById(`${id[0]}moviename`).textContent;
    const ACTOR=document.getElementById(`${id[0]}actor`).textContent;
    const ACTRESS=document.getElementById(`${id[0]}actress`).textContent;
    const URL=document.getElementById(`${id[0]}url`).textContent;
    console.log(MOVIENAME);
    // form movie object;
    const movieinfo={
        oldname:MOVIENAME,
        oldactor:ACTOR,
        oldactress:ACTRESS,
        oldurl:URL
    }

    let newmovie;
    //showpopup for edit
    showoverlay(MOVIENAME,ACTOR,ACTRESS,URL);
    //collect new data after click
    document.getElementById('change').addEventListener('click',(event)=>{
        newmovie=onedit(movieinfo);
        hideoverlay();
        // //send it to server;
        // const xhr=new XMLHttpRequest();
    
        // xhr.open('POST','/edit',true);
    
        // xhr.onprogress=function(){
        //     console.log('On progress');
        // }

        // xhr.onload=function(){
        //     console.log(this.responseText);
        // }

        // xhr.send({option:"jdsafkjsf"});
        $.post("/edit",
        {
            oldname:MOVIENAME,
            oldactor:ACTOR,
            oldactress:ACTRESS,
            oldurl:URL,
            newname:newmovie.name,
            newactor:newmovie.actor,
            newactress:newmovie.actress,
            newurl:newmovie.url
        },
         function (data, status) {
            console.log(data);
         }
         );
    });
}

function moviedisplayer(movie){
    //movie shower from backend
    for(let x of movie){
            counter++;
            const Element=document.createElement('div');
            Element.classList.add('movie');
            Element.classList.add('col');
            Element.innerHTML=`
                <h3 id="${counter}moviename" class="nam">${x.MovieName}</h3>
                <div class="str">
                Actor :<p id="${counter}actor" class="act">${x.LeadActor}</p>
                Actress: <p id="${counter}actress" class="act">${x.LeadActress}</p>
                </div>
                Url:<h3 id="${counter}url" class="link">${x.URL}</h3>
                <div class="options">
                <button type="submit" class="option modify"  id=${counter}m onClick="Modify(this.id)">Modify</button>
                <button type="submit" class="option delete"  id=${counter}d onClick="Delete(this.id)">Delete</button>
                </div>
                `;
                MovieContainer.append(Element);
        }
            // <button type="submit" class="option modify"  id=${counter}m onClick="Modify()">Modify</button>
}

//filteration of movies

// entry point for filteration
SearchBtn.addEventListener('click',()=>{
    MovieContainer.innerHTML="";
    const searchedmovie=movie.filter(movies=>movies.MovieName===moviename.value);
    console.log(moviename.value);
    console.log(searchedmovie);
    // for(let x of searchedmovie){
    //     console.log('in loop');
    //     const Element=document.createElement('div');
    //     Element.classList.add('movie');
    //     Element.innerHTML=`
    //         <h3 id="name" class="nam">MovieName: ${x.MovieName}</h3>
    //         <div id="star" class="str">
    //             <p id="actor" class="act">Actor :${x.LeadActor}</p>
    //             <p id="actress" class="act">Actress:${x.LeadActress}</p>
    //         </div>
    //         <h3 id="url" class="link">Url:${x.URL}</h3>
    //     `;
    //     console.log('after');
    //     console.log(MovieContainer);
    //     MovieContainer.append(Element);

    // }
    moviedisplayer(searchedmovie);
    if(searchedmovie.length===0){
        MovieContainer.innerHTML=`<h1 style="text-align: center; margin-top: 2rem;">We don't have movie like this</h1>`
    }
})

function Script_starter(){
    moviedisplayer(movie);
}

Script_starter();