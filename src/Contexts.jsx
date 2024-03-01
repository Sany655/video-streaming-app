import React, { createContext, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

export const MyContext = createContext()

function Contexts({ children }) {
    const [saved, setSaved] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        var savedVideosOnLocalStorage = JSON.parse(localStorage.getItem('saved'));
        if (!savedVideosOnLocalStorage) {
            savedVideosOnLocalStorage = [];
        }
        setSaved(savedVideosOnLocalStorage)
        setCount(savedVideosOnLocalStorage?.length)



        const firebaseConfig = {
            apiKey: process.env.REACT_APP_APIKEY,
            authDomain: process.env.REACT_APP_AUTHDOMAIN,
            projectId: process.env.REACT_APP_PROJECTID,
            storageBucket: process.env.REACT_APP_STORAGEBUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
            appId: process.env.REACT_APP_APPID,
            measurementId: process.env.REACT_APP_MEASUREMENTID
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        logEvent(analytics, 'notification_received');
    }, [])

    function deleteSaved(video) {
        const d = JSON.parse(localStorage.getItem('saved'));
        const getWithoutitem = d.filter(v => v.file_code !== video.file_code);
        setSaved(getWithoutitem)
        localStorage.setItem('saved', JSON.stringify(getWithoutitem));
        setCount(count - 1)
    }

    function saveVid(video) {
        const d = JSON.parse(localStorage.getItem("saved"))
        const savedLength = d?.filter(v => v.file_code == video.file_code).length;
        if (savedLength > 0) {
            if (window.confirm('yout have already saved it! Do you want to delete it?')) {
                deleteSaved(video)
            }
        } else {
            localStorage.setItem('saved', d === null ? JSON.stringify([video]) : JSON.stringify([...d, video]))
            setSaved(JSON.parse(localStorage.getItem("saved")))
            setCount(count + 1)
        }
    }

    return (
        <MyContext.Provider value={{ count, saveVid, saved }}>
            {children}
        </MyContext.Provider>
    )
}

export default Contexts;