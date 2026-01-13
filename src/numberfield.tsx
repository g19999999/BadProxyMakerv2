import {NumberField} from '@react-spectrum/s2'
type manaProps = {color:string, onChange:(value:number) => void, value:number}
type ManaNumbersProps = {items:Array<manaProps>}

function ManaNumber(props:manaProps) {
    const {color, onChange, value} = props
    return(
        <NumberField 
            UNSAFE_className={"numberField"}
            defaultValue={0}
            value={value}
            label={color}
            minValue={0}
            onChange={(value)=>onChange((value))}
        />
    )
}

export function ManaNumbers(props:ManaNumbersProps) {
    const {items} = props
    return (
        items.map((_,index)=>(
            <ManaNumber value={items[index].value} color={items[index].color} onChange={(value)=>items[index].onChange(value)}></ManaNumber>
        )))
}