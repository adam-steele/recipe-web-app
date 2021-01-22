const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

const recipes = [

  // seededRecipe
  {

    title: 'Seeded Loaf',
    time: '2 hrs 30 mins',
    servings: 1,
    summary: 'A simple recipe for a seeded loaf that is a good starting point, honed during lockdown.',

    pictures: [
      {
        link: '/img/seedy-tin.jpeg',
        caption: 'in oven in tin',
      },
      {
        link: '/img/non-seeded-loaf.jpeg',
        caption: 'oven, no seeds & no tin',
      },
      {
        link: '/img/seeded-loaf-bmaker.jpeg',
        caption: 'in breadmaker',
      },
    ],

    ingreds: [
      {
        name: 'wholemeal flour',
        amount: 250,
        unit: 'g',
      },
      {
        name: 'strong bread flour',
        amount: 250,
        unit: 'g',
      },
      {
        name: 'water',
        amount: 300,
        unit: 'ml',
      },
      {
        name: 'salt',
        amount: 2,
        unit: 'tsp',
      },
      {
        name: 'seeds',
        amount: 1,
        unit: 'tbsp',
      },
      {
        name: 'yeast',
        amount: 7,
        unit: 'g',
      },
      {
        name: 'olive oil',
        amount: 3,
        unit: 'tbsp',
      },
      {
        name: 'fan/',
        amount: 200,
        unit: 'C',
      },
      {
        name: 'normal/',
        amount: 220,
        unit: 'C',
      },
    ],

    tips: ['Use this recipe in a bread maker just as easily! Just increase water to 350ml',
      'If baking without breadmaker, safer to add slightly less liquid intially and more later if needed',
      'Whilst the amount of flour needs to be 500g in total. You can add more Wholemeal if preferred, for different flavour & texture',
      'Seeds can also be substitued by this is my recommendaition. A mix of sizes is best'],

    steps: [' Mix 500g, 2 tsp and a 7g in a large bowl. Add 1 tbsp, of each variety.',

      ' Make a well in the centre, then add 3 tbsp and , and mix well. If the dough seems a little stiff, add another 1-2 tbsp water and mix well.',

      ' Tip onto a lightly floured work surface and knead for around 10 mins.',

      ' Once the dough is satin-smooth, place it in a lightly oiled bowl and cover with cling film. Leave to rise for 1 hour until doubled in size or place in the fridge overnight.',

      ' Line a baking tray with baking parchment. Gently mould the dough into a ball.',

      ' Place it on the baking parchment to prove for a further hour until doubled in size.',

      ' Heat oven to 220C 200C gas mark 7.',

      ' Dust the loaf with some extra flour and cut a cross about 6cm long into the top of the loaf with a sharp knife.',

      ' Bake for 25-30 mins until golden brown and the loaf sounds hollow when tapped underneath. Cool on a wire rack.'],

    source: {
      link: 'https://www.bbcgoodfood.com/recipes/easy-white-bread',
      description: 'adapted and improved from this recipe',
    },

  },

  // BreadmakerRecipe
  {

    title: 'Seeded Loaf (in Breadmaker)',
    time: '4 hrs ',
    servings: 1,
    summary: 'The same simple recipe for a seeded loaf but adapted for use in a breadmaker, for those with the privledge of such a device.',

    pictures: [{
      link: '/img/seeded-loaf-bmaker.jpeg',
      caption: 'in breadmaker',
    },
    {
      link: '/img/seedy-tin.jpeg',
      caption: 'in oven in tin',
    },
    {
      link: '/img/non-seeded-loaf.jpeg',
      caption: 'oven, no seeds & no tin',
    },
    ],

    ingreds: [
      {
        name: 'wholemeal flour',
        amount: 200,
        unit: 'g',
      },
      {
        name: 'strong bread flour',
        amount: 300,
        unit: 'g',
      },
      {
        name: 'water',
        amount: 350,
        unit: 'ml',
      },
      {
        name: 'salt',
        amount: 1,
        unit: 'tsp',
      },
      {
        name: 'seeds',
        amount: 1,
        unit: 'tbsp',
      },
      {
        name: 'yeast',
        amount: 10,
        unit: 'g',
      },
      {
        name: 'olive oil',
        amount: 4,
        unit: 'tbsp',
      },
    ],

    tips: ['If baking without breadmaker, safer to add slightly less liquid intially and more later if needed',
      'Whilst the amount of flour needs to be 500g in total. You can add more Wholemeal if preferred, for different flavour & texture',
      'Seeds can also be substitued by this is my recommendaition. A mix of sizes is best'],

    steps: ['Add 500g flour to bradmaker tin.',

      'Add 1 tsp salt.',

      'Add 7g of dried yeast. (best to measure in smaller thing such as cup as accidentally adding excess not good)',

      'Add 1 tbsp of each seed.',

      'Mix to combine, then add 350ml water. This should be warm to the touch, to start the reaction, but not so hot as to kill yeast.',

      'Add 4 tbsp olive oil. Mix well, this starts the proving process which may not work properly in breadmaker otherwise.',

      'Place tin back in breadmaker.',

      'Settings should be bake, med color crust and and large size.',

      'When taking out needs 30 mins too cool before eating on a wire rack.'],

    source: {
      link: 'recipes[0]._id',

      description: 'different version of this recipe',
    },

  },

  // BakedCauliChick
  {

    title: 'Baked cauliflower/chickpeas with fennel salad & yogurt',
    time: '40 minutes ',
    servings: 2,
    summary: 'Great veggie recipe, filling mixture of textures and I was surprised how super tasty a combo it was.',

    pictures: [{
      link: '/img/cpbakenicebowlfull.jpeg',
      caption: 'Original version',
    },
    {
      link: '/img/cpbakegreen.jpeg',
      caption: 'with green chilli and dill',
    },
    {
      link: '/img/cpbakecarrottkale.jpeg',
      caption: 'substituted fennel for carrot radish salad',
    },
    {
      link: '/img/cpbakecarrot wine.jpeg',
      caption: 'carrot one with wine as a side!',
    },
    {
      link: '/img/cpbakecarrot wine.jpeg',
      caption: 'carrot one with wine as a side!',
    },
    ],

    ingreds: [
      {
        name: 'garlic',
        amount: 2,
        unit: 'cloves',
      },
      {
        name: 'ground cumin',
        amount: 1.5,
        unit: 'tbsp',
      },
      {
        name: 'ground coriander',
        amount: 1.5,
        unit: 'tbsp',
      },
      {
        name: 'olive oil',
        amount: 3,
        unit: 'tbsp',
      },
      {
        name: 'cauliflower',
        amount: 1,
        unit: 'head',
      },
      {
        name: 'chickpeas',
        amount: 400,
        unit: 'g',
      },
      {
        name: 'greek yogurt',
        amount: 100,
        unit: 'g',
      },
      {
        name: 'lemon juice',
        amount: 4,
        unit: 'tbsp',
      },
      {
        name: 'fennel',
        amount: 1,
        unit: 'medium bulb',
      },
      {
        name: 'chilli',
        amount: 1,
        unit: '',
      },
      {
        name: 'fresh parsley',
        amount: 1,
        unit: 'handful',
      },
      {
        name: 'sesame seeds',
        amount: 1,
        unit: 'tbsp',
      },
    ],

    tips: ['replace lemon with lemon juice if easier',
      'needs something creamy and cooling for balance but could be creme fraiche instead of yogurt',
      'easily veganised with dairy yougurt alternative'],

    steps: ['Preheat oven to 200°C.',

      'Mix minced garlic, ground coriander, cumin, and 3 Tbsp oil in a large bowl. Add cauliflower and chickpeas; season with salt and pepper. Toss to coat.',

      'Transfer cauliflower mixture to a baking paper lined rimmed baking sheet. Wipe out bowl; reserve.',

      'Bake chickpeas and cauliflower for 10 minutes.',

      'Meanwhile, mix yogurt, 1 Tbsp. lemon juice, and a big pinch of salt in a small bowl.',

      'Turn/toss chickpeas and cauliflower then return for roughly another 10 minutes until golden brown and cauliflower is tender',

      'Toss fennel, chilli, parsley, sesame seeds, remaining 3 Tbsp of oil and lemon juice in reserved bowl; season with salt.',

      'Spread yogurt mixture in serving bowls. Top with spiced chickpea mixture. Scatter fennel salad over, then drizzle with oil.',
    ],

    source: {
      link: 'https://www.bonappetit.com/recipe/warm-chickpea-bowls-with-lemony-yogurt',

      description: 'inspired by this recipe',
    },

  },

  // ChickpeaStew
  {

    title: 'Adams speciality chickpea stew',
    time: '1 hours 30mins ',
    servings: 4,
    summary: 'A warming satisfiying chickpea stew that I developed myself using store cupboard ingredients',

    pictures: [{
      link: '/img/cpbakenicebowlfull.jpeg',
      caption: 'Original version',
    },
    {
      link: '/img/cpbakegreen.jpeg',
      caption: 'with green chilli and dill',
    },
    {
      link: '/img/cpbakecarrottkale.jpeg',
      caption: 'substituted fennel for carrot radish salad',
    },
    {
      link: '/img/cpbakecarrot wine.jpeg',
      caption: 'carrot one with wine as a side!',
    },
    {
      link: '/img/cpbakecarrot wine.jpeg',
      caption: 'carrot one with wine as a side!',
    },
    ],

    ingreds: [
      {
        name: 'garlic',
        amount: 3,
        unit: 'cloves',
      },
      {
        name: 'red onion',
        amount: 1,
        unit: 'large one',
      },
      {
        name: 'olive oil',
        amount: 1,
        unit: 'tbsp',
      },
      {
        name: 'ground cumin',
        amount: 1.5,
        unit: 'tbsp',
      },
      {
        name: 'smoked paprika',
        amount: 1.5,
        unit: 'tbsp',
      },
      {
        name: 'chickpeas',
        amount: 400,
        unit: 'g',
      },
      {
        name: 'tomatoes',
        amount: 400,
        unit: 'g',
      },
      {
        name: 'red wine',
        amount: 1,
        unit: 'small glass',
      },
      {
        name: 'veggie stock',
        amount: 1,
        unit: 'cube',
      },
      {
        name: 'chilli',
        amount: 1,
        unit: '',
      },
      {
        name: 'fresh parsley',
        amount: 1,
        unit: 'handful',
      },
      {
        name: 'halluomi',
        amount: 200,
        unit: 'g',
      },
    ],

    tips: ['wine not neccesary but maybe marmite if removing, something to give it more body',
      'chuck any left over root veg you have lying around in',
      'easily veganised without cheese or a vegan alternative'],

    steps: ['Preheat oven to 200°C.',

      'Mix minced garlic, ground coriander, cumin, and 3 Tbsp oil in a large bowl. Add cauliflower and chickpeas; season with salt and pepper. Toss to coat.',

      'Transfer cauliflower mixture to a baking paper lined rimmed baking sheet. Wipe out bowl; reserve.',

      'Bake chickpeas and cauliflower for 10 minutes.',

      'Meanwhile, mix yogurt, 1 Tbsp. lemon juice, and a big pinch of salt in a small bowl.',

      'Turn/toss chickpeas and cauliflower then return for roughly another 10 minutes until golden brown and cauliflower is tender',

      'Toss fennel, chilli, parsley, sesame seeds, remaining 3 Tbsp of oil and lemon juice in reserved bowl; season with salt.',

      'Spread yogurt mixture in serving bowls. Top with spiced chickpea mixture. Scatter fennel salad over, then drizzle with oil.',
    ],

    source: {
      link: 'https://www.bonappetit.com/recipe/warm-chickpea-bowls-with-lemony-yogurt',

      description: 'inspired by this recipe',
    },

  },

];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'Recipe-App';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to admin routes server');

          const db = client.db(dbName);

          const response = await db.collection('recipes').insertMany(recipes);

          res.json(response);
        } catch (err) {
          debug(err.stack);
          debug('issue!');
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
