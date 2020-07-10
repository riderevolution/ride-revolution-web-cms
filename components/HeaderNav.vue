<template>
    <div class="header">
        <div :class="`header_select ${(isToggled) ? 'active' : ''}`" v-click-outside="closeMe">
            <div class="header_user" @click="showSelect()">
                <div class="user_picture">
                    <div class="overlay">
                        {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
                    </div>
                </div>
                <div class="user_name">Hello, {{ user.first_name }}!</div>
            </div>
            <div class="user_select">
                <div class="select_header">
                    <div class="select_info">
                        <div class="header_name">{{ user.first_name }}</div>
                        <div class="header_role">{{ user.staff_details.role.display_name }}</div>
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
                isToggled: false,
                user: {
                    first_name: 'asd',
                    last_name: 'asd',
                    staff_details: {
                        role: {
                            display_name: 'asd'
                        }
                    }
                }
            }
        },
        methods: {
            showSelect () {
                this.isToggled ^= true
            },
            closeMe () {
                this.isToggled = false
            }
        },
        mounted () {
            const me = this
            let token = me.$cookies.get('70hokccms3hhhn5')
            me.$axios.get('api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    me.user = res.data.user
                }
            })
        }
    }
</script>
