<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionSuccess()">
            <div class="modal_wrapper">
                <h2 class="form_title">Current: {{ currentStudio.name }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group alternate">
                    <div class="form_group">
                        <label for="studio">Select a Studio <span>*</span></label>
                        <select class="default_select" name="studio" v-model="studio">
                            <option value="" selected disabled>Select a Studio</option>
                            <option :value="studio.id" v-for="(studio, key) in studios" :key="key" v-if="studio.id != currentStudio.id">{{ studio.name }}</option>
                        </select>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check default">
                            </div>
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">Change Studio</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                studio: '',
                studios: [],
                currentStudio: []
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.changeStudioStatus = false
                document.body.classList.remove('no_scroll')
            },
            submissionSuccess () {
                const me = this
                setTimeout( () => {
                    me.$store.state.user.current_studio_id = me.studio
                    me.$axios.get('api/studios').then(res => {
                        if (res.data) {
                            me.studios = res.data.studios
                        }
                    })
                    me.$store.state.changeStudioStatus = false
                    document.body.classList.remove('no_scroll')
                }, 10)
            }
        },
        mounted () {
            const me = this
            me.$axios.get(`api/studios/${me.$store.state.user.current_studio_id}`).then(res => {
                if (res.data) {
                    me.currentStudio = res.data.studio
                }
            })
            me.$axios.get('api/studios').then(res => {
                if (res.data) {
                    me.studios = res.data.studios
                }
            })
        }
    }
</script>
