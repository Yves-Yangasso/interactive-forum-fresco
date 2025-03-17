
import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageCircle, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface CommentProps {
  id?: string;
  author: {
    name: string;
    image?: string;
    role?: string;
  };
  content: string;
  time: string;
  votes: number;
  replies?: CommentProps[];
  level?: number;
  onReply?: (parentId: string | undefined, content: string) => void;
  onVote?: (id: string | undefined, direction: "up" | "down") => void;
}

const CommentThread = ({
  id,
  author,
  content,
  time,
  votes,
  replies = [],
  level = 0,
  onReply,
  onVote
}: CommentProps) => {
  const maxNestingLevel = 3;
  const currentLevel = Math.min(level, maxNestingLevel);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  
  const handleVote = (direction: "up" | "down") => {
    if (userVote === direction) {
      setUserVote(null);
      if (onVote) onVote(id, direction);
    } else {
      setUserVote(direction);
      if (onVote) onVote(id, direction);
    }
  };
  
  const handleReplySubmit = () => {
    if (replyContent.trim() && onReply) {
      onReply(id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <Card className={cn(
        "mb-3 overflow-hidden",
        level > 0 && "border-l-4 border-l-forum-purple/40"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <UserAvatar 
              name={author.name} 
              image={author.image} 
              online={level === 0}
              size={level === 0 ? "md" : "sm"}
            />
            
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h4 className="font-medium mr-2">{author.name}</h4>
                {author.role && (
                  <span className="text-xs px-2 py-0.5 bg-forum-purple/20 text-forum-purple rounded-full">
                    {author.role}
                  </span>
                )}
                <span className="text-xs text-muted-foreground ml-2">{time}</span>
              </div>
              
              <div className="text-sm mb-3">
                {content}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted/40 rounded-full">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 rounded-full",
                      userVote === "up" && "text-green-600"
                    )}
                    onClick={() => handleVote("up")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-1">{votes}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 rounded-full",
                      userVote === "down" && "text-red-600"
                    )}
                    onClick={() => handleVote("down")}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Répondre
                </Button>
                
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
              
              {isReplying && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Votre réponse..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-16 focus-visible:ring-forum-purple resize-none border-none bg-muted/30 p-3 mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsReplying(false)}
                    >
                      Annuler
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-forum-purple hover:bg-forum-purple-dark forum-button"
                      disabled={!replyContent.trim()}
                      onClick={handleReplySubmit}
                    >
                      Répondre
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {replies.length > 0 && (
        <div 
          className={cn(
            "pl-6 border-l-2 border-dashed border-muted ml-6 mt-1 mb-3",
            level >= maxNestingLevel && "pl-0 border-l-0 ml-0"
          )}
        >
          {replies.map((reply, index) => (
            <CommentThread
              key={index}
              {...reply}
              level={currentLevel + 1}
              onReply={onReply}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentThread;
