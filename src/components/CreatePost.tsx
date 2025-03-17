
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "./UserAvatar";
import { ImageIcon, Link2, Smile, PlusCircle, X } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useToast } from "@/hooks/use-toast";

interface CreatePostProps {
  onSubmit?: (content: string, title?: string) => void;
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
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (content.trim() && onSubmit) {
      onSubmit(content, isComment ? undefined : title);
      setContent("");
      setImages([]);
      setLinks([]);
      if (!isComment) setTitle("");
    }
  };
  
  const handleEmojiSelect = (emoji: any) => {
    setContent(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Simulate image upload
      Array.from(files).forEach(file => {
        // In a real app, we would upload the file to a server and get a URL back
        // For now, we'll create a fake URL and add it to our images array
        const fakeImageUrl = URL.createObjectURL(file);
        setImages(prev => [...prev, fakeImageUrl]);
        
        toast({
          title: "Image ajoutée",
          description: `${file.name} a été ajouté à votre message.`
        });
      });
    }
  };
  
  const handleAddLink = () => {
    if (linkInput.trim()) {
      let url = linkInput;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      setLinks(prev => [...prev, url]);
      setLinkInput("");
      setShowLinkInput(false);
      
      toast({
        title: "Lien ajouté",
        description: "Le lien a été ajouté à votre message."
      });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleRemoveLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleAddMore = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "D'autres options seront disponibles prochainement."
    });
  };
  
  return (
    <Card className="mb-6 border-forum-purple/20 animate-scale-in">
      {!isComment && (
        <CardContent className="px-4 pt-4 pb-0">
          <Input
            placeholder="Titre de la discussion"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-medium focus-visible:ring-forum-purple"
          />
        </CardContent>
      )}
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
            
            {/* Image Preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt="Uploaded" className="w-20 h-20 object-cover rounded-md" />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Links Preview */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted/30 px-3 py-1 rounded-full">
                    <Link2 className="h-3 w-3" />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate max-w-[150px]">
                      {link.replace(/^https?:\/\//, '')}
                    </a>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 rounded-full"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-between border-t bg-muted/10">
        <div className="flex gap-1">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Popover open={showLinkInput} onOpenChange={setShowLinkInput}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Link2 className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="space-y-2">
                <h3 className="font-medium">Ajouter un lien</h3>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Entrez l'URL" 
                    value={linkInput} 
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddLink}>Ajouter</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Smile className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none">
              <Picker 
                data={data} 
                onEmojiSelect={handleEmojiSelect}
                theme="light"
                previewPosition="none"
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full"
            onClick={handleAddMore}
          >
            <PlusCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim() || (!isComment && !title.trim())}
          className="bg-forum-purple hover:bg-forum-purple-dark forum-button"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
