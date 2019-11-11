<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table booker" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Booker</h1>
                    <div class="actions">
                        <form class="customer_filter_flex" id="filter">
                            <div class="form_group customer">
                                <label for="studio_id">Studio</label>
                                <select class="default_select alternate" name="studio_id">
                                    <option value="" selected>All Studios</option>
                                    <option :value="studio.id" v-for="(studio, key) in studios" :key="key">{{ studio.name }}</option>
                                </select>
                            </div>
                            <div class="form_group margin" v-click-outside="closeMe">
                                <label for="q">Find a Customer</label>
                                <input type="text" name="q" autocomplete="off" placeholder="Search for a customer" class="default_text search_alternate" @click="toggleCustomers ^= true">
                                <div :class="`customer_selection ${(customers.length > 6) ? 'scrollable' : ''}`" v-if="toggleCustomers">
                                    <div class="customer_selection_list">
                                        <div class="customer_wrapper" :id="`customer_${customer.id}`" v-for="(customer, key) in customers" :key="key">
                                            <img :src="customer.customer_details.images[0].path_resized" v-if="customer.customer_details.images.length > 0" />
                                            <div class="customer_image" v-else>
                                                {{ customer.first_name.charAt(0) }}{{ customer.last_name.charAt(0) }}
                                            </div>
                                            <div class="customer_name">
                                                {{ customer.first_name }} {{ customer.last_name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="customer_selected">
                                <div class="customer_label">No Customer Selected</div>
                                <div class="customer_text">Find a Customer / Scan QR Code</div>
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
                        <div class="booker_footer">
                            <div class="booker_notepad">
                                <h2 class="footer_title">Notepad</h2>
                                <div class="notepad_text">
                                    <textarea name="notepad" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="booker_waitlist">
                                <div class="footer_header">
                                    <h2 class="footer_title">Waitlist (3)</h2>
                                    <a href="javascript:void(0)" class="action_success_btn">Add to Wishlist</a>
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
    export default {
        components: {
            Foot
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
                customers: [],
                schedules: [],
                current: 0,
                last: 0,
                test: 0,
                currentMonth: 0,
                currentYear: 0,
                isPrev: false,
                toggleCustomers: false
            }
        },
        methods: {
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
                            if (me.current < 0) {
                                me.current = me.last
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
                            abbr: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            date: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMMM D, YYYY'),
                            value: data
                        })
                        break
                    case 'prev':
                        me.results.unshift({
                            abbr: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
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
                    await me.$axios.get(`api/schedules?month=${month}&year=${year}&day=${day}`).then(res => {
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
            submissionSuccess () {
                const me = this
                let formData = new FormData(document.getElementById('filter'))
                formData.append('enabled', me.status)
                me.loader(true)
                me.$axios.post(`api/customers/search`, formData).then(res => {
                    me.res = res.data
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            toggleStatus (id, enabled, status) {
                const me = this
                me.$store.state.confirmStatus = true
                setTimeout( () => {
                    me.$refs.enabled.confirm.table_name = 'roles'
                    me.$refs.enabled.confirm.id = id
                    me.$refs.enabled.confirm.enabled = enabled
                    me.$refs.enabled.confirm.status = status
                    me.$refs.enabled.confirm.type = 'role'
                }, 100)
                document.body.classList.add('no_scroll')
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (value) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/customers?enabled=${value}`).then(res => {
                    me.customers = res.data.customers.data
                    me.loaded = true
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    me.rowCount = document.getElementsByTagName('th').length
                })
                me.$axios.get('api/studios?enabled=1').then(res => {
                    me.studios = res.data.studios
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
