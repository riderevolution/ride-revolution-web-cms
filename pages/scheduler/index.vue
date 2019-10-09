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
                    <div class="calendar_actions">
                        <div class="action_flex">
                            <a href="javascript:void(0)" class="action_calendar_btn" @click="generateCalendar($moment().year(), $moment().month() + 1, 0)">This Month</a>
                            <a href="javascript:void(0)" class="action_calendar_btn margin" @click="generateCalendar($moment().year(), $moment().month() + 1, 1)">This Week</a>
                        </div>
                        <div class="action_flex">
                            <div class="gear_action">
                                <svg xmlns="http://www.w3.org/2000/svg" class="calendar_gear" id="gear_month" width="38.568" height="32.924" viewBox="0 0 38.568 32.924" @click="monthGear()"> <rect width="38.569" height="32.924" rx="3" transform="translate(0 0)"/> <g transform="translate(10.043 7.221)"> <ellipse cx="6.719" cy="6.719" rx="6.719" ry="6.719" transform="translate(2.196 2.197)" class="gear_2"/> <line y2="2.197" transform="translate(8.916)" class="gear_2"/> <line y2="2.197" transform="translate(8.916 15.635)" class="gear_2"/> <line x2="2.197" transform="translate(0 8.916)" class="gear_2"/> <line x2="2.197" transform="translate(15.635 8.916)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(2.611 2.611)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(13.667 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(2.611 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(13.667 2.611)" class="gear_2"/> </g> </svg>
                                <div :class="`gear_overlay ${(monthStatus) ? 'active' : ''}`">
                                    <ul class='gear_list_wrapper'>
                                        <li class='gear_list'><a class='clear gear_item' href='javascript:void(0)' @click="clearMonth()">Clear Month</a></li>
                                        <li class='gear_list'><a class='duplicate gear_item' href='javascript:void(0)' @click="duplicateMonth()">Duplicate Month</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="calendar_header">
                        <div class="calendar_prev" @click="generatePrevCalendar()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                        </div>
                        <h2 class="calendar_title">{{ monthName }} {{ yearName }}</h2>
                        <div class="calendar_next" @click="generateNextCalendar()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"> <g transform="translate(-248 -187)"> <g class="arrow_1" transform="translate(248 187)"> <circle class="arrow_3" cx="14" cy="14" r="14" /> <circle class="arrow_4" cx="14" cy="14" r="13.5" /> </g> <path class="arrow_2" d="M184.939,200.506l-3.981,3.981,3.981,3.981" transform="translate(445.438 405.969) rotate(180)" /> </g> </svg>
                        </div>
                    </div>
                    <div class="cms_table_calendar_wrapper">
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
                </div>
            </section>
        </div>
        <transition name="fade">
            <foot v-if="$store.state.isAuth" />
        </transition>
        <transition name="fade">
            <calendar-clear v-if="$store.state.calendarClearStatus" :unix="currentUnix" :type="calendarType" />
        </transition>
        <transition name="fade">
            <calendar-duplicate v-if="$store.state.calendarDuplicateStatus" :type="calendarType" :yearPicked="currentYear" :monthPicked="currentMonth" />
        </transition>
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    import CalendarClear from '../../components/modals/CalendarClear'
    import CalendarDuplicate from '../../components/modals/CalendarDuplicate'
    export default {
        components: {
            Foot,
            CalendarClear,
            CalendarDuplicate
        },
        data () {
            return {
                lastRoute: '',
                loaded: false,
                monthStatus: false,
                currentDate: 0,
                currentMonth: 0,
                currentYear: 0,
                currentUnix: 0,
                calendarType: 'day',
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
                me.generateCalendar(me.currentYear, me.currentMonth, 0)
            },
            generateNextCalendar () {
                const me = this
                me.currentMonth = me.currentMonth + 1
                if (me.currentMonth == 13) {
                    me.currentMonth = 1
                    me.currentYear = me.currentYear + 1
                }
                me.generateCalendar(me.currentYear, me.currentMonth, 0)
            },
            clearTableRows () {
                document.querySelectorAll('.cms_table_calendar tbody tr').forEach(function(e){e.remove()})
            },
            generateCalendar (year, month, highlight) {
                const me = this
                me.clearTableRows()
                me.currentDate = me.$moment().date()
                me.monthName = me.$moment(`${year}-${month}`, 'YYYY-MM').format('MMMM')
                me.yearName = me.$moment(`${year}-${month}`, 'YYYY-MM').format('YYYY')
                let startDate = 1
                let nextDate = 1
                let prevDate = me.$moment(`${year}-${(month - 1 == 0) ? 12 : month - 1}`, 'YYYY-MM').daysInMonth()
                let endDate = me.$moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
                let calendarTable = document.querySelector('.cms_table_calendar tbody')
                let current = me.$moment(`${year}-${month}-${startDate}`, 'YYYY-MM-D').format('d')
                let excess = 0
                me.loader(true)
                /**
                 * Generate Rows **/
                for (let i = 0; i < 6; i++) {
                    let tableRow = document.createElement('tr')
                    /**
                    * Generate Columns **/
                    for (let j = 0; j < 7; j++) {
                        if (startDate <= endDate) {
                            if (me.$moment(`${year}-${month}-${startDate}`, 'YYYY-MM-D').format('d') == j) {
                                let unixTimestamp = me.$moment(`${year}-${month}-${startDate}`, 'YYYY-MM-D').valueOf()
                                if (highlight && me.currentDate == startDate) {
                                    tableRow.classList.add('highlighted')
                                }
                                tableRow.innerHTML += `
                                    <td id="col_${i}" class='day_wrapper fade_in'>
                                        <div class='header_wrapper'>
                                            <div class='header_day ${(me.currentDate == startDate) ? 'active' : '' }'>${startDate}</div>
                                            <div class='header_menu'>
                                                <div class='menu_circles' id=menu_${startDate}>&#x25CF; &#x25CF; &#x25CF;</div>
                                                <div class='menu_overlay ${(j == 6) ? 'alternate' : ''}'>
                                                    <ul class='menu_list_wrapper'>
                                                        <li class='menu_list'><a class='add menu_item' href='/${me.lastRoute}/${unixTimestamp}/create'>Add a Class</a></li>
                                                        <li class='menu_list'><a class='clear menu_item' href='${unixTimestamp}'>Clear a Day</a></li>
                                                        <li class='menu_list'><a class='duplicate menu_item' href='javascript:void(0)'>Duplicate Day</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="classes" id="class_${startDate}">
                                            <a href="/${me.lastRoute}/${unixTimestamp}/1/edit" class="class_wrapper private">
                                                <div class="class_text margin"><img src="/icons/private-class.svg" /><span>10:00 AM</span></div>
                                                <div class="class_text">Ride Rev (50 mins.)</div>
                                            </a>
                                            <a href="/${me.lastRoute}/${unixTimestamp}/1/edit" class="class_wrapper original">
                                                <div class="class_text margin">10:00 AM</div>
                                                <div class="class_text">Ride Rev (50 mins.)</div>
                                            </a>
                                            <a href="/${me.lastRoute}/${unixTimestamp}/1/edit" class="class_wrapper draft">
                                                <div class="class_text margin">10:00 AM</div>
                                                <div class="class_text">Ride Rev (50 mins.)</div>
                                            </a>
                                            <a href="/${me.lastRoute}/${unixTimestamp}/1/edit" class="class_wrapper ${(me.currentDate > startDate) ? 'completed' : 'uncomplete'}">
                                                <div class="class_text margin">10:00 AM</div>
                                                <div class="class_text">Ride Rev (50 mins.)</div>
                                            </a>
                                        </div>
                                        ${(j == 6) ? `<svg xmlns="http://www.w3.org/2000/svg" width="38.568" height="32.924" viewBox="0 0 38.568 32.924" class="calendar_gear" id="gear_${startDate}"> <rect width="38.569" height="32.924" rx="3" transform="translate(0 0)"/> <g transform="translate(10.043 7.221)"> <ellipse cx="6.719" cy="6.719" rx="6.719" ry="6.719" transform="translate(2.196 2.197)" class="gear_2"/> <line y2="2.197" transform="translate(8.916)" class="gear_2"/> <line y2="2.197" transform="translate(8.916 15.635)" class="gear_2"/> <line x2="2.197" transform="translate(0 8.916)" class="gear_2"/> <line x2="2.197" transform="translate(15.635 8.916)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(2.611 2.611)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(13.667 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(2.611 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(13.667 2.611)" class="gear_2"/> </g> </svg><div class="gear_overlay"><ul class="gear_list_wrapper"> <li class="gear_list"><a class="clear gear_item" href="javascript:void(0)">Clear Week</a></li> <li class="gear_list"><a class="duplicate gear_item" href="javascript:void(0)">Duplicate Week</a></li> </ul> </div>` : '' }
                                    </td>`
                                startDate++
                            } else {
                                let prevDate = me.$moment(`${year}-${(month - 1 == 0) ? 12 : month - 1}`, 'YYYY-MM').daysInMonth()
                                current--
                                if (current <= 0) {
                                    prevDate = me.$moment(`${year}-${(month - 1 == 0) ? 12 : month - 1}`, 'YYYY-MM').daysInMonth()
                                } else {
                                    prevDate = prevDate - current
                                }
                                excess++
                                /**
                                 * Generate Previous Dates **/
                                tableRow.innerHTML += `
                                    <td class='day_wrapper disabled_day'>
                                        <div class='header_wrapper'>
                                            <div class='header_day'>${prevDate}</div>
                                        </div>
                                    </td>`
                            }
                        } else {
                            /**
                             * Generate Next Dates **/
                            if (me.$moment(`${year}-${month}-${1}`, 'YYYY-MM-D').format('d') == 0) {
                                if (i == 4) {
                                    tableRow.innerHTML += `
                                        <td id="col_${i}" class='day_wrapper disabled_day'>
                                            <div class='header_wrapper'>
                                                <div class='header_day'>${nextDate}</div>
                                            </div>
                                            ${(j == 6 && i == 4) ? `<svg xmlns="http://www.w3.org/2000/svg" width="38.568" height="32.924" viewBox="0 0 38.568 32.924" class="calendar_gear" id="gear_${startDate - 1}"> <rect width="38.569" height="32.924" rx="3" transform="translate(0 0)"/> <g transform="translate(10.043 7.221)"> <ellipse cx="6.719" cy="6.719" rx="6.719" ry="6.719" transform="translate(2.196 2.197)" class="gear_2"/> <line y2="2.197" transform="translate(8.916)" class="gear_2"/> <line y2="2.197" transform="translate(8.916 15.635)" class="gear_2"/> <line x2="2.197" transform="translate(0 8.916)" class="gear_2"/> <line x2="2.197" transform="translate(15.635 8.916)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(2.611 2.611)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(13.667 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(2.611 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(13.667 2.611)" class="gear_2"/> </g> </svg><div class="gear_overlay"><ul class="gear_list_wrapper"> <li class="gear_list"><a class="clear gear_item" href="javascript:void(0)">Clear Week</a></li> <li class="gear_list"><a class="duplicate gear_item" href="javascript:void(0)">Duplicate Week</a></li> </ul> </div>` : '' }
                                        </td>`
                                    nextDate++
                                }
                            } else {
                                tableRow.innerHTML += `
                                    <td id="col_${i}" class='day_wrapper disabled_day'>
                                        <div class='header_wrapper'>
                                            <div class='header_day'>${nextDate}</div>
                                        </div>
                                        ${(j == 6 && i == 4) ? `<svg xmlns="http://www.w3.org/2000/svg" width="38.568" height="32.924" viewBox="0 0 38.568 32.924" class="calendar_gear" id="gear_${startDate - 1}"> <rect width="38.569" height="32.924" rx="3" transform="translate(0 0)"/> <g transform="translate(10.043 7.221)"> <ellipse cx="6.719" cy="6.719" rx="6.719" ry="6.719" transform="translate(2.196 2.197)" class="gear_2"/> <line y2="2.197" transform="translate(8.916)" class="gear_2"/> <line y2="2.197" transform="translate(8.916 15.635)" class="gear_2"/> <line x2="2.197" transform="translate(0 8.916)" class="gear_2"/> <line x2="2.197" transform="translate(15.635 8.916)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(2.611 2.611)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(13.667 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(2.611 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(13.667 2.611)" class="gear_2"/> </g> </svg><div class="gear_overlay"><ul class="gear_list_wrapper"> <li class="gear_list"><a class="clear gear_item" href="javascript:void(0)">Clear Week</a></li> <li class="gear_list"><a class="duplicate gear_item" href="javascript:void(0)">Duplicate Week</a></li> </ul> </div>` : '' }
                                    </td>`
                                nextDate++
                            }
                        }
                    }
                    calendarTable.appendChild(tableRow)
                }
                document.querySelectorAll('tr #col_5').forEach((element, index) => {
                    let lastValue = element.querySelector('.header_wrapper .header_day').innerHTML
                    let lastElement = document.querySelectorAll('tr #col_5')[document.querySelectorAll('tr #col_5').length - 1]
                    if (lastValue == 31 || lastValue == 30) {
                        lastElement.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="38.568" height="32.924" viewBox="0 0 38.568 32.924" class="calendar_gear" id="gear_${startDate - 1}"> <rect width="38.569" height="32.924" rx="3" transform="translate(0 0)"/> <g transform="translate(10.043 7.221)"> <ellipse cx="6.719" cy="6.719" rx="6.719" ry="6.719" transform="translate(2.196 2.197)" class="gear_2"/> <line y2="2.197" transform="translate(8.916)" class="gear_2"/> <line y2="2.197" transform="translate(8.916 15.635)" class="gear_2"/> <line x2="2.197" transform="translate(0 8.916)" class="gear_2"/> <line x2="2.197" transform="translate(15.635 8.916)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(2.611 2.611)" class="gear_2"/> <line x2="1.553" y2="1.553" transform="translate(13.667 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(2.611 13.667)" class="gear_2"/> <line y1="1.553" x2="1.553" transform="translate(13.667 2.611)" class="gear_2"/> </g> </svg><div class="gear_overlay"><ul class="gear_list_wrapper"> <li class="gear_list"><a class="clear gear_item" href="javascript:void(0)">Clear Week</a></li> <li class="gear_list"><a class="duplicate gear_item" href="javascript:void(0)">Duplicate Week</a></li> </ul> </div>`
                    }
                })
                setTimeout( () => {
                    me.loader(false)
                    me.clickDates(1, endDate, excess)
                }, 300)
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                let startDate = 1
                let endDate = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                let elementMonth = document.getElementById('gear_month')
                if (elementMonth !== target.ownerSVGElement && elementMonth !== target.parentNode.parentNode.parentNode.previousElementSibling) {
                    me.monthStatus = false
                }
                do {
                    let elementDay = document.getElementById(`menu_${startDate}`)
                    let elementWeek = document.getElementById(`gear_${startDate}`)
                    if (elementDay !== target && elementDay !== target.parentNode.parentNode.parentNode.previousElementSibling) {
                        if (elementDay.nextElementSibling.classList.contains('active')) {
                            elementDay.nextElementSibling.classList.remove('active')
                        }
                    }
                    if (elementWeek != null) {
                        if (elementWeek !== target.ownerSVGElement && elementWeek !== target.parentNode.parentNode.parentNode.previousElementSibling) {
                            if (elementWeek.nextElementSibling.classList.contains('active')) {
                                elementWeek.nextElementSibling.classList.remove('active')
                            }
                        }
                    }
                    startDate++
                } while (startDate <= endDate)
            },
            monthGear () {
                const me = this
                let month = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').format('M-YYYY')
                me.monthStatus ^= true
            },
            clearMonth () {
                const me = this
                me.calendarType = 'month'
                me.$store.state.calendarClearStatus = true
            },
            duplicateMonth () {
                const me = this
                me.calendarType = 'month'
                me.$store.state.calendarDuplicateStatus = true
            },
            clickDates (startNum, endNum, firstDayExcess) {
                const me = this
                let month = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').format('M')
                let year = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').format('YYYY')
                do {
                    let elementDay = (document.getElementById(`menu_${startNum}`) != null) ? document.getElementById(`menu_${startNum}`) : null
                    let elementWeek = (document.getElementById(`gear_${startNum - 1}`) != null) ? document.getElementById(`gear_${startNum - 1}`) : null
                    let elementDayAdd = (elementDay != null) ? elementDay.nextElementSibling.querySelector('.menu_list_wrapper .add') : null
                    let elementDayClear = (elementDay != null) ? elementDay.nextElementSibling.querySelector('.menu_list_wrapper .clear') : null
                    let elementDayDuplicate = (elementDay != null) ? elementDay.nextElementSibling.querySelector('.menu_list_wrapper .duplicate') : null
                    let elementWeekClear = (elementWeek != null) ? elementWeek.nextElementSibling.querySelector('.gear_list_wrapper .clear') : null
                    let elementWeekDuplicate = (elementWeek != null) ? elementWeek.nextElementSibling.querySelector('.gear_list_wrapper .duplicate') : null
                    let classNode = (document.getElementById(`class_${startNum}`) != null) ? document.getElementById(`class_${startNum}`) : null
                    /**
                     * Day **/
                    if (elementDay != null) {
                        /**
                        * Toggle Day Overlay **/
                        elementDay.addEventListener('click', function(e) {
                            let me = this
                            let overlay = me.nextElementSibling
                            if (overlay.classList.contains('active')) {
                                overlay.classList.remove('active')
                            } else {
                                overlay.classList.add('active')
                            }
                        })
                        if (elementDayAdd != null) {
                            elementDayAdd.addEventListener('click', function(e) {
                                e.preventDefault()
                                me.$router.push(e.target.getAttribute('href'))
                            })
                        }
                        if (elementDayClear != null) {
                            elementDayClear.addEventListener('click', function(e) {
                                e.preventDefault()
                                me.currentUnix = e.target.getAttribute('href')
                                me.calendarType = 'day'
                                me.$store.state.calendarClearStatus = true
                            })
                        }
                        if (elementDayDuplicate != null) {
                            elementDayDuplicate.addEventListener('click', function(e) {
                                e.preventDefault()
                                me.calendarType = 'day'
                                me.$store.state.calendarDuplicateStatus = true
                            })
                        }
                    }

                    /**
                     * Weekly **/
                    if (elementWeek != null && elementWeek != 0) {
                        /**
                        * Toggle Week Overlay **/
                        elementWeek.addEventListener('click', function(e) {
                            e.preventDefault()
                            let element = this
                            let overlay = element.nextElementSibling
                            // let id = element.id.split('_')[1]
                            // console.log(me.getFirstDayofWeek(id, firstDayExcess));
                            // console.log(me.getLastDayofWeek(id));
                            if (overlay.classList.contains('active')) {
                                overlay.classList.remove('active')
                            } else {
                                overlay.classList.add('active')
                            }
                        })
                        if (elementWeekClear != null) {
                            elementWeekClear.addEventListener('click', function(e) {
                                me.calendarType = 'week'
                                me.$store.state.calendarClearStatus = true
                            })
                        }
                        if (elementWeekDuplicate != null) {
                            elementWeekDuplicate.addEventListener('click', function(e) {
                                e.preventDefault()
                                me.calendarType = 'week'
                                me.$store.state.calendarDuplicateStatus = true
                            })
                        }
                    }

                    if (classNode != null) {
                        if (classNode.querySelector('.private')) {
                            classNode.querySelector('.private').addEventListener('click', function(e) {
                                e.preventDefault()
                                me.$router.push(this.getAttribute('href'))
                            })
                        }
                        if (classNode.querySelector('.original')) {
                            classNode.querySelector('.original').addEventListener('click', function(e) {
                                e.preventDefault()
                                me.$router.push(this.getAttribute('href'))
                            })
                        }
                        if (classNode.querySelector('.draft')) {
                            classNode.querySelector('.draft').addEventListener('click', function(e) {
                                e.preventDefault()
                                me.$router.push(this.getAttribute('href'))
                            })
                        }
                        if (classNode.querySelector('.completed')) {
                            classNode.querySelector('.completed').addEventListener('click', function(e) {
                                e.preventDefault()
                                me.$router.push(this.getAttribute('href'))
                            })
                        }
                        if (classNode.querySelector('.uncomplete')) {
                            classNode.querySelector('.uncomplete').addEventListener('click', function(e) {
                                e.preventDefault()
                                me.$router.push(this.getAttribute('href'))
                            })
                        }
                    }
                    startNum++
                } while (startNum < 50)
            },
            getFirstDayofWeek (startDate, excess) {
                const me = this
                let firstDayofWeek = parseInt(me.$moment(`${me.currentYear}-${me.currentMonth}-${startDate}`, 'YYYY-MM-D').startOf('week').format('D')) + parseInt(excess)
                if (firstDayofWeek == 31 || firstDayofWeek == 32) {
                    firstDayofWeek = 1
                } else {
                    firstDayofWeek = firstDayofWeek - excess
                }
                return parseInt(firstDayofWeek)
            },
            getLastDayofWeek (startDate) {
                const me = this
                let lastDayofWeek = me.$moment(`${me.currentYear}-${me.currentMonth}-${startDate}`, 'YYYY-MM-D').endOf('week').format('D')
                if (startDate == 30 || startDate == 31) {
                    lastDayofWeek = me.$moment(`${me.currentYear}-${me.currentMonth}-${startDate}`, 'YYYY-MM-D').daysInMonth()
                }
                return parseInt(lastDayofWeek)
            },
            fetchData () {
                const me = this
                me.$axios.get('api/studios?enabled=1').then(res => {
                    me.studios = res.data.studios
                })
                me.$axios.get('api/instructors?enabled=1').then(res => {
                    me.instructors = res.data.instructors.data
                })
                me.generateCalendar(me.currentYear = me.$moment().year(), me.currentMonth = me.$moment().month() + 1, 0)
                me.loaded = true
            }
        },
        mounted () {
            const me = this
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 1]
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
