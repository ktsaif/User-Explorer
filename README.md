# User Explorer

Welcome to **User Explorer**, a React Native application built with Expo, designed to manage and explore user data seamlessly. This application utilizes MobX for state management, Axios for API requests, and loads sample data from [DummyJSON](https://dummyjson.com/users).

## Technology Stack

- **Frontend:**
  - Framework: React Native with Expo
  - Boilerplate: Ignite CLI (Open Source at [Infinite Red](https://infinite.red))
  - Language: TypeScript
  - State Management: MobX-State-Tree
  - Navigation: React Navigation
  - Data Fetching: Axios

- **Development Tools:**
  - Code Editor: Visual Studio Code
  - Version Control: Git
  - Build Tools: Expo CLI

## Features

### User List Screen

- **Objective:** Display a list of users fetched from the DummyJson API.
- **Details:**
  - Fetch the list of users from `https://dummyjson.com/users`.
  - Display each user’s name along with brief details such as email and company in a card or list item format.
  - Use `FlatList` for optimal rendering performance, ensuring smooth scrolling and minimal re-renders.
  - Implement infinite scrolling to load more users as the user scrolls down the list.
  - Include a loading indicator while fetching more users during scrolling.

### User Posts Screen

- **Objective:** Display the list of posts for a selected user.
- **Details:**
  - When a user is clicked on the User List Screen, navigate to a new screen displaying the list of posts by that user.
  - Fetch posts from `https://dummyjson.com/users/{userId}/posts`.
  - Display the posts in a scrollable view, showcasing the title and body of each post.
  - Implement infinite scrolling to load more posts as the user scrolls down the list.
  - Include a loading indicator while fetching more posts during scrolling.


## Directory Structure

Here's a brief overview of the project structure:

User-Explorer
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   └── app.tsx
├── assets
│   ├── icons
│   └── images
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── README.md
├── android
├── ignite
├── index.js
├── ios
├── .env
└── package.json

## Installation

To get started with the User Explorer app, follow these steps:

1. **Clone the repository**:
   
  git clone https://github.com/ktsaif/User-Explorer.git

2. **Navigate to the project directory**:

  cd User-Explorer

3. **Install dependencies using pnpm**:

  pnpm install

4. **Start the Expo development server**:

  pnpm start

5. **Run the app**:

  Press a to run android or,
  pnpm run android

## Usage

- Open the app in your preferred emulator or on a physical device using the Expo Go app.
- The User List Screen will display a list of users. Scroll down to fetch more users.
- Tap on any user to navigate to the User Posts Screen, where you can view that user's posts with infinite scrolling.

## APK Download

You can download the latest APK version of the User Explorer app from the following link: 

[Download APK](https://drive.google.com/file/d/1juhKU5JJM2kKfz8j4EGfIAdTapZrtP4h/view?usp=sharing).

## Documentation

For detailed documentation, please refer to the following link:

[Documentation Link](https://github.com/ktsaif/User-Explorer/blob/main/README.md)
