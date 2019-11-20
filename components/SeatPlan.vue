<template>
    <div class="plan_wrapper">
        <seat-plan-box v-for="(seat, key) in seats" :data="seat.numbers" :key="key" :position="seat.position" />
    </div>
</template>

<script>
    import SeatPlanBox from './SeatPlanBox'
    export default {
        components: {
            SeatPlanBox
        },
        data () {
            return {
                seats: {
                    left: {
                        position: 'left',
                        numbers: [
                            {
                                number: 18
                            },
                            {
                                number: 16
                            },
                            {
                                number: 17
                            },
                            {
                                number: 15
                            }
                        ]
                    },
                    right: {
                        position: 'right',
                        numbers: [
                            {
                                number: 14
                            },
                            {
                                number: 12
                            },
                            {
                                number: 13
                            },
                            {
                                number: 11
                            }
                        ]
                    },
                    bottom: {
                        position: 'bottom',
                        numbers: [
                            {
                                number: 10
                            },
                            {
                                number: 9
                            },
                            {
                                number: 8
                            },
                            {
                                number: 7
                            },
                            {
                                number: 6
                            },
                            {
                                number: 5
                            },
                            {
                                number: 4
                            },
                            {
                                number: 3
                            },
                            {
                                number: 2
                            },
                            {
                                number: 1
                            }
                        ]
                    },
                    bottom_alt: {
                        position: 'bottom_alt',
                        numbers: [
                            {
                                number: 28
                            },
                            {
                                number: 27
                            },
                            {
                                number: 26
                            },
                            {
                                number: 25
                            },
                            {
                                number: 24
                            },
                            {
                                number: 23
                            },
                            {
                                number: 22
                            },
                            {
                                number: 21
                            },
                            {
                                number: 20
                            },
                            {
                                number: 19
                            },
                        ]
                    }
                }
            }
        }
    }
</script>
