// /Users/souravspace/code/express.it/src/utils/handleLogin.js
export const handleLogin = async (email, password, setLoading, setError) => {
  setLoading(true);
  const res = await fetch('http://127.0.0.1:8081/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  setLoading(false);

  if (!res.ok) {
      const backendError = await res.json();
      setError(backendError.message); // Set error message
      console.log("Backend login Error:", backendError.message);
      return { user: null, error: backendError };
  }

  const loginUser = await res.json();
  console.log("User logged in Successfully:", loginUser);
  return loginUser;
}