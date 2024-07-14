import { showMessage } from "react-native-flash-message";

export function showFlashMessage(type, message) {
  showMessage({
    message: "Bon retour",
    type: "success",
  });
}
