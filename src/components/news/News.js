import React, { useEffect, useState } from "react";
import "./News.css";
import Sidebar from "../Sidebar";

const News = () => {
  const [mynews, setMynews] = useState([]);
  const [myfilteredNews, setMyFilteredNews] = useState([]);
  const isToday = (date) => {
    const today = new Date();
    const givenDate = new Date(date);
    console.log(today, givenDate);
    console.log(mynews);
    return (
      givenDate.getDate() === today.getDate() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getFullYear() === today.getFullYear()
      // mynews.publishedAt == today ? true :false
    );
  };  

  const isYesterday = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const givenDate = new Date(date);
    return (
      givenDate.getDate() === yesterday.getDate() &&
      givenDate.getMonth() === yesterday.getMonth() &&
      givenDate.getFullYear() === yesterday.getFullYear()
      // mynews.publishedAt == yesterday ? true :false
    );  
  };

  const formatDateTime = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    const givenDate = new Date(date);
    return givenDate.toLocaleString(undefined, options);
  };

  // const formatDateTime = (date) => {
  //   const options = { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric', 
  //     hour: '2-digit', 
  //     minute: '2-digit' 
  //   };
  //   const givenDate = new Date(date);
  //    // Subtract one day
  //    givenDate.setDate(givenDate.getDate() - 1);
  //    return givenDate.toLocaleString(undefined, options);
  //  }
 
  

   
  const fetchData = async () => {
    try {
      let response = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4dfcf98ba3254f54a277a40e24a448ca"
      );
      let data = await response.json();
      setMynews(data.articles);
      setMyFilteredNews(data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="MainDiv">
        <div style={{ marginLeft: "52rem", gap: "16px" }}>
          <div className="container-fluid">
            <div className="row">
              <nav className="col-md-3 col-lg-2 d-md-block sidebar">
                <div className="position-sticky">
                  <div className="p-4">
                    <ul className="nav flex-column mb-2">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Home
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                          onClick={() =>
                            setMyFilteredNews(
                              mynews.filter((news) => isToday(news.publishedAt))
                            )
                          }
                        >
                          Today
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#"
                          onClick={() => {
                            setMyFilteredNews(
                              mynews.filter((news) =>
                                isYesterday(news.publishedAt)
                              )
                            );
                          }}
                        >
                          Yesterday
                        </a>
                      </li>
                    </ul>

                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        {myfilteredNews.map((ele, index) => {
          //   console.log(ele);
          return (
            <div
              key={index}
              className="card"
              style={{
                width: "300px",
                height: "400px",
                marginLeft: "4rem",
                marginBottom: "4rem",
              }}
            >
              <img
                src={
                  ele.urlToImage == null
                    ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W454PRU3DBC4DA4HJARYSFOJIQ.png&w=1440:"
                    : ele.urlToImage
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{ele.author}</h5>
                <p className="card-text">{ele.title}</p>
                <p className="card-text">{formatDateTime(ele.publishedAt)}</p>
                <a href={ele.url} target="_blank" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          );
        })}{" "}
      </div>

      <Sidebar />
    </>
  );
};

export default News;
