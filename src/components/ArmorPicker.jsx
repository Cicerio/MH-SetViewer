import { useState, useMemo } from 'react';
import '../css/ArmorPicker.css';
import { getArmorSeriesList, getArmorSeriesPieces, getArmorPieceIconURL } from '../helpers/helpers';

const SLOT_TYPES = ['Head', 'Chest', 'Arm', 'Waist', 'Leg'];
const RANKS = [
  { key: 'Lower', label: 'Low Rank' },
  { key: 'Upper', label: 'High Rank' },
  { key: 'Master', label: 'Master Rank' },
];

/**
 * Rank-tabbed armor set picker: Low/High/Master Rank tabs, each showing armor series sorted by
 * rarity then unlock order. Each set is a card with its name/rarity and 5 clickable piece icons.
 * @param {Object} data - Full raw armor JSON data
 * @param {Function} onClick - Called with (pl_armor_id, slotIndex) when a piece icon is clicked
 */
export default function ArmorPicker({ data, onClick }) {
  const [selectedRank, setSelectedRank] = useState('Lower');
  const groups = useMemo(() => getArmorSeriesList(data), [data]);

  return (
    <div className='armor-picker'>
      <div className='rank-tabs'>
        {RANKS.map(rank => (
          <div
            key={rank.key}
            className={`rank-tab ${selectedRank === rank.key ? 'selected' : ''}`}
            onClick={() => setSelectedRank(rank.key)}
          >
            {rank.label} <span className='count'>({groups[rank.key].length})</span>
          </div>
        ))}
      </div>
      <div className='armor-list'>
        {groups[selectedRank].map(series => (
          <ArmorSeriesCard key={series.id} series={series} data={data} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}

function ArmorSeriesCard({ series, data, onClick }) {
  const pieces = getArmorSeriesPieces(data, series.id);
  return (
    <div className='armor-card'>
      <div className='armor-card-name'>
        {series.name}{' '}
        <span className='armor-card-rarity'>R{series.rarity != null ? series.rarity : '?'}</span>
      </div>
      <div className='armor-card-icons'>
        {SLOT_TYPES.map((type, index) => {
          const piece = pieces.find(p => p.pl_armor_id[type] != null);
          if (!piece) {
            return <span key={type} className='armor-piece-icon-empty' />;
          }
          const armorID = piece.pl_armor_id[type];
          return (
            <img
              key={type}
              className='armor-piece-icon'
              src={getArmorPieceIconURL(type, series.rarity)}
              alt={type}
              onClick={() => onClick(armorID, index)}
            />
          );
        })}
      </div>
    </div>
  );
}
