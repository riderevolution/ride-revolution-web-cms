<template>
    <div class="modal_tab_content_wrapper">
        <div class="form_check">
            <input type="checkbox" id="enabled" name="enabled" class="action_check">
            <label for="enabled">{{ value.variant }}</label>
        </div>
        <div class="total_price">PHP {{ totalCount(value.sale_price) }}</div>
        <div class="form_group">
            <label>Qty.</label>
            <div class="form_flex_input">
                <input type="text" name="quantity" class="default_text number" autocomplete="off" v-model="form.quantity" v-validate="'numeric|min_value:0'">
                <div class="up"></div>
                <div class="down"></div>
                <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity')">{{ errors.first('quantity') }}</span></transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                default: function() {
                    return 0
                }
            }
        },
        data () {
            return {
                form: {
                    quantity: 0
                }
            }
        }
    }
</script>
