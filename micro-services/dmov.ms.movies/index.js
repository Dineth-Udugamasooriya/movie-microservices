const { startStandaloneServer} = require('@apollo/server/standalone');
const server = require('./server'); //this module contains the ApolloServer instance

const port = process.env.SERVER_PORT || 4000;

async function startServer(){
    const { url} = await startStandaloneServer(server, {
        listen: { port: 4000}
    });
    
    console.log(`Server ready at: ${url}`);
}

startServer().catch((error) => {
    console.error('Error starting the server:', error);
});