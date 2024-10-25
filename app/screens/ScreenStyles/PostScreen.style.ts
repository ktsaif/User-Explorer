import { ThemedStyle } from "@/theme"
import { TextStyle, ViewStyle } from "react-native"

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: "#f8f9fa",
})

// Styles for each post card, title, and body
const $postCard: ThemedStyle<ViewStyle> = () => ({
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

const $postTitle: ThemedStyle<TextStyle> = () => ({
  fontSize: 18,
  fontWeight: "bold",
  color: "#333",
  marginBottom: 8,
})

const $postBody: ThemedStyle<TextStyle> = () => ({
  fontSize: 14,
  color: "#666",
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

const $emptyContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.md,
})

const $emptyText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  color: colors.textDim,
  textAlign: "center",
})

const $header: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
  backgroundColor: "#ffffff",
  elevation: 4,
})

const $backButton: ThemedStyle<ViewStyle> = () => ({
  marginRight: 16,
})

const $headerTitle: ThemedStyle<TextStyle> = () => ({
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
})

export default {
  $container,
  $postCard,
  $postTitle,
  $postBody,
  $footer,
  $loadingText,
  $emptyContainer,
  $emptyText,
  $header,
  $backButton,
  $headerTitle,
}
