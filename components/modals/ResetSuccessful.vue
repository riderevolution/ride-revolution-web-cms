<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                You have successfully changed your password.
            </div>
            <div class="button_group">
                <div class="action_success_btn confirm margin" @click="toggleClose()">Ok</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.resetSuccessfulStatus = false
                me.$router.push('/login')
            }
        }
    }
</script>
