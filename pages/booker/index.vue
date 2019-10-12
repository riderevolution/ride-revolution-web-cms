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
                            <div class="form_group margin">
                                <label for="q">Find a Customer</label>
                                <input type="text" name="q" autocomplete="off" placeholder="Search for a customer" class="default_text search_alternate">
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
                                <div class="booker_prev" @click="generatePrevCalendar()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                                </div>
                                <h2 class="booker_title">Classes</h2>
                                <div class="booker_next" @click="generateNextCalendar()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                                </div>
                            </div>
                            <a href="javascript:void(0)" class="action_calendar_btn">Today</a>
                        </div>
                        <div class="content_wrapper">
                            <div class="class_accordion">
                                <div class="accordion_header">
                                    Today | May 6, 2019
                                </div>
                                <div class="accordion_content">
                                    <a href="javascript:void(0)" class="class_content">
                                        <div class="class_title">
                                            <span>12:15 PM, Ride Rev</span>
                                            <div class="class_status full">
                                                Full (28)
                                            </div>
                                        </div>
                                        <div class="class_text">
                                            Billie (50 mins)
                                        </div>
                                        <div class="class_text alternate">
                                            <span>Signed-in: 3</span>
                                            <span>Available: 3</span>
                                            <span>No show: 3</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="booker_content">
                        <div class="booker_footer">

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
                res: [],
                studios: []
            }
        },
        methods: {
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
                    me.res = res.data
                    me.loaded = true
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                    me.rowCount = document.getElementsByTagName('th').length
                })
                me.$axios.get('api/studios?enabled=1').then(res => {
                    me.studios = res.data.studios
                })
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
