import ContextStrategy from "./src/contextStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"

const postgresConnectionString = "postgres://pauloromanenghi:pq123@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConenctionString = "mongodb://pauloromanenghi:pq123@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConenctionString))
await mongoDBContext.connect()


const data = [{
    name: 'pauloromanenghi',
    type: 'transaction'
}, {
    name: 'mariasilva',
    type: 'activityLog'
}]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for(const { type, name } of data) {

    const context = contextTypes[type]
    await context.create({ name: name + Date.now() })

    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}