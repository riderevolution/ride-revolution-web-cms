<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <h2 class="confirmation_title">Password Sent!</h2>
            <div class="confirmation_default">
                Great! Kindly check your email to see your new password. You can change your password anytime once you have logged in.
            </div>
            <div class="button_group">
                <div class="action_success_btn confirm margin" @click="toggleClose()">Done</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.resetStatus = false
                me.$router.push('/login')
            }
        }
    }
</script>
