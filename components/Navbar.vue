<template>
    <div class="navbar_container">
        <div class="navbar">
            <div class="logo">
                <img src="/logo.png" width="65px" />
                <div class="logo_title">
                    Ride <br/>
                    Revolution
                </div>
            </div>
            <ul class="nav_list">
                <li class="item_wrapper" v-for="(navItem, parent_key) in navItems" :key="parent_key" @mouseover="itemHover($event)" @mouseleave="itemLeave($event)">
                    <nuxt-link :class="`nav_item ${navItem.class}`" :to="navItem.link">{{ navItem.title }}</nuxt-link>
                    <div class="sub_wrapper" v-if="navItem.subItems">
                        <label class="nav_label">{{ navItem.title }}</label>
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
                        class: 'dashboard',
                        image: '/icons/navbar/dashboard-unselected.png'
                    },
                    {
                        title: 'Booker',
                        link: '/booker',
                        class: 'booker',
                        image: '/icons/navbar/booker-unselected.png'
                    },
                    {
                        title: 'Scheduler',
                        link: '/scheduler',
                        class: 'scheduler',
                        image: '/icons/navbar/scheduler-unselected.png'
                    },
                    {
                        title: 'Customers',
                        link: '/customers',
                        class: 'customers',
                        image: '/icons/navbar/customers-unselected.png'
                    },
                    {
                        title: 'Instructors',
                        link: '/instructors',
                        class: 'instructors',
                        image: '/icons/navbar/instructors-unselected.png'
                    },
                    {
                        title: 'Supplies',
                        link: '/supplies',
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
                        class: 'reporting',
                        image: '/icons/navbar/reporting-unselected.png'
                    },
                    {
                        title: 'Admin',
                        link: '/admin',
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
            /**
             * Add class on hover
             * @param  {object} event
             * @return {event}
             */
            itemHover (event) {
                event.target.classList.add('active')
            },
            /**
             * Remove class on hover
             * @param  {object} event
             * @return {event}
             */
            itemLeave (event) {
                event.target.firstChild.classList.remove('active')
            }
        }
    }
</script>
