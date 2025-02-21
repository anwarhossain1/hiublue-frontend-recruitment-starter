"use client";

import { useAuth } from "@/contexts/AuthContexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && token === null) {
      router.replace("/login");
    }
  }, [token, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;

  return <MainLayout>{children}</MainLayout>;
}
