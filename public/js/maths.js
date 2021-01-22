
app = {recipe: null}
 

function getRecipe(req,res){
    const {id} = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'Recipe-App';
    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('connected to server');
            const db = client.db(dbName);
            const collection = await db.collection('recipes');
            const recipe = await collection.findOne({_id: new ObjectID(id)});
            //debug(recipe);

            Recipe = recipe
            
        }
        catch (err) {
            debug(err.stack);
        }

        client.close();
    }());

}

debug(getRecipe());

