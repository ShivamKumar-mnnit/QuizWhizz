import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./home.scss";
import useFetch from "../../../../hooks/fetch.hook";



const Home = () => {
  const [{ isLoading, apiData, serverError }] = useFetch();

  if (isLoading) {
    return <h1 className='text-2xl font-bold'>Loading...</h1>;
  }

  if (serverError) {
    return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;
  }
  return (
    <div className="home">
      <>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="customer" />
            <Widget type="order" />
            <Widget type="earnings" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Quizes</div>
            <List />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
