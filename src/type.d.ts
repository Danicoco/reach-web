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
    "title": string;
    "limit": number;
    "mediaCategoriesIds": number[]
}

interface IStore {
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
