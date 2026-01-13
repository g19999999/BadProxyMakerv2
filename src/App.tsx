import { useEffect, useState } from 'react'
import "@react-spectrum/s2/page.css"
import {ToggleButtonGroup, ToggleButton, Provider, TextField, Checkbox, Button} from '@react-spectrum/s2'
import './App.css'
import {observer} from "mobx-react-lite"
import {getSnapshot, applySnapshot} from "mobx-keystone"
import {ManaNumbers} from "./numberfield"
import {Checkboxify} from "./Checkboxes"
import {Cardify} from "./Cardify"
import {mainCard} from "./mobxStuff"
import GenericSymbol from "./assets/X.svg"
import WhiteSymbol from "./assets/W.svg"
import blUeSymbol from "./assets/U.svg"
import BlackSymbol from "./assets/B.svg"
import RedSymbol from "./assets/R.svg"
import GreenSymbol from "./assets/G.svg"
import ColorlessSymbol from "./assets/C.svg"


function setToSingleString(keys: Set<Key>): string {
  const k = keys.values().next().value as Key | undefined;
  return k == null ? "" : String(k);
}

function App() {
  const card = mainCard
  const[mode,setMode] = useState("light")
  const {generic, white, blue, black, red, green, colorless} = card
  const checkboxiness = [
    {name:"Generic", mana:generic},
    {name:"White", mana:white},
    {name:"Blue", mana:blue},
    {name:"Black", mana:black},
    {name:"Red", mana:red},
    {name:"Green", mana:green},
    {name:"Colorless", mana:colorless}
  ]
  function saveCard() {
    localStorage.setItem("cards", JSON.stringify(getSnapshot(card)))
  }
  function loadCard() {
    const data = localStorage.getItem("cards")
    if(!data) return
    const cardData = JSON.parse(data)
    applySnapshot(card, cardData)
  }
  const allCardTypes = [
    {name:"Legendary"},
    {name:"Snow"},
    {name:"Kindred"},
    {name:"Enchantment"},
    {name:"Artifact"},
    {name:"Creature"},
    {name:"Battle"},
    {name:"Instant"},
    {name:"Sorcery"},
    {name:"Planeswalker"},
    {name:"Land"},
  ]
  useEffect(() => {
    const html = document.documentElement;

    if (mode === "system") {
      html.removeAttribute("data-color-scheme");
    } else {
      html.setAttribute("data-color-scheme", mode);
    }
  }, [mode]);
  return (
    <>
    <Provider colorScheme={mode}>
      <div className="Card">
        <h1>Bad Proxy Maker</h1>
        <ToggleButtonGroup onSelectionChange={(value)=>setMode(setToSingleString(value))}>
          <ToggleButton id="light">Light Mode</ToggleButton>
          <ToggleButton id="dark">Dark Mode</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="container">
        <Cardify card={card}/>
        <div className="TextAreas">
          <TextField value={card.cardName} label="Card Name" onChange={(v)=>card.setCardName(v)} UNSAFE_className="textBox"></TextField>
          <Checkboxify 
            items={allCardTypes}
            isSet={allCardTypes.map((v)=>card.cardTypes.includes(v.name))}
            onChange={(index)=>{
              card.toggleSetCardType(allCardTypes[index].name)
            }}
            label="Card Types"
            className="CardTypes"
          />
          <Checkbox isSelected={card.showSubtypes} onChange={()=>card.setShowSubtypes(!card.showSubtypes)}>Does your card have subtypes?</Checkbox>
          {card.showSubtypes && <>
            <TextField value={card.subtypes} defaultValue="---" onChange={card.setSubtypes} label="Subtypes"></TextField>
          </>}
          <TextField value={card.oracle} label="Oracle Text" onChange={card.setOracle}></TextField>
          <TextField value={card.flavour} label="Flavour Text" onChange={card.setFlavour}></TextField>
          {card.canBeVehicle && <>
          <Checkbox isSelected={card.vehicle} onChange={v=>card.setVehicle(v)} />
          </>}
          {card.canHavePower && <>
          <TextField value={card.power} label={card.PowerLabel} onChange={v=>card.setPower(v)} />
          </>}
          <Button onPress={()=>saveCard()}>Save</Button>
          <Button onPress={()=>loadCard()}>Load Previous</Button>
        </div>
        <Checkboxify 
          items={checkboxiness.map(v=>({name:v.name, reasonDisable:v.mana.reasonDisable}))} 
          onChange={(index)=>checkboxiness[index].mana.toggleShown()}
          isSet={checkboxiness.map(v=>v.mana.shown)}
          className='Checkbox'
          label="Card Color"
        />
        <div className="manaSymbols">
          <img width={25} src={GenericSymbol} className="whitesymbol"></img>
          <img src={WhiteSymbol} width={25} />
          <img src={blUeSymbol} width={25} />
          <img src={BlackSymbol} width={25} />
          <img src={RedSymbol} width={25} />
          <img src={GreenSymbol} width={25} />
          <img src={ColorlessSymbol} width={25} />
        </div>
        <aside className="numberfields">
          <ManaNumbers
            items={
              checkboxiness.map(v=>({color:v.name, onChange:n=>v.mana.setCount(n), value:v.mana.count}))
            }
          />
        </aside>
      </div>
    </Provider>
    </>
  )
}

export default observer(App)
