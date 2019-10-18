export const state = () => {
    return {
        history: []
    }
}

export const mutations = {
    setHistory(state, data){
        state.history.unshift(data);
    }
}