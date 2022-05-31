import axios from "axios";
import { postFullyfetched, startLoading } from "./slice";

const API_URL = ""

// export function fetchPost(id) {
//   return async function thunk(dispatch, getState) {
//     try {
//       dispatch(startLoading);

//       const [postResponse, commentsResponse] = await Promise.all([
//         axios.get(`${API_URL}/posts/${id}`),
//         axios.get(`${API_URL}/posts/${id}/comments`),
//       ]);

//       dispatch(postFullyfetched({postResponse, commentsResponse}));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
