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
import FormButton from "@/components/Forms/FormButton";

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
  //     const permission = fromCamera
  //       ? await ImagePicker.requestCameraPermissionsAsync()
  //       : await ImagePicker.requestMediaLibraryPermissionsAsync();

  //     const { status } = permission;

  //     if (status !== "granted") {
  //       const message = fromCamera
  //         ? "Sorry, we need camera permissions to make this work!"
  //         : "Sorry, we need camera roll permissions to make this work!";

  //       alert(message);

  //       return;
  //     }

  //     const imagePickerOptions = {
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,

  //       allowsEditing: true,

  //       aspect: [4, 3] as [number, number],

  //       quality: 1,
  //     };

  //     const result = fromCamera
  //       ? await ImagePicker.launchCameraAsync(imagePickerOptions)
  //       : await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

  //     if (!result.canceled) {
  //       const selectedImage = result.assets[0];

  //       try {
  //         const response = await updateUserAvatar(selectedImage.uri);
  //       } catch (error) {
  //         console.log(error);

  //         showFlashMessage(
  //           "danger",
  //           "Erreur lors de la mise à jour de l'avatar"
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showFlashMessage("danger", "Erreur lors de la sélection de l'image");
  //   }
  // };

  const goProfileEdit = () => {
    router.navigate("/pages/profile/Edit");
  };

  const onLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("user");
      showFlashMessage("danger", "Vous vous êtes déconnecté de votre compte");
      router.replace("/auth/login");
    } catch (error) {
      showFlashMessage(
        "danger",
        "Une erreur est survenue lors de la déconnexion"
      );
    }
  };

  return (
    <View className="flex-1 bg-[#2a2d32]">
      <StatusBar style="light" />
      <View className=" flex-1 p-4 relative">
        <View className="flex-row justify-between items-center  mt-6">
          {/* <View>
            <Pressable
              onPress={router.back}
              className="w-14 h-14 rounded-full p-1 bg-[#53565a] justify-center items-center"
            >
              <AntDesign name="arrowleft" size={24} color={"white"} />
            </Pressable>
          </View> */}

          {/* <View>
            <Pressable
              onPress={() => pickImage(true)}
              className="w-14 h-14 rounded-full p-1 bg-[#53565a] justify-center items-center"
            >
              <AntDesign name="camera" size={24} color={"white"} />
            </Pressable>
          </View> */}
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
          icon={"user"}
          text="Editer mon profil"
          onPress={goProfileEdit}
        />
        <ProfileInlineMenu icon={"heart"} text="Mes favoris" />
        <ProfileInlineMenu icon={"settings"} text="Paramètres" />

        <View className="border border-gray-100" />

        <ProfileInlineMenu icon={"share"} text="Inviter un ami" />
        <ProfileInlineMenu icon={"message-square"} text="Aides" />

        <FormButton
          label="Me déconnecter"
          onSubmit={onLogout}
          isSubmitting={false}
          backgroundColor="bg-red-800"
        />
      </View>
    </View>
  );
};

export default index;
