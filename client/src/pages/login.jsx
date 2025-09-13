import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AUTH } from "../../config";

export default function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                email: userData.email,
                password: userData.password,
            };
            const res = await fetch(AUTH.LOGIN, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data) {
                alert(data.message)

                const userDetails = {
                    id: data.user._id,
                    userName: data.user.userName
                };
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("user", JSON.stringify(userDetails));
                    alert(data.message)
                    navigate("/")
                }
            } 
           
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[30%] bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-xl font-bold">Login</h1>
                <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Email <span className="text-red-400">*</span></label>
                            <input type="email" name="email" value={userData.email} required onChange={handleChange} placeholder="Enter email" className="w-full border border-gray-300 rounded-lg p-2 text-sm"/>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Password<span className="text-red-400">*</span></label>
                            <input type="password" name="password" value={userData.password} required onChange={handleChange} placeholder="Enter password" className="w-full border border-gray-300 rounded-lg p-2 text-sm"/>
                        </div>
                        <div>
                            <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-600 text-sm"
                            >
                            Submit
                            </button>
                        </div>
                </form>
                <p className="mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 underline">
                    Register
                    </Link>
                </p>
            </div>
        </div>
    );
}