import './css/builderApp.css'
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
export default function BuilderApp() {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setSelectedTab(2);
      } else {
        setSelectedTab(0);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isEquipmentSelected = selectedTab >= 0;
  const isStatsSelected = selectedTab >= 1;
  const isSkillsSelected = selectedTab >= 2;

  return (
    <main className='container'>
      <div className='tab-container'>
        <div className={`tab ${selectedTab >= 0 ? 'selected' : ''}`}>Equipment</div>
        <div className={`tab ${selectedTab >= 1 ? 'selected' : ''}`}>Stats</div>
        <div className={`tab ${selectedTab >= 2 ? 'selected' : ''}`}>Skills</div>
      </div>
      {isEquipmentSelected && (
        <section className='gear-container'>
          gear
        </section>
      )}
      {isStatsSelected && (
        <section className='stats-container'>
          <div className='container' >
            <h4>Attack</h4>
            <div>
              <ul className='attack-stats striped'>
                {/* maybe have these blocks be their own components */}
              </ul>
            </div>
            <br />
            <h4>Defense</h4>
            <div></div>
            <br />
          </div>
          {isSkillsSelected && (
            <section className='skills-container'>
              <div className='container' >
                <br />
                <h4>
                  Skills 
                </h4>
              </div>
            </section>
          )}
        </section>
      )}
    </main>
  );
}
