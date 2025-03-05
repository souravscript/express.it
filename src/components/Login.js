import React, { useState } from 'react';
import * as yup from 'yup';
import { handleLogin } from '../utils/handleLogin';
import { handleRegister } from '../utils/handleRegister';

const Login = () => {
  const [accountExist, setAccountExist] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const [errors, setErrors] = useState({});
  const toggleAccountExist = () => setAccountExist(!accountExist);

  // Yup schema for validation
  const formSchema = yup.object().shape({
    name: accountExist
      ? yup.string()
      : yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    confirmPassword: accountExist
      ? yup.string()
      : yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await formSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors

      const {name,email,password}=formData;

      if (accountExist) {

        const loginUser=handleLogin(email,password)
        if(!loginUser){
          console.log("user not available")
        }
        const userSessionData=JSON.stringify(loginUser)
        localStorage.setItem('session',userSessionData)
        window.location.href = '/';
      } else {
        const registeredUser=handleRegister(email,password,name)
        if(!registeredUser){
          console.log("user not available")
        }
        setAccountExist(true)
      }
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="login">
      <h1 className="login-title">express.it</h1>

      <button
        className={accountExist ? 'create-account' : 'login-main'}
        onClick={toggleAccountExist}
      >
        {accountExist ? 'Create Account' : 'Login'}
      </button>

      <div className="login-container">
        <div className="form-container">
          <h3 className="form-title">
            {accountExist ? 'Login' : 'Create Account'}
          </h3>

          <form className="login-form" onSubmit={handleSubmit}>
            {!accountExist && (
              <>
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </>
            )}

            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}

            {!accountExist && (
              <>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </>
            )}

            <div className="submit">
              {accountExist ? (
                <span className="forgot-password">Forgot Password?</span>
              ) : (
                <span
                  className="have-an-account"
                  onClick={toggleAccountExist}
                >
                  Already have an account?
                </span>
              )}

              <button
                type="submit"
                className={accountExist ? 'login-btn' : 'signup-btn'}
              >
                {accountExist ? 'Login' : 'Signup'}
              </button>
            </div>
          </form>
        </div>

        <div className="img-container">
          <img
            src="https://www.deejos.com/images/pwd/pwd.png"
            alt="Login page visual"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
