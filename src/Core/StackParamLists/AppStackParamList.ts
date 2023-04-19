export type AppStackParamList = {

  // Chat
  ChatStack: undefined;
  ChatScreen: undefined;
  AllChatListScreen: undefined;
  ChatDetailScreen: {
    userId: any,
    chatId: any,
    name: any,
    profileImage: any
  };
  ReportScreen: {
    userId: any
  };
  ReportThankyouScreen: undefined;

  HomeStack: undefined;
  HomeScreen: undefined;


  // Grow
  GrowScreen: undefined;
  GrowStack: { screen: String };


  // Profile 
  ProfileStack: undefined;
  ProfileScreen: undefined;
  BeforeUpgradeScreen: undefined;
  AfterUpgradeScreen: undefined;
  EditProfileScreen: {
    id: any,
    userData: any,
    lookingForid: any,
    yourInterstsId: any,
    partnerInterstsId: any,
    userImagesId: any,
    image: any
  };
  EditWhatIam: {
    id: any,
    userData: any,
    lookingForid: any,
    yourInterstsId: any,
    partnerInterstsId: any,
    userImagesId: any
  };
  EditLookIam: {
    id: any,
    userData: any,
    lookingForid: any,
    yourInterstsId: any,
    partnerInterstsId: any,
    userImagesId: any
  };
  YourInterestScreen: {
    id: any,
    userData: any,
    lookingForid: any,
    yourInterstsId: any,
    partnerInterstsId: any,
    userImagesId: any
  };
  PartnerInterestScreen: {
    id: any,
    userData: any,
    lookingForid: any,
    yourInterstsId: any,
    partnerInterstsId: any,
    userImagesId: any
  };
  FeedbackScreen: undefined;
  FeedbackThankyouScreen: undefined;
  EditPhotos: {
    id: any,
    userData: any,
    lookingForid: any,
    yourInterstsId: any,
    partnerInterstsId: any,
    userImagesId: any,
    image: any
  };
  AuthStack: undefined;
};