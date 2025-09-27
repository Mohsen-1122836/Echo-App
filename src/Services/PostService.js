import axios from "axios";



export async function getAllPostsApi(page = 1, limit = 10) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          sort: "-createdAt",
          page,
          limit,
        },
      }
    );

    return data;
  } catch (err) {
    console.error(err);
    return { posts: [] };
  }
}


export async function getSinglePostApi(id) {

    try {
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers: {
            token: localStorage.getItem('token')
        }
       
    })
    
    return data;


    } catch (error) {
        console.log(error);
    }
}



export async function createPostApi(formData){

   try{
     const {data} = await axios.post('https://linked-posts.routemisr.com/posts',formData, {
        headers: {
            token: localStorage.getItem('token')
        } 
    })
  
    console.log(data);
    
    return data;
    
    
   } catch (error) {
    console.log(error);
   
  }
}

export async function updatePostApi(formData , postId){

   try{
     const {data} = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`,formData, {
        headers: {
            token: localStorage.getItem('token')
        } 
    })
    console.log(data);
    
    return data;
   } catch (error) {
    console.log(error);
  }
}

export async function deletePostApi( postId ){

   try{
     const {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
        headers: {
            token: localStorage.getItem('token')
        } 
    })

    return data;
   } catch (error) {
    console.log(error);
  }
}


export async function getUserPostsApi(userId, token, limit = 10) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts?limit=${limit}`,
      {
        headers: {
          token: token, 
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw error;
  }
}