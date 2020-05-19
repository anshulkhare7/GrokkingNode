const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to the database')
    }
    const db = client.db(databaseName)      
    
    insertTask(db)
    insertUser(db)  
})

const insertUser = (db) => {
    db.collection('users').insertOne({
        name: 'Anshul', 
        age: 39
    }, (err, result)=>{
        if(err){
            console.log('Unable to insert user')
        }

        console.log(result.ops)
    })
}

const insertTask = (db) => {
    const tasks = [{description: "Fetch the veggies", status: true},{description: "Cook dinner", status: false}]

    db.collection('tasks').insertMany(tasks, (err, result)=> {
        if(err){
            console.log('Unable to insert user')
        }

        console.log(result.ops)
    })
}