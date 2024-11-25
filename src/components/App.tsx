import { Component as Cp } from "react";
import styles from "./App.module.css";
import Ifylogo from "../assets/ifylogo.svg";

export default class App extends Cp{

    render(){
        return (<>
            <header className={styles.header}>
                <div className={styles.logoWrapper}><Ifylogo fill="#BBBBFF" /></div>
            </header>
            <div>
                {}
            </div>
            <footer>
    
            </footer>
        </>);
    }
}