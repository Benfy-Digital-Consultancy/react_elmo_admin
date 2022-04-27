const Endpoints = {
   
    //Auth
    login:'/user/admin/login',
    forgotPassword:'/user/admin/forgotPassword',
    verifyOTP:'/user/admin/verifyOTP',
    resetPassword:'/user/admin/resetPassword',

    //Dashboard
    commonDashboard:'/dashboard/admin/commonDashboard',
    boardOnboardAnalytics:'/dashboard/admin/boardOnboardAnalytics',
    studentTeacherAnalytics:'/dashboard/admin/studentTeacherAnalytics',
    
    //User Module
    userLists:'/user/admin/subAdminList',
    updateSubAdminStatus:'/user/admin/updateSubAdminStatus',
    createSubAdmin:'/user/admin/createSubAdmin',
    updateSubAdmin:'/user/admin/updateSubAdmin',

    //Upload API
    upload:'/user/upload',

    //School Module
    schoolList:'/school/admin/schoolList',
    updateSchoolStatus:'/school/admin/updateSchoolStatus',
    schoolBoards:'/school/admin/schoolBoards',
    createSchool:'/school/admin/createSchool',
    updateSchool:'/school/admin/updateSchool',

    //Admin Profile Module
    getProfileDetails:'/user/admin/getProfileDetails',
    changePassword:'/user/admin/changePassword',
    updateProfile:'/user/admin/updateProfile',

    //notification count
    notificationCount:'/user/admin/notificationCount',
    getNotification:'/user/admin/getNotification',

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


