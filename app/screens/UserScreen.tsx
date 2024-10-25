import { observer } from "mobx-react-lite"
import { FC, useCallback, useEffect } from "react"
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native"
import { AppStackScreenProps, navigate } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "../models"
import { User } from "@/services/axios"
import styles from "./ScreenStyles"

interface UserScreenProps extends AppStackScreenProps<"User"> {}

export const UserScreen: FC<UserScreenProps> = observer(function UserScreen() {
  const userStyle = styles.userScreenStyles
  const { themed } = useAppTheme()
  const { userStore, postStore } = useStores()
  // Load initial users
  useEffect(() => {
    userStore.setIsFetching()
    userStore.loadUsers(userStore.limit, userStore.skip) // Load the first batch of users
  }, [userStore])

  // Load more users when reaching the end of the list
  const loadMoreUsers = useCallback(() => {
    if (!userStore.isFetching && userStore.hasNextPage) {
      userStore.setIsFetching()
      userStore.updateSkip() // Update skip for the next batch
      userStore.loadUsers(userStore.limit, userStore.skip)
    }
  }, [userStore])

  // Reset post modal and navigate to post screen
  const navigateToPost = (id: number) => {
    postStore.reset()
    postStore.setIsFetching()
    navigate("Post", { userId: id })
  }

  // Render user item
  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <TouchableOpacity
        style={themed(userStyle.$card)}
        onPress={() => navigateToPost(item.id)} // Navigate to PostScreen with userId
      >
        <Image source={{ uri: item.image }} style={themed(userStyle.$userImage)} />
        <View style={themed(userStyle.$textContainer)}>
          <Text style={themed(userStyle.$name)}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={themed(userStyle.$details)}>{`Email: ${item.email}`}</Text>
          <Text
            style={themed(userStyle.$details)}
          >{`Company: ${item.company?.name || "N/A"}`}</Text>
        </View>
      </TouchableOpacity>
    ),
    [themed, userStyle],
  )

  const renderHeader = useCallback(() => {
    return (
      <View style={themed(userStyle.$header)}>
        <Text style={themed(userStyle.$headerTitle)}>Users</Text>
      </View>
    )
  }, [themed, userStyle])

  // Handle rendering for end of list
  const renderFooter = useCallback(() => {
    if (userStore.isFetching) {
      return (
        <View style={themed(userStyle.$footer)}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={themed(userStyle.$loadingText)}>Loading users...</Text>
        </View>
      )
    }
    return null
  }, [userStore.isFetching])

  return (
    <View style={themed(userStyle.$container)}>
      <StatusBar backgroundColor={"#f8f9fa"} barStyle={"dark-content"} />
      <FlatList
        data={userStore.users.slice()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Unique key based on user ID
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.9} // Trigger when 90% of the list is visible
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        initialNumToRender={10} // Optimize initial rendering
        removeClippedSubviews={true} // Optimize performance for off-screen items
      />
    </View>
  )
})

// Export the UserScreen component
export default UserScreen
