te<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Scheduler</h1>
                </div>
                <div class="filter_wrapper alternate">
                    <form class="filter_flex" id="filter" method="post" @submit.prevent="submissionSuccess(package_status)">
                        <div class="form_group">
                            <label for="studio_id">Studio</label>
                            <select class="default_select alternate" name="studio_id">
                                <option value="" selected>All Studios</option>
                            </select>
                        </div>
                        <div class="form_group margin">
                            <label for="instructor_id">Instructor</label>
                            <select class="default_select alternate" name="instructor_id">
                                <option value="" selected>All Instructors</option>
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
                {{ month }}
                <div class="calendar_wrapper">
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
                month: '',
                dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        },
        methods: {
            generateCalendar (year, month) {
                const me = this
                me.month = me.$moment(`${year}-${month}`).format('MMMM')
                let startDate = 1
                let nextDate = 1
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
                                                <div class='menu_circles' id=menu_${startDate}><span>&#x25CF;</span><span class='margin'>&#x25CF;</span><span class='margin'>&#x25CF;</span></div>
                                                <div class='menu_overlay'>
                                                    <ul class='menu_list_wrapper'>
                                                        <li class='menu_list'><a class='menu_item' href='javascript:void(0)'>Add a Class</a></li>
                                                        <li class='menu_list'><a class='menu_item' href='javascript:void(0)'>Clear a Day</a></li>
                                                        <li class='menu_list'><a class='menu_item' href='javascript:void(0)'>Duplicate Day</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>`
                                startDate++
                            } else {
                                tableRow.innerHTML += '<td></td>'
                            }
                        } else {
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
            clickDates (startNum, endNum) {
                const me = this
                do {
                    let element = document.getElementById(`menu_${startNum}`)
                    element.addEventListener('click', function() {
                        alert('I got clicked')
                    })
                    startNum++
                } while (startNum <= endNum)
            }
        },
        mounted () {
            const me = this
            me.generateCalendar(me.$moment().year(), me.$moment().month() + 1)
            me.loaded = true
        }
    }
</script>
