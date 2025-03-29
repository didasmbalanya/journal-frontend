"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("email");
      setUser(token ? { name: token } : null);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      setUser(null);
      await router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = async (path: string) => {
    try {
      setIsLoading(true);
      await router.push(path);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-all duration-200"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>Journal</span>
          </Link>

          <div>
            {isLoading ? (
              <div className="animate-pulse w-20 h-10 bg-gray-200 rounded-lg" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none group">
                  <div className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    <Avatar className="h-8 w-8 ring-2 ring-white group-hover:ring-blue-400 transition-all">
                      <AvatarImage
                        src="/placeholder-avatar.png"
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                    </svg>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 focus:text-red-700"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 16L21 12M21 12L17 8M21 12H9M9 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H9" />
                    </svg>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/login")}
                  className="text-gray-600 hover:text-gray-900"
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleNavigation("/register")}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
