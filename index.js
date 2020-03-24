// Function which fetch data from the API

const fetchData = async(searchTerm) =>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params : { 
            apikey : '1d56147',
            s: searchTerm,
        }
    });
    
    if(response.data.Error){
        return [];
    }
    return response.data.Search;
}; 

// Create HTML block where movies will be displayed

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For The Movie</b></label>
    <input class="input" />
    <div class="dropdown"> 
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div
`;
const input  = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
  const movies = await fetchData(event.target.value);
  if(!movies.length){
    dropdown.classList.remove('is-active');
    return;
  }
  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
//   Create a loop which takes a data from the movie array
 
  for (let movie of movies) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

      option.classList.add('dropdown-item');
      option.innerHTML = `
      <img src="${imgSrc}"/>
      ${movie.Title} 
      `;
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = movie.Title;

        onMovieSelect(movie);
      });
  
    //   Render the data in to the DOM
      resultsWrapper .appendChild(option);
    
  }
};
input.addEventListener('input', debouncer(onInput, 500));
// Create a method to close the dropdown menu when the user clicks outside of ROOT target scope
document.addEventListener('click', event =>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
})

const onMovieSelect = async(movie) =>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params : { 
            apikey : '1d56147',
            i: movie.imdbID,
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}
// Creating an helper template function for a expanded movie summary
const movieTemplate = (movieDetails) =>{
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image"> 
             <img src="${movieDetails.Poster}"/>
            </p>
        </figure> 
        <div clas="media-content">
            <div class="content">
                <h1>${movieDetails.Title}</h1>
                <h4>${movieDetails.Genre}</h4>
                <p>${movieDetails.Plot}</p> 
            </div>
        </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.BoxOffice }</p>
        <p class="subtitle">BoxOffice</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.imdbRating}</p>
        <p class="subtitle">imdb  rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.imdbVotes}</p>
        <p class="subtitle">imdb Votes</p>
    </article>
    `;
}