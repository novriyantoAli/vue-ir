const todo = {
    namespaced: true,
    state: {
        listData: [
            { id:1, user_id:1, title: 'Example', },
        ]
    },
    getters: {
        getRowById: (state) => (id) => {
            return state.listData.find((obj) => {
                return obj.id===id
            })
        }
    },
    mutations: {
        ADD_ROW: (state, payload) => {
            state.listData.push(payload.row);
        },
        EDIT_ROW(state, payload){
            var listData = state.listData
            listData.forEach((element, index) => {
                if(element.id === payload.id) {
                    listData[index] = payload;
                }
            });
            state.listData = listData;
        },
        REMOVE_ROW(state, payload){
            state.listData.splice(state.listData.indexOf(payload.row), 1);
        },
    },
    actions: {
        save_row({ commit, rootState }, payload) {
            rootState.isLoading = true;
            setTimeout(() => {
                commit('ADD_ROW', payload)
                rootState.isLoading = false
            }, 1000)
        },
        edit_row({commit}, payload){
            commit('EDIT_ROW', payload)
        },
        remove_row({commit}, payload){
            commit('REMOVE_ROW', payload)
        },
    }
}
 
export default todo;