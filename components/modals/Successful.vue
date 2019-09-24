<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <h2 class="confirmation_title">Payment Successful!</h2>
            <div class="confirmation_default">
                The order was successfully processed.
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
                me.$store.state.successfulStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
