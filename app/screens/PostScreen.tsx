import { observer } from "mobx-react-lite"
import { FC, useCallback, useEffect } from "react"
import { View, Text, FlatList, ActivityIndicator, StatusBar, TouchableOpacity } from "react-native"
import { AppStackScreenProps, goBack } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "../models"
import { Post } from "@/services/axios"
import styles from "./ScreenStyles"
import { Icon } from "@/components"

interface PostScreenProps extends AppStackScreenProps<"Post"> {}

export const PostScreen: FC<PostScreenProps> = observer(function PostScreen({ route }) {
  const postStyle = styles.postScreenStyles
  const { themed } = useAppTheme()
  const { postStore } = useStores()
  const userId = route?.params?.userId // Get userId from navigation params

  // Load initial posts for the selected user
  useEffect(() => {
    const loadPosts = async () => {
      try {
        await postStore.loadPosts(userId, postStore.limit, postStore.skip) // Load first batch
      } catch (error) {
        console.error("Failed to load posts", error) // Handle error logging
      }
    }
    loadPosts()
  }, [postStore, userId])

  // Load more posts when reaching the end of the list
  const loadMorePosts = useCallback(() => {
    if (!postStore.isFetching && postStore.hasNextPage) {
      postStore.setIsFetching()
      postStore.updateSkip() // Update skip for next batch
      postStore.loadPosts(userId, postStore.limit, postStore.skip)
    }
  }, [postStore, userId])

  // Render post item
  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <View style={themed(postStyle.$postCard)}>
        <Text style={themed(postStyle.$postTitle)}>{item.title}</Text>
        <Text style={themed(postStyle.$postBody)}>{item.body}</Text>
      </View>
    ),
    [themed, postStyle],
  )

  const renderHeader = useCallback(
    () => (
      <View style={themed(postStyle.$header)}>
        <TouchableOpacity onPress={() => goBack()} style={themed(postStyle.$backButton)}>
          <Icon icon="back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={themed(postStyle.$headerTitle)}>User Posts</Text>
      </View>
    ),
    [themed, postStyle],
  )

  // Handle rendering for end of list (Footer)
  const renderFooter = useCallback(() => {
    if (postStore.isFetching) {
      return (
        <View style={themed(postStyle.$footer)}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={themed(postStyle.$loadingText)}>Loading posts...</Text>
        </View>
      )
    }
    return null
  }, [postStore.isFetching])

  // Empty list handling
  const renderEmptyComponent = useCallback(() => {
    if (!postStore.isFetching && postStore.posts.length === 0) {
      return (
        <View style={themed(postStyle.$emptyContainer)}>
          <Text style={themed(postStyle.$emptyText)}>No posts available for this user.</Text>
        </View>
      )
    }
    return null
  }, [postStore.isFetching])

  return (
    <View style={themed(postStyle.$container)}>
      <StatusBar backgroundColor={"#f8f9fa"} barStyle={"dark-content"} />
      <FlatList
        data={postStore.posts.slice()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Unique key based on post ID
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        initialNumToRender={10} // Optimize initial rendering
        removeClippedSubviews={true} // Optimize performance for off-screen items
        extraData={postStore.posts} // Ensure FlatList updates when posts change
      />
    </View>
  )
})

export default PostScreen
