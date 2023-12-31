<template>
    <div v-if="enabled" :data-vv-scope="`image_form_${unique}`">
        <div class="form_group">
            <input type="file" class="action_image" :data-vv-name="`image_form_${unique}.image[]`" :id="`image${unique}`" name="image[]" ref="file" @change="getFile($event)" v-validate="`${(dataImage.id) ? '' : 'required|'}image|ext:jpeg,jpg,png,svg|size:20000${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`">
            <input type="hidden" name="image_id[]" v-model="dataImage.id">
            <label class="action_image_label" :for="`image${unique}`">Choose File</label>
            <div v-if="$parent.showCloser" class="action_image_remove" @click="removeImage($event, unique, item.id, parent)">Remove</div>
            <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.image[]`)">{{ properFormat(errors.first(`image_form_${unique}.image[]`)) }}</span></transition>
        </div>
        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_image${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <div class="form_group">
                    <label :for="`image_title${unique}`">Image Title <span>*</span></label>
                    <input type="text" name="image_title[]" :id="`image_title${unique}`" :data-vv-name="`image_form_${unique}.image_title[]`" v-validate="{required: true, regex: '^[a-zA-Z\-_ |\_]*$', max: 20}" autocomplete="off" class="action_form default_text" v-model="dataImage.title">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.image_title[]`)">{{ properFormat(errors.first(`image_form_${unique}.image_title[]`)) }}</span></transition>
                </div>
                <div class="form_group">
                    <label :for="`image_alt${unique}`">Image Alt <span>*</span></label>
                    <input type="text" name="image_alt[]" :id="`image_alt_${unique}`" :data-vv-name="`image_form_${unique}.image_alt[]`" v-validate="{required: true, regex: '^[a-zA-Z\_\-]*$', max: 20}" autocomplete="off" class="action_form default_text" v-model="dataImage.alt">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.image_alt[]`)">{{ properFormat(errors.first(`image_form_${unique}.image_alt[]`)) }}</span></transition>
                </div>
                <div class="form_group" v-if="$parent.multiple">
                    <label :for="`image_sequence${unique}`">Image Sequence <span>*</span></label>
                    <input type="text" name="image_sequence[]" :id="`image_sequence_${unique}`" :data-vv-name="`image_form_${unique}.image_sequence[]`" v-validate="{required: true, numeric: true, min_value: 1, max_value: 99}" autocomplete="off" class="action_form default_text" v-model="dataImage.sequence">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.image_sequence[]`)">{{ properFormat(errors.first(`image_form_${unique}.image_sequence[]`)) }}</span></transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                default: 0
            },
            unique: {
                type: Number
            },
            parent: {
                type: Number,
                default: 0
            },
            tableName: {
                type: String,
                default: 'images'
            },
            dimension: {
                type: Object,
                default: function () {
                    return {
                        imageWidth: 0,
                        imageHeight: 0
                    }
                }
            }
        },
        inject: ['$validator'],
        data () {
            return {
                showTags: false,
                enabled: true,
                dataImage: {
                    id: 0,
                    title: '',
                    alt: '',
                    sequence: 0
                }
            }
        },
        methods: {
            getFile (event) {
                let element = event.target
                let me = this
                if (element.files[0]) {
                    element.nextElementSibling.innerText = element.files[0].name
                    me.showTags = true
                    me.$parent.files[me.unique] = me.$refs.file.files[0]
                }
                if (element.files && element.files[0]) {
                    let reader = new FileReader()
                    reader.onload = function () {
                        let image = document.getElementById(`preview_image${me.unique}`)
                        image.src = reader.result
                    }
                    setTimeout( () => {
                        reader.readAsDataURL(element.files[0])
                    }, 10)
                }
            },
            removeImage (event, unique, key, parent) {
                let me = this
                me.$parent.files.forEach((file, index) => {
                    if (unique == index) {
                        me.$parent.files.splice(index, 1)
                    }
                })
                if (this.item == 0) {
					this.enabled = false
					this.$parent.determineIfShowCloser()
				} else {
                    let shouldDelete = confirm('This image will be deleted from database as you proceed. Are you sure you want to continue?')
                    if (shouldDelete) {
                        me.$axios.delete(`api/extras/images/${key}`).then(res => {
                            if (res.status == 200) {
                                this.enabled = false
                                this.$parent.determineIfShowCloser()
                            }
                        })
                    }
				}
            }
        },
        mounted () {
            let ctr = 0
            setInterval( () => {
                if (ctr < 1 && this.item) {
                    this.dataImage.id = (this.item.id != null) ? this.item.id : 0
                    this.dataImage.title = this.item.title
                    this.dataImage.alt = this.item.alt
                    this.dataImage.sequence = this.item.sequence
                    this.showTags = (this.item != 0) ? true : false
                    ctr++
                }
            }, 500)
        }
    }
</script>
