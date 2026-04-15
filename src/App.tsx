import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import styled from 'styled-components'

import RamenSearch from './RamenSearch.tsx';


//create a styled component here
const HeroSection = styled.div`
  width: 100vw;
  height: 20vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

const TopRankedRamen = styled.div`
  height: 120vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const TopRankedRamenItem = styled.div`
  width: 90%;
  height: 100px;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 1rem 0;
  border-radius: 8px;
`;

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

      <HeroSection>
        Noodle Rank
      </HeroSection>

      <RamenSearch/>

      <TopRankedRamen>

        <TopRankedRamenItem>
          1. Ichiran Ramen
        </TopRankedRamenItem>

        <TopRankedRamenItem>
          2. Ippudo Ramen
        </TopRankedRamenItem>

        <TopRankedRamenItem>
          3. Ramen Nagi
        </TopRankedRamenItem>
        
      </TopRankedRamen>
        

      {/* <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button> */}

      

    </>
  )
}

export default App
