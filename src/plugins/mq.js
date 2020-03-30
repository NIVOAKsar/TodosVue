import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        mobile: 450,
        // tablet: 900,
        tablet: 1250,
        desktop: Infinity,
    }
})

//  matchMedia