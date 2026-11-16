
const state = { ridge: 40, rafter: 16, panelWidth: 36, slopes: 2, overhang: 2 };

function init() {
  const r = document.getElementById('ridgeLen');
  const raf = document.getElementById('rafterLen');
  const pt = document.getElementById('panelType');
  const rs = document.getElementById('roofStyle');
  const eo = document.getElementById('eaveOverhang');

  r.addEventListener('input', e => { state.ridge = parseFloat(e.target.value)||0; calc(); });
  raf.addEventListener('input', e => { state.rafter = parseFloat(e.target.value)||0; calc(); });
  pt.addEventListener('change', e => { state.panelWidth = parseFloat(e.target.value)||36; calc(); });
  rs.addEventListener('change', e => { state.slopes = parseInt(e.target.value, 10)||2; calc(); });
  eo.addEventListener('input', e => { state.overhang = parseFloat(e.target.value)||2; calc(); });
  calc();
}

function calc() {
  const panelsPerSlope = Math.ceil((state.ridge * 12) / state.panelWidth);
  const totalPanels = panelsPerSlope * state.slopes;

  const totalInches = (state.rafter * 12) + state.overhang;
  const cutFt = Math.floor(totalInches / 12);
  const cutIn = Math.round(totalInches % 12);

  const totalArea = state.ridge * state.rafter * state.slopes;
  const squares = totalArea / 100;

  // Screws: approx 70 to 80 screws per 100 sq ft (per square) for 36" panels
  const totalScrews = Math.ceil(squares * 80);

  // Ridge cap: only if gable roof
  const ridgeCapFt = state.slopes === 2 ? state.ridge : 0;
  const ridgePieces = state.slopes === 2 ? Math.ceil(ridgeCapFt / 10) : 0;

  // Drip edge: eaves (ridge * slopes) + rakes (rafter * 4 for gable or 2 for shed)
  const rakeCount = state.slopes === 2 ? 4 : 2;
  const dripEdgeFt = (state.ridge * state.slopes) + (state.rafter * rakeCount);

  document.getElementById('totalPanels').textContent = totalPanels;
  document.getElementById('cutLengthText').textContent = `Cut to Exactly ${cutFt} ft ${cutIn} inches each`;
  document.getElementById('screwsCount').textContent = `${totalScrews.toLocaleString()} Screws`;
  document.getElementById('ridgeCap').textContent = `${ridgeCapFt} Linear ft (${ridgePieces} Pieces)`;
  document.getElementById('roofArea').textContent = `${Math.round(totalArea)} sq ft`;
  document.getElementById('roofSquares').textContent = `${squares.toFixed(1)} Squares`;
  document.getElementById('dripEdge').textContent = `${Math.round(dripEdgeFt)} Linear ft`;
  document.getElementById('closureStrips').textContent = `${panelsPerSlope * 2} Strips (3ft)`;
}
window.addEventListener('DOMContentLoaded', init);
