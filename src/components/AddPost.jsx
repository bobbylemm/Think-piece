import React, { useState } from "react";
import { fireStore } from "../firebase";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleChange = event => {
    const { name, value } = event.target;
    if (name === "title") {
      return setTitle(value);
    }
    return setContent(value);
  };

  const handleCreate = async post => {
    await fireStore.collection("posts").add(post);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const post = {
      title,
      content,
      user: {
        uid: "1111",
        displayName: "Steve Kinney",
        email: "steve@mailinator.com",
        photoURL: "http://placekitten.com/g/200/200"
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    };

    handleCreate(post);
    setContent("");
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={content}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );
};

export default AddPost;
