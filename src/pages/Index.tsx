
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
  getCategoryThreadsWithInfo,
  ThreadWithAuthor,
  CommentWithAuthor
} from "@/utils/mockUtils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [activeTabValue, setActiveTabValue] = useState("recent");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get mock data
  const recentThreads = getRecentThreads();
  const trendingThreads = getTrendingThreadsWithInfo();
  const popularThreads = getPopularThreadsWithInfo();
  const followingThreads = getCurrentUserThreads();
  
  // Get threads for selected category or topic
  const getCategoryThreads = (categoryId: string) => {
    return getCategoryThreadsWithInfo(categoryId);
  };
  
  // Get comments for active thread
  const [activeThreadComments, setActiveThreadComments] = useState<CommentWithAuthor[]>([]);
  const [activeThreadDetails, setActiveThreadDetails] = useState<ThreadWithAuthor | null>(null);
  
  // Load thread details when active thread changes
  const loadThreadDetails = (threadId: string) => {
    setActiveThread(threadId);
    
    // Get thread details
    const threadDetails = recentThreads.find(thread => thread.id === threadId) || 
                         trendingThreads.find(thread => thread.id === threadId) ||
                         popularThreads.find(thread => thread.id === threadId) ||
                         followingThreads.find(thread => thread.id === threadId);
    
    setActiveThreadDetails(threadDetails || null);
    
    // Get comments
    const comments = getCommentsWithReplies(threadId);
    setActiveThreadComments(comments);
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleNewComment = (content: string) => {
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été ajouté avec succès."
    });
    
    // In a real app, we would add the comment to the database
    console.log("Nouveau commentaire:", content);
    
    // Simulate adding a new comment to the UI
    const newComment: CommentWithAuthor = {
      id: `new-${Date.now()}`,
      content,
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg",
        role: "Membre"
      },
      time: "À l'instant",
      votes: 0
    };
    
    setActiveThreadComments(prev => [newComment, ...prev]);
  };
  
  const handleNewReply = (parentId: string | undefined, content: string) => {
    toast({
      title: "Réponse ajoutée",
      description: "Votre réponse a été ajoutée avec succès."
    });
    
    console.log("Nouvelle réponse:", { parentId, content });
    
    // Simulate adding a new reply to the UI
    if (parentId) {
      const newReply: CommentWithAuthor = {
        id: `new-reply-${Date.now()}`,
        content,
        author: {
          name: "John Doe",
          avatar: "/placeholder.svg",
          role: "Membre"
        },
        time: "À l'instant",
        votes: 0
      };
      
      // Clone comments array to avoid direct state mutation
      const updatedComments = [...activeThreadComments];
      
      // Find the parent comment and add the reply
      const findAndAddReply = (comments: CommentWithAuthor[]) => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === parentId) {
            // If parent is found, add reply
            comments[i].replies = comments[i].replies || [];
            comments[i].replies.push(newReply);
            return true;
          }
          // Check if the parent is in the replies
          if (comments[i].replies) {
            const found = findAndAddReply(comments[i].replies);
            if (found) return true;
          }
        }
        return false;
      };
      
      findAndAddReply(updatedComments);
      setActiveThreadComments(updatedComments);
    }
  };
  
  const handleNewThread = (content: string, title?: string) => {
    if (!title) return;
    
    toast({
      title: "Sujet créé",
      description: "Votre nouveau sujet a été créé avec succès."
    });
    
    console.log("Nouveau sujet:", { title, content });
    
    // Simulate adding a new thread to the UI
    const newThread: ThreadWithAuthor = {
      id: `new-${Date.now()}`,
      title,
      excerpt: content,
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg",
        role: "Membre"
      },
      category: "Général",
      commentCount: 0,
      viewCount: 0,
      votes: 0,
      time: "À l'instant"
    };
    
    // Add to recent threads
    recentThreads.unshift(newThread);
    
    setShowNewPostDialog(false);
  };
  
  const handleVote = (commentId: string | undefined, direction: "up" | "down") => {
    if (!commentId) return;
    
    toast({
      title: `Vote ${direction === "up" ? "positif" : "négatif"}`,
      description: `Votre vote a été pris en compte.`
    });
    
    console.log("Vote:", { commentId, direction });
    
    // Simulate updating vote count in the UI
    const updatedComments = [...activeThreadComments];
    
    const updateVote = (comments: CommentWithAuthor[]) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentId) {
          comments[i].votes += direction === "up" ? 1 : -1;
          return true;
        }
        // Check if the comment is in the replies
        if (comments[i].replies) {
          const found = updateVote(comments[i].replies);
          if (found) return true;
        }
      }
      return false;
    };
    
    updateVote(updatedComments);
    setActiveThreadComments(updatedComments);
  };
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActiveTopicId(null);
    setActiveThread(null);
    setActiveTabValue("category");
  };
  
  const handleMyTopicClick = (topicId: string) => {
    setActiveTopicId(topicId);
    setActiveCategoryId(null);
    setActiveThread(null);
    setActiveTabValue("topic");
  };
  
  const getDisplayThreads = () => {
    if (activeTabValue === "recent") return recentThreads;
    if (activeTabValue === "trending") return trendingThreads;
    if (activeTabValue === "popular") return popularThreads;
    if (activeTabValue === "following") return followingThreads;
    if (activeTabValue === "category" && activeCategoryId) return getCategoryThreads(activeCategoryId);
    if (activeTabValue === "topic" && activeTopicId) return getCurrentUserThreads();
    return recentThreads;
  };
  
  const displayThreads = getDisplayThreads();
  
  return (
    <div className="min-h-screen bg-forum-bg-light">
      <ForumHeader onToggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onCategoryClick={handleCategoryClick}
          onMyTopicClick={handleMyTopicClick}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="container py-6">
            {activeThread === null ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {activeTabValue === "category" && activeCategoryId 
                      ? "Catégorie: " + (activeCategoryId === "c1" ? "Général" 
                        : activeCategoryId === "c2" ? "Discussions" 
                        : activeCategoryId === "c3" ? "Communauté" 
                        : activeCategoryId === "c4" ? "Tendances" 
                        : "Favoris")
                      : activeTabValue === "topic" && activeTopicId
                        ? "Mes sujets: " + (activeTopicId === "t1" ? "Bienvenue" 
                          : activeTopicId === "t2" ? "Design UX" 
                          : "Développement")
                        : "Discussions"
                    }
                  </h2>
                  <Button 
                    className="bg-forum-purple hover:bg-forum-purple-dark forum-button"
                    onClick={() => setShowNewPostDialog(true)}
                  >
                    Nouveau Sujet
                  </Button>
                </div>
                
                <Tabs 
                  value={activeTabValue} 
                  onValueChange={setActiveTabValue}
                  className="mb-6"
                >
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
                  
                  <div className="mt-6">
                    <div className="space-y-4">
                      {displayThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          {...thread}
                          onClick={() => loadThreadDetails(thread.id)}
                        />
                      ))}
                    </div>
                  </div>
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
                    onSubmit={handleNewComment}
                  />
                  
                  <div className="space-y-4">
                    {activeThreadComments.map((comment) => (
                      <CommentThread 
                        key={comment.id} 
                        {...comment} 
                        onReply={handleNewReply}
                        onVote={handleVote}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="sm:max-w-[650px]">
          <h2 className="text-xl font-bold mb-4">Nouveau Sujet</h2>
          <CreatePost 
            placeholder="De quoi voulez-vous discuter ?" 
            buttonText="Publier le sujet"
            onSubmit={handleNewThread}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
