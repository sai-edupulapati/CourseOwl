const {MongoClient} = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://courseowl241:kmwouENhxx3iJPUi@cluster0.jtihfjn.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri)
    
    try {
        await client.connect()

        await listDatabases(client)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

main().catch(console.error)

async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases()
    dbList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}