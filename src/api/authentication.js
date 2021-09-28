import { handle } from ".";
import { activateAccountTrainer, activateAccountUser, changePasswordTrainer, changePasswordUser, deactivateAccountTrainer, deactivateAccountUser, deleteTrainer, deleteUser, getUser, login, sendFeedback, showAllFeedbacks, showAllTrainer, showAllUser, showUser, signupTrainer, signupUser, subscribeMembership, unsubscribeMembership } from "./constant"

const [loginUrl, loginMethod] = login;
export const getUserAuthTokenApi = (userName, password) => handle(fetch(loginUrl, {
    method: loginMethod,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": userName,
        "password": password,
    })
}))

export const fetchUserApi = (userName) => handle(fetch(getUser()[0] + userName, {
    method: getUser()[1],
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))


const [showAllUserUrl, showAllUserrMethod] = showAllUser;
export const showAllUserApi = (token) => handle(fetch(showAllUserUrl, {
    method: showAllUserrMethod,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))


const [showAllTrainerUrl, showAllTrainerMethod] = showAllTrainer;
export const showAllTrainerApi = (token) => handle(fetch(showAllTrainerUrl, {
    method: showAllTrainerMethod,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))


const [signupTrainerUrl, signupTrainerMethod] = signupTrainer;
export const signupTrainerApi = (data) => handle(fetch(signupTrainerUrl, {
    method: signupTrainerMethod,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
}))


const [signupUserUrl, signupUserMethod] = signupUser;
export const signupUsernApi = (data) => handle(fetch(signupUserUrl, {
    method: signupUserMethod,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
}))

const [changePasswordUserUrl, changePasswordUserMethod] = changePasswordUser;
export const changePasswordUserApi = (username, password) => handle(fetch(changePasswordUserUrl, {
    method: changePasswordUserMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": username,
        "password": password
    })
}))


const [changePasswordTrainerUrl, changePasswordTrainerMethod] = changePasswordTrainer;
export const changePasswordTrainerApi = (username, password) => handle(fetch(changePasswordTrainerUrl, {
    method: changePasswordTrainerMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": username,
        "password": password
    })
}))

const [unsubscribeMembershipUrl, unsubscribeMembershipMethod] = unsubscribeMembership;
export const unsubscribeMembershipApi = (username, facilityName) => handle(fetch(unsubscribeMembershipUrl, {
    method: unsubscribeMembershipMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": username,
        "facilityName": facilityName
    })
}))


const [subscribeMembershipUrl, subscribeMembershipMethod] = subscribeMembership;
export const subscribeMembershipApi = (username, facilityName) => handle(fetch(subscribeMembershipUrl, {
    method: subscribeMembershipMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "username": username,
        "facilityName": facilityName
    })
}))

const [sendFeedbackUrl, sendFeedbackMethod] = sendFeedback;
export const sendFeedbackApi = (feedback, rating) => handle(fetch(sendFeedbackUrl, {
    method: sendFeedbackMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "feedback": feedback,
        "rating": rating,
        "username": window.localStorage.getItem("username")
    })
}))


const [showAllFeedbacksUrl, showAllFeedbacksMethod] = showAllFeedbacks;
export const showAllFeedbacksApi = () => handle(fetch(showAllFeedbacksUrl, {
    method: showAllFeedbacksMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))


const [deactivateAccountUserUrl, deactivateAccountUserMethod] = deactivateAccountUser;
export const deactivateAccountUserApi = (userName) => handle(fetch(deactivateAccountUserUrl + userName, {
    method: deactivateAccountUserMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))
const [activateAccountUserUrl, activateAccountUserMethod] = activateAccountUser;
export const activateAccountUserApi = (userName) => handle(fetch(activateAccountUserUrl + userName, {
    method: activateAccountUserMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))

const [deactivateAccountTrainerUrl, deactivateAccountTrainerMethod] = deactivateAccountTrainer;
export const deactivateAccountTrainerApi = (userName) => handle(fetch(deactivateAccountTrainerUrl + userName, {
    method: deactivateAccountTrainerMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))
const [activateAccountTrainerUrl, activateAccountTrainerMethod] = activateAccountTrainer;
export const activateAccountTrainerApi = (userName) => handle(fetch(activateAccountTrainerUrl + userName, {
    method: activateAccountTrainerMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))



const [deleteUserUrl, deleteUserMethod] = deleteUser;
export const deleteUserApi = (userName) => handle(fetch(deleteUserUrl + userName, {
    method: deleteUserMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))

const [deleteTrainerUrl, deleteTrainerMethod] = deleteTrainer;
export const deleteTrainerApi = (userName) => handle(fetch(deleteTrainerUrl + userName, {
    method: deleteTrainerMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))

const [showUserUrl, showUserMethod] = showUser;
export const showUserApi = (userName) => handle(fetch(showUserUrl + userName, {
    method: showUserMethod,
    headers: {
        'Authorization': window.localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}))