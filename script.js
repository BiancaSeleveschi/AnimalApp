let animals = [
  {
    name: "Rex",
    type: "dog",
    age: 11,
    color: "white",
    isFavorite: true,
  },
  {
    name: "Teddy",
    type: "bear",
    age: 17,
    color: "brown",
    isFavorite: true,
  },
  {
    name: "Fram",
    type: "bear",
    age: 6,
    color: "white",
    isFavorite: false,
  },
  {
    name: "Kitty",
    type: "cat",
    age: 5,
    color: "gray",
    isFavorite: true,
  },
  {
    name: "Lulu",
    type: "cat",
    age: 10,
    color: "black",
    isFavorite: false,
  },
]


let tbody = document.getElementById("animals-tbody");
let nameInput = document.getElementById("name-input");
let typeInput = document.getElementById("type-input");
let ageInput = document.getElementById("age-input");
let colorInput = document.getElementById("color-input");
let createButton = document.getElementById("create-button");
let totalAgeSpan = document.getElementById("total-age-span");
let youngestAnimalSpan = document.getElementById("youngest-animal-span");
let oldestAnimalSpan = document.getElementById("oldest-animal-span");
let favoriteAnimalsSpan = document.getElementById("favorite-animals-span");
let typeSpan = document.getElementById("type-span");
let nameSortButton = document.getElementById("name-sort-button");
let typeSortButton = document.getElementById("type-sort-button");
let ageSortButton = document.getElementById("age-sort-button");
let colorSortButton = document.getElementById("color-sort-button");
let nameFilterInput = document.getElementById("name-filter-input");
let typeFilterInput = document.getElementById("type-filter-input");
let minAgeFilterInput = document.getElementById("min-age-filter-input");
let maxAgeFilterInput = document.getElementById("max-age-filter-input");
let colorFilterInput = document.getElementById("color-filter-input");
let filterButton = document.getElementById("filter-button");


function displayAnimals() {
  tbody.innerHTML = "";
  for (let i = 0; i < animals.length; i++) {
    insertAnimalsInTable(animals[i]);
  }
  totalAgeSpan.innerHTML = computeTotalAge();
  youngestAnimalSpan.innerHTML = getYoungestAnimal();
  oldestAnimalSpan.innerHTML = getOldestAnimal();
  favoriteAnimalsSpan.innerHTML = getFavoriteAnimals();
  typeSpan.innerHTML = getTypeOfAnimals();
}

//Suma anilor
function computeTotalAge() {
  let res = 0;
  for (let i = 0; i < animals.length; i++) {
    res += animals[i].age;
  }
  return res;
}

//Cel mai tanar animal
function getYoungestAnimal() {
  let youngestAnimal;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].age < min) {
      min = animals[i].age;
      youngestAnimal = animals[i].name
    }
  }
  return youngestAnimal;
}

//Cel mai batran animal
function getOldestAnimal() {
  let oldestAnimal;
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].age > max) {
      max = animals[i].age;
      oldestAnimal = animals[i].name
    }
  }
  return oldestAnimal;
}

//Animalele favorite
function getFavoriteAnimals() {
  let res = [];
  let contor = 0;
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].isFavorite === true) {
      res[contor++] = animals[i].name;
    }
  }
  return res;
}


function getTypeOfAnimals() {
  let array = [];
  for (let i = 0; i < animals.length; i++) {
    if (!array.includes(animals[i].type)) {
      array.push(animals[i].type);
    }
  }
  return array;
}

function insertAnimalsInTable(animal) {
  let newRow = document.createElement("tr");
  let n = Number.MAX_SAFE_INTEGER;

  let newNameTd = document.createElement("td");
  newNameTd.innerHTML = animal.name;
  newRow.appendChild(newNameTd);

  let newTypeTd = document.createElement("td");
  newTypeTd.innerHTML = animal.type;
  newRow.appendChild(newTypeTd);

  let newAgeTd = document.createElement("td");
  newAgeTd.innerHTML = animal.age;
  newRow.appendChild(newAgeTd);

  let newColorTd = document.createElement("td");
  newColorTd.innerHTML = animal.color;
  newRow.appendChild(newColorTd);

  let deleteTd = document.createElement("td");
  deleteTd.innerHTML = `<button class="delete-button" onclick = deleteAnimal(this)>Delete</button>`;
  newRow.appendChild(deleteTd);

  let favoriteTd = document.createElement("td");
  if (animal.isFavorite === true) {
    favoriteTd.innerHTML = `<button class="favorite-button"  onclick = markFavoriteAnimal(this)>Adauga</button>`;
  }
  else {
    favoriteTd.innerHTML = `<button class="nonfavorite-button"  onclick = markFavoriteAnimal(this)>Sterge</button>`;
  }
  newRow.appendChild(favoriteTd);


  tbody.appendChild(newRow);
}


function addAnimal() {
  let animal = {};
  animal.name = nameInput.value;
  animal.type = typeInput.value;
  animal.age = ageInput.value;
  animal.color = colorInput.value;

  animals[animals.length] = animal;
  insertAnimalsInTable(animal);
}
createButton.addEventListener("click", addAnimal)


function deleteAnimal(buttonElement) {
  let trow = buttonElement.parentNode.parentNode
  tbody.removeChild(trow);
}


function filterAnimals() {
  debugger;
  tbody.innerHTML = "";
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].name === nameFilterInput.value) {
      insertAnimalsInTable(animals[i])
    }
    if (animals[i].type === typeFilterInput.value) {
      insertAnimalsInTable(animals[i])
    }
    if (animals[i].age >= minAgeFilterInput.value && animals[i].age <= maxAgeFilterInput.value) {
      insertAnimalsInTable(animals[i])
    }
    if (animals[i].color === colorFilterInput.value) {
      insertAnimalsInTable(animals[i])
    }
  }
}
filterButton.addEventListener("click", filterAnimals)


function markFavoriteAnimal(buttonElement) {
  debugger;
  let tr = buttonElement.parentNode.parentNode;
  let animalName = tr.cells[0].innerHTML;
  let animalIndex = getAnimalIndexByName(animalName);
  animals[animalIndex].isFavorite = !animals[animalIndex].isFavorite;
  displayAnimals();
}

function getAnimalByName(animalName) {
  for (let i = 0; i < animals.length; i++) {
    if (animalName === animals[i].name) {
      return animals[i];
    }
  }
}

function getAnimalIndexByName(animalName) {
  debugger;
  for (let i = 0; i < animals.length; i++) {
    if (animalName === animals[i].name) {
      return i;
    }
  }
}


function sortAnimalsByName() {
  animals.sort(sortByName);
  displayAnimals();
}
nameSortButton.addEventListener("click", sortAnimalsByName);


function sortByName(animal1, animal2) {
  if (animal1.name > animal2.name) {
    return 1;
  }
  if (animal1.name < animal2.name) {
    return -1;
  }
  else {
    return 0;
  }
}


function sortAnimalsByType() {
  animals.sort(sortByType);
  displayAnimals();
}
typeSortButton.addEventListener("click", sortAnimalsByType);

function sortByType(animal1, animal2) {
  if (animal1.type > animal2.type) {
    return 1;
  }
  if (animal1.type < animal2.type) {
    return -1;
  }
  else {
    return 0;
  }
}


function sortAnimalsByAge() {
  animals.sort(sortByAge);
  displayAnimals();
}
ageSortButton.addEventListener("click", sortAnimalsByAge);

function sortByAge(animal1, animal2) {
  if (animal1.age > animal2.age) {
    return 1;
  }
  if (animal1.age < animal2.age) {
    return -1;
  }
  else {
    return 0;
  }
}


function sortAnimalsByColor() {
  animals.sort(sortByColor);
  displayAnimals();
}
colorSortButton.addEventListener("click", sortAnimalsByColor);

function sortByColor(animal1, animal2) {
  if (animal1.color > animal2.color) {
    return 1;
  }
  if (animal1.color < animal2.color) {
    return -1;
  }
  else {
    return 0;
  }
}

displayAnimals();
