import { useEffect, useState } from 'react'
import readFromFirestore from '../Firebase/ReadUser'

export default function Results({ user }) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getResult = async () => {
            const resultDoc = await readFromFirestore(user.email);
            setResult(resultDoc);
            setLoading(false);
        }
        getResult();
    }, []);
   
    const formatData = (resultDoc) => {
        if(resultDoc.result == "not_published"){
            return `Hello ${result.personalData.name} Results are not published yet`;
        }
        else if(resultDoc.result == "selected"){
            return `Hello ${result.personalData.name} You are selected for ${result.selectedDepartments.join(', ')} department(s)`;
        }
        else if(resultDoc.result == "rejected"){
            return `Hello ${result.personalData.name} You are not selected this time but you can try next time :)`;
        }
    }
    
    return (
        <div>
            {loading ? <div>Loading...</div> : <div>{result.error ? result.error : formatData(result)}</div>}
        </div>
    )
}