const Endpoints = {
    login:'/user/admin/login',
    forgotPassword:'/user/admin/forgotPassword',
    verifyOTP:'/user/admin/verifyOTP',
    resetPassword:'/user/admin/resetPassword',
    commonDashboard:'/dashboard/admin/commonDashboard',
    boardOnboardAnalytics:'/dashboard/admin/boardOnboardAnalytics',
    userLists:'/user/admin/subAdminList',
    updateSubAdminStatus:'/user/admin/updateSubAdminStatus',
    createSubAdmin:'/user/admin/createSubAdmin',
    updateSubAdmin:'/user/admin/updateSubAdmin',
}


const APIMethods = {
    POST: 'POST',
    GET: 'GET',
    PUT:'PUT',
    DELETE:'DELETE'
}

export default {
    Endpoints,
    APIMethods
}


