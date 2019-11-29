<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click.once="toggleClose()"></div>
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group alternate">
                <div class="form_group">
                    <input type="password" name="curent_user_password" placeholder="Enter your password" class="default_text" v-validate="'required'">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('curent_user_password')">{{ errors.first('curent_user_password') }}</span></transition>
                </div>
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
            },
            category: {
                type: String,
                default: ''
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    me.$validator.validateAll().then(valid => {
                        if (valid) {
                            switch (me.category) {
                                case 'purchase-order':
                                    if (document.getElementById('validate').checked) {
                                        console.log("done");
                                    } else {
                                        console.log('yeah');
                                    }
                                    break
                                }
                        }
                    })
                } else {
                    document.getElementById('validate').checked ^= true
                }
                me.$store.state.promptValidateStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
