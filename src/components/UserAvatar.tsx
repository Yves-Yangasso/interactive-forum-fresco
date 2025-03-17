
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
  className?: string;
}

const UserAvatar = ({ 
  name, 
  image, 
  size = "md", 
  online = false,
  className
}: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
    
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base"
  };
  
  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-forum-purple text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
      {online && (
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
      )}
    </div>
  );
};

export default UserAvatar;
