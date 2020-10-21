<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/news" class="action_back_btn"><img src="/icons/back-icon.svg"><span>News</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Add a News</h1>
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
                                <div class="form_check">
                                    <input type="checkbox" id="is_featured" name="is_featured" class="action_check">
                                    <label for="is_featured">Featured</label>
                                </div>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="name">Name <span>*</span></label>
                                        <input type="text" name="name" placeholder="Enter news name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\'|\’|\,|\!|\&|\:|\#|\.]*$', min: 5, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ properFormat(errors.first('name')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="date_published">Date Published <span>*</span></label>
                                        <v-ctk v-model="form.date_published" :only-date="true" :format="'YYYY-MM-DD'" :formatted="'YYYY-MM-DD'" :no-label="true" :color="'#33b09d'" :id="'date_published'" :name="'date_published'" :max-date="$moment().format('YYYY-MM-DD')" :label="'Select birth date'" v-validate="'required'"></v-ctk>
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('date_published')">{{ properFormat(errors.first('date_published')) }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_group summary">
                                    <label for="summary">Summary <span>*</span> <b>(Character limit: 300)</b></label>
                                    <textarea name="summary" row="2" id="summary" class="default_text" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('summary') && !length">{{ properFormat(errors.first('summary')) }}</span></transition>
                                    <transition name="slide"><span class="validation_errors" v-if="length">The Summary field may not be greater than 300 characters</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="description">Description <span>*</span></label>
                                    <textarea name="description" row="8" id="description" class="default_text" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ properFormat(errors.first('description')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Image Upload</h2>
                            </div>
                            <div class="form_main_group">
                                <banner-handler-container ref="banner_handler" :dimension="bannerDimensions" />
                                <input type="hidden" name="banner_category[]" value="banner" v-for="(count, key) in imageCount" :key="key">
                                <image-handler-container ref="image_handler" :dimension="imageDimensions" :multiple="false" />
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Metatags (SEO)</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="meta_title">Meta Title <span>*</span></label>
                                    <input type="text" name="meta_title" autocomplete="off" class="default_text" placeholder="Enter your meta title" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\'|\’|\,|\!|\&|\:|\#|\.]*$', min: 20, max: 70}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_title')">{{ properFormat(errors.first('meta_title')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_keywords">Meta Keywords <span>*</span> <strong>(Use comma(,) to separate the keywords)</strong></label>
                                    <input type="text" name="meta_keywords" autocomplete="off" placeholder="Enter your meta keywords" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\,]*$', min: 50, max: 150}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_keywords')">{{ properFormat(errors.first('meta_keywords')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_description">Meta Description <span>*</span></label>
                                    <textarea name="meta_description" rows="4" id="meta_description" placeholder="Enter your meta description" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\'|\’|\,|\!|\&|\:|\#|\.]*$', min: 150, max: 380}"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_description')">{{ properFormat(errors.first('meta_description')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check">
                                    <input type="checkbox" id="enabled" name="enabled" class="action_check">
                                    <label for="enabled">Activate</label>
                                </div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/news" class="action_cancel_btn">Cancel</nuxt-link>
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
    import Foot from '../../../components/Foot'
    import ImageHandlerContainer from '../../../components/ImageHandlerContainer'
    import BannerHandlerContainer from '../../../components/BannerHandlerContainer'
    export default {
        components: {
            Foot,
            ImageHandlerContainer,
            BannerHandlerContainer
        },
        data () {
            return {
                loaded: false,
                length: false,
                bannerDimensions: {
                    imageWidth: 2562,
                    imageHeight: 839
                },
                imageDimensions: {
                    imageWidth: 676,
                    imageHeight: 371
                },
                form: {
                    date_published: ''
                },
                imageCount: 0,
            }
        },
        methods: {
            submitForm () {
                const me = this

                me.$validator.validateAll().then(valid => {
                    if (valid && !me.length) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        me.$axios.post('api/web/news', formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been created')
                                    me.$router.push('/content-type/news')
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
                setTimeout( () => {
                    me.imageCount = me.$refs.banner_handler.images
                    $('#description').summernote({
                        tabsize: 4,
                        height: 400,
                        followingToolbar: false,
                        toolbar: [
                            [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
                            [ 'color', [ 'color' ] ],
                            [ 'insert', [ 'picture', 'link' ] ],
                            [ 'table', ['table'] ],
                            [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
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
                    $('#summary').summernote({
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
                        },
                        callbacks: {
                            onChange: function(e) {
                                let limit = 300, target = $(".summary .note-editable").text(), total_count = target.length

                                if(total_count >= limit){
                                    me.length = true
                                } else {
                                    me.$validator.errors.remove('summary')
                                    me.length = false
                                }
                            }
                        }
                    })
                    me.loader(false)
                }, 100)
                me.loaded = true
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
