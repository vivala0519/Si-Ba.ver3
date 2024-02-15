// OBA 데이터 생성 func.
const gameDataGeneration = async () => {
    await obaGeneration()
    await baseRunningCaseGeneration()
}

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

const baseRunning = (beforeBase, data) => {
    const stringifiedBase = String(beforeBase)
    if (data === '볼넷') {
        return window.bbCase.get(stringifiedBase)
    }
    if (data === '안타') {
        return window.singleCase.get(stringifiedBase)
    }
    if (data === '2루타') {
        return window.doubleCase.get(stringifiedBase)
    }
    const sum = beforeBase.reduce((acc, currentValue) => acc + currentValue, 0);
    if (data === '3루타') {
        return [0, 0, 1, sum]
    }
    if (data === '홈런') {
        return [0, 0, 0, sum + 1]
    }
}

const randomPitchCount = (result) => {
    let countType = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let rate = [0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.07, 0.07, 0.07, 0.07]

    if (result.data === '삼진') {
        countType = [3, 4, 5, 6, 7, 8, 9, 10]
        rate = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]
    }
    if (result.data === '볼넷') {
        countType = [4, 5, 6, 7, 8, 9, 10]
        rate = [0.16, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14]
    }
    
    return choiceByWeight(countType, rate)
}

// inning 진행 func.
const inningProcess = (attacker, defencer, inning, scoreList) => {
    let out = 0
    let base = [0, 0, 0]

    while (out < 3) {
        const batterNum = attacker.batter
        const batter = attacker.lineUp[batterNum]
        const pitcherNum = defencer.pitcher
        const pitcher = defencer.lineUp[pitcherNum]

        const result = singleCombat(batter, pitcher)
        
        attacker.batterReport[batterNum].push(result.data)

        console.log(result);
        if (result.type === 'hit') {
            console.log(result);
            const runningResult = baseRunning(base, result.data)
            console.log(runningResult)
            // 잔루
            base = runningResult.slice(0, 3)
            if (result.data === '볼넷') {
                attacker.bb += 1
            } else {
                attacker.hit += 1
            }
            
            const score = runningResult[3]
            attacker.score += score // 공격 팀 득점 추가
            defencer.pitcherLostScore += score // 투수 실점 추가
            if (scoreList[inning - 1] === undefined) {
                scoreList.push(score)
            } else {
                scoreList[inning - 1] += score
            }
            console.log(attacker);
        } else {
            console.log(result);
            if (result.data === '삼진') {
                defencer.pitcherK += 1
            }
            out += 1
        }
        
        // 다음 타자
        attacker.batter += 1
        if (attacker.batter === 9) {
            attacker.batter = 0
        }

        // 투구 수 추가
        const addPitchCount = randomPitchCount(result)
        defencer.pitcherCount += addPitchCount
        
        // 조건에 따른 투수 교체
        if (defencer.pitcher < 12 && (defencer.pitcherLostScore > 4 || defencer.pitcherCount > 100)) {
            defencer.pitcherReport[defencer.pitcher] = {count: defencer.pitcherCount, lostScore: defencer.pitcherLostScore, k: defencer.pitcherK}
            defencer.pitcher += 1
            defencer.pitcherCount = 0
            defencer.pitcherLostScore = 0
            console.log('pitcher changed-----------------------------------');
        }
    }
    if (scoreList[inning - 1] === undefined) {
        scoreList.push(0)
    }
}

const choiceByWeight = (options, weights) => {
    // 총합이 1이 되도록 정규화
    const totalRate = weights.reduce((acc, rate) => acc + rate, 0)
    const normalizedRate = weights.map(rate => rate / totalRate)

    // 가중치를 고려한 랜덤 인덱스 생성
    const weightedRandomIndex = (weights) => {
        const randomValue = Math.random()
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
    
    return options[weightedRandomIndex(normalizedRate)]
}

// 타자 데이터에 따른 hit result 도출 func.
const extractRunResult = ( batter ) => {
    const {one_hit, double_hit, triple_hit, home_run, BB} = batter
    const hit = Number(one_hit) + Number(double_hit) + Number(triple_hit) + Number(home_run) + Number(BB)

    const hitKind = ['안타', '2루타', '3루타', '홈런', '볼넷']
    const runRate = [one_hit / hit, double_hit / hit, triple_hit / hit, home_run / hit, BB / hit]
    // console.log(runRate)

    // const runResult = hitKind[choiceByWeight(hitKind, runRate)]
    // console.log(runResult)
    return choiceByWeight(hitKind, runRate)
}

// out result 도출 func.
const extractOutResult = () => {
    const outKind = ['삼진', '땅볼', '뜬공']
    const outRate = [0.33333334, 0.33333333, 0.3333333]

    // const outResult = outKind[choiceByWeight(outKind, outRate)];
    // console.log(outResult);
    return choiceByWeight(outKind, outRate)
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
    const vsResult = choiceByWeight(hitOrOut, hitRate)

    // 출루면 타자의 데이터로 안타 종류 추출, 아웃이면 동일 확률로 아웃 종류 추출
    if (vsResult === '출루') {
        const runResult = extractRunResult(batter)
        const result = {type: 'hit', data: runResult}
        return result
    } else {
        const outResult = extractOutResult()
        const result = {type: 'out', data: outResult}
        return result
    }
}

// game 진행 func.
export const gameProcess = async (home, away) => {
    console.log(home, away);
    await gameDataGeneration()

    let inning = 1
    // let scoreBoard = ''
    const homeInfo = {
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
        lineUp: home,
    }
    const awayInfo = {
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
        lineUp: away,
    }
    const inningScore = {away: [], home: []}

    for (inning; inning < 10; inning++) {
        // away 공격 / home 수비
        console.log(inning, '회 초');
        inningProcess(awayInfo, homeInfo, inning, inningScore.away)
        // 마지막 투수 report 기록
        if (inning === 9 && !homeInfo.pitcherReport[homeInfo.pitcher]) {
            homeInfo.pitcherReport[homeInfo.pitcher] = {count: homeInfo.pitcherCount, lostScore: homeInfo.pitcherLostScore, k: homeInfo.pitcherK}
        }
        // home 공격 / away 수비
        console.log(inning, '회 말');
        inningProcess(homeInfo, awayInfo, inning, inningScore.home)
        if (inning === 9 && !awayInfo.pitcherReport[awayInfo.pitcher]) {
            awayInfo.pitcherReport[awayInfo.pitcher] = {count: awayInfo.pitcherCount, lostScore: awayInfo.pitcherLostScore, k: awayInfo.pitcherK}
        }
    }
    console.log(homeInfo, awayInfo);
    console.log(inningScore)
}