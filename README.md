# Star Wars mobile project

# Presentation

This is a small react native app developed with Typescript that displays information about the Star Wars movies.

I've used GraphQL to fetch and store some data and Apollo Client to manage it.
I've also used react-native-reanimated for a litlle animation:)

This app is very simple to use, you can check out the info of the star wars movies and their characters.
You can also "like" a character and he/she will appear on the favourite characters tab.

This was a very fun project to work on, combining some powerful tools!

## Running the project

- Clone this project
```
git clone https://github.com/Harry-Chalcraft/starwWars-mobile-project.git
```

- Launch ``` yarn ``` or ``` npm install ``` command in a terminal opened in the project folder.
```
yarn
```
> This command will look into the *package.json* file and install all the dependencies listed here.

- Install react-native-cli globally on your computer if you don't have it
```
yarn global add react-native-cli
```

### Android steps

- Launch a virtual android device [(through *Android Studio* for instance)](https://developer.android.com/studio/run/managing-avds.html#viewing)

> If you have never installed any android virtual device, [follow those instructions](https://developer.android.com/studio/run/managing-avds.html#createavd)

- Then, run the project in executing on your project folder:

```
yarn android
```

### iOS steps

- install pods 
``` 
cd ios && pod install
```

- Then, run the project in executing on your project folder:

```
yarn ios
```
That's it!

### Screenshots

![Capture d’écran 2023-01-24 à 16 28 08](https://user-images.githubusercontent.com/46561387/214335945-7364de13-62a2-4b7e-83cc-5a631a408524.png) 
![Capture d’écran 2023-01-24 à 16 31 32](https://user-images.githubusercontent.com/46561387/214336765-60858361-ebf8-4507-9faf-4765f8a06db4.png)
![Capture d’écran 2023-01-24 à 16 32 06](https://user-images.githubusercontent.com/46561387/214336902-13731f65-8405-48b7-86de-b55f47f22224.png)
![Capture d’écran 2023-01-24 à 16 33 02](https://user-images.githubusercontent.com/46561387/214337116-e0b36663-b97e-4a79-9bc4-c057d4a01ed7.png)


