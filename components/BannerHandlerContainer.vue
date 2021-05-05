<template>
	<div class="form_image_group">
        <label>{{ image_label }} <span>{{ (not_required) ? '*' : '' }}</span> <strong v-if="dimension.imageWidth != 0">( Max: 2MB: Dimension: {{ dimension.imageWidth }} x {{ dimension.imageHeight }} )</strong></label>
		<banner-handler
			v-for="(image, key) in images"
			ref="imagePicker"
			:key="key"
			:unique="(image.id) ? image.id : image"
			:item="image"
			:image_label="image_label"
			:category="category"
			:parent="parent"
			:table_name="table_name"
			:not_required="not_required"
			:dimension="dimension"
		/>
		<!-- <button type="button" class="action_image_add" v-if="multiple" @click="addImage()">Add Image</button> -->
	</div>
</template>

<script>
	import BannerHandler from './BannerHandler'
	export default {
		props: {
			image_label: {
				type: String,
				default: 'Image'
			},
			multiple: {
				type: Boolean,
				default: false
			},
			not_required: {
				type: Boolean,
				default: true
			},
			data: {
				default: ''
			},
			parent: {
				type: Number,
				default: 0
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
		components: {
			BannerHandler
		},
		data () {
			return {
				table_name: 'images',
                files: [],
				images: [0],
				showCloser: false
			}
		},
		methods: {
			addImage () {
				this.images.push(0)
                this.determineIfShowCloser()
			},
            determineIfShowCloser () {
				let enabledCount = 0
				setTimeout(() => {
					this.$refs.imagePicker.forEach((item, index) => {
						if (item.enabled == true) {
							enabledCount++
						}
					})
					this.showCloser = (enabledCount > 1) ? true : false
				}, 10)
			}
		},
		mounted () {
			let ctr = 0
			setInterval( () => {
				if (ctr < 1 && this.data != '') {
					this.images = this.data
					this.data.forEach((item, index) => {
						this.files.push(null)
					})
					ctr++
				}
				this.determineIfShowCloser()
			}, 500)
		}
	}
</script>
