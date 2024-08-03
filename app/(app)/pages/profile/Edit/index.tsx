import { View, Text, Image, Pressable, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FoodInformationIconText from "@/components/Foods/FoodInformationIconText";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { IUser } from "@/interfaces/IUser";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import * as yup from "yup";
import FormButton from "@/components/Forms/FormButton";
import TextInputIcon from "@/components/Forms/InputIcon";
import { showFlashMessage } from "@/helpers/alertMessage";
import { updateProfil } from "@/services/user.services";

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

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("L'email est invalide")
      .required("L'email est requis"),
    password: yup
      .string()
      .min(6, "Le mot de passe doit faire au moins 6 caractères")
      .required("Le mot de passe est requis"),
    lastname: yup
      .string()
      .min(3, "Le nom doit faire au moins 3 caractères")
      .required("Le nom est requis"),
  });

  const handleSubmit = async (datas: any) => {
    try {
      const dataSend = {
        email: datas.email,
        password: datas.password,
        lastname: datas.lastname,
        firstname: datas.firstname,
      };

      const result = await updateProfil(dataSend);

      if (result.status_code === 200) {
        showFlashMessage("success", result.status_message);
      } else {
        showFlashMessage("danger", result.status_message);
      }
    } catch (error: any) {
      console.log(error);
      showFlashMessage("danger", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#2a2d32]">
      <StatusBar style="light" />
      <View className=" flex-1 p-4 relative ">
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
        className="bg-white h-full rounded-tl-3xl rouded-tr-lg rounded-tr-3xl p-6 gap-4 justify-around"
        style={{ flex: 2 }}
      >
        <Formik
          initialValues={{
            email: user.email,
            password: "",
            lastname: user.lastname,
            firstname: user.firstname,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
          className="mt-5 gap-4 w-full"
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isSubmitting,
            isValid,
          }) => (
            <View className="w-full gap-4">
              <TextInputIcon
                iconName={"user"}
                placeholder="Nom utilisateur"
                label="Nom d'utilisateur"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                name="lastname"
              />

              <TextInputIcon
                iconName={"user"}
                placeholder="Prenom utilisateur"
                label="Prenom d'utilisateur"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname ? values.firstname : ""}
                name="firstname"
              />
              {errors.firstname && touched.firstname && (
                <Text className="text-red-900 m-2  w-full">
                  {errors.firstname}
                </Text>
              )}

              <TextInputIcon
                iconName={"mail"}
                placeholder="Email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                disabledField
              />
              {errors.email && touched.email && (
                <Text className="text-red-900 m-2  w-full">{errors.email}</Text>
              )}

              <TextInputIcon
                iconName={"key"}
                placeholder="password"
                label="Mot de passe"
                secure
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
              />

              {errors.password && touched.password && (
                <Text className="text-red-900 m-2">{errors.password}</Text>
              )}

              <FormButton
                label={"Mettre à jour mon compte"}
                disabled={isSubmitting || !isValid}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default index;
