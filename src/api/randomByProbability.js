export const choiceByWeight = (options, weights) => {
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
export const extractRunResult = ( batter ) => {
  const {one_hit, double_hit, triple_hit, home_run, BB} = batter
  const hit = Number(one_hit) + Number(double_hit) + Number(triple_hit) + Number(home_run) + Number(BB)

  const hitKind = ['안타', '2루타', '3루타', '홈런', '볼넷']
  const runRate = [one_hit / hit, double_hit / hit, triple_hit / hit, home_run / hit, BB / hit]

  return choiceByWeight(hitKind, runRate)
}

// out result 도출 func.
export const extractOutResult = () => {
  const outKind = ['삼진', '땅볼', '뜬공']
  const outRate = [0.33333334, 0.33333333, 0.3333333]

  return choiceByWeight(outKind, outRate)
}

// 투구 수 도출 func. : 1~10구 동일 확률
export const randomPitchCount = (result) => {
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

export default {
  choiceByWeight,
  extractRunResult,
  extractOutResult,
  randomPitchCount,
}