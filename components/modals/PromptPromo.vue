<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group">
                <a href="javascript:void(0)" class="action_cancel_btn" @click.once="toggleClose(false)">Cancel</a>
                <div class="action_success_btn confirm margin" @click.once="toggleClose(true)">Confirm</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: ''
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    me.$parent.promoApplied = true
                    me.$parent.applyPromo()
                    me.$store.state.promptPromoStatus = false
                }else {
                    me.$parent.promoApplied = false
                    me.$store.state.promptPromoStatus = false
                }
            }
        }
    }
</script>
