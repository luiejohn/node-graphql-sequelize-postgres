const graphql = require('graphql');
const _ = require('lodash');
const Product = require('../models/products-sql');
const Users = require('../models/users');


const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
 } = graphql;

 //Set graphql schema
 const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () =>({
        id: { type: GraphQLID },
        title: {type: GraphQLString},
        price: {type: GraphQLInt},
        imageUrl: {type: GraphQLString},
        description: {type: GraphQLString},
    })

});

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () =>({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })

})


//Find all data query sample
// {
//     books{
//         name 
//         id
//     }
// }

//Create Query using created schema tables
//Query for "Reading Data only"
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        //For PostgreSQL data
        products: {
            type: new GraphQLList(ProductType),
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Product.findAll();
            }
        }

    }
});

// Mutation is for Adding, deleting and updating

// sample front-end query

// mutation {
//     addBook(name: "A Random Book", genre: "Fantasy", authorId: "$52601230541230"){
//         //return data after successful mutation query
//         name
//         genre
//         authorId
//     }
// }

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UsersType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                username: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Users.create({
                    name: args.name,
                    username: args.username,
                    email: args.email,
                    password: args.password
                });
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});