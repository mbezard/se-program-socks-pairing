import ReactRoutes from "./components/utils/ReactRoutes";
import {Provider} from "react-redux";
import store from "./components/utils/store/store";

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
