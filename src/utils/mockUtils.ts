
import { 
  threads, 
  categories, 
  users, 
  comments, 
  getCategoryThreads,
  getUserThreads,
  getUserFavoriteThreads,
  getHotThreads,
  getTrendingThreads,
  getPopularThreads
} from '@/data/forumData';

// Interfaces pour les données enrichies
export interface ThreadWithAuthor {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  category: string;
  commentCount: number;
  viewCount: number;
  votes: number;
  time: string;
  isHot?: boolean;
}

export interface CommentWithAuthor {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  time: string;
  votes: number;
  replies?: CommentWithAuthor[];
}

// Fonction pour formater la date
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) {
    return `Il y a ${diffDay}j`;
  } else if (diffHour > 0) {
    return `Il y a ${diffHour}h`;
  } else if (diffMin > 0) {
    return `Il y a ${diffMin}min`;
  } else {
    return 'À l\'instant';
  }
};

// Fonction pour récupérer les threads avec les informations d'auteur
export const getThreadsWithInfo = (threadsList: typeof threads): ThreadWithAuthor[] => {
  return threadsList.map(thread => {
    const author = users.find(user => user.id === thread.authorId);
    const category = categories.find(cat => cat.id === thread.categoryId);
    
    return {
      id: thread.id,
      title: thread.title,
      excerpt: thread.excerpt,
      author: {
        name: author?.name || 'Utilisateur inconnu',
        avatar: author?.avatar,
        role: author?.role
      },
      category: category?.name || 'Générale',
      commentCount: thread.commentCount,
      viewCount: thread.viewCount,
      votes: thread.votes,
      time: formatTimeAgo(thread.createdAt),
      isHot: thread.isHot
    };
  });
};

// Fonction pour récupérer les commentaires avec les informations d'auteur et les réponses imbriquées
export const getCommentsWithReplies = (threadId: string): CommentWithAuthor[] => {
  // Récupérer tous les commentaires du thread
  const threadComments = comments.filter(comment => comment.threadId === threadId);
  
  // Trouver les commentaires de premier niveau (sans parent)
  const topLevelComments = threadComments.filter(comment => !comment.parentId);
  
  // Fonction récursive pour ajouter les réponses
  const addReplies = (comment: typeof comments[0]): CommentWithAuthor => {
    const author = users.find(user => user.id === comment.authorId);
    
    const replies = threadComments
      .filter(reply => reply.parentId === comment.id)
      .map(reply => addReplies(reply));
    
    return {
      id: comment.id,
      content: comment.content,
      author: {
        name: author?.name || 'Utilisateur inconnu',
        avatar: author?.avatar,
        role: author?.role
      },
      time: formatTimeAgo(comment.createdAt),
      votes: comment.votes,
      replies: replies.length > 0 ? replies : undefined
    };
  };
  
  // Transformer tous les commentaires de premier niveau
  return topLevelComments.map(comment => addReplies(comment));
};

// Fonctions pour obtenir différentes listes de threads
export const getRecentThreads = (): ThreadWithAuthor[] => {
  const sortedThreads = [...threads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return getThreadsWithInfo(sortedThreads);
};

export const getHotThreadsWithInfo = (): ThreadWithAuthor[] => {
  return getThreadsWithInfo(getHotThreads());
};

export const getTrendingThreadsWithInfo = (): ThreadWithAuthor[] => {
  return getThreadsWithInfo(getTrendingThreads());
};

export const getPopularThreadsWithInfo = (): ThreadWithAuthor[] => {
  return getThreadsWithInfo(getPopularThreads());
};

export const getCategoryThreadsWithInfo = (categoryId: string): ThreadWithAuthor[] => {
  return getThreadsWithInfo(getCategoryThreads(categoryId));
};

export const getUserThreadsWithInfo = (userId: string): ThreadWithAuthor[] => {
  return getThreadsWithInfo(getUserThreads(userId));
};

export const getUserFavoriteThreadsWithInfo = (userId: string): ThreadWithAuthor[] => {
  return getThreadsWithInfo(getUserFavoriteThreads(userId));
};

// Fonction pour les sujets de l'utilisateur connecté (simulé)
export const getCurrentUserThreads = (): ThreadWithAuthor[] => {
  // Ici, nous simulons l'utilisateur connecté comme étant Laura (u3)
  return getUserThreadsWithInfo('u3');
};
