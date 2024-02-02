// OBA 데이터 생성 func.
const obaGeneration = async () => {
    // 연도별 wOBA data 불러오기
    const fileName = `../stat_scraper/wOBA.json`
    window.wOBAdata = await import(fileName).then(module => module.default)

    const wOBA_Map = new Map();

    for (const key in window.wOBAdata) {
        wOBA_Map.set(key, window.wOBAdata[key]);
    }

    // 모든 연도 평균 wOBA, OZ
    const valuesArray = Array.from(wOBA_Map.values())
    const totalValue = valuesArray.reduce((acc, val) => acc + val, 0)
    window.avgOBA = Math.round(totalValue / wOBA_Map.size * 1000) / 1000
    window.ozByAvgOBA = window.avgOBA / (1 - window.avgOBA)
}


// inning 진행 func.
const inningProcess = (attacker, defencer) => {
    let out = 0
    const base = [0, 0, 0]

    while (out < 3) {
        const batterNum = attacker.batter
        const batter = attacker.lineUp[batterNum]
        const pitcherNum = defencer.pitcher
        const pitcher = defencer.lineUp[pitcherNum]

        const result = singleCombat(batter, pitcher)
        if (result === 'hit') {
            // console.log('hit');
        } else {
            out += 1
        }
        // console.log('end out: ', out)
    }
}

const choiceByWeight = (options, weights) => {
    // 총합이 1이 되도록 정규화
    const totalRate = weights.reduce((acc, rate) => acc + rate, 0)
    const normalizedRate = weights.map(rate => rate / totalRate)

    // 가중치를 고려한 랜덤 인덱스 생성
    const weightedRandomIndex = (weights) => {
        const randomValue = Math.random();
        let cumulativeWeight = 0
        
        for (let i = 0; i < weights.length; i++) {
            cumulativeWeight += weights[i]
            if (randomValue <= cumulativeWeight) {
            return i
            }
        }
        
        // 가중치 합이 1이 아니면 마지막 인덱스를 반환
        return weights.length - 1
    }
    
    const defIndex = weightedRandomIndex(normalizedRate)
    return defIndex
}

// 타자 데이터에 따른 hit result 도출 func.
const extractRunResult = ( batter ) => {
    const {one_hit, double_hit, triple_hit, home_run, BB} = batter
    const hit = Number(one_hit) + Number(double_hit) + Number(triple_hit) + Number(home_run) + Number(BB);

    const hitKind = ['안타', '2루타', '3루타', '홈런', '볼넷'];
    const runRate = [one_hit / hit, double_hit / hit, triple_hit / hit, home_run / hit, BB / hit];
    // console.log(runRate)

    const runResult = hitKind[choiceByWeight(hitKind, runRate)];
    console.log(runResult)
}

// out result 도출 func.
const extractOutResult = () => {
    const outKind = ['삼진', '땅볼', '뜬공'];
    const outRate = [0.33333334, 0.33333333, 0.3333333];

    const outResult = outKind[choiceByWeight(outKind, outRate)];
    console.log(outResult);
    return outResult;
}

// 투수 vs 타자 대결 func.
const singleCombat = (batter, pitcher) => {
    console.log(batter, pitcher)
    // 일 대 일 결과 도출을 위해 필요한 데이터
    const batterObp = Number(batter.obp)
    const pitcherObp = Number(pitcher.obp)
    const batterLeagueObp = window.wOBAdata[batter.year] // 타자의 해당 연도 리그 평균 obp
    const pitcherLeagueObp = window.wOBAdata[pitcher.year] // 투수의 해당 연도 리그 평균 obp

    const batterOz = batterObp / (1 - batterObp)
    const pitcherOz = (1 - pitcherObp) / pitcherObp
    const batterLeagueObpOz = batterLeagueObp / (1 - batterLeagueObp)
    const pitcherLeagueObpOz = (1 - pitcherLeagueObp) / pitcherLeagueObp
    const vsOz = ((batterOz / batterLeagueObpOz) / (pitcherOz / pitcherLeagueObpOz)) * window.ozByAvgOBA
    const vsObp = Math.round((vsOz / (1 + vsOz)) * 1000) / 1000

    const hitOrOut = ['출루', '아웃']
    const hitRate = [vsObp, 1 - vsObp]
    const vsResult = hitOrOut[choiceByWeight(hitOrOut, hitRate)]

    // 출루면 타자의 데이터로 안타 종류 추출, 아웃이면 동일 확률로 아웃 종류 추출
    if (vsResult === '출루') {
        extractRunResult(batter)
    } else {
        extractOutResult()
    }
}

// game 진행 func.
export const gameProcess = async (home, away) => {
    console.log(home, away);
    obaGeneration()

    let inning = 1
    // let scoreBoard = ''
    const homeInfo = {
        batter: 0,
        pitcher: 10,
        score: 0,
        hit: 0,
        bb: 0,
        pitcherCount: 0,
        batterReport: '',
        pitcherReport: '',
        pitcherK: '',
        pitcherLostScore: '',
        lineUp: home,
    }
    const awayInfo = {
        batter: 0,
        pitcher: 10,
        score: 0,
        hit: 0,
        bb: 0,
        pitcherCount: 0,
        batterReport: '',
        pitcherReport: '',
        pitcherK: '',
        pitcherLostScore: '',
        lineUp: away,
    }

    for (inning; inning < 2; inning++) {
        // away 공격 / home 수비
        inningProcess(awayInfo, homeInfo)
        // home 공격 / away 수비
        // inningProcess(homeInfo, awayInfo)
    }
}