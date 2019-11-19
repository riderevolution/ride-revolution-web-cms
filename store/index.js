import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            calendarDuplicateStatus: false,
            calendarClearStatus: false,
            customerCreditQuickSaleStatus: false,
            customerProductQuickSaleStatus: false,
            quickSaleStatus: false,
            successfulStatus: false,
            promptStatus: false,
            importStatus: false,
            resetSuccessfulStatus: false,
            resetStatus: false,
            deleteStatus: false,
            deleteImageStatus: false,
            errorStatus: false,
            errorList: [],
            confirmStatus: false,
            variantImageForm: false,
            categoryForm: false,
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
                current_studio_id: '',
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
