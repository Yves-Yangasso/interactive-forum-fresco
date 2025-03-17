
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Menu } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";

interface ForumHeaderProps {
  onToggleSidebar: () => void;
}

const ForumHeader = ({ onToggleSidebar }: ForumHeaderProps) => {
  return (
    <header className="bg-white border-b sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="mr-2 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-forum-purple hidden sm:block">
          Forum<span className="text-forum-purple-dark">Interactif</span>
        </h1>
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher dans le forum..." 
            className={cn(
              "pl-10 bg-muted/50 border-none focus-visible:ring-1",
              "focus-visible:ring-forum-purple transition-all"
            )}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-forum-purple rounded-full" />
        </Button>
        <UserAvatar 
          name="John Doe" 
          image="/placeholder.svg" 
          size="sm" 
          online={true}
        />
      </div>
    </header>
  );
};

export default ForumHeader;
