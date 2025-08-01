import axios from "axios";

export async function gettags()
{
  try {
    const response = await axios.get('https://edtech-l9b9.onrender.com/api/alltags');
    // console.log(response.data.alltagdata);
    return response.data.alltagdata;
  } catch (error) {
    console.error('Error fetching users:', error);
  } 
}