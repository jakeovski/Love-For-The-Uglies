import React from "react";
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import reducers from './reducers';
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";

/**
 * Stores the state of the data across the application
 * @type {Store<EmptyObject & S, AnyAction> & Store<S, A> & {dispatch: ThunkDispatch<any, undefined, AnyAction>}}
 */
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));