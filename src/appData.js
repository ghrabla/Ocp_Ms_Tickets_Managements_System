import axios from "axios";


export const rowData = async () => {
        try {
          const response = await axios.get("https://localhost:7161/api/Ticket");
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
