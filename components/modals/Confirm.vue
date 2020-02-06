<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_text">
                Sample Text
            </div>
            <div class="button_group">
                <div class="action_cancel_btn" @click="toggleClose()">Cancel</div>
                <div class="action_success_btn margin" @click="proceedStatus()">Proceed</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.confirmStatus = false
                document.body.classList.remove('no_scroll')
            },
            proceedStatus () {
                const me = this
                me.$store.state.confirmStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
