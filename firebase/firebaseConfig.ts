import { getApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";

const app = getApp();
const auth = getAuth(app);

const fb = {
  app,
  auth,
};

export default fb;
