import * as firebase from "firebase";
import config from "../../firebase.json";
import "firebase/firestore";
import { Alert } from "react-native";

const app = firebase.initializeApp(config);

const Auth = app.auth();

// Login 기능
export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

// Image upload 기능 - 스토리지에 이미지 업로드, url 반환
const uploadImage = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: "image/png" });

  blob.close();
  return await snapshot.ref.getDownloadURL();
};

// Signup 기능
export const signup = async ({ email, password, name, photoUrl }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });
  return user;
};

// Logout 기능
export const logout = async () => {
  return await Auth.signOut();
};

// 현재 접속한 사용자 정보 반환
export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

// 사용자의 사진 수정
export const updateUserPhoto = async (photoUrl) => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({ photoURL: storageUrl });
  return { name: user.displayName, email: user.email, photoUrl: user.photoURL };
};
