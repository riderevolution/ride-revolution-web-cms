<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/testimonials" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Testimonials</span></nuxt-link>
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
                                <div class="form_group">
                                    <label for="name">Name <span>*</span></label>
                                    <input type="text" name="name" placeholder="Enter testimonial name" v-model="res.name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\-|\'|\,|\!|\&]*$', min: 2, max: 100}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ properFormat(errors.first('name')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="body">body <span>*</span> <b>(Character limit: 500)</b></label>
                                    <textarea name="body" rows="2" id="body" class="default_text" v-validate="'required|max:500'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('body')">{{ properFormat(errors.first('body')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Image Upload</h2>
                            </div>
                            <div class="form_main_group">
                                <image-handler-container ref="image_handler" :dimension="imageDimensions" :multiple="false" :data="res.images" :parent="res.id" />
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/testimonials" class="action_cancel_btn">Cancel</nuxt-link>
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
    import ImageHandlerContainer from '../../../../components/ImageHandlerContainer'
    export default {
        components: {
            Foot,
            ImageHandlerContainer
        },
        data () {
            return {
                res: [],
                loaded: false,
                imageDimensions: {
                    imageWidth: 90,
                    imageHeight: 90
                },
                imageCount: 0
            }
        },
        methods: {
            submitForm () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/testimonials/${me.$route.params.param}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been updated')
                                    me.$router.push('/content-type/testimonials')
                                }, 500)
                            }
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
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
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get(`api/testimonials/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.testimonial
                            setTimeout( () => {
                                $('#body').summernote({
                                    tabsize: 4,
                                    height: 150,
                                    followingToolbar: false,
                                    disableResizeEditor: true,
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
                                    }
                                })
                                $('#body').summernote('code', me.res.body)
                            }, 100)
                            me.loaded = true
                        }, 500)
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
