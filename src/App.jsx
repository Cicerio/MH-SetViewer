import { useState } from 'react'
import LoadBuild from './components/LoadBuild'
import './styles.css'

LoadBuild();
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
        <div className="left-column">
            <div className="heading">Skills</div>
            <div className="skills-display">
            </div>
        </div>
        <div className="middle-column">
            <div className="equipWeap">
                <div className="icon"></div>
                <div className="stats">
                    <div className="name"></div>
                    <div className="weapon-stats">
                        <div className="stat-attack">
                            <img src="icons/Stats/attack.png" alt="atkIcon"></img>
                            <div className="attack-num"></div>
                        </div>
                        <div className="stat-affinity">
                            <img src="icons/Stats/affinity.png" alt="affIcon"></img>
                            <div className="affinity-num"></div>
                        </div>
                        <div className="stat-element">
                            <div className="element-num"></div>
                        </div>
                    </div>
                </div>
                <div className="decos">
                </div>
            </div>
            <div className="head">
                <div className="icon"></div>
                <div className="skills">
                    <div className="name"></div>
                    <div className="skills-list"></div>
                </div>
                <div className="decos"></div>
            </div>
            <div className="chest">
                <div className="icon"></div>
                <div className="skills">
                    <div className="name"></div>
                    <div className="skills-list"></div>
                </div>
                <div className="decos"></div>
            </div>
            <div className="arms">
                <div className="icon"></div>
                <div className="skills">
                    <div className="name"></div>
                    <div className="skills-list"></div>
                </div>
                <div className="decos"></div>
            </div>
            <div className="waist">
                <div className="icon"></div>
                <div className="skills">
                    <div className="name"></div>
                    <div className="skills-list"></div>
                </div>
                <div className="decos"></div>
            </div>
            <div className="legs">
                <div className="icon"></div>
                <div className="skills">
                    <div className="name"></div>
                    <div className="skills-list"></div>
                </div>
                <div className="decos"></div>
            </div>
            <div className="talisman">
                <div className="icon"></div>
                <div className="skills">
                    <div className="name"></div>
                    <div className="skills-list"></div>
                </div>
                <div className="decos">
                    <div className="decoSlot1"></div>
                    <div className="decoSlot2"></div>
                    <div className="decoSlot3"></div>
                </div>
            </div>
            <div className="padding">Monster Hunter Rise Build Viewer <img src="icons/mhr_icon_by_msx2p_df84isv-375w-2x.png" alt="MHR-Icon by msx2p"></img></div>
        </div>
        <div className="right-column">
            <div className="right-column-top">
                <div className="heading">Sharpness</div>
            </div>
            <div className="right-column-bottom">
                <div className="heading">Stats</div>
                <div className="statblock"></div>
            </div>
        </div>
    </div>
  )
}

export default App
