<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <h2 class="confirmation_title">Payment Saved!</h2>
            <div class="confirmation_default">
                Customer will be notified of their pending payment through email.
            </div>
            <div class="button_group">
                <div class="action_success_btn confirm" @click="toggleClose()">Done</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.successfulLaterStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
