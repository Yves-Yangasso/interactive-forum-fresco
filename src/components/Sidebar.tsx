
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare, Users, Home, Settings, TrendingUp, Bookmark, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import UserAvatar from "./UserAvatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  isOpen: boolean;
  onCategoryClick?: (category: string) => void;
  onMyTopicClick?: (topic: string) => void;
}

const categories = [
  { id: "c1", name: "Général", icon: Home, count: 24 },
  { id: "c2", name: "Discussions", icon: MessageSquare, count: 47 },
  { id: "c3", name: "Communauté", icon: Users, count: 12 },
  { id: "c4", name: "Tendances", icon: TrendingUp, count: 18 },
  { id: "c5", name: "Favoris", icon: Bookmark, count: 8 },
];

const myTopics = [
  { id: "t1", name: "Bienvenue", count: 3 },
  { id: "t2", name: "Design UX", count: 5 },
  { id: "t3", name: "Développement", count: 7 },
];

const Sidebar = ({ isOpen, onCategoryClick, onMyTopicClick }: SidebarProps) => {
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveTopic(null);
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
    
    toast({
      title: "Catégorie sélectionnée",
      description: `Vous avez sélectionné la catégorie ${categories.find(c => c.id === categoryId)?.name || ''}`,
    });
  };
  
  const handleMyTopicClick = (topicId: string) => {
    setActiveTopic(topicId);
    setActiveCategory(null);
    if (onMyTopicClick) {
      onMyTopicClick(topicId);
    }
    
    toast({
      title: "Sujet sélectionné",
      description: `Vous avez sélectionné le sujet ${myTopics.find(t => t.id === topicId)?.name || ''}`,
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileOpen(false);
    toast({
      title: "Profil mis à jour",
      description: "Votre profil a été mis à jour avec succès.",
    });
  };
  
  return (
    <>
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transition-all duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-forum-purple">
              Forum<span className="text-forum-purple-dark">Interactif</span>
            </h2>
            
            <div className="flex space-x-1">
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-forum-purple rounded-full"></span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <div className="p-3 bg-muted/20 rounded-md">
                      <p className="font-medium">Nouveau commentaire</p>
                      <p className="text-sm text-muted-foreground">Pierre a commenté votre sujet "Design UX"</p>
                      <p className="text-xs text-muted-foreground mt-1">Il y a 10 minutes</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-md">
                      <p className="font-medium">Mention</p>
                      <p className="text-sm text-muted-foreground">Sophie vous a mentionné dans "Développement"</p>
                      <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-md">
                      <p className="font-medium">Nouvelle réponse</p>
                      <p className="text-sm text-muted-foreground">Marc a répondu à votre commentaire</p>
                      <p className="text-xs text-muted-foreground mt-1">Hier</p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <Button 
            className="w-full bg-forum-purple hover:bg-forum-purple-dark forum-button"
            onClick={() => setNewThreadOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Sujet
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-2">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              CATÉGORIES
            </h3>
            
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1 font-normal text-muted-foreground hover:text-foreground",
                  "hover:bg-forum-purple/10",
                  activeCategory === category.id && "bg-forum-purple/10 text-forum-purple font-medium"
                )}
                onClick={() => handleCategoryClick(category.id)}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
                <span className="ml-auto text-xs bg-muted py-0.5 px-1.5 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
          
          <div className="mt-6 space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              MES SUJETS
            </h3>
            
            {myTopics.map((topic) => (
              <Button
                key={topic.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1 font-normal hover:bg-forum-purple/10",
                  activeTopic === topic.id && "bg-forum-purple/10 text-forum-purple font-medium"
                )}
                onClick={() => handleMyTopicClick(topic.id)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {topic.name}
                <span className="ml-auto text-xs bg-muted py-0.5 px-1.5 rounded-full">
                  {topic.count}
                </span>
              </Button>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Modifier mon profil</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleProfileUpdate} className="space-y-4 mt-6">
                <div className="flex justify-center mb-6">
                  <UserAvatar name="John Doe" image="/placeholder.svg" size="lg" online />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom d'utilisateur</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue="Développeur web passionné" />
                </div>
                <Tabs defaultValue="notifications">
                  <TabsList className="w-full">
                    <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy" className="flex-1">Confidentialité</TabsTrigger>
                  </TabsList>
                  <TabsContent value="notifications" className="space-y-3 pt-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="comment-notif">Commentaires</Label>
                      <input type="checkbox" id="comment-notif" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mention-notif">Mentions</Label>
                      <input type="checkbox" id="mention-notif" defaultChecked className="toggle" />
                    </div>
                  </TabsContent>
                  <TabsContent value="privacy" className="space-y-3 pt-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="profile-visible">Profil visible</Label>
                      <input type="checkbox" id="profile-visible" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="activity-visible">Activité visible</Label>
                      <input type="checkbox" id="activity-visible" defaultChecked className="toggle" />
                    </div>
                  </TabsContent>
                </Tabs>
                <Button type="submit" className="w-full bg-forum-purple hover:bg-forum-purple-dark">
                  Enregistrer les modifications
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={newThreadOpen} onOpenChange={setNewThreadOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <h2 className="text-xl font-bold mb-4">Nouveau Sujet</h2>
          <CreatePost 
            placeholder="De quoi voulez-vous discuter ?" 
            buttonText="Publier le sujet"
            onSubmit={(content, title) => {
              toast({
                title: "Sujet créé",
                description: `Votre sujet "${title}" a été créé avec succès.`
              });
              setNewThreadOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
