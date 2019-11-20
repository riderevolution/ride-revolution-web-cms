<template>
    <div class="plan_wrapper">
        <seat-plan-box v-for="(seat, key) in seats" :data="seat.data" :position="seat.position" :layout="seat.layout" :key="key"/>
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
                temp: [],
                seats: {
                    left: {
                        position: 'left',
                        data: []
                    },
                    right: {
                        position: 'right',
                        data: []
                    },
                    bottom: {
                        position: 'bottom',
                        data: []
                    },
                    bottom_alt: {
                        position: 'bottom_alt',
                        data: []
                    },
                    bottom_alt_2: {
                        position: 'bottom_alt_2',
                        data: []
                    },
                }
            }
        },
        methods: {
            fetchSeats (id) {
                const me = this
                let layout = `layout_${id}`
                me.seats = { left: { position: 'left', layout: layout, data: [] }, right: { position: 'right', layout: layout, data: [] }, bottom: { position: 'bottom', layout: layout, data: [] }, bottom_alt: { position: 'bottom_alt', layout: layout, data: [] }, bottom_alt_2: { position: 'bottom_alt_2', layout: layout, data: [] }, }
                me.loader(true)
                me.$axios.get(`api/seats?studio_id=${id}`).then(res => {
                    if (res.data) {
                        me.temp = res.data.seats
                        me.temp.forEach((seat , index) => {
                            switch (seat.position) {
                                case 'left':
                                    me.seats.left.data.push(seat)
                                    break
                                case 'right':
                                    me.seats.right.data.push(seat)
                                    break
                                case 'bottom':
                                    me.seats.bottom.data.push(seat)
                                    break
                                case 'bottom_alt':
                                    me.seats.bottom_alt.data.push(seat)
                                    break
                                case 'bottom_alt_2':
                                    me.seats.bottom_alt_2.data.push(seat)
                                    break
                            }
                        })
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        }
    }
</script>
