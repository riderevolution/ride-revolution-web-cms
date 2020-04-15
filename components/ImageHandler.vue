<template>
    <div v-if="enabled">
        <div class="form_group">
            <input type="file" class="action_image" :id="`image${unique}`" name="image" ref="file" @change="getFile($event)" v-validate="`image|ext:jpeg,jpg,png|size:2000${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`" :required="item.key == null">
            <label class="action_image_label" :for="`image${unique}`">{{ (item.key != null) ? item.name : 'Choose File' }}</label>
            <div v-if="$parent.showCloser" class="action_image_remove" @click="removeImage($event, unique, item.key, parent)">Remove</div>
            <transition name="slide"><span class="validation_errors" v-if="errors.has('image')">{{ errors.first('image') }}</span></transition>
        </div>
        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_image${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <div class="form_group">
                    <label :for="`image_title${unique}`">Image Title</label>
                    <input type="text" name="image_title[]" :id="`image_title${unique}`" autocomplete="off" class="default_text" v-model="dataImage.title">
                </div>
                <div class="form_group">
                    <label :for="`image_alt${unique}`">Image Alt</label>
                    <input type="text" name="image_alt[]" :id="`image_alt${unique}`" autocomplete="off" class="default_text" v-model="dataImage.alt">
                    <input type="hidden" name="image_key[]" :value="`${(item.key) ? item.key : ''}`">
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
                type: String
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
        data () {
            return {
                showTags: false,
                enabled: true,
                dataImage: {
                    title: '',
                    alt: ''
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
                    reader.readAsDataURL(element.files[0])
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
                        me.$axios.delete(`delete/image/${me.tableName}/${me.parent}/${key}`).then(res => {
                            if (res.data == 200) {
                                this.enabled = false
                                this.$parent.determineIfShowCloser()
                            }
                        })
                    }
				}
            }
        },
        async mounted () {
            await setTimeout( () => {
                if (this.item) {
                    this.dataImage.title = this.item.title
                    this.dataImage.alt = this.item.alt
                    this.showTags = (this.item != 0) ? true : false
                }
            }, 300)
        }
    }
</script>
