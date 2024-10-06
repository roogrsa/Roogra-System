import React from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import LastNews from '../../components/lastnews/LastNews';

const Home = () => {
  return (
    <>
      <div className="flex">
        <ChartThree /> <ChartThree />
      </div>
      <div>
        <LastNews />
      </div>
    </>
  );
};

export default Home;
