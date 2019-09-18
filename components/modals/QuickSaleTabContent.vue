<template>
    <div>
        <div :class="`modal_tab_content_wrapper ${(value.isGiftShow) ? 'no_qty' : '' }`" v-show="(value.isProductShow == true) ? $parent.toCompare.product == value.product.product_category_id : (value.isGiftShow == true ? true : false)">
            <div class="form_check">
                <input type="checkbox" :id="`product_${value.id}_${unique}`" name="product[]" class="action_check" @change="toggleChecked(value.id, unique, (!value.isGiftShow) ? value.sale_price : value.class_package.package_price)" :checked="value.isChecked">
                <label :for="`product_${value.id}_${unique}`">{{ (!value.isGiftShow) ? value.variant : value.card_code }}</label>
            </div>
            <div class="total_price">PHP {{ totalCount((!value.isGiftShow) ? value.sale_price : value.class_package.package_price) }}</div>
            <div class="form_group" v-if="!value.isGiftShow">
                <label>Qty.</label>
                <div class="form_flex_input">
                    <input type="text" name="quantity[]" :id="`quantity_${unique}`" class="default_text number" autocomplete="off" v-model="quantity" v-validate="'numeric|min_value:1'" @change="recomputeTotal(value.id, unique, (!value.isGiftShow) ? value.sale_price : value.class_package.package_price)">
                    <div class="up" @click="addCount(value.id, unique, (!value.isGiftShow) ? value.sale_price : value.class_package.package_price)"></div>
                    <div class="down" @click="subtractCount(value.id, unique, (!value.isGiftShow) ? value.sale_price : value.class_package.package_price)"></div>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity[]')">{{ errors.first('quantity[]') }}</span></transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            unique: {
                type: Number,
                default: 0
            },
            value: {
                default: function() {
                    return 0
                }
            }
        },
        data () {
            return {
                quantity: 1
            }
        },
        methods: {
            recomputeTotal (id, key, price) {
                const me = this
                let element = document.getElementById(`product_${id}_${key}`)
                let quantity = document.getElementById(`quantity_${key}`).value
                if (element.checked) {
                    me.$parent.totalPrice.forEach((data, index) => {
                        if (data.id == key) {
                            data.quantity = quantity
                            data.price =  parseInt(quantity) * price
                        }
                    })
                }
            },
            addCount (id, key, price) {
                const me = this
                let element = document.getElementById(`product_${id}_${key}`)
                let data
                data = parseInt(me.quantity)
                data != 0 && (me.quantity = 0)
                me.quantity = (data += 1)
                if (element.checked) {
                    me.$parent.totalPrice.forEach((data, index) => {
                        if (data.id == key) {
                            data.quantity = me.quantity
                            data.price =  parseInt(me.quantity) * price
                        }
                    })
                }
            },
            subtractCount (id, key, price) {
                const me = this
                let element = document.getElementById(`product_${id}_${key}`)
                let data
                data = parseInt(me.quantity)
                data > 1 && (me.quantity = (data -= 1))
                if (element.checked) {
                    me.$parent.totalPrice.forEach((data, index) => {
                        if (data.id == key) {
                            data.quantity = me.quantity
                            data.price =  parseInt(me.quantity) * price
                        }
                    })
                }
            },
            toggleChecked (id, key, price) {
                const me = this
                let element = document.getElementById(`product_${id}_${key}`)
                let quantity = (!me.value.isGiftShow) ? document.getElementById(`quantity_${key}`).value : 1
                if (element.checked) {
                    me.$parent.totalPrice.push(
                        {
                            id: key,
                            quantity: quantity,
                            price: parseInt(quantity) * price
                        }
                    )
                } else {
                    me.$parent.totalPrice.forEach((data, index) => {
                        if (data.id == key) {
                            me.$parent.totalPrice.splice(index, 1)
                        }
                    })
                }
                me.$parent.products[key].isChecked ^= true
            }
        }
    }
</script>
