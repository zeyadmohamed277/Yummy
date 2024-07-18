// ====== Start navbar ======
$("#navbar .fa-bars").click(function () {
  $("#navbar").animate({ left: 0 }, 500)
  $(".fa-bars").css("display", "none")
  $(".fa-xmark").css("display", "block")
})

$("#navbar .fa-xmark").click(function () {
  $("#navbar").animate({ left: "-250px" }, 500)
  $(".fa-bars").css("display", "block")
  $(".fa-xmark").css("display", "none")
})

// ====== End navbar ======

let searchData = document.getElementById("search-content");
let mainElement = document.getElementById("main-element");

///=== START Home =====
async function getData() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let dataApi = await data.json();
  displayData(dataApi.meals);
  return dataApi.meals;

}
function displayData(arr) {
  var cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
<div class="col-md-3">
<div onclick="getRecipes('${arr[i].idMeal}')" class="colom  position-relative  overflow-hidden">
<div class="overlay d-flex align-items-center rounded-2">
<p class="fs-2 fw-bold p-3">${arr[i].strMeal}</p>
</div>
<img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="">
</div>
</div>  `;
  }
  mainElement.innerHTML = cartona;
}
getData();

async function getRecipes(idmeal) {
  mainElement.innerHTML = ''
  searchData.innerHTML = ''
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`);
  let dataApi = await data.json();
  displayRecipes(dataApi.meals);
  return dataApi.meals;
}
function displayRecipes(arr) {
  searchData.innerHTML = ""
  var cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-4">
      <img src=${arr[i].strMealThumb}  class="w-100" alt="">
      <h2 class="text-center text-white">${arr[i].strMeal} </h2>
    </div>
    <div class="col-md-8 text-white">
      <h2>Instructions</h2>
      <p>${arr[i].strInstructions}</p>
      <h3><span>Area:</span>${arr[i].strArea}</h3>
      <h3><span>Category:</span>${arr[i].strCategory}</h3>
      <h3>Recipes:</h3>
      <ul class="d-flex">
        <li class="alert alert-info m-2 p-1" >${arr[i].strMeasure1}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure2}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure3}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure4}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure5}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure6}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure7}</li>
        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure8}</li>
      </ul>
      <h3>Tags:</h3>
      <ul class="d-flex">
        <li class="alert alert-danger m-2 p-1" >${arr[i].strIngredient1}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient2}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient3}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient4}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient5}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient6}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient7}</li>
        <li class="alert alert-danger m-2 p-1">${arr[i].strIngredient8}</li>
      </ul>
      <a href="${arr[i].strSource}" target=_blank  class="btn btn-success">Source</a>
  
      <a href="${arr[i].strYoutube}" target=_blank class="btn btn-danger">YouTube</a>
    </div>
           
            `;
  }
  mainElement.innerHTML = cartona;

}
// ===== END HOME ======


// ===== START SEARCH ======
function searchInputs() {
  searchData.innerHTML = `
    <div class="row mt-4">
    <div class="col-md-6">
    <input  onkeyup="searchName(this.value)" type="text" id="search-name" class="form-control bg-transparent text-white"  placeholder="Search by Name"/>
  </div>
  <div class="col-md-6">
    <input onkeyup="searchLetter()"  type="text" id="search-letter" class="form-control bg-transparent text-white" placeholder="Search by first letter"
    />
  </div>
</div>
    `;
  mainElement.innerHTML = ""
}
async function searchName(mealName) {
  mainElement.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let dataApi = await data.json();
  displayData(dataApi.meals);
  return dataApi.meals;
}
async function searchLetter() {
  mainElement.innerHTML = "";
  const inputValue = document.querySelector("#search-letter").value;
  if (inputValue.length > 0) {
    const firstLetter = inputValue.charAt(0);

    console.log("First letter:", firstLetter);

    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    );
    let dataApi = await data.json();
    displayData(dataApi.meals);
    return dataApi.meals;
  }
}

// ===== END SEARCH ======

// ===== START AREA ======
async function getArea() {
  mainElement.innerHTML = "";
  searchData.innerHTML = "";

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let dataApi = await data.json();
  console.log(dataApi.meals);
  displayArea(dataApi.meals);
  return dataApi.meals;
}
function displayArea(arr) {
  var cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
          <div class="colom col-md-3 text-white m-auto">
          <div onclick="getAreaDetails('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${arr[i].strArea}</h3>
  </div>
          </div>
    
          `;
  }
  mainElement.innerHTML = cartona;
}
async function getAreaDetails(area) {
  mainElement.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let dataApi = await data.json();
  displayData(dataApi.meals);
  return dataApi.meals;


}
//=== END AREA ====

// === START CATEGORY ===
async function getCategory() {
  mainElement.innerHTML = "";
  searchData.innerHTML = "";

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let dataApi = await data.json();
  displayCategory(dataApi.categories);
  return dataApi.categories;


}
function displayCategory(arr) {
  var cartona = "";

  for (let i = 0; i < arr.length; i++) {
    const extractedDescription = arr[i].strCategoryDescription
      .split(" ")
      .slice(0, 20)
      .join(" ");
    cartona += `
      <div class="colom col-md-3">
      <div onclick="getCategoryDetails('${arr[i].strCategory}')"  class="colom  position-relative  overflow-hidden">
      <div class="overlay text-center rounded-2">
      <p class="fs-2 fw-bold">${arr[i].strCategory}</p>
      <p class="desc">${extractedDescription}</p>
  </div>
      <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
  </div>
      </div>
  
      
            `;
  }
  mainElement.innerHTML = cartona;
}
async function getCategoryDetails(category) {
  mainElement.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let dataApi = await data.json();
  displayData(dataApi.meals);
  console.log(dataApi.meals);
  // return dataApi.meals;

}
//==== END CATEGORY===

//==== START Ingredients===
async function getIngredients() {
  mainElement.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let dataApi = await data.json();
  console.log(dataApi.meals);
  displayIngredients(dataApi.meals);
  return dataApi.meals;
}
function displayIngredients(arr) {
  var cartona = "";

  for (let i = 0; i < arr.length; i++) {

    cartona += `
            <div class="colom col-md-3 text-white">
            <div onclick="getIngredientsDetails('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
           <p>${arr[i].strDescription}</p> 
    </div>
            </div>
      
            `;
  }
  mainElement.innerHTML = cartona;
}

async function getIngredientsDetails(ingr) {
  mainElement.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`
  );
  let dataApi = await data.json();
  displayData(dataApi.meals);
  return dataApi.meals;


}

//==== END Ingredients===

//==== START CONTACT===

mainElement.innerHTML = `   <div>
 <div class="row g-2 my-2">
      <div class="col-md-6">
        <input type="text" id="contact-name" class="form-control bg-transparent text-white" placeholder="Enter your Name"/>
      </div>
      <div class="col-md-6"><input type="text" id="contact-email" class="form-control bg-transparent text-white" placeholder="Enter your Email"/></div>

      <div class="col-md-6"><input type="number" id="contact-phone" class="form-control bg-transparent text-white" placeholder="Enter your phone"/>
      </div>
      <div class="col-md-6"><input type="number" id="contact-age" class="form-control bg-transparent text-white" placeholder="Enter your Age"/>
      </div>


      <div class="col-md-6"><input type="password" id="userPass" class="form-control bg-transparent text-white" placeholder="Enter your password"/>
      </div>
      <div class="col-md-6"><input type="password" id="reuserPass" class="form-control bg-transparent text-white" placeholder="Enter your repassword"/>
      </div>

    </div>
    <div class="d-flex justify-content-center">
      <button role="button" class="btn btn-danger">Submit</button>
  </div>
    </div>
   `
function contact() {
  mainElement.innerHTML = `   <div>
    <div class="row g-2 my-2">
         <div class="col-md-6">
           <input type="text" id="contact-name" class="form-control bg-transparent text-white" placeholder="Enter your Name"/>
         </div>
         <div class="col-md-6"><input type="text" id="contact-email" class="form-control bg-transparent text-white" placeholder="Enter your Email"/></div>
   
         <div class="col-md-6"><input type="number" id="contact-phone" class="form-control bg-transparent text-white" placeholder="Enter your phone"/>
         </div>
         <div class="col-md-6"><input type="number" id="contact-age" class="form-control bg-transparent text-white" placeholder="Enter your Age"/>
         </div>
   
   
         <div class="col-md-6"><input type="password" id="userPass" class="form-control bg-transparent text-white" placeholder="Enter your password"/>
         </div>
         <div class="col-md-6"><input type="password" id="reuserPass" class="form-control bg-transparent text-white" placeholder="Enter your repassword"/>
         </div>
   
       </div>
       <div class="d-flex justify-content-center">
         <button role="button" class="btn btn-danger button disabled">submit</button>
     </div>
       </div>
      `

}
const userName = document.getElementById("contact-name");
const userEmail = document.getElementById("contact-email");
const userPass = document.getElementById("userPass");
const userPhone = document.getElementById("contact-phone");
const reuserPass = document.getElementById("reuserPass");
const userAge = document.getElementById("contact-age");

function nameValidation() {
  if (userName.value.length > 3) {
    userName.classList.remove("is-invalid");
    userName.classList.add("is-valid");
    return true;
  } else {
    alert("invalid Name")

    return false;
  }
}
function emailValidation() {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.test(userEmail.value)) {
    userEmail.classList.remove("is-invalid");
    userEmail.classList.add("is-valid");
    return true;
  } else {
    alert("invalid Email")

    return false;
  }
}
function PhoneValidation() {
  const phoneRegex = /^01[125]\d{8}$/;

  if (phoneRegex.test(userPhone.value)) {
    userPhone.classList.remove("is-invalid");
    userPhone.classList.add("is-valid");
    return true;
  } else {
    alert("invalid phone number")

    return false;
  }
}
function passValidation() {
  var passRegex = /^[0-9]\w{7,14}$/;
  if (passRegex.test(userPass.value)) {
    userPass.classList.remove("is-invalid");
    userPass.classList.add("is-valid");
    return true;
  } else {
    alert("invalid password")

    return false;
  }
}
function rePassValidation() {

  if (reuserPass.value == userPass.value) {
    reuserPass.classList.remove("is-invalid");
    reuserPass.classList.add("is-valid");
    return true;
  } else {


    return false;
  }
}
function ageValidation() {
  if (userAge.value > 20 && userAge.value < 80) {
    userAge.classList.remove("is-invalid");
    userAge.classList.add("is-valid");
    return true;
  } else {
    alert("invalid")
    return false;
  }
}

$("#contact-name").on("input", function () {
  nameValidation()
});
$("#contact-email").on("input", function () {
  emailValidation()
});
$("#userPass").on("input", function () {
  passValidation()
});
$("#reuserPass").on("input", function () {
  rePassValidation()
});
$("#userPhone").on("input", function () {
  PhoneValidation()
});
$("#contact-age").on("input", function () {
  ageValidation()
});



if (nameValidation == true && emailValidation == true && passValidation == true && rePassValidation == true && PhoneValidation == true && ageValidation == true) {
  $(".button").classList.remove("disabled");
}

// ====== Start Events

$("#Search").click(function () {
  searchInputs()
})

$("#Categories").click(function () {
  getCategory()
})
$("#Area").click(function () {
  getArea()
})
$("#Ingredients").click(function () {
  getIngredients()
})

$("#Contact-Us").click(function () {
  contact()
})

