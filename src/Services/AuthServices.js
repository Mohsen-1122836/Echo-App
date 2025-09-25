import axios from "axios";





export async function getUserDataApi() {
  
  try {

    const { data } = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }
    ); 

    return data;
  }  catch (err) {
    console.log(err);
  }
}


export async function sendSignUpData(userData) {
  try {
    const { data } = await axios.post(
      `https://linked-posts.routemisr.com/users/signup`,
      userData
    );
    
    return data;
  } catch (err) {
    console.log(err.response.data.error);
    return { message: err.response.data.error };
  }
}


export async function loginUser(userData) {
  try {
    const { data } = await axios.post(
      `https://linked-posts.routemisr.com/users/signin`,
      userData
    );
   
    return data; 
  } catch (err) {
    console.log("incorrect email or password");
    return { message: "incorrect email or password" };
  }
}
