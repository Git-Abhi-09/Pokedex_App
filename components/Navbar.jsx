const Navbar = () => {
  return (
    <>
      <div class="pokedex-container">
        <div class="header">
            <h1>Pokédex</h1>
            <h1 style={{marginLeft:"20px"}}>|</h1>
            <p style={{marginLeft:"20px"}}>Search for any Pokémon that exists on the planet</p>
        </div>
        <div class="filters">
        <div class="search-container">
            <input type="text" placeholder="Name or Number" class="search-input"></input>
            <button class="search-button">
            Search
            </button>
        </div>
            <div class="filter">
                <label for="type">Type</label>
                <select id="type">
                    <option>Normal + 5 More</option>
                </select>
            </div>
            <div class="filter">
                <label for="gender">Gender</label>
                <select id="gender">
                    <option>Male + 2 More</option>
                </select>
            </div>
            <div class="filter">
                <label for="stats">Stats</label>
                <select id="stats">
                    <option>HP + 5 More</option>
                </select>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar;
