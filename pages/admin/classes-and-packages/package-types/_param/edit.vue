<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Update {{ res.name }}</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data" v-if="loaded">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Package Type Overview</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_group_disclaimer">
                                <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>After saving, you will be redirected to the Package page to create a package under this type.</span></div>
                            </div>
                            <div class="form_group">
                                <label for="name">Package Type Name <span>*</span></label>
                                <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'" v-model="res.name">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="description">Description <span>*</span></label>
                                <textarea name="description" rows="8" class="default_text" v-validate="'required'" v-model="res.description"></textarea>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ errors.first('description') }}</span></transition>
                            </div>
                            <div class="form_flex select_all">
                                <label class="flex_label alternate">Restrict class to: <span>*</span></label>
                                <div class="form_check select_all">
                                    <div :class="`custom_action_check ${(checkData) ? 'checked' : ''}`" @click.prevent="toggleSelectAll($event)">Select All</div>
                                </div>
                                <div class="form_check" v-for="(studio, key) in studios" :key="key">
                                    <input type="checkbox" :id="`studio_${key}`" name="studios" v-model="studio.checkedForReal" class="action_check">
                                    <label :for="`studio_${key}`">{{ studio.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" :checked="res.enabled == 1">
                                <label for="enabled">Activate</label>
                            </div>
                            <div class="button_group">
                                <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
                                <button type="submit" name="submit" class="action_btn alternate margin">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                all: false,
                loaded: false,
                lastRoute: '',
                prevRoute: '',
                studios: [],
                res: []
            }
        },
        computed: {
            checkData () {
                const me = this
                let count = 0
                let result = false
                me.studios.forEach((data, index) => {
                    if (data.checkedForReal) {
                        count++
                    }
                })
                if (count == me.studios.length) {
                    result = true
                } else {
                    result = false
                }
                return result
            }
        },
        methods: {
            toggleSelectAll (event) {
                const me = this
                if (me.checkData) {
                    me.studios.forEach((data, index) => {
                        data.checkedForReal = false
                    })
                } else {
                    me.studios.forEach((data, index) => {
                        data.checkedForReal = true
                    })
                }
                if (event.target.classList.contains('checked')) {
                    event.target.classList.remove('checked')
                } else {
                    event.target.classList.add('checked')
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'patch')
                        formData.append('studio_access', JSON.stringify(me.studios))
                        me.loader(true)
                        me.$axios.post(`api/packages/package-types/${me.$route.params.param}`, formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Updated')
                                } else {
                                    me.$store.state.errorList.push('Sorry, Something went wrong')
                                    me.$store.state.errorStatus = true
                                }
                            }, 500)
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                if (!me.$store.state.errorStatus) {
                                    me.$router.push(`/admin/${me.prevRoute}/${me.lastRoute}`)
                                }
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
							offset: -250
						})
                    }
                })
            },
        },
        async mounted () {
            const me = this
            me.$axios.get(`api/packages/package-types/${me.$route.params.param}`).then(res => {
                me.res = res.data.packageType
                me.studios = res.data.packageType.studios
            })
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 4]
            me.loaded = true
        }
    }
</script>
