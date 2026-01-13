import {Checkbox, CheckboxGroup} from "@react-spectrum/s2"

type Iteme = {
    name:string
    reasonDisable?:boolean
}
type CheckBoxProps ={
    items:Array<Iteme>
    onChange:(index:number)=>void
    isSet:Array<boolean>
    label:string
    className?:string
}

export function Checkboxify(props:CheckBoxProps) {
    const {items, onChange, isSet, label, className=""} = props
    return(
        <CheckboxGroup label={label} UNSAFE_className={className} value={isSet.map((_,index)=>(isSet[index] ? String(index) : ""))}>
        {items.map((_,index)=>(
            <Checkbox 
                value={String(index)} 
                onChange={()=>onChange(index)} 
                isDisabled={items[index].reasonDisable === true}
            >{items[index].name}</Checkbox>
        ))}
        </CheckboxGroup> 
    )
}