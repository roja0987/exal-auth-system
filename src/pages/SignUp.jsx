import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '', password: '', firstName: '', lastName: '', displayName: '', phone: '', terms: false
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.terms) return alert("Please accept Terms.");
    
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          display_name: formData.displayName,
        }
      }
    });

    if (error) alert(error.message);
    else {
      alert("Success! Check your email to verify.");
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" placeholder="First Name" required onChange={e => setFormData({...formData, firstName: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Last Name" required onChange={e => setFormData({...formData, lastName: e.target.value})} />
        </div>
        <input className="w-full border p-2 rounded" placeholder="Display Name" required onChange={e => setFormData({...formData, displayName: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Phone Number" required onChange={e => setFormData({...formData, phone: e.target.value})} />
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
        
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" required onChange={e => setFormData({...formData, terms: e.target.checked})} />
          <span>I accept the GDPR-compliant Terms and Conditions.</span>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Sign Up</button>
        <p className="text-center text-sm">Already have an account? <a href="/" className="text-blue-600">Sign In</a></p>
      </form>
    </div>
  );
}