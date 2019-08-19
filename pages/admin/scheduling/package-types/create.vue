<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Add New Package Type</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
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
                                <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="description">Description <span>*</span></label>
                                <textarea name="description" rows="8" class="default_text" v-validate="'required'"></textarea>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ errors.first('description') }}</span></transition>
                            </div>
                            <div class="form_flex select_all">
                                <label class="flex_label">Restrict access to studios:</label>
                                <div class="form_check select_all">
                                    <input type="checkbox" id="select_all" name="select_all" class="action_check" @change="toggleAll()">
                                    <label for="select_all">Select All</label>
                                </div>
                                <div class="form_check" v-for="(studio, key) in studios" :key="key">
                                    <input type="checkbox" :id="`studio_${key}`" name="studios" :value="studio.id" class="action_check" @change="toggleStudio(studio.id)">
                                    <label :for="`studio_${key}`">{{ studio.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
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
    import Foot from '../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                lastRoute: '',
                prevRoute: '',
                studios: [],
                form: {
                    studios: []
                },
            }
        },
        methods: {
            toggleAll () {
                const me = this
                const elements = document.querySelectorAll('.select_all .form_check')
                elements.forEach((element, index) => {
                    if (document.getElementById(`select_all`).checked) {
                        if (document.getElementById(`studio_${index}`)) {
                            if (!document.getElementById(`studio_${index}`).checked) {
                                document.getElementById(`studio_${index}`).checked = true
                                me.form.studios.push(parseInt(document.getElementById(`studio_${index}`).value))
                            }
                        }
                    } else {
                        if (document.getElementById(`studio_${index}`)) {
                            document.getElementById(`studio_${index}`).checked = false
                            me.form.studios.splice((index - index), 1)
                        }
                    }
                })
            },
            toggleStudio (id, key) {
                const me = this
                document.getElementById(`select_all`).checked = false
                if (me.form.studios.indexOf(id) == -1) {
                    me.form.studios.push(id)
                } else {
                    me.form.studios.forEach((studio, index) => {
                        if (studio == id) {
                            me.form.studios.splice(index, 1)
                        }
                    })
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        me.form.studios.sort()
                        formData.append('studio_access', JSON.stringify(me.form.studios))
                        me.loader(true)
                        me.$axios.post('api/packages/package-types', formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Added')
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
            fetchStudios () {
                const me = this
                me.$axios.get('api/studios').then(res => {
                    me.studios = res.data.studios
                })
            }
        },
        async mounted () {
            const me = this
            me.fetchStudios()
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
