import { Component as Cp } from "react";
import styles from "./App.module.css";
import Ifylogo from "../assets/ifylogo.svg";

export default class App extends Cp{

    render(){
        return (<>
            <header className={styles.header}>
                <div style={{width: "6rem", height: "6rem"}}><Ifylogo fill="#BBBBFF" /></div>
            </header>
            <div>
                {}
            </div>
            <footer>
    
            </footer>
        </>);
    }
}