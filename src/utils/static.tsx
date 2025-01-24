export const onboardingData = [
  {
    question: "Name",
    answerType: "input",
    identifier: "name",
    multiselect: false,
  },
  {
    question: "Date of Birth",
    answerType: "calender",
    identifier: "dob",
    multiselect: false,
  },
  {
    question: "Gender",
    answerType: "select",
    identifier: "gender",
    multiselect: false,
    options: ["Male", "Female", "Non Binary", "Prefer not to say"],
  },
  {
    question: "Ethnicity",
    answerType: "select",
    identifier: "ethnicity",
    multiselect: false,
    options: [
      "Caucasin/White",
      "African/Black",
      "Asian",
      "Native American/American Indian/Indigenou",
      "Pacific Islander",
      "Hispanic/Latino",
    ],
  },
  {
    question: "Which of the below best describes your current job?",
    answerType: "dropdown",
    identifier: "currentJob",
    multiselect: false,
    options: ["Tech"],
  },
  {
    question: "Number of years in the workforce",
    answerType: "dropdown",
    identifier: "workforce",
    multiselect: false,
    min: 1,
    max: 10,
    options: ["1-3 years", "4-6 years"],
  },
  {
    question: "Which best describes you?",
    answerType: "tag-onboarding",
    identifier: "whoYouAre",
    multiselect: false,
    options: [
      "Adventurous and Outgoing",
      "Analytical and detail-oriented",
      "Creative and Imaginative",
      "Patient and resilient",
      "Sociable and friendly",
      "Visionary and forward-thinking",
      "Others",
    ],
  },
  {
    question: "What things really interest you?",
    answerType: "search",
    identifier: "interest",
    multiselect: true,
    options: [
      "Teachnology and gadget",
      "Reading and literature",
      "Art and creativity",
      "Sport and physical activities",
      "Traveling and exploring new places",
      "Science and innovation",
      "Gaming and video games",
    ],
  },
  {
    question: "Where do you currently call home?",
    answerType: "address",
    identifier: "address",
    multiselect: false,
  },
];

export const insights = [
  {
    title: "Fitness",
    createdAt: new Date(),
  },
  {
    title: "Fitness",
    createdAt: new Date(),
    storyId: "1",
  },
  {
    title: "Fitness",
    storyId: "1",
  },
];

export const featureData = [
  {
    header: "Do you use Insta, Tik Tok or Reddit for advice?",
    bgColor: "#1d2d50",
    message: (
      <>
        <p className="text-center text-white" style={{ fontSize: "20px" }}>
          How about <span className="text-[#DA8E6B]">10X better</span>
        </p>
        <p className="text-center text-white" style={{ fontSize: "20px" }}>
          How about{" "}
          <span className="text-[#DA8E6B]">100X more personalized</span>
        </p>
        <p className="text-center text-white" style={{ fontSize: "20px" }}>
          How about{" "}
          <span className="text-[#DA8E6B]">made for NYU students</span>
        </p>
      </>
    ),
  },
  {
    header: "That's Cha Cha!",
    bgColor: "#1d2d50",
    message: (
      <>
        <p className="text-white text-center">
          The best source of support for students at NYU. Designed to make your
          life easier and help you have a great time!
        </p>
      </>
    ),
  },
  {
    header: "Joining is quick!",
    bgColor: "#1d2d50",
    message: (
      <>
        <p className="text-white text-center">
          You can join in 60 seconds! This is{" "}
          <span className="text-[#DA8E6B]">
            faster than the average subway wait time.
          </span>
        </p>
      </>
    ),
  },
  {
    header: "Privacy is everything",
    bgColor: "#1d2d50",
    message: (
      <>
        <p className="text-white text-center">
          All the information you provide is{" "}
          <span className="text-[#DA8E6B]">
            immediately anonymized & encrypted.
          </span>
        </p>
      </>
    ),
  },
  {
    header: "Join Cha Cha!\n Make your life easier.",
    bgColor: "#1d2d50",
    message: (
      <>
        <p className="text-white text-center">
          Check out our instagram for demos of Cha Cha in action.
        </p>
      </>
    ),
  },
];

export const userMeta: { [key: string]: string } = {
  Name: "Aderemi Dare",
  "Phone Number": "+2348058212753",
  "Email Address": "richardjohn740@gmail.com",
  "Date of birth": "11/12/2023",
  Gender: "Male",
};

export const tags = ["Age", "Gender", "City", "Profession", "Race"];

export const invitationContent = {
  email: {
    subject: "Hey! Have you heard about Cha Cha yet?",
    body: `It's a fun new approach for personal growth, you can join here: `,
    url: import.meta.env.VITE_URL,
    separator: "",
  },
  facebook: {
    quote: `Hey! Have you heard about Cha Cha yet? It's a fun new approach for personal growth, you can join here: `,
    hashtag: "#chacha #work #jointherevolution",
    url: import.meta.env.VITE_URL,
  },
  linkedin: {
    title: "Hey there! Have you seen this new web app?",
    summary: `Hey! Have you heard about Cha Cha yet? It's a fun new approach for personal growth, you can join here: `,
    source: "Cha Cha",
    url: import.meta.env.VITE_URL,
  },
  twitter: {
    title: `Hey! Have you heard about Cha Cha yet? It's a fun new approach for personal growth, you can join here: `,
    via: "Cha Cha",
    hashtags: ["Cha Cha", "movement"],
    url: import.meta.env.VITE_URL,
  },
  whatsapp: {
    title: `Hey! Have you heard about Cha Cha yet? It's a fun new approach for personal growth, you can join here: `,
    url: import.meta.env.VITE_URL,
    separator: "",
  },
};

export const suggestedTopics = {
  all: {
    everyone: [
      "How can I find affordable housing options near campus?",
      "What are the best strategies for managing time between classes, work, and social life?",
      "Where can I find quiet study spaces or libraries suitable for college students in Manhattan?",
      "How can I make the most of my student discounts in New York City for entertainment and transportation?",
      "What are some effective ways to network with professionals in NYC?",
      "How can I efficiently use the NYC public transportation system as a college student?",
      "What unique volunteer opportunities or internships are available for students in NYC?",
      "How can I stay safe while exploring New York City, especially during late hours?",
      "What are the best ways to deal with homesickness while studying far from home in NYC?",
      "How can I maintain a healthy lifestyle with the busy schedule of a college student in NYC?",
      "What are some budget-friendly but healthy eating options around NYU?",
      "How can I effectively balance my coursework without getting overwhelmed?",
      "What are the best methods for creating and sticking to a budget as a NYU student?",
      "How can I find student clubs or organizations that align with my interests?",
      "How can I improve my study habits to excel academically in a competitive environment like NYC?",
      "How can I cope with the pressure of academic and career expectations in a high-paced city like New York?",
      "How can I effectively use digital tools and resources for better academic performance?",
      "What are some tips for managing the stress of college life while taking advantage of NYC's opportunities?",
      "Where are the best downtown restaurants for large groups?",
    ],
  },
  hobby: {
    "fitness & wellness": [
      "What are some effective daily fitness routines I can start at home?",
    ],
    "tech & innovation": [
      "How can I stay updated on the latest tech trends and innovations?",
    ],
    "travelling & adventure": [
      "What are essential tips for planning a budget-friendly adventure trip?",
    ],
    "restaurants & cooking": [
      "What are some simple recipes I can try to improve my cooking skills?",
    ],
    "reading & literature": [
      "How can I find book recommendations that match my interests?",
    ],
    "movies & series": [
      "What are some must-watch movies or series that can broaden my horizons?",
    ],
    "volunteering & helping": [
      "How can I find local volunteering opportunities that match my skills?",
    ],
    "fashion & beauty": [
      "What are some sustainable fashion practices I can adopt?",
    ],
    "trendy bars & events": [
      "How can I discover local events or trendy spots in my area?",
    ],
    "dancing & clubbing": ["What are some ways to learn dancing at home?"],
    "sports & games": [
      "How can I stay active and engaged through sports and games indoors?",
    ],
    "writing & blogging": [
      "What are some tips for starting my own blog or writing project?",
    ],
    "yoga & meditation": [
      "What are beginner-friendly yoga poses or meditation techniques?",
    ],
    "public speaking & debate": [
      "How can I improve my public speaking or debating skills on my own?",
    ],
    "art or cinematography": [
      "How can I learn more about art and cinematography from home?",
    ],
    "music & theater": [
      "What are some ways to explore music and theater from different cultures?",
    ],
  },
  "current challenges": {
    "stress & burnout": [
      "How can I manage stress during finals week?",
      "How can I establish a daily relaxation routine to avoid burnout?",
    ],
    "financial wellness": [
      "How can I manage my finances more effectively as a college student?",
      "How can I learn about managing loans and expenses wisely?",
    ],
    "work-life balance": [
      "How can I balance my academics, work, and social life effectively?",
      "What hobbies can I engage in for relaxation that fit into my busy schedule?",
    ],
    "time management": [
      "How can I improve my time management to better handle my coursework?",
      "What planning tools can I use to organize my study and free time?",
    ],
    "mental wellbeing": [
      "How can I find mental health support and resources when I need them?",
      "How does incorporating mindfulness into my routine benefit my daily life?",
    ],
    "academic competition": [
      "Where can I find resources to help manage academic stress?",
      "How can I stay motivated and positive in a competitive academic environment?",
    ],
    "adapting to nyc": [
      "How can I adapt to living in NYC as a new student?",
      "What are some safe and affordable ways to explore NYC?",
    ],
    "nourishing friendships": [
      "How can I meet new people and make lasting friendships at college?",
      "What activities or groups can help me foster new friendships?",
    ],
    "career progression": [
      "How should I be thinking about internships while in college?",
      "What steps can I take to gain industry experience during my studies?",
    ],
    "physical health": [
      "How can I maintain my physical health with a busy college schedule?",
      "What campus fitness programs can I participate in to stay active?",
    ],
    "personal goals & identity": [
      "How can I explore and define my personal goals while at university?",
      "What resources are available for my personal development and self-discovery?",
    ],
    "housing and living conditions": [
      "How can I find suitable housing that fits my budget and needs?",
      "What should I look for in student housing to ensure a good study environment?",
    ],
    "healthy, budget eating": [
      "Where can I find affordable but healthy eating options near campus?",
      "What are some budget-friendly cooking tips that cater to a student's lifestyle?",
    ],
    "dating & finding a partner": [
      "How can I meet potential partners and balance dating with my studies?",
      "What are some tips for maintaining a healthy relationship while in college?",
    ],
    "screen time": [
      "How can I reduce my screen time to improve my focus and sleep quality?",
      "What are some screen-free activities I can engage in to relax?",
    ],
    "safety and security": [
      "How can I ensure my safety while exploring NYC, especially at night?",
      "What safety resources should I be aware of as a student in the city?",
    ],
    "cultural adjustment": [
      "How can I adjust to a new cultural environment while studying abroad in NYC?",
      "What support services can help me navigate cultural differences?",
    ],
  },
  interest: {
    "academic pursuits": [
      "How can I effectively organize a study group for challenging subjects?",
    ],
    "seeking employment (internship/part-time job)": [
      "What are key elements to include in my resume for internship applications?",
    ],
    "professional networking": [
      "How can I start building a professional network in my field of interest?",
    ],
    "financial stability": [
      "What are some effective budgeting strategies for college students?",
    ],
    "health & wellness": [
      "What simple at-home workouts can I do to stay healthy?",
    ],
    "personal growth": [
      "What podcasts or blogs can inspire personal development and new perspectives?",
    ],
    "community involvement": [
      "How can I get involved in community service projects in my area?",
    ],
    "leadership development": [
      "What are some ways to develop leadership skills outside of formal roles?",
    ],
    "social impact": ["How can I contribute to social causes I care about?"],
    "artistic expression": [
      "How can I share my art or performances with a wider audience?",
    ],
    "family & relationships": [
      "What activities can strengthen my connections with family and friends?",
    ],
    "leisure & relaxation": [
      "What are some recommended local spots for relaxation and leisure?",
    ],
    "travel & adventure": [
      "What are essential travel tips for students planning their next adventure?",
    ],
    "launching a business": [
      "What initial steps should I consider when thinking about starting a business?",
    ],
    "spiritual fulfillment": [
      "How can I explore different spiritual or philosophical paths?",
    ],
  },
  archetype: {
    "modern balancer": [
      "What daily habits can help maintain a healthy balance between study, work, and leisure?",
    ],
    "ambitious achiever": [
      "What are the key steps to setting and achieving higher academic and career goals?",
    ],
    "joyful explorer": [
      "How can you discover new hobbies and interests that enrich your college experience?",
    ],
  },
};

export const archetypes: Record<string, string> = {
  "modern balancer":
    "Focused on achieving a harmonious blend of career success and personal fulfillment.",
  "ambitious achiever":
    "Driven by a relentless pursuit of professional excellence and career milestones.",
  "joyful explorer":
    "Prioritizes enjoyment, exploration, relationships, and enriching life experiences.",
};

export const avatarList = [
  {
    asset: "female-a",
    path: `${import.meta.env.VITE_S3_URL}/female-a.svg`,
  },
  {
    asset: "female-b",
    path: `${import.meta.env.VITE_S3_URL}/female-b.svg`,
  },
  {
    asset: "female-c",
    path: `${import.meta.env.VITE_S3_URL}/female-c.svg`,
  },
  {
    asset: "female-d",
    path: `${import.meta.env.VITE_S3_URL}/female-d.svg`,
  },
  {
    asset: "female-e",
    path: `${import.meta.env.VITE_S3_URL}/female-e.svg`,
  },
  {
    asset: "female-f",
    path: `${import.meta.env.VITE_S3_URL}/female-f.svg`,
  },
  {
    asset: "male_a",
    path: `${import.meta.env.VITE_S3_URL}/male-a.svg`,
  },
  {
    asset: "male_b",
    path: `${import.meta.env.VITE_S3_URL}/male-b.svg`,
  },
  {
    asset: "male_c",
    path: `${import.meta.env.VITE_S3_URL}/male-c.svg`,
  },
  {
    asset: "male_d",
    path: `${import.meta.env.VITE_S3_URL}/male-d.svg`,
  },
  {
    asset: "male_e",
    path: `${import.meta.env.VITE_S3_URL}/male-e.svg`,
  },
  {
    asset: "male_f",
    path: `${import.meta.env.VITE_S3_URL}/male-f.svg`,
  },
];
