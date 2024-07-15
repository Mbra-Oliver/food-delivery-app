import { MessageType, showMessage } from "react-native-flash-message";

export function showFlashMessage(type: MessageType, message: string) {
  showMessage({
    message: message,
    type: type,
  });
}
