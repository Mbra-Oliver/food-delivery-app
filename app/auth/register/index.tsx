import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { APP_COLORS } from "@/constants/Colors";
import TextInputIcon from "@/components/Forms/InputIcon";
import FormButton from "@/components/Forms/FormButton";

import { router } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { saveUser } from "@/services/user.services";
import { showMessage } from "react-native-flash-message";
import { AuthContext } from "@/helpers/providers/AppProviders";

const validationSchema = yup.object().shape({
  lastname: yup
    .string()
    .required("le nom est requis")

    .required("L'email est requis"),
  email: yup
    .string()
    .email("L'email est invalide")
    .required("L'email est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit faire au moins 6 caractères")
    .required("Le mot de passe est requis"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), undefined],
      "Les mots de passe ne correspondent pas"
    )
    .required("La confirmation du mot de passe est requise"),
});
const index = () => {
  const { handleLogin } = useContext(AuthContext);

  const [emailError, setErrorEmail] = useState();
  const [location, setLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSubmit = async (datas: any) => {
    try {
      const dataSend = {
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        lastname: datas.lastname,
        email: datas.email,
        password: datas.password,
      };

      const result = await saveUser(dataSend);
      const resultData = result.data;
      if (result.status_code === 201) {
        handleLogin(resultData.token, JSON.stringify(resultData.user));
        router.replace({
          pathname: "/(tabs)",
        });

        showMessage({
          message: "Bienvenue a vous",
          description: "Votre compte à été créer avec succès !",
          type: "success",
        });
      } else {
        setErrorEmail(result.message.email);
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView className="flex-1 p-5 justify-center items-center ">
      <View className="mt-10 mb-10">
        <Text className=" text-3xl font-['Lato'] font-semiBold">
          Creer un compte
        </Text>
      </View>

      <View>
        <Text className="text-red-900 w-full text-2xl font-['Lato']">
          {emailError}
        </Text>
      </View>
      <Formik
        initialValues={{
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
        className="mt-5 w-full"
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
              placeholder="Prénom"
              label="Prénom"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
              name="lastname"
            />

            {errors.lastname && touched.lastname && (
              <Text className="text-red-900 m-2  w-full">
                {errors.lastname}
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

            <TextInputIcon
              iconName={"key"}
              placeholder="Confirmer le mot de passe"
              label="Confirmer le mot de passe"
              secure
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              name="confirmPassword"
            />

            {errors.confirmPassword && touched.confirmPassword && (
              <Text className="text-red-900 m-2">{errors.confirmPassword}</Text>
            )}

            <FormButton
              label={"Creer mon compte"}
              disabled={isSubmitting || !isValid}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />

            <View className="flex-row justify-center mt-10  gap-2">
              <Text className="font-['Lato'] text-lg">Je souhaite</Text>
              <Pressable onPress={() => router.replace("/auth/login")}>
                <Text className="text-[#48cd64] text-lg font-['Lato']">
                  me connecter
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default index;
