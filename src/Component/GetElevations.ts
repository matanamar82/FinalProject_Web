

const getElevations = async (Points:string[]) => {
    let pointsToApiFormat = Points.join('');
    try {
        const response = await fetch(`http://localhost:5000/api/${pointsToApiFormat}`);
        const data = await response.json();
    
        if (data.data && data.data.status === "OK") {
          return data.data.results;
        } 
        else 
        {
          console.log("Error");
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
}

export default getElevations;