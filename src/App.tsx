import {useEffect} from "react";
import AuthForm from "./components/auth/AuthForm";
import {sessionService} from "./application/session/session.service.ts";
import {useSessionStore} from "./application/session/session.store.ts";
import {Map} from "./components/Map.tsx";

function App() {
    const status = useSessionStore(
        (state) => state.status
    )

    useEffect(() => {
        sessionService.initialize()
    }, []);

    if (status === "initializing") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return (
            <div>
                <AuthForm />
            </div>
        )
    }

  return (
      <div>
          <Map />
      </div>
  );
}

export default App;
