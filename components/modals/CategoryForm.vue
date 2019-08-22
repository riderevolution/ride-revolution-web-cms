<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionAddSuccess()" enctype="multipart/form-data" v-if="type == 0">
            <div class="modal_wrapper">
                <h2 class="form_title">Add a Category</h2>
                <div class="modal_main_group">
                    <div class="form_group">
                        <label for="name">Category Name <span>*</span></label>
                        <input type="text" name="name" autocomplete="off" autofocus class="default_text" v-validate="'required'">
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
        <form id="default_form" class="overlay" @submit.prevent="submissionUpdateSuccess()" enctype="multipart/form-data" v-else>
            <div class="modal_wrapper">
                <h2 class="form_title">Update {{ res.name }}</h2>
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
            }
        },
        data () {
            return {
                res: []
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.categoryForm = false
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
                            me.$store.state.categoryForm = false
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
                            me.$store.state.categoryForm = false
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
