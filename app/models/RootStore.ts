import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DefaultUserModel, UserModel } from "./UserModel"
import { DefaultPostModel, PostModel } from "./PostModel"

/**
 * RootStore model that consolidates different parts of the state tree.
 *
 * This can include other stores (like user and post stores) as well as
 * any root-level properties or computed values that need to be globally accessible.
 */
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserModel, DefaultUserModel), // User data and actions
  postStore: types.optional(PostModel, DefaultPostModel), // Post data and actions
  // Add other stores or properties here as your app grows
})

/**
 * Represents an instance of the RootStore model.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * Represents a snapshot (serializable state) of the RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
