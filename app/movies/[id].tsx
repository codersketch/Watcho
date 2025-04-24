import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/usefetch";
import { fetchMoviesDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);
const MovieDetils = () => {
    const { id } = useLocalSearchParams();
    const { data: movie, loading } = useFetch(() =>
        fetchMoviesDetails(id as string)
    );
    // console.log(movie);

    return (
        <View className="bg-primary flex-1">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                <View>
                    <Image
                        source={{
                            uri:
                                movie?.primaryImage ||
                                "https://placehold.co/600x400/1F1F1F/FFFFFF?text=Watcho",
                        }}
                        className="w-full h-[350px]"
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-col items-start mt-5 px-5">
                    <Text className="text-white font-bold text-xl">
                        {movie?.originalTitle}
                    </Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie?.releaseDate?.split("-")[0]}
                        </Text>
                        <Text className="text-light-200 text-sm">
                            {movie?.runtimeMinutes} m
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.averageRating ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.numVotes} votes)
                        </Text>
                    </View>
                    <MovieInfo label="Overview" value={movie?.description} />
                    <MovieInfo
                        label="Genres"
                        value={
                            movie?.interests?.map((i) => i).join(" - ") ||
                            "No interests listed"
                        }
                    />
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo
                            label="Budget"
                            value={
                                movie?.budget
                                    ? `$${movie.budget / 1000000} million`
                                    : "N/A"
                            }
                        />
                        <MovieInfo
                            label="Revenue"
                            value={
                                movie?.grossWorldwide
                                    ? `$${
                                          Math.round(movie?.grossWorldwide) /
                                          1000
                                      }`
                                    : "M/A"
                            }
                        />
                        <MovieInfo
                            label="Overview"
                            value={
                                movie?.productionCompanies
                                    .map((p) => p.name)
                                    .join(" - ") || "N/A"
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
            onPress={router.back}
            >
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MovieDetils;
