recipes = {
  "Generic Recipe 1": {
    ingredients: {
      milk: [1, "cup"],
      flour: [1, "cup"],
      sugar: [1, "cup"],
      eggs: [2, ""],
    },
    instructions: ["Put in a bowl.", "Mix around.", "Pour onto ground."],
  },
  "Generic Recipe 2": {
    ingredients: {
      butter: [1, "TB"],
      flour: [1, "cup"],
      sugar: [1, "cup"],
      eggs: [2, ""],
    },
    instructions: ["Put in a bowl.", "Mix around.", "Pour onto ground."],
  },
  "Generic Recipe 3": {
    ingredients: {
      milk: [1, "cup"],
    },
    instructions: ["Pour into glass.", "Drink."],
  },
};

/* ---- SELECT MENU ------ */

const selectMenu = document.getElementById("select");
options = [];

for (let recipe in recipes) {
  const option = document.createElement("option");
  option.value = recipe;
  option.textContent = recipe;
  option.addEventListener("click", makeCard);
  selectMenu.appendChild(option);
}

function showValue(e) {
  displayPoint = document.getElementById("display");
  console.log(e.target.value);
  displayPoint.textContent = items[e.target.value];
}

/* ---- CARD MAKER ------ */

function makeCard(e) {
  document.getElementById("title").innerText = e.target.value;
  ingredients = document.getElementById("ingredients");
  instructions = document.getElementById("instructions");
  ingredients.innerHTML = ""; // clear first
  instructions.innerHTML = "";

  recipe = recipes[e.target.value];
  ingredientList = recipe.ingredients; // an object
  instructionList = recipe.instructions; // an array

  for (entry in ingredientList) {
    ingredient = document.createElement("li");
    ingredient.textContent = `${ingredientList[entry][0]} ${ingredientList[entry][1]} ${entry}`;
    ingredients.appendChild(ingredient);
  }

  instructionList.forEach((entry) => {
    instruction = document.createElement("li");
    instruction.textContent = entry;
    instructions.appendChild(instruction);
  });
}
