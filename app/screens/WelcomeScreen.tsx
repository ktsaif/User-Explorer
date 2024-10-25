import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle, View, ViewStyle, Text } from "react-native"
import { Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed">
      <View style={themed($topContainer)}>
        <Text style={themed($textStyle)}>Welcome Screen</Text>
      </View>
    </Screen>
  )
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "100%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $textStyle: ThemedStyle<TextStyle> = ({}) => ({
  color: "green",
  fontSize: 20,
  fontWeight: "bold",
})
