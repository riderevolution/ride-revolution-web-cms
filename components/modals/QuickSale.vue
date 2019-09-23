<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div id="default_form" class="overlay alternate">
            <div class="modal_wrapper">
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_tab_wrapper" id="step1" v-show="nextStep == 1">
                    <div class="left_side">
                        <div class="overlay">
                            <h2 class="total_title">Buy Products</h2>
                            <div class="total_price">Total: PHP {{ computeTotal }}</div>
                        </div>
                        <div class="modal_tab">
                            <div :class="`modal_tab_title ${(key == 0) ? 'active' : '' }`" v-for="(menu, key) in menus" :key="key" @click="toggleStatus(status = key, menu.type, menu.id)">{{ menu.name }}</div>
                        </div>
                    </div>
                    <div class="right_side">
                        <div class="modal_tab_content_header">
                            <div :class="`tab_content_flex ${(toCompare.giftCard == 2) ? 'alternate' : ''}`">
                                <div class="form_flex">
                                    <div class="form_group" v-if="toCompare.giftCard != 2">
                                        <label for="q">Search a Product</label>
                                        <input type="text" name="q" autocomplete="off" placeholder="Search for a products" v-model="form.search" class="default_text search_alternate">
                                    </div>
                                    <div class="button_group">
                                        <button type="button" class="action_btn alternate margin" v-if="toCompare.giftCard != 2" @click="submitFilter()">Search</button>
                                    </div>
                                </div>
                                <div class="button_group">
                                    <button type="button" class="action_btn alternate" @click="takePayment(2)">Take Payment</button>
                                </div>
                            </div>
                            <div class="total_items" v-if="toCompare.giftCard != 2">{{ totalItems(total) }} <span>items</span></div>
                        </div>
                        <div class="modal_tab_content">
                            <form id="product_form" v-show="isProduct">
                                <quick-sale-tab-content ref="quickSale" :value="value" :unique="index" v-for="(value, index) in showProducts" :key="`${unique}_${value.id}`" />
                            </form>
                            <div class="no_results" v-if="total == 0">
                                No Result(s) Found.
                            </div>
                            <form id="custom_gift_form" class="alternate_2" @submit.prevent="submitCustom()" v-show="!isProduct">
                                <div class="modal_wrapper">
                                    <div class="modal_main_group alternate">
                                        <div class="form_main_group">
                                            <div class="form_group">
                                                <label for="class_package_sku_id">Card Value <span>*</span></label>
                                                <select class="default_select alternate" name="class_package_sku_id" v-validate="'required'" v-model="customGiftCard.classPackages" @change="getPackagePrice($event)">
                                                    <option value="" disabled selected>Select a Value</option>
                                                    <option :value="classPackage.sku_id" v-for="(classPackage, key) in classPackages" :key="key">{{ classPackage.name }}</option>
                                                </select>
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('class_package_sku_id')">{{ errors.first('class_package_sku_id') }}</span></transition>
                                            </div>
                                            <div class="form_group no_margin">
                                                <label for="custom_card_code">Card Code <span>*</span></label>
                                                <input type="text" name="custom_card_code" class="default_text disabled" v-model="customGiftCard.customCardCode">
                                            </div>
                                        </div>
                                        <div class="form_main_group">
                                            <div class="form_group">
                                                <label for="custom_card_from">From <span>*</span></label>
                                                <input type="email" name="custom_card_from" class="default_text" autocomplete="off" v-model="customGiftCard.customCardFrom" v-validate="'required|email'">
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('custom_card_from')">{{ errors.first('custom_card_from') }}</span></transition>
                                            </div>
                                            <div class="form_group">
                                                <label for="custom_card_to">To <span>*</span></label>
                                                <input type="email" name="custom_card_to" class="default_text" autocomplete="off" v-model="customGiftCard.customCardTo" v-validate="'required|email'">
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('custom_card_to')">{{ errors.first('custom_card_to') }}</span></transition>
                                            </div>
                                            <div class="form_group">
                                                <label for="custom_card_predefined_title">Title</label>
                                                <select class="default_select alternate" name="custom_card_predefined_title" v-model="customGiftCard.customCardPredefinedTitle">
                                                    <option value="" disabled selected>Select a Title</option>
                                                    <option :value="predefinedTitle.title" v-for="(predefinedTitle, key) in predefinedTitles" :key="key">{{ predefinedTitle.title }}</option>
                                                </select>
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('custom_card_predefined_title')">{{ errors.first('custom_card_predefined_title') }}</span></transition>
                                            </div>
                                            <div class="form_group">
                                                <label for="custom_card_custom_title">Custom Title</label>
                                                <input type="text" name="custom_card_custom_title" autocomplete="off" class="default_text" v-model="customGiftCard.customCardCustomTitle">
                                            </div>
                                            <div class="form_group no_margin">
                                                <label for="custom_card_personal_message">Personal Message <span>*</span></label>
                                                <textarea name="custom_card_personal_message" autocomplete="off" rows="8" class="default_text" v-model="customGiftCard.customCardPersonalMessage" v-validate="'required'"></textarea>
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('custom_card_personal_message')">{{ errors.first('custom_card_personal_message') }}</span></transition>
                                            </div>
                                        </div>
                                        <div class="form_main_group no_border">
                                            <div class="form_group">
                                                <label for="custom_card_recipient_email">Recipient's Email <span>*</span></label>
                                                <input type="email" name="custom_card_recipient_email" autocomplete="off" class="default_text" v-model="customGiftCard.customCardRecipientEmail" v-validate="'required|email'">
                                                <transition name="slide"><span class="validation_errors" v-if="errors.has('custom_card_recipient_email')">{{ errors.first('custom_card_recipient_email') }}</span></transition>
                                            </div>
                                            <div class="form_group_disclaimer">
                                                <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>The custom gift card will be sent after payment has been processed.</span></div>
                                            </div>
                                        </div>
                                        <div class="form_footer_wrapper">
                                            <div class="button_group">
                                                <button type="submit" name="submit" class="action_success_btn alternate">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal_tab_wrapper alternate" id="step2" v-show="nextStep == 2">
                    <div class="header_side">
                        <h2 class="header_title">Checkout</h2>
                        <div class="header_subtitle">
                            <span>ID: {{ form.id }}</span>
                        </div>
                    </div>
                    <div class="left_side">
                        <h2 class="left_title">Payment Method</h2>
                        <div class="form_flex_radio">
                            <div class="form_radio">
                                <input type="radio" id="debit_card" value="debit-card" name="payment_method" class="action_radio" checked @change="checkPayment('debit')">
                                <label for="debit_card">Debit Card</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="check" value="check" name="payment_method" class="action_radio" @change="checkPayment('check')">
                                <label for="check">Check</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="credit_card" value="credit-card" name="payment_method" class="action_radio" @change="checkPayment('credit')">
                                <label for="credit_card">Credit Card</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="comp" value="comp" name="payment_method" class="action_radio" @change="checkPayment('comp')">
                                <label for="comp">Comp</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="cash" value="cash" name="payment_method" class="action_radio" @change="checkPayment('cash')">
                                <label for="cash">Cash</label>
                            </div>
                        </div>
                        <div class="form_main_group" v-if="form.paymentType == 0 || form.paymentType == 2">
                            <div class="form_group">
                                <label for="bank">Bank<span>*</span></label>
                                <select class="default_select alternate" name="bank" v-validate="'required'">
                                    <option value="" selected disabled>Select a Bank</option>
                                    <option value="bdo">BDO</option>
                                </select>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('bank')">{{ errors.first('bank') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="type_of_card">Type of Card<span>*</span></label>
                                <select class="default_select alternate" name="type_of_card" v-validate="'required'">
                                    <option value="" selected disabled>Select Type of Card</option>
                                    <option value="mastercard">Mastercard</option>
                                </select>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('type_of_card')">{{ errors.first('type_of_card') }}</span></transition>
                            </div>
                        </div>
                        <div class="form_main_group" v-if="form.paymentType == 1">
                            <div class="form_group">
                                <label for="bank">Bank<span>*</span></label>
                                <input type="text" name="bank" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('bank')">{{ errors.first('bank') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="check_number">Check Number<span>*</span></label>
                                <input type="text" name="check_number" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('check_number')">{{ errors.first('check_number') }}</span></transition>
                            </div>
                        </div>
                        <div class="form_main_group" v-if="form.paymentType == 3">
                            <div class="form_group">
                                <label for="comp_reason">Comp Reason<span>*</span></label>
                                <select class="default_select alternate" name="comp_reason" v-validate="'required'">
                                    <option value="" selected disabled>Select a Reason</option>
                                    <option value="other">Other</option>
                                </select>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('comp_reason')">{{ errors.first('comp_reason') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="note">Note<span>*</span></label>
                                <input type="text" name="note" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('note')">{{ errors.first('note') }}</span></transition>
                            </div>
                        </div>
                        <div class="form_main_group" v-if="form.paymentType == 4">
                            <div class="form_group">
                                <label for="cash_tendered">Cash Tendered (PHP)<span>*</span></label>
                                <input type="text" name="cash_tendered" class="default_text" v-validate="'required|decimal:2'" v-model="form.change">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('cash_tendered')">{{ errors.first('cash_tendered') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="change">Change (PHP)<span>*</span></label>
                                <input type="text" name="change" class="default_text disabled" v-model="computeChange" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('change')">{{ errors.first('change') }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="right_side">
                        <div class="breakdown_wrapper">
                            <table class="breakdown_table">
                                <thead>
                                    <tr>
                                        <th>Items</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, key) in totalPrice" :key="key">
                                        <td class="item_name" width="50%">({{ data.quantity }}) {{ data.product.name }}</td>
                                        <td class="item_price" width="50%">PHP {{ totalCount(data.product.origPrice) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="breakdown_total">
                            <div class="total_title">Total</div>
                            <div class="total_price">PHP {{ computeTotal }}</div>
                        </div>
                    </div>
                    <div class="footer_side">
                        <div class="form_group_disclaimer">
                            <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Note: Promo code won’t be applicable to promo products/pacakges.</span></div>
                        </div>
                        <div class="button_group">
                            <button type="button" class="action_cancel_btn" @click="takePayment(1)">Cancel</button>
                            <button type="button" class="action_success_btn alternate margin">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QuickSaleTabContent from './QuickSaleTabContent'
    export default {
        components: {
            QuickSaleTabContent
        },
        data () {
            return {
                nextStep: 1,
                status: 0,
                total: 0,
                products: [],
                classPackages: [],
                predefinedTitles: [],
                menus: [
                    {
                        id: 0,
                        name: 'Ride Rewards',
                        type: 'ride-rewards'
                    },
                    {
                        id: 0,
                        name: 'Physical Gift Card',
                        type: 'physical-gift-card'
                    },
                    {
                        id: 0,
                        name: 'Custom Gift Card',
                        type: 'custom-gift-card'
                    }
                ],
                form: {
                    search: '',
                    paymentType: 0,
                    id: '',
                    change: 0
                },
                customGiftCard: {
                    classPackages: '',
                    classPackagePrice: 0,
                    customCardCode: '',
                    customCardFrom: '',
                    customCardTo: '',
                    customCardPredefinedTitle: '',
                    customCardCustomTitle: '',
                    customCardPersonalMessage: '',
                    customCardRecipientEmail: ''
                },
                isProduct: true,
                toCompare: {
                    product: 0,
                    giftCard: 0
                },
                unique: 0,
                totalPrice: [],
                toCheckout: []
            }
        },
        computed: {
            computeChange () {
                const me = this
                let value = (me.form.change == '') ? 0 : parseFloat(me.form.change)
                let total = 0
                let change = 0
                if (value != 0) {
                    me.totalPrice.forEach((data, index) => {
                        total += data.price
                    })
                } else {
                    change = 0
                }
                change = value - parseFloat(total)
                return change
            },
            computeTotal () {
                const me = this
                let total = 0
                me.totalPrice.forEach((data, index) => {
                    total += data.price
                })
                return me.totalCount(total)
            },
            showProducts () {
                const me = this
                let products = []
                switch (me.toCompare.giftCard) {
                    case 0:
                        me.products.forEach((product, index) => {
                            if (product.product) {
                                product.isProductShow = true
                            } else {
                                product.isGiftShow = false
                            }
                        })
                        break
                    case 1:
                        me.products.forEach((product, index) => {
                            if (product.product) {
                                product.isProductShow = false
                            } else {
                                product.isGiftShow = true
                            }
                        })
                        break
                }
                products = me.products
                return products
            }
        },
        methods: {
            takePayment (step) {
                const me = this
                switch (step) {
                    case 1:
                        me.nextStep = 1
                        document.getElementById('step1').classList.add('slide_in')
                        document.getElementById('step2').classList.remove('slide_in')
                        break
                    case 2:
                        me.nextStep = 2
                        document.getElementById('step2').classList.add('slide_in')
                        document.getElementById('step1').classList.remove('slide_in')
                        break
                }
            },
            getPackagePrice (event) {
                const me = this
                let sku = event.target.value
                me.classPackages.forEach((classPackage, index) => {
                    if (classPackage.sku_id == sku) {
                        me.customGiftCard.classPackagePrice = me.totalCount(classPackage.package_price)
                    }
                })
            },
            checkPayment (type) {
                const me = this
                switch (type) {
                    case 'debit':
                        me.form.paymentType = 0
                        break
                    case 'check':
                        me.form.paymentType = 1
                        break
                    case 'credit':
                        me.form.paymentType = 2
                        break
                    case 'comp':
                        me.form.paymentType = 3
                        break
                    case 'cash':
                        me.form.paymentType = 4
                        break
                }
                me.form.change = 0
            },
            submitFilter () {
                const me = this
                let ctr  = 0
                switch (me.toCompare.giftCard) {
                    case 0:
                        me.$refs.quickSale.forEach((product, qindex) => {
                            if (product.value.product) {
                                if (product.value.product.product_category_id == me.toCompare.product) {
                                    let variant = product.value.variant.toLowerCase()
                                    if (me.form.search != '') {
                                        if (variant.includes(me.form.search.toLowerCase())) {
                                            ctr++
                                            product.isSearched = true
                                        } else {
                                            product.isSearched = false
                                        }
                                    } else {
                                        ctr++
                                        product.isSearched = true
                                    }
                                } else {
                                    product.isSearched = false
                                }
                            }
                        })
                        break
                    case 1:
                    me.$refs.quickSale.forEach((product, qindex) => {
                        if (!product.value.product) {
                            let card_code = product.value.card_code.toLowerCase()
                            if (me.form.search != '') {
                                if (card_code.includes(me.form.search.toLowerCase())) {
                                    ctr++
                                    product.isSearched = true
                                } else {
                                    product.isSearched = false
                                }
                            } else {
                                ctr++
                                product.isSearched = true
                            }
                        } else {
                            product.isSearched = false
                        }
                    })
                        break
                }
                me.total = ctr
            },
            submitCustom () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        if (me.customGiftCard.classPackages != '') {
                            me.totalPrice.push(
                                {
                                    id: 9999999,
                                    quantity: 1,
                                    price: parseFloat(me.customGiftCard.classPackagePrice)
                                }
                            )
                            setTimeout( () => {
                                me.resetCustomGiftCard()
                            }, 10)
                        }
                    } else {
                        document.querySelector('.validation_errors').scrollIntoView({block: 'center', behavior: 'smooth'})
                    }
                })
            },
            resetCustomGiftCard () {
                const me = this
                setTimeout( () => {
                    me.customGiftCard.classPackages = ''
                    me.customGiftCard.classPackagePrice = 0
                    me.customGiftCard.customCardCode = ''
                    me.customGiftCard.customCardFrom = ''
                    me.customGiftCard.customCardTo = ''
                    me.customGiftCard.customCardPredefinedTitle = ''
                    me.customGiftCard.customCardCustomTitle = ''
                    me.customGiftCard.customCardPersonalMessage = ''
                    me.customGiftCard.customCardRecipientEmail = ''
                    me.$validator.reset()
                }, 10)
            },
            toggleClose () {
                const me = this
                me.$store.state.quickSaleStatus = false
                document.body.classList.remove('no_scroll')
            },
            countTotalItems (type) {
                const me = this
                let count = 0
                switch (type) {
                    case 'category':
                        me.products.forEach((product, index) => {
                            if (product.product) {
                                if (me.toCompare.product == product.product.product_category_id) {
                                    count++
                                }
                            }
                        })
                        break
                    case 'physical-gift-card':
                        me.products.forEach((product, index) => {
                            if (!product.product) {
                                count++
                            }
                        })
                        break
                }
                me.total = count
            },
            toggleStatus (unique, type, id) {
                const me = this
                me.unique = unique
                const elements = document.querySelectorAll('.modal_tab .modal_tab_title')
                let formData = new FormData()
                elements.forEach((element, index) => {
                    if (unique == index) {
                        element.classList.add('active')
                    } else {
                        element.classList.remove('active')
                    }
                })
                setTimeout( () => {
                    me.form.search = ''
                    me.resetCustomGiftCard()
                }, 10)
                switch (type) {
                    case 'category':
                        me.isProduct = true
                        me.toCompare.product = id
                        me.toCompare.giftCard = 0
                        me.countTotalItems('category')
                        break
                    case 'physical-gift-card':
                        me.isProduct = true
                        me.toCompare.giftCard = 1
                        me.countTotalItems('physical-gift-card')
                        break
                    case 'custom-gift-card':
                        me.isProduct = false
                        me.toCompare.giftCard = 2
                        break
                }
            },
            fetchTabContents () {
                const me = this
                me.$axios.get('api/inventory/product-categories').then(res => {
                    if (res.data) {
                        res.data.productCategories.forEach((productCategory, index) => {
                            me.menus.unshift(
                                {
                                    id: res.data.productCategories[res.data.productCategories.length - (index + 1)].id,
                                    name: res.data.productCategories[res.data.productCategories.length - (index + 1)].name,
                                    type: 'category'
                                }
                            )
                        })
                        me.toCompare.product = me.menus[0].id
                        me.countTotalItems('category')
                    }
                })
            },
            fetchData () {
                const me = this
                me.$axios.get('api/inventory/product-variants?enabled=1').then(res => {
                    if (res.data) {
                        me.products = res.data.productVariants.data
                        me.products.forEach((product, index) => {
                            product.isChecked = false
                        })
                        me.fetchTabContents()
                        me.$axios.get('api/inventory/gift-cards').then(res => {
                            if (res.data) {
                                res.data.giftCards.data.forEach((data, index) => {
                                    data.isChecked = false
                                    me.products.push(data)
                                })
                            }
                        })
                        me.$axios.get('api/extras/class-packages-for-gift-cards').then(res => {
                            me.classPackages = res.data.classPackages
                        })
                        me.$axios.get('api/extras/gift-card-titles').then(res => {
                            me.predefinedTitles = res.data.giftCardTitles
                        })
                    }
                })
                me.customGiftCard.customCardCode = `GC-${me.randomCode()}`
                me.form.id = me.randomString()
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
