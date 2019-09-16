<template>
    <div>
        <div :class="`modal_tab_content_wrapper ${(value.isGiftShow) ? 'no_qty' : '' }`" v-for="(value, index) in values" :key="`${value.id}_unique`" v-show="(value.isProductShow == true) ? $parent.toCompare.product == value.product.product_category_id && $parent.isProduct : (value.isGiftShow == true ? true : false)">
            <div class="form_check">
                <input type="checkbox" :id="`product_${value.id}_${unique}`" name="product[]" class="action_check">
                <label :for="`product_${value.id}_${unique}`">{{ (!value.isGiftShow) ? value.variant : value.card_code }}</label>
            </div>
            <div class="total_price">PHP {{ totalCount((!value.isGiftShow) ? value.sale_price : value.class_package.package_price) }}</div>
            <div class="form_group" v-if="!value.isGiftShow">
                <label>Qty.</label>
                <div class="form_flex_input">
                    <input type="text" :name="`quantity_${value.id}_${unique}`" class="default_text number" autocomplete="off" v-model="quantity" v-validate="'numeric|min_value:0'">
                    <div class="up" @click="addCount()"></div>
                    <div class="down" @click="subtractCount()"></div>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity')">{{ errors.first('quantity') }}</span></transition>
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
                default: null
            },
            values: {
                default: function() {
                    return 0
                }
            }
        },
        data () {
            return {
                quantity: 0
            }
        },
        methods: {
            addCount () {
                const me = this
                let data
                data = parseInt(me.quantity)
                data != 0 && (me.quantity = 0)
                me.quantity = (data += 1)
            },
            subtractCount () {
                const me = this
                let data
                data = parseInt(me.quantity)
                data > 0 && (me.quantity = (data -= 1))
            }
        }
    }
</script>
