const pending = (state, { payload })=>{
    return{...state, loading: true}
};

const fulfilled = (state, {payload})=>{
    return{
        data: payload?.data,
        loading: false,
        error: null
    }
};

const rejected = (state,{payload})=>{
    return{
        ...state,
        loading: false,
        error:{
            code: payload?.data?.rt ? payload?.data?.rt : (payload?.status ? payload.status : 500),
            message: payload?.data?.ermsg ? payload?.data?.ermsg :(payload?.statusText ? payload.statusText : 'ServerError')
        }
    }
};

export {pending, fulfilled, rejected};