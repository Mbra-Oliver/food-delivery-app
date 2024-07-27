import { View, Text, Image, Pressable, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FoodInformationIconText from "@/components/Foods/FoodInformationIconText";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { showFlashMessage } from "@/helpers/alertMessage";
import FoodOrderQuantity from "@/components/Cart/FoodOrderQuantity";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import LoadingAreaIndicator from "@/components/UI/LoadingAreaIndicator";
import { IFood } from "@/interfaces/IFood";
import { getOneFood } from "@/services/foods.services";
import ProfileInlineMenu from "@/components/ProfileInlineMenu";
import * as ImagePicker from "expo-image-picker";
import { updateUserAvatar } from "@/services/user.services";
import * as FileSystem from "expo-file-system";
import mime from "mime";
import { IUser } from "@/interfaces/IUser";
import * as SecureStore from "expo-secure-store";

const index = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await SecureStore.getItemAsync("user");
        if (userData !== null) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return null; // Peut-être afficher un indicateur de chargement ici
  }
  // const pickImage = async (fromCamera = false) => {
  //   try {
  //     if (fromCamera) {
  //       const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //       if (status !== "granted") {
  //         alert("Sorry, we need camera permissions to make this work!");

  //         return;
  //       } else {
  //         let result = await ImagePicker.launchCameraAsync({
  //           mediaTypes: ImagePicker.MediaTypeOptions.Images,

  //           allowsEditing: true,

  //           aspect: [4, 3],

  //           quality: 1,
  //         });

  //         if (!result.canceled) {
  //           const selectedImage = result.assets[0];

  //           const binaryString = await convertBlobToBinaryString(
  //             selectedImage.uri
  //           );

  //           if (binaryString) {
  //             const result = await updateUserAvatar(binaryString);
  //           }
  //         }
  //       }
  //     } else {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();

  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");

  //         return;
  //       } else {
  //         let result = await ImagePicker.launchImageLibraryAsync({
  //           mediaTypes: ImagePicker.MediaTypeOptions.Images,

  //           allowsEditing: true,

  //           aspect: [4, 3],

  //           quality: 1,
  //         });

  //         if (!result.canceled) {
  //           const selectedImage = result.assets[0];

  //           const binaryString = await convertBlobToBinaryString(
  //             selectedImage.uri
  //           );

  //           if (binaryString) {
  //             const result = await updateUserAvatar(binaryString);
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     showFlashMessage("danger", "Erreur lors de la sélection de l'image");
  //   }
  // };

  // const convertBlobToBinaryString = async (uri: any) => {
  //   try {
  //     // Lire le fichier en tant que base64
  //     const fileBase64 = await FileSystem.readAsStringAsync(uri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     return fileBase64;
  //   } catch (error) {
  //     console.error("Erreur lors de la conversion en base64 :", error);
  //   }
  // };

  return (
    <View className="flex-1 bg-[#2a2d32]">
      <StatusBar style="light" />
      <View className=" flex-1 p-4 relative">
        <View className="flex-row justify-between items-center  mt-6">
          <View>
            <Pressable
              onPress={router.back}
              className="w-14 h-14 rounded-full p-1 bg-[#53565a] justify-center items-center"
            >
              <AntDesign name="arrowleft" size={24} color={"white"} />
            </Pressable>
          </View>
        </View>

        <View className="justify-center items-center">
          <Image
            className=" w-[150] h-[150] border-2 border-[#2a2d32] rounded-full"
            source={{
              uri: `https://ui-avatars.com/api/?background=48cd64&color=fff&name=${user.lastname}`,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        className="bg-white rounded-tl-3xl rouded-tr-lg rounded-tr-3xl p-4 gap-4 justify-around"
        style={{ flex: 2 }}
      >
        <View className="flex-row justify-center items-center gap-4">
          <View className="bg-yellow-800 p-4 flex flex-col items-center rounded-md w-[150]">
            <Text className="text-white text-2xl font-bold">0 </Text>
            <Text className="text-white">Pénalité</Text>
          </View>

          <View className="bg-blue-600 p-4 flex flex-col items-center rounded-md w-[150]">
            <Text className="text-white text-2xl font-bold">100 </Text>
            <Text className="text-white">commandes</Text>
          </View>
        </View>

        <ProfileInlineMenu
          background="bg-red-900"
          icon={"user"}
          text="Editer mon profil"
        />
        <ProfileInlineMenu
          icon={"heart"}
          background="#d0d2ee"
          text="Mes favoris"
        />
        <ProfileInlineMenu
          icon={"settings"}
          background="#efcfbf"
          text="Paramètres"
        />

        <View className="border border-gray-100" />

        <ProfileInlineMenu
          icon={"share"}
          background="#cdcdcd"
          text="Inviter un ami"
        />
        <ProfileInlineMenu
          icon={"message-square"}
          background="#cdcdcd"
          text="Aides"
        />
      </View>
    </View>
  );
};

export default index;
