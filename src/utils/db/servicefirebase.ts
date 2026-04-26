import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

type OAuthUserData = {
  email: string;
  fullname?: string;
  password?: string;
  image?: string;
  role?: string;
  type?: string;
};

type UserRecord = OAuthUserData & {
  id: string;
};

type CallbackResult<T extends OAuthUserData> = {
  status: boolean;
  message: string;
  data?: T & { id?: string };
};

async function getUserByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const data: UserRecord[] = querySnapshot.docs.map((snapshotDoc) => ({
    id: snapshotDoc.id,
    ...(snapshotDoc.data() as OAuthUserData),
  }));

  return data[0] || null;
}

async function upsertOAuthUser<T extends OAuthUserData>(
  userData: T,
  callback: (result: CallbackResult<T>) => void,
  successMessage: string,
) {
  try {
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
      userData.role = existingUser.role;
      await updateDoc(doc(db, "users", existingUser.id), userData);
    } else {
      userData.role = userData.role || "member";
      await addDoc(collection(db, "users"), userData);
    }

    callback({
      status: true,
      message: successMessage,
      data: { ...(userData as T), id: existingUser?.id },
    });
  } catch {
    callback({
      status: false,
      message: `Failed to register user with ${successMessage.replace("User registered and logged in with ", "")}`,
    });
  }
}

export async function retreiveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveProducts(collectionName: string) {
  return retreiveProducts(collectionName);
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retreiveDataByID(collectionName: string, id: string) {
  return retrieveDataByID(collectionName, id);
}

export async function signIn(email: string) {
  return getUserByEmail(email);
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: (result: { status: string; message: string }) => void,
) {
  if (!userData.email) {
    callback({
      status: "error",
      message: "Email is required",
    });
    return;
  }

  if (userData.password.length < 6) {
    callback({
      status: "error",
      message: "Password must be at least 6 characters",
    });
    return;
  }

  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log("Query result:", data);

  if (data.length === 0) {
    // user belum ada, boleh daftar
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({
          status: "success",
          message: "User registered successfully",
        });
      })
      .catch((error) => {
        callback({
          status: "error",
          message: error.message,
        });
      });
  } else {
    callback({
      status: "error",
      message: "Email already exists",
    });
  }
}

export async function signInWithGoogle(
  userData: OAuthUserData,
  callback: (result: CallbackResult<OAuthUserData>) => void,
) {
  await upsertOAuthUser(userData, callback, "User registered and logged in with Google");
}

export async function signInWithGithub(
  userData: OAuthUserData,
  callback: (result: CallbackResult<OAuthUserData>) => void,
) {
  await upsertOAuthUser(userData, callback, "User registered and logged in with GitHub");
}
