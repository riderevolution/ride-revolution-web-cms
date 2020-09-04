<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/studio" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Studios</span></nuxt-link>
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
                                <h2 class="form_title">Contact Details</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="contact_email_address">Contact Email Address<span>*</span></label>
                                        <input type="email" name="contact_email_address" autocomplete="off" placeholder="Enter your contact email address" v-model="res.contact_email_address" class="default_text" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\@|\.]*$', max: 50}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('contact_email_address')">{{ properFormat(errors.first('contact_email_address')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="contact_number">Contact Number <span>*</span></label>
                                        <input type="text" name="contact_number" autocomplete="off" placeholder="Enter your contact number" class="default_text" v-model="res.contact_number" v-validate="{required: true, regex: '^[0-9\-_ ]*$', min: 7, max: 11}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('contact_number')">{{ properFormat(errors.first('contact_number')) }}</span></transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Information</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="description">Description <span>*</span> <b>(Character limit: 2000)</b></label>
                                    <textarea name="description" rows="4" id="description" class="default_text" placeholder="Enter your description" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description') && !desc_length">{{ properFormat(errors.first('description')) }}</span></transition>
                                    <transition name="slide"><span class="validation_errors" v-if="desc_length">The Description field may not be greater than 2000 characters</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="opening_hours">Opening Hours <span>*</span> <b>(Character limit: 500)</b></label>
                                    <textarea name="opening_hours" rows="2" id="opening_hours" class="default_text" placeholder="Enter your opening hours" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('opening_hours') && !open_length">{{ properFormat(errors.first('opening_hours')) }}</span></transition>
                                    <transition name="slide"><span class="validation_errors" v-if="open_length">The Opening Hours field may not be greater than 500 characters</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="google_embed">Google Embed <span>*</span> <strong>(The width should be 100% and height should be 500px)</strong></label>
                                    <textarea name="google_embed" rows="3" id="google_embed" class="default_text" v-model="res.google_embed" placeholder="Paste an iframe link from google maps" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('google_embed')">{{ properFormat(errors.first('google_embed')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Image Upload</h2>
                            </div>
                            <div class="form_main_group">
                                <image-handler-container ref="image_handler" :dimension="imageDimensions" :data="(res.images[0].path != null) ? res.images : ''" :multiple="false" :parent="res.id" />
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Metatags (SEO)</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="meta_title">Meta Title <span>*</span></label>
                                    <input type="text" name="meta_title" autocomplete="off" class="default_text" placeholder="Enter your meta title" v-model="res.meta_title" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', min: 20, max: 70}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_title')">{{ properFormat(errors.first('meta_title')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_keywords">Meta Keywords <span>*</span> <strong>(Use comma(,) to separate the keywords)</strong></label>
                                    <input type="text" name="meta_keywords" autocomplete="off" class="default_text" placeholder="Enter your meta keywords" v-model="res.meta_keywords" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,]*$', min: 50, max: 150}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_keywords')">{{ properFormat(errors.first('meta_keywords')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_description">Meta Description <span>*</span></label>
                                    <textarea name="meta_description" rows="4" id="meta_description" class="default_text" placeholder="Enter your meta description" v-model="res.meta_description" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,|\.]*$', min: 150, max: 380}"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_description')">{{ properFormat(errors.first('meta_description')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/studio" class="action_cancel_btn">Cancel</nuxt-link>
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
                loaded: false,
                desc_length: false,
                open_length: false,
                res: [],
                imageDimensions: {
                    imageWidth: 648,
                    imageHeight: 579
                }
            }
        },
        methods: {
            submitForm () {
                const me = this

                if ($($("#description").summernote("code")).text().length <= 2000) {
                    me.$validator.errors.remove('description')
                    me.desc_length = false
                } else {
                    me.desc_length = true
                }

                if ($($("#opening_hours").summernote("code")).text().length <= 500) {
                    me.$validator.errors.remove('opening_hours')
                    me.open_length = false
                } else {
                    me.open_length = true
                }

                me.$validator.validateAll().then(valid => {
                    if (valid && (!desc_length && !open_length)) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/web/studios/${me.$route.params.param}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been updated')
                                    me.$router.push('/content-type/studio')
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
                me.$axios.get(`api/studios/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        me.res = res.data.studio
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
                                }
                            })
                            $('#opening_hours').summernote({
                                tabsize: 4,
                                height: 200,
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
                            $('#description').summernote('code', me.res.description)
                            $('#opening_hours').summernote('code', me.res.opening_hours)
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
        mounted (){
            const me = this
            me.fetchData()
        }
    }
</script>
