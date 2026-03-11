export interface User {
    _id: string;
    avatar: string;
    country: string;
    createdAt: string;
    email: string;
    forYouLanguage: string[];
    invite_org_ids: string[];
    isPlanActive: boolean;
    isSendFreeTrialMail: boolean;
    lastLoginTime: number;
    lessonId: string[];
    name: string;
    notificationTokens: string[];
    org_ids: string[];
    otp: string;
    otpExpire: string;
    otpVerified: boolean;
    password: string;
    phone: string;
    province: string;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    role: string;
    subscription: boolean;
    __v: number;
}
