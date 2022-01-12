import React,{useEffect} from 'react'
import { getNotification } from '../../../Services/graphqlServices'

const Notifications = ({ props }) => {

    useEffect(() => {
        setInterval(() => {
            getNoti()
        }, 20000);
    }, [])

    const getNoti = async () => {
        let body = {
            query: `query:`
        }
        let res = await getNotification(props.token, body)
        console.log(res);
    }
    
const arr=[1,2,3]
    return (
        <div className="card" style={{ height: 270 }}>
            <div className="card-body">
                <h5 className="card-title">Notice</h5>
                <div style={{ overflow: 'auto', height: 200, paddingBottom: '20px', paddingTop: '20px' }}>
                    {arr.map((x, idx) => <div className="card" style={{ backgroundColor: "#f9f9f9f9" }} key={idx}>
                        <div className="card-body text-center">
                            <h4 className="holiday-title mb-0">
                                {`abcdef${idx}`}
                            </h4>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Notifications



