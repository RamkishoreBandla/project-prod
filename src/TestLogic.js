// Provided data
// const axios = require('axios');
// const cheerio = require('cheerio');
import axios from 'axios';
import cheerio from 'cheerio';


// callAPI({edges,start,end});

export const callHealth=async({edges,start,end})=>{

    try {

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