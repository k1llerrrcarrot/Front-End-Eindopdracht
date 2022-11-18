import React from "react";

const ChartControls = ({ 
    handleFilterChange, 
    showDifficulty, 
    showEnjoyment, 
    handleSortChange, 
    sortType 
}) => {
    return (
        <div className="chart-controls">
            <div className="visibility-controls">
                <p>Toon mij: </p>
                <label>
                    <input 
                        type="checkbox" 
                        name="difficultyRating"
                        onChange={handleFilterChange}
                        checked={showDifficulty}
                    />
                    <p className="difficulty">Moeilijkheidsscore</p>
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        name="enjoymentRating"
                        onChange={handleFilterChange}
                        checked={showEnjoyment}
                    />
                    <p className="enjoyment">Plezierscore</p>
                </label>
            </div>

            <div className="sort-controls">
                <p>Sorteren: 
                    <select 
                        value={sortType}
                        name="sort"
                        onChange={handleSortChange}
                    >
                        <option value="none">Geen</option>
                        <option value="difficultyAsc">Moeilijkheidsscore (Oplopend)</option>
                        <option value="difficultyDesc">Moeilijkheidsscore (Aflopend)</option>
                        <option value="enjoyAsc">Plezierscore (Oplopend)</option>
                        <option value="enjoyDesc">Plezierscore (Aflopend)</option>
                    </select>
                </p>
            </div>
        </div>
    )
}
  
export default ChartControls