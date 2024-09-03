import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('https://localhost:7161/api/Ticket');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data', error);
    }
};

useEffect(() => {
    fetchData();
}, []);
