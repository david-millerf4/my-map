import * as React from "react"
import { locations } from "../data/locations-bayern"

const SortData = (sortOn) => {

     // location sorting
     const gastros = [];
     const bauern = [];
     const sortLocationCategory = (locations) => {
       for (let i = 0; i < locations.length; i++) {
         if (locations[i].category === {sortOn}) {
             gastros.push(locations[i])
         } else {
             bauern.push(locations[i])
         }
       }
       return;
     }
}

export default SortData
