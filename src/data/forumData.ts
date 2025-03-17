
// Types pour la base de données du forum
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'user';
  bio?: string;
  createdAt: string;
  lastActive: string;
  isOnline: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  threadsCount: number;
  order: number;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  commentCount: number;
  votes: number;
  isPinned: boolean;
  isLocked: boolean;
  isHot: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  threadId: string;
  authorId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
}

export interface Vote {
  id: string;
  userId: string;
  targetType: 'thread' | 'comment';
  targetId: string;
  value: 1 | -1;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  activityType: 'created_thread' | 'commented' | 'voted' | 'followed';
  targetType: 'thread' | 'comment' | 'user' | 'category';
  targetId: string;
  createdAt: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  targetType: 'thread' | 'category';
  targetId: string;
  createdAt: string;
}

// Données simulées
export const users: User[] = [
  {
    id: 'u1',
    name: 'Sophie Legrand',
    username: 'sophie_admin',
    email: 'sophie@example.com',
    role: 'admin',
    bio: 'Administratrice du forum et passionnée de développement web',
    createdAt: '2023-01-15T08:30:00Z',
    lastActive: '2023-09-15T10:25:00Z',
    isOnline: true
  },
  {
    id: 'u2',
    name: 'Thomas Martin',
    username: 'thomas_dev',
    email: 'thomas@example.com',
    role: 'user',
    bio: 'Développeur full-stack et amateur de nouvelles technologies',
    createdAt: '2023-02-20T14:15:00Z',
    lastActive: '2023-09-14T18:30:00Z',
    isOnline: false
  },
  {
    id: 'u3',
    name: 'Laura Dubois',
    username: 'laura_ux',
    email: 'laura@example.com',
    role: 'moderator',
    bio: 'Designer UX/UI avec 5 ans d\'expérience dans le domaine',
    createdAt: '2023-01-30T09:45:00Z',
    lastActive: '2023-09-15T09:15:00Z',
    isOnline: true
  },
  {
    id: 'u4',
    name: 'Marc Dupont',
    username: 'marc_tech',
    email: 'marc@example.com',
    role: 'user',
    bio: 'Passionné de nouvelles technologies et de programmation',
    createdAt: '2023-03-10T11:20:00Z',
    lastActive: '2023-09-13T17:45:00Z',
    isOnline: false
  },
  {
    id: 'u5',
    name: 'Julie Leroux',
    username: 'julie_dev',
    email: 'julie@example.com',
    role: 'user',
    bio: 'Développeuse web junior en recherche de conseils',
    createdAt: '2023-04-05T16:10:00Z',
    lastActive: '2023-09-15T08:50:00Z',
    isOnline: true
  },
  {
    id: 'u6',
    name: 'Alexandre Petit',
    username: 'alex_a11y',
    email: 'alex@example.com',
    role: 'user',
    bio: 'Expert en accessibilité web et défenseur des standards',
    createdAt: '2023-02-28T13:40:00Z',
    lastActive: '2023-09-14T20:30:00Z',
    isOnline: false
  },
  {
    id: 'u7',
    name: 'Paul Mercier',
    username: 'paul_ux',
    email: 'paul@example.com',
    role: 'user',
    bio: 'Designer UX/UI freelance spécialisé en interfaces mobiles',
    createdAt: '2023-03-25T10:05:00Z',
    lastActive: '2023-09-15T11:20:00Z',
    isOnline: true
  }
];

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Général',
    slug: 'general',
    description: 'Discussions générales sur divers sujets technologiques',
    icon: 'Home',
    threadsCount: 24,
    order: 1
  },
  {
    id: 'c2',
    name: 'Discussions',
    slug: 'discussions',
    description: 'Échanges sur des sujets spécifiques et débats constructifs',
    icon: 'MessageSquare',
    threadsCount: 47,
    order: 2
  },
  {
    id: 'c3',
    name: 'Communauté',
    slug: 'communaute',
    description: 'Événements, rencontres et initiatives communautaires',
    icon: 'Users',
    threadsCount: 12,
    order: 3
  },
  {
    id: 'c4',
    name: 'Tendances',
    slug: 'tendances',
    description: 'Actualités et tendances technologiques du moment',
    icon: 'TrendingUp',
    threadsCount: 18,
    order: 4
  },
  {
    id: 'c5',
    name: 'Favoris',
    slug: 'favoris',
    description: 'Vos sujets favoris et contenus sauvegardés',
    icon: 'Bookmark',
    threadsCount: 8,
    order: 5
  }
];

export const tags: Tag[] = [
  { id: 't1', name: 'Design', slug: 'design', color: '#9b87f5' },
  { id: 't2', name: 'Développement', slug: 'developpement', color: '#64B5F6' },
  { id: 't3', name: 'UX', slug: 'ux', color: '#FFB74D' },
  { id: 't4', name: 'Technologie', slug: 'technologie', color: '#4DB6AC' },
  { id: 't5', name: 'Carrière', slug: 'carriere', color: '#E57373' },
  { id: 't6', name: 'Débutant', slug: 'debutant', color: '#81C784' },
  { id: 't7', name: 'Question', slug: 'question', color: '#FF8A65' },
  { id: 't8', name: 'Débat', slug: 'debat', color: '#9575CD' }
];

export const threads: Thread[] = [
  {
    id: 'th1',
    title: 'Comment améliorer l\'expérience utilisateur de votre application ?',
    content: `<p>Bonjour à tous,</p>
    <p>Je travaille actuellement sur une application mobile et je cherche des conseils pour améliorer son expérience utilisateur. J'ai remarqué que certains parcours utilisateurs sont complexes et peuvent décourager les nouveaux utilisateurs.</p>
    <p>Quelles sont vos meilleures pratiques pour simplifier l'UX tout en gardant des fonctionnalités complètes ? Comment équilibrez-vous simplicité et richesse fonctionnelle ?</p>
    <p>Merci d'avance pour vos retours !</p>`,
    excerpt: 'Je travaille sur une application et je cherche des conseils pour améliorer l\'UX. Quelles sont vos meilleures pratiques ?',
    categoryId: 'c2',
    authorId: 'u3',
    createdAt: '2023-09-13T14:30:00Z',
    updatedAt: '2023-09-13T14:30:00Z',
    viewCount: 142,
    commentCount: 24,
    votes: 18,
    isPinned: false,
    isLocked: false,
    isHot: true,
    tags: ['t1', 't3']
  },
  {
    id: 'th2',
    title: 'Les tendances technologiques à suivre en 2023',
    content: `<p>Salut la communauté,</p>
    <p>Avec l'évolution rapide du secteur technologique, il est parfois difficile de savoir sur quelles technologies se concentrer. J'aimerais avoir vos avis sur les domaines qui vous semblent prometteurs pour cette année.</p>
    <p>IA ? Web3 ? Edge computing ? Qu'est-ce qui selon vous va vraiment transformer notre façon de travailler ?</p>
    <p>Je suis particulièrement intéressé par vos expériences concrètes avec ces technologies.</p>`,
    excerpt: 'Quelles sont les technologies qui vont émerger cette année ? J\'aimerais avoir vos avis sur les domaines à surveiller.',
    categoryId: 'c4',
    authorId: 'u2',
    createdAt: '2023-09-13T10:15:00Z',
    updatedAt: '2023-09-13T10:15:00Z',
    viewCount: 89,
    commentCount: 13,
    votes: 7,
    isPinned: false,
    isLocked: false,
    isHot: false,
    tags: ['t4', 't8']
  },
  {
    id: 'th3',
    title: 'Comment obtenir un premier emploi en développement web ?',
    content: `<p>Bonjour tout le monde,</p>
    <p>Je viens de terminer ma formation en développement web (HTML, CSS, JavaScript, React) et je cherche activement mon premier emploi dans ce domaine.</p>
    <p>Malgré quelques projets personnels, j'ai du mal à attirer l'attention des recruteurs. Quels conseils donneriez-vous à un développeur junior pour se démarquer ? Portfolio, contributions open-source, réseautage... J'aimerais connaître vos parcours et vos recommandations.</p>
    <p>Merci beaucoup !</p>`,
    excerpt: 'Je viens de terminer ma formation et je cherche des conseils pour décrocher mon premier poste de développeur web.',
    categoryId: 'c1',
    authorId: 'u5',
    createdAt: '2023-09-12T08:45:00Z',
    updatedAt: '2023-09-12T08:45:00Z',
    viewCount: 214,
    commentCount: 31,
    votes: 22,
    isPinned: false,
    isLocked: false,
    isHot: false,
    tags: ['t2', 't5', 't6', 't7']
  },
  {
    id: 'th4',
    title: 'Débat : React vs Vue vs Angular',
    content: `<p>Bonjour à tous,</p>
    <p>Développeur depuis quelques années, j'hésite à me spécialiser davantage dans un framework front-end spécifique. Après avoir touché à plusieurs d'entre eux, j'aimerais connaître vos opinions.</p>
    <p>Quel framework JavaScript préférez-vous entre React, Vue et Angular ? Pourquoi ? Dans quels contextes l'un serait plus adapté que les autres ?</p>
    <p>Je suis curieux de connaître vos expériences professionnelles et vos arguments techniques.</p>`,
    excerpt: 'Quel framework JavaScript préférez-vous et pourquoi ? J\'hésite à me spécialiser et j\'aimerais avoir vos retours d\'expérience.',
    categoryId: 'c2',
    authorId: 'u4',
    createdAt: '2023-09-11T16:20:00Z',
    updatedAt: '2023-09-11T16:20:00Z',
    viewCount: 325,
    commentCount: 47,
    votes: 15,
    isPinned: false,
    isLocked: false,
    isHot: false,
    tags: ['t2', 't8']
  },
  {
    id: 'th5',
    title: 'L\'importance de l\'accessibilité dans le développement web',
    content: `<p>Chers collègues développeurs,</p>
    <p>Je souhaite aborder un sujet qui me tient à cœur : l'accessibilité web. Trop souvent négligée dans les projets, elle est pourtant essentielle pour garantir l'accès à l'information pour tous.</p>
    <p>Quelles pratiques intégrez-vous dans votre workflow pour assurer une bonne accessibilité ? Quels outils utilisez-vous pour tester vos sites et applications ?</p>
    <p>Partageons nos connaissances pour améliorer collectivement nos pratiques.</p>`,
    excerpt: 'L\'accessibilité web est souvent négligée mais essentielle. Quelles pratiques et quels outils utilisez-vous pour garantir des sites accessibles ?',
    categoryId: 'c1',
    authorId: 'u6',
    createdAt: '2023-09-10T13:10:00Z',
    updatedAt: '2023-09-10T13:10:00Z',
    viewCount: 178,
    commentCount: 19,
    votes: 28,
    isPinned: true,
    isLocked: false,
    isHot: true,
    tags: ['t2', 't1']
  },
  {
    id: 'th6',
    title: 'Bienvenue sur le forum !',
    content: `<p>Bienvenue à tous sur notre nouveau forum dédié aux discussions technologiques !</p>
    <p>Ce forum a été créé pour permettre à notre communauté d'échanger sur tous les sujets liés au développement, au design, et aux nouvelles technologies.</p>
    <p>N'hésitez pas à vous présenter dans les commentaires et à suggérer des améliorations pour cette plateforme.</p>
    <p>Bons échanges à tous !</p>`,
    excerpt: 'Bienvenue sur notre nouveau forum technologique ! Présentez-vous et commencez à échanger avec la communauté.',
    categoryId: 'c1',
    authorId: 'u1',
    createdAt: '2023-09-01T09:00:00Z',
    updatedAt: '2023-09-01T09:00:00Z',
    viewCount: 430,
    commentCount: 52,
    votes: 35,
    isPinned: true,
    isLocked: false,
    isHot: false,
    tags: ['t1']
  },
  {
    id: 'th7',
    title: 'Design UX : les erreurs à éviter',
    content: `<p>Bonjour à tous,</p>
    <p>En tant que designer UX, j'ai souvent remarqué les mêmes erreurs qui reviennent dans différents projets. Je souhaite partager quelques observations qui pourraient vous aider à améliorer vos interfaces.</p>
    <p>Parmi les erreurs les plus courantes : surcharge cognitive, manque de cohérence, contraste insuffisant, absence de feedback...</p>
    <p>Quelles sont les erreurs que vous rencontrez fréquemment ? Comment les avez-vous surmontées ?</p>`,
    excerpt: 'Quelles sont les erreurs de design UX les plus courantes ? Partagez vos expériences et solutions pour améliorer vos interfaces.',
    categoryId: 'c2',
    authorId: 'u7',
    createdAt: '2023-09-08T11:25:00Z',
    updatedAt: '2023-09-08T11:25:00Z',
    viewCount: 156,
    commentCount: 27,
    votes: 19,
    isPinned: false,
    isLocked: false,
    isHot: false,
    tags: ['t1', 't3']
  },
  {
    id: 'th8',
    title: 'Développement : passez au niveau supérieur avec ces astuces',
    content: `<p>Hello les développeurs,</p>
    <p>Après plusieurs années dans le métier, j'ai accumulé pas mal d'astuces qui m'ont permis d'améliorer ma productivité et la qualité de mon code.</p>
    <p>Je voulais partager avec vous quelques conseils : utilisation avancée du terminal, raccourcis IDE, automatisation, patterns de conception utiles au quotidien...</p>
    <p>Et vous, quelles sont vos astuces préférées qui ont changé votre façon de coder ?</p>`,
    excerpt: 'Partagez vos astuces de développement pour gagner en productivité et améliorer la qualité de votre code.',
    categoryId: 'c3',
    authorId: 'u2',
    createdAt: '2023-09-07T15:40:00Z',
    updatedAt: '2023-09-07T15:40:00Z',
    viewCount: 203,
    commentCount: 33,
    votes: 26,
    isPinned: false,
    isLocked: false,
    isHot: true,
    tags: ['t2']
  }
];

export const comments: Comment[] = [
  {
    id: 'c1',
    content: 'L\'UX est primordiale pour fidéliser vos utilisateurs. Je vous conseille de commencer par une analyse des points de friction dans votre parcours utilisateur actuel.',
    threadId: 'th1',
    authorId: 'u1',
    createdAt: '2023-09-13T15:30:00Z',
    updatedAt: '2023-09-13T15:30:00Z',
    votes: 12
  },
  {
    id: 'c2',
    content: 'Merci Sophie ! Avez-vous des outils à recommander pour cette analyse ?',
    threadId: 'th1',
    authorId: 'u3',
    parentId: 'c1',
    createdAt: '2023-09-13T15:45:00Z',
    updatedAt: '2023-09-13T15:45:00Z',
    votes: 3
  },
  {
    id: 'c3',
    content: 'Bien sûr ! Hotjar est excellent pour les heatmaps et les enregistrements de session. UserTesting est également très utile pour des tests avec de vrais utilisateurs.',
    threadId: 'th1',
    authorId: 'u1',
    parentId: 'c2',
    createdAt: '2023-09-13T16:00:00Z',
    updatedAt: '2023-09-13T16:00:00Z',
    votes: 5
  },
  {
    id: 'c4',
    content: 'Je confirme les recommandations de Sophie. J\'ajouterais aussi Maze pour des tests rapides de prototypes.',
    threadId: 'th1',
    authorId: 'u7',
    parentId: 'c2',
    createdAt: '2023-09-13T16:20:00Z',
    updatedAt: '2023-09-13T16:20:00Z',
    votes: 2
  },
  {
    id: 'c5',
    content: 'N\'oubliez pas l\'accessibilité ! C\'est souvent négligé mais c\'est essentiel pour une bonne UX inclusive.',
    threadId: 'th1',
    authorId: 'u6',
    createdAt: '2023-09-13T15:30:00Z',
    updatedAt: '2023-09-13T15:30:00Z',
    votes: 8
  },
  {
    id: 'c6',
    content: 'Pour moi, 2023 est l\'année de l\'IA générative. Les modèles comme GPT-4 et DALL-E révolutionnent déjà de nombreux secteurs.',
    threadId: 'th2',
    authorId: 'u4',
    createdAt: '2023-09-13T11:05:00Z',
    updatedAt: '2023-09-13T11:05:00Z',
    votes: 4
  }
];

export const userFavorites: UserFavorite[] = [
  {
    id: 'f1',
    userId: 'u3',
    targetType: 'thread',
    targetId: 'th6',
    createdAt: '2023-09-02T10:15:00Z'
  },
  {
    id: 'f2',
    userId: 'u3',
    targetType: 'thread',
    targetId: 'th7',
    createdAt: '2023-09-09T08:30:00Z'
  },
  {
    id: 'f3',
    userId: 'u3',
    targetType: 'thread',
    targetId: 'th8',
    createdAt: '2023-09-07T16:45:00Z'
  }
];

// Fonctions utilitaires pour récupérer les données
export const getCategoryThreads = (categoryId: string) => {
  return threads.filter(thread => thread.categoryId === categoryId);
};

export const getThreadComments = (threadId: string) => {
  return comments.filter(comment => comment.threadId === threadId);
};

export const getUserThreads = (userId: string) => {
  return threads.filter(thread => thread.authorId === userId);
};

export const getUserFavoriteThreads = (userId: string) => {
  const favoriteIds = userFavorites
    .filter(fav => fav.userId === userId && fav.targetType === 'thread')
    .map(fav => fav.targetId);
  
  return threads.filter(thread => favoriteIds.includes(thread.id));
};

export const getHotThreads = () => {
  return threads.filter(thread => thread.isHot);
};

export const getTrendingThreads = () => {
  // Simuler les threads tendances en prenant ceux avec le plus de vues récentes
  return [...threads].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
};

export const getPopularThreads = () => {
  // Simuler les threads populaires en prenant ceux avec le plus de votes
  return [...threads].sort((a, b) => b.votes - a.votes).slice(0, 5);
};

export const getThreadById = (threadId: string) => {
  return threads.find(thread => thread.id === threadId);
};

export const getUserById = (userId: string) => {
  return users.find(user => user.id === userId);
};

export const getCategoryById = (categoryId: string) => {
  return categories.find(category => category.id === categoryId);
};
