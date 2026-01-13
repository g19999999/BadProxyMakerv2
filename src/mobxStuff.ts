import { computed, override } from 'mobx'
import {ExtendedModel, Model, model, modelAction, prop} from 'mobx-keystone'

@model ("app/Mana")
export class Mana extends Model({
    count:prop<number>(0).withSetter(),
    shown:prop<boolean>(false),
    fill:prop<string>("")
}){
    @computed
    get reasonDisable(){
        return this.count === 0
    }
    @computed
    get pipified(){
        return Array(this.count).fill(this.fill).join("")
    }
    @modelAction
    toggleShown () {
        this.shown = !this.shown
    }
}

@model("app/GenericMana")
export class GenericMana extends ExtendedModel(Mana,{}){
    @override
    get reasonDisable(){
        return false
    }
    @override
    get pipified(){
        return String(this.count)
    }
}

@model("app/WholeCard")
export class WholeCard extends Model({
    cardName: prop<string>("").withSetter(),
    generic: prop<Mana>(()=>new GenericMana({})),
    white: prop<Mana>(()=>new Mana({fill:"W"})),
    blue: prop<Mana>(()=>new Mana({fill:"U"})),
    black: prop<Mana>(()=>new Mana({fill:"B"})),
    red: prop<Mana>(()=>new Mana({fill:"R"})),
    green: prop<Mana>(()=>new Mana({fill:"G"})),
    colorless: prop<Mana>(()=>new Mana({fill:"C"})),
    snow: prop<Mana>(()=>new Mana({fill:"S"})),
    cardTypes: prop<string[]>(()=>[]).withSetter(),
    showSubtypes: prop<boolean>(false).withSetter(),
    subtypes: prop<string>("---").withSetter(),
    oracle: prop<string>("").withSetter(),
    flavour: prop<string>("").withSetter(),
    power: prop<string>("").withSetter(),
    vehicle: prop<boolean>(false).withSetter()
}) {
    @computed
    get manas() {
        return [this.generic, this.white, this.blue, this.black, this.red, this.green, this.colorless, this.snow]
    }
    @computed
    get includedManas() {
        return this.manas.filter(m=>m.shown)
    }
    @computed
    get manaDisplay() {
        return this.includedManas.map(m=>m.pipified).join("")
    }
    @modelAction
    toggleSetCardType(type:string) {
        if (this.cardTypes.includes(type)) {
            this.cardTypes = this.cardTypes.filter(t=>t !== type)
        } else {
            this.cardTypes = [...this.cardTypes, type]
        }
        this.setPower("")
        this.setSubtypes("---")
    }
    @computed
    get canHavePower() {
        return this.cardTypes.includes("Creature") || this.cardTypes.includes("Planeswalker") || this.cardTypes.includes("Battle") || this.canBeVehicle
    }
    @computed
    get PowerLabel() {
        if (this.cardTypes.includes("Planeswalker")) return "Starting Loyalty"
        if (this.cardTypes.includes("Battle")) return "Defence"
        return "Power/Toughness"
    }
    @computed
    get canBeVehicle() {
        return this.cardTypes.includes("Artifact")
    }
    @computed
    get isSnow() {
        return this.cardTypes.includes("Snow")
    }
}

export const mainCard = new WholeCard({})