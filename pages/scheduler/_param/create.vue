<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Create a Schedule</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">{{ $moment(parseInt(1567267200000)).format('MMMM D, YYYY (ddd)') }}</h2>
                            <div class="form_check toggler" @click="isPrivate ^= true">
                                <input type="hidden" id="is_private" name="is_private" class="action_check" :value="(isPrivate) ? 1 : 0">
                                <div :class="`toggle ${(isPrivate) ? 'active' : ''}`"></div>
                                <label for="is_private">Private Class</label>
                            </div>
                        </div>
                        <div class="form_main_group">
                            <div class="form_flex">
                                <div class="form_group flex alternate">
                                    <label>Start Time<span>*</span></label>
                                    <div class="form_flex_input">
                                        <input type="text" name="start_time_hour" class="default_text" autocomplete="off" v-model="form.start.hour" maxlength="2" v-validate="'required|numeric|max_value:12|min_value:0'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_time_hour')">{{ errors.first('start_time_hour') }}</span></transition>
                                    </div>
                                    <div class="form_flex_separator">:</div>
                                    <div class="form_flex_input">
                                        <input type="text" name="start_time_minutes" class="default_text" autocomplete="off" v-model="form.start.mins" maxlength="2" v-validate="'required|numeric|max_value:60|min_value:0'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_time_minutes')">{{ errors.first('start_time_minutes') }}</span></transition>
                                    </div>
                                    <div class="form_flex_input">
                                        <input type="text" name="start_convention" class="default_text number no_click" autocomplete="off" v-model="form.start.convention" v-validate="'required'">
                                        <div class="up" @click="changeConvention('start', 'AM')"></div>
                                        <div class="down" @click="changeConvention('start', 'PM')"></div>
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_convention')">{{ errors.first('start_convention') }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_group">
                                    <label for="peak_type">Peak Type <span>*</span></label>
                                    <select class="default_select alternate" name="peak_type" v-validate="'required'">
                                        <option value="" selected disabled>Choose a Peak</option>
                                        <option value="peak">Peak</option>
                                        <option value="non-peak">Non-Peak</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('peak_type')">{{ errors.first('peak_type') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="class_type_id">Class Type <span>*</span></label>
                                    <select class="default_select alternate" name="class_type_id" v-validate="'required'">
                                        <option value="" selected disabled>Select a Class Type</option>
                                        <option :value="classType.id" v-for="(classType, key) in classTypes" :key="key">{{ classType.name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('class_type_id')">{{ errors.first('class_type_id') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="class_length">Class Length</label>
                                    <input type="text" name="class_length" autocomplete="off" class="default_text disabled" value="50 mins.">
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="description">Description <span>*</span></label>
                                <input type="text" name="description" autocomplete="off" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ errors.first('description') }}</span></transition>
                            </div>
                            <div class="form_flex select_all">
                                <label class="flex_label alternate">Restrict class to: <span>*</span></label>
                                <div class="form_check select_all">
                                    <div :class="`custom_action_check ${(checkData) ? 'checked' : ''}`" @click.prevent="toggleSelectAll($event)">Select All</div>
                                </div>
                                <div class="form_check" v-for="(customerType, key) in customerTypes" :key="key">
                                    <input type="checkbox" :id="`data_${key}`" name="filter_data" class="action_check" v-model="customerType.checked">
                                    <label :for="`data_${key}`">{{ customerType.name }}</label>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="instructor_id">Instructor <span>*</span></label>
                                    <select class="default_select alternate" name="instructor_id" v-validate="'required'">
                                        <option value="" selected disabled>Select an Instructor</option>
                                        <option :value="instructor.id" v-for="(instructor, key) in instructors" :key="key">{{ instructor.first_name }} {{ instructor.last_name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('instructor_id')">{{ errors.first('instructor_id') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="substitute_instructor_id">Substitute Instructor <span>*</span></label>
                                    <select class="default_select alternate" name="substitute_instructor_id" v-validate="'required'">
                                        <option value="" selected disabled>Select an Instructor</option>
                                        <option :value="instructor.id" v-for="(instructor, key) in instructors" :key="key">{{ instructor.first_name }} {{ instructor.last_name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('substitute_instructor_id')">{{ errors.first('substitute_instructor_id') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="class_credits">Class Credits <span>*</span></label>
                                    <input type="text" name="class_credits" autocomplete="off" class="default_text" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('class_credits')">{{ errors.first('class_credits') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <div class="form_check">
                                    <input type="checkbox" id="repeat" name="repeat" class="action_check" @change="isRepeat ^= true">
                                    <label for="repeat">Repeat</label>
                                </div>
                            </div>
                            <transition name="fade">
                                <div class="form_flex" v-if="isRepeat">
                                    <div class="form_group">
                                        <label for="repetition">Repetition <span>*</span></label>
                                        <select class="default_select alternate" name="repetition" v-validate="'required'">
                                            <option value="" selected disabled>Choose a Repetition</option>
                                            <option value="every-day">Every Day</option>
                                            <option value="every-week">Every Week</option>
                                            <option value="every-month">Every Month</option>
                                        </select>
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('repetition')">{{ errors.first('repetition') }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="start_date">Start Date <span>*</span></label>
                                        <input type="date" name="start_date" autocomplete="off" class="default_text date" v-validate="'required'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_date')">{{ errors.first('start_date') }}</span></transition>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                <label for="enabled">Activate</label>
                            </div>
                            <div class="button_group">
                                <nuxt-link :to="`/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
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
    import Foot from '../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                isRepeat: false,
                isPrivate: false,
                lastRoute: '',
                classTypes: [],
                customerTypes: [],
                instructors: [],
                classPackages: [],
                form: {
                    start: {
                        hour: '00',
                        mins: '00',
                        convention: 'AM'
                    },
                    end: {
                        hour: '00',
                        mins: '00',
                        convention: 'PM'
                    },
                    classCount: 0,
                    expiryIn: 0,
                    notActivated: 0,
                    purchaseLimit: 0,
                    ao_fixed_activation_date: '1999-01-01'
                }
            }
        },
        computed: {
            checkData () {
                const me = this
                let count = 0
                let result = false
                me.customerTypes.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.customerTypes.length) {
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
                    me.customerTypes.forEach((data, index) => {
                        data.checked = false
                    })
                } else {
                    me.customerTypes.forEach((data, index) => {
                        data.checked = true
                    })
                }
                if (event.target.classList.contains('checked')) {
                    event.target.classList.remove('checked')
                } else {
                    event.target.classList.add('checked')
                }
            },
            changeConvention (type, status) {
                const me = this
                switch (type) {
                    case 'start':
                        me.form.start.convention = status
                        break
                    case 'end':
                        me.form.end.convention = status
                        break
                }
            },
            toggleFirstClass (status) {
                const me = this
                if (status) {
                    me.isNotActivated = true
                } else {
                    me.isNotActivated = false
                }
            },
            addCount (type) {
                const me = this
                let data
                switch (type) {
                    case 'classCount':
                        data = parseInt(me.form.classCount)
                        data != 0 && (me.form.classCount = 0)
                        me.form.classCount = (data += 1)
                        break
                    case 'expiryIn':
                        data = parseInt(me.form.expiryIn)
                        data != 0 && (me.form.expiryIn = 0)
                        me.form.expiryIn = (data += 1)
                        break
                    case 'notActivated':
                        data = parseInt(me.form.notActivated)
                        data != 0 && (me.form.notActivated = 0)
                        me.form.notActivated = (data += 1)
                        break
                    case 'purchaseLimit':
                        data = parseInt(me.form.purchaseLimit)
                        data != 0 && (me.form.purchaseLimit = 0)
                        me.form.purchaseLimit = (data += 1)
                        break
                }
            },
            subtractCount (type) {
                const me = this
                let data
                switch (type) {
                    case 'classCount':
                        data = parseInt(me.form.classCount)
                        data > 0 && (me.form.classCount = (data -= 1))
                        break
                    case 'expiryIn':
                        data = parseInt(me.form.expiryIn)
                        data > 0 && (me.form.expiryIn = (data -= 1))
                        break
                    case 'notActivated':
                        data = parseInt(me.form.notActivated)
                        data > 0 && (me.form.notActivated = (data -= 1))
                        break
                    case 'purchaseLimit':
                        data = parseInt(me.form.purchaseLimit)
                        data > 0 && (me.form.purchaseLimit = (data -= 1))
                        break
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('ao_fixed_activation_date', me.form.ao_fixed_activation_date)
                        me.loader(true)
                        me.$axios.post('api/packages/class-packages', formData).then(res => {
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
            fetchTypes () {
                const me = this
                me.$axios.get('api/packages/class-types').then(res => {
                    me.classTypes = res.data.classTypes.data
                })
                me.$axios.get('api/extras/customer-types').then(res => {
                    me.customerTypes = res.data.customerTypes
                })
                me.$axios.get('api/instructors?enabled=1').then(res => {
                    me.instructors = res.data.instructors.data
                })
                me.$axios.get('api/extras/class-packages-except-me').then(res => {
                    me.classPackages = res.data.classPackages
                })
            }
        },
        mounted () {
            const me = this
            me.fetchTypes()
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
