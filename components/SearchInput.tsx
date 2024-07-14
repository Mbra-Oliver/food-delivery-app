import { View, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

const SearchInput = () => {
  return (
    <View className="border border-gray-400 rounded-lg flex items-center  p-3">
      <View className="flex flex-row items-center gap-4">
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="Rechercher"
          className="bg-white flex-1 text-xl"
        />
        <View className="flex flex-row gap-2 items-center">
          <View className="border-r border-gray-400 h-5" />
          <Feather name="filter" size={24} color="gray" />
        </View>
      </View>
    </View>
  );
};

export default SearchInput;
