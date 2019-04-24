---
title: 'createPages'
date: '2019-04-24'
keywords:
    - 'gatsby'
sidebar: 'gatsby'
---
## createPages
```js
exports.createPages = async ({ actions: { createPages }}) => {
  const allPokemon = await getPokemonData(["pikachu", "charizard", "squirtle"])

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/all-pokemon.js"),
    context: { allPokemon },
  })
}
```

## template

`createPage` 中 `context` 中传下来的内容可以在组件 `props` 中的 `pageContext` 拿到，这样我们就能创建我们想要的页面了

`/src/templates/pokemon.js`
```jsx
export default ({ pageContext: { pokemon } }) => (
  <div style={{ width: 960, margin: "4rem auto" }}>
    <h1>{pokemon.name}</h1>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <h2>Abilities</h2>
    <ul>
      {pokemon.abilities.map(ability => (
        <li key={ability.name}>
          <Link to={`./pokemon/${pokemon.name}/ability/${ability.name}`}>
            {ability.name}
          </Link>
        </li>
      ))}
    </ul>
    <Link to="/">Back to all Pokémon</Link>
  </div>
)
```