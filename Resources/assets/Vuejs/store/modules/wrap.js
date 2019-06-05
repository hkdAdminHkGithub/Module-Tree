const getDefaultState = () => {
    return {
        data: [
            {
                id: 1,
                text: 'Root',
                state: {
                    expanded: true
                },
                children: [{
                        id: 2,
                        text: 'Getting Started',
                        state: {
                            checked: true
                        },
                        children: [{
                                id: 3,
                                text: 'Factory'
                            },
                            {
                                id: 4,
                                text: 'Prototype'
                            },
                            {
                                id: 5,
                                text: 'Mixin'
                            },
                            {
                                id: 6,
                                text: 'Singleton'
                            }
                        ]
                    },
                    {
                        id: 7,
                        text: 'JavaScript Code Style',
                        state: {
                            selected: true
                        },
                        children: [{
                                id: 8,
                                text: 'Creational Design Patterns'
                            },
                            {
                                id: 9,
                                text: 'Structural Design Patterns'
                            }
                        ]
                    },
                    {
                        id: 10,
                        text: 'The Good Parts',
                        children: [{
                                id: 11,
                                text: 'OBJECT ORIENTED',
                                state: {
                                    checked: true
                                }
                            },
                            {
                                id: 12,
                                text: 'ANONYMOUS FUNCTIONS',
                                state: {
                                    checked: true
                                }
                            },
                            {
                                id: 13,
                                text: 'FUNCTIONS AS FIRST-CLASS OBJECTS',
                                state: {
                                    checked: true
                                }
                            },
                            {
                                id: 14,
                                text: 'LOOSE TYPING',
                                state: {
                                    checked: true
                                }
                            }
                        ]
                    },
                    {
                        id: 15,
                        text: 'Patterns',
                        children: [{
                                id: 16,
                                text: 'DESIGN PATTERNS',
                                state: {
                                    expanded: true
                                },
                                children: [{
                                        id: 17,
                                        text: 'MVC Pattern'
                                    },
                                    {
                                        id: 18,
                                        text: 'MVP Pattern'
                                    },
                                    {
                                        id: 19,
                                        text: 'MVVM Pattern'
                                    }
                                ]
                            },
                            {
                                id: 20,
                                text: 'MV* PATTERNS',
                                children: [{
                                        id: 21,
                                        text: 'MVC Pattern'
                                    },
                                    {
                                        id: 22,
                                        text: 'MVP Pattern'
                                    },
                                    {
                                        id: 23,
                                        text: 'MVVM Pattern'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}


// initial state
const state = getDefaultState()


const mutations = {
    loadChange(state, [name, val]) {
        state[name] = val
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
}

const actions = {
    async getArticles(content, payload) {
        const response = await Axios({
            url: '',
            method: '',
            headers: '',
            data: payload,
        });
        content.commit("getArticles", response.data.data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
