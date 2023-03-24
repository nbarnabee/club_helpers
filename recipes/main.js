const recipes = {
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

for (let recipe in recipes) {
  const option = document.createElement("option");
  option.value = recipe;
  option.textContent = recipe;
  option.addEventListener("click", makeCard);
  selectMenu.appendChild(option);
}

/* ---- CARD MAKER ------ */

function makeCard(e) {
  document.getElementById("title").innerText = e.target.value;
  const ingredients = document.getElementById("ingredients");
  const instructions = document.getElementById("instructions");
  ingredients.innerHTML = ""; // clear first
  instructions.innerHTML = "";

  const recipe = recipes[e.target.value];
  const ingredientList = recipe.ingredients; // an object
  const instructionList = recipe.instructions; // an array

  for (entry in ingredientList) {
    const ingredient = document.createElement("li");
    ingredient.textContent = `${ingredientList[entry][0]} ${ingredientList[entry][1]} ${entry}`;
    ingredients.appendChild(ingredient);
  }

  instructionList.forEach((entry) => {
    const instruction = document.createElement("li");
    instruction.textContent = entry;
    instructions.appendChild(instruction);
  });
}
