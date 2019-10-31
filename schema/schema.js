const graphql = require('graphql');

// understand concept of schema un graphql 35:00

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// dummy data
const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1'},
    { name: 'Brandon Sanderson', age: 42, id: '2'},
    { name: 'Terry Pratchett', age: 66, id: '3'},
]

// 3 responsibities of GraphQL
// 1. Defining Types (BookType)
// 2. Defining Relationships
// 3. Degining Queries

// As far as I understood, this tell us the available types of the object
// If we don't want certain property to be accesible, we don't put in here
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

// Root queries are the entry point
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // here we specify another queries, book is the "name" of the query I guess
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } }, // why id needs to be an object, unless we have other metadata besides type
            resolve(parent, args){ // this syntax looks reaaally weird to me
                // code to get data from db / other source
                return books.filter(e => args.id === e.id)[0]
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } }, // why id needs to be an object, unless we have other metadata besides type
            resolve(parent, args){ // this syntax looks reaaally weird to me
                // code to get data from db / other source
                return authors.filter(e => args.id === e.id)[0]
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery // this define the initial query
});