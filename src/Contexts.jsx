import React, { createContext, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { collection, getFirestore, onSnapshot } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

export const MyContext = createContext()
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

function Contexts({ children }) {
    const [saved, setSaved] = useState([])
    const [count, setCount] = useState(0)
    const [firebaseVideos, setFirebaseVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    // firebase videos file
    useEffect(() => {
        setFirebaseVideos([])
        onSnapshot(collection(db, '/general'), (querySnapshot) => {
            const d = []
            querySnapshot.forEach((doc) => {
                d.push({...doc.data(),id:doc.id})
                setLoading(false)
            });
            setFirebaseVideos(d)
            setLoading(false)
        });
    }, []);


    useEffect(() => {
        var savedVideosOnLocalStorage = JSON.parse(localStorage.getItem('saved'));
        if (!savedVideosOnLocalStorage) {
            savedVideosOnLocalStorage = [];
        }
        setSaved(savedVideosOnLocalStorage)
        setCount(savedVideosOnLocalStorage?.length)
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
        <MyContext.Provider value={{ count, saveVid, saved, firebaseVideos, loading, setLoading, error, setError }}>
            {children}
        </MyContext.Provider>
    )
}

export default Contexts;