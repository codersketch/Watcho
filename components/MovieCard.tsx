import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
    id,
    primaryImage,
    primaryTitle,
    averageRating,
    releaseDate,
}:MovieImdb) => {
    // console.log(primaryImage);
    
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: primaryImage
                            ? `${primaryImage}`
                            : `https://placehold.co/600x400/1F1F1F/FFFFFF?text=Watcho`,
                    }}
                    className="w-full h-40 rounded-lg bg-[#1F1F1F]"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {primaryTitle}
                </Text>
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">{Math.round(averageRating/2)}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">{releaseDate?.split('-')[0]}</Text>
                    {/* <Text className="text-xs font-medium text-light-300 uppercase">Movie</Text> */}
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
