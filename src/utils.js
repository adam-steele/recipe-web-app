// const { MongoClient } = require('mongodb');
// const bookController = require('../../src/controllers/bookController.js');

// const url = 'mongodb://localhost:27017';
// const dbName = 'Recipe-App';

/* const app = {
  testButt: document.getElementById('convert-butt'),
  range: document.getElementById('points'),
  servNum: document.getElementsByClassName('serv-num'),
  recipeIngreds: document.getElementsByClassName('ingreds-full'),
  servForm: document.getElementById('servings'),
  ingredsNameClass: document.getElementsByClassName('ingreds-name'),
  ingredsQuant: document.getElementsByClassName('ingreds-quant'),
}; */

const mainRecipefuncs = function (recipe, app) {
  const /*Displayed*/Ingredients = function construct(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.write = function write(id) {
      id.innerHTML = `${this.amount + this.unit} ${this.name}`;
    };

    this.writeName = function (id) {
      id.innerHTML = this.name;
    };

    this.writeQuant = function (id) {
      id.innerHTML = this.amount + this.unit;
    };

    this.unitsAdjust = function () {
      if (this.amount > 999) {
        switch (this.unit) {
          case 'g':
            this.amount /= 1000;
            this.unit = 'kg';
            break;

          case 'ml':
            this.amount /= 1000;
            this.unit = 'l';
            break;

          default:
            break;
        }
      } else if ((this.unit === 'oz' || this.unit === 'lb') && this.amount > 16) {
        this.amount /= 16;
        this.unit = 'lb';
      } else {
        switch (this.unit) {
          case 'kg':
            this.amount *= 1000;
            this.unit = 'g';
            break;

          case 'l':
            this.amount *= 1000;
            this.unit = 'ml';
            break;

          case 'lb':
            this.amount *= 16;
            this.unit = 'oz';
            break;

          default:
            break;
        }
      }
    };
  };

  const write2Class = function (array = recipe.ingreds, textLoc = app.ingredsNameClass) {
    for (let i = 0, index = 0; i < array.length; index++, i++) {
      const element1 = array[index];
      const element = textLoc[i];
      if (i === index) {
        element1.write(element);
      }
    }
  };

  const writeName2Class = function
  (array = recipe.ingreds, textLoc = app.ingredsNameClass) {
    for (let i = 0, index = 0; i < array.length; index++, i++) {
      const element1 = array[index];
      const element = textLoc[i];
      if (i === index) {
        element1.writeName(element);
      }
    }
  };

  const writeQuant2Class = function
  (array = recipe.ingreds, textLoc = app.ingredsNameClass) {
    for (let i = 0, index = 0; i < array.length; index++, i++) {
      const element1 = array[index];
      const element = textLoc[i];
      if (i === index) {
        element1.writeQuant(element);
      }
    }
  };

  const writeRecipe = function (recipe) {
    write2Class(recipe.ingreds, app.recipeIngreds);
    writeName2Class(recipe.ingreds, app.ingredsNameClass);
    writeQuant2Class(recipe.ingreds, app.ingredsQuant);
  };

  Ingredients.prototype.convert = function () {
    this.unitsAdjust();

    switch (this.unit) {
      case 'g':
        this.amount = (this.amount / 28.35).toFixed(2);
        this.unit = 'oz';
        break;

      case 'kg':
        this.amount = (this.amount * 2.205).toFixed(2);
        this.unit = 'lb';
        break;

      case 'lb':
        this.amount = (this.amount / 2.205).toFixed(2);
        this.unit = 'kg';
        break;

      case 'ml':
        this.amount = (this.amount / 237).toFixed(2);
        this.unit = 'cups';
        break;

      case 'l':
        this.amount = (this.amount / 3.785).toFixed(2);
        this.unit = 'US gal lqd';
        break;

      case 'US gal lqd':
        this.amount = (this.amount * 3.785).toFixed(2);
        this.unit = 'l';
        break;

      case 'oz':
        this.amount = (this.amount * 28.35).toFixed(0);
        this.unit = 'g';
        break;

      case 'cups':
        this.amount = (this.amount * 237).toFixed(0);
        this.unit = 'ml';
        break;

      case 'C':
        this.amount = ((this.amount * (9 / 5) + 32).toFixed(0));
        this.unit = 'F';
        break;

      case 'F':
        this.amount = ((this.amount - 32) / (9 / 5)).toFixed(0);
        this.unit = 'C';
        break;

      default:
        break;
    }
    this.unitsAdjust();
    writeRecipe();
  };

  Ingredients.prototype.servReset = function () {
    if ((this.unit === 'g' || this.unit === 'ml' || this.unit === 'tbsp' || this.unit === 'tsp')) {
      this.amount = (this.amount / app.rangeValue).toFixed(0);
    } else {
      this.amount = (this.amount / app.rangeValue).toFixed(2);
    }
    this.unitsAdjust();
  };

  Ingredients.prototype.servings = function () {
    if ((this.unit === 'g' || this.unit === 'ml' || this.unit === 'tbsp' || this.unit === 'tsp')) {
      this.amount = (this.amount * app.rangeValue).toFixed(0);
    } else {
      this.amount = (this.amount * app.rangeValue).toFixed(2);
    }

    this.unitsAdjust();
  };

  /* let seededIngreds = {

 allFlour: new Ingredients(1,'flour', 500, 'g'),
 breadFlour: new Ingredients(2,'strong bread flour', 250, 'g'),
 wholemealFlour: new Ingredients(3,'wholemeal flour', 250, 'g'),
 salt: new Ingredients(4,'salt', 2, 'tsp'),
 water: new Ingredients(5,'water', 300, 'ml'),
 seeds: new Ingredients(6,'seeds', 1, 'tbsp'),
 yeast: new Ingredients(7,'yeast', 7, 'g'),
 oil: new Ingredients(8,'olive oil', 3, 'tbsp'),
 tempFan: new Ingredients(9,'fan/', 200, 'C'),
 temp: new Ingredients(10,'normal/', 220, 'C'),

} */

  const convertAll = function () {
    recipe.ingreds.forEach((element) => {
      element.convert();
    });
  };

  onclick = function () {
  // convertAll();
    console.log(recipe.ingreds);
  };

  writeRecipe();

  const createIngreds = function (array) {
    const array2 = [];
    array.forEach((element) => {
      const ingred = new Ingredients(element.name, element.amount, element.unit);
      array2.push(ingred);
    });
    array.splice(0, array.length, ...array2);
  };

  return {
    Ingredients,
    write2Class,
    writeName2Class,
    writeQuant2Class,
    convertAll,
    writeRecipe,
    createIngreds,
  };
};

module.exports = { mainRecipefuncs };

/* app.range.onchange = function (recipe) {
  app.rangeValue = this.value;

  [...app.servNum].forEach((element) => {
    element.innerHTML = app.rangeValue;
  });

  recipe.ingreds.forEach((element) => {
    element.servings();
  });
  writeRecipe();

  recipe.ingreds.forEach((element) => {
    element.servReset();
  });
}; */
