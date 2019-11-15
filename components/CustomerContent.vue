<template>
    <div class="customer_tab_content">
        <div v-if="type == 'packages'">
            <div class="cms_table_toggler">
                <div :class="`status ${(packageStatus == 1) ? 'active' : ''}`" @click="togglePackages(1)">Owned</div>
                <div :class="`status ${(packageStatus == 2) ? 'active' : ''}`" @click="togglePackages(2)">Shared</div>
            </div>
            <div class="cms_table_package">
                <div class="table_package" v-for="(data, key) in resPackages" :key="key">
                    <h2 :class="`package_title ${data.class}`">{{ data.name }} <span>{{ data.label }}</span></h2>
                    <div class="package_details">
                        <div class="package_status">
                            <div class="box">
                                <div class="overlay">
                                    <p>48</p>
                                    <label>Used</label>
                                </div>
                            </div>
                            <div class="box margin">
                                <div class="overlay">
                                    <p>2</p>
                                    <label>Available</label>
                                </div>
                            </div>
                        </div>
                        <div class="package_date">
                            <div class="date">
                                <p>Apr. 04, 2019 / Apr 8, 2019</p>
                                <label>Purchase Date / Activation Date</label>
                            </div>
                            <div class="date margin">
                                <p>Apr 8, 2020</p>
                                <label>Expiry date <a href="javascript:void(0)" class="expiry_btn">Edit</a></label>
                            </div>
                        </div>
                        <div class="package_action">
                            <a href="javascript:void(0)" class="action_success_btn">Book a Class</a>
                            <div class="package_options">
                                <div class="option_btn" :id="`option_${key}`" @click.self="toggledOption($event)">Options</div>
                                <div class="option_selector">
                                    <a href="javascript:void(0)" class="option_link">Transfer Package</a>
                                    <a href="javascript:void(0)" class="option_link">Share Package</a>
                                    <a href="javascript:void(0)" class="option_link">Freeze Package</a>
                                    <a href="javascript:void(0)" class="option_link">Print Receipt</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'packages'
            }
        },
        data () {
            return {
                packageStatus: 1,
                resPackages: [
                    {
                        name: '50 Class Package',
                        class: 'warning',
                        label: '2 days left'
                    },
                    {
                        name: '10 Class Package',
                        class: 'shared',
                        label: 'Shared with Sheena Villeta'
                    }
                ]
            }
        },
        methods: {
            toggledOption (event) {
                const me = this
                let element = event.target
                if (element.parentNode.classList.contains('toggled')) {
                    element.parentNode.classList.remove('toggled')
                } else {
                    element.parentNode.classList.add('toggled')
                }
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                me.resPackages.forEach((result, index) => {
                    let option = document.getElementById(`option_${index}`)
                    if (option != null) {
                        if (option !== target && option !== target.parentNode.previousElementSibling) {
                            if (option.parentNode.classList.contains('toggled')) {
                                option.parentNode.classList.remove('toggled')
                            }
                        }
                    }
                })

            },
            togglePackages (status) {
                const me = this
                return me.package_status = status
            },
        },
        beforeMount () {
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.toggleOverlays)
        }
    }
</script>
