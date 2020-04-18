<template>
    <div class="header">
        <div :class="`header_select ${(isToggled) ? 'active' : ''}`" v-click-outside="closeMe">
            <div class="header_user" @click="showSelect()">
                <div class="user_picture">
                    <div class="overlay">
                        {{ $store.state.user.first_name.charAt(0) }}{{ $store.state.user.last_name.charAt(0) }}
                    </div>
                </div>
                <div class="user_name">Hello, {{ $store.state.user.first_name }}!</div>
            </div>
            <div class="user_select">
                <div class="select_header">
                    <div class="select_info">
                        <div class="header_name">{{ $store.state.user.first_name }}</div>
                        <div class="header_role">{{ $store.state.user.staff_details.role.display_name }}</div>
                    </div>
                </div>
                <div class="select_footer">
                    <nuxt-link to="/my-account" class="select_item account" @click.native.self="isToggled = false">My Account</nuxt-link>
                    <div class="select_item logout" @click="logout()">Sign Out</div>
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
            showSelect () {
                this.isToggled ^= true
            },
            closeMe () {
                this.isToggled = false
            },
            logout () {
                const me = this
                me.$store.state.isAuth = false
                me.$router.push('/login')
            }
        }
    }
</script>
