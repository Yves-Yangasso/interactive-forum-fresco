
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare, Users, Home, Settings, TrendingUp, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const categories = [
  { name: "Général", icon: Home, count: 24 },
  { name: "Discussions", icon: MessageSquare, count: 47 },
  { name: "Communauté", icon: Users, count: 12 },
  { name: "Tendances", icon: TrendingUp, count: 18 },
  { name: "Favoris", icon: Bookmark, count: 8 },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
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
        </div>
      </div>
      
      <div className="p-4">
        <Button 
          className="w-full bg-forum-purple hover:bg-forum-purple-dark forum-button"
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
              key={category.name}
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1 font-normal text-muted-foreground hover:text-foreground",
                "hover:bg-forum-purple/10"
              )}
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
          
          {["Bienvenue", "Design UX", "Développement"].map((topic) => (
            <Button
              key={topic}
              variant="ghost"
              className="w-full justify-start mb-1 font-normal hover:bg-forum-purple/10"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {topic}
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
