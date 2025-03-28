import { View, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { router } from "expo-router";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleClick = () => {
    router.navigate({
      pathname: "/explore",
      params: { searchParam: searchValue },
    });
  };

  return (
    <View className="border border-gray-400 rounded-lg flex items-center  p-3">
      <View className="flex flex-row items-center gap-4">
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="Rechercher"
          className="bg-white flex-1 text-xl"
          keyboardType="web-search"
          value={searchValue}
          onChangeText={(e) => setSearchValue(e)}
          onSubmitEditing={handleClick}
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
