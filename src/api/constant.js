const url = "http://localhost:9090" //process.env.REACT_APP_BASE_URL


const customer = {
    showCustomer: [url + '/showUser/', 'GET']

}

const trainer = {
    showTrainer: [url + '/showTrainer/', 'GET']

}
export const login = [url + '/signIn', 'POST']
export const getUser = () => window.localStorage.getItem("role") == "TRAINER" ? trainer.showTrainer : customer.showCustomer
export const showAllUser = [url + '/showAllUser', 'GET']
export const showAllTrainer = [url + '/showAllTrainers', 'GET']
export const signupTrainer = [url + '/signupForTrainer', 'POST']
export const signupUser = [url + '/signupUser', 'POST']
export const changePasswordUser = [url + '/changePasswordUser', 'PATCH']
export const changePasswordTrainer = [url + '/changePasswordTrainer', 'PATCH']

export const subscribeMembership = [url + '/subscribeMembership', 'PATCH']
export const unsubscribeMembership = [url + '/unsubscribeMembership', 'PATCH']

export const sendFeedback = [url + '/sendFeedback', 'POST']
export const showAllFeedbacks = [url + '/showAllFeedbacks', 'GET']

export const deactivateAccountUser = [url + '/deactivateAccountUser/', 'PATCH']
export const activateAccountUser = [url + '/activateAccountUser/', 'PATCH']

export const deactivateAccountTrainer = [url + '/deactivateAccountTrainer/', 'PATCH']
export const activateAccountTrainer = [url + '/activateAccountTrainer/', 'PATCH']

export const deleteUser = [url + '/deleteUser/', 'DELETE']
export const deleteTrainer = [url + '/deleteTrainer/', 'DELETE']

export const showUser = [url + '/showUserByFacility/', 'GET']