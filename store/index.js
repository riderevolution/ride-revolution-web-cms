import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            importStatus: false,
            formStatus: false,
            successfulStatus: false,
            confirmStatus: false,
            errorStatus: false,
            errorList: ['Sample Error'],
            isAuth: false,
            isNotify: false,
            isLoading: false,
        })
    })
}

export default createStore
