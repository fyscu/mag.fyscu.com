import { Document, Page } from "react-pdf";
import styles from "./Viewer.module.css";
import { Data } from "./App";

type Props = {
    data :Data | undefined;
};

export default function Viewer(props :Props){
    const {data} = props;
    if(!data) return null;
    return(<section className={styles.outer}>
        <div className={styles.left}>
            <div>期次：{data.year} 年第 {data.index} 期</div>
            <div>时间：{data.upload_time}</div>
            <div>名称：{data.name}</div>
            <div>{data.description}</div>
        </div>
        <Document file={`https://mag.feiyang.ac.cn/pdfs/${data.filename}`} />
    </section>);
}