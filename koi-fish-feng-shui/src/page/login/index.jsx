import './index.scss'

const Login = () => {
    return (
        <div className="w-full flex min-h-screen">
            <div className="login-image-container">
                <img src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740183/live-koi-fish-4000-x-6000-w598f7g3aiuemo2i_wsbfn5.jpg"
                    alt="Placeholder Image"
                    className="image-login" />

                <div className=" relative p-4">
                    <div className="login-image-content" />
                    <h1 className="text-4xl font-bold mb-4 text-white text-left">Thanks for visit</h1>
                    <p className="text-xl  text-white text-left">
                        Welcome to our Feng Shui Koi Pond Consultation site. We create harmonious koi ponds that enhance beauty, prosperity, and positive energy in your home or business.
                    </p>
                </div>
            </div>

            <div className="lg:p-36 md:p-52 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-12">Sign in</h1>

                <button type="submit" className="bg-white hover:bg-gray-100 text-black font-semibold rounded-3xl w-full flex border border-black justify-center py-3 mb-11">
                    <svg width="24" height="24" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18" />
                        <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17" />
                        <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z" />
                        <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.8 4.8 0 0 1 4.48-3.3" />
                    </svg>
                    <h2 className="ml-2">Continue with Google</h2>
                </button>



                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase mb-11">
                        <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                </div>
                <form action="#" method="POST">
                    {/* User name input */}
                    <div className="mb-11 ">
                        <label htmlFor="username" className="block text-gray-600 pb-[5px]">User name or email adress</label>
                        <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                    </div>
                    {/* <!-- Password Input --> */}
                    <div className="mb-1">
                        <label htmlFor="password" className="block text-gray-800 pb-[5px]">Your password</label>
                        <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                    </div>
                    {/* <!-- Remember Me Checkbox --> */}
                    <div className="mb-14 flex items-center justify-between">
                        <div>
                            <label htmlFor="remember" className="text-black ml-2">Don't have an account?</label>
                            <a href="#" className="underline text-black hover:text-black ml-2">Sign up</a>
                        </div>
                        <a href="#" className="underline text-black hover:text-black ">Forgot Password?</a>

                    </div>

                    {/* <!-- Login Button --> */}
                    <button type="submit" className="bg-gray-400 hover:bg-red-500 hover:border-red-500 text-white font-semibold rounded-3xl py-3 px-4 w-1/2">Sign in</button>


                </form>
            </div>

        </div>
    )
}

export default Login