
import { useState } from "react";
import ForumHeader from "@/components/ForumHeader";
import Sidebar from "@/components/Sidebar";
import ThreadCard from "@/components/ThreadCard";
import CommentThread from "@/components/CommentThread";
import CreatePost from "@/components/CreatePost";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, TrendingUp, Sparkles } from "lucide-react";
import { 
  getRecentThreads, 
  getTrendingThreadsWithInfo, 
  getPopularThreadsWithInfo, 
  getCurrentUserThreads,
  getCommentsWithReplies,
  ThreadWithAuthor,
  CommentWithAuthor
} from "@/utils/mockUtils";
import { getThreadById } from "@/data/forumData";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  
  // Récupérer les données simulées
  const recentThreads = getRecentThreads();
  const trendingThreads = getTrendingThreadsWithInfo();
  const popularThreads = getPopularThreadsWithInfo();
  const followingThreads = getCurrentUserThreads();
  
  // Récupérer les commentaires du thread actif
  const activeThreadComments: CommentWithAuthor[] = activeThread 
    ? getCommentsWithReplies(activeThread)
    : [];
  
  // Récupérer les détails du thread actif
  const activeThreadDetails = activeThread 
    ? recentThreads.find(thread => thread.id === activeThread) 
    : null;
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-forum-bg-light">
      <ForumHeader onToggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="container py-6">
            {activeThread === null ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Discussions</h2>
                  <Button className="bg-forum-purple hover:bg-forum-purple-dark forum-button">
                    Nouveau Sujet
                  </Button>
                </div>
                
                <Tabs defaultValue="recent" className="mb-6">
                  <TabsList className="grid w-full grid-cols-4 max-w-md">
                    <TabsTrigger value="recent" className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Récents</span>
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4" />
                      <span className="hidden sm:inline">Tendances</span>
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden sm:inline">Populaires</span>
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Suivis</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recent" className="mt-6">
                    <div className="space-y-4">
                      {recentThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          {...thread}
                          onClick={() => setActiveThread(thread.id)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trending" className="mt-6">
                    <div className="space-y-4">
                      {trendingThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          {...thread}
                          onClick={() => setActiveThread(thread.id)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="popular" className="mt-6">
                    <div className="space-y-4">
                      {popularThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          {...thread}
                          onClick={() => setActiveThread(thread.id)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="following" className="mt-6">
                    <div className="space-y-4">
                      {followingThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          {...thread}
                          onClick={() => setActiveThread(thread.id)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div>
                <Button 
                  variant="ghost" 
                  className="mb-4"
                  onClick={() => setActiveThread(null)}
                >
                  ← Retour aux discussions
                </Button>
                
                {activeThreadDetails && (
                  <ThreadCard
                    {...activeThreadDetails}
                    onClick={() => {}}
                  />
                )}
                
                <div className="my-6">
                  <h3 className="text-lg font-medium mb-4">
                    Commentaires ({activeThreadComments.length})
                  </h3>
                  
                  <CreatePost 
                    placeholder="Ajouter un commentaire..." 
                    buttonText="Commenter"
                    isComment
                  />
                  
                  <div className="space-y-4">
                    {activeThreadComments.map((comment) => (
                      <CommentThread key={comment.id} {...comment} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
