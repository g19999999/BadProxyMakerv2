import {Mana} from "./mobxStuff"
type ManaCostProps = {
    O:Mana 
    W:Mana 
    U:Mana 
    R:Mana
    B:Mana 
    G:Mana 
    C:Mana
}

export function buildManaCost({
  O, W, U, B, R, G, C
}: ManaCostProps): string[] {
  return (
    [
    ...O.shown ? String(O.count) : "",
    ...[W, U, B, R, G, C].flatMap(v => (v.shown ? Array(v.count).fill(v.fill) : []))
    ]
  )
}