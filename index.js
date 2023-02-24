const loadMeal = (searchMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
    .then((response) => response.json())
    .then((data) => displayMeal(data.meals));
};
const displayMeal = (meals) => {
  const div_container = document.getElementById('div_container');
  div_container.innerHTML = '';

  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <button onclick='mealDetails(${meal.idMeal})' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#meal_details">
  Details
</button>
    </div>
  </div>
    `;
    div_container.appendChild(div);
  });
};

const searchMeal = () => {
  const input_filed = document.getElementById('input_field');

  const searchMeal = input_filed.value;
  loadMeal(searchMeal);
  input_filed.value = '';
};

const mealDetails = (idMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.meals[0]));
};

const displayDetails = (meal) => {
  document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
  const modal_body = document.getElementById('modal_body');
  modal_body.innerHTML = `
  <img class='img-fluid' src="${meal.strMealThumb}" alt="" />
  <h3>Category : ${meal.strCategory}</h3>
  <h3>Area : ${meal.strArea}</h3>
  `;
  console.log(meal);
};

loadMeal('fish');
