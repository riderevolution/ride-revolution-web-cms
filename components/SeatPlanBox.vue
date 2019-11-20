<template>
    <div :class="`seat_boxes ${position} ${layout}`" v-if="data.length > 0">
        <div class="seat_position" v-for="(seat, lkey) in data" v-if="position == 'left'">
            <div class="seat_number">{{ seat.number }}</div>
        </div>
        <div class="seat_position" v-for="(seat, rkey) in data" v-if="position == 'right'">
            <div class="seat_number">{{ seat.number }}</div>
        </div>
        <div class="seat_position" v-for="(seat, bkey) in data" v-if="position == 'bottom'">
            <div class="seat_number">{{ seat.number }}</div>
        </div>
        <div class="seat_position" v-for="(seat, bkey) in data" v-if="position == 'bottom_alt'">
            <div class="seat_number">{{ seat.number }}</div>
        </div>
        <div class="seat_position" v-for="(seat, bkey) in data" v-if="position == 'bottom_alt_2'">
            <div class="seat_number">{{ seat.number }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            position: {
                type: String,
                default: null
            },
            layout: {
                type: String,
                default: null
            },
            data: {
                default: null
            }
        }
    }
</script>
