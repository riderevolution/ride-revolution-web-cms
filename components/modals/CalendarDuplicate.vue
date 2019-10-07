<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
            <div class="modal_wrapper">
                <h2 class="form_title">Duplicate {{ (type == 'day') ? 'Day' : (type == 'week' ? 'into Weeks' : 'Month') }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <transition name="fade">
                    <div class="modal_main_group" v-if="type == 'day'">
                        <div class="form_flex">
                            <div class="form_group check">
                                <input type="date" name="day_date" autocomplete="off" class="default_text date" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('day_date')">{{ errors.first('day_date') }}</span></transition>
                            </div>
                            <div class="form_group flex check">
                                <div class="form_check">
                                    <input type="checkbox" id="include_private_class" name="include_private_class" class="action_check">
                                    <label for="include_private_class">Include Private Class</label>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">Duplicate</button>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div class="modal_main_group" v-if="type == 'week'">
                        {{ populateWeeks }}
                        <div class="form_flex trio">
                            <div class="form_group">
                                <label class="flex_label">Select permissions under this role</label>
                                <div class="form_check">
                                    <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                    <label for="enabled">Activate</label>
                                </div>
                            </div>
                            <div class="form_group">
                                <div class="form_check">
                                    <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                    <label for="enabled">Activate</label>
                                </div>
                            </div>
                            <div class="form_group">
                                <div class="form_check">
                                    <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                    <label for="enabled">Activate</label>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">Duplicate</button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            yearPicked: {
                default: ''
            },
            monthPicked: {
                default: ''
            },
            type: {
                type: String,
                default: 'day'
            }
        },
        computed: {
            populateWeeks () {
                const me = this
                let startDate = 1
                let endDate = me.$moment(`${me.yearPicked}-${me.monthPicked}`, 'YYYY-MM').daysInMonth()
                let month = me.monthPicked
                let year = me.yearPicked
                let data = []
                for (let m = 1; m < 13; m++) {
                    month = month + 1
                    if (month == 13) {
                        month = 1
                        year = year + 1
                    }
                    data.push(
                        {
                            monthName: me.$moment(`${year}-${month}`, 'YYYY-MM').format('MMMM'),
                            weeks: []
                        }
                    )
                }
                // for (let i = 0; i < 6; i++) {
                //     for (let j = 0; j < 7; j++) {
                //
                //     }
                // }
                return data
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.calendarDuplicateStatus = false
                document.body.classList.remove('no_scroll')
            },
            submissionSuccess () {
                const me = this
                switch (type) {
                    case 'day':

                        break
                    case 'week':

                        break
                    case 'month':

                        break
                }
                me.$store.state.calendarDuplicateStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
