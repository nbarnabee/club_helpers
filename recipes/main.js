/* 
This is a generic card constructor that accepts a path to the file 
where the data that's to be rendered is stored.

The way the card is constructed does require a specific structure to 
the JSON data, which makes it, perhaps, not very useful to anyone other 
than me, but it's an interesting exercise.


Should really break the select maker and the card maker into two separate things.

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
    // The first call to buildOptionElement() creates the default select element
    this.buildOptionElement("generic");
    const itemList = this.alphabetizeList();
    for (let item of itemList) {
      this.buildOptionElement(item);
    }
    document
      .getElementById("select")
      .addEventListener("change", this.makeCard.bind(this));
  }
  alphabetizeList() {
    const itemList = [];
    for (let item in this.data.content) {
      itemList.push(item);
    }
    itemList.sort((a, b) => a > b);
    return itemList;
  }
  buildOptionElement(item) {
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
    }
    selectMenu.appendChild(option);
  }
  makeCard(e) {
    document.querySelector(".recipe-card").classList.add("bordered");
    document.getElementById("title").innerText = e.target.value;
    const ingredients = document.getElementById("ingredients");
    const instructions = document.getElementById("instructions");
    const notes = document.getElementById("notes");
    ingredients.innerHTML = ""; // clear first
    instructions.innerHTML = "";
    notes.innerHTML = "";

    const recipe = this.data.content[e.target.value];
    const ingredientList = recipe.ingredients; // an object
    const instructionList = recipe.instructions; // an array
    const notesList = recipe.notes; // an array

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

    if (notesList.length > 0) {
      notesList.forEach((entry) => {
       const note = document.createElement("li");
       note.textContent = entry;
       notes.appendChild(note);
      });
    }
  }
}

document
  .getElementById("conversion-button")
  .addEventListener("click", convertAmount);
function convertAmount() {
  amount = +document.getElementById("amount").value * 30;
  pricePerShot = 3;
  const convertedAmount = `${amount} mL or ~${amount / 20} shots.`;
  const pricing = `At ${pricePerShot} CHF per shot, that's ${
    (amount / 20) * pricePerShot
  } CHF minimum.`;
  document.getElementById("converted-amount").innerText = convertedAmount;
  document.getElementById("pricing-advice").innerText = pricing;
}

const path = "./data/recipes.json";
const recipeMaker = new CardMaker(path);
recipeMaker.makeSelect();
