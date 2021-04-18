import firebase from "libs/Firebase";
import { useEffect, useState } from "react";

export function useUser() {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);
  return { currentUser, isSignedIn };
}
