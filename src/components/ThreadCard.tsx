
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowUp, ArrowDown, Eye } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";

interface ThreadCardProps {
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className={cn("font-medium text-sm py-1", votes > 0 ? "text-green-600" : votes < 0 ? "text-red-600" : "")}>
            {votes}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
