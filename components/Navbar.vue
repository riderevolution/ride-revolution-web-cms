<template>
    <div class="navbar_container" @mouseover="resetHoverToggle()" @mouseleave="resetLeaveToggle()">
        <div class="navbar">
            <nuxt-link to="/" class="logo">
                <img src="/logo.png" />
                <div class="logo_title">
                    CMS <br/>
                    Template
                </div>
            </nuxt-link>
            <ul class="nav_list">
                <li class="item_wrapper" v-for="(navItem, parent_key) in navItems" :key="parent_key">
                    <nuxt-link :class="`nav_item ${navItem.class} ${(navItem.subItems) ? 'nav_parent' : ''}`" :to="navItem.link" v-if="navItem.hasLink" @click.native.self="resetToggle()">{{ navItem.title }}</nuxt-link>
                    <nuxt-link :event="''" :class="`nav_item ${navItem.class} ${(navItem.subItems) ? 'nav_parent' : ''}`" :to="navItem.link" v-else @click.native.self="toggleChild($event)">{{ navItem.title }}</nuxt-link>
                    <div class="sub_wrapper" v-if="navItem.subItems">
                        <ul class="sub_nav_list" v-for="(subItem, sub_key) in navItem.subItems" :key="sub_key">
                            <li class="sub_item_wrapper">
                                <nuxt-link class="sub_nav_item" :to="subItem.link" @click.native.self="resetToggle()">{{ subItem.title }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                navItems: [
                    {
                        title: 'Dashboard',
                        link: '/',
                        hasLink: true,
                        class: 'dashboard',
                        image: '/icons/navbar/dashboard-unselected.png'
                    },
                    {
                        title: 'Form',
                        link: '/form',
                        hasLink: true,
                        class: 'admin nav_parent_alt',
                        image: '/icons/navbar/admin-unselected.png'
                    },
                    {
                        title: 'Column',
                        link: '/column',
                        hasLink: true,
                        class: 'admin',
                        image: '/icons/navbar/admin-unselected.png'
                    },
                    {
                        title: 'Button',
                        link: '/button',
                        hasLink: true,
                        class: 'admin',
                        image: '/icons/navbar/admin-unselected.png'
                    },
                    {
                        title: 'Modal',
                        link: '/modal',
                        hasLink: true,
                        class: 'admin',
                        image: '/icons/navbar/admin-unselected.png'
                    },
                    {
                        title: 'Table',
                        link: '/table',
                        hasLink: false,
                        class: 'admin',
                        image: '/icons/navbar/admin-unselected.png',
                        subItems: [
                            {
                                title: 'Default',
                                link: '/table/default'
                            },
                            {
                                title: 'Default With Search',
                                link: '/table/default-with-search'
                            },
                            {
                                title: 'Default With Filter',
                                link: '/table/default-with-filter'
                            },
                            {
                                title: 'Accordion',
                                link: '/table/accordion'
                            },
                            {
                                title: 'Two Column',
                                link: '/table/two-column'
                            },
                        ]
                    }
                ],
                isHovered: true
            }
        },
        methods: {
            resetHoverToggle () {
                const me = this
                const elements = document.querySelectorAll('.nav_list .toggled .sub_wrapper')
                if (me.isHovered) {
                    document.querySelector('.navbar_container').classList.add('toggled')
                    // document.querySelector('.admin_flex .content').classList.add('toggled')
                    elements.forEach((element, index) => {
                        setTimeout( () => {
                            const length = element.querySelectorAll('.sub_nav_list').length
                            const height = 59
                            const currentHeight = height * length
                            element.style.height = `${currentHeight}px`
                        }, 300)
                    })
                }
            },
            resetLeaveToggle () {
                const me = this
                const elements = document.querySelectorAll('.nav_list .toggled .sub_wrapper')
                document.querySelector('.navbar_container').classList.remove('toggled')
                // document.querySelector('.admin_flex .content').classList.remove('toggled')
                elements.forEach((element, index) => {
                    setTimeout( () => {
                        const length = element.querySelectorAll('.sub_nav_list').length
                        const height = element.querySelector('.sub_nav_list').scrollHeight
                        const currentHeight = height * length
                        element.style.height = `${currentHeight}px`
                    }, 300)
                })
                me.isHovered = true
            },
            resetToggle () {
                document.querySelector('.navbar_container').classList.remove('toggled')
                // document.querySelector('.admin_flex .content').classList.remove('toggled')
            },
            toggleChild(event) {
                const me = this
                const target = event.target
                me.isHovered = false
                if (!target.parentNode.classList.contains('toggled')) {
                    target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                    target.parentNode.classList.add('toggled')
                } else {
                    target.nextElementSibling.style.height = 0
                    target.parentNode.classList.remove('toggled')
                    setTimeout( () => {
                        me.isHovered = true
                    }, 100)
                }
            },
            checkHeightViewport () {
                const me = this
                let heightToDeduct = document.querySelector('.navbar_container .navbar .logo')
                if (document.documentElement && document.documentElement.clientHeight) {
                    document.querySelector('.navbar_container .navbar .nav_list').style.maxHeight = `${document.documentElement.clientHeight - heightToDeduct.scrollHeight}px`
                }
            }
        },
        mounted () {
            const me = this
            me.checkHeightViewport()
        },
        beforeMount () {
            window.addEventListener('load', this.checkHeightViewport)
            window.addEventListener('resize', this.checkHeightViewport)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.checkHeightViewport)
            window.removeEventListener('load', this.checkHeightViewport)
        }
    }
</script>
