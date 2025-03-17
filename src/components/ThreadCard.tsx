
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowUp, ArrowDown, Eye, Bookmark, Share2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ThreadCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    image?: string;
  };
  category: string;
  commentCount: number;
  viewCount: number;
  votes: number;
  time: string;
  isHot?: boolean;
  onClick?: () => void;
}

const ThreadCard = ({
  id,
  title,
  excerpt,
  author,
  category,
  commentCount,
  viewCount,
  votes,
  time,
  isHot,
  onClick
}: ThreadCardProps) => {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();

  const handleVote = (direction: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // If user already voted same direction, remove vote
    if (userVote === direction) {
      setUserVote(null);
      setCurrentVotes(direction === "up" ? currentVotes - 1 : currentVotes + 1);
    } 
    // If user voted opposite direction, change vote
    else if (userVote) {
      setUserVote(direction);
      setCurrentVotes(direction === "up" ? currentVotes + 2 : currentVotes - 2);
    } 
    // If user hadn't voted before
    else {
      setUserVote(direction);
      setCurrentVotes(direction === "up" ? currentVotes + 1 : currentVotes - 1);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setBookmarked(!bookmarked);
    
    toast({
      title: bookmarked ? "Favori supprimé" : "Ajouté aux favoris",
      description: bookmarked ? "Ce sujet a été retiré de vos favoris" : "Ce sujet a été ajouté à vos favoris"
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // In a real app, this would use the Web Share API or copy to clipboard
    toast({
      title: "Lien copié",
      description: "Le lien a été copié dans le presse-papier"
    });
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer border-transparent hover:border-forum-purple thread-hover",
        "animate-fade-in"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0 flex">
        <div className="flex flex-col items-center justify-start bg-muted/30 px-4 py-6 text-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8",
              userVote === "up" && "text-green-600"
            )}
            onClick={(e) => handleVote("up", e)}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className={cn(
            "font-medium text-sm py-1", 
            currentVotes > 0 ? "text-green-600" : currentVotes < 0 ? "text-red-600" : ""
          )}>
            {currentVotes}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8",
              userVote === "down" && "text-red-600"
            )}
            onClick={(e) => handleVote("down", e)}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge 
              variant="outline" 
              className="bg-forum-purple/10 text-forum-purple border-forum-purple/30"
            >
              {category}
            </Badge>
            {isHot && (
              <Badge 
                className="bg-orange-500 text-white animate-pulse-gentle"
              >
                Hot
              </Badge>
            )}
          </div>
          
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center mr-4">
              <UserAvatar name={author.name} image={author.image} size="sm" className="mr-2" />
              <span>{author.name}</span>
            </div>
            <span className="mr-4">{time}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-3 bg-muted/20 border-t flex justify-end text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{viewCount}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 px-2", 
              bookmarked && "text-yellow-500"
            )}
            onClick={handleBookmark}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
