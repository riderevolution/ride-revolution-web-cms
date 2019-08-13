import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            resetSuccessfulStatus: false,
            resetStatus: false,
            deleteStatus: false,
            errorStatus: false,
            errorList: [],
            confirmStatus: false,
            userForm: false,
            roleForm: false,
            hiddenMobile: true,
            isAuth: false,
            isNotify: false,
            notificationMessage: '',
            isDeleteShow: false,
            contentLoaded: false,
            isLoading: false,
            token: '',
            user: {
                first_name: '',
                staff_details: {
                    role: {
                        display_name: '',
                    }
                }
            }
        })
    })
}

export default createStore
