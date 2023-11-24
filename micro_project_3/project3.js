const data = require("./data/food.json");

function getAllFoodItems(jsondata) {
  var allfoodItems = [];
  jsondata.forEach((element) => {
    allfoodItems.push([element.foodname, element.id]);
    // console.log(element.foodname + " : " + element.id);
  });
  return allfoodItems;
}

function getAllVegetables(jsondata) {
  var allVegetables = [];

  jsondata.forEach((e) => {
    if (e.category === "Vegetable") {
      allVegetables.push([e.foodname, e.id]);
    }
  });
  return allVegetables;
}

function getAllFruits(jsondata) {
  var allFruits = [];

  jsondata.forEach((e) => {
    if (e.category === "Fruit") {
      allFruits.push([e.foodname, e.id]);
    }
  });

  return allFruits;
}

function getAllProtine(jsondata) {
  var getProtines = [];

  jsondata.forEach((e) => {
    if (e.category === "Protein") {
      getProtines.push([e.foodname, e.id]);
    }
  });
  return getProtines;
}

function getAllNuts(jsondata) {
  var getNuts = [];

  jsondata.forEach((e) => {
    if (e.category === "Nuts") {
      getNuts.push([e.foodname, e.id]);
    }
  });
  return getNuts;
}

function getAllGrains(jsondata) {
  var getGrains = [];

  jsondata.forEach((e) => {
    if (e.category === "Grain") {
      getGrains.push([e.foodname, e.id]);
    }
  });
  return getGrains;
}
function getAllNuts(jsondata) {
  var getNuts = [];

  jsondata.forEach((e) => {
    if (e.category === "Nuts") {
      getNuts.push([e.foodname, e.id]);
    }
  });
  return getNuts;
}
function runner() {
  var ans;
  //   ans = getAllFoodItems(data);
  //   ans = getAllVegetables(data);
  // ans = getAllFruits(data);
  // ans = getAllProtine(data);
  // ans = getAllNuts(data);
  // ans = getAllGrains(data);
  

  ans.forEach((element) => {
    console.log(element);
  });
  //   console.log(ans.length);
}

runner();
