<template>
    <div v-if="enabled" :data-vv-scope="`image_form_${unique}`">
        <div class="group">
            <input type="file" class="action_image" :data-vv-name="`image_form_${unique}.banner[]`" accept=".jpeg, .jpg, .png" :key="`image_form_${unique}.banner[]`" :id="`image${unique}`" name="banner[]" ref="file" @change="getFile($event)" v-validate="`${(dataImage.id) ? '' : 'required|'}image|ext:jpeg,jpg,png,svg|size:20000${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`" v-if="not_required">
            <input type="file" class="action_image" :data-vv-name="`image_form_${unique}.banner[]`" accept=".jpeg, .jpg, .png" :key="`image_form_${unique}.banner[]`" :id="`image${unique}`" name="banner[]" ref="file" @change="getFile($event)" v-validate="`image|ext:jpeg,jpg,png,svg|size:20000${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`" v-else>
            <input type="hidden" name="file_id[]" v-model="dataImage.id">
            <input type="hidden" name="file_category[]" v-model="category">
            <label class="action_image_label" :for="`image${unique}`">Choose File</label>
            <div v-if="$parent.showCloser" class="action_image_remove" @click="removeImage($event, unique, item.id, parent)">Remove</div>
            <transition name="slide"><span class="validate" v-if="errors.has(`image_form_${unique}.banner[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner[]`)) }}</span></transition>
        </div>
        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_image${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <div class="group bordered filled">
                    <label :for="`image_title${unique}`">{{ image_label }}  Title <span>*</span></label>
                    <input type="text" name="banner_title[]" :id="`image_title${unique}`" :data-vv-name="`image_form_${unique}.banner_title[]`" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\_]*$', max: 50}" autocomplete="off" class="input" v-model="dataImage.title">
                    <transition name="slide"><span class="validate" v-if="errors.has(`image_form_${unique}.banner_title[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner_title[]`)) }}</span></transition>
                </div>
                <div :class="[ 'group bordered filled', ($parent.multiple) ? '' : 'nmb' ]">
                    <label :for="`image_alt${unique}`">{{ image_label }}  Alt <span>*</span></label>
                    <input type="text" name="banner_alt[]" :id="`image_alt_${unique}`" :data-vv-name="`image_form_${unique}.banner_alt[]`" v-validate="{required: true, regex: '^[a-zA-Z0-9\_\-]*$', max: 50}" autocomplete="off" class="input" v-model="dataImage.alt">
                    <transition name="slide"><span class="validate" v-if="errors.has(`image_form_${unique}.banner_alt[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner_alt[]`)) }}</span></transition>
                </div>
                <div class="group bordered filled nmb" v-if="$parent.multiple">
                    <label :for="`image_sequence${unique}`">{{ image_label }}  Sequence <span>*</span></label>
                    <input type="text" name="banner_sequence[]" :id="`image_sequence_${unique}`" :data-vv-name="`image_form_${unique}.banner_sequence[]`" v-validate="{required: true, numeric: true, min_value: 1, max_value: 99}" autocomplete="off" class="input" v-model="dataImage.sequence">
                    <transition name="slide"><span class="validate" v-if="errors.has(`image_form_${unique}.banner_sequence[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner_sequence[]`)) }}</span></transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            not_required: {
                type: Boolean,
                default: true
            },
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
            table_name: {
                type: String,
                default: 'images'
            },
            image_label: {
				type: String,
				default: 'Banner'
			},
            category: {
                type: String,
                default: 'image'
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
                        if (me.$parent.$parent.collapsible) {
                            let target = document.getElementById('item_1')
                            target.style.height = `${target.scrollHeight}px`
                        }
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
                    me.$axios.delete(`images/${key}`).then(res => {
                        this.enabled = false
                        this.$parent.determineIfShowCloser()
                    })
				}
            }
        },
        mounted () {
            let ctr = 0
            setInterval( () => {
                if (ctr < 1 && this.item) {
                    this.dataImage.id = (this.item.id != null) ? this.item.id : 0
                    this.dataImage.title = (this.item.title) ? this.item.title : ''
                    this.dataImage.alt = (this.item.alt) ? this.item.alt : ''
                    this.dataImage.sequence = (this.item.sequence) ? this.item.sequence : 0
                    this.showTags = (this.item && this.item.id) ? true : false
                    ctr++
                }
            }, 500)
        }
    }
</script>
