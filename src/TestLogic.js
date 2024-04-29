// Provided data
// const axios = require('axios');
// const cheerio = require('cheerio');
import axios from 'axios';
import cheerio from 'cheerio';

export const callAPI = async ({ edges, start, end }) => {
    try {



        let encstring = ''
        for (let edge of edges) {
            console.log(edge);
            encstring += edge[0] + '+' + edge[1] + '%0D%0A'
        }
        const apiUrl = `https://cors-anywhere.herokuapp.com/https://cs.gmu.edu:8443/offutt/coverage/GraphCoverage?edges=${encstring}&initialNode=${start}&endNode=${end}&algorithm2=Edge-Pair%20Coverage`;
        console.log(apiUrl, "api url");
        let data = await axios.post(apiUrl)
        // console.log(data);
        let htmlResponse = data.data;

        const $ = cheerio.load(htmlResponse);

        // Search for the table containing test paths
        let testPathsTable = null;
        $('table').each((index, element) => {
            const tdContents = $(element).find('td').map((i, el) => $(el).text()).get();
            if (tdContents.includes('Test Paths')) {
                testPathsTable = element;
                return false; // Stop iteration once the table is found
            }
        });

        // Extract arrays from the first column of the test paths table
        const arrays = [];
        if (testPathsTable) {
            const rows = $(testPathsTable).find('tr');
            rows.each((rowIndex, rowElement) => {
                const array = $(rowElement).find('td:first-of-type').text();
                arrays.push(array);
            });
        }

        console.log(arrays);
        let finalRes = []
        for (let ea of arrays) {
            if (ea.startsWith('[')) {
                finalRes.push(ea)
            }
        }
        finalRes = Array.from(new Set(finalRes));
        console.log(finalRes);
        const Finalarray = finalRes.map(e => JSON.parse(e.replace(/'/g, '"')));
        console.log(Finalarray);

        return Finalarray;
    }
    catch (e) {
        console.log(e);
        return []
    }
}
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