// 🔹 Trạng thái khóa học
export enum CourseState {
  NEW = 1,
  HIGHEST_RATED = 2,
  BEST_SELLER = 3,
  NORMAL = 4,
  SALE = 5,
}

export enum PurchaseStatus {
  ACTIVATED = 'activated',
  PURCHASED_NOT_ACTIVATED = 'purchased_not_activated',
  NOT_PURCHASED = 'not_purchased',
}

// 🔹 Thời gian được vào học sau khi active code
export enum CourseAccessType {
  LIMITED = 1,
  LIFETIME = 2,
  EXPIRE_AT = 3,
}

// 🔹 Bài học (Lesson)
export enum LessonType {
  VIDEO = 0,
  DOCUMENT = 1,
  QUIZ = 2,
}

// Lesson access_type
export enum LessonAcessType {
  FREE = 1,
  PREVIEW = 2,
  PAID = 3,
}

// 🔹 Trạng thái khóa học của người dùng
export enum UserCourseStatus {
  ACTIVE = 1,
  COMPLETED = 2,
  RESERVED = 3,
}
export enum QuizType {
  LESSON_QUIZ = 1,
  COURSE_TEST = 2,
  FINAL_EXAM= 3,
}

// 🔹 Trạng thái đơn hàng
export enum OrderStatus {
  PENDING = 1,
  PAID = 2,
  CANCELLED = 3,
  FAILED = 4,
  PROCESSING = 5,
}

// 🔹 Phương thức thanh toán
export enum PaymentMethod {
  VNPAY = 1,
  MOMO = 2,
  QRCODE = 3,
}

// 🔹 Loại sản phẩm trong đơn hàng
export enum OrderItemType {
  COMBO = 1,
  COURSE = 2,
}

// 🔹 Trạng thái thanh toán
export enum PaymentStatus {
  PENDING = 1,
  PAID = 2,
  CANCELLED = 3,
  FAILED = 4,
}

// 🔹 Loại giảm giá
export enum DiscountType {
  PERCENT = 1,
  FIXED_AMOUNT = 2,
}

// 🔹 Loại áp dụng voucher
export enum VoucherApplicableType {
  ALL = 1,
  COURSE = 2,
  COMBO = 3,
}

// 🔹 Trạng thái voucher giảm giá
export enum VoucherStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  EXPIRED = 3,
}

// 🔹 Trạng thái học voucher
export enum ActiveCodeStatus {
  UNUSED = 1,
  USED = 2,
  EXPIRED = 3,
}

// 🔹 Trạng thái chung (dùng chung cho nhiều bảng)
export enum CommonStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  DELETED = 3,
}
export enum mSystem {
  CONTACT = 1,
  COMMUNITY = 2,
  KNOWLEDGE = 3,
  POLICY = 4,
  PROFILE = 5,
  TEACHERPROFILES = 6,
}

export enum ActiveCodeType {
  COMBO = 1,
  COURSE = 2,
}

export enum ComboType {
  NORMAL = 1,
  HOT = 2,
}

export enum NotificationType {
  SYSTEM = 1,
  REMINDER = 2,
  FEEDBACK = 3,
  USER_ACTION = 4,
  ADMIN_ACTION = 5,
  PROMOTION = 6,
  NEW_CONTENT = 7,
  COURSE_COMPLETE = 8,
  SOCIAL = 9,
  NOTICE = 10,
  REPORT = 11,
}

export enum NotificationStatus {
  UNREAD = 1,
  READ = 2,
  DISMISSED = 3,
}

export enum UserLessonProgressStatus {
  INCOMPLETE = 1,
  COMPLETE = 2,
}

export enum ReportType {
  VIDEO = 1,
  LESSON = 2,
  TECHNICAL = 3,
  OTHER = 4,
  COMMENT = 5,
}

export enum ReportCategory {
  // Video issues
  VIDEO_NOT_LOADING = 1,
  VIDEO_LAG = 2,
  VIDEO_AUDIO_SYNC = 3,
  VIDEO_QUALITY = 4,
  VIDEO_WRONG_CONTENT = 5,

  // Lesson issues
  CONTENT_ERROR = 6,
  GRAMMAR_ERROR = 7,
  DOCUMENT_ERROR = 8,
  EXERCISE_ERROR = 9,
  LINK_BROKEN = 10,

  // Technical issues
  PAGE_SLOW = 11,
  FEATURE_BROKEN = 12,
  MOBILE_ISSUE = 13,
  LOGIN_ISSUE = 14,

  // Other
  OTHER = 15,

  //Comment

  COMMENT_INAPPROPRIATE_CONTENT = 16,
  COMMENT_OFFENSIVE_LANGUAGE = 17,
  COMMENT_SPAM = 18,
  COMMENT_FALSE_INFORMATION = 19,
  COMMENT_COPYRIGHT_INFRINGEMENT = 20,
  COMMENT_OTHER = 21,
}

export enum ReportStatus {
  PENDING = 1,
  IN_REVIEW = 2,
  RESOLVED = 3,
  REJECTED = 4,
}

export enum ReportPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}
export enum UserType {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  USER = 'user',
}

export enum BannerImageType {
  Main = 1,
  Floating = 2,
  TitleDecor = 3,
  ButtonDecor = 4,
}
