import { useEffect, useState } from "react";
import styles from "./App.module.css";
import List from "./List";
import Viewer from "./Viewer";
import { pdfjs } from "react-pdf";

export type Data = {
    id :number;
    name :string;
    description :string;
    filename :string;
    index :number;
    upload_time :string;
    year :string;
};

export default function App(){
    const
        [current, setCurrent] = useState<Data>(),
        [listData, setListData] = useState<Data[]>([]),
        title = document.getElementById("title") as HTMLTitleElement;
    const
        showList = (changeUrl :boolean = true)=>{
            setCurrent(undefined);
            if(changeUrl && window.location.hash !== "" && window.location.hash !== "#") window.location.hash = "";
            title.textContent = "飞扬俱乐部 | i飞扬电子杂志";
        },
        setView = (id :number, changeUrl :boolean = true)=>{
            for(let i = 0; i < listData.length; i++) if(listData[i].id === id){
                setCurrent(listData[i]);
                console.log("change to id", listData[i]);
                title.textContent = `i飞扬 | ${listData[i].year}第${listData[i].index}期`;
                if(changeUrl) window.location.hash = id + "";
                break;
            }
        },
        popState = ()=>{
            const id = parseInt(window.location.hash.substring(1, window.location.hash.length));
            console.log("pop", window.location, id);
            if(!isNaN(id)) setView(id, false);
            else showList(false);
        };
    useEffect(()=>{
        (async ()=>{
            pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
            const response = fetch("https://mag.feiyang.ac.cn/api/get", {
                method: "GET"
            }).catch((r :any)=>{
                console.log(r);
            });
            const temp = await response;
            if(temp){
                const result = await temp.json();
                if(result.success){
                    setListData(result.pdfs);
                    const id = parseInt(window.location.hash.substring(1, window.location.hash.length));
                    if(!isNaN(id)){ //Go into the magazine.
                        for(let i = 0; i < result.pdfs.length; i++) if(result.pdfs[i].id === id){
                            setCurrent(result.pdfs[i]);
                            console.log("init change to id", result.pdfs[i]);
                            title.textContent = `i飞扬 | ${result.pdfs[i].year}第${result.pdfs[i].index}期`;
                            break;
                        }
                    }
                }
            }
        })();
        window.addEventListener("popstate", popState);
        return ()=>{
            window.removeEventListener("popstate", popState);
        }
    }, []);

    return (<>
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <div className={styles.logo}>i飞扬</div>
                <div className={styles.titleSuffix}><div></div><div>电子杂志</div></div>
            </div>
            <div className={styles.menu}>
                <div className={styles.menuInner}>
                    <button className={styles.menuItem} onClick={()=>showList()}>全部杂志</button>
                </div>
                <div className={styles.menuInner}>
                    <button className={styles.menuItem}>后台管理</button>
                    <div className={styles.about}>
                        <span>©2025</span>
                        <a target="_blank" href="https://feiyang.ac.cn">飞扬俱乐部</a>
                        <a target="_blank" href="https://med.feiyang.ac.cn">流媒部</a>
                    </div>
                </div>
            </div>
        </header>
        {current ? <Viewer data={current} /> : <List data={listData} cb={setView} />}
    </>);
}