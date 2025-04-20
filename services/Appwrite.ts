import { Client, Databases, ID, Query } from "react-native-appwrite";

// Track the searches made by a user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTIONS_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    // Check if a record  of that search has already been stored
    // If a document if found incriment the searchCount field
    // If no document is found create a new appwrite db -> 1

    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTIONS_ID,
            [Query.equal("searchTerm", query)]
        );

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTIONS_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTIONS_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    count: 1,
                    poster_url: movie.primaryImage,
                    title: movie.primaryTitle,
                    movie_id: movie.id,
                }
            );
        }
        // console.log(result);
    } catch (error) {
        console.log(error);
        throw error;
    }
};


