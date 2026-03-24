const themeBtn = document.querySelector("#themeToggle");

const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light"){
    document.body.classList.add("light-theme");
    themeBtn.innerText = "☀️ Light Mode";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    if (themeBtn.innerText === "🌙 Dark Mode"){
        themeBtn.innerText = "☀️ Light Mode";
    }else{
        themeBtn.innerText = "🌙 Dark Mode";
    }
    const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
})

const grabInput = document.getElementById("movieInput");
const grabInputBtn = document.getElementById("searchBtn");
const keyApi = "a36798cc";
const loader = document.getElementById('loader');

async function searchMovies() {
    const query = grabInput.value;
    if(!query) return alert("Type Something First");
    
    const url =`https://www.omdbapi.com/?apikey=${keyApi}&s=${query}`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.Response === "True"){
            displayMovies(data.Search);
        }else{
            console.log(data.Error);
        }
    }catch (error){
        console.log("Connection Error!");
    }
}
grabInputBtn.addEventListener("click", searchMovies);

function displayMovies(movies){
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = movies.map(movie => {
        return `
            <div class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" 
                     alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
        `;
    }).join('');
}
