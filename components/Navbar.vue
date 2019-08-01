<template>
    <div class="navbar_container" @mouseover="resetHoverToggle()" @mouseleave="resetLeaveToggle()">
        <div class="navbar">
            <div class="logo">
                <img src="/logo.png" />
                <div class="logo_title">
                    Ride <br/>
                    Revolution
                </div>
            </div>
            <ul class="nav_list">
                <li class="item_wrapper" v-for="(navItem, parent_key) in navItems" :key="parent_key">
                    <nuxt-link :class="`nav_item ${navItem.class} ${(navItem.subItems) ? 'nav_parent' : ''}`" :to="navItem.link" v-if="navItem.hasLink">{{ navItem.title }}</nuxt-link>
                    <nuxt-link :event="''" :class="`nav_item ${navItem.class} ${(navItem.subItems) ? 'nav_parent' : ''}`" :to="navItem.link" v-else @click.native.self="toggleChild($event)">{{ navItem.title }}</nuxt-link>
                    <div class="sub_wrapper" v-if="navItem.subItems">
                        <ul class="sub_nav_list" v-for="(subItem, sub_key) in navItem.subItems" :key="sub_key">
                            <li class="sub_item_wrapper">
                                <nuxt-link class="sub_nav_item" :to="subItem.link">{{ subItem.title }}</nuxt-link>
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
                        title: 'Booker',
                        link: '/booker',
                        hasLink: true,
                        class: 'booker',
                        image: '/icons/navbar/booker-unselected.png'
                    },
                    {
                        title: 'Scheduler',
                        link: '/scheduler',
                        hasLink: true,
                        class: 'scheduler',
                        image: '/icons/navbar/scheduler-unselected.png'
                    },
                    {
                        title: 'Customers',
                        link: '/customers',
                        hasLink: true,
                        class: 'customers',
                        image: '/icons/navbar/customers-unselected.png'
                    },
                    {
                        title: 'Instructors',
                        link: '/instructors',
                        hasLink: true,
                        class: 'instructors',
                        image: '/icons/navbar/instructors-unselected.png'
                    },
                    {
                        title: 'Supplies',
                        link: '/supplies',
                        hasLink: false,
                        class: 'supplies',
                        image: '/icons/navbar/supplies-unselected.png',
                        subItems: [
                            {
                                title: 'Inventory',
                                link: '/supplies/inventory'
                            },
                            {
                                title: 'Purchase Order',
                                link: '/supplies/purchase-order'
                            },
                            {
                                title: 'Studio Receiving',
                                link: '/supplies/studio-receiving'
                            },
                            {
                                title: 'Inventory Value Report',
                                link: '/supplies/inventory-value-report'
                            }
                        ]
                    },
                    {
                        title: 'Reporting',
                        link: '/reporting',
                        hasLink: true,
                        class: 'reporting',
                        image: '/icons/navbar/reporting-unselected.png'
                    },
                    {
                        title: 'Admin',
                        link: '/admin',
                        hasLink: false,
                        class: 'admin',
                        image: '/icons/navbar/admin-unselected.png',
                        subItems: [
                            {
                                title: 'Users and Roles',
                                link: '/admin/users-and-roles'
                            },
                            {
                                title: 'Scheduling',
                                link: '/admin/scheduling'
                            },
                            {
                                title: 'Configuration',
                                link: '/admin/configuration'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            resetHoverToggle () {
                const me = this
                const elements = document.querySelectorAll('.toggled .sub_wrapper')
                document.querySelector('.admin_flex .content').classList.add('toggled')
                elements.forEach((element, index) => {
                    setTimeout( () => {
                        const length = element.querySelectorAll('.sub_nav_list').length
                        const height = 59
                        const currentHeight = height * length
                        element.style.height = `${currentHeight}px`
                    }, 300)
                })
            },
            resetLeaveToggle () {
                const me = this
                const elements = document.querySelectorAll('.toggled .sub_wrapper')
                document.querySelector('.admin_flex .content').classList.remove('toggled')
                elements.forEach((element, index) => {
                    setTimeout( () => {
                        const length = element.querySelectorAll('.sub_nav_list').length
                        const height = element.querySelector('.sub_nav_list').scrollHeight
                        const currentHeight = height * length
                        element.style.height = `${currentHeight}px`
                    }, 300)
                })
            },
            toggleChild(event) {
                const me = this
                const target = event.target
                if (!target.parentNode.classList.contains('toggled')) {
                    target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                    target.parentNode.classList.add('toggled')
                } else {
                    setTimeout( () => {
                        target.nextElementSibling.style.height = 0
                        target.parentNode.classList.remove('toggled')
                    }, 600)
                }
            }
        }
    }
</script>
