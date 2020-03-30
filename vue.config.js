const prependData = `
@import "@/assets/styles/_vars.scss";
@import "@/assets/styles/_utils.scss";

`
// $material-icons-font-path: '~material-icons/iconfont/';
// @import '~material-icons/iconfont/material-icons.scss';

module.exports = {
    css: {
        loaderOptions: {
            css: {},
            scss: { prependData }
        }
    }
};





// problem => overrides the <App> styles


// @import "@/assets/styles/reset.scss"; // why body margin: 0 doesn't work?
