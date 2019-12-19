<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay assign" @submit.prevent="submissionSuccess()">
            <div class="modal_wrapper">
                <h2 class="form_title">{{ (type == 1) ? 'Assign a Guest' : 'Block Bike (Comp)' }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group alternate">
                    <div class="form_group">
                        <div class="form_flex_radio">
                            <div class="form_radio">
                                <input type="radio" id="member" value="member" name="assign_type" class="action_radio" checked @change="getAssign($event)">
                                <label for="member">Member</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="non-member" value="non-member" name="assign_type" class="action_radio" @change="getAssign($event)">
                                <label for="non-member">Non-member</label>
                            </div>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="customer">Find a Customer <span>*</span></label>
                        <input type="text" name="customer" autocomplete="off" autofocus class="default_text search_alternate" v-validate="'required'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('customer')">{{ errors.first('customer') }}</span></transition>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check default">
                            </div>
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">{{ (type == 1) ? 'Assign' : 'Block' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <transition name="fade">
            <prompt v-if="$store.state.promptStatus" :message="message" :hasChange="true" />
        </transition>
    </div>
</template>

<script>
    import Prompt from './Prompt'
    export default {
        components: {
            Prompt
        },
        props: {
            type: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                message: '',
                studio: '',
                studios: [],
                currentStudio: [],
                selectedStudio: []
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.assignStatus = false
                document.body.classList.remove('no_scroll')
            },
            submissionSuccess () {
                const me = this
            }
        },
        mounted () {
            const me = this

        }
    }
</script>
