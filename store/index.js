import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            userForm: false,
            hiddenMobile: true,
            isAuth: false,
            isNotify: false,
            notificationMessage: '',
            isDeleteShow: false,
            contentLoaded: false,
            isLoading: false,
            token: '',
            user: {
                name: '',
                staff_details: {
                    role: {
                        display_name: ''
                    }
                }
            }
        })
    })
}

export default createStore
