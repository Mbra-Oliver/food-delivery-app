import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { APP_COLORS } from "@/constants/Colors";
import TextInputIcon from "@/components/Forms/InputIcon";
import FormButton from "@/components/Forms/FormButton";
import LoginLogo from "@/assets/svg/login.svg";
import { router } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "@/helpers/providers/AppProviders";

import { showFlashMessage } from "@/helpers/alertMessage";
import { logUser } from "@/services/user.services";
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email est invalide")
    .required("L'email est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit faire au moins 6 caractères")
    .required("Le mot de passe est requis"),
});
const index = () => {
  const { handleLogin } = useContext(AuthContext);

  const [emailError, setErrorEmail] = useState<string>();
  const [location, setLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (datas: any) => {
    try {
      const dataSend = {
        email: datas.email,
        password: datas.password,
      };

      const result = await logUser(dataSend);

      if (!result) {
        setErrorEmail("Information de compte non reconnu");
      }
      const resultData = result.data;

      if (result.status_code === 200) {
        handleLogin(resultData.token, JSON.stringify(resultData.user));
        router.replace({
          pathname: "/(tabs)",
        });

        //Afficher le message

        showFlashMessage("success", "Bon retour");
      } else {
        setErrorEmail(result.message.email);
      }
    } catch (error) {
      setErrorEmail(
        "une erreur est survenue lors de la connexion a votre compte"
      );
    }
  };

  return (
    <SafeAreaView className="p-5 flex-1  justify-center items-center ">
      <LoginLogo width={200} height={120} />
      <View className="mt-10 mb-10">
        <Text className=" text-3xl font-['Lato'] font-semiBold">
          Connecter vous
        </Text>
      </View>

      {emailError && (
        <View className="mb-4">
          <Text className="text-red-900 w-full text-center font-['Lato']">
            {emailError}
          </Text>
        </View>
      )}

      <Formik
        initialValues={{ email: "lemmsyoliver@gmail.com", password: "azerty" }}
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

            <View className="justify-end items-end">
              <Text className="text-[#48cd64] font-['Lato'] text-lg">
                Mot de passe oublié ?
              </Text>
            </View>

            <View className="border-t border-gray-100 mt-6 mb-6" />
            <FormButton
              label={"Me connecter"}
              disabled={isSubmitting || !isValid}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />

            <View className="flex-row justify-center mt-10  gap-2">
              <Text className="font-['Lato'] text-lg">Je souhaite</Text>
              <Pressable onPress={() => router.replace("/auth/register")}>
                <Text className="text-[#48cd64] text-lg font-['Lato']">
                  creer mon compte
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
