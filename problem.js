function developProperties(timeUnit) {
    let maxTheatres = Math.floor(timeUnit / 5); // Maximum number of Theatres that can be built
    let maxPubs = Math.floor(timeUnit / 4); // Maximum number of Pubs that can be built
    let maxParks = Math.floor(timeUnit / 10); // Maximum number of Commercial Parks that can be built
  
    let earnings = 0;
    let solution = "";
  
    for (let numTheatres = maxTheatres; numTheatres >= 0; numTheatres--) {
      for (let numPubs = maxPubs; numPubs >= 0; numPubs--) {
        for (let numParks = maxParks; numParks >= 0; numParks--) {
          let totalUnits =
            numTheatres * 5 + numPubs * 4 + numParks * 10;
  
          if (totalUnits === timeUnit) {
            let totalEarnings =
              numTheatres * 1500 + numPubs * 1000 + numParks * 3000;
  
            if (totalEarnings > earnings) {
              earnings = totalEarnings;
              solution = `T: ${numTheatres} P: ${numPubs} C: ${numParks}`;
            }
          }
        }
      }
    }
  
    return `Time Unit: ${timeUnit}\nEarnings: $${earnings}\nSolutions\n${solution}`;
  }
  
  // Test cases
  console.log(developProperties(7));
  console.log(developProperties(8));
  console.log(developProperties(13));