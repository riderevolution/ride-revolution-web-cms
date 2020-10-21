<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/faq" class="action_back_btn"><img src="/icons/back-icon.svg"><span>FAQ</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Update {{ res.name }}</h1>
                    </div>
                </section>
                <section id="content">
                    <form id="default_form" @submit.prevent="submitForm()" enctype="multipart/form-data">
                        <div class="form_group_disclaimer">
                            <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Fields with asterisks(*) are required.</span></div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Information</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="name">Name <span>*</span></label>
                                        <input type="text" name="name" v-model="res.name" placeholder="Enter faq name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-\'_ |\?|\,|\!|\&]*$', min: 20, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ properFormat(errors.first('name')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="sequence">Sequence <span>*</span></label>
                                        <input type="text" name="sequence" placeholder="Enter sequence" v-model="res.sequence" v-validate="{required: true, numeric: true, min_value: 1}" autocomplete="off" class="default_text">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('sequence')">{{ properFormat(errors.first('sequence')) }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_group description">
                                    <la<label for="description">Description <span>*</span> <b>(Character limit: 5000)</b></label>
                                    <textarea name="description" rows="4" id="description" class="default_text" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description') && !length">{{ properFormat(errors.first('description')) }}</span></transition>
                                    <transition name="slide"><span class="validation_errors" v-if="length">The Description field may not be greater than 5000 characters</span></transition>
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
                                    <nuxt-link to="/content-type/faq" class="action_cancel_btn">Cancel</nuxt-link>
                                    <button type="submit" name="submit" class="action_btn alternate margin">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </transition>
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
                res: [],
                length: false,
                loaded: false
            }
        },
        methods: {
            submitForm () {
                const me = this

                me.$validator.validateAll().then(valid => {
                    if (valid && !me.length) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/web/faqs/${me.$route.params.param}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been updated')
                                }, 500)
                            }
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                                me.$router.push('/content-type/faq')
                            }, 500)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get(`api/web/faqs/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        me.res = res.data.faq
                        setTimeout( () => {
                            $('#description').summernote({
                                tabsize: 4,
                                height: 200,
                                followingToolbar: false,
                                toolbar: [
                                    [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
                                    [ 'color', [ 'color' ] ],
                                    [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
                                    [ 'insert', ['link'] ],
                                    [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview' ] ]
                                ],
                                codemirror: {
                                    lineNumbers: true,
                                    htmlMode: true,
                                    mode: "text/html",
                                    tabMode: 'indent',
                                    lineWrapping: true
                                },
                                callbacks: {
                                    onChange: function(e) {
                                        let limit = 5000, target = $(".description .note-editable").text(), total_count = target.length

                                        if(total_count >= limit){
                                            me.length = true
                                        } else {
                                            me.$validator.errors.remove('description')
                                            me.length = false
                                        }
                                    }
                                }
                            })
                            $('#description').summernote('code', me.res.description)
                        }, 100)
                        me.loaded = true
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
