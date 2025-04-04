"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    }
  }, []);

  useEffect(() => {
    console.log("isAuthenticated useEffect : ",isAuthenticated);
    if (isAuthenticated === false) {
      router.push("/login"); 
    }
  }, [isAuthenticated, router]);

  console.log("isAuthenticated outside : ",isAuthenticated);

  if (isAuthenticated === null) return null;

  if(isAuthenticated) {
    router.push("/dashboard")
    // return
  }

  return children;
};

export default PrivateRoutes;
