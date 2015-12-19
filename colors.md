---
layout: "page"
permalink: "/colors/"
title: "Colors"
css: |
  color-palette {
    display: flex;
  }
  color-item {
    display: block;
    flex: 1;
    flex-basis: 0;
    height: 4em;
    padding: 0.5em;
  }
  color-item.is-light {
    color: black;
  }
  color-item.is-dark {
    color: white;
  }
---

## @dtinth’s Palette

<script src="https://cdn.rawgit.com/husl-colors/husl/c7fe4df7febd3ff27ba61a46cd7f953fc2e0d73e/husl.js"></script>

<script>
  var ColorItemPrototype = Object.create(HTMLElement.prototype)
  ColorItemPrototype.createdCallback = function () {
    var color = this.getAttribute('color')
    var hsl = $.husl.fromHex(color)
    this.style.backgroundColor = color
    this.classList.add(hsl[2] >= 50 ? 'is-light' : 'is-dark')
    console.log('[%s] Color: %s, Lightness: %s', this.textContent, color, hsl[2])
  }
  var ColorItem = document.registerElement('color-item', {
    prototype: ColorItemPrototype
  })
</script>

<color-palette>
  <color-item color="#e9e8e7">Gray50</color-item>
  <color-item color="#8B8685">Gray450</color-item>
  <color-item color="#656463">Gray600</color-item>
  <color-item color="#454443">Gray700</color-item>
  <color-item color="#353433">Gray800</color-item>
  <color-item color="#252423">Gray850</color-item>
  <color-item color="#090807">Gray1000</color-item>
</color-palette>

<color-palette>
  <color-item color="#bbeeff">FrenchPass</color-item>
  <color-item color="#d7fc70">Mindaro</color-item>
</color-palette>



## Bemuse Project

<color-palette>
  <color-item color="#FEE4ED">Cardinal100</color-item>
  <color-item color="#E9A8BB">Cardinal200</color-item>
  <color-item color="#DE809A">Cardinal300</color-item>
  <color-item color="#E34E7A">Cardinal400</color-item>
  <color-item color="#B61A44">Cardinal500</color-item>
  <color-item color="#943C55">Cardinal600</color-item>
  <color-item color="#7E1736">Cardinal700</color-item>
</color-palette>

<color-palette>
  <color-item color="#FE96B6">Crimson300</color-item>
  <color-item color="#FB5E90">Crimson400</color-item>
</color-palette>

<color-palette>
  <color-item color="#FAD765">Gold300</color-item>
  <color-item color="#FFC601">Gold400</color-item>
</color-palette>

<color-palette>
  <color-item color="#9DEDFF">Azure300</color-item>
  <color-item color="#31BCFA">Azure400</color-item>
</color-palette>

<color-palette>
  <color-item color="#D4FB7F">Green300</color-item>
  <color-item color="#91CF00">Green400</color-item>
</color-palette>
