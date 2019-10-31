const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express();

// understand concept of middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    // schema // same
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Now listening on the port 4000")
})

