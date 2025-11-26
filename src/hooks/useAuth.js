import { useEffect, useState } from "react";
import { onAuthChange } from "../api/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(u || null);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { user, loading };
};
