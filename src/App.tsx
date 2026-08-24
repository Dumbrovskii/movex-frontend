import { useState } from "react";
import AuthForm from "./components/auth/AuthForm";

function App() {
  const [, setToken] = useState('');

  return (
    <div>
      <AuthForm onTokenReceive={setToken} />
    </div>
  );
}

export default App;
