<template>
    <form :class="`input_content_wrapper ${(value.quantity < value.reorder_point) ? 'threshold' : ''}`" :data-vv-scope="`purchase_order_form_${unique}`">
        <div class="input_wrapper">
            <div class="input_content">{{ value.variant }}</div>
            <div class="input_content">{{ value.sku_id }}</div>
            <div class="input_content">{{ (value.sellable) ? 'Yes' : 'No' }}</div>
            <div class="input_content">{{ value.sku_id }}</div>
            <div class="input_content">{{ value.quantity }}</div>
            <div class="input_content">
                <input type="text" name="quantity[]" class="default_text" autocomplete="off" v-validate="'required|numeric'" v-model="quantity" @change="isQuantity = true">
                <transition name="slide"><span class="validation_errors" v-if="errors.has(`purchase_order_form_${unique}.quantity[]`)">{{ errors.first(`purchase_order_form_${unique}.quantity[]`) }}</span></transition>
            </div>
            <div class="input_content">PHP {{ value.unit_price }}</div>
            <div class="input_content">
                <input type="text" name="shipping_cost[]" :class="`default_text ${(!isQuantity) ? 'disabled' : '' }`" autocomplete="off" v-validate="'required|decimal:2'" v-model="shipping" @change="updateTotal($event, 'shipping', unique)">
                <transition name="slide"><span class="validation_errors" v-if="errors.has(`purchase_order_form_${unique}.shipping_cost[]`)">{{ errors.first(`purchase_order_form_${unique}.shipping_cost[]`) }}</span></transition>
            </div>
            <div class="input_content">
                <input type="text" name="additional_cost[]" :class="`default_text ${(!isQuantity) ? 'disabled' : '' }`" autocomplete="off" v-validate="'required|decimal:2'" v-model="additional"  @change="updateTotal($event, 'additional', unique)">
                <transition name="slide"><span class="validation_errors" v-if="errors.has(`purchase_order_form_${unique}.additional_cost[]`)">{{ errors.first(`purchase_order_form_${unique}.additional_cost[]`) }}</span></transition>
            </div>
            <div class="input_content">
                PHP {{ computeTotal }}
                <div class="close_wrapper alternate">
                    <div class="close_icon"></div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            value: {
                default: function () {
                    return 0
                }
            },
            unique: {
                type: Number,
                default: null
            },
        },
        inject: ['$validator'],
        data () {
            return {
                isQuantity: false,
                quantity: 0,
                shipping: 0,
                additional: 0
            }
        },
        computed: {
            computeTotal () {
                const me = this
                let total = 0
                let quantity = parseFloat(me.quantity)
                let unit_price = parseFloat(me.value.unit_price)
                let shipping = parseFloat(me.shipping)
                let additional = parseFloat(me.additional)
                if ((quantity * unit_price) == 0) {
                    if (shipping != 0 && additional == 0) {
                        total = unit_price + shipping
                    } else if (shipping == 0 && additional != 0) {
                        total = unit_price + additional
                    } else if (shipping != 0 && additional != 0) {
                        total = unit_price + additional + shipping
                    } else {
                        total = unit_price
                    }
                } else {
                    total = (quantity * unit_price) + shipping + additional
                }
                me.$parent.form.total.findIndex((item, index) => {
                    if (item.unique == me.unique) {
                        item.value = total
                    }
                })
                me.total = total
                return me.totalCount(total)
            }
        },
        methods: {
            updateTotal (event, type, unique) {
                const me = this
                let element = event.target
                switch (type) {
                    case 'shipping':
                        me.$parent.form.shipping.findIndex((item, index) => {
                            if (item.unique == unique) {
                                item.value = element.value
                            }
                        })
                        break
                    case 'additional':
                        me.$parent.form.additional.findIndex((item, index) => {
                            if (item.unique == unique) {
                                item.value = element.value
                            }
                        })
                        break
                }
            }
        }
    }
</script>
