import React, { useEffect, useState } from 'react';
import Package from './components/Package';
import Pagination from './components/Pagination';
function App() {

  const [packagesList, setPackageList] = useState([])
  const [countPackage, setcountPackage] = useState()
  const [getToken, setgetToken] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(4)
  const [loading, setLoading] = useState(true)
  const [pageActive, setpageActive] = useState(false)


  useEffect(() => {
    const graphsql_query = `
    {
      getPackages(
        pagination: {
          skip: 0
          limit: 10
        }
      )
      {
        statusCode
        message
        result {
          count
          packages {
            uid
            title
            startingPrice
            thumbnail
            amenities {
              title
              icon
            }
            discount {
              title
              amount
            }
            durationText
            loyaltyPointText
            description
          }
        }
      }
    }`
    
      const token_query = `
    mutation {
      loginClient (
        auth: {
          email: "devteam@saimonglobal.com"
          deviceUuid: "7026a238-d078-48b5-862b-c3c7d21d8712"
        }
        password: "12345678"
      )
      {
        message
        statusCode
        result {
          token
          refreshToken
          expiresAt
        }
      }
    }`
  //End Authorization
  // package List
    
    // Authorization 
    fetch(`https://b2c-api.flightlocal.com/graphql`, {
      "method": "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: token_query })
    }).then(response => response.json())
      .then((data) => {
        setgetToken(data.data.loginClient.result.token)
      })
      .catch((err) => {
        console.log(err)
      })
   fetch(`https://b2c-api.flightlocal.com/graphql`, {
      "method": "POST",
      headers: { "Content-Type": "application/json", "Authorization" : "Bearer "+getToken},
      body: JSON.stringify({ query: graphsql_query })
    }).then(response => response.json())
      .then((data) => {
        setPackageList(data.data.getPackages.result.packages)
        setcountPackage(data.data.getPackages.result.count)
        setLoading(false)
        
      })
      .catch((err) => {
        console.log(err)
      })
    // End Package List
  
  },[getToken])
 const indexOfLastPackage = currentPage*postPerPage;
 const indexOfFirstPackage = indexOfLastPackage-postPerPage;
 const currentPackage = packagesList.slice(indexOfFirstPackage,indexOfLastPackage);

 const paginate = ((pageno) =>{
   setCurrentPage(pageno)
   setpageActive(true);

 })
  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-light bg-light header">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" rel="noopener noreferrer"><span className="bold">FLIGHT</span>LOCAL</a>
        </div>
      </nav>
      <main>
        <h1 className="totalpackage">{countPackage}{countPackage >= 1 ? "Available Holidays" : "Available Holiday"}</h1>
        <Package packagesList={currentPackage} loading={loading}></Package>
        <Pagination postPerPage={postPerPage} totalPost={packagesList.length} paginate={paginate} active={pageActive}></Pagination>
      </main>
    </div>
  );
}

export default App;