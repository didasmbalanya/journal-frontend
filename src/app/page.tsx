"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center bg-white shadow-xl rounded-2xl p-8 max-w-md mx-4 transform transition-all hover:scale-[1.02]">
      
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Your Personal Journal
        </h1>
        
        <p className="text-gray-600 mt-4 mb-6">
          Your secure space for daily reflections, memories, and personal growth.
        </p>

        <div className="space-y-3 mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">✨</span>
            <span>Write and organize your thoughts</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">🔒</span>
            <span>Private and secure journaling</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📱</span>
            <span>Access from any device</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => router.push("/login")} 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Login
          </Button>
          <Button 
            onClick={() => router.push("/register")} 
            className="w-full" 
            variant="outline"
          >
            Register
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Join thousands of others who journal with us
        </p>
      </div>
    </div>
  );
}