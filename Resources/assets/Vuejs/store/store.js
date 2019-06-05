import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

/* ==== > import module < ==== */
// import auth from './modules/auth'
import wrap from './modules/wrap'
import wrapMenu from './modules/wrapMenu'
import wrapCategory from './modules/wrapCategory'
/* ==== > / import module < ==== */


/* ==== > import mutations - actions - getters < ==== */
import * as mutations from "./mutations";
// import * as actions from './actions'
// import * as getters from './getters'
/* ==== > / import mutations - actions - getters < ==== */

Vue.use(Vuex);

const modules = {
	// auth,
    wrap,
    wrapMenu,
    wrapCategory,
}

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    mutations,
    // actions,
    // getters,
	modules
});

export default store;