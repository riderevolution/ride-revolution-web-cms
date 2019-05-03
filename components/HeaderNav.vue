<template>
    <div class="header">
        <div class="header_icons">
            <img src="/icons/header/icon.svg" class="image_responsive" width="19px" height="19px" />
            <img src="/icons/header/icon.svg" class="image_responsive" width="19px" height="19px" />
        </div>
        <div :class="`header_user ${(isToggled) ? 'active' : ''}`" @click="showSelect()">
            <div class="user_picture"></div>
            <div class="user_name">Hello, Billy!</div>
            <div class="user_select">
                <div class="select_header">
                    <div class="header_name">Billy Pogi</div>
                    <div class="header_role">Admin</div>
                </div>
                <div class="select_footer">
                    <a href="javascript:void();" class="select_item">Sign Out</a>
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
