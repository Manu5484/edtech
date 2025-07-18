import axios from "axios";

export async function gettags()
{
  try {
    const response = await axios.get('http://localhost:4000/api/alltags');
    // console.log(response.data.alltagdata);
    return response.data.alltagdata;
  } catch (error) {
    console.error('Error fetching users:', error);
  } 
}