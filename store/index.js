import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            isErrorOverlay: false,
            importStatus: false,
            formStatus: false,
            successfulStatus: false,
            confirmStatus: false,
            isErrorOnModal: false,
            errorStatus: false,
            errorList: ['Sample Error'],
            isAuth: false,
            isNotify: false,
            isLoading: false,
        })
    })
}

export default createStore
