import { init } from 'tabletop'
import render from './render'

init({
 key: 'https://docs.google.com/spreadsheets/d/1V0XT-lGEPf8H1OVTn6RNWIR8gOXWamIxoE19fdEmftk/pubhtml',
 callback: function (data, tabletop) {
   console.log(data)

   var view = render(data)
   document.body.appendChild(view)
 },
 simpleSheet: true,
})