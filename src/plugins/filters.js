import Vue from 'vue';

Vue.filter('formatDate', (date, locale = 'en-US') => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(locale, options);
})