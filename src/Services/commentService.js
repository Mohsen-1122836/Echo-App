import axios from "axios";

export async function createCommentApi(commentContent , postId){

   try{
     const {data} = await axios.post('https://linked-posts.routemisr.com/comments',{
        content: commentContent,
        post: postId
     }, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
  

    return data;
   } catch (error) {
    console.log(error);
  }
}

export async function DeleteCommentApi(commentId){

   try{
     const {data} = await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })


    return data;
   } catch (error) {
    console.log(error);
  }
} 

export async function getUserCommentsApi(postId){

   try{
     const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    
    return data;
   } catch (error) {
    console.log(error);
  }
        }
  



export async function updateCommentApi(commentId, content) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      { content },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating comment:", error);
    return { message: "Failed to update comment" };
  }
}