const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        movies: async () => await prisma.movie.findMany(), //It is asynchronous (async) because database queries take time, and the await keyword ensures that the query completes before returning the result.
        movie: async (_, { movie_id}) => await prisma.movie.findUnique({ where: { movie_id }}),
        actors: async () => await prisma.actor.findMany(),
        actor: async (_, { actor_id }) => await prisma.actor.findUnique({ where: { actor_id }}),
        movieActors: async(_, {movie_id}) => await prisma.movie_actor.findMany({ where: { movie_id }}),
    },

    Mutation: {
        addMovie: async (_, { title, release_year, genre}) => {
            return await prisma.movie.create({
                data: {
                    title,
                    release_year,
                    genre,
                },
            });
        },

        addActor: async(_, { first_name, last_name, nationality, birth_date}) => {
            return await prisma.actor.create({
                data: {
                    first_name,
                    last_name,
                    nationality,
                    birth_date,
                },
            });
        },

        updateActor: async(_, { actor_id, first_name, last_name, nationality, birth_date}) => {
            return await prisma.actor.update({
                where: { actor_id},
                data: {
                    first_name,
                    last_name,
                    nationality,
                    birth_date,
                },
            });
        },

        updateMovie: async(_, { movie_id, title, release_year, genre }) => {
            return await prisma.movie.update({
                where: { movie_id },
                data: {
                    title,
                    release_year,
                    genre,
                },
            });
        },

        addMovieActor: async(_, { movie_id, actor_id }) => {
            return await prisma.movie_actor.create({
                data: {
                    movie_id,
                    actor_id,
                },
            });
        },

        deleteActor: async(_, { actor_id}) => {
            return await prisma.actor.delete({
                where: { actor_id },
            });
        },

        deleteActorJoin: async(_, { actor_id }) => {
            return await prisma.movie_actor.deleteMany({
                where: { actor_id },
            });
        },

        deleteMovie: async(_, { movie_id }) => {
            return await prisma.movie.delete({
                where: { movie_id },
            });
        },

        deleteMovieJoin: async(_, { movie_id }) => {
            return await prisma.movie_actor.deleteMany({
                where: { movie_id },
            });
        },
    },
};

module.exports.resolvers = resolvers;

// THe resolver handles the logic for fetching data from the database or mutating data in the database.

/**
 When a client sends a query like this:

query {
  movies {
    movie_id
    title
    release_year
    genre
  }
}
The resolver function movies is executed, which fetches all movies from the database using prisma.movie.findMany(). The result is returned as an array of movie objects.
 */