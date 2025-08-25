# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# React Native Payment Screen Demo

This project is a small demo app built with **React Native (Expo)** as part of a take home assignment.  
The goal is to show how the same Payment screen can be reused for both **Domestic** and **International** transfers.

---

## Features

- Single `PaymentScreen` reused for both flows
- Radio button to switch between **Domestic** and **International**
- Form validation handled with `react-hook-form` + `yup`
- Different validation rules depending on the transfer type  
  - Domestic: recipient name, account number, amount  
  - International: same as above + IBAN, SWIFT code
- When switching tab, the form resets and auto focuses back on **Recipient Name**
- "Send Payment" button is fixed at the bottom
- All data is mocked (no API calls)

---

## Tech stack

- React Native (Expo)
- react-hook-form
- yup

---

## Setup

```bash
git clone https://github.com/RNSonaliDev/PaymentScreen.git
cd PaymentGatway
npm install