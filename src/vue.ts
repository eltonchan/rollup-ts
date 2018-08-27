
// mvvm 
import { IVue } from './types';
import { proxy, noop } from './utils';
import Observe from './observe';
import Compile from './Compile';
import Watcher from './watcher';
import defineComputed from './computed';


let uid = 0;

export default class Vue implements IVue {
    id = 0;
    el = '';
    vm: Vue;
    ob;
    _compile: Compile;
    _data = Object.create(null);
    methods = Object.create(null);
    _computedWatchers = Object.create(null);
    _watchers: any[] = [];

    constructor(options) {
        this.id = ++uid;
        this.vm = this;
        this._data = options.data;
        this.methods = options.methods;
        this.el = options.el;

        this.initData();
        this.$mount();

    }

    initData() {
        const keys = Object.keys(this._data);
        let i = keys.length;

        while(i--) {
            proxy(this, "_data", keys[i]);
        }

        this.ob = new Observe(this._data);
    }

    $mount() {
        const el = document.querySelector(this.el);
        this._compile = new Compile(this, el);

        new Watcher(this, this._render, noop);
    }

    _render() {
        this._compile.init();
    }

    // initWatch(watch) {
    //     if (!watch || typeof watch !== 'object') return;
    //     const keys = Object.keys(watch);
    //     let i = keys.length;

    //     while(i--) {
    //         const key = keys[i];
    //         const cb = watch[key];
    //         this.$watch(key, cb);
    //     }
    // }

    // initComputed(computed) {
    //     if (!computed || typeof computed !== 'object') return;
    //     const keys = Object.keys(computed);
    //     let i = keys.length;
    // }
}