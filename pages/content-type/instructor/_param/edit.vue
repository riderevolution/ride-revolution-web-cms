<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/instructor" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Instructor</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Update {{ res.first_name }}</h1>
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
                                    <input type="checkbox" id="is_new" name="is_new" class="action_check" :checked="res.instructor_details.is_new == 1">
                                    <label for="is_new">New</label>
                                </div>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="first_name">First Name <span>*</span></label>
                                        <input type="text" name="first_name" autocomplete="off" class="default_text" v-model="res.first_name" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ ]*$', min: 2, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ properFormat(errors.first('first_name')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="last_name">Last Name <span>*</span></label>
                                        <input type="text" name="last_name" autocomplete="off" class="default_text" v-model="res.last_name" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ ]*$', min: 2, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ properFormat(errors.first('last_name')) }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="position">Position</label>
                                        <input type="text" name="position" autocomplete="off" class="default_text" v-model="res.position" v-validate="{regex: '^[a-zA-Z0-9\-_ ]*$', min: 1, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('position')">{{ properFormat(errors.first('position')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="nickname">Nickname <span>*</span></label>
                                        <input type="text" name="nickname" autocomplete="off" class="default_text" v-model="res.instructor_details.nickname" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ ]*$', min: 2, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('nickname')">{{ properFormat(errors.first('nickname')) }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_group">
                                    <label for="description">Description <span>*</span> <b>(Character limit: 3000)</b></label>
                                    <textarea name="description" rows="4" id="description" class="default_text" v-validate="'required|max:3000'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ properFormat(errors.first('description')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Instagram</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="instagram">Instagram Link <span>*</span></label>
                                    <input type="text" name="instagram" autocomplete="off" class="default_text" v-model="res.instructor_details.instagram" placeholder="Enter instagram link" v-validate="{required: true, url: {require_protocol: true }}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('instagram')">{{ properFormat(errors.first('instagram')) }}</span></transition>
                                </div>
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="instagram_hashtag">Instagram Hashtag <span>*</span></label>
                                        <input type="text" name="instagram_hashtag" autocomplete="off" class="default_text" v-model="res.instructor_details.instagram_hashtag" placeholder="#ridewithsample" v-validate="{required: true, regex: '^[a-zA-Z0-9|\#]*$', min: 2}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('instagram_hashtag')">{{ properFormat(errors.first('instagram_hashtag')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="instagram_name">Instagram Name <span>*</span></label>
                                        <input type="text" name="instagram_name" autocomplete="off" class="default_text" v-model="res.instructor_details.instagram_name" placeholder="@example" v-validate="{required: true}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('instagram_name')">{{ properFormat(errors.first('instagram_name')) }}</span></transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Specialization</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex select_all">
                                    <label class="flex_label alternate">Choose a Specialization: <span>*</span></label>
                                    <div class="form_check" v-for="(specialization, key) in specializations" :key="key">
                                        <input type="checkbox" :id="`specialization_${key}`" v-model="specialization.checked" name="nonsense" class="action_check">
                                        <label :for="`specialization_${key}`">{{ specialization.name }}</label>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="noSpecialization">The Specialization field is required</span></transition>
                                </div>
                                <div class="form_group_disclaimer">
                                    <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>The sequence is based on each checked option.</span></div>
                                </div>
                            </div>
                        </div> -->
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Spotify</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="spotify_description">Spotify Description <span>*</span> <b>(Character limit: 500)</b></label>
                                    <textarea name="spotify_description" rows="2" id="spotify_description" class="default_text" v-validate="'required|max:500'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('spotify_description')">{{ properFormat(errors.first('spotify_description')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="spotify_embed">Spotify Embed <span>*</span> <strong>(The width should be 100% and height should be 550px)</strong></label>
                                    <textarea name="spotify_embed" rows="3" id="spotify_embed" v-model="res.instructor_details.spotify_embed" class="default_text" placeholder="Paste an iframe link from spotify playlist" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('spotify_embed')">{{ properFormat(errors.first('spotify_embed')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Gallery Upload</h2>
                                <button type="button" class="action_btn" @click="addMultiple('image')">Add Image</button>
                            </div>
                            <div class="form_main_group">
                                <image-handler-container ref="image_handler" :dimension="imageDimensions" :data="(res.instructor_details.gallery) ? res.instructor_details.gallery : ''" :multiple="true" :parent="res.id" />
                                <input type="hidden" name="image_category[]" value="gallery" v-for="(count, key) in imageCount" :key="key">
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Metatags (SEO)</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="meta_title">Meta Title <span>*</span></label>
                                    <input type="text" name="meta_title" autocomplete="off" class="default_text"  placeholder="Enter your meta title" v-model="res.instructor_details.meta_title" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', min: 20, max: 70}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_title')">{{ properFormat(errors.first('meta_title')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_keywords">Meta Keywords <span>*</span> <strong>(Use comma(,) to separate the keywords)</strong></label>
                                    <input type="text" name="meta_keywords" autocomplete="off" class="default_text"  placeholder="Enter your meta keywords" v-model="res.instructor_details.meta_keywords" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,]*$', min: 50, max: 150}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_keywords')">{{ properFormat(errors.first('meta_keywords')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_description">Meta Description <span>*</span></label>
                                    <textarea name="meta_description" rows="4" id="meta_description"  placeholder="Enter your meta description" v-model="res.instructor_details.meta_description" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,|\.]*$', min: 150, max: 380}"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_description')">{{ properFormat(errors.first('meta_description')) }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_check">
                                <input type="checkbox" id="is_featured" name="is_featured" class="action_check" :checked="res.instructor_details.is_featured == 1">
                                <label for="is_featured">Rider's Guide</label>
                            </div>
                            <div class="form_check">
                                <input type="checkbox" id="recommended" name="recommended" class="action_check" :checked="res.instructor_details.recommended == 1">
                                <label for="recommended">Ride Rev Recommendations</label>
                            </div>
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/instructor" class="action_cancel_btn">Cancel</nuxt-link>
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
                tempSpecializations: [],
                specializations: [],
                loaded: false,
                imageDimensions: {
                    imageWidth: 600,
                    imageHeight: 922
                },
                imageCount: 0,
                noSpecialization: false
            }
        },
        methods: {
            /**
             * [addMultiple add images or variants]
             * @param {[string]} type [type of method]
             */
            addMultiple (type) {
                const me = this
                switch (type) {
                    case 'image':
                        setTimeout( () => {
                            me.$refs.image_handler.addImage()
                        }, 10)
                        break
                }
            },
            submitForm () {
                const me = this
                let ctr = 0
                me.$validator.validateAll().then(valid => {
                    // me.specializations.forEach((data, index) => {
                    //     if (data.checked) {
                    //         ctr++
                    //     }
                    // })
                    // me.noSpecialization = (ctr > 0) ? false : true
                    if (valid) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        // formData.append('specializations', JSON.stringify(me.specializations))
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/web/instructors/${me.$route.params.param}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been updated')
                                    me.$router.push('/content-type/instructor')
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
                me.$axios.get(`api/instructors/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        me.res = res.data.user
                        // me.tempSpecializations = me.res.user_specializations
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
                            $('#spotify_description').summernote({
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
                            $('#description').summernote('code', me.res.instructor_details.description)
                            $('#spotify_description').summernote('code', me.res.instructor_details.spotify_description)
                        }, 100)
                        // me.$axios.get('api/specializations').then(res => {
                        //     if (res.data) {
                        //         res.data.specializations.forEach((specialization, index) => {
                        //             specialization.checked = false
                        //             if (me.tempSpecializations.length > 0) {
                        //                 me.tempSpecializations.forEach((temp, index) => {
                        //                     if (temp.specialization_id == specialization.id) {
                        //                         specialization.checked = true
                        //                     }
                        //                 })
                        //             }
                        //             me.specializations.push(specialization)
                        //         })
                        //     }
                        // })
                        me.loaded = true
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.imageCount = me.$refs.image_handler.images
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
