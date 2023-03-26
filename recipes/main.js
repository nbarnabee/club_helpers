/* 
This is a generic card constructor that accepts a path to the file 
where the data that's to be rendered is stored.

The way the card is constructed does require a specific structure to 
the JSON data, which makes it, perhaps, not very useful to anyone other 
than me, but it's an interesting exercise.

*/

class CardMaker {
  constructor(dataPath) {
    this.dataPath = dataPath;
  }
  async makeSelect() {
    await this.fetchData();
    this.populateMenu();
  }
  async fetchData() {
    let response = await fetch(this.dataPath);
    const data = await response.json();
    this.data = data;
  }
  populateMenu() {
    this.setOption("generic");
    for (let item in this.data.content) {
      this.setOption(item);
    }
  }
  setOption(item) {
    const selectMenu = document.getElementById("select");
    const option = document.createElement("option");
    if (item == "generic") {
      option.value = "";
      option.setAttribute("disabled", true);
      option.setAttribute("selected", true);
      option.setAttribute("hidden", true);
      option.textContent = `--- ${this.data.title} ---`;
    } else {
      option.value = item;
      option.textContent = item;
      option.addEventListener("click", this.makeCard.bind(this));
    }
    selectMenu.appendChild(option);
  }
  makeCard(e) {
    document.getElementById("title").innerText = e.target.value;
    const ingredients = document.getElementById("ingredients");
    const instructions = document.getElementById("instructions");
    ingredients.innerHTML = ""; // clear first
    instructions.innerHTML = "";

    const recipe = this.data.content[e.target.value];
    const ingredientList = recipe.ingredients; // an object
    const instructionList = recipe.instructions; // an array

    for (let entry in ingredientList) {
      const ingredient = document.createElement("li");
      ingredient.textContent = `${ingredientList[entry].join(" ")} ${entry}`;
      ingredients.appendChild(ingredient);
    }

    instructionList.forEach((entry) => {
      const instruction = document.createElement("li");
      instruction.textContent = entry;
      instructions.appendChild(instruction);
    });
  }
}

const path = "./data/recipes.json";
const recipeMaker = new CardMaker(path);
recipeMaker.makeSelect();
