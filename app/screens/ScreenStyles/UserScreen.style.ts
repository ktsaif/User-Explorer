import { ThemedStyle } from "@/theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: "#f8f9fa",
})

// Themed styles for the user card, name, and details
const $card: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "#ffffff",
  borderRadius: 8,
  padding: 16,
  marginVertical: 8,
  marginHorizontal: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
})

const $name: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color: colors.text, // Use themed color
})

const $details: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 14,
})

const $userImage: ThemedStyle<ImageStyle> = () => ({
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 15,
})

const $textContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $footer: ThemedStyle<ViewStyle> = () => ({
  paddingVertical: 15,
  alignItems: "center",
})

const $loadingText: ThemedStyle<TextStyle> = () => ({
  marginTop: 5,
  fontSize: 14,
  color: "#666",
})

const $header: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
  backgroundColor: "#ffffff",
  elevation: 4,
})

const $headerTitle: ThemedStyle<TextStyle> = () => ({
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
})

export default {
  $container,
  $card,
  $name,
  $details,
  $userImage,
  $textContainer,
  $footer,
  $loadingText,
  $header,
  $headerTitle,
}
