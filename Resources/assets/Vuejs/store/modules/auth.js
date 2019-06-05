const state = {
    token: 'tokenSample',
    userAuth: 'userSample',
}

const mutations = {
	loadChange(state, [name, val]){
		state[name] = val 
	},
}

export default {
    namespaced: true,
    state,
    mutations
}