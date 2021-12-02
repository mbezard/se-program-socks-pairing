import './App.css';
import ReactRoutes from "./components/utils/ReactRoutes";
import {Provider} from "react-redux";
import store from "./components/utils/store/index";

function App() {
    return (
        <>
            <Provider store={store}>
                <ReactRoutes/>
            </Provider>
        </>
    );
}

export default App;
