export const handleRegister=async (email,password,name)=>{
    const res=await fetch('http://127.0.0.1:8081/api/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password,name})
      })
      if (!res.ok) {
        const backendError = await res.json();
        console.log("Backend login Error:", backendError.message);
        return { user: null, error: backendError };
      }

      const registerUser = await res.json();

      console.log("User loggedin Successfully:", registerUser);
      return loginUser;
}