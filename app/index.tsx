import { Redirect } from "expo-router";
import "react-native-reanimated";
import "expo-router/entry";

export default function Index() {
  return <Redirect href="/(auth)/sign-up" />;
}