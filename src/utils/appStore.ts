import { create } from "zustand";

const useAppStore = create<IStore>((set, get: any) => ({
  uploadType: "audio",
  chatMessage: "",
  setChatMessage: (msg: string) => set({ chatMessage: msg }),
  onboarding: undefined,
  fromTrending: false,
  pendingWeeklyAnswer: { topicName: "", link: "" },
  voteSelection: { voteType: "", reference: "" },
  modal: { open: false, type: "" },
  slider: { show: false, id: "" },
  setOnboarding: (event: { name: string; value: string }) => {
    const { name, value } = event;
    const currentOnboardingValues = get().onboarding;
    return set({
      onboarding: {
        ...(currentOnboardingValues && { ...currentOnboardingValues }),
        [name]: value,
      },
    });
  },
  weeklyQuiz: [],
  setWeeklyQuiz: (event: { name: string; value: string }) => {
    const { name, value } = event;
    const currentweeklyQuiz = get().weeklyQuiz;
    const existingIndex = currentweeklyQuiz.findIndex(
      (item: { question: string }) => item.question === name
    );

    let data;
    if (existingIndex !== -1) {
      const updatedWeeklyQuiz = [...currentweeklyQuiz];
      updatedWeeklyQuiz[existingIndex] = { question: name, answer: value };
      data = updatedWeeklyQuiz;
    } else {
      data = [...currentweeklyQuiz, { question: name, answer: value }];
    }
    return set({
      weeklyQuiz: data,
    });
  },
}));

export default useAppStore;
