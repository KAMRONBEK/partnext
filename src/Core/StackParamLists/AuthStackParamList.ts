export type AuthStackParamList = {
  AuthenticationStack: undefined;
  MainScreen: undefined;
  Registration: undefined;
  LoginScreen: undefined;
  PhoneValidation: { phoneNumber: String, countryCode: String };
  OnboardingToolTip: { user_category: any };
  EditILookFor: { user_category: String };
  OnboardingIntrest: { user_category: any, partner_category: any };
  OnBoarding_5: { partner_intersts: any, user_category: any, partner_category: any, user_intersts: any };
  GrowUnlocked: undefined;
  RegistrationComplete: undefined;
  AppStack: undefined;
  PartnerInterestScreen: { user_intersts: any, user_category: any, partner_category: any }
  OnBoarding_6: { current_position: any, organization: any, partnership_reason: any, about_us: any, experience: any, linkedin_url: any, partner_intersts: any, user_category: any, partner_category: any, user_intersts: any }
};