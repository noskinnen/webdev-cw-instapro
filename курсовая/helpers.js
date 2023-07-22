import { getToken, renderApp } from "./index.js";
import { activeUserLike } from "./api.js";

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function getUpdateLikes(arr){
  const token = getToken();
  const likeButtonElement = document.querySelectorAll(".like-button");
  for (const likeButtonElements of likeButtonElement) {
    likeButtonElements.addEventListener("click", () => {
      if (token) {
        likeButtonElements.classList.add("louding-like")
        const index = likeButtonElements.dataset.index;
        return activeUserLike({
          likeId: likeButtonElements.dataset.postId, 
          token: getToken(), activeLike: arr[index].isLiked
        })
        .then((newPost) => {
          arr[index] = newPost;
          renderApp();
        })
        .catch((error) => {
          console.error(error)
        })
      } else {
        console.log("Авторизуйтесь")
      }
    })
  }
}


