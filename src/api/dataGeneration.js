export const gameDataGeneration = async () => {
  await obaGeneration()
  await baseRunningCaseGeneration()
}
// OBA 데이터 생성
const obaGeneration = async () => {
  // 연도별 wOBA data 불러오기
  const fileName = `../stat_scraper/wOBA.json`
  window.wOBAdata = await import(fileName).then(module => module.default)

  const wOBA_Map = new Map()

  for (const key in window.wOBAdata) {
    wOBA_Map.set(key, window.wOBAdata[key])
  }

  // 모든 연도 평균 wOBA, OZ
  const valuesArray = Array.from(wOBA_Map.values())
  const totalValue = valuesArray.reduce((acc, val) => acc + val, 0)
  window.avgOBA = Math.round(totalValue / wOBA_Map.size * 1000) / 1000
  window.ozByAvgOBA = window.avgOBA / (1 - window.avgOBA)
}

// 베이스러닝 데이터
const baseRunningCaseGeneration = () => {
  const baseCase = ['0,0,0', '1,0,0', '1,1,0', '1,1,1', '1,0,1', '0,1,0', '0,1,1', '0,0,1']

  // 1루타 case
  const singleMap = new Map()
  singleMap.set(baseCase[0], [1, 0, 0, 0])
  singleMap.set(baseCase[1], [1, 1, 0, 0])
  singleMap.set(baseCase[2], [1, 1, 1, 0])
  singleMap.set(baseCase[3], [1, 1, 1, 1])
  singleMap.set(baseCase[4], [1, 1, 0, 1])
  singleMap.set(baseCase[5], [1, 0, 1, 0])
  singleMap.set(baseCase[6], [1, 0, 1, 1])
  singleMap.set(baseCase[7], [1, 0, 0, 1])

  // 2루타 case
  const doubleMap = new Map()
  doubleMap.set(baseCase[0], [0, 1, 0, 0])
  doubleMap.set(baseCase[1], [0, 1, 1, 0])
  doubleMap.set(baseCase[2], [0, 1, 1, 1])
  doubleMap.set(baseCase[3], [0, 1, 1, 2])
  doubleMap.set(baseCase[4], [0, 1, 1, 1])
  doubleMap.set(baseCase[5], [0, 1, 0, 1])
  doubleMap.set(baseCase[6], [0, 1, 0, 2])
  doubleMap.set(baseCase[7], [0, 1, 0, 1])

  // 볼넷 case
  const bbMap = new Map()
  bbMap.set(baseCase[0], [1, 0, 0, 0])
  bbMap.set(baseCase[1], [1, 1, 0, 0])
  bbMap.set(baseCase[2], [1, 1, 1, 0])
  bbMap.set(baseCase[3], [1, 1, 1, 1])
  bbMap.set(baseCase[4], [1, 1, 1, 0])
  bbMap.set(baseCase[5], [1, 1, 0, 0])
  bbMap.set(baseCase[6], [1, 1, 1, 0])
  bbMap.set(baseCase[7], [1, 0, 1, 0])

  window.singleCase = singleMap
  window.doubleCase = doubleMap
  window.bbCase = bbMap
}

export const gameData = {
  inning: 1,
  homeInfo: {
    batter: 0,
    pitcher: 10,
    score: 0,
    hit: 0,
    bb: 0,
    pitcherCount: 0,
    batterReport: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []},
    pitcherReport: {10: null, 11: null, 12: null},
    pitcherK: 0,
    pitcherLostScore: 0,
    lineUp: 'home',
  },
  awayInfo: {
    batter: 0,
    pitcher: 10,
    score: 0,
    hit: 0,
    bb: 0,
    pitcherCount: 0,
    batterReport: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []},
    pitcherReport: {10: null, 11: null, 12: null},
    pitcherK: 0,
    pitcherLostScore: 0,
    lineUp: 'away',
  },
  inningScore: {away: [], home: []},
  gameReport: [],
}

export default {
  gameDataGeneration,
}