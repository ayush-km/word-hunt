import {Container, Switch, withStyles} from "@material-ui/core";
import axios from "axios";
import {useState, useEffect} from "react";
import "./App.css";
import Definitions from "./components/definitions/Definitions";
import Header from "./components/header/Header";
import {grey} from "@material-ui/core/colors";

function App() {
    const [word, setWord] = useState("");
    const [meanings, setMeanings] = useState([]);
    const [category, setCategory] = useState("en");
    const [lightMode, setLightMode] = useState(false);

    const ModeSwitcher = withStyles({
        switchBase: {
            color: grey[300],
            "&$checked": {
                color: grey[500],
            },
            "&$checked + $track": {
                backgroundColor: grey[500],
            },
        },
        checked: {},
        track: {},
    })(Switch);


    async function dictionaryApi() {
        try {
            const data = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
            );
            setMeanings(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dictionaryApi();
    }, [word, category]);

    const headerProps = {
        category: category,
        setCategory: setCategory,
        word: word,
        setWord: setWord,
        meanings: meanings,
        setMeanings: setMeanings,
        lightMode: lightMode
    };

    return (
        <div
            className="App"
            style={{
                height: "100vh",
                backgroundColor: lightMode?"#fff":"#282c34",
                color: lightMode?"#000":"whitesmoke",
                transition: "all 0.5s linear"
            }}
        >
            <Container
                maxWidth="md"
                style={{display: "flex", flexDirection: "column", height: "100vh", justifyContent:"space-evenly"}}
            >
                <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}>
                    <span>{lightMode?"Dark":"Light"} Mode</span>
                    <ModeSwitcher checked={lightMode} onChange={() => setLightMode(!lightMode)}/>
                </div>
                <Header {...headerProps} />
                {meanings && <Definitions {...headerProps} />}
            </Container>
        </div>
    );
}

export default App;
