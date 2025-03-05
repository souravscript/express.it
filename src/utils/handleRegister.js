// /Users/souravspace/code/express.it/src/utils/handleRegister.js
export const handleRegister = async (email, password, name, setLoading, setError) => {
  setLoading(true);
  const res = await fetch('http://127.0.0.1:8081/api/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
  });

  setLoading(false);

  if (!res.ok) {
      const backendError = await res.json();
      setError(backendError.message); // Set error message
      console.log("Backend registration Error:", backendError.message);
      return { user: null, error: backendError };
  }

  const registerUser = await res.json();
  console.log("User registered Successfully:", registerUser);
  return registerUser;
}