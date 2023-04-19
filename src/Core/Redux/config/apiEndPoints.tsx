// Auth
export const REGISTER_API_CALL = "auth/sign-up/"
export const LOGIN_API_CALL = "auth/login/"
export const LOGOUT_API_CALL = 'auth/logout/';
export const OTP_API_CALL = "auth/verify-otp/"
export const WHAT_I_AM_CALL = "category/get-all-user-category/"
export const WHAT_I_AM_LOOK_CALL = "category/get-all-partner-category/"
export const GET_YOUR_INTEREST_CALL = "intersts/get-all-intersts/"
export const UPLOAD_IMAGE_CALL = "upload/media/"
export const DELETE_IMAGE_CALL = "delete-media/"
export const DELETE_USER_ACCOUNT='auth/delete-account/'

// Profile
export const GET_PROFILE_CALL = "user/get-user-details-by-token/"
export const GET_USER_BY_ID = "user/get-user-by-id/"
export const UPDATE_PROFILE_CALL = "user/update-user-details/"
export const GET_ALL_SUBSCRIPTION_CALL = "subscription/get-all-list/"
export const PURCHASE_SUBSCRIPTION_CALL = "subscription/purchase-subscription/"
export const GET_SUBSCRIPTION_STATUS_CALL = "user/get-subscription-status/"
export const GET_PENDING_REQUST_CALL = "connection/get-pending-request/"

// Chat
export const GET_CHAT_LIST_CALL = "message/inobx-pagination-listing/"
export const GET_CHAT_DETAIL_LIST_CALL = "message/conversation-pagination-list/"
export const REPORT_CALL = "user/report-user/"
export const SEND_MSG_CALL = "message/send-message/"
export const DELETE_CHAT_ROOM="message/delete-chat-room/"


// Home
export const GET_FRIEND_SUGGESTION_CALL = "connection/get-friend-suggestion/"
export const UPDATE_LEFT_RIGHT_CALL = "connection/right-left-swipe/"

//connection
export const DELETE_CONNECTION_CALL="connection/delete-connection/"