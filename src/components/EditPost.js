import React from "react";
import PostForm from "./PostForm";

const EditPost = ({ user }) => {
  return <PostForm isEdit={true} user={user} />;
};

export default EditPost;
