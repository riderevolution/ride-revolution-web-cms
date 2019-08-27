<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionAddSuccess()" enctype="multipart/form-data" v-if="type == 0">
            <div class="modal_wrapper">
                <h2 class="form_title">{{ parentTitle }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group">
                    <div class="form_photo alternate">
                        <input type="file" id="image" name="image[]" class="action_photo" @change="getFile($event)" v-validate="'required|image'" multiple>
                        <label for="image">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18.306 18.306"><g transform="translate(-1233.873 -1197.248) rotate(-9)"><g transform="translate(1031 1378)" fill="none" stroke="#00b1ff" stroke-width="1"><rect width="16" height="16" rx="2" stroke="none"/><rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="none"/></g><path d="M16305.061-1443.824l5.559-4.864,4.563,4.259,2.891-3.014,2.3,3.014" transform="translate(-15273.644 2834.915)" fill="none" stroke="#00b1ff" stroke-width="1"/><g transform="translate(1039 1380.909)" fill="none" stroke="#00b1ff" stroke-width="1"><circle cx="1.818" cy="1.818" r="1.818" stroke="none"/><circle cx="1.818" cy="1.818" r="1.318" fill="none"/></g></g></svg>
                                 Upload Photos
                             </span>
                        </label>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('image[]')">{{ errors.first('image[]') }}</span></transition>
                    </div>
                    <div class="preview_image_wrapper">
                        <div class="preview" v-for="(data, key) in images" :key="key">
                            <img :id="`preview_image_${key}`" src="/" v-if="previewImage"/>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="button_group">
                            <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                            <button type="submit" name="submit" class="action_btn margin alternate">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <form id="default_form" class="overlay" @submit.prevent="submissionUpdateSuccess()" enctype="multipart/form-data" v-else>
            <div class="modal_wrapper">
                <h2 class="form_title">Update {{ res.name }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group">
                    <div class="form_group">
                        <label for="name">Category Name <span>*</span></label>
                        <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'" v-model="res.name">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="button_group">
                            <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                            <button type="submit" name="submit" class="action_success_btn margin alternate">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: Number,
                default: 0
            },
            id: {
                type: Number
            },
            parentTitle: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                previewImage: false,
                images: [],
                res: []
            }
        },
        methods: {
            getFile (event) {
                const me = this
                let element = event.target
                me.images = []
                if (element.files && element.files[0]) {
                    for (let i = 0; i < element.files.length; i++) {
                        me.images.push(i)
                        let reader = new FileReader()
                        reader.onload = function () {
                            let image = document.getElementById(`preview_image_${i}`)
                            image.src = reader.result
                        }
                        reader.readAsDataURL(element.files[i])
                    }
                }
                me.previewImage = true
                setTimeout( () => {
                    if (document.querySelector('.preview_image_wrapper').scrollHeight >= 500) {
                        document.querySelector('.preview_image_wrapper').classList.add('scrollable')
                    }
                }, 10)
            },
            toggleClose () {
                const me = this
                me.$store.state.variantImageForm = false
                document.body.classList.remove('no_scroll')
            },
            submissionAddSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        me.loader(true)
                        me.$axios.post('api/inventory/product-categories', formData).then(res => {
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
                            me.$store.state.variantImageForm = false
                            setTimeout( () => {
                                if (!me.$store.state.errorStatus) {
                                    me.$parent.fetchData()
                                }
                            }, 500)
                            setTimeout( () => {
                                me.loader(false)
                            }, 1000)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '.default_modal',
                            offset: -250
                        })
                    }
                })
            },
            submissionUpdateSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/inventory/product-categories/${me.id}`, formData).then(res => {
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
                            me.$store.state.variantImageForm = false
                            setTimeout( () => {
                                if (!me.$store.state.errorStatus) {
                                    me.$parent.fetchData()
                                }
                            }, 500)
                            setTimeout( () => {
                                me.loader(false)
                            }, 1000)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '.default_modal',
                            offset: -250
                        })
                    }
                })
            }
        },
        async mounted () {
            const me = this
            if (me.id != 0) {
                me.$axios.get(`api/inventory/product-categories/${me.id}`).then(res => {
                    me.res = res.data.productCategory
                })
            }
        }
    }
</script>
