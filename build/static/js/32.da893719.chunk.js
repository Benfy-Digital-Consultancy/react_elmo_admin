(this.webpackJsonpelmo=this.webpackJsonpelmo||[]).push([[32],{146:function(c,o,t){"use strict";t.r(o),t.d(o,"baseURL",(function(){return a})),t.d(o,"authURL",(function(){return n})),t.d(o,"adminURL",(function(){return E})),t.d(o,"profileURL",(function(){return e})),t.d(o,"orderURL",(function(){return _})),t.d(o,"productURL",(function(){return r})),t.d(o,"medPlanURL",(function(){return T})),t.d(o,"notificationURL",(function(){return i})),t.d(o,"cmsURL",(function(){return A})),t.d(o,"endpoints",(function(){return D}));var a="http://doodlebluelive.com",n="".concat(a,":2315/api/v1"),E="".concat(a,":2316/api/v1"),e="".concat(a,":2317/api/v1"),_="".concat(a,":2318/api/v1"),r="".concat(a,":2319/api/v1"),T="".concat(a,":2320/api/v1"),i="".concat(a,":2321/api/v1"),A="".concat(a,":2322/api/v1"),D={dashboard:{GET_REVENUE:"".concat(_,"/order/totalRevenue"),GET_DASHBOARD:"".concat(_,"/order/dashboard"),GET_TOPSELLING:"".concat(_,"/order/topSpecialityProduct"),GET_USERDATA:"".concat(n,"/user/total")},staffsAndRoles:{ADD_ROLE:"".concat(n,"/roles"),UPDATE_ROLE:"".concat(n,"/roles"),DELTE_ROLE:"".concat(n,"/roles"),GET_ALL_ROLE:"".concat(n,"/roles?size=10"),GET_ROLE_BY_ID:"".concat(n,"/roles"),ADD_STAFF:"".concat(n,"/user/signup"),UPDATE_STAFF:"".concat(n,"/staff"),DELTE_STAFF:"".concat(n,"/staff"),GET_ALL_STAFF:"".concat(n,"/staff?size=10"),GET_STAFF_BY_ID:"".concat(n,"/staff"),ROLE_DROPDOWN:"".concat(n,"/roles/getRoleName")},faq:{ADD_FAQ:"".concat(E,"/faq"),UPDATE_FAQ:"".concat(E,"/faq"),DELTE_FAQ:"".concat(E,"/faq"),GET_ALL_FAQ:"".concat(E,"/faq?size=20"),GET_FAQ_BY_ID:"".concat(E,"/faq"),FAQ_PRIORITY:"".concat(E,"/faq/updatePriority"),FAQ_DROPDOWN:"".concat(E,"/faq/group")},speciality:{ADD_SPECIALITY:"".concat(r,"/product/speciality"),UPDATE_SPECIALITY:"".concat(r,"/product/speciality"),DELTE_SPECIALITY:"".concat(r,"/product/speciality"),GET_ALL_SPECIALITY:"".concat(r,"/product/speciality"),GET_SPECIALITY_BY_ID:"".concat(r,"/product/speciality"),SPECIALITY_PRIORITY:"".concat(r,"/product/speciality/updatePriority")},testimonial:{ADD_TESTIMONIAL:"".concat(A,"/cms/testimonial"),UPDATE_TESTIMONIAL:"".concat(A,"/cms/testimonial"),DELTE_TESTIMONIAL:"".concat(A,"/cms/testimonial"),GET_ALL_TESTIMONIAL:"".concat(A,"/cms/testimonial?size=20"),GET_TESTIMONIAL_BY_ID:"".concat(A,"/cms/testimonial"),TESTIMONIAL_PRIORITY:"".concat(A,"/cms/testimonial/updatePriority"),TESTIMONIAL_DROPDOWN:"".concat(A,"/cms/group")},products:{ADD_PRODUCT:"".concat(r,"/product"),UPDATE_PRODUCT:"".concat(r,"/product"),GET_PRODUCT_BY_ID:"".concat(r,"/product"),GET_ALL_PRODUCT:"".concat(r,"/product"),SPECIALTIY_DROPDOWN:"".concat(r,"/product/getSpecialityName"),CONDITION_DROPDOWN:"".concat(r,"/product/getConditionName"),DELETE_PRODUCT:"".concat(r,"/product"),BULK_UPLOAD:"".concat(r,"/product/bulk"),SEARCH_PRODUCT:"".concat(r,"/product/getProductName")},order:{GET_ORDER_BY_ID:"".concat(_,"/order"),UPDATE_ORDER:"".concat(_,"/order"),GET_ALL_ORDER:"".concat(_,"/order/admin"),PAYMENT_DROPDOWN:"".concat(_,"/order/paymentTypes"),CANCEL_ORDER:"".concat(_,"/order/cancel"),UPDATE_DELIVERY:"".concat(_,"/order/update/trackingDetails"),CREATE_ORDER:"".concat(_,"/order"),USER_PRESCRIPTION:"".concat(e,"/prescription/getAll"),ADD_PRESCRIPTION:"".concat(e,"/prescription"),UPDATE_PRESCRIPTION:"".concat(_,"/order/update/prescription"),GET_FEEDBACK_BY_ID:"".concat(_,"/order/getOrderFeedback")},auth:{GET_USER_DETAIL:"".concat(n,"/user/getUserById"),GET_USER_BY_ID:"".concat(n,"/user/admin"),UPDATE_USER:"".concat(n,"/user/updateAdmin"),CHANGE_PASSWORD:"".concat(n,"/user/changePasswordAdmin"),SIGN_IN:"".concat(n,"/user/signIn"),FORGOT_PASSWORD:"".concat(n,"/user/forgetPassword"),RESET_PASSWORD:"".concat(n,"/user/sendOtp"),VERIFY_OTP:"".concat(n,"/user/verifyOtpAdmin"),GET_ADDRESS:"".concat(e,"/address/getPrimary"),UPDATE_ADDRESS:"".concat(e,"/address/updatePrimary")},banner:{ADD_BANNER:"".concat(A,"/cms/banner"),GET_BANNER_BY_ID:"".concat(A,"/cms/banner"),UPDATE_BANNER:"".concat(A,"/cms/banner"),DELETE_BANNER:"".concat(A,"/cms/banner"),GET_ALL_BANNER:"".concat(A,"/cms/banner?size=20"),BANNER_PRIORITY:"".concat(A,"/cms/banner/updatePriority")},userData:{GET_ALL_USER_DATA:"".concat(n,"/user?size=10"),GET_USER_ORDERS:"".concat(_,"/order/user"),CREATE_ADDRESS:"".concat(e,"/address"),CHECK_PINCODE:"".concat(_,"/order/pincode"),CREATE_USER:"".concat(n,"/user/admin/create"),UPDATE_USER:"".concat(n,"/user/updateUserById")},pap:{GET_ALL_PAP:"".concat(T,"/pap?size=10"),GET_PAP_BY_ID:"".concat(T,"/pap"),GET_ALL_CARER:"".concat(T,"/carer?size=10"),GET_CARER_BY_ID:"".concat(T,"/carer")},notification:{GET_ALL_NOTIFICATION:"".concat(i,"/notification?size=20"),UPDATE_NOTIFICATION:"".concat(i,"/notification")},coupon:{ADD_COUPON:"".concat(T,"/coupon"),UPDATE_COUPON:"".concat(T,"/coupon"),DELTE_COUPON:"".concat(T,"/coupon"),GET_ALL_COUPON:"".concat(T,"/coupon?size=10"),GET_COUPON_BY_ID:"".concat(T,"/coupon"),COUPON_DROPDOWN:"".concat(T,"/coupon/group")},blog:{ADD_BLOG:"".concat(E,"/blog"),UPDATE_BLOG:"".concat(E,"/blog"),DELTE_BLOG:"".concat(E,"/blog"),GET_ALL_BLOG:"".concat(E,"/blog?size=20"),GET_BLOG_BY_ID:"".concat(E,"/blog"),BLOG_DROPDOWN:"".concat(E,"/blog/group"),BLOG_CATEGORY:"".concat(E,"/blog/category/list"),BLOG_PRIORITY:"".concat(E,"/blog/updatePriority"),ADD_CATEGORY:"".concat(E,"/blog/category"),UPDATE_CATEGORY:"".concat(E,"/blog/category"),DELETE_CATEGORY:"".concat(E,"/blog/category"),GET_ALL_CATEGORY:"".concat(E,"/blog/category?size=10"),GET_CATEGORY_BY_ID:"".concat(E,"/blog/category")},importOrder:{UPDATE_IMPORT:"".concat(T,"/import"),GET_ALL_IMPORT:"".concat(T,"/import?size=10"),GET_IMPORT_BY_ID:"".concat(T,"/import")},chronic:{ADD_CHRONIC:"".concat(r,"/product/condition"),UPDATE_CHRONIC:"".concat(r,"/product/condition"),DELTE_CHRONIC:"".concat(r,"/product/condition"),GET_ALL_CHRONIC:"".concat(r,"/product/condition?size=20"),GET_CHRONIC_BY_ID:"".concat(r,"/product/condition"),CHRONIC_PRIORITY:"".concat(r,"/product/condition/updatePriority")},category:{ADD_CATEGORY:"".concat(r,"/homeCategory/create"),UPDATE_CATEGORY:"".concat(r,"/homeCategory/update"),DELTE_CATEGORY:"".concat(r,"/homeCategory/delete"),GET_ALL_CATEGORY:"".concat(r,"/homeCategory/getAllHomeCategory"),GET_CATEGORY_BY_ID:"".concat(r,"/homeCategory/homeCategoryById"),CATEGORY_PRIORITY:"".concat(r,"/homeCategory/homeCategory/updatePriority")},supplier:{ADD_SUPPLIER:"".concat(r,"/supplier"),UPDATE_SUPPLIER:"".concat(r,"/supplier"),DELTE_SUPPLIER:"".concat(r,"/supplier"),GET_ALL_SUPPLIER:"".concat(r,"/supplier?size=10"),GET_SUPPLIER_BY_ID:"".concat(r,"/supplier")},common:{SINGLE_IMAGE_UPLOAD:"".concat(r,"/upload/uploadFile/single"),MULTIPLE_IMAGE_UPLOAD:"".concat(r,"/upload/uploadFile"),CREATE_PRESCRIPTION:"".concat(e,"/prescription"),GET_STOCK_NOTIFICATION:"".concat(r,"/notify/stock"),GET_SUBSCRIBER:"".concat(A,"/cms/newsletter?size=10"),GLOBAL_VARIABLES:"".concat(T,"/global"),UPDATE_GLOBAL_VARIABLES:"".concat(T,"/global"),DELIVERY_CHARGE:"".concat(T,"/global/delivery"),UPDATE_DELIVERY_CHARGE:"".concat(T,"/global/delivery"),DELETE_DELIVERY_CHARGE:"".concat(T,"/global/delivery"),ADD_DELIVERY_CHARGE:"".concat(T,"/global/delivery"),GET_TERMS:"".concat(A,"/cms/policy"),UPDATE_TERMS:"".concat(A,"/cms/policy"),GET_TERMS_BY_ID:"".concat(A,"/cms/policy"),GET_ALL_STATES:"".concat(_,"/order/states"),VALIDATE_TOKEN:"".concat(n,"/auth/validateToken"),GET_ALL_FEEDBACK:"".concat(_,"/order/getOrderFeedback")}}}}]);
//# sourceMappingURL=32.da893719.chunk.js.map