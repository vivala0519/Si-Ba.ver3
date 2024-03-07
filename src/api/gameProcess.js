import { gameDataGeneration, gameData } from "./dataGeneration.js";
import { choiceByWeight, extractRunResult, extractOutResult, randomPitchCount } from "./randomByProbability.js";

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

// 투수 vs 타자 대결 func.
const singleCombat = (batter, pitcher) => {
    // console.log(batter, pitcher)
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

// inning 진행 func.
const inningProcess = (attacker, defender, inning, scoreList, gameReport, topBottom) => {
    let out = 0
    let base = [0, 0, 0]
    let inningScore = 0
    const report = gameReport

    while (out < 3) {
        const batterNum = attacker.batter
        const batter = attacker.lineUp[batterNum]
        const pitcherNum = defender.pitcher
        const pitcher = defender.lineUp[pitcherNum]

        const result = singleCombat(batter, pitcher)
        // console.log(result);

        attacker.batterReport[batterNum].push(result.data)

        // 투구 수 추가
        const addPitchCount = randomPitchCount(result)
        defender.pitcherCount += addPitchCount

        // hit or out
        if (result.type === 'hit') {
            // console.log(result);
            const runningResult = baseRunning(base, result.data)
            // console.log(runningResult)
            // 잔루
            base = runningResult.slice(0, 3)
            if (result.data === '볼넷') {
                attacker.bb += 1
            } else {
                attacker.hit += 1
            }

            const score = runningResult[3]
            attacker.score += score // 공격 팀 득점 추가
            inningScore += score
            defender.pitcherLostScore += score // 투수 실점 추가
            if (scoreList[inning - 1] === undefined) {
                scoreList.push(score)
            } else {
                scoreList[inning - 1] += score
            }
            report.push({
                inning: inning,
                topBottom: topBottom,
                number: attacker.batter,
                base: base,
                inningScore: inningScore,
                result: result.data,
                totalScore: attacker.score,
                totalHit: attacker.hit,
                totalBB: attacker.bb,
                out: out,
                pitcherNum: defender.pitcher,
                pitcherCount: defender.pitcherCount,
                lostScore: defender.pitcherLostScore
            })
            // console.log(attacker);
        } else {
            if (result.data === '삼진') {
                defender.pitcherK += 1
            }
            out += 1
            report.push({
                inning: inning,
                topBottom: topBottom,
                number: attacker.batter,
                result: result.data,
                pitcherNum: defender.pitcher,
                k: defender.pitcherK,
                out: out,
                pitcherCount: defender.pitcherCount,
                lostScore: defender.pitcherLostScore
            })
        }

        // 다음 타자
        attacker.batter += 1
        if (attacker.batter === 9) {
            attacker.batter = 0
        }

        // 조건에 따른 투수 교체
        if (defender.pitcher < 12 && (defender.pitcherLostScore > 4 || defender.pitcherCount > 100)) {
            defender.pitcherReport[defender.pitcher] = {count: defender.pitcherCount, lostScore: defender.pitcherLostScore, k: defender.pitcherK}
            defender.pitcher += 1
            defender.pitcherCount = 0
            defender.pitcherLostScore = 0
            defender.pitcherK = 0
            // console.log('pitcher changed-----------------------------------');
            report.push({inning: inning, topBottom: topBottom, number: defender.pitcher, changed: true})
        }
    }
    if (scoreList[inning - 1] === undefined) {
        scoreList.push(0)
    }
}

// game 진행 func.
export const gameProcess = async (home, away) => {
    await gameDataGeneration()

    let inning = 1

    const { homeInfo, awayInfo, inningScore, gameReport } = gameData

    homeInfo.lineUp = home
    awayInfo.lineUp = away

    for (inning; inning < 10; inning++) {
        // away 공격 / home 수비
        // console.log(inning, '회 초');
        inningProcess(awayInfo, homeInfo, inning, inningScore.away, gameReport, 'top')
        // 마지막 투수 report 기록
        if (inning === 9 && !homeInfo.pitcherReport[homeInfo.pitcher]) {
            homeInfo.pitcherReport[homeInfo.pitcher] = {count: homeInfo.pitcherCount, lostScore: homeInfo.pitcherLostScore, k: homeInfo.pitcherK}
        }
        // console.log(inning, '회 말');
        // home 공격 / away 수비
        // 9회말 진행 조건
        if (inning === 9 && awayInfo.score < homeInfo.score) {
            awayInfo.pitcherReport[awayInfo.pitcher] = {count: awayInfo.pitcherCount, lostScore: awayInfo.pitcherLostScore, k: awayInfo.pitcherK}
        } else {
            inningProcess(homeInfo, awayInfo, inning, inningScore.home, gameReport, 'bottom')
            // 마지막 투수 report 기록
            if (inning === 9 && !awayInfo.pitcherReport[awayInfo.pitcher]) {
                awayInfo.pitcherReport[awayInfo.pitcher] = {count: awayInfo.pitcherCount, lostScore: awayInfo.pitcherLostScore, k: awayInfo.pitcherK}
            }
        }
    }
    return {report: gameReport, scoreRecord: inningScore, info: {home: homeInfo, away: awayInfo}}
}