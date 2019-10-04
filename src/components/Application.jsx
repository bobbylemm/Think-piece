import React, { useState, useEffect, useRef } from "react";
import { fireStore, auth } from "../firebase/index";
// import axios from "axios";

import Posts from "./Posts";
import { collectIdsAndNames } from "../utilities/commonOnes";
import Authentication from "./Authentication";

const Application = () => {
  const [posts, setPosts] = useState({ posts: [] });
  const [user, setUser] = useState("");
  let unsubscribeFromFirestore = useRef(null);
  let unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        // const result = await axios.get(
        //   "http://localhost:5000/firebasics-ae548/us-central1/api/posts"
        // );
        // console.log(result);
        unsubscribeFromFirestore.current = await fireStore
          .collection("posts")
          .onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndNames);
            setPosts({ posts });
          });

        unsubscribeFromAuth.current = await auth.onAuthStateChanged(user => {
          setUser(user);
        });
      } catch (error) {
        console.log(error);
      }
    })();
    unsubscribeFromAuth = () => unsubscribeFromAuth.current;
    unsubscribeFromFirestore = () => unsubscribeFromFirestore.current;
    return () => {
      unsubscribeFromAuth();
      unsubscribeFromAuth();
    };
  }, []);
  console.log(posts.posts);
  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Authentication user={user} />
      <Posts posts={posts.posts} />
    </main>
  );
};

export default Application;
