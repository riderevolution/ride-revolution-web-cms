<template>
    <div class="header">
        <div class="header_icons">
            <img src="/icons/header/icon.svg" class="image_responsive" width="19px" height="19px" />
            <img src="/icons/header/icon.svg" class="image_responsive" width="19px" height="19px" />
        </div>
        <div :class="`header_user ${(isToggled) ? 'active' : ''}`" @click="showSelect()">
            <div class="user_picture"></div>
            <div class="user_name">Hello, Admin!</div>
            <div class="user_select">
                <nuxt-link to="javascript:void();" class="select_item">My Account</nuxt-link>
                <nuxt-link to="javascript:void();" class="select_item">Example</nuxt-link>
                <nuxt-link to="javascript:void();" class="select_item">Example</nuxt-link>
                <div class="select_footer">
                    <a href="javascript:void();" class="field_btn_red">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isToggled: false
            }
        },
        methods: {
            /**
             * Toggler custom select */
            showSelect () {
                if (this.isToggled) {
                    this.isToggled = false
                } else {
                    this.isToggled = true
                }
            }
        }
    }
</script>
