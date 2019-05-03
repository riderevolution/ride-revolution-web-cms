<template>
    <div class="header">
        <div class="header_icons">
            <img src="/icons/header/icon.svg" class="image_responsive" width="19px" height="19px" />
            <img src="/icons/header/icon.svg" class="image_responsive" width="19px" height="19px" />
        </div>
        <div class="header_user" @click="showSelect($event)">
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
        methods: {
            /**
             * Toggler custom select
             * @param  {object} event
             * @return {event}
             */
            showSelect (event) {
                console.log(event.target);
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active')
                } else {
                    event.target.classList.add('active')
                }
            }
        }
    }
</script>
