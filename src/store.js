import { createStore } from 'redux'
import indexReducer from './reducers'
let store = createStore((state, action) => {
        /*没有直接放indexReducer是因为这里可以增加其他需要执行的函数，增加扩展性 */
        let nextState=indexReducer(state,action);
        /*这里可以再次处理nextState*/
       return nextState;
    })
export {store}