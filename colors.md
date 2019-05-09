---
layout: "page"
permalink: "/colors/"
title: "Colors"
css: |
  .color-palette {
    display: flex;
  }
  .color-item {
    display: block;
    flex: 1;
    flex-basis: 0;
    height: 4em;
    padding: 0.5em;
  }
  .color-item.is-light {
    color: black;
  }
  .color-item.is-dark {
    color: white;
  }
---

<script src="https://unpkg.com/hsluv@0.0.3/hsluv.js"></script>
<script src="https://unpkg.com/vue@2.6.10/dist/vue.js"></script>

{::options parse_block_html="true" /}

<div id="colors">

## @dtinth’s Palette

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

## wonderful.software

<color-palette>
  <color-item color="#FFFFFF">White</color-item>
  <color-item color="#F5F4F3">Gray20</color-item>
  <color-item color="#353433">Gray800</color-item>
  <color-item color="#E296AD">Cardinal250</color-item>
  <color-item color="#DA3567">Cardinal350</color-item>
  <color-item color="#A60035">Cardinal550</color-item>
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

</div>

<script>
Vue.component('color-palette', {
  template: `<div class="color-palette">
    <slot></slot>
  </div>`
})
Vue.component('color-item', {
  props: {
    color: String,
  },
  computed: {
    hsl() {
      return hsluv.Hsluv.hexToHsluv(this.color)
    },
    className() {
      return this.hsl[2] >= 50 ? 'is-light' : 'is-dark'
    },
    style() {
      return { backgroundColor: this.color }
    },
  },
  template: `<span class="color-item" :style="style" :class="className">
    <slot></slot>
    <br />
    <span style="opacity: 0.5" v-html="color.toLowerCase()"></span>
  </span>`
})
new Vue({
  el: '#colors'
})
</script>
