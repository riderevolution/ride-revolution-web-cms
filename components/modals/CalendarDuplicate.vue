<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
            <div class="modal_wrapper">
                <h2 class="form_title">Duplicate {{ (type == 'day') ? 'Day' : (type == 'week' ? 'Week' : 'Month') }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group">
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
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'day'
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
