import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Interceptors
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }

  return req;
});

//authentication
export const logIN = (authData) => API.post("/user/login", authData);
export const signUP = (authData) => API.post("/user/signup", authData);

//questions
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

//answers
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });

export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

//user
export const fetchAllUsers = () => API.get("/User/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
export const followUser = (userId) => API.put(`/User/follow/${userId}`);
export const unfollowUser = (userId) => API.put(`/User/unfollow/${userId}`);

//posts
export const sharePost = (postData) => API.post("/post", postData);
export const getAllPosts = () => API.get("/post/");
export const likePost = (postId) => API.put(`/post/like/${postId}`);
export const dislikePost = (postId) => API.put(`/post/dislike/${postId}`);
export const deletePost = (postId) => API.delete(`/post/${postId}`);

export const subscriptionApi = (subscribeData) =>
  API.post("subscriptions/subscribed", subscribeData);
export const subscriptionCheck = (authData) =>
  API.post("subscriptions/subscriptionCheck", authData);

export const commentPost = (postId, commentText) =>
  API.put(`/post/comment/${postId}`, { comment: commentText });
export const createOrderApi = (orderData) =>
  API.post("/orderId/createOrder", orderData);
export const sendOTP = (authData) => API.post("/chat/otp", authData);
