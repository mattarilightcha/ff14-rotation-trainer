// 自動生成: node mock/build-mock-data.mjs（手で編集しない）
window.MOCK_DATA = {
 "gameVersion": "2026.09.15.0000.0000",
 "extractedAt": "2026-09-24T16:26:50+09:00",
 "job": {
  "abbr": "SAM",
  "name": "侍",
  "icon": "../public/icons/jobs/SAM.png",
  "level": 100
 },
 "tank": {
  "abbr": "PLD",
  "name": "ナイト",
  "icon": "../public/icons/jobs/PLD.png"
 },
 "actions": {
  "7478": {
   "id": 7478,
   "name": "陣風",
   "desc": "対象に物理攻撃。　威力：140\nコンボ条件：暁風　コンボ時威力：300\nコンボボーナス：自身に「風月」を付与する。\n効果時間：40秒\n風月効果：自身の与ダメージを13％上昇させる。\nコンボボーナス：「剣気」を5上昇させる。",
   "icon": "../public/fankit/battle-pve/06_SAM/Jinpu.png",
   "iconFramed": true,
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
   "level": 4,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 140,
    "combo": 300
   }
  },
  "7479": {
   "id": 7479,
   "name": "士風",
   "desc": "対象に物理攻撃。　威力：140\nコンボ条件：暁風　コンボ時威力：300\nコンボボーナス：自身に「風花」を付与する。\n効果時間：40秒\n風花効果：自身のオートアタックの攻撃間隔と、ウェポンスキルおよび魔法のキャストタイムとリキャストタイムを13％短縮させる。\nコンボボーナス：「剣気」を5上昇させる。",
   "icon": "../public/fankit/battle-pve/06_SAM/Shifu.png",
   "iconFramed": true,
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
   "level": 18,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 140,
    "combo": 300
   }
  },
  "7480": {
   "id": 7480,
   "name": "雪風",
   "desc": "対象に物理攻撃。　威力：160\nコンボ条件：暁風　コンボ時威力：340\nコンボボーナス：「剣気」を15上昇させ、かつ「雪の閃」を付与する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Yukikaze.png",
   "iconFramed": true,
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
   "level": 50,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 160,
    "combo": 340
   }
  },
  "7481": {
   "id": 7481,
   "name": "月光",
   "desc": "対象に物理攻撃。　威力：160\n背面攻撃時威力：210\nコンボ条件：陣風　コンボ時威力：370\nコンボ時かつ背面攻撃時威力：420\nコンボボーナス：「剣気」を10上昇させ、かつ「月の閃」を付与する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Gekko.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7478
   ],
   "preservesCombo": false,
   "level": 30,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": "rear",
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 160,
    "rear": 210,
    "combo": 370,
    "comboRear": 420
   }
  },
  "7482": {
   "id": 7482,
   "name": "花車",
   "desc": "対象に物理攻撃。　威力：160\n側面攻撃時威力：210\nコンボ条件：士風　コンボ時威力：370\nコンボ時かつ側面攻撃時威力：420\nコンボボーナス：「剣気」を10上昇させ、かつ「花の閃」を付与する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Kasha.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [
    7479
   ],
   "preservesCombo": false,
   "level": 40,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": "flank",
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 160,
    "flank": 210,
    "combo": 370,
    "comboFlank": 420
   }
  },
  "7484": {
   "id": 7484,
   "name": "満月",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\nコンボ条件：風光　コンボ時威力：120\nコンボボーナス：自身に「風月」を付与する。\n効果時間：40秒\n風月効果：自身の与ダメージを13％上昇させる。\nコンボボーナス：「剣気」を10上昇させ、かつ「月の閃」を付与する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Mangetsu.png",
   "iconFramed": true,
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
   "level": 35,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 5,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 100,
    "combo": 120
   }
  },
  "7485": {
   "id": 7485,
   "name": "桜花",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\nコンボ条件：風光　コンボ時威力：120\nコンボボーナス：自身に「風花」を付与する。\n効果時間：40秒\n風花効果：自身のオートアタックの攻撃間隔と、ウェポンスキルおよび魔法のキャストタイムとリキャストタイムを13％短縮させる。\nコンボボーナス：「剣気」を10上昇させ、かつ「花の閃」を付与する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Oka.png",
   "iconFramed": true,
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
   "level": 45,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 5,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 100,
    "combo": 120
   }
  },
  "7486": {
   "id": 7486,
   "name": "燕飛",
   "desc": "対象に遠隔物理攻撃。　威力：100\n燕飛効果アップ時威力：270\n追加効果：「剣気」を10上昇させる。",
   "icon": "../public/fankit/battle-pve/06_SAM/Enpi.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 15,
   "forJob": true,
   "proc": 14,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 20,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 100,
    "cond": [
     {
      "status": "燕飛効果アップ",
      "potency": 270
     }
    ]
   }
  },
  "7487": {
   "id": 7487,
   "name": "乱れ雪月花",
   "desc": "対象に物理攻撃。　威力：680\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：自身に「閃」が3種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が乱れ雪月花に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Midare_Setsugekka.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 50,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 6,
   "crit": true,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 680
   }
  },
  "7488": {
   "id": 7488,
   "name": "天下五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：300\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：自身に「閃」が2種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が天下五剣に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Tenka_Goken.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 40,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 300
   }
  },
  "7489": {
   "id": 7489,
   "name": "彼岸花",
   "desc": "対象に物理攻撃。　威力：200\n追加効果：対象に継続ダメージを付与する。\n威力：50　効果時間：60秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：自身に「閃」が1種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が彼岸花に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Higanbana.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 30,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 6,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 200,
    "dot": {
     "potency": 50,
     "sec": 60
    }
   }
  },
  "7490": {
   "id": 7490,
   "name": "必殺剣・震天",
   "desc": "対象に物理攻撃。　威力：250\n発動条件：「剣気」25",
   "icon": "../public/fankit/battle-pve/06_SAM/Hissatsu_Shinten.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 1000,
   "cooldownGroup": 2,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 52,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 250
   }
  },
  "7491": {
   "id": 7491,
   "name": "必殺剣・九天",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\n発動条件：「剣気」25",
   "icon": "../public/fankit/battle-pve/06_SAM/Hissatsu_Kyuten.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 1000,
   "cooldownGroup": 1,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 62,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 5,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 100
   }
  },
  "7492": {
   "id": 7492,
   "name": "必殺剣・暁天",
   "desc": "対象に急接近して物理攻撃。　威力：100\n発動条件：「剣気」10\nバインド中は実行不可。",
   "icon": "../public/fankit/battle-pve/06_SAM/Hissatsu_Gyoten.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 5000,
   "cooldownGroup": 5,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 54,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 20,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": true,
   "backstep": 0,
   "pot": {
    "base": 100
   }
  },
  "7493": {
   "id": 7493,
   "name": "必殺剣・夜天",
   "desc": "対象に物理攻撃。　威力：100\n追加効果：10m後方へ飛び退く。\n追加効果：自身に「燕飛効果アップ」を付与する。\n効果時間：15秒\n発動条件：「剣気」10\nバインド中は実行不可。",
   "icon": "../public/fankit/battle-pve/06_SAM/Hissatsu_Yaten.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 10000,
   "cooldownGroup": 6,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 56,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 5,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 10,
   "pot": {
    "base": 100
   }
  },
  "7495": {
   "id": 7495,
   "name": "葉隠",
   "desc": "自身に付与されている閃を「剣気」に変換する。\n付与されている閃ひとつにつき「剣気」が10上昇する。\n発動条件：「雪の閃」「月の閃」「花の閃」のいずれかが付与されている",
   "icon": "../public/fankit/battle-pve/06_SAM/Hagakure.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 5000,
   "cooldownGroup": 4,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 68,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7496": {
   "id": 7496,
   "name": "必殺剣・紅蓮",
   "desc": "対象に向かって前方直線範囲物理攻撃。　威力：400\n発動条件：「剣気」25\nリキャストタイマーを「必殺剣・閃影」と共有する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Hissatsu_Guren.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 22,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 70,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 4,
   "hostile": true,
   "range": 10,
   "crit": false,
   "category": 4,
   "effectRange": 10,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 400
   }
  },
  "7497": {
   "id": 7497,
   "name": "黙想",
   "desc": "黙想を行い徐々に「剣気」を上昇させる。　効果時間：15秒\n追加効果：自身に「剣圧」を継続的に付与する。\n最大スタック数：3　効果時間：永続\n効果時間中にアクションの実行や移動・ターンを行うと、黙想は即座に解除される。\n実行後にオートアタックを停止する。\n非戦闘中に使用した場合は「剣気」は上昇せず、「剣圧」も付与されない。\nこのアビリティには固有のリキャストタイムに加えて、ウェポンスキルと同様のリキャストタイムも発生する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Meditate.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 60000,
   "cooldownGroup": 13,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 60,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7499": {
   "id": 7499,
   "name": "明鏡止水",
   "desc": "一定時間、ウェポンスキルのコンボを、その条件を満たしていなくても成功させる。\nまた、月光を命中させると「風月」が、花車を命中させると「風花」が自身に付与される。\n効果時間が経過するか、居合術および奥義波切を除くウェポンスキルを3回実行すると効果が切れる。　効果時間：20秒\n追加効果：自身に「天道」を付与する。\n効果時間：30秒\n最大チャージ数：2",
   "icon": "../public/fankit/battle-pve/06_SAM/Meikyo_Shisui.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 55000,
   "cooldownGroup": 19,
   "maxCharges": 1,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 50,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7541": {
   "id": 7541,
   "name": "内丹",
   "desc": "自身のＨＰを回復する。　回復力：800",
   "icon": "../public/fankit/battle-pve/06_SAM/Role_Actions/Second_Wind.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 50,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 8,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7542": {
   "id": 7542,
   "name": "ブラッドバス",
   "desc": "一定時間、自身の物理攻撃に、与えたダメージの一部をＨＰとして吸収する効果を付与する。　効果時間：20秒",
   "icon": "../public/fankit/battle-pve/06_SAM/Role_Actions/Bloodbath.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 90000,
   "cooldownGroup": 47,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 12,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7546": {
   "id": 7546,
   "name": "トゥルーノース",
   "desc": "一定時間、方向指定条件のあるアクションをどの方向から実行しても成功させる。　効果時間：10秒\n最大チャージ数：2",
   "icon": "../public/fankit/battle-pve/06_SAM/Role_Actions/True_North.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 45000,
   "cooldownGroup": 46,
   "maxCharges": 2,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 50,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7548": {
   "id": 7548,
   "name": "アームズレングス",
   "desc": "一定時間、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒\n追加効果：効果中に自身が物理攻撃を受けると、攻撃者に20％スロウを付与する。　効果時間：15秒",
   "icon": "../public/fankit/battle-pve/06_SAM/Role_Actions/Arm's_Length.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 49,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 32,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7549": {
   "id": 7549,
   "name": "牽制",
   "desc": "一定時間、対象の与物理ダメージを10％、与魔法ダメージを5％減少させる。　効果時間：15秒",
   "icon": "../public/fankit/battle-pve/06_SAM/Role_Actions/Feint.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 90000,
   "cooldownGroup": 48,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 22,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 10,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7559": {
   "id": 7559,
   "name": "堅実魔",
   "desc": "一定時間、魔法詠唱を詠唱妨害されずに行うことができる。\nさらに、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒",
   "icon": "../public/fankit/battle-pve/14_BLM/Role_Actions/Surecast.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 49,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 44,
   "forJob": false,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7561": {
   "id": 7561,
   "name": "迅速魔",
   "desc": "一定時間、次の1回の魔法詠唱について、詠唱時間無しで詠唱することができる。　効果時間：10秒",
   "icon": "../public/fankit/battle-pve/14_BLM/Role_Actions/Swiftcast.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 60000,
   "cooldownGroup": 44,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 18,
   "forJob": false,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7571": {
   "id": 7571,
   "name": "救出",
   "desc": "パーティメンバーひとりを対象とする。\n対象を自身の近くに引き寄せる。\n対象が一部の状態異常を受けている、もしくは非戦闘中の場合は効果無し。\n発動条件：自身が戦闘状態",
   "icon": "../public/fankit/battle-pve/18_WHM/Role_Actions/Rescue.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 50,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 48,
   "forJob": false,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 30,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7863": {
   "id": 7863,
   "name": "レッグスウィープ",
   "desc": "対象をスタンさせる。　効果時間：3秒",
   "icon": "../public/fankit/battle-pve/06_SAM/Role_Actions/Leg_Sweep.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 40000,
   "cooldownGroup": 44,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 10,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "7867": {
   "id": 7867,
   "name": "居合術",
   "desc": "自身に付与されている閃の数に応じた居合術を発動する。\n閃が1種類：「彼岸花」を発動する。\n閃が2種類：「天下五剣」を発動する。\n閃が3種類：「乱れ雪月花」を発動する。\n自身に「天道」が付与されている場合は、天下五剣が天道五剣に、乱れ雪月花が天道雪月花にそれぞれ変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Iaijutsu.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 30,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "16472": {
   "id": 16472,
   "name": "影身具現",
   "desc": "自身と共に戦う「英雄の影身」を具現化する。\n効果時間：22秒\n追加効果：自身に「ディセスティーム実行可」を付与する。\n効果時間：30秒\n英雄の影身による攻撃の威力：420\nシャドウブリンガーおよびディセスティームは固有の威力を持つ。\n英雄の影身によるシャドウブリンガーの威力：570\n英雄の影身によるディセスティームの威力：620\n2体目以降の対象への威力は25％減少する。",
   "icon": "../public/fankit/battle-pve/03_DRK/Living_Shadow.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 22,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 80,
   "forJob": false,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 420
   }
  },
  "16481": {
   "id": 16481,
   "name": "必殺剣・閃影",
   "desc": "対象に物理攻撃。　威力：800\n発動条件：「剣気」25\nリキャストタイマーを「必殺剣・紅蓮」と共有する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Hissatsu_Senei.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 22,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 72,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 800
   }
  },
  "16482": {
   "id": 16482,
   "name": "意気衝天",
   "desc": "「剣気」を50上昇させる。\n追加効果：自身に「奥義波切実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「残心実行可」を付与する。\n効果時間：30秒\n発動条件：自身が戦闘状態",
   "icon": "../public/fankit/battle-pve/06_SAM/Ikishoten.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 120000,
   "cooldownGroup": 20,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 68,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "16483": {
   "id": 16483,
   "name": "燕返し",
   "desc": "直前に実行した居合術を再発動する。\nただし、彼岸花を除く。\n発動条件：「燕返し実行可」効果中",
   "icon": "../public/fankit/battle-pve/06_SAM/Tsubame-gaeshi.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 74,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "16485": {
   "id": 16485,
   "name": "返し五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：300\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが返し五剣に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Kaeshi_Goken.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 74,
   "forJob": true,
   "proc": 222,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 300
   }
  },
  "16486": {
   "id": 16486,
   "name": "返し雪月花",
   "desc": "対象に物理攻撃。　威力：680\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが返し雪月花に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Kaeshi_Setsugekka.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 74,
   "forJob": true,
   "proc": 223,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 6,
   "crit": true,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 680
   }
  },
  "16487": {
   "id": 16487,
   "name": "照破",
   "desc": "対象に向かって前方直線範囲物理攻撃。　威力：640\n2体目以降の対象への威力は40％減少する。\n実行時に「剣圧」を全て消費する。\n発動条件：「剣圧」3\n「剣圧」は自身が戦闘状態で「黙想」「居合術」「奥義波切」を実行すると付与される。\n最大スタック数：3　効果時間：永続",
   "icon": "../public/fankit/battle-pve/06_SAM/Shoha.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 15000,
   "cooldownGroup": 8,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 80,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 4,
   "hostile": true,
   "range": 10,
   "crit": false,
   "category": 4,
   "effectRange": 10,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 640
   }
  },
  "25757": {
   "id": 25757,
   "name": "シャドウブリンガー",
   "desc": "対象に向かって無属性前方直線範囲魔法攻撃。　威力：600\n2体目以降の対象への威力は25％減少する。\n最大チャージ数：2\n発動条件：「暗黒」効果中",
   "icon": "../public/fankit/battle-pve/03_DRK/Shadowbringer.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 60000,
   "cooldownGroup": 23,
   "maxCharges": 2,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 90,
   "forJob": false,
   "proc": null,
   "procStatus": null,
   "shape": 4,
   "hostile": true,
   "range": 10,
   "crit": false,
   "category": 4,
   "effectRange": 10,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 600
   }
  },
  "25780": {
   "id": 25780,
   "name": "風光",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\n追加効果：「剣気」を10上昇させる。",
   "icon": "../public/fankit/battle-pve/06_SAM/Fuko.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": false,
   "level": 86,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 5,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 100
   }
  },
  "25781": {
   "id": 25781,
   "name": "奥義波切",
   "desc": "対象に向かって前方扇範囲物理攻撃。　威力：1000\n2体目以降の対象への威力は40％減少する。\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：「奥義波切実行可」効果中\nこのアクションを実行すると「返し波切」に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Ogi_Namikiri.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 90,
   "forJob": true,
   "proc": 72,
   "procStatus": null,
   "shape": 3,
   "hostile": true,
   "range": 8,
   "crit": true,
   "category": 3,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 1000
   }
  },
  "25782": {
   "id": 25782,
   "name": "返し波切",
   "desc": "対象に向かって前方扇範囲物理攻撃。　威力：1000\n2体目以降の対象への威力は40％減少する。\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと奥義波切が返し波切に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Kaeshi_Namikiri.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 90,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 3,
   "hostile": true,
   "range": 8,
   "crit": true,
   "category": 3,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 1000
   }
  },
  "36962": {
   "id": 36962,
   "name": "天眼通",
   "desc": "効果時間中に受ける1回の攻撃のダメージを10％軽減する。\n効果時間：4秒\n追加効果：天眼通に成功すると「剣気」が10上昇し、さらに「天眼通：生」に変化する。　効果時間：9秒\n天眼通：生効果：自身の被ダメージを10％軽減する。\nさらに、自身のＨＰを継続回復する。　回復力：200",
   "icon": "../public/fankit/battle-pve/06_SAM/Tengentsu.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 15000,
   "cooldownGroup": 7,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 82,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 4,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": null
  },
  "36963": {
   "id": 36963,
   "name": "暁風",
   "desc": "対象に物理攻撃。　威力：240\n追加効果：「剣気」を5上昇させる。",
   "icon": "../public/fankit/battle-pve/06_SAM/Gyofu.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": false,
   "level": 92,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": -1,
   "crit": false,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 240
   }
  },
  "36964": {
   "id": 36964,
   "name": "残心",
   "desc": "対象に向かって前方扇範囲物理攻撃。　威力：940\n2体目以降の対象への威力は40％減少する。\n発動条件：「残心実行可」効果中かつ「剣気」50",
   "icon": "../public/fankit/battle-pve/06_SAM/Zanshin.png",
   "iconFramed": true,
   "isGcd": false,
   "castMs": 0,
   "recastMs": 1000,
   "cooldownGroup": 3,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 96,
   "forJob": true,
   "proc": 166,
   "procStatus": null,
   "shape": 3,
   "hostile": true,
   "range": 8,
   "crit": false,
   "category": 4,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 940
   }
  },
  "36965": {
   "id": 36965,
   "name": "天道五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：410\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：「天道」効果中かつ自身に「閃」が2種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が天道五剣に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Tendo_Goken.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 410
   }
  },
  "36966": {
   "id": 36966,
   "name": "天道雪月花",
   "desc": "対象に物理攻撃。　威力：1100\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n追加効果：自身に「燕返し実行可」を付与する。\n効果時間：30秒\n追加効果：自身に「剣圧」を付与する。\n最大スタック数：3　効果時間：永続\n発動条件：「天道」効果中かつ自身に「閃」が3種類付与されている\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと居合術が天道雪月花に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Tendo_Setsugekka.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 1800,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100,
   "forJob": true,
   "proc": null,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 6,
   "crit": true,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 1100
   }
  },
  "36967": {
   "id": 36967,
   "name": "天道返し五剣",
   "desc": "自身の周囲の敵に範囲物理攻撃。　威力：410\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが天道返し五剣に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Tendo_Kaeshi_Goken.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100,
   "forJob": true,
   "proc": 224,
   "procStatus": null,
   "shape": 2,
   "hostile": false,
   "range": 0,
   "crit": false,
   "category": 3,
   "effectRange": 8,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 410
   }
  },
  "36968": {
   "id": 36968,
   "name": "天道返し雪月花",
   "desc": "対象に物理攻撃。　威力：1100\nこのアクションは必ずクリティカルヒットする。\nクリティカルヒットの発動率を上昇させる効果を受けている場合は与ダメージが上昇する。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすと燕返しが天道返し雪月花に変化する。",
   "icon": "../public/fankit/battle-pve/06_SAM/Tendo_Kaeshi_Setsugekka.png",
   "iconFramed": true,
   "isGcd": true,
   "castMs": 0,
   "recastMs": 2500,
   "cooldownGroup": 58,
   "maxCharges": 0,
   "comboFrom": [],
   "preservesCombo": true,
   "level": 100,
   "forJob": true,
   "proc": 225,
   "procStatus": null,
   "shape": 1,
   "hostile": true,
   "range": 6,
   "crit": true,
   "category": 3,
   "effectRange": 0,
   "positional": null,
   "dash": false,
   "backstep": 0,
   "pot": {
    "base": 1100
   }
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
 "statusIcons": {
  "奥義波切実行可": "../public/icons/statuses/213313.png",
  "残心実行可": "../public/icons/statuses/213318.png",
  "天道": "../public/icons/statuses/213319.png"
 },
 "bars": {
  "hb1": {
   "job": [
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
   "shared": null,
   "defaultSource": "job"
  },
  "hb2": {
   "job": [
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
   "shared": null,
   "defaultSource": "job"
  },
  "hb3": {
   "job": [
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
   "shared": null,
   "defaultSource": "job"
  },
  "hb4": {
   "job": [
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
   "shared": [
    {
     "kind": "action",
     "id": 7571
    },
    null,
    {
     "kind": "other",
     "type": 16
    },
    {
     "kind": "action",
     "id": 7561
    },
    null,
    {
     "kind": "other",
     "type": 16
    },
    {
     "kind": "action",
     "id": 7559
    },
    null,
    null,
    {
     "kind": "other",
     "type": 2
    },
    null,
    {
     "kind": "other",
     "type": 10
    }
   ],
   "defaultSource": "job"
  },
  "hb5": {
   "job": null,
   "shared": [
    null,
    null,
    null,
    null,
    {
     "kind": "action",
     "id": 16472
    },
    {
     "kind": "action",
     "id": 25757
    },
    null,
    null,
    null,
    null,
    null,
    null
   ],
   "defaultSource": "shared"
  },
  "hb6": {
   "job": null,
   "shared": [
    null,
    null,
    null,
    null,
    {
     "kind": "other",
     "type": 7
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null
   ],
   "defaultSource": "shared"
  },
  "hb7": {
   "job": null,
   "shared": [
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 6
    },
    null,
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 7
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
     "type": 30
    }
   ],
   "defaultSource": "shared"
  },
  "hb8": {
   "job": null,
   "shared": [
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 4
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 4
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 7
    }
   ],
   "defaultSource": "shared"
  },
  "hb9": {
   "job": null,
   "shared": [
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 2
    },
    {
     "kind": "other",
     "type": 11
    },
    {
     "kind": "other",
     "type": 2
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 10
    },
    {
     "kind": "other",
     "type": 6
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    }
   ],
   "defaultSource": "shared"
  },
  "hb10": {
   "job": null,
   "shared": [
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 2
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 7
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    }
   ],
   "defaultSource": "shared"
  },
  "xhb1": {
   "job": [
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
   "shared": [
    null,
    null,
    null,
    null,
    {
     "kind": "other",
     "type": 10
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 12
    },
    {
     "kind": "other",
     "type": 4
    },
    {
     "kind": "other",
     "type": 18
    },
    {
     "kind": "other",
     "type": 18
    },
    {
     "kind": "other",
     "type": 18
    },
    {
     "kind": "other",
     "type": 18
    },
    {
     "kind": "other",
     "type": 8
    },
    {
     "kind": "other",
     "type": 8
    },
    {
     "kind": "other",
     "type": 4
    },
    {
     "kind": "other",
     "type": 8
    }
   ],
   "defaultSource": "job"
  },
  "xhb2": {
   "job": [
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
   "shared": [
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    null,
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    }
   ],
   "defaultSource": "job"
  },
  "xhb3": {
   "job": [
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
   ],
   "shared": [
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
    null,
    null,
    {
     "kind": "other",
     "type": 4
    },
    {
     "kind": "other",
     "type": 8
    },
    {
     "kind": "other",
     "type": 4
    },
    {
     "kind": "other",
     "type": 8
    }
   ],
   "defaultSource": "job"
  },
  "xhb7": {
   "job": null,
   "shared": [
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
    null,
    null,
    null,
    null,
    {
     "kind": "other",
     "type": 24
    },
    null
   ],
   "defaultSource": "shared"
  },
  "xhb8": {
   "job": null,
   "shared": [
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    },
    {
     "kind": "other",
     "type": 15
    }
   ],
   "defaultSource": "shared"
  }
 },
 "keybind": {
  "hb1": [
   [
    {
     "code": "Digit1",
     "vk": 49,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "1"
    }
   ],
   [
    {
     "code": "Digit2",
     "vk": 50,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "2"
    }
   ],
   [
    {
     "code": "Digit3",
     "vk": 51,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "3"
    }
   ],
   [
    {
     "code": "Digit4",
     "vk": 52,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "4"
    }
   ],
   [
    {
     "code": "Digit5",
     "vk": 53,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "5"
    }
   ],
   [
    {
     "code": "KeyF",
     "vk": 70,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F"
    }
   ],
   [
    {
     "code": "F1",
     "vk": 112,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F1"
    }
   ],
   [
    {
     "code": "F2",
     "vk": 113,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F2"
    }
   ],
   [
    {
     "code": "F3",
     "vk": 114,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F3"
    }
   ],
   [
    {
     "code": "KeyQ",
     "vk": 81,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "Q"
    }
   ],
   [
    {
     "code": "KeyE",
     "vk": 69,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "E"
    }
   ],
   [
    {
     "code": "KeyR",
     "vk": 82,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "R"
    }
   ]
  ],
  "hb2": [
   [
    {
     "code": "Digit1",
     "vk": 49,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "a1"
    }
   ],
   [
    {
     "code": "Digit2",
     "vk": 50,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "a2"
    }
   ],
   [
    {
     "code": "Digit3",
     "vk": 51,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "a3"
    }
   ],
   [
    {
     "code": "Digit4",
     "vk": 52,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "a4"
    }
   ],
   [
    {
     "code": "Digit5",
     "vk": 53,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "a5"
    }
   ],
   [
    {
     "code": "KeyF",
     "vk": 70,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "aF"
    }
   ],
   [
    {
     "code": "F4",
     "vk": 115,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F4"
    }
   ],
   [
    {
     "code": "F5",
     "vk": 116,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F5"
    }
   ],
   [
    {
     "code": "F6",
     "vk": 117,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "F6"
    }
   ],
   [
    {
     "code": "KeyQ",
     "vk": 81,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "aQ"
    }
   ],
   [
    {
     "code": "KeyE",
     "vk": 69,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "aE"
    }
   ],
   [
    {
     "code": "KeyR",
     "vk": 82,
     "shift": false,
     "ctrl": false,
     "alt": true,
     "label": "aR"
    }
   ]
  ],
  "hb3": [
   [
    {
     "code": "Digit1",
     "vk": 49,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "s1"
    }
   ],
   [
    {
     "code": "Digit2",
     "vk": 50,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "s2"
    }
   ],
   [
    {
     "code": "Digit3",
     "vk": 51,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "s3"
    }
   ],
   [
    {
     "code": "Digit4",
     "vk": 52,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "s4"
    }
   ],
   [
    {
     "code": "Digit5",
     "vk": 53,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "s5"
    }
   ],
   [
    {
     "code": "Digit6",
     "vk": 54,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "s6"
    }
   ],
   [
    {
     "code": "Digit1",
     "vk": 49,
     "shift": false,
     "ctrl": true,
     "alt": false,
     "label": "c1"
    }
   ],
   [
    {
     "code": "Digit2",
     "vk": 50,
     "shift": false,
     "ctrl": true,
     "alt": false,
     "label": "c2"
    }
   ],
   [
    {
     "code": "Digit3",
     "vk": 51,
     "shift": false,
     "ctrl": true,
     "alt": false,
     "label": "c3"
    }
   ],
   [
    {
     "code": "Digit4",
     "vk": 52,
     "shift": false,
     "ctrl": true,
     "alt": false,
     "label": "c4"
    }
   ],
   [
    {
     "code": "Digit5",
     "vk": 53,
     "shift": false,
     "ctrl": true,
     "alt": false,
     "label": "c5"
    }
   ],
   [
    {
     "code": "Digit6",
     "vk": 54,
     "shift": false,
     "ctrl": true,
     "alt": false,
     "label": "c6"
    }
   ]
  ],
  "hb4": [
   [
    {
     "code": "Numpad1",
     "vk": 97,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N1"
    }
   ],
   [
    {
     "code": "Numpad2",
     "vk": 98,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N2"
    }
   ],
   [
    {
     "code": "Numpad3",
     "vk": 99,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N3"
    }
   ],
   [
    {
     "code": "Numpad4",
     "vk": 100,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N4"
    }
   ],
   [
    {
     "code": "KeyC",
     "vk": 67,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "C"
    }
   ],
   [
    {
     "code": "KeyC",
     "vk": 67,
     "shift": true,
     "ctrl": false,
     "alt": false,
     "label": "sC"
    }
   ],
   [
    {
     "code": "Numpad7",
     "vk": 103,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N7"
    }
   ],
   [
    {
     "code": "Numpad8",
     "vk": 104,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N8"
    }
   ],
   [
    {
     "code": "Numpad9",
     "vk": 105,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N9"
    }
   ],
   [
    {
     "code": "NumpadMultiply",
     "vk": 106,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N*"
    }
   ],
   [
    {
     "code": "NumpadSubtract",
     "vk": 109,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N-"
    }
   ],
   [
    {
     "code": "NumpadDivide",
     "vk": 111,
     "shift": false,
     "ctrl": false,
     "alt": false,
     "label": "N/"
    }
   ]
  ],
  "hb6": [
   [
    {
     "code": "F1",
     "vk": 112,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF1"
    }
   ],
   [
    {
     "code": "F2",
     "vk": 113,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF2"
    }
   ],
   [
    {
     "code": "F3",
     "vk": 114,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF3"
    }
   ],
   [
    {
     "code": "F4",
     "vk": 115,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF4"
    }
   ],
   [
    {
     "code": "KeyG",
     "vk": 71,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scG"
    }
   ],
   [
    {
     "code": "F6",
     "vk": 117,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF6"
    }
   ],
   [
    {
     "code": "F7",
     "vk": 118,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF7"
    }
   ],
   [
    {
     "code": "F8",
     "vk": 119,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF8"
    }
   ],
   [
    {
     "code": "F9",
     "vk": 120,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF9"
    }
   ],
   [
    {
     "code": "F10",
     "vk": 121,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF10"
    }
   ],
   [
    {
     "code": "F11",
     "vk": 122,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF11"
    }
   ],
   [
    {
     "code": "F12",
     "vk": 123,
     "shift": true,
     "ctrl": true,
     "alt": false,
     "label": "scF12"
    }
   ]
  ],
  "hb7": [
   [
    {
     "code": "F1",
     "vk": 112,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF1"
    }
   ],
   [
    {
     "code": "F2",
     "vk": 113,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF2"
    }
   ],
   [
    {
     "code": "F3",
     "vk": 114,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF3"
    }
   ],
   [
    {
     "code": "F4",
     "vk": 115,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF4"
    }
   ],
   [
    {
     "code": "F5",
     "vk": 116,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF5"
    }
   ],
   [
    {
     "code": "F6",
     "vk": 117,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF6"
    }
   ],
   [
    {
     "code": "F7",
     "vk": 118,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF7"
    }
   ],
   [
    {
     "code": "F8",
     "vk": 119,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF8"
    }
   ],
   [
    {
     "code": "F9",
     "vk": 120,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF9"
    }
   ],
   [
    {
     "code": "F10",
     "vk": 121,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF10"
    }
   ],
   [
    {
     "code": "F11",
     "vk": 122,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF11"
    }
   ],
   [
    {
     "code": "F12",
     "vk": 123,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF12"
    }
   ]
  ],
  "hb8": [
   [
    {
     "code": "Digit1",
     "vk": 49,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca1"
    }
   ],
   [
    {
     "code": "Digit2",
     "vk": 50,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca2"
    }
   ],
   [
    {
     "code": "Digit3",
     "vk": 51,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca3"
    }
   ],
   [
    {
     "code": "Digit4",
     "vk": 52,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca4"
    }
   ],
   [
    {
     "code": "Digit5",
     "vk": 53,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca5"
    }
   ],
   [
    {
     "code": "Digit6",
     "vk": 54,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca6"
    }
   ],
   [
    {
     "code": "Digit7",
     "vk": 55,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca7"
    }
   ],
   [
    {
     "code": "Digit8",
     "vk": 56,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca8"
    }
   ],
   [
    {
     "code": "Digit9",
     "vk": 57,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca9"
    }
   ],
   [
    {
     "code": "Digit0",
     "vk": 48,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca0"
    }
   ],
   [
    {
     "code": "F21",
     "vk": 132,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "scaF21"
    }
   ],
   [
    {
     "code": null,
     "vk": 140,
     "shift": true,
     "ctrl": true,
     "alt": true,
     "label": "sca?8c"
    }
   ]
  ],
  "hb9": [
   [
    {
     "code": "Numpad0",
     "vk": 96,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN0"
    }
   ],
   [
    {
     "code": "Numpad1",
     "vk": 97,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN1"
    }
   ],
   [
    {
     "code": "Numpad2",
     "vk": 98,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN2"
    }
   ],
   [
    {
     "code": "Numpad3",
     "vk": 99,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN3"
    }
   ],
   [
    {
     "code": "Numpad4",
     "vk": 100,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN4"
    }
   ],
   [
    {
     "code": "Numpad5",
     "vk": 101,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN5"
    }
   ],
   [
    {
     "code": "Numpad6",
     "vk": 102,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN6"
    }
   ],
   [
    {
     "code": "Numpad7",
     "vk": 103,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN7"
    }
   ],
   [
    {
     "code": "Numpad8",
     "vk": 104,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN8"
    }
   ],
   [
    {
     "code": "Numpad9",
     "vk": 105,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN9"
    }
   ],
   [
    {
     "code": "NumpadDivide",
     "vk": 111,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN/"
    }
   ],
   [
    {
     "code": "NumpadMultiply",
     "vk": 106,
     "shift": false,
     "ctrl": true,
     "alt": true,
     "label": "caN*"
    }
   ]
  ]
 },
 "move": {
  "fore": [
   "KeyW"
  ],
  "back": [
   "KeyS"
  ],
  "left": [
   "KeyA"
  ],
  "right": [
   "KeyD"
  ],
  "jump": [
   "Space"
  ]
 },
 "hud": {
  "hotbars": {
   "hb1": {
    "x": 50,
    "y": 80.3240737915039,
    "scale": 0.800000011920929,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   },
   "hb2": {
    "x": 50.05208206176758,
    "y": 84.16666412353516,
    "scale": 0.800000011920929,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   },
   "hb3": {
    "x": 50,
    "y": 88.00926208496094,
    "scale": 0.800000011920929,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   },
   "hb4": {
    "x": 64.51823425292969,
    "y": 94.0740737915039,
    "scale": 0.800000011920929,
    "w": 162,
    "h": 260,
    "anchor": 7,
    "cols": 3,
    "rows": 4,
    "visible": true
   },
   "hb5": {
    "x": 59.270835876464844,
    "y": 76.5740737915039,
    "scale": 0.800000011920929,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": false
   },
   "hb6": {
    "x": 15.130208015441895,
    "y": 61.203704833984375,
    "scale": 0.800000011920929,
    "w": 241,
    "h": 170,
    "anchor": 3,
    "cols": 4,
    "rows": 3,
    "visible": true
   },
   "hb7": {
    "x": 49.869789123535156,
    "y": 100.1388931274414,
    "scale": 0.6000000238418579,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   },
   "hb8": {
    "x": 49.84375,
    "y": 97.26851654052734,
    "scale": 0.6000000238418579,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   },
   "hb9": {
    "x": 49.89583206176758,
    "y": 94.6759262084961,
    "scale": 0.6000000238418579,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   },
   "hb10": {
    "x": 50,
    "y": 91.99073791503906,
    "scale": 0.800000011920929,
    "w": 624,
    "h": 72,
    "anchor": 7,
    "cols": 12,
    "rows": 1,
    "visible": true
   }
  },
  "gauges": {
   "JobHudSAM0": {
    "index": 356,
    "name": "剣気ゲージ",
    "x": 37.55208206176758,
    "y": 46.85185241699219,
    "scale": 0.800000011920929,
    "anchor": 4,
    "w": 330,
    "h": 88
   },
   "JobHudSAM1": {
    "index": 355,
    "name": "閃ゲージ",
    "x": 34.635414123535156,
    "y": 55.74073791503906,
    "scale": 0.800000011920929,
    "anchor": 4,
    "w": 170,
    "h": 158
   }
  },
  "elements": {
   "scenarioGuide": {
    "index": 410,
    "name": "シナリオガイド",
    "x": 0.4166666865348816,
    "y": 1.1111111640930176,
    "scale": 0.800000011920929,
    "anchor": 0,
    "w": 340,
    "h": 86,
    "visible": true
   },
   "itemHelp": {
    "index": 432,
    "name": "アイテムヘルプ",
    "x": 86.61458587646484,
    "y": 87.03704071044922,
    "scale": 0.800000011920929,
    "anchor": 8,
    "w": 376,
    "h": 182,
    "visible": true
   },
   "actionHelp": {
    "index": 435,
    "name": "アクションヘルプ",
    "x": 86.71875,
    "y": 76.85185241699219,
    "scale": 0.8000000715255737,
    "anchor": 8,
    "w": 376,
    "h": 176,
    "visible": true
   },
   "gil": {
    "index": 437,
    "name": "所持金",
    "x": 35.92448043823242,
    "y": 99.21295928955078,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 156,
    "h": 36,
    "visible": true
   },
   "mainMenu": {
    "index": 438,
    "name": "メインメニュー",
    "x": 81.61458587646484,
    "y": 98.4259262084961,
    "scale": 0.800000011920929,
    "anchor": 8,
    "w": 214,
    "h": 34,
    "visible": true
   },
   "parameterBar": {
    "index": 439,
    "name": "パラメーターバー",
    "x": 41.88801956176758,
    "y": 75.55555725097656,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 512,
    "h": 44,
    "visible": true
   },
   "statusAll": {
    "index": 440,
    "name": "ステータス情報",
    "x": 53.411460876464844,
    "y": 69.35185241699219,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 750,
    "h": 41,
    "visible": true
   },
   "statusEnh": {
    "index": 441,
    "name": "ステータス情報（強化）",
    "x": 51.90104293823242,
    "y": 62.03704071044922,
    "scale": 1,
    "anchor": 4,
    "w": 500,
    "h": 41,
    "visible": true
   },
   "statusEnf": {
    "index": 442,
    "name": "ステータス情報（弱体）",
    "x": 59.088539123535156,
    "y": 75.23148345947266,
    "scale": 1.600000023841858,
    "anchor": 7,
    "w": 250,
    "h": 82,
    "visible": true
   },
   "statusOther": {
    "index": 443,
    "name": "ステータス情報（その他）",
    "x": 0.2864583432674408,
    "y": 83.98148345947266,
    "scale": 1,
    "anchor": 6,
    "w": 250,
    "h": 82,
    "visible": true
   },
   "statusCond": {
    "index": 444,
    "name": "ステータス情報（条件付き強化）",
    "x": 46.19791793823242,
    "y": 69.16666412353516,
    "scale": 1,
    "anchor": 7,
    "w": 200,
    "h": 41,
    "visible": true
   },
   "expBar": {
    "index": 445,
    "name": "経験値バー",
    "x": 99.16666412353516,
    "y": 0.23148147761821747,
    "scale": 0.6000000238418579,
    "anchor": 2,
    "w": 486,
    "h": 44,
    "visible": true
   },
   "inventory": {
    "index": 446,
    "name": "所持品",
    "x": 71.5625,
    "y": 98.98148345947266,
    "scale": 0.800000011920929,
    "anchor": 8,
    "w": 174,
    "h": 58,
    "visible": true
   },
   "targetBar": {
    "index": 447,
    "name": "ターゲット情報",
    "x": 56.71875,
    "y": 7.037036895751953,
    "scale": 0.800000011920929,
    "anchor": 1,
    "w": 640,
    "h": 132,
    "visible": true
   },
   "targetStatus": {
    "index": 448,
    "name": "ターゲット情報（ステータス）",
    "x": 59.73958206176758,
    "y": 54.074073791503906,
    "scale": 1.2000000476837158,
    "anchor": 4,
    "w": 640,
    "h": 132,
    "visible": true
   },
   "targetCast": {
    "index": 449,
    "name": "ターゲット情報（キャストバー）",
    "x": 47.05729293823242,
    "y": 87.03704071044922,
    "scale": 1.600000023841858,
    "anchor": 7,
    "w": 640,
    "h": 132,
    "visible": true
   },
   "targetHp": {
    "index": 450,
    "name": "ターゲット情報（HP）",
    "x": 50.156246185302734,
    "y": 7.314814567565918,
    "scale": 1.2000000476837158,
    "anchor": 1,
    "w": 640,
    "h": 132,
    "visible": true
   },
   "notices": {
    "index": 451,
    "name": "通知",
    "x": 72.47396087646484,
    "y": 93.8888931274414,
    "scale": 0.800000011920929,
    "anchor": 8,
    "w": 206,
    "h": 43,
    "visible": true
   },
   "serverInfo": {
    "index": 452,
    "name": "サーバー情報",
    "x": 99.11458587646484,
    "y": 2.685185194015503,
    "scale": 0.800000011920929,
    "anchor": 2,
    "w": 248,
    "h": 28,
    "visible": true
   },
   "castBar": {
    "index": 453,
    "name": "キャストバー",
    "x": 53.17708206176758,
    "y": 75.9259262084961,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 218,
    "h": 52,
    "visible": true
   },
   "minimap": {
    "index": 454,
    "name": "ミニマップ",
    "x": 20.052082061767578,
    "y": 4.398148059844971,
    "scale": 0.800000011920929,
    "anchor": 0,
    "w": 218,
    "h": 218,
    "visible": true
   },
   "hb1": {
    "index": 455,
    "name": "ホットバー1",
    "x": 50,
    "y": 80.3240737915039,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "hb2": {
    "index": 456,
    "name": "ホットバー2",
    "x": 50.05208206176758,
    "y": 84.16666412353516,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "hb3": {
    "index": 457,
    "name": "ホットバー3",
    "x": 50,
    "y": 88.00926208496094,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "hb4": {
    "index": 458,
    "name": "ホットバー4",
    "x": 64.51823425292969,
    "y": 94.0740737915039,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 162,
    "h": 260,
    "visible": true
   },
   "hb5": {
    "index": 459,
    "name": "ホットバー5",
    "x": 59.270835876464844,
    "y": 76.5740737915039,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": false
   },
   "hb6": {
    "index": 460,
    "name": "ホットバー6",
    "x": 15.130208015441895,
    "y": 61.203704833984375,
    "scale": 0.800000011920929,
    "anchor": 3,
    "w": 241,
    "h": 170,
    "visible": true
   },
   "hb7": {
    "index": 461,
    "name": "ホットバー7",
    "x": 49.869789123535156,
    "y": 100.1388931274414,
    "scale": 0.6000000238418579,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "hb8": {
    "index": 462,
    "name": "ホットバー8",
    "x": 49.84375,
    "y": 97.26851654052734,
    "scale": 0.6000000238418579,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "hb9": {
    "index": 463,
    "name": "ホットバー9",
    "x": 49.89583206176758,
    "y": 94.6759262084961,
    "scale": 0.6000000238418579,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "hb10": {
    "index": 464,
    "name": "ホットバー10",
    "x": 50,
    "y": 91.99073791503906,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "petHotbar": {
    "index": 465,
    "name": "ペットホットバー",
    "x": 49.21875,
    "y": 13.858039855957031,
    "scale": 0.800000011920929,
    "anchor": 1,
    "w": 624,
    "h": 72,
    "visible": true
   },
   "crossHotbar": {
    "index": 466,
    "name": "クロスホットバー",
    "x": 20.182292938232422,
    "y": 96.34259033203125,
    "scale": 0.6000000238418579,
    "anchor": 6,
    "w": 588,
    "h": 210,
    "visible": false
   },
   "dutyAction": {
    "index": 467,
    "name": "コンテンツアクション",
    "x": 36.979164123535156,
    "y": 72.45370483398438,
    "scale": 0.800000011920929,
    "anchor": 7,
    "w": 180,
    "h": 120,
    "visible": true
   },
   "wxhbL": {
    "index": 468,
    "name": "Wクロスホットバー（左）",
    "x": 20.75520896911621,
    "y": 90.41666412353516,
    "scale": 0.6000000238418579,
    "anchor": 6,
    "w": 266,
    "h": 140,
    "visible": false
   },
   "wxhbR": {
    "index": 469,
    "name": "Wクロスホットバー（右）",
    "x": 33.81510543823242,
    "y": 90.50926208496094,
    "scale": 0.6000000238418579,
    "anchor": 7,
    "w": 266,
    "h": 140,
    "visible": false
   },
   "partyList": {
    "index": 470,
    "name": "パーティリスト",
    "x": 81.328125,
    "y": 44.82919692993164,
    "scale": 0.800000011920929,
    "anchor": 5,
    "w": 380,
    "h": 408,
    "visible": true
   },
   "alliance1": {
    "index": 471,
    "name": "アライアンスリスト1",
    "x": 86.74478912353516,
    "y": 20.879629135131836,
    "scale": 0.6000000238418579,
    "anchor": 2,
    "w": 324,
    "h": 88,
    "visible": true
   },
   "alliance2": {
    "index": 472,
    "name": "アライアンスリスト2",
    "x": 86.71875,
    "y": 25.740739822387695,
    "scale": 0.6000000238418579,
    "anchor": 2,
    "w": 324,
    "h": 88,
    "visible": true
   },
   "enemyList": {
    "index": 473,
    "name": "エネミーリスト",
    "x": 25.312501907348633,
    "y": 36.64352035522461,
    "scale": 0.800000011920929,
    "anchor": 3,
    "w": 176,
    "h": 36,
    "visible": true
   },
   "dutyList": {
    "index": 474,
    "name": "ToDo リスト",
    "x": 0.2343750149011612,
    "y": 11.481481552124023,
    "scale": 0.800000011920929,
    "anchor": 0,
    "w": 400,
    "h": 103,
    "visible": true
   },
   "dutyGauge": {
    "index": 475,
    "name": "コンテンツのゲージ",
    "x": 50.45573043823242,
    "y": 18.21649932861328,
    "scale": 0.800000011920929,
    "anchor": 1,
    "w": 254,
    "h": 32,
    "visible": true
   },
   "focusTarget": {
    "index": 476,
    "name": "フォーカスターゲット",
    "x": 25.338542938232422,
    "y": 27.962961196899414,
    "scale": 0.800000011920929,
    "anchor": 0,
    "w": 212,
    "h": 100,
    "visible": true
   },
   "limitGauge": {
    "index": 477,
    "name": "リミットゲージ",
    "x": 50.1953125,
    "y": 3.564814805984497,
    "scale": 0.8000000715255737,
    "anchor": 1,
    "w": 492,
    "h": 32,
    "visible": true
   }
  }
 },
 "gauge": {
  "names": [
   "JobHudSAM0",
   "JobHudSAM1"
  ],
  "layouts": {
   "JobHudSAM0": {
    "partLists": [
     {
      "id": 1,
      "parts": [
       {
        "texture": "JobHudSAM0",
        "u": 0,
        "v": 0,
        "w": 116,
        "h": 50
       },
       {
        "texture": "JobHudSAM0",
        "u": 116,
        "v": 0,
        "w": 278,
        "h": 50
       },
       {
        "texture": "JobHudSAM0",
        "u": 116,
        "v": 50,
        "w": 278,
        "h": 50
       },
       {
        "texture": "JobHudSAM0",
        "u": 116,
        "v": 100,
        "w": 278,
        "h": 50
       },
       {
        "texture": "JobHudSAM0",
        "u": 116,
        "v": 150,
        "w": 190,
        "h": 26
       },
       {
        "texture": "JobHudSAM0",
        "u": 32,
        "v": 50,
        "w": 34,
        "h": 60
       },
       {
        "texture": "JobHudSAM0",
        "u": 0,
        "v": 50,
        "w": 32,
        "h": 66
       },
       {
        "texture": "JobHudSAM0",
        "u": 66,
        "v": 50,
        "w": 28,
        "h": 28
       },
       {
        "texture": "JobHudSAM0",
        "u": 0,
        "v": 116,
        "w": 60,
        "h": 60
       },
       {
        "texture": "JobHudSAM0",
        "u": 102,
        "v": 176,
        "w": 62,
        "h": 34
       },
       {
        "texture": "JobHudSAM0",
        "u": 0,
        "v": 176,
        "w": 102,
        "h": 62
       },
       {
        "texture": "JobHudSAM0",
        "u": 66,
        "v": 78,
        "w": 24,
        "h": 20
       },
       {
        "texture": "JobHudSAM0",
        "u": 66,
        "v": 98,
        "w": 46,
        "h": 46
       }
      ]
     },
     {
      "id": 2,
      "parts": [
       {
        "texture": "JobHudSimple_StackA",
        "u": 0,
        "v": 0,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSimple_StackA",
        "u": 32,
        "v": 0,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSimple_StackA",
        "u": 0,
        "v": 32,
        "w": 32,
        "h": 32
       }
      ]
     },
     {
      "id": 3,
      "parts": [
       {
        "texture": "JobHudNumBg",
        "u": 0,
        "v": 0,
        "w": 60,
        "h": 40
       }
      ]
     },
     {
      "id": 4,
      "parts": [
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 0,
        "w": 160,
        "h": 20
       },
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 20,
        "w": 160,
        "h": 20
       },
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 40,
        "w": 160,
        "h": 20
       },
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 60,
        "w": 160,
        "h": 20
       },
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 80,
        "w": 160,
        "h": 20
       },
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 100,
        "w": 160,
        "h": 20
       },
       {
        "texture": "Parameter_Gauge",
        "u": 0,
        "v": 120,
        "w": 32,
        "h": 32
       }
      ]
     }
    ],
    "components": [
     {
      "id": 1001,
      "type": 0,
      "nodes": [
       {
        "id": 1,
        "parent": 0,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 80,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 2,
        "parent": 1,
        "type": 2,
        "x": -14,
        "y": 10,
        "w": 34,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 0.9,
        "rotation": 0,
        "originX": 16,
        "originY": 30,
        "partListId": 1,
        "partId": 5,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 3,
        "parent": 1,
        "type": 2,
        "x": -14,
        "y": 12,
        "w": 34,
        "h": 60,
        "alpha": 0,
        "scaleX": 0.2,
        "scaleY": 1.1,
        "rotation": 0,
        "originX": 16,
        "originY": 30,
        "partListId": 1,
        "partId": 5,
        "flipH": false,
        "flipV": false
       }
      ]
     },
     {
      "id": 1002,
      "type": 5,
      "nodes": [
       {
        "id": 1,
        "parent": 0,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 2,
        "parent": 1,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 4,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 3,
        "parent": 1,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 4,
        "parent": 3,
        "type": 4,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 6,
        "originY": 0,
        "add": [
         120,
         0,
         0
        ],
        "partListId": 4,
        "partId": 2,
        "nineGrid": [
         0,
         0,
         7,
         7
        ]
       },
       {
        "id": 5,
        "parent": 3,
        "type": 4,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 6,
        "originY": 0,
        "partListId": 4,
        "partId": 4,
        "nineGrid": [
         0,
         0,
         7,
         7
        ]
       },
       {
        "id": 6,
        "parent": 3,
        "type": 4,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 6,
        "originY": 0,
        "partListId": 4,
        "partId": 3,
        "nineGrid": [
         0,
         0,
         7,
         7
        ]
       },
       {
        "id": 7,
        "parent": 1,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 4,
        "partId": 5,
        "flipH": false,
        "flipV": false
       }
      ]
     },
     {
      "id": 1003,
      "type": 0,
      "nodes": [
       {
        "id": 1,
        "parent": 0,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 24,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 2,
        "parent": 1,
        "type": 2,
        "x": -11,
        "y": -13,
        "w": 46,
        "h": 46,
        "alpha": 0,
        "scaleX": 1.5,
        "scaleY": 1.5,
        "rotation": 0,
        "originX": 23,
        "originY": 23,
        "partListId": 1,
        "partId": 12,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 3,
        "parent": 1,
        "type": 2,
        "x": -82,
        "y": -3,
        "w": 190,
        "h": 26,
        "alpha": 0,
        "scaleX": 0.5,
        "scaleY": 0.4,
        "rotation": 0,
        "originX": 95,
        "originY": 13,
        "partListId": 1,
        "partId": 4,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 4,
        "parent": 1,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 24,
        "h": 20,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 5,
        "parent": 4,
        "type": 2,
        "x": -11,
        "y": -13,
        "w": 46,
        "h": 46,
        "alpha": 29,
        "scaleX": 0.5714286,
        "scaleY": 0.5714286,
        "rotation": 0,
        "originX": 23,
        "originY": 23,
        "partListId": 1,
        "partId": 12,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 6,
        "parent": 1,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 24,
        "h": 20,
        "alpha": 0,
        "scaleX": 2,
        "scaleY": 2,
        "rotation": 0,
        "originX": 12,
        "originY": 10,
        "partListId": 1,
        "partId": 11,
        "flipH": false,
        "flipV": false
       }
      ]
     },
     {
      "id": 1004,
      "type": 0,
      "nodes": [
       {
        "id": 1,
        "parent": 0,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 2,
        "parent": 1,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 16,
        "originY": 16
       },
       {
        "id": 3,
        "parent": 2,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 16,
        "originY": 16,
        "add": [
         100,
         -20,
         -40
        ],
        "partListId": 2,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 4,
        "parent": 1,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 2,
        "partId": 0,
        "flipH": false,
        "flipV": false
       }
      ]
     },
     {
      "id": 1005,
      "type": 19,
      "nodes": [
       {
        "id": 1,
        "parent": 0,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 60,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 2,
        "parent": 1,
        "type": 3,
        "x": 14,
        "y": 5,
        "w": 30,
        "h": 30,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 3,
        "parent": 1,
        "type": 4,
        "x": 0,
        "y": 0,
        "w": 60,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 3,
        "partId": 0,
        "nineGrid": [
         0,
         0,
         28,
         28
        ]
       }
      ]
     }
    ],
    "nodes": [
     {
      "id": 1,
      "parent": 0,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 330,
      "h": 88,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 2,
      "parent": 1,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 330,
      "h": 88,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 3,
      "parent": 2,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 386,
      "h": 102,
      "alpha": 255,
      "scaleX": 0.85,
      "scaleY": 0.85,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 4,
      "parent": 3,
      "type": 3,
      "x": 40,
      "y": 8,
      "w": 60,
      "h": 28,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 5,
      "parent": 3,
      "type": 2,
      "x": 108,
      "y": 18,
      "w": 278,
      "h": 50,
      "alpha": 32,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 139,
      "originY": 25,
      "partListId": 1,
      "partId": 3,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 6,
      "parent": 3,
      "type": 4,
      "x": 100,
      "y": 76,
      "w": 190,
      "h": 26,
      "alpha": 255,
      "scaleX": 0.24000001,
      "scaleY": 1,
      "rotation": -20,
      "originX": 0,
      "originY": 13,
      "partListId": 1,
      "partId": 4,
      "nineGrid": [
       0,
       0,
       50,
       50
      ]
     },
     {
      "id": 7,
      "parent": 3,
      "type": 4,
      "x": 111,
      "y": 76,
      "w": 190,
      "h": 26,
      "alpha": 255,
      "scaleX": 0.24000001,
      "scaleY": 1,
      "rotation": 20,
      "originX": 190,
      "originY": 13,
      "partListId": 1,
      "partId": 4,
      "nineGrid": [
       0,
       0,
       50,
       50
      ]
     },
     {
      "id": 8,
      "parent": 3,
      "type": 2,
      "x": 172,
      "y": 22,
      "w": 60,
      "h": 60,
      "alpha": 0,
      "scaleX": 3,
      "scaleY": 3,
      "rotation": 0,
      "originX": 30,
      "originY": 30,
      "partListId": 1,
      "partId": 8,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 9,
      "parent": 3,
      "type": 4,
      "x": 106,
      "y": 40,
      "w": 190,
      "h": 26,
      "alpha": 36,
      "scaleX": 0.17142858,
      "scaleY": 1,
      "rotation": 0,
      "originX": 95,
      "originY": 13,
      "partListId": 1,
      "partId": 4,
      "nineGrid": [
       0,
       0,
       50,
       50
      ]
     },
     {
      "id": 10,
      "parent": 3,
      "type": 2,
      "x": -7,
      "y": 28,
      "w": 32,
      "h": 66,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 6,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 11,
      "parent": 3,
      "type": 1,
      "x": 15,
      "y": -6,
      "w": 370,
      "h": 100,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 12,
      "parent": 11,
      "type": 1001,
      "x": 93,
      "y": 9,
      "w": 4,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 13,
      "parent": 11,
      "type": 2,
      "x": 93,
      "y": 24,
      "w": 276,
      "h": 50,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 1,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 14,
      "parent": 11,
      "type": 2,
      "x": 93,
      "y": 24,
      "w": 276,
      "h": 50,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "add": [
       255,
       100,
       -10
      ],
      "partListId": 1,
      "partId": 2,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 15,
      "parent": 11,
      "type": 2,
      "x": 93,
      "y": 24,
      "w": 276,
      "h": 50,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "add": [
       -100,
       -100,
       -40
      ],
      "partListId": 1,
      "partId": 2,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 16,
      "parent": 11,
      "type": 2,
      "x": 93,
      "y": 24,
      "w": 276,
      "h": 50,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 2,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 17,
      "parent": 3,
      "type": 2,
      "x": 0,
      "y": 20,
      "w": 106,
      "h": 50,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 0,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 18,
      "parent": 3,
      "type": 4,
      "x": 30,
      "y": 2,
      "w": 80,
      "h": 38,
      "alpha": 204,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 9,
      "nineGrid": [
       12,
       12,
       15,
       15
      ]
     },
     {
      "id": 19,
      "parent": 2,
      "type": 1,
      "x": 0,
      "y": 24,
      "w": 103,
      "h": 69,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 20,
      "parent": 19,
      "type": 1003,
      "x": 17,
      "y": 29,
      "w": 24,
      "h": 20,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 21,
      "parent": 19,
      "type": 1003,
      "x": 40,
      "y": 23,
      "w": 24,
      "h": 20,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 22,
      "parent": 19,
      "type": 1003,
      "x": 63,
      "y": 29,
      "w": 24,
      "h": 20,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 23,
      "parent": 19,
      "type": 2,
      "x": 1,
      "y": 5,
      "w": 102,
      "h": 64,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 10,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 24,
      "parent": 1,
      "type": 1,
      "x": 85,
      "y": 20,
      "w": 160,
      "h": 48,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 25,
      "parent": 24,
      "type": 1,
      "x": 0,
      "y": 12,
      "w": 72,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 26,
      "parent": 25,
      "type": 1004,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 27,
      "parent": 25,
      "type": 1004,
      "x": 20,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 28,
      "parent": 25,
      "type": 1004,
      "x": 40,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 29,
      "parent": 24,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 160,
      "h": 50,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 30,
      "parent": 29,
      "type": 1005,
      "x": 112,
      "y": 10,
      "w": 47,
      "h": 40,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 31,
      "parent": 29,
      "type": 1002,
      "x": 0,
      "y": 4,
      "w": 160,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     }
    ]
   },
   "JobHudSAM1": {
    "partLists": [
     {
      "id": 1,
      "parts": [
       {
        "texture": "JobHudSAM1",
        "u": 0,
        "v": 0,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 80,
        "v": 0,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 160,
        "v": 0,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 0,
        "v": 80,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 80,
        "v": 80,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 160,
        "v": 80,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 0,
        "v": 160,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 80,
        "v": 160,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 160,
        "v": 160,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 240,
        "v": 0,
        "w": 58,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 298,
        "v": 0,
        "w": 58,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 240,
        "v": 80,
        "w": 58,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 298,
        "v": 80,
        "w": 58,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 240,
        "v": 160,
        "w": 58,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 298,
        "v": 160,
        "w": 58,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 0,
        "v": 240,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 80,
        "v": 240,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 160,
        "v": 240,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 240,
        "v": 240,
        "w": 78,
        "h": 78
       },
       {
        "texture": "JobHudSAM1",
        "u": 318,
        "v": 240,
        "w": 54,
        "h": 54
       },
       {
        "texture": "JobHudSAM1",
        "u": 0,
        "v": 320,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 80,
        "v": 320,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 160,
        "v": 320,
        "w": 80,
        "h": 80
       },
       {
        "texture": "JobHudSAM1",
        "u": 240,
        "v": 318,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSAM1",
        "u": 272,
        "v": 318,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSAM1",
        "u": 304,
        "v": 318,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSAM1",
        "u": 240,
        "v": 350,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSAM1",
        "u": 272,
        "v": 350,
        "w": 32,
        "h": 32
       },
       {
        "texture": "JobHudSAM1",
        "u": 304,
        "v": 350,
        "w": 32,
        "h": 32
       }
      ]
     }
    ],
    "components": [],
    "nodes": [
     {
      "id": 1,
      "parent": 0,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 170,
      "h": 158,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 2,
      "parent": 1,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 170,
      "h": 156,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 3,
      "parent": 2,
      "type": 1,
      "x": 44,
      "y": 4,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 4,
      "parent": 3,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 5,
      "parent": 4,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 10,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 20,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 6,
      "parent": 4,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 30,
      "scaleX": 1.04,
      "scaleY": 1.04,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 15,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 7,
      "parent": 3,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 0,
      "scaleX": 1.2,
      "scaleY": 1.2,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 20,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 8,
      "parent": 3,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 216,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 6,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 9,
      "parent": 3,
      "type": 2,
      "x": 12,
      "y": 0,
      "w": 58,
      "h": 80,
      "alpha": 0,
      "scaleX": 1.2,
      "scaleY": 1.2,
      "rotation": 0,
      "originX": 29,
      "originY": 40,
      "partListId": 1,
      "partId": 9,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 10,
      "parent": 3,
      "type": 2,
      "x": 12,
      "y": 0,
      "w": 58,
      "h": 80,
      "alpha": 0,
      "scaleX": 1.2,
      "scaleY": 1.2,
      "rotation": 0,
      "originX": 29,
      "originY": 40,
      "partListId": 1,
      "partId": 10,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 11,
      "parent": 3,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 0,
      "scaleX": 1.4,
      "scaleY": 1.4,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "add": [
       0,
       50,
       50
      ],
      "partListId": 1,
      "partId": 15,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 12,
      "parent": 3,
      "type": 2,
      "x": 12,
      "y": 12,
      "w": 54,
      "h": 54,
      "alpha": 145,
      "scaleX": 1.1428572,
      "scaleY": 1.1428572,
      "rotation": 0,
      "originX": 27,
      "originY": 27,
      "partListId": 1,
      "partId": 19,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 13,
      "parent": 3,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 0,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 14,
      "parent": 3,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 3,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 15,
      "parent": 2,
      "type": 1,
      "x": 0,
      "y": 76,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 16,
      "parent": 15,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 17,
      "parent": 16,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 3,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 21,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 18,
      "parent": 16,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 10,
      "scaleX": 1.0133333,
      "scaleY": 1.0133333,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 16,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 19,
      "parent": 15,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 76,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 21,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 20,
      "parent": 15,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 191,
      "scaleX": 1.25,
      "scaleY": 1.25,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 7,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 21,
      "parent": 15,
      "type": 2,
      "x": 4,
      "y": -8,
      "w": 58,
      "h": 80,
      "alpha": 0,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 29,
      "originY": 40,
      "partListId": 1,
      "partId": 13,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 22,
      "parent": 15,
      "type": 2,
      "x": 4,
      "y": -8,
      "w": 58,
      "h": 80,
      "alpha": 0,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 29,
      "originY": 40,
      "partListId": 1,
      "partId": 14,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 23,
      "parent": 15,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 68,
      "scaleX": 1.0666667,
      "scaleY": 1.0666667,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "add": [
       0,
       50,
       80
      ],
      "partListId": 1,
      "partId": 16,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 24,
      "parent": 15,
      "type": 2,
      "x": 12,
      "y": 12,
      "w": 54,
      "h": 54,
      "alpha": 0,
      "scaleX": 2,
      "scaleY": 2,
      "rotation": 0,
      "originX": 27,
      "originY": 27,
      "partListId": 1,
      "partId": 19,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 25,
      "parent": 15,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 191,
      "scaleX": 1.125,
      "scaleY": 1.125,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 1,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 26,
      "parent": 15,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 4,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 27,
      "parent": 2,
      "type": 1,
      "x": 90,
      "y": 73,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 28,
      "parent": 27,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 29,
      "parent": 28,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 3,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 22,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 30,
      "parent": 28,
      "type": 2,
      "x": 0,
      "y": -2,
      "w": 80,
      "h": 80,
      "alpha": 10,
      "scaleX": 1.0133333,
      "scaleY": 1.0133333,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 17,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 31,
      "parent": 27,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 76,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 22,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 32,
      "parent": 27,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 191,
      "scaleX": 1.25,
      "scaleY": 1.25,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 8,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 33,
      "parent": 27,
      "type": 2,
      "x": 12,
      "y": 0,
      "w": 58,
      "h": 80,
      "alpha": 0,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 29,
      "originY": 40,
      "partListId": 1,
      "partId": 11,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 34,
      "parent": 27,
      "type": 2,
      "x": 12,
      "y": 0,
      "w": 58,
      "h": 80,
      "alpha": 0,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 29,
      "originY": 40,
      "partListId": 1,
      "partId": 12,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 35,
      "parent": 27,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 68,
      "scaleX": 1.0666667,
      "scaleY": 1.0666667,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "add": [
       0,
       50,
       80
      ],
      "partListId": 1,
      "partId": 17,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 36,
      "parent": 27,
      "type": 2,
      "x": 12,
      "y": 12,
      "w": 54,
      "h": 54,
      "alpha": 0,
      "scaleX": 2,
      "scaleY": 2,
      "rotation": 0,
      "originX": 27,
      "originY": 27,
      "partListId": 1,
      "partId": 19,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 37,
      "parent": 27,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 191,
      "scaleX": 1.125,
      "scaleY": 1.125,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 2,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 38,
      "parent": 27,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 80,
      "h": 80,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 40,
      "originY": 40,
      "partListId": 1,
      "partId": 5,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 39,
      "parent": 1,
      "type": 1,
      "x": 50,
      "y": 63,
      "w": 70,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 40,
      "parent": 39,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 70,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 41,
      "parent": 40,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 42,
      "parent": 41,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 16,
      "originY": 16
     },
     {
      "id": 43,
      "parent": 42,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 16,
      "originY": 16,
      "partListId": 1,
      "partId": 26,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 44,
      "parent": 41,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 23,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 45,
      "parent": 40,
      "type": 1,
      "x": 19,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 46,
      "parent": 45,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 127,
      "scaleX": 1.75,
      "scaleY": 1.75,
      "rotation": 0,
      "originX": 16,
      "originY": 16,
      "add": [
       40,
       40,
       40
      ]
     },
     {
      "id": 47,
      "parent": 46,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 16,
      "originY": 16,
      "partListId": 1,
      "partId": 27,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 48,
      "parent": 45,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 24,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 49,
      "parent": 40,
      "type": 1,
      "x": 38,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0
     },
     {
      "id": 50,
      "parent": 49,
      "type": 1,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 0,
      "scaleX": 2.5,
      "scaleY": 2.5,
      "rotation": 0,
      "originX": 16,
      "originY": 16
     },
     {
      "id": 51,
      "parent": 50,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 16,
      "originY": 16,
      "partListId": 1,
      "partId": 28,
      "flipH": false,
      "flipV": false
     },
     {
      "id": 52,
      "parent": 49,
      "type": 2,
      "x": 0,
      "y": 0,
      "w": 32,
      "h": 32,
      "alpha": 255,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "originX": 0,
      "originY": 0,
      "partListId": 1,
      "partId": 25,
      "flipH": false,
      "flipV": false
     }
    ]
   }
  },
  "textures": {
   "JobHudSAM0": {
    "path": "../public/icons/job-gauges/textures/JobHudSAM0.png",
    "w": 788,
    "h": 476,
    "scale": 2
   },
   "JobHudSimple_StackA": {
    "path": "../public/icons/job-gauges/textures/JobHudSimple_StackA.png",
    "w": 128,
    "h": 128,
    "scale": 2
   },
   "JobHudNumBg": {
    "path": "../public/icons/job-gauges/textures/JobHudNumBg.png",
    "w": 120,
    "h": 80,
    "scale": 2
   },
   "Parameter_Gauge": {
    "path": "../public/icons/job-gauges/textures/Parameter_Gauge.png",
    "w": 320,
    "h": 304,
    "scale": 2
   },
   "JobHudSAM1": {
    "path": "../public/icons/job-gauges/textures/JobHudSAM1.png",
    "w": 744,
    "h": 800,
    "scale": 2
   }
  },
  "sizes": {
   "JobHudSAM0": [
    330,
    88
   ],
   "JobHudSAM1": [
    170,
    158
   ]
  }
 },
 "dmgUp": {
  "風月": 13
 },
 "display": {
  "width": 3840,
  "height": 2160,
  "mode": 2,
  "uiScale": 2,
  "uiHighScale": 2,
  "deadArea": 0.55,
  "pad": {
   "L2": "XHB_Left_Start",
   "R2": "XHB_Right_Start",
   "L1": "Autorun_Support",
   "R1": "Hotbar_Set_Change",
   "Triangle": "Jump",
   "Circle": "Accept",
   "Cross": "Cancel",
   "Square": "Map_Sub",
   "Select": "HUD_Select",
   "Start": "MainCommand",
   "LS": "Move_Operation",
   "RS": "Camera_Operation",
   "L3": "Lockon_and_Sword",
   "R3": "Camera_Modechange"
  }
 },
 "known": {
  "9": [
   "ファストブレード",
   0
  ],
  "15": [
   "ライオットソード",
   0
  ],
  "16": [
   "シールドバッシュ",
   0
  ],
  "17": [
   "センチネル",
   0
  ],
  "20": [
   "ファイト・オア・フライト",
   0
  ],
  "21": [
   "レイジ・オブ・ハルオーネ",
   0
  ],
  "22": [
   "ブルワーク",
   0
  ],
  "23": [
   "サークル・オブ・ドゥーム",
   0
  ],
  "24": [
   "シールドロブ",
   0
  ],
  "27": [
   "かばう",
   0
  ],
  "28": [
   "アイアンウィル",
   0
  ],
  "29": [
   "スピリッツウィズイン",
   0
  ],
  "30": [
   "インビンシブル",
   0
  ],
  "31": [
   "ヘヴィスウィング",
   0
  ],
  "37": [
   "メイム",
   0
  ],
  "38": [
   "バーサク",
   0
  ],
  "40": [
   "スリル・オブ・バトル",
   0
  ],
  "41": [
   "オーバーパワー",
   0
  ],
  "42": [
   "シュトルムヴィント",
   0
  ],
  "43": [
   "ホルムギャング",
   0
  ],
  "44": [
   "ヴェンジェンス",
   0
  ],
  "45": [
   "シュトルムブレハ",
   0
  ],
  "46": [
   "トマホーク",
   0
  ],
  "48": [
   "ディフェンダー",
   0
  ],
  "49": [
   "原初の魂",
   0
  ],
  "51": [
   "スチールサイクロン",
   0
  ],
  "52": [
   "ウォークライ",
   0
  ],
  "53": [
   "連撃",
   0
  ],
  "54": [
   "正拳突き",
   0
  ],
  "56": [
   "崩拳",
   0
  ],
  "61": [
   "双掌打",
   0
  ],
  "62": [
   "壊神衝",
   0
  ],
  "65": [
   "マントラ",
   0
  ],
  "66": [
   "破砕拳",
   0
  ],
  "69": [
   "踏鳴",
   0
  ],
  "70": [
   "地烈斬",
   0
  ],
  "74": [
   "双竜脚",
   0
  ],
  "75": [
   "トゥルースラスト",
   0
  ],
  "78": [
   "ボーパルスラスト",
   0
  ],
  "83": [
   "ライフサージ",
   0
  ],
  "84": [
   "フルスラスト",
   0
  ],
  "85": [
   "ランスチャージ",
   0
  ],
  "86": [
   "ドゥームスパイク",
   0
  ],
  "87": [
   "ディセムボウル",
   0
  ],
  "88": [
   "桜華狂咲",
   0
  ],
  "90": [
   "ピアシングタロン",
   0
  ],
  "92": [
   "ジャンプ",
   0
  ],
  "94": [
   "イルーシブジャンプ",
   0
  ],
  "96": [
   "ドラゴンダイブ",
   0
  ],
  "97": [
   "ヘヴィショット",
   0
  ],
  "98": [
   "ストレートショット",
   0
  ],
  "100": [
   "ベノムバイト",
   0
  ],
  "101": [
   "猛者の撃",
   0
  ],
  "106": [
   "クイックノック",
   0
  ],
  "107": [
   "乱れ撃ち",
   0
  ],
  "110": [
   "ブラッドレッター",
   0
  ],
  "112": [
   "リペリングショット",
   0
  ],
  "113": [
   "ウィンドバイト",
   0
  ],
  "114": [
   "賢人のバラード",
   0
  ],
  "116": [
   "軍神のパイオン",
   0
  ],
  "117": [
   "レイン・オブ・デス",
   0
  ],
  "118": [
   "バトルボイス",
   0
  ],
  "119": [
   "ストーン",
   0
  ],
  "120": [
   "ケアル",
   0
  ],
  "121": [
   "エアロ",
   0
  ],
  "124": [
   "メディカ",
   0
  ],
  "125": [
   "レイズ",
   0
  ],
  "127": [
   "ストンラ",
   0
  ],
  "131": [
   "ケアルガ",
   0
  ],
  "132": [
   "エアロラ",
   0
  ],
  "133": [
   "メディカラ",
   0
  ],
  "135": [
   "ケアルラ",
   0
  ],
  "136": [
   "神速魔",
   0
  ],
  "137": [
   "リジェネ",
   0
  ],
  "139": [
   "ホーリー",
   0
  ],
  "140": [
   "ベネディクション",
   0
  ],
  "141": [
   "ファイア",
   0
  ],
  "142": [
   "ブリザド",
   0
  ],
  "144": [
   "サンダー",
   0
  ],
  "147": [
   "ファイラ",
   0
  ],
  "149": [
   "トランス",
   0
  ],
  "152": [
   "ファイガ",
   0
  ],
  "153": [
   "サンダガ",
   0
  ],
  "154": [
   "ブリザガ",
   0
  ],
  "155": [
   "エーテリアルステップ",
   0
  ],
  "156": [
   "コラプス",
   0
  ],
  "157": [
   "マバリア",
   0
  ],
  "158": [
   "マナフォント",
   0
  ],
  "159": [
   "フリーズ",
   0
  ],
  "162": [
   "フレア",
   0
  ],
  "163": [
   "ルイン",
   0
  ],
  "166": [
   "エーテルフロー",
   0
  ],
  "167": [
   "エナジードレイン",
   0
  ],
  "172": [
   "ルインラ",
   0
  ],
  "173": [
   "リザレク",
   0
  ],
  "181": [
   "ミアズマバースト",
   0
  ],
  "185": [
   "鼓舞激励の策",
   0
  ],
  "186": [
   "士気高揚の策",
   0
  ],
  "188": [
   "野戦治療の陣",
   0
  ],
  "189": [
   "生命活性法",
   0
  ],
  "190": [
   "フィジク",
   0
  ],
  "2240": [
   "双刃旋",
   0
  ],
  "2241": [
   "残影",
   0
  ],
  "2242": [
   "風断ち",
   0
  ],
  "2245": [
   "かくれる",
   0
  ],
  "2246": [
   "終撃",
   0
  ],
  "2247": [
   "投刃",
   0
  ],
  "2248": [
   "ぶんどる",
   0
  ],
  "2254": [
   "血花五月雨",
   0
  ],
  "2255": [
   "旋風刃",
   0
  ],
  "2258": [
   "だまし討ち",
   0
  ],
  "2259": [
   "天の印",
   0
  ],
  "2260": [
   "忍術",
   0
  ],
  "2261": [
   "地の印",
   0
  ],
  "2262": [
   "縮地",
   0
  ],
  "2263": [
   "人の印",
   0
  ],
  "2264": [
   "活殺自在",
   0
  ],
  "2864": [
   "オートタレット・ルーク",
   0
  ],
  "2866": [
   "スプリットショット",
   0
  ],
  "2868": [
   "スラッグショット",
   0
  ],
  "2870": [
   "スプレッドショット",
   0
  ],
  "2872": [
   "ホットショット",
   0
  ],
  "2873": [
   "クリーンショット",
   0
  ],
  "2874": [
   "ガウスラウンド",
   0
  ],
  "2876": [
   "整備",
   0
  ],
  "2878": [
   "ワイルドファイア",
   0
  ],
  "2887": [
   "ウェポンブレイク",
   0
  ],
  "2890": [
   "リコシェット",
   0
  ],
  "3538": [
   "ゴアブレード",
   0
  ],
  "3539": [
   "ロイヤルアソリティ",
   0
  ],
  "3540": [
   "ディヴァインヴェール",
   0
  ],
  "3541": [
   "クレメンシー",
   0
  ],
  "3542": [
   "シェルトロン",
   0
  ],
  "3547": [
   "陰陽闘気斬",
   0
  ],
  "3549": [
   "フェルクリーヴ",
   0
  ],
  "3550": [
   "デシメート",
   0
  ],
  "3551": [
   "原初の直感",
   0
  ],
  "3552": [
   "エクリブリウム",
   0
  ],
  "3554": [
   "竜牙竜爪",
   0
  ],
  "3555": [
   "ゲイルスコグル",
   0
  ],
  "3556": [
   "竜尾大車輪",
   0
  ],
  "3557": [
   "バトルリタニー",
   0
  ],
  "3558": [
   "エンピリアルアロー",
   0
  ],
  "3559": [
   "旅神のメヌエット",
   0
  ],
  "3560": [
   "アイアンジョー",
   0
  ],
  "3561": [
   "時神のピーアン",
   0
  ],
  "3562": [
   "サイドワインダー",
   0
  ],
  "3563": [
   "強甲破点突",
   0
  ],
  "3566": [
   "夢幻三段",
   0
  ],
  "3568": [
   "ストンガ",
   0
  ],
  "3569": [
   "アサイラム",
   0
  ],
  "3570": [
   "テトラグラマトン",
   0
  ],
  "3571": [
   "アサイズ",
   0
  ],
  "3573": [
   "黒魔紋",
   0
  ],
  "3576": [
   "ブリザジャ",
   0
  ],
  "3577": [
   "ファイジャ",
   0
  ],
  "3578": [
   "ペインフレア",
   0
  ],
  "3579": [
   "ルインガ",
   0
  ],
  "3581": [
   "トランス・バハムート",
   0
  ],
  "3583": [
   "不撓不屈の策",
   0
  ],
  "3584": [
   "気炎法",
   0
  ],
  "3585": [
   "展開戦術",
   0
  ],
  "3586": [
   "応急戦術",
   0
  ],
  "3587": [
   "転化",
   0
  ],
  "3594": [
   "ベネフィク",
   0
  ],
  "3595": [
   "アスペクト・ベネフィク",
   0
  ],
  "3596": [
   "マレフィク",
   0
  ],
  "3598": [
   "マレフィラ",
   0
  ],
  "3599": [
   "コンバス",
   0
  ],
  "3600": [
   "ヘリオス",
   0
  ],
  "3601": [
   "アスペクト・ヘリオス",
   0
  ],
  "3603": [
   "アセンド",
   0
  ],
  "3606": [
   "ライトスピード",
   0
  ],
  "3608": [
   "コンバラ",
   0
  ],
  "3610": [
   "ベネフィラ",
   0
  ],
  "3612": [
   "シナストリー",
   0
  ],
  "3613": [
   "運命の輪",
   0
  ],
  "3614": [
   "ディグニティ",
   0
  ],
  "3615": [
   "グラビデ",
   0
  ],
  "3617": [
   "ハードスラッシュ",
   0
  ],
  "3621": [
   "アンリーシュ",
   0
  ],
  "3623": [
   "サイフォンストライク",
   0
  ],
  "3624": [
   "アンメンド",
   0
  ],
  "3625": [
   "ブラッドウェポン",
   0
  ],
  "3629": [
   "グリットスタンス",
   0
  ],
  "3632": [
   "ソウルイーター",
   0
  ],
  "3634": [
   "ダークマインド",
   0
  ],
  "3636": [
   "シャドウウォール",
   0
  ],
  "3638": [
   "リビングデッド",
   0
  ],
  "3639": [
   "ソルトアース",
   0
  ],
  "3641": [
   "アビサルドレイン",
   0
  ],
  "3643": [
   "カーヴ・アンド・スピット",
   0
  ],
  "4262": [
   "演武",
   0
  ],
  "7381": [
   "トータルエクリプス",
   0
  ],
  "7382": [
   "インターベンション",
   0
  ],
  "7383": [
   "レクイエスカット",
   0
  ],
  "7384": [
   "ホーリースピリット",
   0
  ],
  "7385": [
   "パッセージ・オブ・アームズ",
   0
  ],
  "7386": [
   "オンスロート",
   0
  ],
  "7387": [
   "アップヒーバル",
   0
  ],
  "7388": [
   "シェイクオフ",
   0
  ],
  "7389": [
   "原初の解放",
   0
  ],
  "7390": [
   "ブラッドデリリアム",
   0
  ],
  "7391": [
   "クワイタス",
   0
  ],
  "7392": [
   "ブラッドスピラー",
   0
  ],
  "7393": [
   "ブラックナイト",
   0
  ],
  "7394": [
   "金剛の極意",
   0
  ],
  "7395": [
   "紅蓮の極意",
   0
  ],
  "7396": [
   "桃園結義",
   0
  ],
  "7397": [
   "ソニックスラスト",
   0
  ],
  "7399": [
   "ミラージュダイブ",
   0
  ],
  "7400": [
   "ナーストレンド",
   0
  ],
  "7401": [
   "口寄せの術・大蝦蟇",
   0
  ],
  "7402": [
   "六道輪廻",
   0
  ],
  "7403": [
   "天地人",
   0
  ],
  "7404": [
   "ピッチパーフェクト",
   0
  ],
  "7405": [
   "トルバドゥール",
   0
  ],
  "7406": [
   "コースティックバイト",
   0
  ],
  "7407": [
   "ストームバイト",
   0
  ],
  "7408": [
   "地神のミンネ",
   0
  ],
  "7409": [
   "リフルジェントアロー",
   0
  ],
  "7410": [
   "ヒートブラスト",
   0
  ],
  "7411": [
   "ヒートスプリットショット",
   0
  ],
  "7412": [
   "ヒートスラッグショット",
   0
  ],
  "7413": [
   "ヒートクリーンショット",
   0
  ],
  "7414": [
   "バレルヒーター",
   0
  ],
  "7415": [
   "オーバードライブ・ルーク",
   0
  ],
  "7418": [
   "フレイムスロアー",
   0
  ],
  "7419": [
   "ラインズステップ",
   0
  ],
  "7420": [
   "サンダジャ",
   0
  ],
  "7421": [
   "三連魔",
   0
  ],
  "7422": [
   "ファウル",
   0
  ],
  "7426": [
   "ルインジャ",
   0
  ],
  "7427": [
   "サモン・バハムート",
   0
  ],
  "7429": [
   "エンキンドル・バハムート",
   0
  ],
  "7430": [
   "シンエアー",
   0
  ],
  "7431": [
   "ストンジャ",
   0
  ],
  "7432": [
   "ディヴァインベニゾン",
   0
  ],
  "7433": [
   "インドゥルゲンティア",
   0
  ],
  "7434": [
   "深謀遠慮の策",
   0
  ],
  "7435": [
   "魔炎法",
   0
  ],
  "7436": [
   "連環計",
   0
  ],
  "7437": [
   "エーテルパクト",
   0
  ],
  "7439": [
   "アーサリースター",
   0
  ],
  "7442": [
   "マレフィガ",
   0
  ],
  "7447": [
   "サンダラ",
   0
  ],
  "7477": [
   "刃風",
   1
  ],
  "7478": [
   "陣風",
   1
  ],
  "7479": [
   "士風",
   1
  ],
  "7480": [
   "雪風",
   1
  ],
  "7481": [
   "月光",
   1
  ],
  "7482": [
   "花車",
   1
  ],
  "7483": [
   "風雅",
   1
  ],
  "7484": [
   "満月",
   1
  ],
  "7485": [
   "桜花",
   1
  ],
  "7486": [
   "燕飛",
   1
  ],
  "7490": [
   "必殺剣・震天",
   1
  ],
  "7491": [
   "必殺剣・九天",
   1
  ],
  "7492": [
   "必殺剣・暁天",
   1
  ],
  "7493": [
   "必殺剣・夜天",
   1
  ],
  "7495": [
   "葉隠",
   1
  ],
  "7496": [
   "必殺剣・紅蓮",
   1
  ],
  "7497": [
   "黙想",
   1
  ],
  "7498": [
   "心眼",
   1
  ],
  "7499": [
   "明鏡止水",
   1
  ],
  "7503": [
   "ジョルト",
   0
  ],
  "7504": [
   "リポスト",
   0
  ],
  "7505": [
   "ヴァルサンダー",
   0
  ],
  "7506": [
   "コル・ア・コル",
   0
  ],
  "7507": [
   "ヴァルエアロ",
   0
  ],
  "7509": [
   "スキャッター",
   0
  ],
  "7510": [
   "ヴァルファイア",
   0
  ],
  "7511": [
   "ヴァルストーン",
   0
  ],
  "7512": [
   "ツヴェルクハウ",
   0
  ],
  "7513": [
   "ムーリネ",
   0
  ],
  "7514": [
   "ヴァルケアル",
   0
  ],
  "7515": [
   "デプラスマン",
   0
  ],
  "7516": [
   "ルドゥブルマン",
   0
  ],
  "7517": [
   "フレッシュ",
   0
  ],
  "7518": [
   "アクセラレーション",
   0
  ],
  "7519": [
   "コントルシクスト",
   0
  ],
  "7520": [
   "エンボルデン",
   0
  ],
  "7521": [
   "マナフィケーション",
   0
  ],
  "7523": [
   "ヴァルレイズ",
   0
  ],
  "7524": [
   "ジョルラ",
   0
  ],
  "7531": [
   "ランパート",
   0
  ],
  "7533": [
   "挑発",
   0
  ],
  "7535": [
   "リプライザル",
   0
  ],
  "7537": [
   "シャーク",
   0
  ],
  "7538": [
   "インタージェクト",
   0
  ],
  "7540": [
   "ロウブロウ",
   0
  ],
  "7541": [
   "内丹",
   1
  ],
  "7542": [
   "ブラッドバス",
   1
  ],
  "7546": [
   "トゥルーノース",
   1
  ],
  "7548": [
   "アームズレングス",
   1
  ],
  "7549": [
   "牽制",
   1
  ],
  "7551": [
   "ヘッドグレイズ",
   0
  ],
  "7553": [
   "フットグレイズ",
   0
  ],
  "7554": [
   "レッググレイズ",
   0
  ],
  "7557": [
   "プロトン",
   0
  ],
  "7559": [
   "堅実魔",
   0
  ],
  "7560": [
   "アドル",
   0
  ],
  "7561": [
   "迅速魔",
   0
  ],
  "7562": [
   "ルーシッドドリーム",
   0
  ],
  "7568": [
   "エスナ",
   0
  ],
  "7571": [
   "救出",
   0
  ],
  "7863": [
   "レッグスウィープ",
   1
  ],
  "7867": [
   "居合術",
   1
  ],
  "11383": [
   "鼻息",
   0
  ],
  "11384": [
   "4トンズ",
   0
  ],
  "11385": [
   "水鉄砲",
   0
  ],
  "11386": [
   "苦悶の歌",
   0
  ],
  "11387": [
   "高圧電流",
   0
  ],
  "11388": [
   "臭い息",
   0
  ],
  "11389": [
   "狂乱",
   0
  ],
  "11390": [
   "アクアブレス",
   0
  ],
  "11391": [
   "プレーンクラッカー",
   0
  ],
  "11392": [
   "どんぐり爆弾",
   0
  ],
  "11393": [
   "怒髪天",
   0
  ],
  "11394": [
   "マインドブラスト",
   0
  ],
  "11395": [
   "吸血",
   0
  ],
  "11396": [
   "爆弾投げ",
   0
  ],
  "11397": [
   "針千本",
   0
  ],
  "11398": [
   "ドリルキャノン",
   0
  ],
  "11399": [
   "怪視線",
   0
  ],
  "11400": [
   "とぎたて",
   0
  ],
  "11401": [
   "ルーム",
   0
  ],
  "11402": [
   "火炎放射",
   0
  ],
  "11403": [
   "猫だまし",
   0
  ],
  "11404": [
   "グラワー",
   0
  ],
  "11405": [
   "ミサイル",
   0
  ],
  "11406": [
   "ホワイトウィンド",
   0
  ],
  "11407": [
   "ファイナルスピア",
   0
  ],
  "11408": [
   "自爆",
   0
  ],
  "11409": [
   "融合",
   0
  ],
  "11410": [
   "ガマの脂",
   0
  ],
  "11411": [
   "ガードオファ",
   0
  ],
  "11412": [
   "スティッキータン",
   0
  ],
  "11413": [
   "テールスクリュー",
   0
  ],
  "11414": [
   "レベル5石化",
   0
  ],
  "11415": [
   "月の笛",
   0
  ],
  "11416": [
   "死の宣告",
   0
  ],
  "11417": [
   "マイティガード",
   0
  ],
  "11418": [
   "アイススパイク",
   0
  ],
  "11419": [
   "氷結の咆哮",
   0
  ],
  "11420": [
   "雷電の咆哮",
   0
  ],
  "11421": [
   "不思議な光",
   0
  ],
  "11422": [
   "インクジェット",
   0
  ],
  "11423": [
   "フライングサーディン",
   0
  ],
  "11424": [
   "超硬化",
   0
  ],
  "11425": [
   "ファイアアンゴン",
   0
  ],
  "11426": [
   "フェザーレイン",
   0
  ],
  "11427": [
   "エラプション",
   0
  ],
  "11428": [
   "マウンテンバスター",
   0
  ],
  "11429": [
   "ショックストライク",
   0
  ],
  "11430": [
   "氷雪乱舞",
   0
  ],
  "11431": [
   "水神のヴェール",
   0
  ],
  "15989": [
   "カスケード",
   0
  ],
  "15990": [
   "ファウンテン",
   0
  ],
  "15991": [
   "リバースカスケード",
   0
  ],
  "15992": [
   "ファウンテンフォール",
   0
  ],
  "15993": [
   "ウィンドミル",
   0
  ],
  "15994": [
   "ブレードシャワー",
   0
  ],
  "15995": [
   "ライジングウィンドミル",
   0
  ],
  "15996": [
   "ブラッドシャワー",
   0
  ],
  "15997": [
   "スタンダードステップ",
   0
  ],
  "15998": [
   "テクニカルステップ",
   0
  ],
  "16005": [
   "剣の舞い",
   0
  ],
  "16006": [
   "クローズドポジション",
   0
  ],
  "16007": [
   "扇の舞い【序】",
   0
  ],
  "16008": [
   "扇の舞い【破】",
   0
  ],
  "16009": [
   "扇の舞い【急】",
   0
  ],
  "16010": [
   "アン・アヴァン",
   0
  ],
  "16011": [
   "攻めのタンゴ",
   0
  ],
  "16012": [
   "守りのサンバ",
   0
  ],
  "16013": [
   "フラリッシュ",
   0
  ],
  "16014": [
   "インプロビゼーション",
   0
  ],
  "16015": [
   "癒やしのワルツ",
   0
  ],
  "16137": [
   "キーンエッジ",
   0
  ],
  "16138": [
   "ノー・マーシー",
   0
  ],
  "16139": [
   "ブルータルシェル",
   0
  ],
  "16140": [
   "カモフラージュ",
   0
  ],
  "16141": [
   "デーモンスライス",
   0
  ],
  "16142": [
   "ロイヤルガード",
   0
  ],
  "16143": [
   "サンダーバレット",
   0
  ],
  "16144": [
   "デンジャーゾーン",
   0
  ],
  "16145": [
   "ソリッドバレル",
   0
  ],
  "16146": [
   "ビートファング",
   0
  ],
  "16148": [
   "ネビュラ",
   0
  ],
  "16149": [
   "デーモンスローター",
   0
  ],
  "16151": [
   "オーロラ",
   0
  ],
  "16152": [
   "ボーライド",
   0
  ],
  "16153": [
   "ソニックブレイク",
   0
  ],
  "16155": [
   "コンティニュエーション",
   0
  ],
  "16159": [
   "バウショック",
   0
  ],
  "16160": [
   "ハート・オブ・ライト",
   0
  ],
  "16161": [
   "ハート・オブ・ストーン",
   0
  ],
  "16162": [
   "バーストストライク",
   0
  ],
  "16163": [
   "フェイテッドサークル",
   0
  ],
  "16164": [
   "ブラッドソイル",
   0
  ],
  "16165": [
   "ブラスティングゾーン",
   0
  ],
  "16230": [
   "フィジク",
   0
  ],
  "16457": [
   "プロミネンス",
   0
  ],
  "16458": [
   "ホーリーサークル",
   0
  ],
  "16459": [
   "コンフィテオル",
   0
  ],
  "16460": [
   "ロイエ",
   0
  ],
  "16461": [
   "インターヴィーン",
   0
  ],
  "16462": [
   "ミスリルテンペスト",
   0
  ],
  "16464": [
   "原初の猛り",
   0
  ],
  "16466": [
   "暗黒の波動",
   0
  ],
  "16467": [
   "暗黒の剣",
   0
  ],
  "16468": [
   "ストルワートソウル",
   0
  ],
  "16469": [
   "漆黒の波動",
   0
  ],
  "16470": [
   "漆黒の剣",
   0
  ],
  "16471": [
   "ダークミッショナリー",
   0
  ],
  "16472": [
   "影身具現",
   0
  ],
  "16473": [
   "四面脚",
   0
  ],
  "16474": [
   "万象闘気圏",
   0
  ],
  "16476": [
   "六合星導脚",
   0
  ],
  "16477": [
   "クルザントーメント",
   0
  ],
  "16478": [
   "ハイジャンプ",
   0
  ],
  "16480": [
   "スターダイバー",
   0
  ],
  "16481": [
   "必殺剣・閃影",
   1
  ],
  "16482": [
   "意気衝天",
   1
  ],
  "16483": [
   "燕返し",
   1
  ],
  "16487": [
   "照破",
   1
  ],
  "16488": [
   "八卦無刃殺",
   0
  ],
  "16489": [
   "命水",
   0
  ],
  "16493": [
   "分身の術",
   0
  ],
  "16494": [
   "シャドウバイト",
   0
  ],
  "16495": [
   "バーストショット",
   0
  ],
  "16496": [
   "エイペックスアロー",
   0
  ],
  "16497": [
   "オートボウガン",
   0
  ],
  "16498": [
   "ドリル",
   0
  ],
  "16499": [
   "バイオブラスト",
   0
  ],
  "16500": [
   "エアアンカー",
   0
  ],
  "16501": [
   "オートマトン・クイーン",
   0
  ],
  "16502": [
   "オーバードライブ・クイーン",
   0
  ],
  "16505": [
   "デスペア",
   0
  ],
  "16506": [
   "アンブラルソウル",
   0
  ],
  "16507": [
   "ゼノグロシー",
   0
  ],
  "16508": [
   "エナジードレイン",
   0
  ],
  "16510": [
   "エナジーサイフォン",
   0
  ],
  "16511": [
   "アウトバースト",
   0
  ],
  "16524": [
   "ヴァルサンダラ",
   0
  ],
  "16525": [
   "ヴァルエアロラ",
   0
  ],
  "16526": [
   "インパクト",
   0
  ],
  "16527": [
   "アンガジェマン",
   0
  ],
  "16529": [
   "ルプリーズ",
   0
  ],
  "16531": [
   "ハート・オブ・ソラス",
   0
  ],
  "16532": [
   "ディア",
   0
  ],
  "16533": [
   "グレア",
   0
  ],
  "16534": [
   "ハート・オブ・ラプチャー",
   0
  ],
  "16535": [
   "ハート・オブ・ミゼリ",
   0
  ],
  "16536": [
   "テンパランス",
   0
  ],
  "16537": [
   "光の囁き",
   0
  ],
  "16538": [
   "フェイイルミネーション",
   0
  ],
  "16539": [
   "破陣法",
   0
  ],
  "16540": [
   "蠱毒法",
   0
  ],
  "16541": [
   "死炎法",
   0
  ],
  "16542": [
   "秘策",
   0
  ],
  "16543": [
   "フェイブレッシング",
   0
  ],
  "16545": [
   "サモン・セラフィム",
   0
  ],
  "16546": [
   "コンソレイション",
   0
  ],
  "16552": [
   "ディヴィネーション",
   0
  ],
  "16553": [
   "星天対抗",
   0
  ],
  "16554": [
   "コンバガ",
   0
  ],
  "16555": [
   "マレフィジャ",
   0
  ],
  "16556": [
   "星天交差",
   0
  ],
  "16557": [
   "ホロスコープ",
   0
  ],
  "16559": [
   "ニュートラルセクト",
   0
  ],
  "16560": [
   "リポーズ",
   0
  ],
  "16889": [
   "タクティシャン",
   0
  ],
  "17209": [
   "ハイパーチャージ",
   0
  ],
  "17215": [
   "サモン・エオス",
   0
  ],
  "17864": [
   "バイオ",
   0
  ],
  "17865": [
   "バイオラ",
   0
  ],
  "17869": [
   "ルイン",
   0
  ],
  "17870": [
   "ルインラ",
   0
  ],
  "18295": [
   "アルペンドラフト",
   0
  ],
  "18296": [
   "プロティアンウェイブ",
   0
  ],
  "18297": [
   "猛吹雪",
   0
  ],
  "18298": [
   "エレクトロジェネシス",
   0
  ],
  "18299": [
   "カルトシュトラール",
   0
  ],
  "18300": [
   "アビサルトランスフィクション",
   0
  ],
  "18301": [
   "チャープ",
   0
  ],
  "18302": [
   "怪音波",
   0
  ],
  "18303": [
   "ポンポンケアル",
   0
  ],
  "18304": [
   "ゴブスキン",
   0
  ],
  "18305": [
   "マジックハンマー",
   0
  ],
  "18306": [
   "防御指示",
   0
  ],
  "18307": [
   "フロッグレッグ",
   0
  ],
  "18308": [
   "ソニックブーム",
   0
  ],
  "18309": [
   "ホイッスル",
   0
  ],
  "18310": [
   "ホワイトナイトツアー",
   0
  ],
  "18311": [
   "ブラックナイトツアー",
   0
  ],
  "18312": [
   "レベル5デス",
   0
  ],
  "18313": [
   "ランチャー",
   0
  ],
  "18314": [
   "パーペチュアルレイ",
   0
  ],
  "18315": [
   "カクトガード",
   0
  ],
  "18316": [
   "リベンジブラスト",
   0
  ],
  "18317": [
   "天使のささやき",
   0
  ],
  "18318": [
   "イグジュビエーション",
   0
  ],
  "18319": [
   "リフラックス",
   0
  ],
  "18320": [
   "捕食",
   0
  ],
  "18321": [
   "プチライブラ",
   0
  ],
  "18322": [
   "エーテルコピー",
   0
  ],
  "18323": [
   "徹甲散弾",
   0
  ],
  "18324": [
   "クエーサー",
   0
  ],
  "18325": [
   "ジャスティスキック",
   0
  ],
  "23264": [
   "銛三段",
   0
  ],
  "23265": [
   "ビリビリ",
   0
  ],
  "23266": [
   "畳返しの術",
   0
  ],
  "23267": [
   "冷たい霧",
   0
  ],
  "23269": [
   "ストトラム",
   0
  ],
  "23270": [
   "セイントビーム",
   0
  ],
  "23271": [
   "ドロドロ掬い投げ",
   0
  ],
  "23272": [
   "天使のおやつ",
   0
  ],
  "23273": [
   "玄結界",
   0
  ],
  "23275": [
   "闘霊弾",
   0
  ],
  "23276": [
   "闘争本能",
   0
  ],
  "23277": [
   "超振動",
   0
  ],
  "23278": [
   "ブレイズ",
   0
  ],
  "23279": [
   "マスタードボム",
   0
  ],
  "23280": [
   "ドラゴンフォース",
   0
  ],
  "23281": [
   "エーテリックスパーク",
   0
  ],
  "23282": [
   "ハイドロプル",
   0
  ],
  "23283": [
   "水脈の呪詛",
   0
  ],
  "23284": [
   "チョコメテオ",
   0
  ],
  "23285": [
   "マトラマジック",
   0
  ],
  "23286": [
   "プリントアウト",
   0
  ],
  "23287": [
   "如意大旋風",
   0
  ],
  "23288": [
   "鬼宿脚",
   0
  ],
  "23290": [
   "月下彼岸花",
   0
  ],
  "23416": [
   "ストトラム",
   0
  ],
  "24283": [
   "ドシス",
   0
  ],
  "24284": [
   "ディアグノシス",
   0
  ],
  "24285": [
   "カルディア",
   0
  ],
  "24286": [
   "プログノシス",
   0
  ],
  "24287": [
   "エゲイロー",
   0
  ],
  "24288": [
   "ピュシス",
   0
  ],
  "24289": [
   "フレグマ",
   0
  ],
  "24290": [
   "エウクラシア",
   0
  ],
  "24294": [
   "ソーテリア",
   0
  ],
  "24295": [
   "イカロス",
   0
  ],
  "24296": [
   "ドルオコレ",
   0
  ],
  "24297": [
   "ディスクラシア",
   0
  ],
  "24298": [
   "ケーラコレ",
   0
  ],
  "24299": [
   "イックソコレ",
   0
  ],
  "24300": [
   "ゾーエ",
   0
  ],
  "24301": [
   "ペプシス",
   0
  ],
  "24302": [
   "ピュシスII",
   0
  ],
  "24303": [
   "タウロコレ",
   0
  ],
  "24304": [
   "トキシコン",
   0
  ],
  "24305": [
   "ハイマ",
   0
  ],
  "24306": [
   "ドシスII",
   0
  ],
  "24307": [
   "フレグマII",
   0
  ],
  "24309": [
   "リゾーマタ",
   0
  ],
  "24310": [
   "ホーリズム",
   0
  ],
  "24311": [
   "パンハイマ",
   0
  ],
  "24312": [
   "ドシスIII",
   0
  ],
  "24313": [
   "フレグマIII",
   0
  ],
  "24315": [
   "ディスクラシアII",
   0
  ],
  "24316": [
   "トキシコンII",
   0
  ],
  "24317": [
   "クラーシス",
   0
  ],
  "24318": [
   "プネウマ",
   0
  ],
  "24373": [
   "スライス",
   0
  ],
  "24374": [
   "ワクシングスライス",
   0
  ],
  "24375": [
   "インファナルスライス",
   0
  ],
  "24376": [
   "スピニングサイズ",
   0
  ],
  "24377": [
   "ナイトメアサイズ",
   0
  ],
  "24378": [
   "シャドウ・オブ・デス",
   0
  ],
  "24379": [
   "ワーラル・オブ・デス",
   0
  ],
  "24380": [
   "ソウルスライス",
   0
  ],
  "24381": [
   "ソウルサイズ",
   0
  ],
  "24382": [
   "ジビトゥ",
   0
  ],
  "24383": [
   "ギャロウズ",
   0
  ],
  "24384": [
   "ギロティン",
   0
  ],
  "24385": [
   "プレンティフルハーベスト",
   0
  ],
  "24386": [
   "ハルパー",
   0
  ],
  "24387": [
   "ソウルソウ",
   0
  ],
  "24389": [
   "ストークスウェーズ",
   0
  ],
  "24392": [
   "シーフスウェーズ",
   0
  ],
  "24393": [
   "グラトニー",
   0
  ],
  "24394": [
   "レムールシュラウド",
   0
  ],
  "24398": [
   "コムニオ",
   0
  ],
  "24401": [
   "ヘルズイングレス",
   0
  ],
  "24402": [
   "ヘルズイーグレス",
   0
  ],
  "24404": [
   "アルケインクレスト",
   0
  ],
  "24405": [
   "アルケインサークル",
   0
  ],
  "25746": [
   "ホーリーシェルトロン",
   0
  ],
  "25747": [
   "エクスピアシオン",
   0
  ],
  "25751": [
   "原初の血気",
   0
  ],
  "25752": [
   "オロジェネシス",
   0
  ],
  "25753": [
   "プライマルレンド",
   0
  ],
  "25754": [
   "オブレーション",
   0
  ],
  "25755": [
   "ソルト・アンド・ダーク",
   0
  ],
  "25757": [
   "シャドウブリンガー",
   0
  ],
  "25758": [
   "ハート・オブ・コランダム",
   0
  ],
  "25760": [
   "ダブルダウン",
   0
  ],
  "25761": [
   "鉄山靠",
   0
  ],
  "25762": [
   "抜重歩法",
   0
  ],
  "25763": [
   "空鳴拳",
   0
  ],
  "25764": [
   "必殺技",
   0
  ],
  "25766": [
   "疾風の極意",
   0
  ],
  "25767": [
   "壊神脚",
   0
  ],
  "25771": [
   "ヘヴンスラスト",
   0
  ],
  "25772": [
   "桜華繚乱",
   0
  ],
  "25773": [
   "天竜点睛",
   0
  ],
  "25774": [
   "残影鎌鼬",
   0
  ],
  "25777": [
   "月影雷獣爪",
   0
  ],
  "25778": [
   "月影雷獣牙",
   0
  ],
  "25780": [
   "風光",
   1
  ],
  "25781": [
   "奥義波切",
   1
  ],
  "25783": [
   "ラドンバイト",
   0
  ],
  "25785": [
   "光神のフィナーレ",
   0
  ],
  "25786": [
   "スキャッターガン",
   0
  ],
  "25788": [
   "回転のこぎり",
   0
  ],
  "25791": [
   "扇の舞い【終】",
   0
  ],
  "25792": [
   "流星の舞い",
   0
  ],
  "25793": [
   "ブリザラ",
   0
  ],
  "25794": [
   "ハイファイラ",
   0
  ],
  "25795": [
   "ハイブリザラ",
   0
  ],
  "25796": [
   "アンプリファイア",
   0
  ],
  "25798": [
   "サモン・カーバンクル",
   0
  ],
  "25799": [
   "守りの光",
   0
  ],
  "25800": [
   "エーテルチャージ",
   0
  ],
  "25801": [
   "シアリングライト",
   0
  ],
  "25802": [
   "サモン・ルビー",
   0
  ],
  "25803": [
   "サモン・トパーズ",
   0
  ],
  "25804": [
   "サモン・エメラルド",
   0
  ],
  "25805": [
   "サモン・イフリート",
   0
  ],
  "25806": [
   "サモン・タイタン",
   0
  ],
  "25807": [
   "サモン・ガルーダ",
   0
  ],
  "25822": [
   "アストラルフロウ",
   0
  ],
  "25826": [
   "トライディザスター",
   0
  ],
  "25838": [
   "サモン・イフリートII",
   0
  ],
  "25839": [
   "サモン・タイタンII",
   0
  ],
  "25840": [
   "サモン・ガルーダII",
   0
  ],
  "25855": [
   "ヴァルサンダガ",
   0
  ],
  "25856": [
   "ヴァルエアロガ",
   0
  ],
  "25857": [
   "バマジク",
   0
  ],
  "25859": [
   "グレアガ",
   0
  ],
  "25860": [
   "ホーリガ",
   0
  ],
  "25861": [
   "アクアヴェール",
   0
  ],
  "25862": [
   "リタージー・オブ・ベル",
   0
  ],
  "25865": [
   "極炎法",
   0
  ],
  "25866": [
   "裂陣法",
   0
  ],
  "25867": [
   "生命回生法",
   0
  ],
  "25868": [
   "疾風怒濤の計",
   0
  ],
  "25871": [
   "フォールマレフィク",
   0
  ],
  "25872": [
   "グラビラ",
   0
  ],
  "25873": [
   "エクザルテーション",
   0
  ],
  "25874": [
   "マクロコスモス",
   0
  ],
  "25875": [
   "ミクロコスモス",
   0
  ],
  "25880": [
   "スリプル",
   0
  ],
  "25883": [
   "ジェムシャイン",
   0
  ],
  "25884": [
   "ジェムブリリアンス",
   0
  ],
  "34563": [
   "ゴブリンパンチ",
   0
  ],
  "34564": [
   "大回転",
   0
  ],
  "34565": [
   "スキルトロン",
   0
  ],
  "34566": [
   "補水",
   0
  ],
  "34567": [
   "マジカルブレス",
   0
  ],
  "34568": [
   "獣魂の怒り",
   0
  ],
  "34569": [
   "泥団子遊び",
   0
  ],
  "34570": [
   "大掃除",
   0
  ],
  "34571": [
   "ルビーダイナモ",
   0
  ],
  "34572": [
   "魔のルーン",
   0
  ],
  "34573": [
   "ディメンションシフト",
   0
  ],
  "34574": [
   "コンヴィクション・マルカート",
   0
  ],
  "34575": [
   "フォースフィールド",
   0
  ],
  "34576": [
   "断罪の飛翔",
   0
  ],
  "34577": [
   "メーザーアイ",
   0
  ],
  "34578": [
   "キャンディケーン",
   0
  ],
  "34579": [
   "必滅の炎",
   0
  ],
  "34580": [
   "グルグルザパーン",
   0
  ],
  "34581": [
   "アポカリュプシス",
   0
  ],
  "34582": [
   "死すべき定め",
   0
  ],
  "34606": [
   "壱の牙【咬創】",
   0
  ],
  "34607": [
   "壱の牙【穿裂】",
   0
  ],
  "34614": [
   "壱の大牙【咬創】",
   0
  ],
  "34615": [
   "壱の大牙【穿裂】",
   0
  ],
  "34620": [
   "壱の蛇【強砕】",
   0
  ],
  "34621": [
   "弐の蛇【猛襲】",
   0
  ],
  "34622": [
   "弐の蛇【疾速】",
   0
  ],
  "34623": [
   "壱の大蛇【強砕】",
   0
  ],
  "34624": [
   "弐の大蛇【猛襲】",
   0
  ],
  "34625": [
   "弐の大蛇【疾速】",
   0
  ],
  "34626": [
   "祖霊降ろし",
   0
  ],
  "34632": [
   "飛蛇の牙",
   0
  ],
  "34633": [
   "飛蛇の尾",
   0
  ],
  "34646": [
   "蛇行",
   0
  ],
  "34647": [
   "蛇の霊気",
   0
  ],
  "34650": [
   "レッドファイア",
   0
  ],
  "34653": [
   "シアンブリザド",
   0
  ],
  "34656": [
   "レッドファイラ",
   0
  ],
  "34659": [
   "シアンブリザラ",
   0
  ],
  "34662": [
   "ホワイトホーリー",
   0
  ],
  "34663": [
   "ブラックコメット",
   0
  ],
  "34676": [
   "モーグリストリーム",
   0
  ],
  "34678": [
   "ハンマースタンプ",
   0
  ],
  "34681": [
   "スタープリズム",
   0
  ],
  "34683": [
   "サブトラクティブパレット",
   0
  ],
  "34684": [
   "スマッジ",
   0
  ],
  "34685": [
   "テンペラコート",
   0
  ],
  "34686": [
   "テンペラグラッサ",
   0
  ],
  "34688": [
   "レインボードリップ",
   0
  ],
  "34689": [
   "ピクトアニマル",
   0
  ],
  "34690": [
   "ピクトウェポン",
   0
  ],
  "34691": [
   "ピクトスケープ",
   0
  ],
  "35347": [
   "イマジンアニマル",
   0
  ],
  "35348": [
   "イマジンウェポン",
   0
  ],
  "35349": [
   "イマジンスケープ",
   0
  ],
  "35920": [
   "蛇尾術",
   0
  ],
  "35921": [
   "双牙連術",
   0
  ],
  "35922": [
   "双牙乱術",
   0
  ],
  "36920": [
   "エクストリームガード",
   0
  ],
  "36921": [
   "インペラトル",
   0
  ],
  "36923": [
   "ダムネーション",
   0
  ],
  "36926": [
   "シャドウストライド",
   0
  ],
  "36927": [
   "シャドウヴィジル",
   0
  ],
  "36932": [
   "ディセスティーム",
   0
  ],
  "36934": [
   "トラジェクトリー",
   0
  ],
  "36935": [
   "グレートネビュラ",
   0
  ],
  "36937": [
   "ライズ・オブ・ハート",
   0
  ],
  "36940": [
   "鉄山闘気",
   0
  ],
  "36941": [
   "空鳴闘気",
   0
  ],
  "36942": [
   "陰陽闘気",
   0
  ],
  "36943": [
   "万象闘気",
   0
  ],
  "36944": [
   "金剛周天",
   0
  ],
  "36945": [
   "猿舞連撃",
   0
  ],
  "36946": [
   "竜頷正拳撃",
   0
  ],
  "36947": [
   "虎襲崩拳",
   0
  ],
  "36949": [
   "絶空拳",
   0
  ],
  "36950": [
   "乾坤闘気弾",
   0
  ],
  "36951": [
   "ウィンググライド",
   0
  ],
  "36952": [
   "雲蒸竜変",
   0
  ],
  "36953": [
   "ドラゴンライズ",
   0
  ],
  "36954": [
   "スラストラッシュ",
   0
  ],
  "36955": [
   "スパイラルブロウ",
   0
  ],
  "36956": [
   "スタークロッサー",
   0
  ],
  "36957": [
   "毒盛の術",
   0
  ],
  "36958": [
   "百雷銃",
   0
  ],
  "36962": [
   "天眼通",
   1
  ],
  "36963": [
   "暁風",
   1
  ],
  "36964": [
   "残心",
   1
  ],
  "36974": [
   "ワイドボレー",
   0
  ],
  "36975": [
   "ハートブレイクショット",
   0
  ],
  "36976": [
   "レゾナンスアロー",
   0
  ],
  "36977": [
   "光神のアンコール",
   0
  ],
  "36978": [
   "ブレイズショット",
   0
  ],
  "36979": [
   "ダブルチェック",
   0
  ],
  "36980": [
   "チェックメイト",
   0
  ],
  "36982": [
   "フルメタルバースト",
   0
  ],
  "36983": [
   "ラストダンス",
   0
  ],
  "36986": [
   "ハイサンダー",
   0
  ],
  "36987": [
   "ハイサンダラ",
   0
  ],
  "36988": [
   "魔紋再設置",
   0
  ],
  "36989": [
   "フレアスター",
   0
  ],
  "36990": [
   "ミアズマノヴァ",
   0
  ],
  "36991": [
   "シアリングスパーク",
   0
  ],
  "36997": [
   "ルクス・ソラリス",
   0
  ],
  "37004": [
   "ジョルガ",
   0
  ],
  "37005": [
   "ブライヤー・クロゼ",
   0
  ],
  "37007": [
   "プリフルジェンス",
   0
  ],
  "37008": [
   "エーテリアルシフト",
   0
  ],
  "37009": [
   "グレアジャ",
   0
  ],
  "37010": [
   "メディガ",
   0
  ],
  "37011": [
   "ディヴァインカレス",
   0
  ],
  "37012": [
   "埋伏の毒",
   0
  ],
  "37013": [
   "意気軒昂の策",
   0
  ],
  "37014": [
   "セラフィズム",
   0
  ],
  "37017": [
   "アストラルドロー",
   0
  ],
  "37019": [
   "プレイI",
   0
  ],
  "37020": [
   "プレイII",
   0
  ],
  "37021": [
   "プレイIII",
   0
  ],
  "37022": [
   "マイナーアルカナ",
   0
  ],
  "37029": [
   "オラクル",
   0
  ],
  "37030": [
   "コンジャンクション・ヘリオス",
   0
  ],
  "37031": [
   "サンサイン",
   0
  ],
  "37033": [
   "プシュケー",
   0
  ],
  "37035": [
   "フィロソフィア",
   0
  ],
  "37037": [
   "応急戦術",
   0
  ],
  "44879": [
   "スマッシュ",
   0
  ],
  "44880": [
   "とらえる",
   0
  ],
  "44881": [
   "壱の呼び笛",
   0
  ],
  "44882": [
   "みやぶる",
   0
  ],
  "44883": [
   "アクスバイト",
   0
  ],
  "44884": [
   "アバランチアクス",
   0
  ],
  "44885": [
   "シールドスプリッター",
   0
  ],
  "44886": [
   "魔獣技",
   0
  ],
  "44887": [
   "ミストラルアクス",
   0
  ],
  "44888": [
   "スピニングアクス",
   0
  ],
  "44889": [
   "ラファールアクス",
   0
  ],
  "44890": [
   "はなつ",
   0
  ],
  "44891": [
   "さいごのいちげき",
   0
  ],
  "44892": [
   "弐の呼び笛",
   0
  ],
  "44893": [
   "シールドチャージ",
   0
  ],
  "44894": [
   "参の呼び笛",
   0
  ],
  "44895": [
   "かりる",
   0
  ],
  "44896": [
   "ビーストスキン",
   0
  ],
  "44897": [
   "ヴァイルスキン",
   0
  ],
  "44898": [
   "クラウドスキム",
   0
  ],
  "44899": [
   "シードサワー",
   0
  ],
  "44900": [
   "クェリングウェーブ",
   0
  ],
  "44901": [
   "スケイルスキン",
   0
  ],
  "44902": [
   "ソウルクラッシュ",
   0
  ],
  "44903": [
   "アッシュクレンズ",
   0
  ],
  "44904": [
   "おうえん",
   0
  ],
  "44905": [
   "きあい",
   0
  ],
  "44930": [
   "ブルータルレイジ",
   0
  ],
  "44931": [
   "ホークスパイク",
   0
  ],
  "44932": [
   "ライジングフォール",
   0
  ],
  "44933": [
   "カラミティ",
   0
  ],
  "47092": [
   "はなつ",
   0
  ],
  "47093": [
   "おおわざ",
   0
  ],
  "47238": [
   "かりる",
   0
  ],
  "47239": [
   "かりる",
   0
  ],
  "47240": [
   "かりる",
   0
  ],
  "47241": [
   "かりる",
   0
  ],
  "47242": [
   "かりる",
   0
  ],
  "47243": [
   "かりる",
   0
  ],
  "47244": [
   "かりる",
   0
  ],
  "47245": [
   "かりる",
   0
  ]
 },
 "upgrade": {
  "7477": 36963,
  "7483": 25780,
  "7498": 36962
 },
 "jobSet": 34,
 "buttonsAll": [
  7478,
  7479,
  7480,
  7481,
  7482,
  7484,
  7485,
  7486,
  7490,
  7491,
  7492,
  7493,
  7495,
  7496,
  7497,
  7499,
  7867,
  16481,
  16482,
  16483,
  16487,
  25780,
  25781,
  36962,
  36963,
  36964
 ],
 "unplaced": [
  36964
 ],
 "replaceGroups": {
  "7867": [
   7487,
   7488,
   7489,
   36965,
   36966
  ],
  "16483": [
   16485,
   16486,
   25782,
   36967,
   36968
  ],
  "25781": [
   25782
  ]
 },
 "splitDetected": []
};
