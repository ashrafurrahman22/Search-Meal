const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear input value
    searchField.value ='';

    const url= `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;


    /*
    wrong version 91, it will show you in console => catch error    
    const url= `https://www.themealdb.com/api/json/v91/1/search.php?s=${searchText}`; */

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => console.log(error));
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');

    // clean the display for new search
    searchResult.textContent ='';

    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    })
}


const loadMealDetail = mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');

    // clean details div for new search
    mealDetails.textContent ='';

    const detailsDiv   =  document.createElement('div');
    detailsDiv.classList.add('card');
    detailsDiv.innerHTML = `
    <div class="card" >
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Watch Video</a>
          </div>
        </div>
    `;
    mealDetails.appendChild(detailsDiv);
}