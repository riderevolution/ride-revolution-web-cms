<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/instructor" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Instructor</span></nuxt-link>
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
                                    <input type="checkbox" id="is_new" name="is_new" class="action_check" :checked="res.instructor_details.is_new">
                                    <label for="is_new">New</label>
                                </div>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="description">Description <span>*</span></label>
                                    <textarea name="description" rows="4" id="description" class="default_text" v-validate="'required|max:2000'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ errors.first('description') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="quote">Quote <span>*</span></label>
                                    <textarea name="quote" rows="2" id="quote" class="default_text" v-validate="'required|max:200'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('quote')">{{ errors.first('quote') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="instagram">Instagram <span>*</span></label>
                                    <input type="text" name="instagram" autocomplete="off" class="default_text" v-model="res.instructor_details.instagram" placeholder="Enter instagram link" v-validate="{required: true, url: {require_protocol: true }}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('instagram')">{{ errors.first('instagram') | properFormat }}</span></transition>
                                </div>

                            </div>
                        </div>
                        <div class="form_wrapper">
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
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Spotify</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="spotify_description">Spotify Description <span>*</span></label>
                                    <textarea name="spotify_description" rows="2" id="spotify_description" class="default_text" v-validate="'required|max:200'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('spotify_description')">{{ errors.first('spotify_description') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="spotify_embed">Spotify Embed <span>*</span> <strong>(The height should be 550px)</strong></label>
                                    <textarea name="spotify_embed" rows="3" id="spotify_embed" v-model="res.instructor_details.spotify_embed" class="default_text" placeholder="Paste an iframe link from spotify playlist" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('spotify_embed')">{{ errors.first('spotify_embed') | properFormat }}</span></transition>
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
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/instructor" class="action_cancel_btn">Cancel</nuxt-link>
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
                    imageWidth: 469,
                    imageHeight: 922
                },
                imageCount: 0,
                noSpecialization: false
            }
        },
        filters: {
            properFormat (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
                let message = value.split('The ')[1].split(' field')
                if (message.length > 1) {
                    message = message[1]
                    return `The ${newValue} field${message}`
                } else {
					if (message[0].split('file').length > 1) {
                        message = message[0].split('file')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
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
                    me.specializations.forEach((data, index) => {
                        if (data.checked) {
                            ctr++
                        }
                    })
                    me.noSpecialization = (ctr > 0) ? false : true
                    if (valid && !me.noSpecialization) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('specializations', JSON.stringify(me.specializations))
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/web/instructors/${me.$route.params.param}`, formData).then(res => {
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
                                me.$router.push('/instructor')
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
                        me.tempSpecializations = me.res.user_specializations
                        setTimeout( () => {
                            me.imageCount = me.$refs.image_handler.images
                            $('#description').summernote({
                                tabsize: 4,
                                height: 200,
                                followingToolbar: false,
                                codemirror: {
                                    lineNumbers: true,
                                    htmlMode: true,
                                    mode: "text/html",
                                    tabMode: 'indent',
                                    lineWrapping: true
                                }
                            })
                            $('#quote').summernote({
                                tabsize: 4,
                                height: 100,
                                followingToolbar: false,
                                disableResizeEditor: true,
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
                                height: 100,
                                followingToolbar: false,
                                disableResizeEditor: true,
                                codemirror: {
                                    lineNumbers: true,
                                    htmlMode: true,
                                    mode: "text/html",
                                    tabMode: 'indent',
                                    lineWrapping: true
                                }
                            })
                            $('#description').summernote('code', me.res.instructor_details.description)
                            $('#quote').summernote('code', me.res.instructor_details.quote)
                            $('#spotify_description').summernote('code', me.res.instructor_details.spotify_description)
                        }, 100)
                        me.$axios.get('api/specializations').then(res => {
                            if (res.data) {
                                res.data.specializations.forEach((specialization, index) => {
                                    specialization.checked = false
                                    if (me.tempSpecializations.length > 0) {
                                        me.tempSpecializations.forEach((temp, index) => {
                                            if (temp.specialization_id == specialization.id) {
                                                specialization.checked = true
                                            }
                                        })
                                    }
                                    me.specializations.push(specialization)
                                })
                            }
                        })
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
