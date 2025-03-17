
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "./UserAvatar";
import { ImageIcon, Link2, Smile, PlusCircle } from "lucide-react";
import { useState } from "react";

interface CreatePostProps {
  onSubmit?: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  isComment?: boolean;
}

const CreatePost = ({
  onSubmit,
  placeholder = "Démarrer une discussion...",
  buttonText = "Publier",
  isComment = false
}: CreatePostProps) => {
  const [content, setContent] = useState("");
  
  const handleSubmit = () => {
    if (content.trim() && onSubmit) {
      onSubmit(content);
      setContent("");
    }
  };
  
  return (
    <Card className="mb-6 border-forum-purple/20 animate-scale-in">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <UserAvatar 
            name="John Doe" 
            image="/placeholder.svg" 
            size={isComment ? "sm" : "md"} 
            online
          />
          <div className="flex-1">
            <Textarea
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-24 focus-visible:ring-forum-purple resize-none border-none bg-muted/30 p-3"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-between border-t bg-muted/10">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Link2 className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <PlusCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="bg-forum-purple hover:bg-forum-purple-dark forum-button"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
