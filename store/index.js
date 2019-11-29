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
            promptValidateStatus: false,
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
            customerID: 0,
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
