import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

//Function to fetch data from the GraphQL server
const getData = async (
    gqlQuery: string,
    variables: any) => {
    return client.query({
        query: gql`${gqlQuery}`,
        variables,
    });
};

// // Function to put data to the GraphQL server
// const putData = async (
//     gqlQuery: string,
//     variables: any
// ) => {
//     return client.mutate({
//         mutation: gql`${gqlQuery}`,
//         variables,
//     });
// };


// Function to put data to the GraphQL server (To catch specific graphql errors)
const putData = async (
    gqlQuery: string,
    variables: any
) => {
    console.log("Executing putData with query:", gqlQuery);
    console.log("Variables:", variables);
    try {
        return await client.mutate({
            mutation: gql`${gqlQuery}`,
            variables,
        });
    } catch (error) {
        // if (error.networkError) {
        //     console.error("Network error:", error.networkError);
        // }
        if (error.graphQLErrors) {
            error.graphQLErrors.forEach((graphQLError: any) => {
                console.error("GraphQL error:", graphQLError.message);
            });
        }
        console.error("Error in putData:", error);
        throw error;
    }
};


const sendApiRequest = (query: any, variables: any, func: any) => {
    return new Promise((resolve, reject) => {
        func(query, variables)
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: any) => {
                reject(error);
                console.error("Error in sending api request", error);
            });
    });
};

const movieQuery = `
    query Movies{
    movies {
        movie_id
        title
        release_year
        genre
      }
    }
  `;

const actorQuery = `
    query Actors{
    actors {
        actor_id
        first_name
        last_name
        nationality
        birth_date
        }
    }
`;

const movieActorQuery = `
    query MovieActors($movie_id: Int!) {
        movieActors(movie_id: $movie_id) {
          actor_id
        }
    }
`;

const specificActorQuery = `
    query Actor($actor_id: Int!) {
        actor(actor_id: $actor_id) {
          actor_id
          first_name
          last_name
        }
    }
`;

const MovieaddMutation = `
    mutation AddMovie($title: String!, $release_year: Int!, $genre: String!) {
        addMovie(title: $title, release_year: $release_year, genre: $genre) {
            movie_id
            title
            release_year
            genre
        }
    }
`;

const ActoraddMutation = `
    mutation AddActor($first_name: String!, $last_name: String!, $nationality: String, $birth_date: DateTime) {
        addActor(first_name: $first_name, last_name: $last_name, nationality: $nationality, birth_date: $birth_date) {
            first_name
            last_name
            nationality
            birth_date
  }
}
`;

const ActorupdateMutation = `
mutation UpdateActor($actor_id: Int!, $first_name: String, $last_name: String, $nationality: String, $birth_date: DateTime) {
  updateActor(actor_id: $actor_id, first_name: $first_name, last_name: $last_name, nationality: $nationality, birth_date: $birth_date) {
    actor_id
    first_name
    last_name
  }
}
`;

const MovieActorsaddMutation = `
mutation AddMovieActor($movie_id: Int!, $actor_id: Int!) {
  addMovieActor(movie_id: $movie_id, actor_id: $actor_id) {
    movie_id
    actor_id
  }
}
`;

const ActorDeleteMutation = `
   mutation DeleteActor($actor_id: Int!) {
    deleteActor(actor_id: $actor_id) {
      actor_id
    }
} 
`;

const MovieDeleteMutation = `
    mutation DeleteMovie($movie_id: Int!) {
    deleteMovie(movie_id: $movie_id) {
      title
      genre
      release_year
    }
}
`;

const MovieJoindeleteMutation = `
   mutation DeleteMovieJoin($movie_id: Int!) {
    deleteMovieJoin(movie_id: $movie_id) {
      movie_id
    }
} 
`;

const ActorJoindeleteMutation = `
    mutation DeleteActorJoin($actor_id: Int!) {
    deleteActorJoin(actor_id: $actor_id) {
      actor_id
    }
}   
`;

const updateMovieMutation = `
    mutation UpdateMovie($movie_id: Int!, $title: String, $release_year: Int, $genre: String) {
        updateMovie(movie_id: $movie_id, title: $title, release_year: $release_year, genre: $genre) {
          movie_id
          title
          release_year
          genre
        }
}
`;

// CRUD operations

export const getMovies = async () => {
    return sendApiRequest(movieQuery, {}, getData)
};

export const getActors = async () => {
    return sendApiRequest(actorQuery, {}, getData)
};

export const getMovieActors = async (movie_id: number) => {
    return sendApiRequest(movieActorQuery, { movie_id }, getData)
};

export const getActor = async (actor_id: number) => {
    return sendApiRequest(specificActorQuery, { actor_id }, getData)
};

export const putMovies = async (
    title: string,
    release_year: number,
    genre: string
) => {
    return sendApiRequest(MovieaddMutation, { title, release_year, genre }, putData)
        .then((response: any) => {
            console.log("Movie added Successfully", response);
            console.log("The id of the movie is", response.addMovie.movie_id);
            return response.addMovie.movie_id;
        })
        .catch((error: any) => {
            console.error(error);
        });
};

export const putActors = async (
    first_name: string,
    last_name: string,
    nationality: string,
    birth_date: string
) => {
    return sendApiRequest(ActoraddMutation, { first_name, last_name, nationality, birth_date }, putData)
        .then((response: any) => {
            console.log("Actor added Successfully", response);
        })
        .catch((error: any) => {
            console.log("Data adding Error", error);
        });
};

export const updateActor = async (
    actor_id: number,
    first_name: string,
    last_name: string,
    nationality: string,
    birth_date: string
) => {
    // console.log("Type of actor id:", typeof actor_id);
    return sendApiRequest(ActorupdateMutation, { actor_id, first_name, last_name, nationality, birth_date }, putData)
        .then((response: any) => {
            console.log("Actor updated Successfully", response);
        })
        .catch((error: any) => {
            console.log("Data updating Error", error);
        })
};

export const updateMovies = async (
    movie_id : number,
    title: string,
    release_year: number,
    genre: string
) => {
    return sendApiRequest(updateMovieMutation, { movie_id, title, release_year, genre }, putData)
    .then((response: any) => {
        console.log("Movie updated Successfully", response);
    })
    .catch((error : any) => {
        console.log("Data updating Error", error);
    })
};

export const addMovieActors = async (
    movie_id: number,
    actor_id: number
) => {
    return sendApiRequest(MovieActorsaddMutation, { movie_id, actor_id }, putData)
        .then((response: any) => {
            console.log("Movie Actor added Successfully", response);
        })
        .catch((error: any) => {
            console.log("Data adding Error", error);
        })
};

export const deleteActor = async (
    actor_id: number
) => {
    return sendApiRequest(ActorDeleteMutation, { actor_id }, putData)
    .then((respnse:any) => {
        console.log("Actor deleted Successfully from actor table", respnse);
    })
    .catch((error:any) => {
        console.log("Error in deleting actor", error);
    })
};

export const deleteMovie = async (
    movie_id: number
) => {
    return sendApiRequest(MovieDeleteMutation, { movie_id }, putData)
    .then((reponse :any) => {
        console.log("Movie deleted Successfully from movie table", reponse);
    })
    .catch((error: any) => {
        console.log("Error in deleting movie", error);
    })
};

export const deleteMovieJoin = async (
    movie_id: number
) => {
    return sendApiRequest(MovieJoindeleteMutation, { movie_id }, putData)
    .then((respnse:any) => {
        console.log("Movie deleted Successfully from movie_actor table", respnse);
    })
    .catch((error:any) => {
        console.log("Error in deleting movie", error);
    })
};

export const deleteActorJoin = async (
    actor_id: number
) => {
    return sendApiRequest(ActorJoindeleteMutation, { actor_id }, putData)
    .then((respnse:any) => {
        console.log("Actor deleted Successfully from movie_actor table", respnse);
    })
    .catch((error:any) => {
        console.log("Error in deleting actor", error);
    })
};
