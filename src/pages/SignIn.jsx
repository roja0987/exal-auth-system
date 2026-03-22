import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOtp, setIsOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/dashboard');
    setLoading(false);
  };

  // 2. Google Login with Redirect
  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) alert(error.message);
  };

  // 3. Email OTP Logic (Simplified)
  const handleEmailOtp = async (e) => {
  e.preventDefault();
  
  // This sends the email (now containing the {{ .Token }} we set above)
  const { error } = await supabase.auth.signInWithOtp({ 
    email: email,
    options: {
      // This tells Supabase NOT to expect a link click
      shouldCreateUser: true,
    }
  });

  if (error) {
    alert(error.message);
  } else {
    // Now that the email contains a code, the user can actually type it here
    const token = window.prompt("Enter the 6-digit code sent to " + email);
    
    if (token) {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (verifyError) alert("Invalid Code: " + verifyError.message);
      else navigate('/dashboard');
    }
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
        
        {!isOtp ? (
          /* Email & Password Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Email Address" 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                type="password" 
                placeholder="Password" 
                required
                onChange={e => setPassword(e.target.value)} 
            />
            <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50">
                {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        ) : (
          /* Email OTP Form */
          <form onSubmit={handleEmailOtp} className="space-y-4">
            <input 
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
                placeholder="Enter your email" 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50">
                {loading ? "Sending Code..." : "Send Login OTP"}
            </button>
          </form>
        )}

        <button 
          onClick={() => setIsOtp(!isOtp)} 
          className="w-full mt-4 text-xs text-indigo-600 font-semibold hover:underline text-center"
        >
          {isOtp ? "← Back to Password Login" : "Forgot Password? Login with Email OTP"}
        </button>

        <div className="my-6 border-t relative text-center">
            <span className="absolute top-[-10px] left-1/2 translate-x-[-50%] bg-white px-3 text-gray-400 text-sm">OR</span>
        </div>

        <button onClick={handleGoogle} className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition border-gray-300 bg-white">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                    Register here
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}