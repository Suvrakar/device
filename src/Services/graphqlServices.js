import axios from "axios";

export const axiql = axios.create({
    baseURL: `https://hivehrms-api.hivecorelimited.com`
  });


export const setReadNotification=async(token,id)=>{

    const body={
        query:`mutation {
            setReadNotification(id:${id},isRead:true){
              ok
              
            }
           
          }`
    }
    try {
        let res = await axiql.post("/graphql",body,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
        return res.data
    } catch (error) {
        return {error}
    }

}