// DEVELOPMENT

export const baseURL = "http://doodlebluelive.com";
export const authURL = `${baseURL}:2315/api/v1`;
export const adminURL = `${baseURL}:2316/api/v1`;
export const profileURL = `${baseURL}:2317/api/v1`;
export const orderURL = `${baseURL}:2318/api/v1`;
export const productURL = `${baseURL}:2319/api/v1`;
export const medPlanURL = `${baseURL}:2320/api/v1`;
export const notificationURL = `${baseURL}:2321/api/v1`;
export const cmsURL = `${baseURL}:2322/api/v1`;

// PRODUCTION

// export const baseURL = "https://api.mrmed.in";
// export const authURL = `${baseURL}/auth/api/v1`;
// export const adminURL = `${baseURL}/admin/api/v1`;
// export const profileURL = `${baseURL}/profiles/api/v1`;
// export const orderURL = `${baseURL}/orders/api/v1`;
// export const productURL = `${baseURL}/products/api/v1`;
// export const medPlanURL = `${baseURL}/medPlans/api/v1`;
// export const notificationURL = `${baseURL}/notification/api/v1`;
// export const cmsURL = `${baseURL}/cms/api/v1`;

export const endpoints = {
  dashboard: {
    GET_REVENUE: `${orderURL}/order/totalRevenue`,
    GET_DASHBOARD: `${orderURL}/order/dashboard`,
    GET_TOPSELLING: `${orderURL}/order/topSpecialityProduct`,
    GET_USERDATA: `${authURL}/user/total`,
  },
  staffsAndRoles: {
    ADD_ROLE: `${authURL}/roles`,
    UPDATE_ROLE: `${authURL}/roles`,
    DELTE_ROLE: `${authURL}/roles`,
    GET_ALL_ROLE: `${authURL}/roles?size=10`,
    GET_ROLE_BY_ID: `${authURL}/roles`,
    ADD_STAFF: `${authURL}/user/signup`,
    UPDATE_STAFF: `${authURL}/staff`,
    DELTE_STAFF: `${authURL}/staff`,
    GET_ALL_STAFF: `${authURL}/staff?size=10`,
    GET_STAFF_BY_ID: `${authURL}/staff`,
    ROLE_DROPDOWN: `${authURL}/roles/getRoleName`,
  },
  faq: {
    ADD_FAQ: `${adminURL}/faq`,
    UPDATE_FAQ: `${adminURL}/faq`,
    DELTE_FAQ: `${adminURL}/faq`,
    GET_ALL_FAQ: `${adminURL}/faq?size=20`,
    GET_FAQ_BY_ID: `${adminURL}/faq`,
    FAQ_PRIORITY: `${adminURL}/faq/updatePriority`,
    FAQ_DROPDOWN: `${adminURL}/faq/group`,
  },
  speciality: {
    ADD_SPECIALITY: `${productURL}/product/speciality`,
    UPDATE_SPECIALITY: `${productURL}/product/speciality`,
    DELTE_SPECIALITY: `${productURL}/product/speciality`,
    GET_ALL_SPECIALITY: `${productURL}/product/speciality`,
    GET_SPECIALITY_BY_ID: `${productURL}/product/speciality`,
    SPECIALITY_PRIORITY: `${productURL}/product/speciality/updatePriority`,
  },
  testimonial: {
    ADD_TESTIMONIAL: `${cmsURL}/cms/testimonial`,
    UPDATE_TESTIMONIAL: `${cmsURL}/cms/testimonial`,
    DELTE_TESTIMONIAL: `${cmsURL}/cms/testimonial`,
    GET_ALL_TESTIMONIAL: `${cmsURL}/cms/testimonial?size=20`,
    GET_TESTIMONIAL_BY_ID: `${cmsURL}/cms/testimonial`,
    TESTIMONIAL_PRIORITY: `${cmsURL}/cms/testimonial/updatePriority`,
    TESTIMONIAL_DROPDOWN: `${cmsURL}/cms/group`,
  },
  products: {
    ADD_PRODUCT: `${productURL}/product`,
    UPDATE_PRODUCT: `${productURL}/product`,
    GET_PRODUCT_BY_ID: `${productURL}/product`,
    GET_ALL_PRODUCT: `${productURL}/product`,
    SPECIALTIY_DROPDOWN: `${productURL}/product/getSpecialityName`,
    CONDITION_DROPDOWN: `${productURL}/product/getConditionName`,
    DELETE_PRODUCT: `${productURL}/product`,
    BULK_UPLOAD: `${productURL}/product/bulk`,
    SEARCH_PRODUCT: `${productURL}/product/getProductName`,
  },
  order: {
    GET_ORDER_BY_ID: `${orderURL}/order`,
    UPDATE_ORDER: `${orderURL}/order`,
    GET_ALL_ORDER: `${orderURL}/order/admin`,
    PAYMENT_DROPDOWN: `${orderURL}/order/paymentTypes`,
    CANCEL_ORDER: `${orderURL}/order/cancel`,
    UPDATE_DELIVERY: `${orderURL}/order/update/trackingDetails`,
    CREATE_ORDER: `${orderURL}/order`,
    USER_PRESCRIPTION: `${profileURL}/prescription/getAll`,
    ADD_PRESCRIPTION: `${profileURL}/prescription`,
    UPDATE_PRESCRIPTION: `${orderURL}/order/update/prescription`,
    GET_FEEDBACK_BY_ID: `${orderURL}/order/getOrderFeedback`,
  },
  auth: {
    GET_USER_DETAIL: `${authURL}/user/getUserById`,
    GET_USER_BY_ID: `${authURL}/user/admin`,
    UPDATE_USER: `${authURL}/user/updateAdmin`,
    CHANGE_PASSWORD: `${authURL}/user/changePasswordAdmin`,
    SIGN_IN: `${authURL}/user/signIn`,
    FORGOT_PASSWORD: `${authURL}/user/forgetPassword`,
    RESET_PASSWORD: `${authURL}/user/sendOtp`,
    VERIFY_OTP: `${authURL}/user/verifyOtpAdmin`,
    GET_ADDRESS: `${profileURL}/address/getPrimary`,
    UPDATE_ADDRESS: `${profileURL}/address/updatePrimary`,
  },
  banner: {
    ADD_BANNER: `${cmsURL}/cms/banner`,
    GET_BANNER_BY_ID: `${cmsURL}/cms/banner`,
    UPDATE_BANNER: `${cmsURL}/cms/banner`,
    DELETE_BANNER: `${cmsURL}/cms/banner`,
    GET_ALL_BANNER: `${cmsURL}/cms/banner?size=20`,
    BANNER_PRIORITY: `${cmsURL}/cms/banner/updatePriority`,
  },
  userData: {
    GET_ALL_USER_DATA: `${authURL}/user?size=10`,
    GET_USER_ORDERS: `${orderURL}/order/user`,
    CREATE_ADDRESS: `${profileURL}/address`,
    CHECK_PINCODE: `${orderURL}/order/pincode`,
    CREATE_USER: `${authURL}/user/admin/create`,
    UPDATE_USER: `${authURL}/user/updateUserById`,
  },
  pap: {
    GET_ALL_PAP: `${medPlanURL}/pap?size=10`,
    GET_PAP_BY_ID: `${medPlanURL}/pap`,
    GET_ALL_CARER: `${medPlanURL}/carer?size=10`,
    GET_CARER_BY_ID: `${medPlanURL}/carer`,
  },
  notification: {
    GET_ALL_NOTIFICATION: `${notificationURL}/notification?size=20`,
    UPDATE_NOTIFICATION: `${notificationURL}/notification`,
  },
  coupon: {
    ADD_COUPON: `${medPlanURL}/coupon`,
    UPDATE_COUPON: `${medPlanURL}/coupon`,
    DELTE_COUPON: `${medPlanURL}/coupon`,
    GET_ALL_COUPON: `${medPlanURL}/coupon?size=10`,
    GET_COUPON_BY_ID: `${medPlanURL}/coupon`,
    COUPON_DROPDOWN: `${medPlanURL}/coupon/group`,
  },
  blog: {
    ADD_BLOG: `${adminURL}/blog`,
    UPDATE_BLOG: `${adminURL}/blog`,
    DELTE_BLOG: `${adminURL}/blog`,
    GET_ALL_BLOG: `${adminURL}/blog?size=20`,
    GET_BLOG_BY_ID: `${adminURL}/blog`,
    BLOG_DROPDOWN: `${adminURL}/blog/group`,
    BLOG_CATEGORY: `${adminURL}/blog/category/list`,
    BLOG_PRIORITY: `${adminURL}/blog/updatePriority`,
    ADD_CATEGORY: `${adminURL}/blog/category`,
    UPDATE_CATEGORY: `${adminURL}/blog/category`,
    DELETE_CATEGORY: `${adminURL}/blog/category`,
    GET_ALL_CATEGORY: `${adminURL}/blog/category?size=10`,
    GET_CATEGORY_BY_ID: `${adminURL}/blog/category`,
  },
  importOrder: {
    UPDATE_IMPORT: `${medPlanURL}/import`,
    GET_ALL_IMPORT: `${medPlanURL}/import?size=10`,
    GET_IMPORT_BY_ID: `${medPlanURL}/import`,
  },
  chronic: {
    ADD_CHRONIC: `${productURL}/product/condition`,
    UPDATE_CHRONIC: `${productURL}/product/condition`,
    DELTE_CHRONIC: `${productURL}/product/condition`,
    GET_ALL_CHRONIC: `${productURL}/product/condition?size=20`,
    GET_CHRONIC_BY_ID: `${productURL}/product/condition`,
    CHRONIC_PRIORITY: `${productURL}/product/condition/updatePriority`,
  },
  category: {
    ADD_CATEGORY: `${productURL}/homeCategory/create`,
    UPDATE_CATEGORY: `${productURL}/homeCategory/update`,
    DELTE_CATEGORY: `${productURL}/homeCategory/delete`,
    GET_ALL_CATEGORY: `${productURL}/homeCategory/getAllHomeCategory`,
    GET_CATEGORY_BY_ID: `${productURL}/homeCategory/homeCategoryById`,
    CATEGORY_PRIORITY: `${productURL}/homeCategory/homeCategory/updatePriority`,
  },
  supplier: {
    ADD_SUPPLIER: `${productURL}/supplier`,
    UPDATE_SUPPLIER: `${productURL}/supplier`,
    DELTE_SUPPLIER: `${productURL}/supplier`,
    GET_ALL_SUPPLIER: `${productURL}/supplier?size=10`,
    GET_SUPPLIER_BY_ID: `${productURL}/supplier`,
  },
  common: {
    SINGLE_IMAGE_UPLOAD: `${productURL}/upload/uploadFile/single`,
    MULTIPLE_IMAGE_UPLOAD: `${productURL}/upload/uploadFile`,
    CREATE_PRESCRIPTION: `${profileURL}/prescription`,
    GET_STOCK_NOTIFICATION: `${productURL}/notify/stock`,
    GET_SUBSCRIBER: `${cmsURL}/cms/newsletter?size=10`,
    GLOBAL_VARIABLES: `${medPlanURL}/global`,
    UPDATE_GLOBAL_VARIABLES: `${medPlanURL}/global`,
    DELIVERY_CHARGE: `${medPlanURL}/global/delivery`,
    UPDATE_DELIVERY_CHARGE: `${medPlanURL}/global/delivery`,
    DELETE_DELIVERY_CHARGE: `${medPlanURL}/global/delivery`,
    ADD_DELIVERY_CHARGE: `${medPlanURL}/global/delivery`,
    GET_TERMS: `${cmsURL}/cms/policy`,
    UPDATE_TERMS: `${cmsURL}/cms/policy`,
    GET_TERMS_BY_ID: `${cmsURL}/cms/policy`,
    GET_ALL_STATES: `${orderURL}/order/states`,
    VALIDATE_TOKEN: `${authURL}/auth/validateToken`,
    GET_ALL_FEEDBACK: `${orderURL}/order/getOrderFeedback`,
  },
};
