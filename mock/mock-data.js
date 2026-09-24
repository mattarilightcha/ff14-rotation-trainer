// 自動生成: node mock/build-mock-data.mjs（手で編集しない）
window.MOCK_DATA = {
 "gameVersion": "2026.09.15.0000.0000",
 "extractedAt": "2026-09-24T13:10:10+09:00",
 "job": {
  "abbr": "SAM",
  "name": "侍",
  "icon": "../public/icons/jobs/SAM.png",
  "level": 100
 },
 "actions": {
  "7478": {
   "id": 7478,
   "name": "陣風",
   "desc": "対象に物理攻撃。　威力：140\nコンボ条件：暁風　コンボ時威力：300\nコンボボーナス：自身に「風月」を付与する。\n効果時間：40秒\n風月効果：自身の与ダメージを13％上昇させる。\nコンボボーナス：「剣気」を5上昇させる。",
   "icon": "../public/icons/actions/003152.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7477,
    36963
   ],
   "preservesCombo": false,
   "level": 4
  },
  "7479": {
   "id": 7479,
   "name": "士風",
   "desc": "対象に物理攻撃。　威力：140\nコンボ条件：暁風　コンボ時威力：300\nコンボボーナス：自身に「風花」を付与する。\n効果時間：40秒\n風花効果：自身のオートアタックの攻撃間隔と、ウェポンスキルおよび魔法のキャストタイムとリキャストタイムを13％短縮させる。\nコンボボーナス：「剣気」を5上昇させる。",
   "icon": "../public/icons/actions/003156.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7477,
    36963
   ],
   "preservesCombo": false,
   "level": 18
  },
  "7480": {
   "id": 7480,
   "name": "雪風",
   "desc": "対象に物理攻撃。　威力：160\nコンボ条件：暁風　コンボ時威力：340\nコンボボーナス：「剣気」を15上昇させ、かつ「雪の閃」を付与する。",
   "icon": "../public/icons/actions/003166.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7477,
    36963
   ],
   "preservesCombo": false,
   "level": 50
  },
  "7481": {
   "id": 7481,
   "name": "月光",
   "desc": "対象に物理攻撃。　威力：160\n背面攻撃時威力：210\nコンボ条件：陣風　コンボ時威力：370\nコンボ時かつ背面攻撃時威力：420\nコンボボーナス：「剣気」を10上昇させ、かつ「月の閃」を付与する。",
   "icon": "../public/icons/actions/003158.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7478
   ],
   "preservesCombo": false,
   "level": 30
  },
  "7482": {
   "id": 7482,
   "name": "花車",
   "desc": "対象に物理攻撃。　威力：160\n側面攻撃時威力：210\nコンボ条件：士風　コンボ時威力：370\nコンボ時かつ側面攻撃時威力：420\nコンボボーナス：「剣気」を10上昇させ、かつ「花の閃」を付与する。",
   "icon": "../public/icons/actions/003164.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7479
   ],
   "preservesCombo": false,
   "level": 40
  },
  "7484": {
   "id": 7484,
   "name": "満月",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\nコンボ条件：風光　コンボ時威力：120\nコンボボーナス：自身に「風月」を付与する。\n効果時間：40秒\n風月効果：自身の与ダメージを13％上昇させる。\nコンボボーナス：「剣気」を10上昇させ、かつ「月の閃」を付与する。",
   "icon": "../public/icons/actions/003163.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7483,
    25780
   ],
   "preservesCombo": false,
   "level": 35
  },
  "7485": {
   "id": 7485,
   "name": "桜花",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\nコンボ条件：風光　コンボ時威力：120\nコンボボーナス：自身に「風花」を付与する。\n効果時間：40秒\n風花効果：自身のオートアタックの攻撃間隔と、ウェポンスキルおよび魔法のキャストタイムとリキャストタイムを13％短縮させる。\nコンボボーナス：「剣気」を10上昇させ、かつ「花の閃」を付与する。",
   "icon": "../public/icons/actions/003165.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7483,
    25780
   ],
   "preservesCombo": false,
   "level": 45
  },
  "7486": {
   "id": 7486,
   "name": "燕飛",
   "desc": "対象に遠隔物理攻撃。　威力：100\n燕飛効果アップ時威力：270\n追加効果：「剣気」を10上昇させる。",
   "icon": "../public/icons/actions/003155.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 15
  },
  "7487": {
   "id": 7487,
   "name": "乱れ雪月花",
   "desc": "対象に物理攻撃。　威力：680\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：自身に「閃」が3種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が乱れ雪月花に変化する。",
   "icon": "../public/icons/actions/003162.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 50
  },
  "7488": {
   "id": 7488,
   "name": "天下五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：300\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：自身に「閃」が2種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が天下五剣に変化する。",
   "icon": "../public/icons/actions/003161.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 40
  },
  "7489": {
   "id": 7489,
   "name": "彼岸花",
   "desc": "対象に物理攻撃。　威力：200\n追加効果：対象に継続ダメージを付与する。\n威力：50　効果時間：60秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：自身に「閃」が1種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が彼岸花に変化する。",
   "icon": "../public/icons/actions/003160.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 30
  },
  "7490": {
   "id": 7490,
   "name": "必殺剣・震天",
   "desc": "対象に物理攻撃。　威力：250\n発動条件：「剣気」25",
   "icon": "../public/icons/actions/003173.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 1000,
   "cooldownGroup": 2,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 52
  },
  "7491": {
   "id": 7491,
   "name": "必殺剣・九天",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\n発動条件：「剣気」25",
   "icon": "../public/icons/actions/003174.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 1000,
   "cooldownGroup": 1,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 62
  },
  "7492": {
   "id": 7492,
   "name": "必殺剣・暁天",
   "desc": "対象に急接近して物理攻撃。　威力：100\n発動条件：「剣気」10\nバインド中は実行不可。",
   "icon": "../public/icons/actions/003169.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 5000,
   "cooldownGroup": 5,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 54
  },
  "7493": {
   "id": 7493,
   "name": "必殺剣・夜天",
   "desc": "対象に物理攻撃。　威力：100\n追加効果：10m後方へ飛び退く。\n追加効果：自身に「燕飛効果アップ」を付与する。\n効果時間：15秒\n発動条件：「剣気」10\nバインド中は実行不可。",
   "icon": "../public/icons/actions/003170.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 10000,
   "cooldownGroup": 6,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 56
  },
  "7495": {
   "id": 7495,
   "name": "葉隠",
   "desc": "自身に付与されている閃を「剣気」に変換する。\n付与されている閃ひとつにつき「剣気」が10上昇する。\n発動条件：「雪の閃」「月の閃」「花の閃」のいずれかが付与されている",
   "icon": "../public/icons/actions/003176.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 5000,
   "cooldownGroup": 4,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 68
  },
  "7496": {
   "id": 7496,
   "name": "必殺剣・紅蓮",
   "desc": "対象に向かって前方直線範囲物理攻撃。　威力：400\n発動条件：「剣気」25\nリキャストタイマーを「必殺剣・閃影」と共有する。",
   "icon": "../public/icons/actions/003177.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 22,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 70
  },
  "7497": {
   "id": 7497,
   "name": "黙想",
   "desc": "黙想を行い徐々に「剣気」を上昇させる。　効果時間：15秒\n追加効果：自身に「剣圧」を継続的に付与する。\n最大スタック数：3　効果時間：永続\n効果時間中にアクションの実行や移動・ターンを行うと、黙想は即座に解除される。\n実行後にオートアタックを停止する。\n非戦闘中に使用した場合は「剣気」は上昇せず、「剣圧」も付与されない。\nこのアビリティには固有のリキャストタイムに加えて、ウェポンスキルと同様のリキャストタイムも発生する。",
   "icon": "../public/icons/actions/003172.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 60000,
   "cooldownGroup": 13,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 60
  },
  "7499": {
   "id": 7499,
   "name": "明鏡止水",
   "desc": "一定時間、ウェポンスキルのコンボを、その条件を満たしていなくても成功させる。\nまた、月光を命中させると「風月」が、花車を命中させると「風花」が自身に付与される。\n効果時間が経過するか、居合術および奥義波切を除くウェポンスキルを3回実行すると効果が切れる。　効果時間：20秒\n追加効果：自身に「天道」を付与する。\n効果時間：30秒\n最大チャージ数：2",
   "icon": "../public/icons/actions/003167.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 55000,
   "cooldownGroup": 19,
   "maxCharges": 1,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 50
  },
  "7541": {
   "id": 7541,
   "name": "内丹",
   "desc": "自身のＨＰを回復する。　回復力：800",
   "icon": "../public/icons/actions/000821.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 50,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 8
  },
  "7542": {
   "id": 7542,
   "name": "ブラッドバス",
   "desc": "一定時間、自身の物理攻撃に、与えたダメージの一部をＨＰとして吸収する効果を付与する。　効果時間：20秒",
   "icon": "../public/icons/actions/000823.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 90000,
   "cooldownGroup": 47,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 12
  },
  "7546": {
   "id": 7546,
   "name": "トゥルーノース",
   "desc": "一定時間、方向指定条件のあるアクションをどの方向から実行しても成功させる。　効果時間：10秒\n最大チャージ数：2",
   "icon": "../public/icons/actions/000830.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 45000,
   "cooldownGroup": 46,
   "maxCharges": 2,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 50
  },
  "7548": {
   "id": 7548,
   "name": "アームズレングス",
   "desc": "一定時間、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒\n追加効果：効果中に自身が物理攻撃を受けると、攻撃者に20％スロウを付与する。　効果時間：15秒",
   "icon": "../public/icons/actions/000822.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 49,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 32
  },
  "7549": {
   "id": 7549,
   "name": "牽制",
   "desc": "一定時間、対象の与物理ダメージを10％、与魔法ダメージを5％減少させる。　効果時間：15秒",
   "icon": "../public/icons/actions/000828.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 90000,
   "cooldownGroup": 48,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 22
  },
  "7863": {
   "id": 7863,
   "name": "レッグスウィープ",
   "desc": "対象をスタンさせる。　効果時間：3秒",
   "icon": "../public/icons/actions/000824.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 40000,
   "cooldownGroup": 44,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 10
  },
  "7867": {
   "id": 7867,
   "name": "居合術",
   "desc": "自身に付与されている閃の数に応じた居合術を発動する。\n閃が1種類：「彼岸花」を発動する。\n閃が2種類：「天下五剣」を発動する。\n閃が3種類：「乱れ雪月花」を発動する。\n自身に「天道」が付与されている場合は、天下五剣が天道五剣に、乱れ雪月花が天道雪月花にそれぞれ変化する。",
   "icon": "../public/icons/actions/003159.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 30
  },
  "16481": {
   "id": 16481,
   "name": "必殺剣・閃影",
   "desc": "対象に物理攻撃。　威力：800\n発動条件：「剣気」25\nリキャストタイマーを「必殺剣・紅蓮」と共有する。",
   "icon": "../public/icons/actions/003178.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 22,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 72
  },
  "16482": {
   "id": 16482,
   "name": "意気衝天",
   "desc": "「剣気」を50上昇させる。\n追加効果：自身に「奥義波切実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「残心実行可」を付与する。\n効果時間：30秒\n発動条件：自身が戦闘状態",
   "icon": "../public/icons/actions/003179.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 20,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 68
  },
  "16483": {
   "id": 16483,
   "name": "燕返し",
   "desc": "直前に実行した居合術を再発動する。\nただし、彼岸花を除く。\n発動条件：「燕返し実行可」効果中",
   "icon": "../public/icons/actions/003180.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 74
  },
  "16485": {
   "id": 16485,
   "name": "返し五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：300\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが返し五剣に変化する。",
   "icon": "../public/icons/actions/003182.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 74
  },
  "16486": {
   "id": 16486,
   "name": "返し雪月花",
   "desc": "対象に物理攻撃。　威力：680\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが返し雪月花に変化する。",
   "icon": "../public/icons/actions/003183.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 74
  },
  "16487": {
   "id": 16487,
   "name": "照破",
   "desc": "対象に向かって前方直線範囲物理攻撃。　威力：640\n2体目以降の対象への威力は40％減少する。\n実行時に「剣圧」を全て消費する。\n発動条件：「剣圧」3\n「剣圧」は自身が戦闘状態で「黙想」「居合術」「奥義波切」を実行すると付与される。\n最大スタック数：3　効果時間：永続",
   "icon": "../public/icons/actions/003184.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 15000,
   "cooldownGroup": 8,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 80
  },
  "25780": {
   "id": 25780,
   "name": "風光",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\n追加効果：「剣気」を10上昇させる。",
   "icon": "../public/icons/actions/003189.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": false,
   "level": 86
  },
  "25781": {
   "id": 25781,
   "name": "奥義波切",
   "desc": "対象に向かって前方扇範囲物理攻撃。　威力：1000\n2体目以降の対象への威力は40％減少する。\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：「奥義波切実行可」効果中\nこのアクションを実行すると「返し波切」に変化する。",
   "icon": "../public/icons/actions/003187.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 90
  },
  "25782": {
   "id": 25782,
   "name": "返し波切",
   "desc": "対象に向かって前方扇範囲物理攻撃。　威力：1000\n2体目以降の対象への威力は40％減少する。\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと奥義波切が返し波切に変化する。",
   "icon": "../public/icons/actions/003188.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 90
  },
  "36962": {
   "id": 36962,
   "name": "天眼通",
   "desc": "効果時間中に受ける1回の攻撃のダメージを10％軽減する。\n効果時間：4秒\n追加効果：天眼通に成功すると「剣気」が10上昇し、さらに「天眼通：生」に変化する。　効果時間：9秒\n天眼通：生効果：自身の被ダメージを10％軽減する。\nさらに、自身のＨＰを継続回復する。　回復力：200",
   "icon": "../public/icons/actions/003190.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 15000,
   "cooldownGroup": 7,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 82
  },
  "36963": {
   "id": 36963,
   "name": "暁風",
   "desc": "対象に物理攻撃。　威力：240\n追加効果：「剣気」を5上昇させる。",
   "icon": "../public/icons/actions/003191.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": false,
   "level": 92
  },
  "36964": {
   "id": 36964,
   "name": "残心",
   "desc": "対象に向かって前方扇範囲物理攻撃。　威力：940\n2体目以降の対象への威力は40％減少する。\n発動条件：「残心実行可」効果中かつ「剣気」50",
   "icon": "../public/icons/actions/003192.png",
   "isGcd": false,
   "castMs": 0,
   "recastMs": 1000,
   "cooldownGroup": 3,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 96
  },
  "36965": {
   "id": 36965,
   "name": "天道五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：410\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：「天道」効果中かつ自身に「閃」が2種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が天道五剣に変化する。",
   "icon": "../public/icons/actions/003193.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100
  },
  "36966": {
   "id": 36966,
   "name": "天道雪月花",
   "desc": "対象に物理攻撃。　威力：1100\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：「天道」効果中かつ自身に「閃」が3種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が天道雪月花に変化する。",
   "icon": "../public/icons/actions/003194.png",
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100
  },
  "36967": {
   "id": 36967,
   "name": "天道返し五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：410\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが天道返し五剣に変化する。",
   "icon": "../public/icons/actions/003195.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100
  },
  "36968": {
   "id": 36968,
   "name": "天道返し雪月花",
   "desc": "対象に物理攻撃。　威力：1100\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが天道返し雪月花に変化する。",
   "icon": "../public/icons/actions/003196.png",
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100
  }
 },
 "statuses": {
  "2959": {
   "id": 2959,
   "name": "奥義波切実行可",
   "icon": "../public/icons/statuses/213313.png"
  },
  "3855": {
   "id": 3855,
   "name": "残心実行可",
   "icon": "../public/icons/statuses/213318.png"
  },
  "3856": {
   "id": 3856,
   "name": "天道",
   "icon": "../public/icons/statuses/213319.png"
  }
 },
 "bars": {
  "hb1": [
   {
    "kind": "action",
    "id": 36963,
    "from": 7477
   },
   {
    "kind": "action",
    "id": 7478
   },
   {
    "kind": "action",
    "id": 7479
   },
   {
    "kind": "action",
    "id": 7480
   },
   {
    "kind": "action",
    "id": 7486
   },
   {
    "kind": "action",
    "id": 7490
   },
   {
    "kind": "action",
    "id": 7499
   },
   {
    "kind": "action",
    "id": 7497
   },
   {
    "kind": "action",
    "id": 7495
   },
   {
    "kind": "action",
    "id": 16481
   },
   {
    "kind": "action",
    "id": 7867
   },
   {
    "kind": "action",
    "id": 16487
   }
  ],
  "hb2": [
   {
    "kind": "action",
    "id": 25780,
    "from": 7483
   },
   {
    "kind": "action",
    "id": 7484
   },
   {
    "kind": "action",
    "id": 7485
   },
   {
    "kind": "action",
    "id": 7491
   },
   null,
   null,
   {
    "kind": "action",
    "id": 7548
   },
   null,
   null,
   {
    "kind": "action",
    "id": 7496
   },
   {
    "kind": "action",
    "id": 16483
   },
   {
    "kind": "action",
    "id": 7492
   }
  ],
  "hb3": [
   {
    "kind": "action",
    "id": 25781
   },
   {
    "kind": "action",
    "id": 7481
   },
   {
    "kind": "action",
    "id": 7482
   },
   {
    "kind": "other",
    "type": 2
   },
   null,
   null,
   {
    "kind": "action",
    "id": 7867
   },
   {
    "kind": "action",
    "id": 16482
   },
   {
    "kind": "other",
    "type": 2
   },
   null,
   null,
   null
  ],
  "hb4": [
   {
    "kind": "action",
    "id": 7542
   },
   {
    "kind": "action",
    "id": 7863
   },
   {
    "kind": "action",
    "id": 7549
   },
   {
    "kind": "other",
    "type": 10
   },
   {
    "kind": "action",
    "id": 7493
   },
   null,
   {
    "kind": "action",
    "id": 7546
   },
   {
    "kind": "action",
    "id": 36962,
    "from": 7498
   },
   {
    "kind": "action",
    "id": 7541
   },
   {
    "kind": "other",
    "type": 10
   },
   null,
   {
    "kind": "other",
    "type": 17
   }
  ],
  "xhb1": [
   {
    "kind": "action",
    "id": 7481
   },
   {
    "kind": "action",
    "id": 7867
   },
   {
    "kind": "action",
    "id": 7549
   },
   {
    "kind": "action",
    "id": 25780,
    "from": 7483
   },
   {
    "kind": "other",
    "type": 10
   },
   {
    "kind": "other",
    "type": 10
   },
   {
    "kind": "other",
    "type": 10
   },
   {
    "kind": "other",
    "type": 10
   },
   {
    "kind": "action",
    "id": 7486
   },
   {
    "kind": "action",
    "id": 7479
   },
   {
    "kind": "action",
    "id": 7863
   },
   {
    "kind": "action",
    "id": 7542
   },
   {
    "kind": "action",
    "id": 36962,
    "from": 7498
   },
   {
    "kind": "action",
    "id": 7541
   },
   {
    "kind": "action",
    "id": 36963,
    "from": 7477
   },
   {
    "kind": "action",
    "id": 7478
   }
  ],
  "xhb2": [
   {
    "kind": "missing",
    "id": 7501
   },
   {
    "kind": "action",
    "id": 7495
   },
   {
    "kind": "action",
    "id": 7490
   },
   {
    "kind": "action",
    "id": 7491
   },
   {
    "kind": "missing",
    "id": 7502
   },
   {
    "kind": "action",
    "id": 7497
   },
   {
    "kind": "action",
    "id": 7492
   },
   {
    "kind": "action",
    "id": 7493
   },
   {
    "kind": "action",
    "id": 7546
   },
   {
    "kind": "missing",
    "id": 7494
   },
   {
    "kind": "action",
    "id": 7480
   },
   {
    "kind": "action",
    "id": 7499
   },
   {
    "kind": "action",
    "id": 7482
   },
   {
    "kind": "action",
    "id": 7485
   },
   {
    "kind": "action",
    "id": 7548
   },
   {
    "kind": "action",
    "id": 7484
   }
  ],
  "xhb3": [
   null,
   null,
   null,
   null,
   null,
   null,
   null,
   null,
   null,
   null,
   {
    "kind": "action",
    "id": 16487
   },
   {
    "kind": "action",
    "id": 25781
   },
   {
    "kind": "action",
    "id": 16481
   },
   {
    "kind": "action",
    "id": 16483
   },
   {
    "kind": "action",
    "id": 16482
   },
   {
    "kind": "action",
    "id": 7496
   }
  ]
 },
 "unplaced": [
  36964
 ]
};
