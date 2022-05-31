const {ApolloServer ,gql }  = require("apollo-server");

const typeDefs = gql`
type Query{
    hello:String!
    Tweets:[Tweet!]!
    Tweet(id:ID!): Tweet
    User(id:ID!): User
    Notifications: [Notification]
}
type Tweet{
    id:ID!
    body:String
    date:String
    Stats:Stat  
}
type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String 
    avatar_url: String
}
type Stat {
    id:ID!
    views: Int
    likes: Int
    retweets: Int
    responses: Int
}
type Notification {
    id:ID!
    body:String
}
`;



const resolvers={
    Query:{
        hello: (parent, args, context) => "World",
        Tweets:()=>{
            
            return tweets
        },
        Tweet:(parent,{id},context)=>{
          return tweets.find((tweet) => tweet.id === id);
        },
        User:(parent,{id},context)=>{
          return users.find((User) => User.id === id);
        },

        Notifications:(parent,args,context)=>{
              return notifications
          }
      },
      Tweet : {
        Stats:({StatsId},args,context)=>{
          return stats.find((stat) => stat.id === StatsId);
      
        }
      },
}
const tweets=[
    { 
        id:"tweets"+1,
        body:"tweet1",
        date:2015-03-25,
        StatsId:"stats"+11 
    },
    { 
        id:"tweets"+2,
        body:"tweet3",
        date:2019-12-30,
        StatsId:"stats"+21 
    },
    { 
        id:"tweets"+3,
        body:"tweet3",
        date:2020-08-09,
        StatsId:"stats"+31  
    }
]

const users=[
    {
        id: "users"+1,
        username: "RevanthShivva",
        first_name: "Revanth",
        last_name: "Shivva",
        full_name: "Shivva Revanth",
        name: "Revanth",
        avatar_url: "www.google.com"
    },
    {
        id: "users"+2,
        username: "AshwanthShivva",
        first_name: "Ashwanth",
        last_name: "Shivva",
        full_name: "Shivva Ashwanth",
        name: "Ashwanth",
        avatar_url: "www.google.com"
    }
]

const stats=[
    {
        id:"stats"+11,
        views: 12,
        likes: 10,
        retweets: 5,
        responses: 4
    },
    {
        id:"stats"+21,
        views: 120,
        likes: 100,
        retweets: 50,
        responses: 40
    },
    {
        id:"stats"+31,
        views: 1250,
        likes: 1050,
        retweets: 550,
        responses: 450
    }
]

const notifications=[
    {
        id:"notifs"+1,
        body:"notification1"
    },
    {
        id:"notifs"+2,
        body:"notification2"
    },
    {
        id:"notifs"+3,
        body:"notification3"
    }
]

const server = new ApolloServer({
  typeDefs,
  resolvers,


});

server.listen().then(({url}) =>{
    console.log("Server : " + url)
});