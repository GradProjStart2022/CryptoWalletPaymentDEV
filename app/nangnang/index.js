// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const { Platform } = require("react-native");

if (Platform.OS !== "web") {
require("./global");
}

const { registerRootComponent, scheme } = require("expo");
const { default: App } = require("./App");


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);