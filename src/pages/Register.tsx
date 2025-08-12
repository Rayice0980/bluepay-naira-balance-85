
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import WelcomeModal from "@/components/WelcomeModal";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(username, email, password);
      if (success) {
        setShowWelcomeModal(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* Need Help Link */}
      <div className="flex justify-end mb-8">
        <Link to="#" className="text-orange-400 font-medium underline hover:text-orange-500 transition-colors">
          Need Help?
        </Link>
      </div>

      <div className="max-w-md mx-auto">
        {/* Animated Blue Pay Logo */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-bluepay-500 mb-4 relative">
            <span className="inline-block animate-pulse">B</span>
            <span className="inline-block animate-bounce delay-100">L</span>
            <span className="inline-block animate-pulse delay-200">U</span>
            <span className="inline-block animate-bounce delay-300">E</span>
            <span className="inline-block mx-4"></span>
            <span className="inline-block animate-pulse delay-400">P</span>
            <span className="inline-block animate-bounce delay-500">A</span>
            <span className="inline-block animate-pulse delay-700">Y</span>
            {/* Dripping effect */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-6 bg-bluepay-500 rounded-full animate-pulse opacity-70"></div>
              <div className="w-1 h-4 bg-bluepay-400 rounded-full ml-0.5 animate-pulse delay-300 opacity-50"></div>
            </div>
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Create an account to continue
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full h-16 text-lg border-2 border-gray-800 rounded-3xl px-6 bg-transparent focus:border-bluepay-500 focus:ring-0 focus:outline-none transition-colors"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full h-16 text-lg border-2 border-gray-800 rounded-3xl px-6 bg-transparent focus:border-bluepay-500 focus:ring-0 focus:outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full h-16 text-lg border-2 border-gray-800 rounded-3xl px-6 bg-transparent focus:border-bluepay-500 focus:ring-0 focus:outline-none transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full h-16 text-lg border-2 border-gray-800 rounded-3xl px-6 bg-transparent focus:border-bluepay-500 focus:ring-0 focus:outline-none transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 text-xl font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-3xl transition-all duration-300 hover:scale-105 active:scale-95 mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-bluepay-500 hover:text-bluepay-600 font-medium underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleWelcomeModalClose}
        username={username}
      />
    </div>
  );
};

export default Register;
