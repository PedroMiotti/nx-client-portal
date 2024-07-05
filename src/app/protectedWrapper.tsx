"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

const ProtectedWrapper = ({ children }: ProtectedWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRouteChange = (url: string) => {
    const userIsAuthenticated = Cookies.get("arc:client:access_token");

    if (!userIsAuthenticated && url !== "/auth/login")
      router.push("/auth/login");
  };

  useEffect(() => {
    handleRouteChange(pathname + searchParams.toString());
  }, [pathname, searchParams]);

  return children;
};

export default ProtectedWrapper;
