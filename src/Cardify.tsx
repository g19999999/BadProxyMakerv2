import {WholeCard} from './mobxStuff'
type cardInfo ={ 
    card:WholeCard
}

export function Cardify(props:cardInfo) {
    const {card} = props
    const {cardName, manaDisplay, cardTypes, showSubtypes, subtypes, oracle, flavour, power} = card
    return(
        <div className="proxy">
          <aside className="title">
            <p className="cardName">{cardName}</p>
            <p>{manaDisplay}</p>
          </aside>
          <aside className="textyBits">
            {showSubtypes && <>
            <p>{cardTypes.join(" ")}{subtypes}</p>
            </>} {!showSubtypes && <p>{cardTypes}</p>}
            <p>{oracle}</p>
            <p className="FlavourText">{flavour}</p>
            <p>{power}</p>
          </aside>
        </div>
    )
}