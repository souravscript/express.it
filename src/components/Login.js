import React,{useState} from 'react'

const Login = () => {
  const [accountExist,setAccountExist]=useState(false)
  return (
    <div className='login'>
      <h1 className='login-title'>TweetX</h1>
      {accountExist?<button className='create-account'
      onClick={()=>setAccountExist(!accountExist)}
      >Create Account</button>
      :<button className='login-main'
      onClick={()=>setAccountExist(!accountExist)}
      >Login</button>}
      <div className='login-container'>
        <div className='form-container'>
          {accountExist?<h3 className='form-title'>Login</h3>
          :<h3 className='form-title'>Create Account</h3>}
          <form className='login-form'>
            {!accountExist && <input
            placeholder='Name'
            type='text'
            name='name'

            />}
            <input
            placeholder='Email'
            type='email'
            name='email'
            />
            <input
            placeholder='Password'
            type='password'
            name='password'
            />
            {!accountExist && <input
            placeholder='Confirm Password'
            type='password'
            name='confirm-password'

            />}
            <span className='submit'>
              {accountExist?<span className='forgot-password'>Forgot Password?</span>
              :<span className='have-an-account'
              onClick={()=>setAccountExist(!accountExist)}
              > Already have an account?</span>}
              {accountExist?<button type='submit' className='login-btn'>Login</button>
              :<button type='submit' className='signup-btn'>Signup</button>}
            </span>
          </form>
        </div>
        <div className='img-container'>
          <img
            src='https://www.deejos.com/images/pwd/pwd.png'
            alt='Login page Image '
          />
        </div>
      </div>
    </div>
  )
}

export default Login
