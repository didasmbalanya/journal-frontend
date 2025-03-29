"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type Journal = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const router = useRouter();

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const journalsPerPage = 5;

  // Calculate current journals to display
  const indexOfLastJournal = currentPage * journalsPerPage;
  const indexOfFirstJournal = indexOfLastJournal - journalsPerPage;
  const currentJournals = journals.slice(
    indexOfFirstJournal,
    indexOfLastJournal
  );
  const totalPages = Math.ceil(journals.length / journalsPerPage);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch journals");
        const data = await res.json();
        setJournals(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    };
    fetchJournals();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this journal?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/journals/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete journal");
      setJournals(journals.filter((journal) => journal.id !== id));
      if (selectedJournal?.id === id) setSelectedJournal(null);
      toast.success("Journal deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="pt-20 p-6 flex gap-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Left Side - Journal List */}
      <div className="w-1/3 space-y-4 h-[calc(100vh-6rem)] overflow-y-auto">
        
        <Button
          onClick={() => router.push("/journals/create")}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Create New Journal
        </Button>
        <div className="space-y-2">
          {currentJournals.map((journal) => (
            <Card
              key={journal.id}
              className={`cursor-pointer hover:shadow-lg transition-all transform hover:scale-[1.01] ${
                selectedJournal?.id === journal.id
                  ? "border-2 border-blue-500 bg-blue-50"
                  : "hover:bg-white"
              }`}
              onClick={() => setSelectedJournal(journal)}
            >
              <CardHeader className="p-2 pb-0">
                <CardTitle className="text-sm font-medium text-gray-800">
                  {journal.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-1">
                {journal.content.substring(0, 50)}...
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between py-2 px-1 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-xs"
            >
              Previous
            </Button>
            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="text-xs"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Right Side - Journal Preview */}
      <div className="w-2/3 h-[calc(100vh-6rem)] overflow-y-auto">
        {selectedJournal ? (
          <Card className="p-6 shadow-xl bg-white/80 backdrop-blur-sm sticky top-0">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {selectedJournal.title}
              </CardTitle>
              <p className="text-gray-400 text-sm">
                {new Date(selectedJournal.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="mt-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedJournal.content}
              </p>
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={() =>
                    router.push(`/journals/edit/${selectedJournal.id}`)
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedJournal.id)}
                  className="bg-red-500 hover:bg-red-600 transition-all"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <p className="text-lg">Select a journal to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
