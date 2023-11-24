const data = require("./data/food.json");

function getAllFoodItems(jsondata) {
  var allfoodItems = [];
  jsondata.forEach((element) => {
    allfoodItems.push([element.foodname, element.id]);
    // console.log(element.foodname + " : " + element.id);
  });
  return allfoodItems;
}

function runner() {
  var ans;
  ans = getAllFoodItems(data);

  ans.forEach((element) => {
    console.log(element);
  });
}

runner();
