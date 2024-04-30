
import axios from 'axios';
export const callHealth=async({edges,start,end})=>{

    try {
        // import axios from 'axios';

        // const axios=require('axios')
        let obj={
            edges,
            start,
            end
        }
        let apidata= await axios.post("https://server-xo0a.onrender.com/proxy",obj);
        return apidata.data.ep;
    } catch (error) {
        console.log(error);
        return []
    }

}