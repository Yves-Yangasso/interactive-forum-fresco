
import { useState } from "react";
import ForumHeader from "@/components/ForumHeader";
import Sidebar from "@/components/Sidebar";
import ThreadCard from "@/components/ThreadCard";
import CommentThread from "@/components/CommentThread";
import CreatePost from "@/components/CreatePost";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, TrendingUp, Sparkles } from "lucide-react";

const threads = [
  {
    title: "Comment améliorer l'expérience utilisateur de votre application ?",
    excerpt: "Je travaille sur une application et je cherche des conseils pour améliorer l'UX. Quelles sont vos meilleures pratiques ?",
    author: { name: "Laura Dubois" },
    category: "Design",
    commentCount: 24,
    viewCount: 142,
    votes: 18,
    time: "Il y a 2h",
    isHot: true
  },
  {
    title: "Les tendances technologiques à suivre en 2023",
    excerpt: "Quelles sont les technologies qui vont émerger cette année ? J'aimerais avoir vos avis sur les domaines à surveiller.",
    author: { name: "Thomas Martin" },
    category: "Technologie",
    commentCount: 13,
    viewCount: 89,
    votes: 7,
    time: "Il y a 5h"
  },
  {
    title: "Comment obtenir un premier emploi en développement web ?",
    excerpt: "Je viens de terminer ma formation et je cherche des conseils pour décrocher mon premier poste de développeur web.",
    author: { name: "Julie Leroux" },
    category: "Carrière",
    commentCount: 31,
    viewCount: 214,
    votes: 22,
    time: "Il y a 1j"
  },
  {
    title: "Débat : React vs Vue vs Angular",
    excerpt: "Quel framework JavaScript préférez-vous et pourquoi ? J'hésite à me spécialiser et j'aimerais avoir vos retours d'expérience.",
    author: { name: "Marc Dupont" },
    category: "Développement",
    commentCount: 47,
    viewCount: 325,
    votes: 15,
    time: "Il y a 2j"
  }
];

const comments = [
  {
    author: { 
      name: "Sophie Legrand", 
      role: "Modérateur" 
    },
    content: "L'UX est primordiale pour fidéliser vos utilisateurs. Je vous conseille de commencer par une analyse des points de friction dans votre parcours utilisateur actuel.",
    time: "Il y a 1h",
    votes: 12,
    replies: [
      {
        author: { name: "Laura Dubois" },
        content: "Merci Sophie ! Avez-vous des outils à recommander pour cette analyse ?",
        time: "Il y a 45min",
        votes: 3,
        replies: [
          {
            author: { name: "Sophie Legrand", role: "Modérateur" },
            content: "Bien sûr ! Hotjar est excellent pour les heatmaps et les enregistrements de session. UserTesting est également très utile pour des tests avec de vrais utilisateurs.",
            time: "Il y a 30min",
            votes: 5
          }
        ]
      },
      {
        author: { name: "Paul Mercier" },
        content: "Je confirme les recommandations de Sophie. J'ajouterais aussi Maze pour des tests rapides de prototypes.",
        time: "Il y a 20min",
        votes: 2
      }
    ]
  },
  {
    author: { name: "Alexandre Petit" },
    content: "N'oubliez pas l'accessibilité ! C'est souvent négligé mais c'est essentiel pour une bonne UX inclusive.",
    time: "Il y a 1h30",
    votes: 8,
    replies: []
  }
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeThread, setActiveThread] = useState<number | null>(null);
  
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
                      {threads.map((thread, index) => (
                        <ThreadCard
                          key={index}
                          {...thread}
                          onClick={() => setActiveThread(index)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trending" className="mt-6">
                    <div className="space-y-4">
                      {/* Similaire à "recent" mais avec d'autres threads */}
                      <ThreadCard
                        {...threads[0]}
                        onClick={() => setActiveThread(0)}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="popular" className="mt-6">
                    <div className="space-y-4">
                      {/* Similaire à "recent" mais avec d'autres threads */}
                      <ThreadCard
                        {...threads[2]}
                        onClick={() => setActiveThread(2)}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="following" className="mt-6">
                    <div className="space-y-4">
                      {/* Similaire à "recent" mais avec d'autres threads */}
                      <ThreadCard
                        {...threads[1]}
                        onClick={() => setActiveThread(1)}
                      />
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
                
                <ThreadCard
                  {...threads[activeThread]}
                  onClick={() => {}}
                />
                
                <div className="my-6">
                  <h3 className="text-lg font-medium mb-4">
                    Commentaires ({comments.length})
                  </h3>
                  
                  <CreatePost 
                    placeholder="Ajouter un commentaire..." 
                    buttonText="Commenter"
                    isComment
                  />
                  
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <CommentThread key={index} {...comment} />
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
