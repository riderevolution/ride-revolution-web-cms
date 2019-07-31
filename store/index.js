import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            hiddenMobile: true,
            isAuth: false,
            isNotify: false,
            notificationMessage: '',
            isLoaderShow: false,
            isDeleteShow: false,
            contentLoaded: false,
            isLoading: false,
            token: '',
            user: {
                name: '',
                role: {
                    display_name: ''
                }
            }
        })
    })
}

export default createStore
