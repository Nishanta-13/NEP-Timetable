// import { useState } from "react";
// import { login, signup, abcLogin } from "../../../../Backend/utils/authsetup";

// export default function AuthModal({ isOpen, onClose }) {
//     const [role, setRole] = useState("Student");
//     const [isSignup, setIsSignup] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         studentId: "",
//         abcId: "",
//         professorId: "",
//         professorMail: "",
//         adminId: "",
//         adminMail: "",
//     });

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleLoginSignup = async (e) => {
//         e.preventDefault();
//         try {
//             if (isSignup) {
//                 // For students, ensure ABC ID is provided
//                 if (role === "Student" && !formData.abcId) {
//                     alert("ABC ID is required for students.");
//                     return;
//                 }
//                 await signup(role, formData);
//                 alert(`${role} signed up successfully! Now login.`);
//                 setIsSignup(false);
//             } else {
//                 const res = await login(role, formData);
//                 localStorage.setItem("token", res.data.token);
//                 localStorage.setItem("role", res.data.role);
//                 alert(`${role} logged in!`);
//                 window.location.href = "/dashboard";
//             }
//         } catch (err) {
//             alert(err.response?.data?.error || "Action failed");
//         }
//     };

//     const roleFieldName = !isSignup ? (() => {
//         switch (role) {
//             case "Student": return "email";
//             case "Professor": return "professorMail";
//             case "Admin": return "adminMail";
//             default: return "email";
//         }
//     })() : "email";

//     const rolePlaceholder = !isSignup ? (() => {
//         switch (role) {
//             case "Student": return "Email";
//             case "Professor": return "Professor Email";
//             case "Admin": return "Admin Email";
//             default: return "Email";
//         }
//     })() : "Email";

//     const handleABCLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await abcLogin();
//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("role", res.data.role);
//             localStorage.setItem("user", JSON.stringify(res.data.user));
//             alert(`Student logged in via ABC-ID!`);
//             window.location.href = "/dashboard";
//         } catch (err) {
//             alert(err.response?.data?.error || "ABC-ID login failed");
//         }
//     };


//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl w-96 max-w-[90vw] p-8 relative border border-gray-100">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 </button>

//                 {/* Header */}
//                 <div className="text-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                         {isSignup ? "Create Account" : "Welcome Back"}
//                     </h2>
//                     <p className="text-gray-600 text-sm">
//                         {isSignup ? "Sign up as" : "Login as"} {role}
//                     </p>
//                 </div>

//                 {/* Role Selector */}
//                 <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
//                     {["Student", "Professor", "Admin"].map((r) => (
//                         <button
//                             key={r}
//                             className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${role === r ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
//                                 }`}
//                             onClick={() => setRole(r)}
//                         >
//                             {r}
//                         </button>
//                     ))}
//                 </div>

//                 <form onSubmit={handleLoginSignup} className="space-y-4">
//                     {isSignup && (
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Full Name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                         </div>
//                     )}

//                     {/* Role-specific signup fields */}
//                     {isSignup && role === "Student" && (
//                         <div className="space-y-3">
//                             <input
//                                 type="text"
//                                 placeholder="Student ID"
//                                 name="studentId"
//                                 value={formData.studentId}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="ABC ID"
//                                 name="abcId"
//                                 value={formData.abcId}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 name="email"        // Add this
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                         </div>
//                     )}

//                     {isSignup && role === "Professor" && (
//                         <div className="space-y-3">
//                             <input
//                                 type="text"
//                                 placeholder="Professor ID"
//                                 name="professorId"
//                                 value={formData.professorId}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Professor Email"
//                                 name="professorMail"
//                                 value={formData.professorMail}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                         </div>
//                     )}

//                     {isSignup && role === "Admin" && (
//                         <div className="space-y-3">
//                             <input
//                                 type="text"
//                                 placeholder="Admin ID"
//                                 name="adminId"
//                                 value={formData.adminId}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Admin Email"
//                                 name="adminMail"
//                                 value={formData.adminMail}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                         </div>
//                     )}

//                     {!isSignup && (
//                         <div>
//                             <input
//                                 type="email"
//                                 placeholder={rolePlaceholder}
//                                 name={roleFieldName}
//                                 value={formData[roleFieldName]}
//                                 onChange={handleChange}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 required
//                             />
//                         </div>
//                     )}

//                     <div>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                             required
//                         />
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
//                     >
//                         {isSignup ? "Create Account" : "Login"}
//                     </button>

//                     {/* ABC-ID login */}
//                     {!isSignup && role === "Student" && (
//                         <button
//                             type="button"
//                             onClick={handleABCLogin}
//                             className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
//                         >
//                             Login with ABC-ID
//                         </button>
//                     )}
//                 </form>

//                 {/* Toggle */}
//                 <div className="mt-6 text-center">
//                     <p className="text-gray-600 text-sm">
//                         {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//                         <button
//                             className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
//                             onClick={() => setIsSignup(!isSignup)}
//                         >
//                             {isSignup ? "Sign In" : "Create Account"}
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }
