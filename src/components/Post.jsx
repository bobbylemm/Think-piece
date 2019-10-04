import React from "react";

import moment from "moment";
import { fireStore } from "../firebase";

const Post = ({
  title,
  content,
  user,
  createdAt,
  favourites,
  comments,
  id
}) => {
  const postRef = fireStore.doc(`posts/${id}`);
  const handleRemove = async id => {
    await postRef.delete();
  };
  const star = async id => {
    await postRef.update({ favourites: favourites + 1 });
  };
  return (
    <article className="Post">
      <div className="Post--content">
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {favourites}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>
        <div>
          <button className="star" onClick={() => star(id)}>
            Star
          </button>
          <button className="delete" onClick={() => handleRemove(id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

Post.defaultProps = {
  title: "An Incredibly Hot Take",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  user: {
    id: "123",
    displayName: "Bill Murray",
    email: "billmurray@mailinator.com",
    photoURL: "https://www.fillmurray.com/300/300"
  },
  createdAt: new Date(),
  favourites: 0,
  comments: 0
};

export default Post;
