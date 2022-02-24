// async and await
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear input value
    searchField.value ='';

    // make an error msg 
    const errorDiv = document.getElementById('error-div');
    const errormsg = document.getElementById('error-msg');
    if(searchText == 0 ){
        
        errormsg.classList.remove('d-none');
        errorDiv.appendChild(errormsg);
 
    }
    else {
        errormsg.classList.add('d-none');
    const url= `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;


    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data.meals)}

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    // console.log(meals.length);

    // meal errors div and msg
    const mealErroDiv = document.getElementById('mealError-div');
    const mealErrorMsg = document.getElementById('mealError-msg');
    // error condition 
    if(meals == null ) {
        // console.log('ok');
        mealErrorMsg.classList.remove('d-none');
        mealErroDiv.appendChild(mealErrorMsg);
    }
    else {
        const searchResult = document.getElementById('search-result');

    // clean the display for new search
    searchResult.textContent ='';


    meals.forEach(meal => {
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
    
        
}

// using async and await

const loadMealDetail = async mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;


    const res = await fetch(url);
    const data = await res.json()
    displayMealDetail(data.meals[0])

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');

    // clean details div for new search
    mealDetails.textContent ='';

    const detailsDiv   =  document.createElement('div');
    detailsDiv.classList.add('card');
    detailsDiv.innerHTML = `
    <div class="card text-center" >
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