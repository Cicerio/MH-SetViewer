import { useState } from "react";

function WeaponBlock() {
  let jsonStructure = {
    'W_ChargeAxe_000': {
      weaponID: '08B00000',
      enumName: 'W_ChargeAxe_000',
      modelID: '08B00004',
      modelName: 'C_Axe018',
      sortID: '59',
      weaponName: 'Hyperguard I'
    }
  };

  return (
    <>
      <table role="table">
        <thead>
          <tr>
            <th>Weapon ID</th>
            <th>Enum Name</th>
            <th>Model ID</th>
            <th>Model Name</th>
            <th>Sort ID</th>
            <th>Weapon Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>08B00000</td>
            <td>W_ChargeAxe_000</td>
            <td>08B00004</td>
            <td>C_Axe018</td>
            <td>59</td>
            <td>Hyperguard I</td>
          </tr>
          <tr>
            <td>08B00001</td>
            <td>W_ChargeAxe_001</td>
            <td>08B00004</td>
            <td>C_Axe018</td>
            <td>60</td>
            <td>Hyperguard II</td>
          </tr>
          <tr>
            <td>08B00002</td>
            <td>W_ChargeAxe_002</td>
            <td>08B00004</td>
            <td>C_Axe018</td>
            <td>61</td>
            <td>Regas Hyper</td>
          </tr>
          <tr>
            <td>08B00003</td>
            <td>W_ChargeAxe_003</td>
            <td>08B00012</td>
            <td>C_Axe059</td>
            <td>62</td>
            <td>Elite Blade I</td>
          </tr>
          <tr>
            <td>08B00004</td>
            <td>W_ChargeAxe_004</td>
            <td>08B00012</td>
            <td>C_Axe059</td>
            <td>63</td>
            <td>Elite Blade II</td>
          </tr>
          <tr>
            <td>08B00005</td>
            <td>W_ChargeAxe_005</td>
            <td>08B00012</td>
            <td>C_Axe059</td>
            <td>64</td>
            <td>Kaiser Blade</td>
          </tr>
          <tr>
            <td>08B00006</td>
            <td>W_ChargeAxe_006</td>
            <td>08B00013</td>
            <td>C_Axe060</td>
            <td>71</td>
            <td>K. Captain's Blade I</td>
          </tr>
          <tr>
            <td>08B00007</td>
            <td>W_ChargeAxe_007</td>
            <td>08B00013</td>
            <td>C_Axe060</td>
            <td>72</td>
            <td>K. Captain's Blade II</td>
          </tr>
          <tr>
            <td>08B00008</td>
            <td>W_ChargeAxe_008</td>
            <td>08B00013</td>
            <td>C_Axe060</td>
            <td>73</td>
            <td>Die Walküre</td>
          </tr>
          <tr>
            <td>08B00009</td>
            <td>W_ChargeAxe_009</td>
            <td>08B00006</td>
            <td>C_Axe021</td>
            <td>123</td>
            <td>Bone Blade I</td>
          </tr>
          <tr>
            <td>08B0000A</td>
            <td>W_ChargeAxe_010</td>
            <td>08B00006</td>
            <td>C_Axe021</td>
            <td>124</td>
            <td>Bone Blade II</td>
          </tr>
          <tr>
            <td>08B0000B</td>
            <td>W_ChargeAxe_011</td>
            <td>08B00006</td>
            <td>C_Axe021</td>
            <td>125</td>
            <td>Bonesilt Veil</td>
          </tr>
          <tr>
            <td>08B0000C</td>
            <td>W_ChargeAxe_012</td>
            <td>08B00005</td>
            <td>C_Axe020</td>
            <td>120</td>
            <td>Bone Strongarm I</td>
          </tr>
          <tr>
            <td>08B0000D</td>
            <td>W_ChargeAxe_013</td>
            <td>08B00005</td>
            <td>C_Axe020</td>
            <td>121</td>
            <td>Bone Strongarm II</td>
          </tr>
          <tr>
            <td>08B0000E</td>
            <td>W_ChargeAxe_014</td>
            <td>08B00005</td>
            <td>C_Axe020</td>
            <td>122</td>
            <td>Hard Bone Strongarm</td>
          </tr>
          <tr>
            <td>08B0000F</td>
            <td>W_ChargeAxe_015</td>
            <td>08B00014</td>
            <td>C_Axe061</td>
            <td>156</td>
            <td>Poisonous Veil I</td>
          </tr>
          <tr>
            <td>08B00010</td>
            <td>W_ChargeAxe_016</td>
            <td>08B00014</td>
            <td>C_Axe061</td>
            <td>157</td>
            <td>Poisonous Veil II</td>
          </tr>
          <tr>
            <td>08B00011</td>
            <td>W_ChargeAxe_017</td>
            <td>08B00014</td>
            <td>C_Axe061</td>
            <td>158</td>
            <td>Infected Veil</td>
          </tr>
          <tr>
            <td>08B00012</td>
            <td>W_ChargeAxe_018</td>
            <td>08B00015</td>
            <td>C_Axe062</td>
            <td>162</td>
            <td>Dragon Veil I</td>
          </tr>
          <tr>
            <td>08B00013</td>
            <td>W_ChargeAxe_019</td>
            <td>08B00015</td>
            <td>C_Axe062</td>
            <td>163</td>
            <td>Dragon Veil II</td>
          </tr>
          <tr>
            <td>08B00014</td>
            <td>W_ChargeAxe_020</td>
            <td>08B00015</td>
            <td>C_Axe062</td>
            <td>164</td>
            <td>Dragonsong</td>
          </tr>
          <tr>
            <td>08B00015</td>
            <td>W_ChargeAxe_021</td>
            <td>08B00009</td>
            <td>C_Axe050</td>
            <td>6</td>
            <td>Kamura C. Blade I</td>
          </tr>
          <tr>
            <td>08B00016</td>
            <td>W_ChargeAxe_022</td>
            <td>08B00009</td>
            <td>C_Axe050</td>
            <td>7</td>
            <td>Kamura C. Blade II</td>
          </tr>
          <tr>
            <td>08B00017</td>
            <td>W_ChargeAxe_023</td>
            <td>08B00009</td>
            <td>C_Axe050</td>
            <td>8</td>
            <td>Kamura C. Blade III</td>
          </tr>
          <tr>
            <td>08B00018</td>
            <td>W_ChargeAxe_024</td>
            <td>08B00009</td>
            <td>C_Axe050</td>
            <td>9</td>
            <td>Kamura C. Blade IV</td>
          </tr>
          <tr>
            <td>08B00019</td>
            <td>W_ChargeAxe_025</td>
            <td>08B00009</td>
            <td>C_Axe050</td>
            <td>10</td>
            <td>Kamura C. Blade V</td>
          </tr>
          <tr>
            <td>08B0001A</td>
            <td>W_ChargeAxe_026</td>
            <td>08B00009</td>
            <td>C_Axe050</td>
            <td>11</td>
            <td>Kamura Ninja C. Blade</td>
          </tr>
          <tr>
            <td>08B0001B</td>
            <td>W_ChargeAxe_027</td>
            <td>08B00026</td>
            <td>C_Axe081</td>
            <td>255</td>
            <td>Rampage C. Blade I</td>
          </tr>
          <tr>
            <td>08B0001C</td>
            <td>W_ChargeAxe_028</td>
            <td>08B00026</td>
            <td>C_Axe081</td>
            <td>256</td>
            <td>Rampage C. Blade II</td>
          </tr>
          <tr>
            <td>08B0001D</td>
            <td>W_ChargeAxe_029</td>
            <td>08B00026</td>
            <td>C_Axe081</td>
            <td>257</td>
            <td>Rampage C. Blade III</td>
          </tr>
          <tr>
            <td>08B0001E</td>
            <td>W_ChargeAxe_030</td>
            <td>08B00026</td>
            <td>C_Axe081</td>
            <td>260</td>
            <td>Rampage C. Blade S</td>
          </tr>
          <tr>
            <td>08B0001F</td>
            <td>W_ChargeAxe_031</td>
            <td>08B00025</td>
            <td>C_Axe080</td>
            <td>232</td>
            <td>Ricebane I</td>
          </tr>
          <tr>
            <td>08B00020</td>
            <td>W_ChargeAxe_032</td>
            <td>08B00025</td>
            <td>C_Axe080</td>
            <td>233</td>
            <td>Ricebane II</td>
          </tr>
          <tr>
            <td>08B00021</td>
            <td>W_ChargeAxe_033</td>
            <td>08B00025</td>
            <td>C_Axe080</td>
            <td>234</td>
            <td>Pounder of Rice</td>
          </tr>
          <tr>
            <td>08B00022</td>
            <td>W_ChargeAxe_034</td>
            <td>08B00018</td>
            <td>C_Axe065</td>
            <td>237</td>
            <td>Cuddly Cat I</td>
          </tr>
          <tr>
            <td>08B00023</td>
            <td>W_ChargeAxe_035</td>
            <td>08B00018</td>
            <td>C_Axe065</td>
            <td>238</td>
            <td>Cuddly Cat II</td>
          </tr>
          <tr>
            <td>08B00024</td>
            <td>W_ChargeAxe_036</td>
            <td>08B00018</td>
            <td>C_Axe065</td>
            <td>239</td>
            <td>Felyne Fancy</td>
          </tr>
          <tr>
            <td>08B00025</td>
            <td>W_ChargeAxe_037</td>
            <td>08B00017</td>
            <td>C_Axe064</td>
            <td>242</td>
            <td>Mandible Blade I</td>
          </tr>
          <tr>
            <td>08B00026</td>
            <td>W_ChargeAxe_038</td>
            <td>08B00017</td>
            <td>C_Axe064</td>
            <td>243</td>
            <td>Mandible Blade II</td>
          </tr>
          <tr>
            <td>08B00027</td>
            <td>W_ChargeAxe_039</td>
            <td>08B00017</td>
            <td>C_Axe064</td>
            <td>244</td>
            <td>Maxilla Edge</td>
          </tr>
          <tr>
            <td>08B00028</td>
            <td>W_ChargeAxe_040</td>
            <td>08B00016</td>
            <td>C_Axe063</td>
            <td>247</td>
            <td>Vaik Veil I</td>
          </tr>
          <tr>
            <td>08B00029</td>
            <td>W_ChargeAxe_041</td>
            <td>08B00016</td>
            <td>C_Axe063</td>
            <td>248</td>
            <td>Vaik Veil II</td>
          </tr>
          <tr>
            <td>08B0002A</td>
            <td>W_ChargeAxe_042</td>
            <td>08B00016</td>
            <td>C_Axe063</td>
            <td>249</td>
            <td>Shieldraad</td>
          </tr>
          <tr>
            <td>08B0002B</td>
            <td>W_ChargeAxe_043</td>
            <td>08B0000A</td>
            <td>C_Axe051</td>
            <td>108</td>
            <td>Wind Thief Sickle I</td>
          </tr>
          <tr>
            <td>08B0002C</td>
            <td>W_ChargeAxe_044</td>
            <td>08B0000A</td>
            <td>C_Axe051</td>
            <td>109</td>
            <td>Wind Thief Sickle II</td>
          </tr>
          <tr>
            <td>08B0002D</td>
            <td>W_ChargeAxe_045</td>
            <td>08B0000A</td>
            <td>C_Axe051</td>
            <td>110</td>
            <td>Gale Sickle</td>
          </tr>
          <tr>
            <td>08B0002E</td>
            <td>W_ChargeAxe_046</td>
            <td>08B0000B</td>
            <td>C_Axe052</td>
            <td>41</td>
            <td>Shovedown Blade I</td>
          </tr>
          <tr>
            <td>08B0002F</td>
            <td>W_ChargeAxe_047</td>
            <td>08B0000B</td>
            <td>C_Axe052</td>
            <td>42</td>
            <td>Shovedown Blade II</td>
          </tr>
          <tr>
            <td>08B00030</td>
            <td>W_ChargeAxe_048</td>
            <td>08B0000B</td>
            <td>C_Axe052</td>
            <td>43</td>
            <td>Spinning Takedown</td>
          </tr>
          <tr>
            <td>08B00031</td>
            <td>W_ChargeAxe_049</td>
            <td>08B0000C</td>
            <td>C_Axe053</td>
            <td>147</td>
            <td>Bellowing Blow I</td>
          </tr>
          <tr>
            <td>08B00032</td>
            <td>W_ChargeAxe_050</td>
            <td>08B0000C</td>
            <td>C_Axe053</td>
            <td>148</td>
            <td>Bellowing Blow II</td>
          </tr>
          <tr>
            <td>08B00033</td>
            <td>W_ChargeAxe_051</td>
            <td>08B0000C</td>
            <td>C_Axe053</td>
            <td>149</td>
            <td>Illusory Frilled Wail</td>
          </tr>
          <tr>
            <td>08B00034</td>
            <td>W_ChargeAxe_052</td>
            <td>08B0000D</td>
            <td>C_Axe054</td>
            <td>189</td>
            <td>Sinister Slasher I</td>
          </tr>
          <tr>
            <td>08B00035</td>
            <td>W_ChargeAxe_053</td>
            <td>08B0000D</td>
            <td>C_Axe054</td>
            <td>190</td>
            <td>Sinister Slasher II</td>
          </tr>
          <tr>
            <td>08B00036</td>
            <td>W_ChargeAxe_054</td>
            <td>08B0000D</td>
            <td>C_Axe054</td>
            <td>191</td>
            <td>Sinister Shade Axe</td>
          </tr>
          <tr>
            <td>08B00037</td>
            <td>W_ChargeAxe_055</td>
            <td>08B0000E</td>
            <td>C_Axe055</td>
            <td>53</td>
            <td>Surprise Axe I</td>
          </tr>
          <tr>
            <td>08B00038</td>
            <td>W_ChargeAxe_056</td>
            <td>08B0000E</td>
            <td>C_Axe055</td>
            <td>54</td>
            <td>Surprise Axe II</td>
          </tr>
          <tr>
            <td>08B00039</td>
            <td>W_ChargeAxe_057</td>
            <td>08B0000E</td>
            <td>C_Axe055</td>
            <td>55</td>
            <td>Stunning Axe</td>
          </tr>
          <tr>
            <td>08B0003A</td>
            <td>W_ChargeAxe_058</td>
            <td>08B0000F</td>
            <td>C_Axe056</td>
            <td>80</td>
            <td>Biting Edge I</td>
          </tr>
          <tr>
            <td>08B0003B</td>
            <td>W_ChargeAxe_059</td>
            <td>08B0000F</td>
            <td>C_Axe056</td>
            <td>81</td>
            <td>Biting Edge II</td>
          </tr>
          <tr>
            <td>08B0003C</td>
            <td>W_ChargeAxe_060</td>
            <td>08B0000F</td>
            <td>C_Axe056</td>
            <td>82</td>
            <td>Araknablade</td>
          </tr>
          <tr>
            <td>08B0003D</td>
            <td>W_ChargeAxe_061</td>
            <td>08B00010</td>
            <td>C_Axe057</td>
            <td>207</td>
            <td>Azure Elder Blade I</td>
          </tr>
          <tr>
            <td>08B0003E</td>
            <td>W_ChargeAxe_062</td>
            <td>08B00010</td>
            <td>C_Axe057</td>
            <td>208</td>
            <td>Azure Elder Blade II</td>
          </tr>
          <tr>
            <td>08B0003F</td>
            <td>W_ChargeAxe_063</td>
            <td>08B00010</td>
            <td>C_Axe057</td>
            <td>209</td>
            <td>Abyssal Gale Ward</td>
          </tr>
          <tr>
            <td>08B00040</td>
            <td>W_ChargeAxe_064</td>
            <td>08B00011</td>
            <td>C_Axe058</td>
            <td>211</td>
            <td>Thunderbolt Sawtooth I</td>
          </tr>
          <tr>
            <td>08B00041</td>
            <td>W_ChargeAxe_065</td>
            <td>08B00011</td>
            <td>C_Axe058</td>
            <td>212</td>
            <td>Abyssal Storm Ward</td>
          </tr>
          <tr>
            <td>08B00042</td>
            <td>W_ChargeAxe_066</td>
            <td>08B00023</td>
            <td>C_Axe077</td>
            <td>226</td>
            <td>Redwing Edge I</td>
          </tr>
          <tr>
            <td>08B00043</td>
            <td>W_ChargeAxe_067</td>
            <td>08B00023</td>
            <td>C_Axe077</td>
            <td>227</td>
            <td>Skaltecore</td>
          </tr>
          <tr>
            <td>08B00044</td>
            <td>W_ChargeAxe_068</td>
            <td>08B00019</td>
            <td>C_Axe066</td>
            <td>168</td>
            <td>Barroth Anchor I</td>
          </tr>
          <tr>
            <td>08B00045</td>
            <td>W_ChargeAxe_069</td>
            <td>08B00019</td>
            <td>C_Axe066</td>
            <td>169</td>
            <td>Barroth Anchor II</td>
          </tr>
          <tr>
            <td>08B00046</td>
            <td>W_ChargeAxe_070</td>
            <td>08B00019</td>
            <td>C_Axe066</td>
            <td>170</td>
            <td>Rugged Anchor</td>
          </tr>
          <tr>
            <td>08B00047</td>
            <td>W_ChargeAxe_071</td>
            <td>08B0001A</td>
            <td>C_Axe067</td>
            <td>183</td>
            <td>Rough Roller I</td>
          </tr>
          <tr>
            <td>08B00048</td>
            <td>W_ChargeAxe_072</td>
            <td>08B0001A</td>
            <td>C_Axe067</td>
            <td>184</td>
            <td>Rough Roller II</td>
          </tr>
          <tr>
            <td>08B00049</td>
            <td>W_ChargeAxe_073</td>
            <td>08B0001A</td>
            <td>C_Axe067</td>
            <td>185</td>
            <td>Rotaxion</td>
          </tr>
          <tr>
            <td>08B0004A</td>
            <td>W_ChargeAxe_074</td>
            <td>08B00007</td>
            <td>C_Axe028</td>
            <td>135</td>
            <td>Jyura Silt I</td>
          </tr>
          <tr>
            <td>08B0004B</td>
            <td>W_ChargeAxe_075</td>
            <td>08B00007</td>
            <td>C_Axe028</td>
            <td>136</td>
            <td>Jyura Silt II</td>
          </tr>
          <tr>
            <td>08B0004C</td>
            <td>W_ChargeAxe_076</td>
            <td>08B00007</td>
            <td>C_Axe028</td>
            <td>137</td>
            <td>Clutch of the Deep</td>
          </tr>
          <tr>
            <td>08B0004D</td>
            <td>W_ChargeAxe_077</td>
            <td>08B0001B</td>
            <td>C_Axe068</td>
            <td>47</td>
            <td>Giga Grips I</td>
          </tr>
          <tr>
            <td>08B0004E</td>
            <td>W_ChargeAxe_078</td>
            <td>08B0001B</td>
            <td>C_Axe068</td>
            <td>48</td>
            <td>Giga Grips II</td>
          </tr>
          <tr>
            <td>08B0004F</td>
            <td>W_ChargeAxe_079</td>
            <td>08B0001B</td>
            <td>C_Axe068</td>
            <td>49</td>
            <td>Giga Grips III</td>
          </tr>
          <tr>
            <td>08B00050</td>
            <td>W_ChargeAxe_080</td>
            <td>08B0001B</td>
            <td>C_Axe068</td>
            <td>50</td>
            <td>Titan's Vise</td>
          </tr>
          <tr>
            <td>08B00051</td>
            <td>W_ChargeAxe_081</td>
            <td>08B00001</td>
            <td>C_Axe002</td>
            <td>18</td>
            <td>Dear Lutemis I</td>
          </tr>
          <tr>
            <td>08B00052</td>
            <td>W_ChargeAxe_082</td>
            <td>08B00001</td>
            <td>C_Axe002</td>
            <td>19</td>
            <td>Dear Lutemis II</td>
          </tr>
          <tr>
            <td>08B00053</td>
            <td>W_ChargeAxe_083</td>
            <td>08B00001</td>
            <td>C_Axe002</td>
            <td>20</td>
            <td>Dear Lutemia</td>
          </tr>
          <tr>
            <td>08B00054</td>
            <td>W_ChargeAxe_084</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>29</td>
            <td>Weissritter I</td>
          </tr>
          <tr>
            <td>08B00055</td>
            <td>W_ChargeAxe_085</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>30</td>
            <td>Weissritter II</td>
          </tr>
          <tr>
            <td>08B00056</td>
            <td>W_ChargeAxe_086</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>31</td>
            <td>Weissritter III</td>
          </tr>
          <tr>
            <td>08B00057</td>
            <td>W_ChargeAxe_087</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>32</td>
            <td>Pavadira</td>
          </tr>
          <tr>
            <td>08B00058</td>
            <td>W_ChargeAxe_088</td>
            <td>08B00008</td>
            <td>C_Axe029</td>
            <td>102</td>
            <td>Kadachi Slasher I</td>
          </tr>
          <tr>
            <td>08B00059</td>
            <td>W_ChargeAxe_089</td>
            <td>08B00008</td>
            <td>C_Axe029</td>
            <td>103</td>
            <td>Kadachi Slasher II</td>
          </tr>
          <tr>
            <td>08B0005A</td>
            <td>W_ChargeAxe_090</td>
            <td>08B00008</td>
            <td>C_Axe029</td>
            <td>104</td>
            <td>Kadachi Otenta</td>
          </tr>
          <tr>
            <td>08B0005B</td>
            <td>W_ChargeAxe_091</td>
            <td>08B0001C</td>
            <td>C_Axe070</td>
            <td>113</td>
            <td>Hidden Arsenal I</td>
          </tr>
          <tr>
            <td>08B0005C</td>
            <td>W_ChargeAxe_092</td>
            <td>08B0001C</td>
            <td>C_Axe070</td>
            <td>114</td>
            <td>Hidden Arsenal II</td>
          </tr>
          <tr>
            <td>08B0005D</td>
            <td>W_ChargeAxe_093</td>
            <td>08B0001C</td>
            <td>C_Axe070</td>
            <td>115</td>
            <td>Scream in the Night</td>
          </tr>
          <tr>
            <td>08B0005E</td>
            <td>W_ChargeAxe_094</td>
            <td>08B0001D</td>
            <td>C_Axe071</td>
            <td>95</td>
            <td>Mizuniya Drill I</td>
          </tr>
          <tr>
            <td>08B0005F</td>
            <td>W_ChargeAxe_095</td>
            <td>08B0001D</td>
            <td>C_Axe071</td>
            <td>96</td>
            <td>Mizuniya Drill II</td>
          </tr>
          <tr>
            <td>08B00060</td>
            <td>W_ChargeAxe_096</td>
            <td>08B0001D</td>
            <td>C_Axe071</td>
            <td>97</td>
            <td>Final Fieldblade</td>
          </tr>
          <tr>
            <td>08B00061</td>
            <td>W_ChargeAxe_097</td>
            <td>08B00002</td>
            <td>C_Axe003</td>
            <td>141</td>
            <td>Axelion Blade I</td>
          </tr>
          <tr>
            <td>08B00062</td>
            <td>W_ChargeAxe_098</td>
            <td>08B00002</td>
            <td>C_Axe003</td>
            <td>142</td>
            <td>Axelion Blade II</td>
          </tr>
          <tr>
            <td>08B00063</td>
            <td>W_ChargeAxe_099</td>
            <td>08B00002</td>
            <td>C_Axe003</td>
            <td>143</td>
            <td>Bardichion Blade</td>
          </tr>
          <tr>
            <td>08B00064</td>
            <td>W_ChargeAxe_100</td>
            <td>08B00024</td>
            <td>C_Axe079</td>
            <td>36</td>
            <td>Usurper's Lightning I</td>
          </tr>
          <tr>
            <td>08B00065</td>
            <td>W_ChargeAxe_101</td>
            <td>08B00024</td>
            <td>C_Axe079</td>
            <td>37</td>
            <td>Usurper's Lightning II</td>
          </tr>
          <tr>
            <td>08B00066</td>
            <td>W_ChargeAxe_102</td>
            <td>08B00024</td>
            <td>C_Axe079</td>
            <td>38</td>
            <td>Despot's Thundergale</td>
          </tr>
          <tr>
            <td>08B00067</td>
            <td>W_ChargeAxe_103</td>
            <td>08B0001E</td>
            <td>C_Axe072</td>
            <td>89</td>
            <td>Tigrex Divide I</td>
          </tr>
          <tr>
            <td>08B00068</td>
            <td>W_ChargeAxe_104</td>
            <td>08B0001E</td>
            <td>C_Axe072</td>
            <td>90</td>
            <td>Tigrex Divide II</td>
          </tr>
          <tr>
            <td>08B00069</td>
            <td>W_ChargeAxe_105</td>
            <td>08B0001E</td>
            <td>C_Axe072</td>
            <td>91</td>
            <td>Tigrex Blade</td>
          </tr>
          <tr>
            <td>08B0006A</td>
            <td>W_ChargeAxe_106</td>
            <td>08B0001F</td>
            <td>C_Axe073</td>
            <td>177</td>
            <td>Diablos Strongarm I</td>
          </tr>
          <tr>
            <td>08B0006B</td>
            <td>W_ChargeAxe_107</td>
            <td>08B0001F</td>
            <td>C_Axe073</td>
            <td>178</td>
            <td>Diablos Strongarm II</td>
          </tr>
          <tr>
            <td>08B0006C</td>
            <td>W_ChargeAxe_108</td>
            <td>08B0001F</td>
            <td>C_Axe073</td>
            <td>179</td>
            <td>Cera Strongarm</td>
          </tr>
          <tr>
            <td>08B0006D</td>
            <td>W_ChargeAxe_109</td>
            <td>08B00000</td>
            <td>C_Axe001</td>
            <td>214</td>
            <td>Daora's Casca I</td>
          </tr>
          <tr>
            <td>08B0006E</td>
            <td>W_ChargeAxe_110</td>
            <td>08B00000</td>
            <td>C_Axe001</td>
            <td>215</td>
            <td>Daora's Thwartoise</td>
          </tr>
          <tr>
            <td>08B0006F</td>
            <td>W_ChargeAxe_111</td>
            <td>08B00020</td>
            <td>C_Axe074</td>
            <td>218</td>
            <td>Teostra's Striker I</td>
          </tr>
          <tr>
            <td>08B00070</td>
            <td>W_ChargeAxe_112</td>
            <td>08B00020</td>
            <td>C_Axe074</td>
            <td>219</td>
            <td>Teostra's Nova</td>
          </tr>
          <tr>
            <td>08B00071</td>
            <td>W_ChargeAxe_113</td>
            <td>08B00021</td>
            <td>C_Axe075</td>
            <td>222</td>
            <td>Arcane Draw I</td>
          </tr>
          <tr>
            <td>08B00072</td>
            <td>W_ChargeAxe_114</td>
            <td>08B00021</td>
            <td>C_Axe075</td>
            <td>223</td>
            <td>Etherward</td>
          </tr>
          <tr>
            <td>08B00073</td>
            <td>W_ChargeAxe_115</td>
            <td>08B00022</td>
            <td>C_Axe076</td>
            <td>201</td>
            <td>Undying Blade I</td>
          </tr>
          <tr>
            <td>08B00074</td>
            <td>W_ChargeAxe_116</td>
            <td>08B00022</td>
            <td>C_Axe076</td>
            <td>202</td>
            <td>Undying Blade II</td>
          </tr>
          <tr>
            <td>08B00075</td>
            <td>W_ChargeAxe_117</td>
            <td>08B00022</td>
            <td>C_Axe076</td>
            <td>203</td>
            <td>Ikaji Immortal</td>
          </tr>
          <tr>
            <td>08B00076</td>
            <td>W_ChargeAxe_118</td>
            <td>08B00026</td>
            <td>C_Axe081</td>
            <td>258</td>
            <td>Rampage C. Blade IV</td>
          </tr>
          <tr>
            <td>08B00077</td>
            <td>W_ChargeAxe_119</td>
            <td>08B00026</td>
            <td>C_Axe081</td>
            <td>259</td>
            <td>Rampage C. Blade V</td>
          </tr>
          <tr>
            <td>08B00078</td>
            <td>W_ChargeAxe_120</td>
            <td>08B00027</td>
            <td>C_Axe082</td>
            <td>1</td>
            <td>Defender Charge Blade I</td>
          </tr>
          <tr>
            <td>08B00079</td>
            <td>W_ChargeAxe_121</td>
            <td>08B00027</td>
            <td>C_Axe082</td>
            <td>2</td>
            <td>Champion Charge Blade</td>
          </tr>
          <tr>
            <td>08B0012C</td>
            <td>W_ChargeAxe_300</td>
            <td>08B00028</td>
            <td>C_Axe100</td>
            <td>12</td>
            <td>Kamura Warrior C. Blade</td>
          </tr>
          <tr>
            <td>08B0012D</td>
            <td>W_ChargeAxe_301</td>
            <td>08B00028</td>
            <td>C_Axe100</td>
            <td>13</td>
            <td>Kamura Warrior C. Blade+</td>
          </tr>
          <tr>
            <td>08B0012E</td>
            <td>W_ChargeAxe_302</td>
            <td>08B00028</td>
            <td>C_Axe100</td>
            <td>14</td>
            <td>Kamura Fine C. Blade</td>
          </tr>
          <tr>
            <td>08B0012F</td>
            <td>W_ChargeAxe_303</td>
            <td>08B00036</td>
            <td>C_Axe114</td>
            <td>15</td>
            <td>Duke's Shield</td>
          </tr>
          <tr>
            <td>08B00130</td>
            <td>W_ChargeAxe_304</td>
            <td>08B00036</td>
            <td>C_Axe114</td>
            <td>16</td>
            <td>Bloodeagle Adler</td>
          </tr>
          <tr>
            <td>08B00131</td>
            <td>W_ChargeAxe_305</td>
            <td>08B00001</td>
            <td>C_Axe002</td>
            <td>21</td>
            <td>Dear Lutemia+</td>
          </tr>
          <tr>
            <td>08B00132</td>
            <td>W_ChargeAxe_306</td>
            <td>08B00001</td>
            <td>C_Axe002</td>
            <td>22</td>
            <td>Dear Lutemineva</td>
          </tr>
          <tr>
            <td>08B00133</td>
            <td>W_ChargeAxe_307</td>
            <td>08B00001</td>
            <td>C_Axe002</td>
            <td>23</td>
            <td>Dear Lutemineva+</td>
          </tr>
          <tr>
            <td>08B00134</td>
            <td>W_ChargeAxe_308</td>
            <td>08B0003A</td>
            <td>C_Axe118</td>
            <td>25</td>
            <td>Rosenrupe</td>
          </tr>
          <tr>
            <td>08B00135</td>
            <td>W_ChargeAxe_309</td>
            <td>08B0003A</td>
            <td>C_Axe118</td>
            <td>26</td>
            <td>Rosenrupe+</td>
          </tr>
          <tr>
            <td>08B00136</td>
            <td>W_ChargeAxe_310</td>
            <td>08B0003A</td>
            <td>C_Axe118</td>
            <td>27</td>
            <td>Rosenemolgia</td>
          </tr>
          <tr>
            <td>08B00137</td>
            <td>W_ChargeAxe_311</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>33</td>
            <td>Frostrail</td>
          </tr>
          <tr>
            <td>08B00138</td>
            <td>W_ChargeAxe_312</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>34</td>
            <td>Frostrail+</td>
          </tr>
          <tr>
            <td>08B00139</td>
            <td>W_ChargeAxe_313</td>
            <td>08B00003</td>
            <td>C_Axe012</td>
            <td>35</td>
            <td>Dreadfeller</td>
          </tr>
          <tr>
            <td>08B0013A</td>
            <td>W_ChargeAxe_314</td>
            <td>08B00024</td>
            <td>C_Axe079</td>
            <td>39</td>
            <td>Despot's Thundergale+</td>
          </tr>
          <tr>
            <td>08B0013B</td>
            <td>W_ChargeAxe_315</td>
            <td>08B00024</td>
            <td>C_Axe079</td>
            <td>40</td>
            <td>Oppressor's Thunderclap</td>
          </tr>
          <tr>
            <td>08B0013C</td>
            <td>W_ChargeAxe_316</td>
            <td>08B0000B</td>
            <td>C_Axe052</td>
            <td>44</td>
            <td>Spinning Takedown+</td>
          </tr>
          <tr>
            <td>08B0013D</td>
            <td>W_ChargeAxe_317</td>
            <td>08B0000B</td>
            <td>C_Axe052</td>
            <td>45</td>
            <td>Whirling Takedown</td>
          </tr>
          <tr>
            <td>08B0013E</td>
            <td>W_ChargeAxe_318</td>
            <td>08B0000B</td>
            <td>C_Axe052</td>
            <td>46</td>
            <td>Whirling Takedown+</td>
          </tr>
          <tr>
            <td>08B0013F</td>
            <td>W_ChargeAxe_319</td>
            <td>08B0001B</td>
            <td>C_Axe068</td>
            <td>51</td>
            <td>Titan's Vise+</td>
          </tr>
          <tr>
            <td>08B00141</td>
            <td>W_ChargeAxe_321</td>
            <td>08B0001B</td>
            <td>C_Axe068</td>
            <td>52</td>
            <td>Goliath Arms</td>
          </tr>
          <tr>
            <td>08B00142</td>
            <td>W_ChargeAxe_322</td>
            <td>08B0000E</td>
            <td>C_Axe055</td>
            <td>56</td>
            <td>Striking Axe</td>
          </tr>
          <tr>
            <td>08B00143</td>
            <td>W_ChargeAxe_323</td>
            <td>08B0000E</td>
            <td>C_Axe055</td>
            <td>57</td>
            <td>Striking Axe+</td>
          </tr>
          <tr>
            <td>08B00144</td>
            <td>W_ChargeAxe_324</td>
            <td>08B0000E</td>
            <td>C_Axe055</td>
            <td>58</td>
            <td>Shocking Axe</td>
          </tr>
          <tr>
            <td>08B00145</td>
            <td>W_ChargeAxe_325</td>
            <td>08B00012</td>
            <td>C_Axe059</td>
            <td>65</td>
            <td>Kaiser Blade+</td>
          </tr>
          <tr>
            <td>08B00146</td>
            <td>W_ChargeAxe_326</td>
            <td>08B00012</td>
            <td>C_Axe059</td>
            <td>66</td>
            <td>Kaiser Kommandant</td>
          </tr>
          <tr>
            <td>08B00147</td>
            <td>W_ChargeAxe_327</td>
            <td>08B00012</td>
            <td>C_Axe059</td>
            <td>67</td>
            <td>Kaiser Kommandant+</td>
          </tr>
          <tr>
            <td>08B00148</td>
            <td>W_ChargeAxe_328</td>
            <td>08B00037</td>
            <td>C_Axe115</td>
            <td>68</td>
            <td>Frostmoon Icecutioner</td>
          </tr>
          <tr>
            <td>08B00149</td>
            <td>W_ChargeAxe_329</td>
            <td>08B00037</td>
            <td>C_Axe115</td>
            <td>69</td>
            <td>Frostmoon Icecutioner+</td>
          </tr>
          <tr>
            <td>08B0014A</td>
            <td>W_ChargeAxe_330</td>
            <td>08B00037</td>
            <td>C_Axe115</td>
            <td>70</td>
            <td>Gluttonous Glacier</td>
          </tr>
          <tr>
            <td>08B0014B</td>
            <td>W_ChargeAxe_331</td>
            <td>08B00013</td>
            <td>C_Axe060</td>
            <td>74</td>
            <td>Die Walküre+</td>
          </tr>
          <tr>
            <td>08B0014C</td>
            <td>W_ChargeAxe_332</td>
            <td>08B00013</td>
            <td>C_Axe060</td>
            <td>75</td>
            <td>Tristan and Isolde</td>
          </tr>
          <tr>
            <td>08B0014D</td>
            <td>W_ChargeAxe_333</td>
            <td>08B00013</td>
            <td>C_Axe060</td>
            <td>76</td>
            <td>Tristan and Isolde+</td>
          </tr>
          <tr>
            <td>08B0014E</td>
            <td>W_ChargeAxe_334</td>
            <td>08B00031</td>
            <td>C_Axe109</td>
            <td>77</td>
            <td>Vajraklex Blade</td>
          </tr>
          <tr>
            <td>08B0014F</td>
            <td>W_ChargeAxe_335</td>
            <td>08B00031</td>
            <td>C_Axe109</td>
            <td>78</td>
            <td>Amagarex Blade</td>
          </tr>
          <tr>
            <td>08B00150</td>
            <td>W_ChargeAxe_336</td>
            <td>08B00031</td>
            <td>C_Axe109</td>
            <td>79</td>
            <td>Amagarex Blade+</td>
          </tr>
          <tr>
            <td>08B00151</td>
            <td>W_ChargeAxe_337</td>
            <td>08B0000F</td>
            <td>C_Axe056</td>
            <td>83</td>
            <td>Araknasmasher</td>
          </tr>
          <tr>
            <td>08B00152</td>
            <td>W_ChargeAxe_338</td>
            <td>08B0000F</td>
            <td>C_Axe056</td>
            <td>84</td>
            <td>Araknasmasher+</td>
          </tr>
          <tr>
            <td>08B00153</td>
            <td>W_ChargeAxe_339</td>
            <td>08B0000F</td>
            <td>C_Axe056</td>
            <td>85</td>
            <td>Crawling Crusher</td>
          </tr>
          <tr>
            <td>08B00154</td>
            <td>W_ChargeAxe_340</td>
            <td>08B00035</td>
            <td>C_Axe113</td>
            <td>86</td>
            <td>Roujatov Gate</td>
          </tr>
          <tr>
            <td>08B00155</td>
            <td>W_ChargeAxe_341</td>
            <td>08B00035</td>
            <td>C_Axe113</td>
            <td>87</td>
            <td>Roujatov Gate+</td>
          </tr>
          <tr>
            <td>08B00156</td>
            <td>W_ChargeAxe_342</td>
            <td>08B00035</td>
            <td>C_Axe113</td>
            <td>88</td>
            <td>Ent Da Lavater</td>
          </tr>
          <tr>
            <td>08B00157</td>
            <td>W_ChargeAxe_343</td>
            <td>08B0001E</td>
            <td>C_Axe072</td>
            <td>92</td>
            <td>Tigrex Blade+</td>
          </tr>
          <tr>
            <td>08B00158</td>
            <td>W_ChargeAxe_344</td>
            <td>08B0001E</td>
            <td>C_Axe072</td>
            <td>93</td>
            <td>Huge Tigrex Blade</td>
          </tr>
          <tr>
            <td>08B00159</td>
            <td>W_ChargeAxe_345</td>
            <td>08B0001E</td>
            <td>C_Axe072</td>
            <td>94</td>
            <td>Huge Tigrex Blade+</td>
          </tr>
          <tr>
            <td>08B0015A</td>
            <td>W_ChargeAxe_346</td>
            <td>08B0001D</td>
            <td>C_Axe071</td>
            <td>98</td>
            <td>Final Fieldblade+</td>
          </tr>
          <tr>
            <td>08B0015B</td>
            <td>W_ChargeAxe_347</td>
            <td>08B0001D</td>
            <td>C_Axe071</td>
            <td>99</td>
            <td>Divine Fieldblade</td>
          </tr>
          <tr>
            <td>08B0015C</td>
            <td>W_ChargeAxe_348</td>
            <td>08B0001D</td>
            <td>C_Axe071</td>
            <td>100</td>
            <td>Divine Fieldblade+</td>
          </tr>
          <tr>
            <td>08B0015D</td>
            <td>W_ChargeAxe_349</td>
            <td>08B00032</td>
            <td>C_Axe110</td>
            <td>101</td>
            <td>Pure Axe Omonshiro</td>
          </tr>
          <tr>
            <td>08B0015E</td>
            <td>W_ChargeAxe_350</td>
            <td>08B00008</td>
            <td>C_Axe029</td>
            <td>105</td>
            <td>Kadachi Otenta+</td>
          </tr>
          <tr>
            <td>08B0015F</td>
            <td>W_ChargeAxe_351</td>
            <td>08B00008</td>
            <td>C_Axe029</td>
            <td>106</td>
            <td>Thunderclap Otenta</td>
          </tr>
          <tr>
            <td>08B00160</td>
            <td>W_ChargeAxe_352</td>
            <td>08B00008</td>
            <td>C_Axe029</td>
            <td>107</td>
            <td>Thunderclap Otenta+</td>
          </tr>
          <tr>
            <td>08B00161</td>
            <td>W_ChargeAxe_353</td>
            <td>08B0000A</td>
            <td>C_Axe051</td>
            <td>111</td>
            <td>Gale Sickle+</td>
          </tr>
          <tr>
            <td>08B00162</td>
            <td>W_ChargeAxe_354</td>
            <td>08B0000A</td>
            <td>C_Axe051</td>
            <td>112</td>
            <td>Reaper Axe Helliot</td>
          </tr>
          <tr>
            <td>08B00163</td>
            <td>W_ChargeAxe_355</td>
            <td>08B0001C</td>
            <td>C_Axe070</td>
            <td>116</td>
            <td>Howl in the Rain</td>
          </tr>
          <tr>
            <td>08B00164</td>
            <td>W_ChargeAxe_356</td>
            <td>08B0001C</td>
            <td>C_Axe070</td>
            <td>117</td>
            <td>Howl in the Rain+</td>
          </tr>
          <tr>
            <td>08B00165</td>
            <td>W_ChargeAxe_357</td>
            <td>08B0001C</td>
            <td>C_Axe070</td>
            <td>118</td>
            <td>Avidya Charger</td>
          </tr>
          <tr>
            <td>08B00166</td>
            <td>W_ChargeAxe_358</td>
            <td>08B00006</td>
            <td>C_Axe021</td>
            <td>126</td>
            <td>Bonesilt Veil+</td>
          </tr>
          <tr>
            <td>08B00167</td>
            <td>W_ChargeAxe_359</td>
            <td>08B00006</td>
            <td>C_Axe021</td>
            <td>127</td>
            <td>Bonebreaker Veil</td>
          </tr>
          <tr>
            <td>08B00168</td>
            <td>W_ChargeAxe_360</td>
            <td>08B00006</td>
            <td>C_Axe021</td>
            <td>128</td>
            <td>Bonebreaker Veil+</td>
          </tr>
          <tr>
            <td>08B00169</td>
            <td>W_ChargeAxe_361</td>
            <td>08B00030</td>
            <td>C_Axe108</td>
            <td>129</td>
            <td>Aslat Charger</td>
          </tr>
          <tr>
            <td>08B0016A</td>
            <td>W_ChargeAxe_362</td>
            <td>08B00030</td>
            <td>C_Axe108</td>
            <td>130</td>
            <td>Aslat Charger+</td>
          </tr>
          <tr>
            <td>08B0016B</td>
            <td>W_ChargeAxe_363</td>
            <td>08B00030</td>
            <td>C_Axe108</td>
            <td>131</td>
            <td>Rebellious Charger</td>
          </tr>
          <tr>
            <td>08B0016C</td>
            <td>W_ChargeAxe_364</td>
            <td>08B0002B</td>
            <td>C_Axe103</td>
            <td>132</td>
            <td>Guardian Blade</td>
          </tr>
          <tr>
            <td>08B0016D</td>
            <td>W_ChargeAxe_365</td>
            <td>08B0002B</td>
            <td>C_Axe103</td>
            <td>133</td>
            <td>Guardian Blade+</td>
          </tr>
          <tr>
            <td>08B0016E</td>
            <td>W_ChargeAxe_366</td>
            <td>08B0002B</td>
            <td>C_Axe103</td>
            <td>134</td>
            <td>Nadegiri</td>
          </tr>
          <tr>
            <td>08B0016F</td>
            <td>W_ChargeAxe_367</td>
            <td>08B00007</td>
            <td>C_Axe028</td>
            <td>138</td>
            <td>Clutch of the Deep+</td>
          </tr>
          <tr>
            <td>08B00170</td>
            <td>W_ChargeAxe_368</td>
            <td>08B00007</td>
            <td>C_Axe028</td>
            <td>139</td>
            <td>Valtos Bow</td>
          </tr>
          <tr>
            <td>08B00171</td>
            <td>W_ChargeAxe_369</td>
            <td>08B00007</td>
            <td>C_Axe028</td>
            <td>140</td>
            <td>Valtos Bow+</td>
          </tr>
          <tr>
            <td>08B00172</td>
            <td>W_ChargeAxe_370</td>
            <td>08B00002</td>
            <td>C_Axe003</td>
            <td>144</td>
            <td>Bardichion Blade+</td>
          </tr>
          <tr>
            <td>08B00173</td>
            <td>W_ChargeAxe_371</td>
            <td>08B00002</td>
            <td>C_Axe003</td>
            <td>145</td>
            <td>Flamlion Blade</td>
          </tr>
          <tr>
            <td>08B00174</td>
            <td>W_ChargeAxe_372</td>
            <td>08B0000C</td>
            <td>C_Axe053</td>
            <td>150</td>
            <td>Illusory Frilled Wail+</td>
          </tr>
          <tr>
            <td>08B00175</td>
            <td>W_ChargeAxe_373</td>
            <td>08B0000C</td>
            <td>C_Axe053</td>
            <td>151</td>
            <td>Nightmare Frilled Wail</td>
          </tr>
          <tr>
            <td>08B00176</td>
            <td>W_ChargeAxe_374</td>
            <td>08B0000C</td>
            <td>C_Axe053</td>
            <td>152</td>
            <td>Nightmare Frilled Wail+</td>
          </tr>
          <tr>
            <td>08B00177</td>
            <td>W_ChargeAxe_375</td>
            <td>08B00034</td>
            <td>C_Axe112</td>
            <td>153</td>
            <td>Bloom Snow Wail</td>
          </tr>
          <tr>
            <td>08B00178</td>
            <td>W_ChargeAxe_376</td>
            <td>08B00034</td>
            <td>C_Axe112</td>
            <td>154</td>
            <td>Bloom Snow Wail+</td>
          </tr>
          <tr>
            <td>08B00179</td>
            <td>W_ChargeAxe_377</td>
            <td>08B00034</td>
            <td>C_Axe112</td>
            <td>155</td>
            <td>Flicker Blizzard Wail</td>
          </tr>
          <tr>
            <td>08B0017A</td>
            <td>W_ChargeAxe_378</td>
            <td>08B00014</td>
            <td>C_Axe061</td>
            <td>159</td>
            <td>Infected Veil+</td>
          </tr>
          <tr>
            <td>08B0017B</td>
            <td>W_ChargeAxe_379</td>
            <td>08B00014</td>
            <td>C_Axe061</td>
            <td>160</td>
            <td>Malefico Veil</td>
          </tr>
          <tr>
            <td>08B0017C</td>
            <td>W_ChargeAxe_380</td>
            <td>08B00014</td>
            <td>C_Axe061</td>
            <td>161</td>
            <td>Malefico Veil+</td>
          </tr>
          <tr>
            <td>08B0017D</td>
            <td>W_ChargeAxe_381</td>
            <td>08B00015</td>
            <td>C_Axe062</td>
            <td>165</td>
            <td>Dragonsong+</td>
          </tr>
          <tr>
            <td>08B0017E</td>
            <td>W_ChargeAxe_382</td>
            <td>08B00015</td>
            <td>C_Axe062</td>
            <td>166</td>
            <td>Draquila Reaver</td>
          </tr>
          <tr>
            <td>08B0017F</td>
            <td>W_ChargeAxe_383</td>
            <td>08B00015</td>
            <td>C_Axe062</td>
            <td>167</td>
            <td>Draquila Reaver+</td>
          </tr>
          <tr>
            <td>08B00180</td>
            <td>W_ChargeAxe_384</td>
            <td>08B00019</td>
            <td>C_Axe066</td>
            <td>171</td>
            <td>Barroth Guardian</td>
          </tr>
          <tr>
            <td>08B00181</td>
            <td>W_ChargeAxe_385</td>
            <td>08B00019</td>
            <td>C_Axe066</td>
            <td>173</td>
            <td>Barroth Reanchor</td>
          </tr>
          <tr>
            <td>08B00182</td>
            <td>W_ChargeAxe_386</td>
            <td>08B00038</td>
            <td>C_Axe116</td>
            <td>174</td>
            <td>Golm Heart</td>
          </tr>
          <tr>
            <td>08B00183</td>
            <td>W_ChargeAxe_387</td>
            <td>08B00038</td>
            <td>C_Axe116</td>
            <td>175</td>
            <td>Golm Heart+</td>
          </tr>
          <tr>
            <td>08B00184</td>
            <td>W_ChargeAxe_388</td>
            <td>08B00038</td>
            <td>C_Axe116</td>
            <td>176</td>
            <td>Grand Gordlock</td>
          </tr>
          <tr>
            <td>08B00185</td>
            <td>W_ChargeAxe_389</td>
            <td>08B0001F</td>
            <td>C_Axe073</td>
            <td>180</td>
            <td>Cera Strongarm+</td>
          </tr>
          <tr>
            <td>08B00186</td>
            <td>W_ChargeAxe_390</td>
            <td>08B0001F</td>
            <td>C_Axe073</td>
            <td>181</td>
            <td>Cera Cediment</td>
          </tr>
          <tr>
            <td>08B00187</td>
            <td>W_ChargeAxe_391</td>
            <td>08B0001A</td>
            <td>C_Axe067</td>
            <td>186</td>
            <td>Rotaxion+</td>
          </tr>
          <tr>
            <td>08B00188</td>
            <td>W_ChargeAxe_392</td>
            <td>08B0001A</td>
            <td>C_Axe067</td>
            <td>187</td>
            <td>Vortax</td>
          </tr>
          <tr>
            <td>08B00189</td>
            <td>W_ChargeAxe_393</td>
            <td>08B0001A</td>
            <td>C_Axe067</td>
            <td>188</td>
            <td>Vortax+</td>
          </tr>
          <tr>
            <td>08B0018A</td>
            <td>W_ChargeAxe_394</td>
            <td>08B0000D</td>
            <td>C_Axe054</td>
            <td>192</td>
            <td>Sinister Shade Axe+</td>
          </tr>
          <tr>
            <td>08B0018B</td>
            <td>W_ChargeAxe_395</td>
            <td>08B0000D</td>
            <td>C_Axe054</td>
            <td>193</td>
            <td>Mighty Soulcrusher</td>
          </tr>
          <tr>
            <td>08B0018C</td>
            <td>W_ChargeAxe_396</td>
            <td>08B00033</td>
            <td>C_Axe111</td>
            <td>194</td>
            <td>Vengeful Broadfeller</td>
          </tr>
          <tr>
            <td>08B0018D</td>
            <td>W_ChargeAxe_397</td>
            <td>08B00022</td>
            <td>C_Axe076</td>
            <td>204</td>
            <td>Ikaji Immortal+</td>
          </tr>
          <tr>
            <td>08B0018E</td>
            <td>W_ChargeAxe_398</td>
            <td>08B00022</td>
            <td>C_Axe076</td>
            <td>205</td>
            <td>Unyielding Honor</td>
          </tr>
          <tr>
            <td>08B0018F</td>
            <td>W_ChargeAxe_399</td>
            <td>08B00010</td>
            <td>C_Axe057</td>
            <td>210</td>
            <td>Asylum Bellow</td>
          </tr>
          <tr>
            <td>08B00191</td>
            <td>W_ChargeAxe_401</td>
            <td>08B00011</td>
            <td>C_Axe058</td>
            <td>213</td>
            <td>Asylum Peal</td>
          </tr>
          <tr>
            <td>08B00193</td>
            <td>W_ChargeAxe_403</td>
            <td>08B00000</td>
            <td>C_Axe001</td>
            <td>216</td>
            <td>Daora's Thwartoise+</td>
          </tr>
          <tr>
            <td>08B00194</td>
            <td>W_ChargeAxe_404</td>
            <td>08B00000</td>
            <td>C_Axe001</td>
            <td>217</td>
            <td>Daora's Worldbearer</td>
          </tr>
          <tr>
            <td>08B00195</td>
            <td>W_ChargeAxe_405</td>
            <td>08B00020</td>
            <td>C_Axe074</td>
            <td>220</td>
            <td>Teostra's Nova+</td>
          </tr>
          <tr>
            <td>08B00196</td>
            <td>W_ChargeAxe_406</td>
            <td>08B00020</td>
            <td>C_Axe074</td>
            <td>221</td>
            <td>Teostra's Redeemer</td>
          </tr>
          <tr>
            <td>08B00197</td>
            <td>W_ChargeAxe_407</td>
            <td>08B00021</td>
            <td>C_Axe075</td>
            <td>224</td>
            <td>Etherward+</td>
          </tr>
          <tr>
            <td>08B00198</td>
            <td>W_ChargeAxe_408</td>
            <td>08B00021</td>
            <td>C_Axe075</td>
            <td>225</td>
            <td>Phantom Providence</td>
          </tr>
          <tr>
            <td>08B00199</td>
            <td>W_ChargeAxe_409</td>
            <td>08B00023</td>
            <td>C_Axe077</td>
            <td>228</td>
            <td>Crimson Mechwing</td>
          </tr>
          <tr>
            <td>08B0019A</td>
            <td>W_ChargeAxe_410</td>
            <td>08B0002E</td>
            <td>C_Axe106</td>
            <td>195</td>
            <td>Elendskraft</td>
          </tr>
          <tr>
            <td>08B0019B</td>
            <td>W_ChargeAxe_411</td>
            <td>08B0002E</td>
            <td>C_Axe106</td>
            <td>196</td>
            <td>Elendskraft+</td>
          </tr>
          <tr>
            <td>08B0019C</td>
            <td>W_ChargeAxe_412</td>
            <td>08B0002E</td>
            <td>C_Axe106</td>
            <td>197</td>
            <td>Unheilskraft</td>
          </tr>
          <tr>
            <td>08B0019D</td>
            <td>W_ChargeAxe_413</td>
            <td>08B0002F</td>
            <td>C_Axe107</td>
            <td>198</td>
            <td>L'Oppresseur</td>
          </tr>
          <tr>
            <td>08B0019E</td>
            <td>W_ChargeAxe_414</td>
            <td>08B0002F</td>
            <td>C_Axe107</td>
            <td>199</td>
            <td>Le Salut</td>
          </tr>
          <tr>
            <td>08B0019F</td>
            <td>W_ChargeAxe_415</td>
            <td>08B00039</td>
            <td>C_Axe117</td>
            <td>229</td>
            <td>Abyssal Splitter</td>
          </tr>
          <tr>
            <td>08B001A0</td>
            <td>W_ChargeAxe_416</td>
            <td>08B0002C</td>
            <td>C_Axe104</td>
            <td>206</td>
            <td>Demonlord Blade</td>
          </tr>
          <tr>
            <td>08B001A1</td>
            <td>W_ChargeAxe_417</td>
            <td>08B00025</td>
            <td>C_Axe080</td>
            <td>235</td>
            <td>Pounder of Rice+</td>
          </tr>
          <tr>
            <td>08B001A2</td>
            <td>W_ChargeAxe_418</td>
            <td>08B00025</td>
            <td>C_Axe080</td>
            <td>236</td>
            <td>Ricebane Emperor</td>
          </tr>
          <tr>
            <td>08B001A3</td>
            <td>W_ChargeAxe_419</td>
            <td>08B00018</td>
            <td>C_Axe065</td>
            <td>240</td>
            <td>Felyne Fancy+</td>
          </tr>
          <tr>
            <td>08B001A4</td>
            <td>W_ChargeAxe_420</td>
            <td>08B00018</td>
            <td>C_Axe065</td>
            <td>241</td>
            <td>Ominous Puss</td>
          </tr>
          <tr>
            <td>08B001A5</td>
            <td>W_ChargeAxe_421</td>
            <td>08B00017</td>
            <td>C_Axe064</td>
            <td>245</td>
            <td>Maxilla Edge+</td>
          </tr>
          <tr>
            <td>08B001A6</td>
            <td>W_ChargeAxe_422</td>
            <td>08B00017</td>
            <td>C_Axe064</td>
            <td>246</td>
            <td>Skull Edge</td>
          </tr>
          <tr>
            <td>08B001A7</td>
            <td>W_ChargeAxe_423</td>
            <td>08B00016</td>
            <td>C_Axe063</td>
            <td>250</td>
            <td>Shieldraad+</td>
          </tr>
          <tr>
            <td>08B001A8</td>
            <td>W_ChargeAxe_424</td>
            <td>08B00016</td>
            <td>C_Axe063</td>
            <td>251</td>
            <td>Armordraad</td>
          </tr>
          <tr>
            <td>08B001A9</td>
            <td>W_ChargeAxe_425</td>
            <td>08B0003C</td>
            <td>C_Axe120</td>
            <td>252</td>
            <td>Royal Order's Battleaxe</td>
          </tr>
          <tr>
            <td>08B001AB</td>
            <td>W_ChargeAxe_427</td>
            <td>08B0003C</td>
            <td>C_Axe120</td>
            <td>253</td>
            <td>Royal Order's Battleaxe+</td>
          </tr>
          <tr>
            <td>08B001AC</td>
            <td>W_ChargeAxe_428</td>
            <td>08B0003D</td>
            <td>C_Axe121</td>
            <td>254</td>
            <td>Antique Machina CB</td>
          </tr>
          <tr>
            <td>08B001AD</td>
            <td>W_ChargeAxe_429</td>
            <td>08B0003B</td>
            <td>C_Axe119</td>
            <td>28</td>
            <td>Kaktusemolgia</td>
          </tr>
          <tr>
            <td>08B001AE</td>
            <td>W_ChargeAxe_430</td>
            <td>08B00029</td>
            <td>C_Axe101</td>
            <td>24</td>
            <td>Luna Eostre</td>
          </tr>
          <tr>
            <td>08B001AF</td>
            <td>W_ChargeAxe_431</td>
            <td>08B0002A</td>
            <td>C_Axe102</td>
            <td>146</td>
            <td>Hellsire Blade</td>
          </tr>
          <tr>
            <td>08B001B1</td>
            <td>W_ChargeAxe_433</td>
            <td>08B0002D</td>
            <td>C_Axe105</td>
            <td>119</td>
            <td>Nunki's Asterism</td>
          </tr>
          <tr>
            <td>08B001B8</td>
            <td>W_ChargeAxe_440</td>
            <td>08B00019</td>
            <td>C_Axe066</td>
            <td>172</td>
            <td>Barroth Guardian+</td>
          </tr>
          <tr>
            <td>08B001B9</td>
            <td>W_ChargeAxe_441</td>
            <td>08B0001F</td>
            <td>C_Axe073</td>
            <td>182</td>
            <td>Cera Cediment+</td>
          </tr>
          <tr>
            <td>08B001BA</td>
            <td>W_ChargeAxe_442</td>
            <td>08B00027</td>
            <td>C_Axe082</td>
            <td>3</td>
            <td>Champion Charge Blade II</td>
          </tr>
          <tr>
            <td>08B001BB</td>
            <td>W_ChargeAxe_443</td>
            <td>08B00027</td>
            <td>C_Axe082</td>
            <td>4</td>
            <td>Champion Charge Blade III</td>
          </tr>
          <tr>
            <td>08B001BC</td>
            <td>W_ChargeAxe_444</td>
            <td>08B00027</td>
            <td>C_Axe082</td>
            <td>5</td>
            <td>Guardian Charge Blade</td>
          </tr>
          <tr>
            <td>08B001C0</td>
            <td>W_ChargeAxe_448</td>
            <td>08B0003E</td>
            <td>C_Axe122</td>
            <td>271</td>
            <td>Lost Code: Sara</td>
          </tr>
          <tr>
            <td>08B001C1</td>
            <td>W_ChargeAxe_449</td>
            <td>08B00040</td>
            <td>C_Axe124</td>
            <td>200</td>
            <td>Friede/Désastre</td>
          </tr>
          <tr>
            <td>08B001C2</td>
            <td>W_ChargeAxe_450</td>
            <td>08B0003F</td>
            <td>C_Axe123</td>
            <td>272</td>
            <td>Stuffed Garangolm</td>
          </tr>
          <tr>
            <td>08B001C3</td>
            <td>W_ChargeAxe_451</td>
            <td>08B00041</td>
            <td>C_Axe125</td>
            <td>230</td>
            <td>Regal Daruq</td>
          </tr>
          <tr>
            <td>08B001C4</td>
            <td>W_ChargeAxe_452</td>
            <td>08B00042</td>
            <td>C_Axe126</td>
            <td>231</td>
            <td>Altostratus Blade</td>
          </tr>
          <tr>
            <td>08B001C5</td>
            <td>W_ChargeAxe_453</td>
            <td>08B00043</td>
            <td>C_Axe127</td>
            <td>17</td>
            <td>Silver Splitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WeaponBlock;