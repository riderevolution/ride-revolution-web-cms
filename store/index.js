import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            deleteStatus: false,
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
            token: '',
            user: {
                first_name: '',
                current_studio_id: '',
                staff_details: {
                    studio_access: [
                        {
                            studio: {}
                        }
                    ],
                    role: {
                        display_name: '',
                    }
                }
            }
        })
    })
}

export default createStore
