<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table booker" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Booker</h1>
                    <div class="actions">
                        <form class="customer_filter_flex" id="filter" @submit.prevent>
                            <div class="form_group customer">
                                <label for="studio_id">Studio</label>
                                <select class="default_select alternate" name="studio_id" @change="getStudio($event)">
                                    <option value="" selected disabled>Select a Studio</option>
                                    <option :value="studio.studio.id" v-for="(studio, key) in studios" :key="key">{{ studio.studio.name }}</option>
                                </select>
                            </div>
                            <div class="form_group margin" v-click-outside="closeMe">
                                <label for="q">Find a Customer</label>
                                <input type="text" name="q" autocomplete="off" placeholder="Search for a customer" :class="`default_text search_alternate ${(selectCustomer) ? '' : 'disabled'}`" @click="toggleCustomers ^= true" @input="searchCustomer($event)">
                                <div :class="`customer_selection ${(customerLength > 6) ? 'scrollable' : ''}`" v-if="toggleCustomers">
                                    <div class="customer_selection_list">
                                        <div class="customer_wrapper" v-if="customerLength > 0" :id="`customer_${customer.id}`" v-for="(customer, key) in populateCustomers" :key="key" @click="getCustomer(customer)">
                                            <img :src="customer.customer_details.images[0].path_resized" v-if="customer.customer_details.images.length > 0" />
                                            <div class="customer_image" v-else>
                                                {{ customer.first_name.charAt(0) }}{{ customer.last_name.charAt(0) }}
                                            </div>
                                            <div class="customer_name">
                                                {{ customer.first_name }} {{ customer.last_name }}
                                            </div>
                                        </div>
                                        <div class="no_results" v-if="customerLength == 0" >
                                            No customer(s) found.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div :class="`customer_selected ${(customer != '') ? 'selected' : ''}`">
                                <div class="customer_picked" v-if="customer != ''">
                                    <div class="customer_header">
                                        <img class="customer_image" :src="customer.customer_details.images[0].path_resized" v-if="customer.customer_details.images.length > 0" />
                                        <div class="customer_default_image" v-else>
                                            {{ customer.first_name.charAt(0) }}{{ customer.last_name.charAt(0) }}
                                        </div>
                                        <div class="customer_details">
                                            <h2 class="customer_name">
                                                {{ customer.first_name }} {{ customer.last_name }}
                                                <div class="types" v-if="customer.customer_details.customer_type.images.length > 0"><img :src="customer.customer_details.customer_type.images[0].path_resized" /></div>
                                                <a :href="`mailto:${customer.email}`" class="email">
                                                    <img src="/icons/email-icon.svg" />
                                                    <span>Email</span>
                                                </a>
                                            </h2>
                                            <div class="customer_info">
                                                <span>Birthday: {{ $moment(customer.customer_details.co_birthdate).format('M/D/YY') }}</span>
                                                <span>{{ customer.customer_details.co_contact_number }}</span>
                                                <span>Store Credit: 500</span>
                                                <span>Shoe Size: {{ customer.customer_details.co_shoe_size }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="customer_footer" v-if="customer != ''">
                                        <a href="javascript:void(0)">Attendance</a>
                                        <a href="javascript:void(0)">Packages</a>
                                        <a href="javascript:void(0)">Redeem</a>
                                        <a href="javascript:void(0)" @click="toggleQuickSale('credit')">Buy Credits</a>
                                        <a href="javascript:void(0)" @click="toggleQuickSale('product')">Buy Products</a>
                                    </div>
                                </div>
                                <div class="no_results" v-else>
                                    <div class="customer_label">No Customer Selected</div>
                                    <div class="customer_text">Find a Customer / Scan QR Code</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <div class="booker_wrapper">
                    <div class="booker_classes">
                        <div class="header_wrapper">
                            <div class="booker_header">
                                <div class="booker_prev" @click="generatePrevClasses()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                                </div>
                                <h2 class="booker_title">Classes</h2>
                                <div class="booker_next" @click="generateNextClasses()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                                </div>
                            </div>
                            <a href="javascript:void(0)" class="action_calendar_btn" @click="populateClasses()">Today</a>
                        </div>
                        <div class="content_wrapper">
                            <div class="class_accordion" v-for="(result, key) in results" :key="key">
                                <div class="accordion_header" @click.self="toggleClass($event, $moment(result.date).format('M'), $moment(result.date).format('D'), $moment(result.date).format('YYYY'))">{{ result.abbr }} | {{ result.date }}</div>
                                <div class="accordion_content">
                                    <a href="javascript:void(0)" class="class_content" v-for="(data, key) in schedules" :key="key">
                                        <div class="class_title">
                                            <span>{{ data.schedule.start_time }}, {{ data.schedule.class_type.name }}</span>
                                            <div class="class_status full">
                                                Full (28)
                                            </div>
                                        </div>
                                        <div class="class_text">
                                            {{ data.schedule.instructor_schedules[0].user_id }} (50 mins)
                                        </div>
                                        <div class="class_text alternate">
                                            <span>Signed-in: 3</span>
                                            <span>Available: 3</span>
                                            <span>No show: 3</span>
                                        </div>
                                    </a>
                                    <a href="javascript:void(0)" class="no_class class_content" v-if="schedules.length <= 0">
                                        No Schedule(s) for this day.
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="booker_content">
                        <div class="booker_seats">
                            <div class="seat_controls">
                                <div class="left_side">
                                    <div class="class_options">
                                        <select class="default_select alternate" name="class_options">
                                            <option value="" disabled selected>Class Options</option>
                                            <option :value="key" v-for="(classOption, key) in classOptions" :key="key">{{ classOption }}</option>
                                        </select>
                                    </div>
                                    <label class="booker_label">Lorem Ipsum</label>
                                    <div class="controls">
                                        <button id="zoom_in">Zoom in</button>
                                        <button id="zoom_out" class="margin">Zoom out</button>
                                        <button id="reset" class="margin">Reset</button>
                                    </div>
                                </div>
                                <div class="right_side">
                                    <button id="reload">Reload</button>
                                </div>
                            </div>
                            <panZoom @init="panZoomInit" :options="{
                                bounds: true,
                                boundsPadding: 0.2,
                                minZoom: 0.25,
                                maxZoom: 1,
                                zoomDoubleClickSpeed: 1,
                                beforeWheel: panZoomBeforeWheel,
                                onDoubleClick: panZoomDoubleClick,
                                smoothScroll: false,
                                onTouch: panZoomTouch
                            }">
                                <seat-plan ref="plan" />
                            </panZoom>
                            <div class="seat_legends">
                                <div class="legend_title gray"><span></span> Booked</div>
                                <div class="legend_title margin green"><span></span> Signed In</div>
                                <div class="legend_title margin white"><span></span> Available</div>
                                <div class="legend_title margin gradient"><span></span> Blocked/Comp</div>
                            </div>
                        </div>
                        <div class="booker_footer">
                            <div class="booker_notepad">
                                <h2 class="footer_title">Notepad</h2>
                                <div class="notepad_text">
                                    <textarea name="notepad" rows="10" v-model="notePad" @focusout="updateNotes($event)"></textarea>
                                </div>
                            </div>
                            <div class="booker_waitlist">
                                <div class="footer_header">
                                    <h2 class="footer_title">Waitlist (3)</h2>
                                    <a href="javascript:void(0)" class="action_success_btn">Add to Waitlist</a>
                                </div>
                                <table class="cms_waitlist">
                                    <thead>
                                        <tr>
                                            <th>Last Name</th>
                                            <th>First Name</th>
                                            <th class="action">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Villeta</td>
                                            <td>Sheena</td>
                                            <td class="action">
                                                <a href="#">Assign Seat</a>
                                                <a href="#" class="margin">Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    import SeatPlan from '../../components/SeatPlan'
    export default {
        components: {
            Foot,
            SeatPlan
        },
        data () {
            return {
                loaded: false,
                id: 0,
                type: 0,
                rowCount: 0,
                status: 1,
                studios: [],
                results: [],
                customer: '',
                customers: [],
                customerLength: 0,
                schedules: [],
                customerTypes: [],
                classOptions: ['Email Class', 'Print Sign-in Sheet', 'Print Room', 'Print Waitlist', 'Customers with Pending Payment', 'Customer Info', 'Attendance Log'],
                notePad: '',
                studioID: 0,
                current: 0,
                last: 0,
                test: 0,
                currentMonth: 0,
                currentYear: 0,
                isPrev: false,
                selectCustomer: false,
                toggleCustomers: false,
                zoomCtr: 0.55,
                customInstance: [],
                customWidth: 0,
                customHeight: 0
            }
        },
        computed: {
            populateCustomers () {
                const me = this
                let results = []
                results = me.customers
                return results
            }
        },
        methods: {
            toggleQuickSale (type) {
                const me = this
                switch (type) {
                    case 'credit':
                        me.$store.state.customerCreditQuickSaleStatus = true
                        break
                    case 'product':
                        me.$store.state.customerProductQuickSaleStatus = true
                        break
                }
                document.body.classList.add('no_scroll')
            },
            getCustomer (data) {
                const me = this
                me.toggleCustomers = false
                me.$store.state.customerID = data.id
                me.customer = data
            },
            searchCustomer (event) {
                const me = this
                let value = event.target.value
                let formData = new FormData()
                formData.append('q', value)
                formData.append('forBooker', 1)
                formData.append('enabled', 1)
                me.$axios.post('api/customers/search', formData).then(res => {
                    if (res.data) {
                        me.customers = res.data.customers
                        me.customerLength = me.customers.length
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                })
            },
            getStudio (event) {
                const me = this
                me.selectCustomer = true
                me.studioID = event.target.value
                document.querySelectorAll('.content_wrapper .class_accordion').forEach((value, index) => {
                    value.classList.remove('toggled')
                    value.querySelector('.accordion_content').style.height = 0
                })
                setTimeout(() => {
                    me.$refs.plan.fetchSeats(me.studioID)
                    document.querySelector('.plan_wrapper').style.transform = `matrix(0.55, 0, 0, 0.55, ${me.customWidth}, ${me.customHeight})`
                }, 10)
            },
            updateNotes (event) {
                const me = this
                let id = me.$store.state.user.id
                let formData = new FormData()
                formData.append('_method', 'PATCH')
                formData.append('user_id', id)
                formData.append('note', event.target.value)
                me.$axios.post('api/extras/update-user-notepad', formData).then(res => {
                    if (res.data) {
                        console.log(res.data.message)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                })
            },
            panZoomInit (instance, id) {
                const me = this
                me.customInstance = instance
                let planWidth = document.querySelector('.plan_wrapper').getBoundingClientRect().width
                let planHeight = document.querySelector('.plan_wrapper').getBoundingClientRect().height
                instance.zoomAbs(planWidth / 2, planHeight / 2, 0.55)
                me.customWidth = instance.getTransform().x
                me.customHeight = instance.getTransform().y
                planWidth = instance.getTransform().x
                planHeight = instance.getTransform().y
                document.getElementById('zoom_in').addEventListener('click', function(e) {
                    me.customZoom(instance, 'in')
                })
                document.getElementById('zoom_out').addEventListener('click', function(e) {
                    me.customZoom(instance, 'out')
                })
                document.getElementById('reset').addEventListener('click', function(e) {
                    if (me.zoomCtr >= 1) {
                        me.zoomCtr = 0.55
                    }
                    if (me.zoomCtr <= 0.99999) {
                        me.zoomCtr = 1.35
                    }
                    instance.getTransform().x = planWidth
                    instance.getTransform().y = planHeight
                    instance.getTransform().scale = 0.55
                    document.querySelector('.plan_wrapper').style.transform = `matrix(0.55, 0, 0, 0.55, ${planWidth}, ${planHeight})`
                })
            },
            panZoomBeforeWheel (e) {
                let shouldIgnore = !e.altKey
                return shouldIgnore
            },
            panZoomDoubleClick (e) {
                return true
            },
            panZoomTouch (e) {
                return false
            },
            customZoom (instance, type) {
                const me = this
                let planWidth = document.querySelector('.plan_wrapper').offsetWidth
                let planHeight = document.querySelector('.plan_wrapper').offsetHeight
                switch (type) {
                    case 'in':
                        if (me.zoomCtr <= 0.99999) {
                            me.zoomCtr = 1.35
                        }
                        instance.smoothZoom((planWidth / 2) + me.zoomCtr, (planHeight / 2) + me.zoomCtr, me.zoomCtr)
                        me.zoomCtr += 0.25
                        break
                    case 'out':
                        if (me.zoomCtr >= 1.0) {
                            me.zoomCtr = 0.55
                        }
                        instance.smoothZoom((planWidth / 2) + me.zoomCtr, (planHeight / 2) + me.zoomCtr, me.zoomCtr)
                        me.zoomCtr -= 0.25
                        break
                }
            },
            closeMe () {
                const me = this
                me.toggleCustomers = false
            },
            parseSchedule (data) {
                const me = this
                let result = me.$moment(data).format('YYYY-MM-D')
                return result
            },
            generateNextClasses () {
                const me = this
                if (me.isPrev) {
                    me.isPrev = false
                    me.current = me.current + 8
                }
                me.results = []
                for (let i = 0; i < 7; i++) {
                    if (me.current > me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()) {
                        me.current = me.current - me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                        me.currentMonth = me.currentMonth + 1
                        if (me.currentMonth == 13) {
                            me.currentMonth = 1
                            me.currentYear = me.currentYear + 1
                        }
                    }
                    me.populateResults(me.current, 'next')
                    if (i == 0) {
                        me.last = me.current - 1
                    }
                    me.current++
                }
            },
            generatePrevClasses () {
                const me = this
                if (!me.isPrev) {
                    me.isPrev = true
                    me.current = me.current - 8
                }
                me.results = []
                for (let i = 0; i < 7; i++) {
                    if (me.current <= 0) {
                        me.currentMonth = me.currentMonth - 1
                        if (me.currentMonth == 0) {
                            me.currentMonth = 12
                            me.currentYear = me.currentYear - 1
                            if (me.current <= 0) {
                                if (me.last <= 0) {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                                } else {
                                    me.current = me.last
                                }
                            } else {
                                me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${me.last}`, 'YYYY-MM-D').daysInMonth()
                            }
                        } else {
                            if (me.current == 0) {
                                if (me.last == 0) {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${1}`, 'YYYY-MM-D').daysInMonth()
                                } else {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${me.last}`, 'YYYY-MM-D').daysInMonth()
                                }
                            } else {
                                me.current = me.last
                            }
                        }
                    }
                    me.populateResults(me.current, 'prev')
                    me.current--
                    if (i == 6) {
                        me.last = me.current
                    }
                }
            },
            populateClasses () {
                const me = this
                me.results = []
                me.loader(true)
                let currentDate = parseInt(me.$moment().format('D'))
                me.current = currentDate
                me.last = currentDate
                me.currentMonth = parseInt(me.$moment().format('M'))
                me.currentYear = parseInt(me.$moment().format('YYYY'))
                for (let i = 0; i < 7; i++) {
                    if (currentDate > me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()) {
                        currentDate = 1
                        me.currentMonth = me.currentMonth + 1
                        if (me.currentMonth == 13) {
                            me.currentMonth = 1
                            me.currentYear = me.currentYear + 1
                        }
                    }
                    me.results.push({
                        abbr: (i == 0 ) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('ddd'),
                        date: me.$moment(`${me.currentYear}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('MMMM D, YYYY'),
                        value: currentDate
                    })
                    currentDate++
                    me.current = currentDate
                    me.isPrev = false
                }
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            },
            populateResults (data, type) {
                const me = this
                document.querySelectorAll('.content_wrapper .class_accordion').forEach((value, index) => {
                    value.classList.remove('toggled')
                    value.querySelector('.accordion_content').style.height = 0
                })
                me.loader(true)
                switch (type) {
                    case 'next':
                        me.results.push({
                            abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            date: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMMM D, YYYY'),
                            value: data
                        })
                        break
                    case 'prev':
                        me.results.unshift({
                            abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('D') == me.$moment().format('D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            date: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMMM D, YYYY'),
                            value: data
                        })
                        break
                }
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            },
            async toggleClass (event, month, day, year) {
                const me = this
                const target = event.target
                if (!target.parentNode.classList.contains('toggled')) {
                    await me.$axios.get(`api/schedules?month=${month}&year=${year}&day=${day}&studio_id=${me.studioID}`).then(res => {
                        if (res.data) {
                            me.schedules = res.data.schedules
                        }
                    })
                    target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                    setTimeout( () => {
                        target.parentNode.classList.add('toggled')
                    }, 100)

                } else {
                    target.nextElementSibling.style.height = 0
                    target.parentNode.classList.remove('toggled')
                }
            },
            fetchData (value) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/customers?enabled=${value}`).then(res => {
                    if (res.data) {
                        me.customers = res.data.customers.data
                        me.customerLength = me.customers.length
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.studios = me.$store.state.user.staff_details.studio_access
                        me.notePad = me.$store.state.user.notepad
                    }, 100)
                    me.rowCount = document.getElementsByTagName('th').length
                    me.loaded = true
                })
                me.$axios.get('api/extras/customer-types').then(res => {
                    me.customerTypes = res.data.customerTypes
                })
                me.populateClasses()
            }
        },
        async mounted () {
            const me = this
            me.fetchData(1)
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
        }
    }
</script>
