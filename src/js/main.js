
import Vue from 'vue';
import VueApp from './VueApp.vue';
import my from './my.js'; //js読み込み
import '../css/main.scss';//css読み込み

new Vue({
    el: '#vue-root',//#vue-rootにVueApp.vueのテンプレートをインクルードする
    render: (h) => h(VueApp),
});

console.log('webpack!!');
console.log('webpack02!!');
my(); //実行