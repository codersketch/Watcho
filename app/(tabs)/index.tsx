import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    FlatList,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrandingMovies } from "@/services/Appwrite";
import TrandingCard from "@/components/TrandingCard";

export default function Index() {
    const router = useRouter();

    const {
        data: trandingMovies,
        loading: trandingLoading,
        error: trandinError,
    } = useFetch(getTrandingMovies);
    // console.log(trandingMovies);

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() =>
        fetchMovies({
            query: '',
        })
    );
    // console.log(movies);

    return (
        <View className="flex-1 bg-primary">
            <StatusBar className="bg-primary" barStyle="light-content" />
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: 10,
                }}
            >
                <Image
                    source={icons.logo}
                    className="w-12 h-10 mt-20 mb-5 mx-auto"
                />
                {moviesLoading || trandingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : moviesError || trandinError ? (
                    <Text className="text-white">
                        Error: {moviesError?.message || trandinError?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie"
                        />

                        {trandingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mb-3">
                                    Tranding movies
                                </Text>
                            </View>
                        )}

                        <>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => (
                                    <View className="w-4" />
                                )}
                                className="mb-4 mt-3"
                                data={trandingMovies}
                                renderItem={({ item, index }) => (
                                    <TrandingCard
                                    movie={item}
                                    index={index}
                                    />
                                )}
                                keyExtractor={(item) =>
                                    item.movie_id.toString()
                                }
                            />
                            <Text className="text-lg text-white font-bold mt-5 mb-3">
                                Letest Movies
                            </Text>
                            <FlatList
                                data={movies}
                                renderItem={({ item }) => (
                                    //getting response and insert in card
                                    <MovieCard
                                        id={item.id}
                                        primaryImage={item.primaryImage}
                                        primaryTitle={item.primaryTitle}
                                        averageRating={item.averageRating}
                                        releaseDate={item.releaseDate}
                                    />

                                    // <Text className="text-white text-sm">{item.primaryTitle}</Text>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                scrollEnabled={false}
                                className="mr-2 pb-32"
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
