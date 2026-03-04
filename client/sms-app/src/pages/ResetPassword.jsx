import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    await axios.post(
      "https://service-management-system-hj06.onrender.com/api/auth/resetPassword",
      {
        token,
        newPassword: password,
      }
    );

    alert("Password reset successful");
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;