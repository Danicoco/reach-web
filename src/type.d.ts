interface DefaultAttributes {
  id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IAdmin extends DefaultAttributes {
  email: string;
  fullName: string;
  password: string;
  isActive: boolean;
}

interface IMedia {
  coverPicture: string;
  duration: number;
  hasAdultActivity: boolean;
  hasStreamed: boolean;
  id: number;
  isFavorite: boolean;
  isSubscribed: boolean;
  owner: string;
  platform: string;
  profilePicture: string;
  itemId: string;
  title: string;
  totalNoStreams: number;
  totalSubscribers: number;
  type: "video" | "audio";
  viewTime: number;
}

interface IUser extends DefaultAttributes {
  otp: string;
  meta: Meta;
  dob: string;
  email: string;
  verifiedAt: Date;
  password: string;
  otpExpiredAt: Date;
  accountType: string;
  phoneNumber: string;
  countryCode: string;
  isVerified: boolean;
}

interface IProfile {
  profile: {
    id: number;
    name: string;
    userName: string;
    email: email;
    bio: string;
    DeletedAt: null;
    authStrategy: "local" | "google";
    created_at: string;
    dob: string;
    flaggedReason: string;
    interests: string[];
    isFlagged: boolean;
    isVerified: boolean;
    last_active: string;
    phone: string;
    points: string | null;
    profilePicture: string;
    referral_code: string;
    reffered_by: number;
    role: "user" | "admin";
    streams: string | null;
    subscribers: number | null;
    wallet: {
      DeletedAt: string | null;
      created_at: string;
      id: number;
      initiatedTransactions: string;
      receivedTransactions: string;
      updated_at: string;
      user: null;
      userId: number;
      walletBalance: number;
      walletPreviousBalance: number;
      walletType: string;
      walletTypeId: number;
    }[];
  };
  totalSubscribed: number;
  totalSubscribers: number;
  totalUploads: number;
}

type Asset = {
  title: string;
  limit: number;
  mediaCategoriesIds: number[];
};

type ISpotifyTrack = {
  album: {
    album_type: string;
    artists: { name: string; id: string }[];
    available_markets: string[];
    external_urls: { id: string };
    href: string;
    images: [{ url: string; height }];
  };
  artists: { name: string; id: string }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track" | "artist";
  uri: string;
};

type IVimeoTrack = {
  app: string;
  categories: string[];
  content_rating: string[];
  content_rating_class: string;
  created_time: Date;
  description: string;
  duration: number;
  embed: { html: string; badges: string; interactive: boolean };
  has_audio: boolean;
  height: number;
  is_playable: boolean;
  language: string;
  license: string;
  link: string;
  metadata: {
    connections: string;
    interactions: string;
    is_vimeo_create: boolean;
    is_screen_record: boolean;
  };
  modified_time: Date;
  name: string;
  pictures: {
    uri: string;
    active: boolean;
    type: string;
    base_link: string;
    sizes: object[];
  };
  play: { status: string };
  player_embed_url: string;
  privacy: {
    view: string;
    embed: string;
    download: boolean;
    add: boolean;
    comments: string;
  };
  rating_mod_locked: boolean;
  release_time: Date;
  resource_key: string;
  stats: { plays: string };
  status: string;
  tags: string[];
  transcode: string;
  type: string;
  upload: string;
  uploader: any;
  uri: string;
  user: {
    uri: string;
    name: string;
    link: string;
    capabilities: any;
    location: string;
  };
  width: number;
};

type IYouTubeTrack = {
  etag: string;
  id: { kind: string; videoId: string };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: Date;
    publishedAt: Date;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
  };
};

interface IStore {
  uploadType: "video" | "audio" | "blog";
  chatMessage: string;
  fromTrending: boolean;
  voteSelection: { reference: string; voteType: string };
  pendingWeeklyAnswer: { topicName: string; link: string };
  setChatMessage: (msg: string) => void;
  setOnboarding: (e: { name: string; value: string }) => void;
  setWeeklyQuiz: (e: { name: string; value: string }) => void;
  onboarding: any;
  weeklyQuiz: any[];
  modal: { open: boolean; type: string };
  slider: { show: boolean; id: string };
}
type TopicStatus = "draft" | "scheduled" | "published" | "completed";

interface ITopic extends DefaultAttributes {
  endDate: Date;
  title: string;
  image: string;
  adminId: string;
  startDate: Date;
  category: string;
  hasStory: boolean;
  questionId: string;
  status: TopicStatus;
  hasAnswered: boolean;
}

type DashboardData = {
  storiesNumber: number;
  currentTopic: ITopic[];
  completedTopics: ITopic[];
  comingSoonTopics: ITopic[];
  systemChatMessage: string;
};

interface IGallery extends DefaultAttributes {
  image: string;
  position: number;
}

type QuizResultMeta = {
  question: string;
  answer: string;
};

interface IQuizResult extends DefaultAttributes {
  userId: string;
  quizId: string;
  topicId: string;
  tags: string[];
  feedback?: string;
  meta: QuizResultMeta[];
}

interface IFeedback extends DefaultAttributes {
  userId: string;
  message: string;
}

type ConfigMeta = {
  question: string;
  identifier: string;
  multiselect: boolean;
  answerType:
    | "select"
    | "input"
    | "textarea"
    | "calender"
    | "dropdown"
    | "tag"
    | "checkbox"
    | "tag-onboarding"
    | "search"
    | "address"
    | "textarea";
  subQuestion: string;
  list: Array<{ name: string; desc: string }>;
  triggerValue: string;
  options: string[];
};

interface IVoteTopic extends DefaultAttributes {
  title: string;
  userId: string;
  isVotingTopic: boolean;
  topicVotedId: string;
}

interface IQuiz extends DefaultAttributes {
  tags: string[];
  topicId: string;
  meta: ConfigMeta;
  nextTopic: NextTopic[];
}

type NextTopic = {
  name: string;
  numberOfVoters: number;
  voters: {
    date: Date;
    userId: string;
  };
};

interface IStories extends DefaultAttributes {
  image: string;
  color: string;
  header: string;
  userId: string;
  quizId: string;
  position: string;
  topicId: string;
  promptId: string;
  approvedAt?: string;
  status: Omit<TopicStatus, "scheduled">;
  contents: Array<string>;
}

type SendMessage = {
  message: string;
  systemMessage: string;
  instruction: string;
  isPlayground: boolean;
  isFirstMessage: boolean;
  sessionId: string;
  previousMessages: Array<{ role: string; content: string }> | [];
};
