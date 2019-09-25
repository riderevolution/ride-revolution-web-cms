<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Scheduler</h1>
                    <div class="actions">
                        <a href="javascript:void(0)" class="action_btn">Print Schedule</a>
                    </div>
                </div>
                <div class="filter_wrapper alternate">
                    <form class="filter_flex" id="filter" method="post" @submit.prevent="submissionSuccess(package_status)">
                        <div class="form_group">
                            <label for="studio_id">Studio</label>
                            <select class="default_select alternate" name="studio_id">
                                <option value="" selected>All Studios</option>
                                <option :value="studio.id" v-for="(studio, key) in studios" :key="key">{{ studio.name }}</option>
                            </select>
                        </div>
                        <div class="form_group margin">
                            <label for="instructor_id">Instructor</label>
                            <select class="default_select alternate" name="instructor_id">
                                <option value="" selected>All Instructors</option>
                                <option :value="instructor.id" v-for="(instructor, key) in instructors" :key="key">{{ instructor.first_name }} {{ instructor.last_name }}</option>
                            </select>
                        </div>
                        <button type="submit" name="button" class="action_btn alternate margin">Search</button>
                    </form>
                    <div class="legends_wrapper">
                        <div class="legend_title gray"><span>&#x25CF;</span> Class Completed</div>
                        <div class="legend_title margin blue"><span>&#x25CF;</span> Published</div>
                        <div class="legend_title margin black"><span>&#x25CF;</span> Draft</div>
                    </div>
                </div>
            </section>
            <section id="content">
                <div class="calendar_wrapper">
                    <div class="calendar_header">
                        <div class="calendar_prev" @click="generatePrevCalendar()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                        </div>
                        <h2 class="calendar_title">{{ monthName }} {{ yearName }}</h2>
                        <div class="calendar_next" @click="generateNextCalendar()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                        </div>
                    </div>
                    <table class="cms_table_calendar">
                        <thead>
                            <tr>
                                <th v-for="(dayLabel, key) in dayLabels" :key="key">{{ dayLabel }}</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
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
                currentMonth: 0,
                currentYear: 0,
                monthName: '',
                yearName: '',
                studios: [],
                instructors: [],
                dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        },
        methods: {
            generatePrevCalendar () {
                const me = this
                me.currentMonth = me.currentMonth - 1
                if (me.currentMonth == 0) {
                    me.currentMonth = 12
                    me.currentYear = me.currentYear - 1
                }
                me.generateCalendar(me.currentYear, me.currentMonth)
            },
            generateNextCalendar () {
                const me = this
                me.currentMonth = me.currentMonth + 1
                if (me.currentMonth == 13) {
                    me.currentMonth = 1
                    me.currentYear = me.currentYear + 1
                }
                me.generateCalendar(me.currentYear, me.currentMonth)
            },
            clearTableRows () {
                document.querySelectorAll('.cms_table_calendar tbody tr').forEach(function(e){e.remove()})
            },
            generateCalendar (year, month) {
                const me = this
                me.clearTableRows()
                me.monthName = me.$moment(`${year}-${month}`).format('MMMM')
                me.yearName = me.$moment(`${year}-${month}`).format('YYYY')
                let startDate = 1
                let nextDate = 1
                let prevDate = 1
                let endDate = me.$moment(`${year}-${month}`).daysInMonth()
                let calendarTable = document.querySelector('.cms_table_calendar tbody')
                /**
                 * Generate Rows **/
                for (let i = 0; i < 6; i++) {
                    let tableRow = document.createElement('tr')
                    /**
                    * Generate Columns **/
                    for (let j = 0; j < 7; j++) {
                        if (startDate <= endDate) {
                            if (me.$moment(`${year}-${month}-${startDate}`).format('d') == j) {
                                tableRow.innerHTML += `
                                    <td class='day_wrapper'>
                                        <div class='header_wrapper'>
                                            <div class='header_day'>${startDate}</div>
                                            <div class='header_menu'>
                                                <div class='menu_circles' id=menu_${startDate}>&#x25CF; &#x25CF; &#x25CF;</div>
                                                <div class='menu_overlay'>
                                                    <ul class='menu_list_wrapper'>
                                                        <li class='menu_list'><a class='menu_item margin' href='javascript:void(0)'>Add a Class</a></li>
                                                        <li class='menu_list'><a class='menu_item margin' href='javascript:void(0)'>Clear a Day</a></li>
                                                        <li class='menu_list'><a class='menu_item' href='javascript:void(0)'>Duplicate Day</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>`
                                startDate++
                            } else {
                                /**
                                 * Generate Previous Dates **/
                                tableRow.innerHTML += `
                                    <td class='day_wrapper disabled_day'>
                                        <div class='header_wrapper'>
                                            <div class='header_day'>${prevDate}</div>
                                        </div>
                                    </td>`
                                prevDate++
                            }
                        } else {
                            /**
                             * Generate Next Dates **/
                            if (me.$moment(`${year}-${month}-${1}`).format('d') == 0) {
                                if (i == 4) {
                                    tableRow.innerHTML += `
                                        <td class='day_wrapper disabled_day'>
                                            <div class='header_wrapper'>
                                                <div class='header_day'>${nextDate}</div>
                                            </div>
                                        </td>`
                                    nextDate++
                                }
                            } else {
                                tableRow.innerHTML += `
                                    <td class='day_wrapper disabled_day'>
                                        <div class='header_wrapper'>
                                            <div class='header_day'>${nextDate}</div>
                                        </div>
                                    </td>`
                                nextDate++
                            }
                        }
                    }
                    calendarTable.appendChild(tableRow)
                }
                me.clickDates(1, endDate)
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                let startDate = 1
                let endDate = me.$moment(`${me.currentYear}-${me.currentMonth}`).daysInMonth()
                do {
                    let element = document.getElementById(`menu_${startDate}`)
                    if (element !== target && !element.contains(target)) {
                        if (element.nextElementSibling.classList.contains('active')) {
                            element.nextElementSibling.classList.remove('active')
                        }
                    }
                    startDate++
                } while (startDate <= endDate)
            },
            clickDates (startNum, endNum) {
                const me = this
                do {
                    let element = document.getElementById(`menu_${startNum}`)
                    element.addEventListener('click', function(e) {
                        let nextElement = e.target.nextElementSibling
                        if (nextElement.classList.contains('active')) {
                            nextElement.classList.remove('active')
                        } else {
                            nextElement.classList.add('active')
                        }
                    })
                    startNum++
                } while (startNum <= endNum)
            },
            fetchData () {
                const me = this
                me.$axios.get('api/studios?enabled=1').then(res => {
                    me.studios = res.data.studios
                })
                me.$axios.get('api/instructors?enabled=1').then(res => {
                    me.instructors = res.data.instructors.data
                })
                me.generateCalendar(me.currentYear = me.$moment().year(), me.currentMonth = me.$moment().month() + 1)
                me.loaded = true
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        },
        beforeMount () {
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.toggleOverlays)
        }
    }
</script>
