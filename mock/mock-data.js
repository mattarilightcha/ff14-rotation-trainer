// 自動生成: node mock/build-mock-data.mjs（手で編集しない）
window.MOCK_DATA = {
 "gameVersion": "2026.09.15.0000.0000",
 "extractedAt": "2026-09-24T17:17:26+09:00",
 "jobList": [
  {
   "abbr": "SAM",
   "name": "侍",
   "icon": "../public/icons/jobs/SAM.png",
   "role": "melee"
  },
  {
   "abbr": "PLD",
   "name": "ナイト",
   "icon": "../public/icons/jobs/PLD.png",
   "role": "tank"
  },
  {
   "abbr": "WHM",
   "name": "白魔道士",
   "icon": "../public/icons/jobs/WHM.png",
   "role": "healer"
  },
  {
   "abbr": "AST",
   "name": "占星術師",
   "icon": "../public/icons/jobs/AST.png",
   "role": "healer"
  },
  {
   "abbr": "BLM",
   "name": "黒魔道士",
   "icon": "../public/icons/jobs/BLM.png",
   "role": "ranged"
  },
  {
   "abbr": "BRD",
   "name": "吟遊詩人",
   "icon": "../public/icons/jobs/BRD.png",
   "role": "ranged"
  }
 ],
 "jobs": {
  "SAM": {
   "job": {
    "abbr": "SAM",
    "name": "侍",
    "icon": "../public/icons/jobs/SAM.png",
    "level": 100,
    "role": "melee"
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 140,
      "combo": 300
     },
     "eff": {
      "grant": [
       {
        "status": "風月",
        "sec": 40,
        "stacks": null,
        "combo": true
       }
      ]
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 140,
      "combo": 300
     },
     "eff": {
      "grant": [
       {
        "status": "風花",
        "sec": 40,
        "stacks": null,
        "combo": true
       }
      ]
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 160,
      "combo": 340
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": "rear",
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 160,
      "rear": 210,
      "combo": 370,
      "comboRear": 420
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": "flank",
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 160,
      "flank": 210,
      "combo": 370,
      "comboFlank": 420
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100,
      "combo": 120
     },
     "eff": {
      "grant": [
       {
        "status": "風月",
        "sec": 40,
        "stacks": null,
        "combo": true
       }
      ]
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100,
      "combo": 120
     },
     "eff": {
      "grant": [
       {
        "status": "風花",
        "sec": 40,
        "stacks": null,
        "combo": true
       }
      ]
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": 14,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 20,
     "crit": false,
     "effectRange": 0,
     "ground": false,
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
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 6,
     "crit": true,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 680
     },
     "eff": {
      "grant": [
       {
        "status": "燕返し実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       },
       {
        "status": "剣圧",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": [
      7867
     ]
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 300
     },
     "eff": {
      "grant": [
       {
        "status": "燕返し実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       },
       {
        "status": "剣圧",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": [
      7867
     ]
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 6,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 200,
      "dot": {
       "potency": 50,
       "sec": 60
      }
     },
     "eff": {
      "grant": [
       {
        "status": "剣圧",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": [
      7867
     ]
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 250
     },
     "eff": {
      "cost": {
       "gauge": "剣気",
       "n": 25
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": {
      "cost": {
       "gauge": "剣気",
       "n": 25
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 20,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": true,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": {
      "cost": {
       "gauge": "剣気",
       "n": 10
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 5,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 10,
     "pot": {
      "base": 100
     },
     "eff": {
      "grant": [
       {
        "status": "燕飛効果アップ",
        "sec": 15,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "剣気",
       "n": 10
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "cost": {
       "gauge": "雪の閃",
       "n": 1
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 400
     },
     "eff": {
      "cost": {
       "gauge": "剣気",
       "n": 25
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "天道",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 800,
      "party": false
     },
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 420
     },
     "eff": {
      "grant": [
       {
        "status": "ディセスティーム実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 800
     },
     "eff": {
      "cost": {
       "gauge": "剣気",
       "n": 25
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "奥義波切実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       },
       {
        "status": "残心実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "requires": "燕返し実行可"
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": 222,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 300
     },
     "eff": null,
     "replaces": [
      16483
     ]
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
     "isRole": false,
     "category": 3,
     "proc": 223,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 6,
     "crit": true,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 680
     },
     "eff": null,
     "replaces": [
      16483
     ]
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 640
     },
     "eff": {
      "cost": {
       "gauge": "剣圧",
       "n": 3
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "requires": "暗黒"
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": 72,
     "procStatus": null,
     "shape": 3,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 8,
     "crit": true,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 1000
     },
     "eff": {
      "grant": [
       {
        "status": "剣圧",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "奥義波切実行可"
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 3,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 8,
     "crit": true,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 1000
     },
     "eff": null,
     "replaces": [
      16483
     ]
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 240
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": 166,
     "procStatus": null,
     "shape": 3,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 8,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 940
     },
     "eff": {
      "requires": "残心実行可"
     },
     "replaces": []
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 410
     },
     "eff": {
      "grant": [
       {
        "status": "燕返し実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       },
       {
        "status": "剣圧",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "天道"
     },
     "replaces": [
      7867
     ]
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 6,
     "crit": true,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 1100
     },
     "eff": {
      "grant": [
       {
        "status": "燕返し実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       },
       {
        "status": "剣圧",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "天道"
     },
     "replaces": [
      7867
     ]
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
     "isRole": false,
     "category": 3,
     "proc": 224,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 410
     },
     "eff": null,
     "replaces": [
      16483
     ]
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
     "isRole": false,
     "category": 3,
     "proc": 225,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 6,
     "crit": true,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 1100
     },
     "eff": null,
     "replaces": [
      16483
     ]
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
    "ブラッドバス": "../public/icons/statuses/213913.png",
    "シールドウォール": "../public/icons/statuses/216306.png",
    "ストロングホールド": "../public/icons/statuses/216306.png",
    "ラストバスティオン": "../public/icons/statuses/216306.png",
    "叱咤": "../public/icons/statuses/210608.png",
    "原初の大地": "../public/icons/statuses/216306.png",
    "ダークフォース": "../public/icons/statuses/216306.png",
    "牽制": "../public/icons/statuses/213904.png",
    "アームズレングス": "../public/icons/statuses/213915.png",
    "雪風": "../public/icons/statuses/213303.png",
    "彼岸花": "../public/icons/statuses/213304.png",
    "黙想": "../public/icons/statuses/213306.png",
    "心眼": "../public/icons/statuses/213307.png",
    "明鏡止水": {
     "icon": "../public/icons/statuses/219641.png",
     "max": 3,
     "base": 219641
    },
    "必殺剣・地天": "../public/icons/statuses/214820.png",
    "トゥルーノース": "../public/icons/statuses/213903.png",
    "残心実行可": "../public/icons/statuses/213318.png",
    "風月": "../public/icons/statuses/213311.png",
    "風花": "../public/icons/statuses/213312.png",
    "剣圧": {
     "icon": "../public/icons/statuses/219501.png",
     "max": 3,
     "base": 219501
    },
    "ソウルガンメタル": "../public/icons/statuses/216306.png",
    "捨身": "../public/icons/statuses/210304.png",
    "フェターウォード": "../public/icons/statuses/214867.png",
    "アームズレングス：効果": "../public/icons/statuses/214885.png",
    "奥義波切実行可": "../public/icons/statuses/213313.png",
    "奥義波切": "../public/icons/statuses/214952.png",
    "返し波切": "../public/icons/statuses/214953.png",
    "回天": "../public/icons/statuses/213305.png",
    "崩し": "../public/icons/statuses/214954.png",
    "天道雪月花実行可": "../public/icons/statuses/213309.png",
    "燕返し実行可": "../public/icons/statuses/213315.png",
    "天眼通": "../public/icons/statuses/213316.png",
    "天眼通：生": "../public/icons/statuses/213317.png",
    "天道": "../public/icons/statuses/213319.png",
    "崩し［弱］": "../public/icons/statuses/214729.png",
    "スウィフト": "../public/icons/statuses/216678.png",
    "ランパート": "../public/icons/statuses/210152.png",
    "ファイト・オア・フライト": "../public/icons/statuses/210155.png",
    "アイアンウィル": "../public/icons/statuses/212506.png",
    "ホークアイ": "../public/icons/statuses/210351.png",
    "猛者の撃": "../public/icons/statuses/210354.png",
    "乱れ撃ち": "../public/icons/statuses/210356.png",
    "賢人のバラード": "../public/icons/statuses/212603.png",
    "軍神のパイオン": "../public/icons/statuses/212605.png",
    "バトルボイス": "../public/icons/statuses/212601.png",
    "ケアルラ効果アップ": "../public/icons/statuses/210410.png",
    "神速魔": "../public/icons/statuses/212627.png",
    "堅実魔": "../public/icons/statuses/210452.png",
    "ファイガ効果アップ": "../public/icons/statuses/210460.png",
    "迅速魔": "../public/icons/statuses/210454.png",
    "マバリア": "../public/icons/statuses/210456.png",
    "サークル・オブ・ドゥーム": "../public/icons/statuses/210158.png",
    "黒魔紋": "../public/icons/statuses/212653.png",
    "アーゼマの均衡": "../public/icons/statuses/213204.png",
    "ハルオーネの槍": "../public/icons/statuses/213207.png",
    "ライトスピード": "../public/icons/statuses/213220.png",
    "シナストリー": "../public/icons/statuses/213223.png",
    "旅神のメヌエット": "../public/icons/statuses/212610.png",
    "コースティックバイト": "../public/icons/statuses/212616.png",
    "ストームバイト": "../public/icons/statuses/212617.png",
    "地神のミンネ": "../public/icons/statuses/212618.png",
    "ルーシッドドリーム": "../public/icons/statuses/213909.png",
    "三連魔": {
     "icon": "../public/icons/statuses/219621.png",
     "max": 3,
     "base": 219621
    },
    "シンエアー": "../public/icons/statuses/212631.png",
    "インドゥルゲンティア": "../public/icons/statuses/212637.png",
    "星の支配者": "../public/icons/statuses/213241.png",
    "燕飛効果アップ": "../public/icons/statuses/213310.png",
    "巨星の支配者": "../public/icons/statuses/213242.png",
    "レクイエスカット": {
     "icon": "../public/icons/statuses/218345.png",
     "max": 4,
     "base": 218345
    },
    "ディア": "../public/icons/statuses/212635.png",
    "テンパランス": "../public/icons/statuses/212634.png",
    "ディヴィネーション": "../public/icons/statuses/213245.png",
    "コンバガ": "../public/icons/statuses/213248.png",
    "ホロスコープ": "../public/icons/statuses/213251.png",
    "ホロスコープ・ヘリオス": "../public/icons/statuses/213252.png",
    "ニュートラルセクト": "../public/icons/statuses/213253.png",
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "トルバドゥール": "../public/icons/statuses/212615.png",
    "神聖魔法効果アップ": "../public/icons/statuses/212521.png",
    "ブラストアロー実行可": "../public/icons/statuses/212621.png",
    "リタージー・オブ・ベル": {
     "icon": "../public/icons/statuses/218373.png",
     "max": 5,
     "base": 218373
    },
    "マクロコスモス": "../public/icons/statuses/213263.png",
    "光神のフィナーレ": "../public/icons/statuses/212622.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png",
    "レゾナンスアロー実行可": "../public/icons/statuses/213076.png",
    "光神のアンコール実行可": "../public/icons/statuses/213077.png",
    "サンダー系魔法実行可": "../public/icons/statuses/212660.png",
    "ハイサンダー": "../public/icons/statuses/212661.png",
    "グレアジャ実行可": {
     "icon": "../public/icons/statuses/218669.png",
     "max": 3,
     "base": 218669
    },
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png",
    "オラクル実行可": "../public/icons/statuses/213264.png",
    "サンサイン実行可": "../public/icons/statuses/213266.png"
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
       "kind": "macro",
       "no": 346
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
       "kind": "macro",
       "no": 259
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
       "kind": "macro",
       "no": 296
      },
      {
       "kind": "macro",
       "no": 297
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
       "kind": "macro",
       "no": 307
      },
      {
       "kind": "other",
       "type": 4
      },
      {
       "kind": "macro",
       "no": 259
      },
      {
       "kind": "macro",
       "no": 309
      },
      {
       "kind": "macro",
       "no": 310
      },
      {
       "kind": "macro",
       "no": 298
      },
      {
       "kind": "macro",
       "no": 299
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
       "kind": "macro",
       "no": 258
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
       "kind": "macro",
       "no": 257
      },
      {
       "kind": "macro",
       "no": 256
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
  },
  "PLD": {
   "job": {
    "abbr": "PLD",
    "name": "ナイト",
    "icon": "../public/icons/jobs/PLD.png",
    "level": 100,
    "role": "tank"
   },
   "actions": {
    "9": {
     "id": 9,
     "name": "ファストブレード",
     "desc": "対象に物理攻撃。　威力：220",
     "icon": "../public/fankit/battle-pve/01_PLD/Fast_Blade.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 1,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 220
     },
     "eff": null,
     "replaces": []
    },
    "15": {
     "id": 15,
     "name": "ライオットソード",
     "desc": "対象に物理攻撃。　威力：170\nコンボ条件：ファストブレード　コンボ時威力：330\nコンボボーナス：自身のＭＰを回復する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Riot_Blade.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [
      9
     ],
     "preservesCombo": false,
     "level": 4,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 170,
      "combo": 330
     },
     "eff": null,
     "replaces": []
    },
    "16": {
     "id": 16,
     "name": "シールドバッシュ",
     "desc": "対象に物理攻撃。　威力：100\n追加効果：対象をスタンさせる。　効果時間：6秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Shield_Bash.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 10,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
    },
    "20": {
     "id": 20,
     "name": "ファイト・オア・フライト",
     "desc": "一定時間、自身の与ダメージを25％上昇させる。\n効果時間：20秒\n追加効果：自身に「ゴアブレード実行可」を付与する。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Fight_or_Flight.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 11,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 2,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "ゴアブレード実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ],
      "dmgUp": {
       "pct": 25,
       "sec": 20
      }
     },
     "replaces": []
    },
    "22": {
     "id": 22,
     "name": "ブルワーク",
     "desc": "一定時間、受ける攻撃を必ずブロックする。\n効果時間：10秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Bulwark.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 90000,
     "cooldownGroup": 16,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 52,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "23": {
     "id": 23,
     "name": "サークル・オブ・ドゥーム",
     "desc": "自身の周囲の敵に範囲物理攻撃。　威力：140\n追加効果：対象に継続ダメージを付与する。\n威力：30　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Circle_of_Scorn.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 7,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 140,
      "dot": {
       "potency": 30,
       "sec": 15
      }
     },
     "eff": null,
     "replaces": []
    },
    "24": {
     "id": 24,
     "name": "シールドロブ",
     "desc": "対象に遠隔物理攻撃。　威力：100\n追加効果：敵視アップ",
     "icon": "../public/fankit/battle-pve/01_PLD/Shield_Lob.png",
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
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 20,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
    },
    "27": {
     "id": 27,
     "name": "かばう",
     "desc": "対象のパーティメンバーが受ける攻撃を肩代わりする。\nただし、一部の攻撃はかばうことができない。\n効果時間：12秒\n対象との距離が20mより離れると効果が発揮されない。\n発動条件：「オウス」50",
     "icon": "../public/fankit/battle-pve/01_PLD/Cover.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 21,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 45,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 20,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "cost": {
       "gauge": "オウス",
       "n": 50
      }
     },
     "replaces": []
    },
    "28": {
     "id": 28,
     "name": "アイアンウィル",
     "desc": "戦闘中の敵から自身に向けられる敵視を非常に大きく上昇させる。\n再使用で解除する。　効果時間：永続",
     "icon": "../public/fankit/battle-pve/01_PLD/Iron_Will.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 2000,
     "cooldownGroup": 1,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 10,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "30": {
     "id": 30,
     "name": "インビンシブル",
     "desc": "一定時間、自身への一部を除くすべてのダメージを無効化する。\n効果時間：10秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Hallowed_Ground.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 420000,
     "cooldownGroup": 25,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3538": {
     "id": 3538,
     "name": "ゴアブレード",
     "desc": "対象に物理攻撃。　威力：700\n発動条件：「ゴアブレード実行可」効果中",
     "icon": "../public/fankit/battle-pve/01_PLD/Goring_Blade.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 54,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": 209,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 700
     },
     "eff": {
      "requires": "ゴアブレード実行可"
     },
     "replaces": []
    },
    "3539": {
     "id": 3539,
     "name": "ロイヤルアソリティ",
     "desc": "対象に物理攻撃。　威力：200\nコンボ条件：ライオットソード　コンボ時威力：460\nコンボボーナス：自身に「ロイエ実行可」を付与する。\n効果時間：30秒\nコンボボーナス：自身に「神聖魔法効果アップ」を付与する。\n効果時間：30秒\n神聖魔法効果アップ効果：次に実行する1回のホーリースピリットまたはホーリーサークルの威力が上昇し、かつ詠唱時間無しで実行できる。",
     "icon": "../public/fankit/battle-pve/01_PLD/Royal_Authority.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [
      15
     ],
     "preservesCombo": false,
     "level": 60,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 200,
      "combo": 460
     },
     "eff": {
      "grant": [
       {
        "status": "ロイエ実行可",
        "sec": 30,
        "stacks": null,
        "combo": true
       },
       {
        "status": "神聖魔法効果アップ",
        "sec": 30,
        "stacks": null,
        "combo": true
       }
      ]
     },
     "replaces": []
    },
    "3540": {
     "id": 3540,
     "name": "ディヴァインヴェール",
     "desc": "自身と周囲のパーティメンバーに、一定量のダメージを防ぐバリアを張る。\nこのバリアはナイト自身の最大ＨＰの10％分のダメージを軽減する。　効果時間：30秒\n追加効果：対象のＨＰを回復する。　回復力：400",
     "icon": "../public/fankit/battle-pve/01_PLD/Divine_Veil.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 90000,
     "cooldownGroup": 15,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 56,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 400,
      "party": true
     },
     "replaces": []
    },
    "3541": {
     "id": 3541,
     "name": "クレメンシー",
     "desc": "対象のＨＰを回復する。　回復力：1000\n追加効果：パーティメンバーに実行した場合、対象を回復した半分の回復量分、自身のＨＰを回復する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Clemency.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 58,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 4000,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 1000,
      "party": false
     },
     "replaces": []
    },
    "7381": {
     "id": 7381,
     "name": "トータルエクリプス",
     "desc": "自身の周囲の敵に範囲物理攻撃。　威力：120\n追加効果：敵視アップ",
     "icon": "../public/fankit/battle-pve/01_PLD/Total_Eclipse.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 6,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 120
     },
     "eff": null,
     "replaces": []
    },
    "7382": {
     "id": 7382,
     "name": "インターベンション",
     "desc": "パーティメンバーひとりを対象とする。\n対象の被ダメージを10％軽減する。　効果時間：8秒\n追加効果：自身にランパートまたはエクストリームガードが付与されている場合は効果量が10％上昇する。\n追加効果：対象に「ナイトの堅守」を付与する。\n効果時間：4秒\nナイトの堅守効果：対象の被ダメージを10％軽減する。\n追加効果：対象に「ナイトの加護」を付与する。\n効果時間：12秒\nナイトの加護効果：対象のＨＰを継続回復する。\n回復力：250\n発動条件：「オウス」50",
     "icon": "../public/fankit/battle-pve/01_PLD/Intervention.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 10000,
     "cooldownGroup": 5,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 62,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "cost": {
       "gauge": "オウス",
       "n": 50
      }
     },
     "replaces": []
    },
    "7384": {
     "id": 7384,
     "name": "ホーリースピリット",
     "desc": "対象に無属性魔法攻撃。　威力：400\n神聖魔法効果アップ時威力：500\nレクイエスカット時威力：700\n神聖魔法効果アップとレクイエスカットの両方が付与されている場合は、神聖魔法効果アップの効果が優先的に適用される。\n追加効果：自身のＨＰを回復する。　回復力：400",
     "icon": "../public/fankit/battle-pve/01_PLD/Holy_Spirit.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 64,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 2000,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 400,
      "cond": [
       {
        "status": "神聖魔法効果アップ",
        "potency": 500
       },
       {
        "status": "レクイエスカット",
        "potency": 700
       }
      ]
     },
     "eff": {
      "heal": 400,
      "party": false
     },
     "replaces": []
    },
    "7385": {
     "id": 7385,
     "name": "パッセージ・オブ・アームズ",
     "desc": "自身の後方扇範囲に被ダメージを軽減するシールドを生成する。\n効果時間中、自身のブロック発動率が100％になり、さらに範囲内にいるパーティメンバーの被ダメージを15％軽減する。\n効果時間：18秒\n効果時間中にアクションの実行や移動・ターンを行うと、パッセージ・オブ・アームズは即座に解除される。\n実行後にオートアタックを停止する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Passage_of_Arms.png",
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7531": {
     "id": 7531,
     "name": "ランパート",
     "desc": "一定時間、自身の被ダメージを20％軽減させる。\nさらに、自身が受けるＨＰ回復効果を15％上昇させる。\n効果時間：20秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Rampart.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 90000,
     "cooldownGroup": 47,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 8,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7533": {
     "id": 7533,
     "name": "挑発",
     "desc": "対象を挑発し、自身への敵視を最高位にしたうえで、さらに自身への敵視を上昇させる。",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Provoke.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 43,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 15,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7535": {
     "id": 7535,
     "name": "リプライザル",
     "desc": "自身の周囲の敵の与ダメージを10％減少させる。\n効果時間：15秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Reprisal.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 45,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 22,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7537": {
     "id": 7537,
     "name": "シャーク",
     "desc": "自身に向けられている敵視の25％を対象のパーティメンバーに移す。",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Shirk.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 50,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 48,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7538": {
     "id": 7538,
     "name": "インタージェクト",
     "desc": "対象のアクション詠唱を中断させる。",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Interject.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 44,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 18,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7540": {
     "id": 7540,
     "name": "ロウブロウ",
     "desc": "対象をスタンさせる。　効果時間：5秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Low_Blow.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 25000,
     "cooldownGroup": 42,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 12,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7548": {
     "id": 7548,
     "name": "アームズレングス",
     "desc": "一定時間、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒\n追加効果：効果中に自身が物理攻撃を受けると、攻撃者に20％スロウを付与する。　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Role_Actions/Arm's_Length.png",
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "16457": {
     "id": 16457,
     "name": "プロミネンス",
     "desc": "自身の周囲の敵に範囲物理攻撃。　威力：100\nコンボ条件：トータルエクリプス　コンボ時威力：220\n追加効果：敵視アップ\nコンボボーナス：自身のＭＰを回復する。\nコンボボーナス：自身に「神聖魔法効果アップ」を付与する。\n効果時間：30秒\n神聖魔法効果アップ効果：次に実行する1回のホーリースピリットまたはホーリーサークルの威力が上昇し、かつ詠唱時間無しで実行できる。",
     "icon": "../public/fankit/battle-pve/01_PLD/Prominence.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [
      7381
     ],
     "preservesCombo": false,
     "level": 40,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100,
      "combo": 220
     },
     "eff": {
      "grant": [
       {
        "status": "神聖魔法効果アップ",
        "sec": 30,
        "stacks": null,
        "combo": true
       }
      ]
     },
     "replaces": []
    },
    "16458": {
     "id": 16458,
     "name": "ホーリーサークル",
     "desc": "自身の周囲の敵に無属性範囲魔法攻撃。　威力：100\n神聖魔法効果アップ時威力：250\nレクイエスカット時威力：350\n神聖魔法効果アップとレクイエスカットの両方が付与されている場合は、神聖魔法効果アップの効果が優先的に適用される。\n追加効果：自身のＨＰを回復する。　回復力：400",
     "icon": "../public/fankit/battle-pve/01_PLD/Holy_Circle.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 72,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 2000,
     "range": 0,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100,
      "cond": [
       {
        "status": "神聖魔法効果アップ",
        "potency": 250
       },
       {
        "status": "レクイエスカット",
        "potency": 350
       }
      ]
     },
     "eff": {
      "heal": 400,
      "party": false
     },
     "replaces": []
    },
    "16459": {
     "id": 16459,
     "name": "コンフィテオル",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：500\nレクイエスカット時威力：1000\n2体目以降の対象への威力は60％減少する。\n追加効果：自身のＨＰを回復する。　回復力：400\n発動条件：「コンフィテオル実行可」効果中",
     "icon": "../public/fankit/battle-pve/01_PLD/Confiteor.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 80,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": 46,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 2000,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 500,
      "cond": [
       {
        "status": "レクイエスカット",
        "potency": 1000
       }
      ]
     },
     "eff": {
      "requires": "コンフィテオル実行可",
      "heal": 400,
      "party": false
     },
     "replaces": []
    },
    "16460": {
     "id": 16460,
     "name": "ロイエ",
     "desc": "対象に物理攻撃。　威力：460\n追加効果：自身のＭＰを回復する。\n追加効果：自身に「ゲベート実行可」を付与する。\n効果時間：30秒\n発動条件：「ロイエ実行可」効果中",
     "icon": "../public/fankit/battle-pve/01_PLD/Atonement.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 76,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": 36,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 460
     },
     "eff": {
      "grant": [
       {
        "status": "ゲベート実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "ロイエ実行可"
     },
     "replaces": []
    },
    "16461": {
     "id": 16461,
     "name": "インターヴィーン",
     "desc": "対象に急接近して物理攻撃。　威力：150\n最大チャージ数：2\nバインド中は実行不可。",
     "icon": "../public/fankit/battle-pve/01_PLD/Intervene.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 10,
     "maxCharges": 2,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 66,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 20,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": true,
     "backstep": 0,
     "pot": {
      "base": 150
     },
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 420
     },
     "eff": {
      "grant": [
       {
        "status": "ディセスティーム実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "25746": {
     "id": 25746,
     "name": "ホーリーシェルトロン",
     "desc": "一定時間、自身の被ダメージを15％軽減させる。\n効果時間：8秒\n追加効果：自身に「ナイトの堅守」を付与する。\n効果時間：4秒\nナイトの堅守効果：対象の被ダメージを15％軽減する。\n追加効果：自身に「ナイトの加護」を付与する。\n効果時間：12秒\nナイトの加護効果：対象のＨＰを継続回復する。\n回復力：250\n発動条件：「オウス」50",
     "icon": "../public/fankit/battle-pve/01_PLD/Holy_Sheltron.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 5000,
     "cooldownGroup": 3,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "ナイトの堅守",
        "sec": 4,
        "stacks": null,
        "combo": false
       },
       {
        "status": "ナイトの加護",
        "sec": 12,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "オウス",
       "n": 50
      }
     },
     "replaces": []
    },
    "25747": {
     "id": 25747,
     "name": "エクスピアシオン",
     "desc": "対象とその周囲の敵に範囲物理攻撃。　威力：450\n2体目以降の対象への威力は60％減少する。\n追加効果：自身のＭＰを回復する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Expiacion.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 8,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 86,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 450
     },
     "eff": null,
     "replaces": []
    },
    "25748": {
     "id": 25748,
     "name": "ブレード・オブ・フェイス",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：260\nレクイエスカット時威力：760\n2体目以降の対象への威力は60％減少する。\nコンボ条件：コンフィテオル\n追加効果：自身のＨＰを回復する。　回復力：400\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとコンフィテオルがブレード・オブ・フェイスに変化する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Blade_of_Faith.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [
      16459
     ],
     "preservesCombo": true,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 2000,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 260,
      "cond": [
       {
        "status": "レクイエスカット",
        "potency": 760
       }
      ]
     },
     "eff": {
      "heal": 400,
      "party": false
     },
     "replaces": [
      16459
     ]
    },
    "25749": {
     "id": 25749,
     "name": "ブレード・オブ・トゥルース",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：380\nレクイエスカット時威力：880\n2体目以降の対象への威力は60％減少する。\nコンボ条件：ブレード・オブ・フェイス\n追加効果：自身のＨＰを回復する。　回復力：400\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとブレード・オブ・フェイスがブレード・オブ・トゥルースに変化する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Blade_of_Truth.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [
      25748
     ],
     "preservesCombo": true,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 2000,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 380,
      "cond": [
       {
        "status": "レクイエスカット",
        "potency": 880
       }
      ]
     },
     "eff": {
      "heal": 400,
      "party": false
     },
     "replaces": [
      16459
     ]
    },
    "25750": {
     "id": 25750,
     "name": "ブレード・オブ・ヴァラー",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：500\nレクイエスカット時威力：1000\n2体目以降の対象への威力は60％減少する。\nコンボ条件：ブレード・オブ・トゥルース\n追加効果：自身のＨＰを回復する。　回復力：400\n追加効果：自身に「ブレード・オブ・オナー実行可」を付与する。\n効果時間：30秒\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとブレード・オブ・トゥルースがブレード・オブ・ヴァラーに変化する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Blade_of_Valor.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [
      25749
     ],
     "preservesCombo": true,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 2000,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 500,
      "cond": [
       {
        "status": "レクイエスカット",
        "potency": 1000
       }
      ]
     },
     "eff": {
      "grant": [
       {
        "status": "ブレード・オブ・オナー実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ],
      "heal": 400,
      "party": false
     },
     "replaces": [
      16459
     ]
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "requires": "暗黒"
     },
     "replaces": []
    },
    "36918": {
     "id": 36918,
     "name": "ゲベート",
     "desc": "対象に物理攻撃。　威力：500\n追加効果：自身のＭＰを回復する。\n追加効果：自身に「グラブカッマー実行可」を付与する。\n効果時間：30秒\n発動条件：「ゲベート実行可」効果中\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとロイエがゲベートに変化する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Supplication.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 76,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": 149,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 500
     },
     "eff": {
      "grant": [
       {
        "status": "グラブカッマー実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "ゲベート実行可"
     },
     "replaces": [
      16460
     ]
    },
    "36919": {
     "id": 36919,
     "name": "グラブカッマー",
     "desc": "対象に物理攻撃。　威力：540\n追加効果：自身のＭＰを回復する。\n発動条件：「グラブカッマー実行可」効果中\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとゲベートがグラブカッマーに変化する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Sepulchre.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 76,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": 150,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 540
     },
     "eff": {
      "requires": "グラブカッマー実行可"
     },
     "replaces": [
      16460
     ]
    },
    "36920": {
     "id": 36920,
     "name": "エクストリームガード",
     "desc": "一定時間、自身の被ダメージを40％軽減させる。\n効果時間：15秒\n追加効果：自身に一定量のダメージを防ぐバリアを張る。\nバリア量：回復力1000相当　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Guardian.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 20,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 92,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "36921": {
     "id": 36921,
     "name": "インペラトル",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：580\n2体目以降の対象への威力は60％減少する。\n追加効果：自身に4スタックの「レクイエスカット」を付与する。\n効果時間：30秒\nレクイエスカット効果：魔法を詠唱時間無しで実行できる。\n加えて、ホーリースピリットとホーリーサークル、さらにコンフィテオルとそれ以降のコンボアクションの威力を上昇させる。\n追加効果：自身に「コンフィテオル実行可」を付与する。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/01_PLD/Imperator.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 12,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 96,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 580
     },
     "eff": {
      "grant": [
       {
        "status": "レクイエスカット",
        "sec": 30,
        "stacks": 4,
        "combo": false
       },
       {
        "status": "コンフィテオル実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "36922": {
     "id": 36922,
     "name": "ブレード・オブ・オナー",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：1000\n2体目以降の対象への威力は60％減少する。\n発動条件：「ブレード・オブ・オナー実行可」効果中\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとインペラトルがブレード・オブ・オナーに変化する。",
     "icon": "../public/fankit/battle-pve/01_PLD/Blade_of_Honor.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 2,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 100,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": 151,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 1000
     },
     "eff": {
      "requires": "ブレード・オブ・オナー実行可"
     },
     "replaces": [
      36921
     ]
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
    "ランパート": "../public/icons/statuses/210152.png",
    "センチネル": "../public/icons/statuses/210151.png",
    "ファイト・オア・フライト": "../public/icons/statuses/210155.png",
    "ブルワーク": "../public/icons/statuses/210156.png",
    "アイアンウィル": "../public/icons/statuses/212506.png",
    "かばう": "../public/icons/statuses/212501.png",
    "かばう［被］": "../public/icons/statuses/212502.png",
    "インビンシブル": "../public/icons/statuses/212504.png",
    "シールドウォール": "../public/icons/statuses/216306.png",
    "ストロングホールド": "../public/icons/statuses/216306.png",
    "ラストバスティオン": "../public/icons/statuses/216306.png",
    "サークル・オブ・ドゥーム": "../public/icons/statuses/210158.png",
    "イージスブーン": "../public/icons/statuses/214823.png",
    "ゴアブレード": "../public/icons/statuses/212507.png",
    "ディヴァインヴェール": "../public/icons/statuses/212508.png",
    "ディヴァインヴェール［バリア］": "../public/icons/statuses/212509.png",
    "シェルトロン": "../public/icons/statuses/212510.png",
    "リプライザル": "../public/icons/statuses/213103.png",
    "原初の大地": "../public/icons/statuses/216306.png",
    "ダークフォース": "../public/icons/statuses/216306.png",
    "インターベンション": "../public/icons/statuses/212511.png",
    "パッセージ・オブ・アームズ": "../public/icons/statuses/212512.png",
    "パッセージ・オブ・アームズ：効果": "../public/icons/statuses/212513.png",
    "アームズレングス": "../public/icons/statuses/213915.png",
    "レクイエスカット": {
     "icon": "../public/icons/statuses/218345.png",
     "max": 4,
     "base": 218345
    },
    "レイジ・オブ・ハルオーネ": "../public/icons/statuses/214836.png",
    "ウィングシールド：効果": "../public/icons/statuses/212513.png",
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "ソウルガンメタル": "../public/icons/statuses/216306.png",
    "フルスイング": "../public/icons/statuses/214866.png",
    "忠義の剣": "../public/icons/statuses/212505.png",
    "ホーリースピリット効果アップ": "../public/icons/statuses/212521.png",
    "シャーク": "../public/icons/statuses/210404.png",
    "コンフィテオル": "../public/icons/statuses/214873.png",
    "テストゥド": "../public/icons/statuses/214801.png",
    "逆襲": "../public/icons/statuses/214817.png",
    "神聖魔法効果アップ": "../public/icons/statuses/212521.png",
    "ホーリーシェルトロン": "../public/icons/statuses/212515.png",
    "ナイトの堅守": "../public/icons/statuses/212516.png",
    "ナイトの加護": "../public/icons/statuses/212517.png",
    "ブレード・オブ・ヴァラー": "../public/icons/statuses/212518.png",
    "シールド・オブ・ハルオーネ": "../public/icons/statuses/216306.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "聖刻": "../public/icons/statuses/214892.png",
    "●ホーリー・シェルトロン：追撃": "../public/icons/statuses/214893.png",
    "忠義の盾": "../public/icons/statuses/212506.png",
    "ファランクス": "../public/icons/statuses/214982.png",
    "ブレード・オブ・フェイス実行可": "../public/icons/statuses/212519.png",
    "星法衣": "../public/icons/statuses/212509.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "エクストリームガード": "../public/icons/statuses/213050.png",
    "エクストリームガード［バリア］": "../public/icons/statuses/213051.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png",
    "シールドスマイト": "../public/icons/statuses/214716.png",
    "ランページ": "../public/icons/statuses/216622.png",
    "ホークアイ": "../public/icons/statuses/210351.png",
    "猛者の撃": "../public/icons/statuses/210354.png",
    "乱れ撃ち": "../public/icons/statuses/210356.png",
    "賢人のバラード": "../public/icons/statuses/212603.png",
    "軍神のパイオン": "../public/icons/statuses/212605.png",
    "バトルボイス": "../public/icons/statuses/212601.png",
    "ケアルラ効果アップ": "../public/icons/statuses/210410.png",
    "神速魔": "../public/icons/statuses/212627.png",
    "堅実魔": "../public/icons/statuses/210452.png",
    "ファイガ効果アップ": "../public/icons/statuses/210460.png",
    "迅速魔": "../public/icons/statuses/210454.png",
    "マバリア": "../public/icons/statuses/210456.png",
    "黒魔紋": "../public/icons/statuses/212653.png",
    "アーゼマの均衡": "../public/icons/statuses/213204.png",
    "ハルオーネの槍": "../public/icons/statuses/213207.png",
    "ライトスピード": "../public/icons/statuses/213220.png",
    "シナストリー": "../public/icons/statuses/213223.png",
    "旅神のメヌエット": "../public/icons/statuses/212610.png",
    "コースティックバイト": "../public/icons/statuses/212616.png",
    "ストームバイト": "../public/icons/statuses/212617.png",
    "地神のミンネ": "../public/icons/statuses/212618.png",
    "ルーシッドドリーム": "../public/icons/statuses/213909.png",
    "三連魔": {
     "icon": "../public/icons/statuses/219621.png",
     "max": 3,
     "base": 219621
    },
    "シンエアー": "../public/icons/statuses/212631.png",
    "インドゥルゲンティア": "../public/icons/statuses/212637.png",
    "星の支配者": "../public/icons/statuses/213241.png",
    "彼岸花": "../public/icons/statuses/213304.png",
    "明鏡止水": {
     "icon": "../public/icons/statuses/219641.png",
     "max": 3,
     "base": 219641
    },
    "燕飛効果アップ": "../public/icons/statuses/213310.png",
    "巨星の支配者": "../public/icons/statuses/213242.png",
    "トゥルーノース": "../public/icons/statuses/213903.png",
    "風月": "../public/icons/statuses/213311.png",
    "風花": "../public/icons/statuses/213312.png",
    "残心実行可": "../public/icons/statuses/213318.png",
    "ディア": "../public/icons/statuses/212635.png",
    "テンパランス": "../public/icons/statuses/212634.png",
    "ディヴィネーション": "../public/icons/statuses/213245.png",
    "コンバガ": "../public/icons/statuses/213248.png",
    "ホロスコープ": "../public/icons/statuses/213251.png",
    "ホロスコープ・ヘリオス": "../public/icons/statuses/213252.png",
    "ニュートラルセクト": "../public/icons/statuses/213253.png",
    "トルバドゥール": "../public/icons/statuses/212615.png",
    "ブラストアロー実行可": "../public/icons/statuses/212621.png",
    "リタージー・オブ・ベル": {
     "icon": "../public/icons/statuses/218373.png",
     "max": 5,
     "base": 218373
    },
    "マクロコスモス": "../public/icons/statuses/213263.png",
    "光神のフィナーレ": "../public/icons/statuses/212622.png",
    "奥義波切実行可": "../public/icons/statuses/213313.png",
    "燕返し実行可": "../public/icons/statuses/213315.png",
    "天道": "../public/icons/statuses/213319.png",
    "レゾナンスアロー実行可": "../public/icons/statuses/213076.png",
    "光神のアンコール実行可": "../public/icons/statuses/213077.png",
    "サンダー系魔法実行可": "../public/icons/statuses/212660.png",
    "ハイサンダー": "../public/icons/statuses/212661.png",
    "グレアジャ実行可": {
     "icon": "../public/icons/statuses/218669.png",
     "max": 3,
     "base": 218669
    },
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png",
    "オラクル実行可": "../public/icons/statuses/213264.png",
    "サンサイン実行可": "../public/icons/statuses/213266.png"
   },
   "bars": {
    "hb1": {
     "job": [
      {
       "kind": "action",
       "id": 9
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 3539
      },
      {
       "kind": "action",
       "id": 3538
      },
      {
       "kind": "action",
       "id": 16460
      },
      {
       "kind": "action",
       "id": 20
      },
      {
       "kind": "action",
       "id": 7540
      },
      {
       "kind": "action",
       "id": 7538
      },
      {
       "kind": "action",
       "id": 22
      },
      {
       "kind": "action",
       "id": 24
      },
      {
       "kind": "action",
       "id": 25746,
       "from": 3542
      },
      {
       "kind": "action",
       "id": 23
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb2": {
     "job": [
      {
       "kind": "action",
       "id": 7381
      },
      {
       "kind": "action",
       "id": 16457
      },
      {
       "kind": "action",
       "id": 25747,
       "from": 29
      },
      {
       "kind": "other",
       "type": 2
      },
      null,
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "action",
       "id": 7548
      },
      null,
      null,
      {
       "kind": "action",
       "id": 7385
      },
      {
       "kind": "macro",
       "no": 7
      },
      {
       "kind": "action",
       "id": 16461
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb3": {
     "job": [
      {
       "kind": "action",
       "id": 36921,
       "from": 7383
      },
      {
       "kind": "action",
       "id": 7384
      },
      {
       "kind": "action",
       "id": 16458
      },
      {
       "kind": "action",
       "id": 16459
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
       "kind": "action",
       "id": 7531
      },
      {
       "kind": "action",
       "id": 36920,
       "from": 17
      },
      {
       "kind": "action",
       "id": 7535
      },
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "action",
       "id": 28
      },
      null
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb4": {
     "job": [
      {
       "kind": "macro",
       "no": 1
      },
      {
       "kind": "macro",
       "no": 2
      },
      {
       "kind": "action",
       "id": 3540
      },
      {
       "kind": "other",
       "type": 10
      },
      {
       "kind": "action",
       "id": 7533
      },
      null,
      {
       "kind": "action",
       "id": 16
      },
      {
       "kind": "action",
       "id": 30
      },
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "other",
       "type": 10
      },
      {
       "kind": "macro",
       "no": 0
      },
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
     "job": [
      {
       "kind": "other",
       "type": 12
      },
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
      null
     ],
     "shared": [
      null,
      null,
      null,
      null,
      {
       "kind": "macro",
       "no": 346
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null
     ],
     "defaultSource": "job"
    },
    "hb7": {
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
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "other",
       "type": 2
      },
      null
     ],
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
       "kind": "macro",
       "no": 259
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
     "defaultSource": "job"
    },
    "hb8": {
     "job": null,
     "shared": [
      {
       "kind": "macro",
       "no": 296
      },
      {
       "kind": "macro",
       "no": 297
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
       "kind": "macro",
       "no": 307
      },
      {
       "kind": "other",
       "type": 4
      },
      {
       "kind": "macro",
       "no": 259
      },
      {
       "kind": "macro",
       "no": 309
      },
      {
       "kind": "macro",
       "no": 310
      },
      {
       "kind": "macro",
       "no": 298
      },
      {
       "kind": "macro",
       "no": 299
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
       "kind": "macro",
       "no": 258
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
       "kind": "macro",
       "no": 257
      },
      {
       "kind": "macro",
       "no": 256
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
       "kind": "action",
       "id": 36921
      },
      null,
      {
       "kind": "action",
       "id": 25747
      },
      {
       "kind": "action",
       "id": 36920
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
     "defaultSource": "shared"
    },
    "xhb3": {
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
     "defaultSource": "shared"
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
     "job": [
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
      },
      {
       "kind": "action",
       "id": 15
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
     "defaultSource": "job"
    }
   },
   "gauges": {
    "JobHudPLD0": {
     "index": 337,
     "name": "オウスゲージ",
     "x": 37.174476623535156,
     "y": 54.23490905761719,
     "scale": 0.6000000238418579,
     "anchor": 4,
     "w": 238,
     "h": 180
    }
   },
   "gauge": {
    "names": [
     "JobHudPLD0"
    ],
    "layouts": {
     "JobHudPLD0": {
      "partLists": [
       {
        "id": 1,
        "parts": [
         {
          "texture": "JobHudPLD",
          "u": 0,
          "v": 0,
          "w": 246,
          "h": 120
         },
         {
          "texture": "JobHudPLD",
          "u": 246,
          "v": 0,
          "w": 168,
          "h": 18
         },
         {
          "texture": "JobHudPLD",
          "u": 246,
          "v": 18,
          "w": 168,
          "h": 18
         },
         {
          "texture": "JobHudPLD",
          "u": 0,
          "v": 301,
          "w": 238,
          "h": 120
         },
         {
          "texture": "JobHudPLD",
          "u": 0,
          "v": 120,
          "w": 180,
          "h": 180
         },
         {
          "texture": "JobHudPLD",
          "u": 180,
          "v": 138,
          "w": 136,
          "h": 136
         },
         {
          "texture": "JobHudPLD",
          "u": 414,
          "v": 0,
          "w": 34,
          "h": 60
         },
         {
          "texture": "JobHudPLD",
          "u": 288,
          "v": 300,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudPLD",
          "u": 246,
          "v": 36,
          "w": 102,
          "h": 102
         },
         {
          "texture": "JobHudPLD",
          "u": 238,
          "v": 300,
          "w": 50,
          "h": 50
         },
         {
          "texture": "JobHudPLD",
          "u": 180,
          "v": 274,
          "w": 190,
          "h": 26
         },
         {
          "texture": "JobHudPLD",
          "u": 238,
          "v": 350,
          "w": 34,
          "h": 34
         },
         {
          "texture": "JobHudPLD",
          "u": 370,
          "v": 274,
          "w": 80,
          "h": 32
         },
         {
          "texture": "JobHudPLD",
          "u": 348,
          "v": 70,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudPLD",
          "u": 316,
          "v": 138,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudPLD",
          "u": 384,
          "v": 138,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudPLD",
          "u": 316,
          "v": 306,
          "w": 78,
          "h": 52
         }
        ]
       },
       {
        "id": 2,
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
        "id": 3,
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
          "w": 180,
          "h": 180,
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
          "w": 180,
          "h": 180,
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
          "type": 2,
          "x": -6,
          "y": 42,
          "w": 78,
          "h": 52,
          "alpha": 0,
          "scaleX": 0,
          "scaleY": 0,
          "rotation": 0,
          "originX": 70,
          "originY": 52,
          "partListId": 1,
          "partId": 16,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 2,
          "type": 2,
          "x": 107,
          "y": 42,
          "w": 78,
          "h": 52,
          "alpha": 0,
          "scaleX": 0,
          "scaleY": 0,
          "rotation": 0,
          "originX": 8,
          "originY": 52,
          "partListId": 1,
          "partId": 16,
          "flipH": true,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": 50,
          "w": 180,
          "h": 180,
          "alpha": 0,
          "scaleX": 0,
          "scaleY": 0,
          "rotation": 0,
          "originX": 90,
          "originY": 90,
          "partListId": 1,
          "partId": 4,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 1,
          "x": 22,
          "y": 24,
          "w": 136,
          "h": 136,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 68,
          "originY": 68
         },
         {
          "id": 7,
          "parent": 6,
          "type": 2,
          "x": 35,
          "y": 34,
          "w": 68,
          "h": 68,
          "alpha": 59,
          "scaleX": 0.98333335,
          "scaleY": 0.98333335,
          "rotation": 0,
          "originX": 34,
          "originY": 34,
          "add": [
           33,
           33,
           0
          ],
          "partListId": 1,
          "partId": 13,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 8,
          "parent": 6,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 136,
          "h": 136,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 68,
          "originY": 68,
          "partListId": 1,
          "partId": 5,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 9,
          "parent": 6,
          "type": 2,
          "x": 34,
          "y": 34,
          "w": 68,
          "h": 68,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 34,
          "originY": 34,
          "partListId": 1,
          "partId": 14,
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
          "w": 168,
          "h": 18,
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
          "type": 1003,
          "x": 0,
          "y": -40,
          "w": 4,
          "h": 100,
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
          "w": 168,
          "h": 18,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 2,
          "originY": 2,
          "partListId": 1,
          "partId": 1,
          "nineGrid": [
           2,
           2,
           2,
           2
          ]
         },
         {
          "id": 4,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 0,
          "w": 168,
          "h": 18,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 2,
          "originY": 2,
          "add": [
           200,
           200,
           200
          ],
          "partListId": 1,
          "partId": 1,
          "nineGrid": [
           2,
           2,
           2,
           2
          ]
         },
         {
          "id": 5,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 0,
          "w": 168,
          "h": 18,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 2,
          "originY": 2,
          "add": [
           -100,
           -100,
           -100
          ],
          "partListId": 1,
          "partId": 1,
          "nineGrid": [
           2,
           2,
           2,
           2
          ]
         },
         {
          "id": 6,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 168,
          "h": 18,
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
          "w": 4,
          "h": 100,
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
          "x": -16,
          "y": 18,
          "w": 34,
          "h": 60,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 0.8,
          "rotation": 0,
          "originX": 17,
          "originY": 30,
          "partListId": 1,
          "partId": 6,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": -16,
          "y": 18,
          "w": 34,
          "h": 60,
          "alpha": 0,
          "scaleX": 0.2,
          "scaleY": 1,
          "rotation": 0,
          "originX": 17,
          "originY": 30,
          "partListId": 1,
          "partId": 6,
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
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 11,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1005,
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
          "partListId": 3,
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
          "originY": 0,
          "add": [
           30,
           30,
           30
          ]
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
           130,
           100,
           -20
          ],
          "partListId": 3,
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
          "partListId": 3,
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
          "partListId": 3,
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
          "partListId": 3,
          "partId": 5,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1006,
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
          "partListId": 2,
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
        "w": 238,
        "h": 180,
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
        "w": 238,
        "h": 180,
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
        "type": 2,
        "x": 0,
        "y": 36,
        "w": 238,
        "h": 120,
        "alpha": 29,
        "scaleX": 1.0085714,
        "scaleY": 1.0142857,
        "rotation": 0,
        "originX": 119,
        "originY": 60,
        "add": [
         7,
         7,
         7
        ],
        "partListId": 1,
        "partId": 3,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 4,
        "parent": 2,
        "type": 2,
        "x": 22,
        "y": 84,
        "w": 190,
        "h": 26,
        "alpha": 63,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 98,
        "originY": 13,
        "partListId": 1,
        "partId": 10,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 5,
        "parent": 2,
        "type": 2,
        "x": 70,
        "y": 48,
        "w": 102,
        "h": 102,
        "alpha": 255,
        "scaleX": 2,
        "scaleY": 2,
        "rotation": 360,
        "originX": 51,
        "originY": 51,
        "partListId": 1,
        "partId": 8,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 6,
        "parent": 2,
        "type": 2,
        "x": 96,
        "y": 74,
        "w": 50,
        "h": 50,
        "alpha": 127,
        "scaleX": 3,
        "scaleY": 3,
        "rotation": 0,
        "originX": 25,
        "originY": 25,
        "partListId": 1,
        "partId": 9,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 7,
        "parent": 2,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 238,
        "h": 180,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 8,
        "parent": 7,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 242,
        "h": 156,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 9,
        "parent": 8,
        "type": 3,
        "x": 147,
        "y": 108,
        "w": 72,
        "h": 22,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 10,
        "parent": 8,
        "type": 4,
        "x": 144,
        "y": 102,
        "w": 80,
        "h": 32,
        "alpha": 204,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 12,
        "nineGrid": [
         12,
         12,
         18,
         18
        ]
       },
       {
        "id": 11,
        "parent": 8,
        "type": 1002,
        "x": 35,
        "y": 87,
        "w": 168,
        "h": 18,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 12,
        "parent": 8,
        "type": 2,
        "x": -4,
        "y": 36,
        "w": 246,
        "h": 120,
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
        "id": 13,
        "parent": 7,
        "type": 1001,
        "x": 30,
        "y": 0,
        "w": 180,
        "h": 180,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 14,
        "parent": 1,
        "type": 1,
        "x": 25,
        "y": 65,
        "w": 188,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 15,
        "parent": 14,
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
        "id": 16,
        "parent": 14,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 188,
        "h": 50,
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
        "type": 1006,
        "x": 140,
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
        "id": 18,
        "parent": 16,
        "type": 1005,
        "x": 28,
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
     }
    },
    "textures": {
     "JobHudPLD": {
      "path": "../public/icons/job-gauges/textures/JobHudPLD.png",
      "w": 904,
      "h": 840,
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
     }
    },
    "sizes": {
     "JobHudPLD0": [
      238,
      180
     ]
    }
   },
   "dmgUp": {
    "ファイト・オア・フライト": 25
   },
   "upgrade": {
    "17": 36920,
    "21": 3539,
    "29": 25747,
    "3542": 25746,
    "7383": 36921
   },
   "jobSet": 19,
   "buttonsAll": [
    9,
    15,
    16,
    20,
    22,
    23,
    24,
    27,
    28,
    30,
    3538,
    3539,
    3540,
    3541,
    7381,
    7382,
    7384,
    7385,
    16457,
    16458,
    16459,
    16460,
    16461,
    25746,
    25747,
    36920,
    36921
   ],
   "unplaced": [
    27,
    3541,
    7382
   ],
   "replaceGroups": {
    "16459": [
     25748,
     25749,
     25750
    ],
    "16460": [
     36918,
     36919
    ],
    "36921": [
     36922
    ]
   },
   "splitDetected": []
  },
  "WHM": {
   "job": {
    "abbr": "WHM",
    "name": "白魔道士",
    "icon": "../public/icons/jobs/WHM.png",
    "level": 100,
    "role": "healer"
   },
   "actions": {
    "120": {
     "id": 120,
     "name": "ケアル",
     "desc": "対象のＨＰを回復する。　回復力：500\n追加効果（発動確率15％）：次に詠唱するケアルラの消費ＭＰを0にする。　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Cure.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 2,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 500,
      "party": false
     },
     "replaces": []
    },
    "124": {
     "id": 124,
     "name": "メディカ",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：400",
     "icon": "../public/fankit/battle-pve/18_WHM/Medica.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 10,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 900,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 400,
      "party": true
     },
     "replaces": []
    },
    "125": {
     "id": 125,
     "name": "レイズ",
     "desc": "対象を衰弱状態で蘇生する。",
     "icon": "../public/fankit/battle-pve/18_WHM/Raise.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 8000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 12,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 2400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "131": {
     "id": 131,
     "name": "ケアルガ",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象とその周囲のパーティメンバーのＨＰを回復する。\n回復力：600",
     "icon": "../public/fankit/battle-pve/18_WHM/Cure_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 40,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 1500,
     "range": 30,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 600,
      "party": true
     },
     "replaces": []
    },
    "135": {
     "id": 135,
     "name": "ケアルラ",
     "desc": "対象のＨＰを回復する。　回復力：800",
     "icon": "../public/fankit/battle-pve/18_WHM/Cure_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": 2,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 1000,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 800,
      "party": false
     },
     "replaces": []
    },
    "136": {
     "id": 136,
     "name": "神速魔",
     "desc": "一定時間、自身のオートアタックの攻撃間隔と、魔法のキャストタイムとリキャストタイムを20％短縮させる。\n効果時間：15秒\n追加効果：自身に3スタックの「グレアジャ実行可」を付与する。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Presence_of_Mind.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 21,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "グレアジャ実行可",
        "sec": 30,
        "stacks": 3,
        "combo": false
       }
      ],
      "haste": {
       "pct": 20,
       "sec": 15
      }
     },
     "replaces": []
    },
    "137": {
     "id": 137,
     "name": "リジェネ",
     "desc": "対象のＨＰを継続回復する。　回復力：250　効果時間：18秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Regen.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 35,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 250,
       "sec": 18
      }
     },
     "replaces": []
    },
    "140": {
     "id": 140,
     "name": "ベネディクション",
     "desc": "対象のＨＰを全回復する。",
     "icon": "../public/fankit/battle-pve/18_WHM/Benediction.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 180000,
     "cooldownGroup": 24,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": "full",
      "party": false
     },
     "replaces": []
    },
    "3569": {
     "id": 3569,
     "name": "アサイラム",
     "desc": "指定した地面を中心にヒールエリアを生成する。\n効果時間中、範囲内にいる自身およびパーティメンバーを継続回復する。\n回復力：100　効果時間：24秒\n追加効果：範囲内にいる自身およびパーティメンバーの受けるＨＰ回復効果が10％上昇する。",
     "icon": "../public/fankit/battle-pve/18_WHM/Asylum.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 90000,
     "cooldownGroup": 15,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 52,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 15,
     "ground": true,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 100,
       "sec": 24
      }
     },
     "replaces": []
    },
    "3570": {
     "id": 3570,
     "name": "テトラグラマトン",
     "desc": "対象のＨＰを回復する。　回復力：700\n最大チャージ数：2",
     "icon": "../public/fankit/battle-pve/18_WHM/Tetragrammaton.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 20,
     "maxCharges": 1,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 60,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 700,
      "party": false
     },
     "replaces": []
    },
    "3571": {
     "id": 3571,
     "name": "アサイズ",
     "desc": "自身の周囲の敵に無属性範囲魔法攻撃。　威力：400\n追加効果：自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：400\n追加効果：自身のＭＰを最大ＭＰの5％分回復する。",
     "icon": "../public/fankit/battle-pve/18_WHM/Assize.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 40000,
     "cooldownGroup": 8,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 56,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 400
     },
     "eff": {
      "heal": 400,
      "party": true
     },
     "replaces": []
    },
    "7430": {
     "id": 7430,
     "name": "シンエアー",
     "desc": "効果時間中に実行する1回のアクションについて、消費ＭＰを0にする。　効果時間：12秒\n最大チャージ数：2",
     "icon": "../public/fankit/battle-pve/18_WHM/Thin_Air.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 19,
     "maxCharges": 2,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 58,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7432": {
     "id": 7432,
     "name": "ディヴァインベニゾン",
     "desc": "自身またはパーティメンバーひとりを対象として、一定量のダメージを防ぐバリアを張る。\nこのバリアは回復力500相当のダメージを軽減する。\n効果時間：15秒\n最大チャージ数：2",
     "icon": "../public/fankit/battle-pve/18_WHM/Divine_Benison.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 10,
     "maxCharges": 1,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 66,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7433": {
     "id": 7433,
     "name": "インドゥルゲンティア",
     "desc": "一定時間、自身と周囲のパーティメンバーの被ダメージを10％軽減させる。　効果時間：10秒\nさらに、この効果を付与した対象に、自身がメディカ、ケアルガ、メディガ、ハート・オブ・ラプチャーによる回復効果を発動すると、対象に追加の回復効果を発動する。　回復力：200",
     "icon": "../public/fankit/battle-pve/18_WHM/Plenary_Indulgence.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 11,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 70,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7559": {
     "id": 7559,
     "name": "堅実魔",
     "desc": "一定時間、魔法詠唱を詠唱妨害されずに行うことができる。\nさらに、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Role_Actions/Surecast.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 49,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 44,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7561": {
     "id": 7561,
     "name": "迅速魔",
     "desc": "一定時間、次の1回の魔法詠唱について、詠唱時間無しで詠唱することができる。　効果時間：10秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Role_Actions/Swiftcast.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 44,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 18,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7562": {
     "id": 7562,
     "name": "ルーシッドドリーム",
     "desc": "自身のＭＰを継続回復する。\n効果量：55　効果時間：21秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Role_Actions/Lucid_Dreaming.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 45,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 14,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7568": {
     "id": 7568,
     "name": "エスナ",
     "desc": "対象にかかった一部の弱体効果を1つ解除する。",
     "icon": "../public/fankit/battle-pve/18_WHM/Role_Actions/Esuna.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 10,
     "forJob": true,
     "isRole": true,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 420
     },
     "eff": {
      "grant": [
       {
        "status": "ディセスティーム実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16531": {
     "id": 16531,
     "name": "ハート・オブ・ソラス",
     "desc": "対象のＨＰを回復する。　回復力：800\n追加効果：自身に「ブラッドリリー」を付与する。\n発動条件：「ヒーリングリリー」",
     "icon": "../public/fankit/battle-pve/18_WHM/Afflatus_Solace.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 52,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "ブラッドリリー",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "ヒーリングリリー",
       "n": 1
      },
      "heal": 800,
      "party": false
     },
     "replaces": []
    },
    "16532": {
     "id": 16532,
     "name": "ディア",
     "desc": "対象に無属性魔法攻撃。　威力：85\n追加効果：対象に無属性の継続ダメージを付与する。\n威力：85　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Dia.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 72,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 400,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 85,
      "dot": {
       "potency": 85,
       "sec": 30
      }
     },
     "eff": null,
     "replaces": []
    },
    "16534": {
     "id": 16534,
     "name": "ハート・オブ・ラプチャー",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：400\n追加効果：自身に「ブラッドリリー」を付与する。\n発動条件：「ヒーリングリリー」",
     "icon": "../public/fankit/battle-pve/18_WHM/Afflatus_Rapture.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 76,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "ブラッドリリー",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "ヒーリングリリー",
       "n": 1
      },
      "heal": 400,
      "party": true
     },
     "replaces": []
    },
    "16535": {
     "id": 16535,
     "name": "ハート・オブ・ミゼリ",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：1400\n2体目以降の対象への威力は50％減少する。\n発動条件：「ブラッドリリー」3",
     "icon": "../public/fankit/battle-pve/18_WHM/Afflatus_Misery.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 74,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 1400
     },
     "eff": {
      "cost": {
       "gauge": "ブラッドリリー",
       "n": 3
      }
     },
     "replaces": []
    },
    "16536": {
     "id": 16536,
     "name": "テンパランス",
     "desc": "一定時間、自身の回復魔法の回復量を20％上昇させ、自身と周囲50m以内にいるパーティメンバーの被ダメージを10％軽減する。　効果時間：20秒\n追加効果：自身に「ディヴァインカレス実行可」を付与する。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Temperance.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 22,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 80,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "ディヴァインカレス実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16560": {
     "id": 16560,
     "name": "リポーズ",
     "desc": "対象に睡眠を付与する。　効果時間：30秒\n実行後にオートアタックを停止する。",
     "icon": "../public/fankit/battle-pve/18_WHM/Role_Actions/Repose.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 8,
     "forJob": true,
     "isRole": true,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 600,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "requires": "暗黒"
     },
     "replaces": []
    },
    "25859": {
     "id": 25859,
     "name": "グレアガ",
     "desc": "対象に無属性魔法攻撃。　威力：350",
     "icon": "../public/fankit/battle-pve/18_WHM/Glare_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 400,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 350
     },
     "eff": null,
     "replaces": []
    },
    "25860": {
     "id": 25860,
     "name": "ホーリガ",
     "desc": "自身の周囲の敵に無属性範囲魔法攻撃。　威力：150\n追加効果：対象をスタンさせる。　効果時間：4秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Holy_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 400,
     "range": 0,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 150
     },
     "eff": null,
     "replaces": []
    },
    "25861": {
     "id": 25861,
     "name": "アクアヴェール",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象の被ダメージを15％軽減する。　効果時間：8秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Aquaveil.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 12,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 86,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "25862": {
     "id": 25862,
     "name": "リタージー・オブ・ベル",
     "desc": "指定した地面に「リタージー・オブ・ベル」を設置し、自身に5スタックの「リタージー・オブ・ベル」を付与する。\n効果時間：20秒\nリタージー・オブ・ベルの効果時間中に自身がダメージを受けると、スタックを1つ消費してリタージー・オブ・ベルの周囲20m以内にいる自身およびパーティメンバーを回復する。\n回復力：400\nこの効果は、発動後1秒間は再発動しない。\nリタージー・オブ・ベルの効果時間が経過するか効果時間中に再使用すると、残りスタック数に応じた回復効果が発動して消滅する。\n回復力：200×残りスタック数",
     "icon": "../public/fankit/battle-pve/18_WHM/Liturgy_of_the_Bell.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 180000,
     "cooldownGroup": 23,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 1,
     "ground": true,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "リタージー・オブ・ベル",
        "sec": 20,
        "stacks": 5,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "37008": {
     "id": 37008,
     "name": "エーテリアルシフト",
     "desc": "自身の15m前方に向かって素早く移動する。\nバインド中は実行不可。",
     "icon": "../public/fankit/battle-pve/18_WHM/Aetherial_Shift.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 13,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 40,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37009": {
     "id": 37009,
     "name": "グレアジャ",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：640\n2体目以降の対象への威力は40％減少する。\n発動条件：「グレアジャ実行可」効果中",
     "icon": "../public/fankit/battle-pve/18_WHM/Glare_IV.png",
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
     "isRole": false,
     "category": 2,
     "proc": 181,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 640
     },
     "eff": {
      "requires": "グレアジャ実行可"
     },
     "replaces": []
    },
    "37010": {
     "id": 37010,
     "name": "メディガ",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：250\n追加効果：対象のＨＰを継続回復する。\n回復力：175　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Medica_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 96,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 1000,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 175,
       "sec": 15
      },
      "heal": 250,
      "party": true
     },
     "replaces": []
    },
    "37011": {
     "id": 37011,
     "name": "ディヴァインカレス",
     "desc": "自身と周囲のパーティメンバーに、一定量のダメージを防ぐバリアを張る。\nバリア量：回復力400相当　効果時間：10秒\n追加効果：バリア効果が終了すると、対象に「ディヴァインカレス［回］」を付与する。\nディヴァインカレス［回］効果：対象のＨＰを継続回復する。\n回復力：200　効果時間：15秒\n発動条件：「ディヴァインカレス実行可」効果中",
     "icon": "../public/fankit/battle-pve/18_WHM/Divine_Caress.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 2,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 100,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": 182,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "requires": "ディヴァインカレス実行可",
      "hot": {
       "potency": 200,
       "sec": 15
      }
     },
     "replaces": []
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
    "エアロ": "../public/icons/statuses/210403.png",
    "エアロラ": "../public/icons/statuses/210409.png",
    "クルセードスタンス": "../public/icons/statuses/210402.png",
    "プロテス": "../public/icons/statuses/210405.png",
    "メディカラ": "../public/icons/statuses/210413.png",
    "神速魔": "../public/icons/statuses/212627.png",
    "リジェネ": "../public/icons/statuses/212626.png",
    "堅実魔": "../public/icons/statuses/210452.png",
    "迅速魔": "../public/icons/statuses/210454.png",
    "アイ・フォー・アイ": "../public/icons/statuses/213918.png",
    "シールドウォール": "../public/icons/statuses/216306.png",
    "ストロングホールド": "../public/icons/statuses/216306.png",
    "ラストバスティオン": "../public/icons/statuses/216306.png",
    "アサイラム": "../public/icons/statuses/212629.png",
    "原初の大地": "../public/icons/statuses/216306.png",
    "ダークフォース": "../public/icons/statuses/216306.png",
    "ルーシッドドリーム": "../public/icons/statuses/213909.png",
    "慈愛": "../public/icons/statuses/213910.png",
    "シンエアー": "../public/icons/statuses/212631.png",
    "ディヴァインベニゾン": "../public/icons/statuses/212632.png",
    "インドゥルゲンティア": "../public/icons/statuses/212637.png",
    "ディア": "../public/icons/statuses/212635.png",
    "テンパランス": "../public/icons/statuses/212634.png",
    "テンパランス：効果": "../public/icons/statuses/212633.png",
    "ソウルガンメタル": "../public/icons/statuses/216306.png",
    "調和": "../public/icons/statuses/214816.png",
    "ハート・オブ・ソラス": "../public/icons/statuses/214865.png",
    "アクアヴェール": "../public/icons/statuses/212638.png",
    "リタージー・オブ・ベル": {
     "icon": "../public/icons/statuses/218373.png",
     "max": 5,
     "base": 218373
    },
    "ケアルガ実行可": "../public/icons/statuses/214985.png",
    "●女神の加護": "../public/icons/statuses/210408.png",
    "ミラクル・オブ・ネイチャー": "../public/icons/statuses/214979.png",
    "グレアジャ実行可": {
     "icon": "../public/icons/statuses/218669.png",
     "max": 3,
     "base": 218669
    },
    "メディガ": "../public/icons/statuses/212639.png",
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png",
    "ディヴァインカレス［バリア］": "../public/icons/statuses/212641.png",
    "ディヴァインカレス［回］": "../public/icons/statuses/212642.png",
    "ハート・オブ・ミゼリ": "../public/icons/statuses/214745.png",
    "ストンラスキン": "../public/icons/statuses/214749.png",
    "ディアブロシス": "../public/icons/statuses/214750.png",
    "ランパート": "../public/icons/statuses/210152.png",
    "ファイト・オア・フライト": "../public/icons/statuses/210155.png",
    "アイアンウィル": "../public/icons/statuses/212506.png",
    "ホークアイ": "../public/icons/statuses/210351.png",
    "猛者の撃": "../public/icons/statuses/210354.png",
    "乱れ撃ち": "../public/icons/statuses/210356.png",
    "賢人のバラード": "../public/icons/statuses/212603.png",
    "軍神のパイオン": "../public/icons/statuses/212605.png",
    "バトルボイス": "../public/icons/statuses/212601.png",
    "ケアルラ効果アップ": "../public/icons/statuses/210410.png",
    "ファイガ効果アップ": "../public/icons/statuses/210460.png",
    "マバリア": "../public/icons/statuses/210456.png",
    "サークル・オブ・ドゥーム": "../public/icons/statuses/210158.png",
    "黒魔紋": "../public/icons/statuses/212653.png",
    "アーゼマの均衡": "../public/icons/statuses/213204.png",
    "ハルオーネの槍": "../public/icons/statuses/213207.png",
    "ライトスピード": "../public/icons/statuses/213220.png",
    "シナストリー": "../public/icons/statuses/213223.png",
    "旅神のメヌエット": "../public/icons/statuses/212610.png",
    "コースティックバイト": "../public/icons/statuses/212616.png",
    "ストームバイト": "../public/icons/statuses/212617.png",
    "地神のミンネ": "../public/icons/statuses/212618.png",
    "三連魔": {
     "icon": "../public/icons/statuses/219621.png",
     "max": 3,
     "base": 219621
    },
    "星の支配者": "../public/icons/statuses/213241.png",
    "彼岸花": "../public/icons/statuses/213304.png",
    "明鏡止水": {
     "icon": "../public/icons/statuses/219641.png",
     "max": 3,
     "base": 219641
    },
    "燕飛効果アップ": "../public/icons/statuses/213310.png",
    "巨星の支配者": "../public/icons/statuses/213242.png",
    "トゥルーノース": "../public/icons/statuses/213903.png",
    "風月": "../public/icons/statuses/213311.png",
    "風花": "../public/icons/statuses/213312.png",
    "残心実行可": "../public/icons/statuses/213318.png",
    "レクイエスカット": {
     "icon": "../public/icons/statuses/218345.png",
     "max": 4,
     "base": 218345
    },
    "ディヴィネーション": "../public/icons/statuses/213245.png",
    "コンバガ": "../public/icons/statuses/213248.png",
    "ホロスコープ": "../public/icons/statuses/213251.png",
    "ホロスコープ・ヘリオス": "../public/icons/statuses/213252.png",
    "ニュートラルセクト": "../public/icons/statuses/213253.png",
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "トルバドゥール": "../public/icons/statuses/212615.png",
    "神聖魔法効果アップ": "../public/icons/statuses/212521.png",
    "ブラストアロー実行可": "../public/icons/statuses/212621.png",
    "マクロコスモス": "../public/icons/statuses/213263.png",
    "光神のフィナーレ": "../public/icons/statuses/212622.png",
    "奥義波切実行可": "../public/icons/statuses/213313.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png",
    "燕返し実行可": "../public/icons/statuses/213315.png",
    "天道": "../public/icons/statuses/213319.png",
    "レゾナンスアロー実行可": "../public/icons/statuses/213076.png",
    "光神のアンコール実行可": "../public/icons/statuses/213077.png",
    "サンダー系魔法実行可": "../public/icons/statuses/212660.png",
    "ハイサンダー": "../public/icons/statuses/212661.png",
    "オラクル実行可": "../public/icons/statuses/213264.png",
    "サンサイン実行可": "../public/icons/statuses/213266.png"
   },
   "bars": {
    "hb1": {
     "job": [
      {
       "kind": "macro",
       "no": 21
      },
      {
       "kind": "macro",
       "no": 22
      },
      {
       "kind": "action",
       "id": 37010,
       "from": 133
      },
      {
       "kind": "macro",
       "no": 27
      },
      {
       "kind": "action",
       "id": 124
      },
      {
       "kind": "action",
       "id": 37008
      },
      {
       "kind": "action",
       "id": 16536
      },
      {
       "kind": "action",
       "id": 7562
      },
      {
       "kind": "action",
       "id": 136
      },
      {
       "kind": "macro",
       "no": 25
      },
      {
       "kind": "action",
       "id": 25859,
       "from": 119
      },
      {
       "kind": "action",
       "id": 7430
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb2": {
     "job": [
      {
       "kind": "action",
       "id": 16532,
       "from": 121
      },
      {
       "kind": "action",
       "id": 25860,
       "from": 139
      },
      {
       "kind": "action",
       "id": 3571
      },
      {
       "kind": "action",
       "id": 16535
      },
      null,
      null,
      {
       "kind": "action",
       "id": 7559
      },
      null,
      null,
      {
       "kind": "macro",
       "no": 26
      },
      {
       "kind": "action",
       "id": 7433
      },
      {
       "kind": "action",
       "id": 16534
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb3": {
     "job": [
      {
       "kind": "macro",
       "no": 54
      },
      null,
      {
       "kind": "macro",
       "no": 40
      },
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 131
      },
      {
       "kind": "action",
       "id": 25862
      },
      {
       "kind": "action",
       "id": 3569
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
       "kind": "macro",
       "no": 23
      },
      {
       "kind": "action",
       "id": 7561
      },
      {
       "kind": "macro",
       "no": 20
      },
      {
       "kind": "other",
       "type": 10
      },
      {
       "kind": "macro",
       "no": 30
      },
      null,
      null,
      {
       "kind": "macro",
       "no": 24
      },
      null,
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
       "kind": "macro",
       "no": 346
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
     "job": [
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "other",
       "type": 2
      },
      {
       "kind": "other",
       "type": 2
      },
      null,
      null,
      null,
      null,
      null,
      null,
      {
       "kind": "other",
       "type": 2
      },
      null
     ],
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
       "kind": "macro",
       "no": 259
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
     "defaultSource": "job"
    },
    "hb8": {
     "job": [
      null,
      null,
      null,
      {
       "kind": "other",
       "type": 18
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
     ],
     "shared": [
      {
       "kind": "macro",
       "no": 296
      },
      {
       "kind": "macro",
       "no": 297
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
       "kind": "macro",
       "no": 307
      },
      {
       "kind": "other",
       "type": 4
      },
      {
       "kind": "macro",
       "no": 259
      },
      {
       "kind": "macro",
       "no": 309
      },
      {
       "kind": "macro",
       "no": 310
      },
      {
       "kind": "macro",
       "no": 298
      },
      {
       "kind": "macro",
       "no": 299
      }
     ],
     "defaultSource": "job"
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
       "kind": "macro",
       "no": 258
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
      null,
      {
       "kind": "other",
       "type": 12
      }
     ],
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
       "kind": "macro",
       "no": 257
      },
      {
       "kind": "macro",
       "no": 256
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
     "defaultSource": "job"
    },
    "xhb1": {
     "job": [
      {
       "kind": "action",
       "id": 135
      },
      {
       "kind": "action",
       "id": 136
      },
      {
       "kind": "action",
       "id": 7562
      },
      {
       "kind": "missing",
       "id": 134
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
       "id": 125
      },
      {
       "kind": "action",
       "id": 7561
      },
      {
       "kind": "action",
       "id": 124
      },
      {
       "kind": "action",
       "id": 7568
      },
      {
       "kind": "action",
       "id": 16532,
       "from": 121
      },
      {
       "kind": "action",
       "id": 16560
      },
      {
       "kind": "action",
       "id": 25859,
       "from": 119
      },
      {
       "kind": "action",
       "id": 120
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
      null,
      null,
      {
       "kind": "action",
       "id": 25862
      },
      null,
      {
       "kind": "action",
       "id": 7559
      },
      {
       "kind": "action",
       "id": 25861
      },
      {
       "kind": "action",
       "id": 7430
      },
      {
       "kind": "action",
       "id": 3570
      },
      {
       "kind": "action",
       "id": 16531
      },
      {
       "kind": "action",
       "id": 3571
      },
      {
       "kind": "action",
       "id": 140
      },
      {
       "kind": "action",
       "id": 3569
      },
      {
       "kind": "action",
       "id": 25860,
       "from": 139
      },
      {
       "kind": "action",
       "id": 37010,
       "from": 133
      },
      {
       "kind": "action",
       "id": 137
      },
      {
       "kind": "action",
       "id": 131
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
     "defaultSource": "shared"
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
   "gauges": {
    "JobHudWHM0": {
     "index": 371,
     "name": "ヒーリングゲージ",
     "x": 36.015625,
     "y": 46.72438049316406,
     "scale": 0.800000011920929,
     "anchor": 4,
     "w": 160,
     "h": 176
    }
   },
   "gauge": {
    "names": [
     "JobHudWHM0"
    ],
    "layouts": {
     "JobHudWHM0": {
      "partLists": [
       {
        "id": 1,
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
        "id": 2,
        "parts": [
         {
          "texture": "JobHudSimple_StackB",
          "u": 0,
          "v": 0,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudSimple_StackB",
          "u": 32,
          "v": 0,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudSimple_StackB",
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
          "texture": "JobHudWHM",
          "u": 0,
          "v": 0,
          "w": 152,
          "h": 186
         },
         {
          "texture": "JobHudWHM",
          "u": 152,
          "v": 0,
          "w": 44,
          "h": 44
         },
         {
          "texture": "JobHudWHM",
          "u": 152,
          "v": 44,
          "w": 20,
          "h": 20
         },
         {
          "texture": "JobHudWHM",
          "u": 152,
          "v": 68,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudWHM",
          "u": 180,
          "v": 68,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudWHM",
          "u": 152,
          "v": 96,
          "w": 74,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 196,
          "v": 0,
          "w": 48,
          "h": 48
         },
         {
          "texture": "JobHudWHM",
          "u": 208,
          "v": 68,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudWHM",
          "u": 0,
          "v": 186,
          "w": 52,
          "h": 52
         },
         {
          "texture": "JobHudWHM",
          "u": 52,
          "v": 186,
          "w": 52,
          "h": 52
         },
         {
          "texture": "JobHudWHM",
          "u": 104,
          "v": 186,
          "w": 52,
          "h": 52
         },
         {
          "texture": "JobHudWHM",
          "u": 156,
          "v": 170,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudWHM",
          "u": 0,
          "v": 238,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 60,
          "v": 238,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 120,
          "v": 238,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 180,
          "v": 238,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 0,
          "v": 312,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 60,
          "v": 312,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 120,
          "v": 312,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 180,
          "v": 312,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 0,
          "v": 386,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 60,
          "v": 386,
          "w": 60,
          "h": 74
         },
         {
          "texture": "JobHudWHM",
          "u": 120,
          "v": 386,
          "w": 74,
          "h": 82
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 1,
          "y": 1,
          "w": 28,
          "h": 28,
          "alpha": 0,
          "scaleX": 0,
          "scaleY": 0,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "partListId": 3,
          "partId": 7,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": 1,
          "y": 1,
          "w": 28,
          "h": 28,
          "alpha": 0,
          "scaleX": 0.5,
          "scaleY": 0.5,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "partListId": 3,
          "partId": 4,
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
          "multiply": [
           80,
           80,
           80
          ],
          "add": [
           0,
           45,
           100
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
          "id": 4,
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
          "alpha": 63,
          "scaleX": 2.125,
          "scaleY": 2.125,
          "rotation": 0,
          "originX": 16,
          "originY": 16,
          "add": [
           60,
           60,
           60
          ]
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
           120,
           -50,
           -50
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
          "alpha": 63,
          "scaleX": 2.125,
          "scaleY": 2.125,
          "rotation": 0,
          "originX": 16,
          "originY": 16,
          "add": [
           60,
           60,
           60
          ]
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
           -80,
           -30,
           120
          ],
          "partListId": 1,
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
          "partListId": 1,
          "partId": 0,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1005,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 50,
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
          "w": 50,
          "h": 50,
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
          "type": 2,
          "x": -12,
          "y": -12,
          "w": 74,
          "h": 74,
          "alpha": 0,
          "scaleX": 0.9444444,
          "scaleY": 0.9444444,
          "rotation": 0,
          "originX": 37,
          "originY": 37,
          "partListId": 3,
          "partId": 5,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 2,
          "type": 2,
          "x": 12,
          "y": 12,
          "w": 28,
          "h": 28,
          "alpha": 21,
          "scaleX": 1.3333334,
          "scaleY": 1.3333334,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "partListId": 3,
          "partId": 4,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 2,
          "type": 2,
          "x": 8,
          "y": 15,
          "w": 28,
          "h": 28,
          "alpha": 229,
          "scaleX": 2.55,
          "scaleY": 2.55,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "partListId": 3,
          "partId": 4,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 2,
          "type": 2,
          "x": -3,
          "y": 6,
          "w": 48,
          "h": 48,
          "alpha": 9,
          "scaleX": 1.1,
          "scaleY": 1.1,
          "rotation": 0,
          "originX": 24,
          "originY": 24,
          "partListId": 3,
          "partId": 6,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 7,
          "parent": 2,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 50,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 8,
          "parent": 7,
          "type": 2,
          "x": -3,
          "y": 5,
          "w": 48,
          "h": 48,
          "alpha": 9,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 24,
          "originY": 24,
          "partListId": 3,
          "partId": 6,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 9,
          "parent": 2,
          "type": 2,
          "x": 26,
          "y": 4,
          "w": 20,
          "h": 20,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 3,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 10,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": 6,
          "w": 44,
          "h": 44,
          "alpha": 212,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 44,
          "originY": 0,
          "partListId": 3,
          "partId": 1,
          "flipH": false,
          "flipV": false
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
        "w": 160,
        "h": 176,
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
        "w": 160,
        "h": 176,
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
        "w": 158,
        "h": 186,
        "alpha": 255,
        "scaleX": 0.95,
        "scaleY": 0.95,
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
        "w": 152,
        "h": 186,
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
        "type": 1005,
        "x": 28,
        "y": 86,
        "w": 50,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 6,
        "parent": 4,
        "type": 1005,
        "x": 65,
        "y": 60,
        "w": 50,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 7,
        "parent": 4,
        "type": 1005,
        "x": 58,
        "y": 22,
        "w": 50,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 8,
        "parent": 3,
        "type": 1,
        "x": 115,
        "y": 122,
        "w": 52,
        "h": 52,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 9,
        "parent": 8,
        "type": 2,
        "x": -18,
        "y": -16,
        "w": 74,
        "h": 74,
        "alpha": 204,
        "scaleX": 1.2,
        "scaleY": 1.2,
        "rotation": 0,
        "originX": 37,
        "originY": 37,
        "partListId": 3,
        "partId": 5,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 10,
        "parent": 8,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 52,
        "h": 52,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 26,
        "originY": 26,
        "add": [
         100,
         100,
         100
        ],
        "partListId": 3,
        "partId": 8,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 11,
        "parent": 8,
        "type": 2,
        "x": -5,
        "y": -5,
        "w": 60,
        "h": 60,
        "alpha": 85,
        "scaleX": 0.33333334,
        "scaleY": 0.33333334,
        "rotation": 0,
        "originX": 30,
        "originY": 30,
        "partListId": 3,
        "partId": 11,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 12,
        "parent": 3,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 186,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 13,
        "parent": 12,
        "type": 2,
        "x": 39,
        "y": 46,
        "w": 74,
        "h": 82,
        "alpha": 0,
        "scaleX": 2.5,
        "scaleY": 2.5,
        "rotation": 0,
        "originX": 37,
        "originY": 41,
        "partListId": 3,
        "partId": 22,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 14,
        "parent": 12,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 186,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 15,
        "parent": 14,
        "type": 1001,
        "x": 90,
        "y": 144,
        "w": 30,
        "h": 30,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 15,
        "originY": 15
       },
       {
        "id": 16,
        "parent": 14,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 186,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 3,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 17,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 0,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 12,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 18,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 13,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 19,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 14,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 20,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 15,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 21,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 16,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 22,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 51,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 17,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 23,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 18,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 24,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 19,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 25,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 20,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 26,
        "parent": 14,
        "type": 2,
        "x": 45,
        "y": 52,
        "w": 60,
        "h": 74,
        "alpha": 255,
        "scaleX": 2.68,
        "scaleY": 2.68,
        "rotation": 0,
        "originX": 30,
        "originY": 37,
        "partListId": 3,
        "partId": 21,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 27,
        "parent": 1,
        "type": 1,
        "x": 0,
        "y": 72,
        "w": 160,
        "h": 30,
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
        "y": -23,
        "w": 75,
        "h": 64,
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
        "type": 1,
        "x": 3,
        "y": 0,
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
        "id": 30,
        "parent": 29,
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
        "id": 31,
        "parent": 29,
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
        "id": 32,
        "parent": 29,
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
        "id": 33,
        "parent": 28,
        "type": 1,
        "x": 6,
        "y": 32,
        "w": 68,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 34,
        "parent": 33,
        "type": 1003,
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
        "id": 35,
        "parent": 33,
        "type": 1003,
        "x": 18,
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
        "id": 36,
        "parent": 33,
        "type": 1003,
        "x": 36,
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
        "id": 37,
        "parent": 27,
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
        "id": 38,
        "parent": 37,
        "type": 1002,
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
       }
      ]
     }
    },
    "textures": {
     "JobHudSimple_StackA": {
      "path": "../public/icons/job-gauges/textures/JobHudSimple_StackA.png",
      "w": 128,
      "h": 128,
      "scale": 2
     },
     "JobHudSimple_StackB": {
      "path": "../public/icons/job-gauges/textures/JobHudSimple_StackB.png",
      "w": 128,
      "h": 128,
      "scale": 2
     },
     "JobHudWHM": {
      "path": "../public/icons/job-gauges/textures/JobHudWHM.png",
      "w": 488,
      "h": 936,
      "scale": 2
     },
     "Parameter_Gauge": {
      "path": "../public/icons/job-gauges/textures/Parameter_Gauge.png",
      "w": 320,
      "h": 304,
      "scale": 2
     }
    },
    "sizes": {
     "JobHudWHM0": [
      160,
      176
     ]
    }
   },
   "dmgUp": {},
   "upgrade": {
    "119": 25859,
    "121": 16532,
    "127": 25859,
    "132": 16532,
    "133": 37010,
    "139": 25860,
    "3568": 25859,
    "7431": 25859,
    "16533": 25859
   },
   "jobSet": 24,
   "buttonsAll": [
    120,
    124,
    125,
    131,
    135,
    136,
    137,
    140,
    3569,
    3570,
    3571,
    7430,
    7432,
    7433,
    16531,
    16532,
    16534,
    16535,
    16536,
    25859,
    25860,
    25861,
    25862,
    37008,
    37009,
    37010,
    37011
   ],
   "unplaced": [
    7432,
    37009,
    37011
   ],
   "replaceGroups": {},
   "splitDetected": []
  },
  "AST": {
   "job": {
    "abbr": "AST",
    "name": "占星術師",
    "icon": "../public/icons/jobs/AST.png",
    "level": 100,
    "role": "healer"
   },
   "actions": {
    "3594": {
     "id": 3594,
     "name": "ベネフィク",
     "desc": "対象のＨＰを回復する。　回復力：500\n追加効果（発動確率15％）：次に詠唱するベネフィラが必ずクリティカルヒットする。　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/20_AST/Benefic.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 2,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 400,
     "range": 30,
     "crit": true,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 500,
      "party": false
     },
     "replaces": []
    },
    "3595": {
     "id": 3595,
     "name": "アスペクト・ベネフィク",
     "desc": "対象のＨＰを回復する。　回復力：250\n追加効果：対象のＨＰを継続回復する。\n回復力：250　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/20_AST/Aspected_Benefic.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 34,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 250,
       "sec": 15
      },
      "heal": 250,
      "party": false
     },
     "replaces": []
    },
    "3600": {
     "id": 3600,
     "name": "ヘリオス",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：400",
     "icon": "../public/fankit/battle-pve/20_AST/Helios.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 10,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 700,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 400,
      "party": true
     },
     "replaces": []
    },
    "3603": {
     "id": 3603,
     "name": "アセンド",
     "desc": "対象を衰弱状態で蘇生する。",
     "icon": "../public/fankit/battle-pve/20_AST/Ascend.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 8000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 12,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 2400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3606": {
     "id": 3606,
     "name": "ライトスピード",
     "desc": "一定時間、魔法の詠唱時間を2.5秒短縮させて詠唱することができる。　効果時間：15秒\n最大チャージ数：2",
     "icon": "../public/fankit/battle-pve/20_AST/Lightspeed.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 90000,
     "cooldownGroup": 19,
     "maxCharges": 2,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 6,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3610": {
     "id": 3610,
     "name": "ベネフィラ",
     "desc": "対象のＨＰを回復する。　回復力：800",
     "icon": "../public/fankit/battle-pve/20_AST/Benefic_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 26,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": 12,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 700,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 800,
      "party": false
     },
     "replaces": []
    },
    "3612": {
     "id": 3612,
     "name": "シナストリー",
     "desc": "パーティメンバーひとりを対象とする。\n自身またはパーティメンバーに単体回復魔法を実行した場合に、シナストリーの対象となったパーティメンバーのＨＰを、その回復量の40％分回復する。　効果時間：20秒",
     "icon": "../public/fankit/battle-pve/20_AST/Synastry.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 20,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3613": {
     "id": 3613,
     "name": "運命の輪",
     "desc": "自身を中心に周囲8mを覆う運命の輪を生成する。\n効果時間：18秒\n実行時に自身と周囲30m以内にいるパーティメンバーに被ダメージを10％軽減する効果を付与する。　効果時間：10秒\nさらに、運命の輪の範囲内にいる自身とパーティメンバーに継続回復効果を付与する。　回復力：100　効果時間：15秒\n継続回復効果は運命の輪の範囲内にいる自身とパーティメンバーに対して繰り返し付与される。\n効果時間中にアクションの実行や移動・ターンを行うと、運命の輪は即座に消える。\n実行後にオートアタックを停止する。",
     "icon": "../public/fankit/battle-pve/20_AST/Collective_Unconscious.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 12,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 58,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3614": {
     "id": 3614,
     "name": "ディグニティ",
     "desc": "対象のＨＰを回復する。　回復力：400～900\n対象の残りＨＰが低いほど回復力が上昇し、30％以下だと最大になる。\n最大チャージ数：3",
     "icon": "../public/fankit/battle-pve/20_AST/Essential_Dignity.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 40000,
     "cooldownGroup": 11,
     "maxCharges": 1,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 15,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 400,
      "party": false
     },
     "replaces": []
    },
    "7439": {
     "id": 7439,
     "name": "アーサリースター",
     "desc": "指定した地面に「アーサリースター」を設置し、自身に「星の支配者」を付与する。　効果時間：10秒\n星の支配者の効果時間中に再使用すると「ステラバースト」を発動し、範囲内の敵に無属性魔法攻撃。　威力：205\n追加効果：範囲内の自身とパーティメンバーを回復する。\n回復力：540\n効果時間が経過するとアーサリースターが強化され、自身に「巨星の支配者」を付与する。　効果時間：10秒\n巨星の支配者の効果時間が経過するか、効果時間中に再使用すると「ステラエクスプロージョン」を発動し、範囲内の敵に無属性魔法攻撃。　威力：310\n追加効果：範囲内の自身とパーティメンバーを回復する。\n回復力：720",
     "icon": "../public/fankit/battle-pve/20_AST/Earthly_Star.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 13,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 62,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 20,
     "ground": true,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 205
     },
     "eff": {
      "grant": [
       {
        "status": "星の支配者",
        "sec": 10,
        "stacks": null,
        "combo": false
       },
       {
        "status": "巨星の支配者",
        "sec": 10,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "7444": {
     "id": 7444,
     "name": "クラウンロード",
     "desc": "自身の周囲の敵に無属性範囲魔法攻撃。　威力：400\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとマイナーアルカナがクラウンロードに変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/Lord_of_Crowns.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 7,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 70,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 400
     },
     "eff": null,
     "replaces": [
      37022
     ]
    },
    "7445": {
     "id": 7445,
     "name": "クラウンレディ",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：400\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとマイナーアルカナがクラウンレディに変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/Lady_of_Crowns.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 7,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 70,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 400,
      "party": true
     },
     "replaces": [
      37022
     ]
    },
    "7559": {
     "id": 7559,
     "name": "堅実魔",
     "desc": "一定時間、魔法詠唱を詠唱妨害されずに行うことができる。\nさらに、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒",
     "icon": "../public/fankit/battle-pve/20_AST/Role_Actions/Surecast.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 49,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 44,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7561": {
     "id": 7561,
     "name": "迅速魔",
     "desc": "一定時間、次の1回の魔法詠唱について、詠唱時間無しで詠唱することができる。　効果時間：10秒",
     "icon": "../public/fankit/battle-pve/20_AST/Role_Actions/Swiftcast.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 44,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 18,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7562": {
     "id": 7562,
     "name": "ルーシッドドリーム",
     "desc": "自身のＭＰを継続回復する。\n効果量：55　効果時間：21秒",
     "icon": "../public/fankit/battle-pve/20_AST/Role_Actions/Lucid_Dreaming.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 45,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 14,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7568": {
     "id": 7568,
     "name": "エスナ",
     "desc": "対象にかかった一部の弱体効果を1つ解除する。",
     "icon": "../public/fankit/battle-pve/20_AST/Role_Actions/Esuna.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 10,
     "forJob": true,
     "isRole": true,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 400,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7571": {
     "id": 7571,
     "name": "救出",
     "desc": "パーティメンバーひとりを対象とする。\n対象を自身の近くに引き寄せる。\n対象が一部の状態異常を受けている、もしくは非戦闘中の場合は効果無し。\n発動条件：自身が戦闘状態",
     "icon": "../public/fankit/battle-pve/20_AST/Role_Actions/Rescue.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 50,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 48,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 420
     },
     "eff": {
      "grant": [
       {
        "status": "ディセスティーム実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16552": {
     "id": 16552,
     "name": "ディヴィネーション",
     "desc": "自身と周囲のパーティメンバーの与ダメージを6％上昇させる。\n効果時間：20秒\n追加効果：自身に「オラクル実行可」を付与する。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/20_AST/Divination.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 21,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "オラクル実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16553": {
     "id": 16553,
     "name": "星天対抗",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：200\n追加効果：対象のＨＰを継続回復する。\n回復力：100　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/20_AST/Celestial_Opposition.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 14,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 60,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 100,
       "sec": 15
      },
      "heal": 200,
      "party": true
     },
     "replaces": []
    },
    "16554": {
     "id": 16554,
     "name": "コンバガ",
     "desc": "対象に無属性の継続ダメージを付与する。\n威力：70　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/20_AST/Combust_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 72,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 400,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 70,
      "dot": {
       "potency": 70,
       "sec": 30
      }
     },
     "eff": null,
     "replaces": []
    },
    "16556": {
     "id": 16556,
     "name": "星天交差",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象のＨＰを回復する。　回復力：200\n追加効果：対象に一定量のダメージを防ぐバリアを張る。\nこのバリアは回復量の200％分のダメージを軽減する。\n効果時間：30秒\n最大チャージ数：2",
     "icon": "../public/fankit/battle-pve/20_AST/Celestial_Intersection.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 10,
     "maxCharges": 1,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 74,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 200,
      "party": false
     },
     "replaces": []
    },
    "16557": {
     "id": 16557,
     "name": "ホロスコープ",
     "desc": "自身と周囲のパーティメンバーに「ホロスコープ」を付与する。\n効果時間：10秒\nホロスコープの効果時間中に、自身が実行するヘリオスおよびコンジャンクション・ヘリオスを受けると、ホロスコープは「ホロスコープ・ヘリオス」に変化する。　効果時間：30秒\nホロスコープおよびホロスコープ・ヘリオスの効果時間が経過するか、効果時間中に再使用すると、ホロスコープおよびホロスコープ・ヘリオスの効果を受けている自身と周囲のパーティメンバーを回復する。\nホロスコープ効果中の回復力：200\nホロスコープ・ヘリオス効果中の回復力：400",
     "icon": "../public/icons/actions/003550.png",
     "iconFramed": false,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 15,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 76,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "16559": {
     "id": 16559,
     "name": "ニュートラルセクト",
     "desc": "一定時間、自身の回復魔法の回復量を20％増加させる。\n効果時間：20秒\n追加効果：アスペクト・ベネフィクおよびコンジャンクション・ヘリオスの実行時に、対象に一定量のダメージを防ぐバリアを張る。\nアスペクト・ベネフィクの効果量：回復量の250％分\nコンジャンクション・ヘリオスの効果量：回復量の125％分\n効果時間：30秒\n追加効果：自身に「サンサイン実行可」を付与する。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/20_AST/Neutral_Sect.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 22,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 80,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "サンサイン実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16560": {
     "id": 16560,
     "name": "リポーズ",
     "desc": "対象に睡眠を付与する。　効果時間：30秒\n実行後にオートアタックを停止する。",
     "icon": "../public/fankit/battle-pve/20_AST/Role_Actions/Repose.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 8,
     "forJob": true,
     "isRole": true,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 600,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "requires": "暗黒"
     },
     "replaces": []
    },
    "25871": {
     "id": 25871,
     "name": "フォールマレフィク",
     "desc": "対象に無属性魔法攻撃。　威力：270",
     "icon": "../public/fankit/battle-pve/20_AST/Fall_Malefic.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 400,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 270
     },
     "eff": null,
     "replaces": []
    },
    "25872": {
     "id": 25872,
     "name": "グラビラ",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：140",
     "icon": "../public/fankit/battle-pve/20_AST/Gravity_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 400,
     "range": 25,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 140
     },
     "eff": null,
     "replaces": []
    },
    "25873": {
     "id": 25873,
     "name": "エクザルテーション",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象の被ダメージを10％軽減する。　効果時間：8秒\n効果時間終了時に対象のＨＰを回復する。　回復力：500",
     "icon": "../public/fankit/battle-pve/20_AST/Exaltation.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 16,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 86,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 500,
      "party": false
     },
     "replaces": []
    },
    "25874": {
     "id": 25874,
     "name": "マクロコスモス",
     "desc": "自身の周囲の敵に無属性範囲魔法攻撃。　威力：270\n2体目以降の対象への威力は40％減少する。\n追加効果：自身と周囲のパーティメンバーに「マクロコスモス」を付与する。　効果時間：15秒\n効果中に対象がダメージを受けるとそのダメージを蓄積する。\n効果時間が経過するか、効果時間中に「ミクロコスモス」を実行すると、対象のＨＰを回復する。\n回復量：回復力200＋蓄積されたダメージの50％分\nただし、回復量は対象の最大ＨＰを上限とする。\nこの魔法は固有のリキャストタイマーを持ち、装備やステータスなどによって変化しない。",
     "icon": "../public/fankit/battle-pve/20_AST/Macrocosmos.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 180000,
     "cooldownGroup": 23,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 600,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 270
     },
     "eff": null,
     "replaces": []
    },
    "25875": {
     "id": 25875,
     "name": "ミクロコスモス",
     "desc": "自身が付与した「マクロコスモス」の効果を終了させて対象のＨＰを回復する。\n回復量：回復力200＋蓄積されたダメージの50％分\nただし、回復量は対象の最大ＨＰを上限とする。",
     "icon": "../public/fankit/battle-pve/20_AST/Microcosmos.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 1,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37017": {
     "id": 37017,
     "name": "アストラルドロー",
     "desc": "「アーゼマの均衡」「オシュオンの矢」「ビエルゴの塔」「クラウンロード」のカードをドローする。\n「プレイI」がアーゼマの均衡に、「プレイII」がオシュオンの矢に、「プレイIII」がビエルゴの塔に、「マイナーアルカナ」がクラウンロードにそれぞれ変化する。\n追加効果：自身のＭＰを最大ＭＰの20％分回復する。\n実行後にこのアクションがアンブラルドローに変化する。\nリキャストタイマーを「アンブラルドロー」と共有する。",
     "icon": "../public/fankit/battle-pve/20_AST/Astral_Draw.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 55000,
     "cooldownGroup": 17,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37018": {
     "id": 37018,
     "name": "アンブラルドロー",
     "desc": "「ハルオーネの槍」「世界樹の幹」「サリャクの水瓶」「クラウンレディ」のカードをドローする。\n「プレイI」がハルオーネの槍に、「プレイII」が世界樹の幹に、「プレイIII」がサリャクの水瓶に、「マイナーアルカナ」がクラウンレディにそれぞれ変化する。\n追加効果：自身のＭＰを最大ＭＰの20％分回復する。\n実行後にこのアクションがアストラルドローに変化する。\nリキャストタイマーを「アストラルドロー」と共有する。\n\n※このアクションはホットバーに登録することはできない。\n　アストラルドローを実行するとアストラルドローがアンブラルドローに変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/Umbral_Draw.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 55000,
     "cooldownGroup": 17,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": [
      37017
     ]
    },
    "37019": {
     "id": 37019,
     "name": "プレイI",
     "desc": "「アストラルドロー」または「アンブラルドロー」を実行すると、このアクションが対応するカードアクションに変化する。\nアストラルドロー実行時：アーゼマの均衡\nアンブラルドロー実行時：ハルオーネの槍",
     "icon": "../public/fankit/battle-pve/20_AST/Play_I.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 2,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37020": {
     "id": 37020,
     "name": "プレイII",
     "desc": "「アストラルドロー」または「アンブラルドロー」を実行すると、このアクションが対応するカードアクションに変化する。\nアストラルドロー実行時：オシュオンの矢\nアンブラルドロー実行時：世界樹の幹",
     "icon": "../public/fankit/battle-pve/20_AST/Play_II.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 3,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37021": {
     "id": 37021,
     "name": "プレイIII",
     "desc": "「アストラルドロー」または「アンブラルドロー」を実行すると、このアクションが対応するカードアクションに変化する。\nアストラルドロー実行時：ビエルゴの塔\nアンブラルドロー実行時：サリャクの水瓶",
     "icon": "../public/fankit/battle-pve/20_AST/Play_III.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 4,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37022": {
     "id": 37022,
     "name": "マイナーアルカナ",
     "desc": "「アストラルドロー」または「アンブラルドロー」を実行すると、このアクションが対応するカードアクションに変化する。\nアストラルドロー実行時：クラウンロード\nアンブラルドロー実行時：クラウンレディ",
     "icon": "../public/fankit/battle-pve/20_AST/Minor_Arcana.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 7,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 70,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "37023": {
     "id": 37023,
     "name": "アーゼマの均衡",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象の与ダメージを上昇させる。　効果時間：15秒\n効果量は対象が近接攻撃を主体とするクラス・ジョブであれば6％、それ以外ならば3％になる。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとプレイIがアーゼマの均衡に変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/The_Balance.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 2,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": [
      37019
     ]
    },
    "37024": {
     "id": 37024,
     "name": "オシュオンの矢",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n一定時間、対象が受けるＨＰ回復効果を10％上昇させる。\n効果時間：15秒\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとプレイIIがオシュオンの矢に変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/The_Arrow.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 3,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": [
      37020
     ]
    },
    "37025": {
     "id": 37025,
     "name": "ビエルゴの塔",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n一定時間、対象に一定量のダメージを防ぐバリアを張る。\nこのバリアは回復力400相当のダメージを軽減する。\n効果時間：30秒\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとプレイIIIがビエルゴの塔に変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/The_Spire.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 4,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": [
      37021
     ]
    },
    "37026": {
     "id": 37026,
     "name": "ハルオーネの槍",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象の与ダメージを上昇させる。　効果時間：15秒\n効果量は対象が遠隔攻撃を主体とするクラス・ジョブであれば6％、それ以外ならば3％になる。\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとプレイIがハルオーネの槍に変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/The_Spear.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 2,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": [
      37019
     ]
    },
    "37027": {
     "id": 37027,
     "name": "世界樹の幹",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n一定時間、対象の被ダメージを10％軽減させる。\n効果時間：15秒\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとプレイIIが世界樹の幹に変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/The_Bole.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 3,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": [
      37020
     ]
    },
    "37028": {
     "id": 37028,
     "name": "サリャクの水瓶",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n一定時間、対象のＨＰを継続回復する。\n回復力：200　効果時間：15秒\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとプレイIIIがサリャクの水瓶に変化する。",
     "icon": "../public/fankit/battle-pve/20_AST/The_Ewer.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 4,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 200,
       "sec": 15
      }
     },
     "replaces": [
      37021
     ]
    },
    "37029": {
     "id": 37029,
     "name": "オラクル",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：860\n2体目以降の対象への威力は50％減少する。\n発動条件：「オラクル実行可」効果中",
     "icon": "../public/fankit/battle-pve/20_AST/Oracle.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 5,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 92,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": 184,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 860
     },
     "eff": {
      "requires": "オラクル実行可"
     },
     "replaces": []
    },
    "37030": {
     "id": 37030,
     "name": "コンジャンクション・ヘリオス",
     "desc": "自身と周囲のパーティメンバーのＨＰを回復する。\n回復力：250\n追加効果：対象のＨＰを継続回復する。\n回復力：175　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/20_AST/Helios_Conjunction.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 96,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 800,
     "range": 0,
     "crit": false,
     "effectRange": 20,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "hot": {
       "potency": 175,
       "sec": 15
      },
      "heal": 250,
      "party": true
     },
     "replaces": []
    },
    "37031": {
     "id": 37031,
     "name": "サンサイン",
     "desc": "一定時間、自身と周囲のパーティメンバーの被ダメージを10％軽減させる。　効果時間：15秒\n発動条件：「サンサイン実行可」効果中",
     "icon": "../public/fankit/battle-pve/20_AST/Sun_Sign.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 8,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 100,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": 185,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "requires": "サンサイン実行可"
     },
     "replaces": []
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
    "クルセードスタンス": "../public/icons/statuses/210402.png",
    "プロテス": "../public/icons/statuses/210405.png",
    "堅実魔": "../public/icons/statuses/210452.png",
    "迅速魔": "../public/icons/statuses/210454.png",
    "アイ・フォー・アイ": "../public/icons/statuses/213918.png",
    "シールドウォール": "../public/icons/statuses/216306.png",
    "ストロングホールド": "../public/icons/statuses/216306.png",
    "ラストバスティオン": "../public/icons/statuses/216306.png",
    "アーゼマの均衡": "../public/icons/statuses/213204.png",
    "世界樹の幹": "../public/icons/statuses/213205.png",
    "オシュオンの矢": "../public/icons/statuses/213206.png",
    "ハルオーネの槍": "../public/icons/statuses/213207.png",
    "サリャクの水瓶": "../public/icons/statuses/213208.png",
    "ビエルゴの塔": "../public/icons/statuses/213209.png",
    "アスペクト・ベネフィク": "../public/icons/statuses/213215.png",
    "アスペクト・ヘリオス": "../public/icons/statuses/213216.png",
    "ノクターナルフィールド": "../public/icons/statuses/213217.png",
    "コンバス": "../public/icons/statuses/213213.png",
    "ライトスピード": "../public/icons/statuses/213220.png",
    "コンバラ": "../public/icons/statuses/213214.png",
    "シナストリー": "../public/icons/statuses/213223.png",
    "シナストリー［被］": "../public/icons/statuses/213224.png",
    "運命の輪": "../public/icons/statuses/213227.png",
    "運命の輪：効果": "../public/icons/statuses/213226.png",
    "原初の大地": "../public/icons/statuses/216306.png",
    "ダークフォース": "../public/icons/statuses/216306.png",
    "ルーシッドドリーム": "../public/icons/statuses/213909.png",
    "慈愛": "../public/icons/statuses/213910.png",
    "ニュートラルセクト［日］": "../public/icons/statuses/213254.png",
    "略式詠唱": "../public/icons/statuses/214827.png",
    "クラウンロード": "../public/icons/statuses/214841.png",
    "クラウンレディ": "../public/icons/statuses/213244.png",
    "ディヴィネーション": "../public/icons/statuses/213245.png",
    "星天対抗": "../public/icons/statuses/213246.png",
    "星天対抗［夜］": "../public/icons/statuses/213247.png",
    "コンバガ": "../public/icons/statuses/213248.png",
    "星天交差［日］": "../public/icons/statuses/213249.png",
    "星天交差": "../public/icons/statuses/213250.png",
    "ホロスコープ": "../public/icons/statuses/213251.png",
    "ホロスコープ・ヘリオス": "../public/icons/statuses/213252.png",
    "ニュートラルセクト": "../public/icons/statuses/213253.png",
    "スリーヴドロー": {
     "icon": "../public/icons/statuses/219561.png",
     "max": 2,
     "base": 219561
    },
    "ソウルガンメタル": "../public/icons/statuses/216306.png",
    "調和": "../public/icons/statuses/214816.png",
    "ニュートラルセクト［夜］": "../public/icons/statuses/213255.png",
    "星天対抗［日］": "../public/icons/statuses/213246.png",
    "不動宮：効果": "../public/icons/statuses/213226.png",
    "不動宮": "../public/icons/statuses/213225.png",
    "リドロー実行可": "../public/icons/statuses/213258.png",
    "魂魄の座": "../public/icons/statuses/213259.png",
    "身体の座": "../public/icons/statuses/213260.png",
    "精神の座": "../public/icons/statuses/213261.png",
    "エクザルテーション": "../public/icons/statuses/213262.png",
    "マクロコスモス": "../public/icons/statuses/213263.png",
    "アスペクト・ベネフィク［日］": "../public/icons/statuses/213254.png",
    "アスペクト・ベネフィク［夜］": "../public/icons/statuses/213255.png",
    "ドロー：アーゼマの均衡": "../public/icons/statuses/213229.png",
    "ドロー：サリャクの水瓶": "../public/icons/statuses/213233.png",
    "ドロー：ビエルゴの塔": "../public/icons/statuses/213234.png",
    "星河一天": {
     "icon": "../public/icons/statuses/218327.png",
     "max": 3,
     "base": 218327
    },
    "星河一天［害］": {
     "icon": "../public/icons/statuses/218351.png",
     "max": 3,
     "base": 218351
    },
    "ドロー：世界樹の幹": "../public/icons/statuses/213230.png",
    "ドロー：オシュオンの矢": "../public/icons/statuses/213231.png",
    "オラクル実行可": "../public/icons/statuses/213264.png",
    "コンジャンクション・ヘリオス": "../public/icons/statuses/213265.png",
    "サンサイン実行可": "../public/icons/statuses/213266.png",
    "サンサイン": "../public/icons/statuses/213267.png",
    "エピサイクル": "../public/icons/statuses/214741.png",
    "レトログレード実行可": "../public/icons/statuses/214742.png",
    "ストンラスキン": "../public/icons/statuses/214749.png",
    "ディアブロシス": "../public/icons/statuses/214750.png",
    "ランパート": "../public/icons/statuses/210152.png",
    "ファイト・オア・フライト": "../public/icons/statuses/210155.png",
    "アイアンウィル": "../public/icons/statuses/212506.png",
    "ホークアイ": "../public/icons/statuses/210351.png",
    "猛者の撃": "../public/icons/statuses/210354.png",
    "乱れ撃ち": "../public/icons/statuses/210356.png",
    "賢人のバラード": "../public/icons/statuses/212603.png",
    "軍神のパイオン": "../public/icons/statuses/212605.png",
    "バトルボイス": "../public/icons/statuses/212601.png",
    "ケアルラ効果アップ": "../public/icons/statuses/210410.png",
    "神速魔": "../public/icons/statuses/212627.png",
    "ファイガ効果アップ": "../public/icons/statuses/210460.png",
    "マバリア": "../public/icons/statuses/210456.png",
    "サークル・オブ・ドゥーム": "../public/icons/statuses/210158.png",
    "黒魔紋": "../public/icons/statuses/212653.png",
    "旅神のメヌエット": "../public/icons/statuses/212610.png",
    "コースティックバイト": "../public/icons/statuses/212616.png",
    "ストームバイト": "../public/icons/statuses/212617.png",
    "地神のミンネ": "../public/icons/statuses/212618.png",
    "三連魔": {
     "icon": "../public/icons/statuses/219621.png",
     "max": 3,
     "base": 219621
    },
    "シンエアー": "../public/icons/statuses/212631.png",
    "インドゥルゲンティア": "../public/icons/statuses/212637.png",
    "星の支配者": "../public/icons/statuses/213241.png",
    "彼岸花": "../public/icons/statuses/213304.png",
    "明鏡止水": {
     "icon": "../public/icons/statuses/219641.png",
     "max": 3,
     "base": 219641
    },
    "燕飛効果アップ": "../public/icons/statuses/213310.png",
    "巨星の支配者": "../public/icons/statuses/213242.png",
    "トゥルーノース": "../public/icons/statuses/213903.png",
    "風月": "../public/icons/statuses/213311.png",
    "風花": "../public/icons/statuses/213312.png",
    "残心実行可": "../public/icons/statuses/213318.png",
    "レクイエスカット": {
     "icon": "../public/icons/statuses/218345.png",
     "max": 4,
     "base": 218345
    },
    "ディア": "../public/icons/statuses/212635.png",
    "テンパランス": "../public/icons/statuses/212634.png",
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "トルバドゥール": "../public/icons/statuses/212615.png",
    "神聖魔法効果アップ": "../public/icons/statuses/212521.png",
    "ブラストアロー実行可": "../public/icons/statuses/212621.png",
    "リタージー・オブ・ベル": {
     "icon": "../public/icons/statuses/218373.png",
     "max": 5,
     "base": 218373
    },
    "光神のフィナーレ": "../public/icons/statuses/212622.png",
    "奥義波切実行可": "../public/icons/statuses/213313.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png",
    "燕返し実行可": "../public/icons/statuses/213315.png",
    "天道": "../public/icons/statuses/213319.png",
    "レゾナンスアロー実行可": "../public/icons/statuses/213076.png",
    "光神のアンコール実行可": "../public/icons/statuses/213077.png",
    "サンダー系魔法実行可": "../public/icons/statuses/212660.png",
    "ハイサンダー": "../public/icons/statuses/212661.png",
    "グレアジャ実行可": {
     "icon": "../public/icons/statuses/218669.png",
     "max": 3,
     "base": 218669
    },
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png"
   },
   "bars": {
    "hb1": {
     "job": [
      {
       "kind": "macro",
       "no": 41
      },
      {
       "kind": "macro",
       "no": 38
      },
      {
       "kind": "action",
       "id": 37030,
       "from": 3601
      },
      {
       "kind": "macro",
       "no": 29
      },
      {
       "kind": "action",
       "id": 3600
      },
      null,
      {
       "kind": "action",
       "id": 16559
      },
      {
       "kind": "action",
       "id": 7562
      },
      null,
      {
       "kind": "action",
       "id": 37017
      },
      {
       "kind": "action",
       "id": 25871,
       "from": 3596
      },
      {
       "kind": "action",
       "id": 25874
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb2": {
     "job": [
      {
       "kind": "action",
       "id": 16554,
       "from": 3599
      },
      {
       "kind": "action",
       "id": 25872,
       "from": 3615
      },
      {
       "kind": "action",
       "id": 16553
      },
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 7559
      },
      null,
      null,
      {
       "kind": "macro",
       "no": 44
      },
      {
       "kind": "macro",
       "no": 39
      },
      null
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb3": {
     "job": [
      {
       "kind": "action",
       "id": 3606
      },
      {
       "kind": "macro",
       "no": 28
      },
      {
       "kind": "macro",
       "no": 40
      },
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 16552
      },
      {
       "kind": "action",
       "id": 3613
      },
      {
       "kind": "action",
       "id": 7439
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
       "kind": "macro",
       "no": 43
      },
      {
       "kind": "action",
       "id": 7561
      },
      {
       "kind": "action",
       "id": 7571
      },
      {
       "kind": "action",
       "id": 16557
      },
      {
       "kind": "macro",
       "no": 10
      },
      null,
      {
       "kind": "macro",
       "no": 70
      },
      {
       "kind": "macro",
       "no": 71
      },
      {
       "kind": "action",
       "id": 37022
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
     "job": [
      null,
      {
       "kind": "action",
       "id": 16552
      },
      {
       "kind": "action",
       "id": 16552
      },
      {
       "kind": "action",
       "id": 16552
      },
      {
       "kind": "action",
       "id": 7439
      },
      {
       "kind": "action",
       "id": 7439
      },
      {
       "kind": "action",
       "id": 7439
      },
      null,
      null,
      null,
      null,
      null
     ],
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
     "defaultSource": "job"
    },
    "hb6": {
     "job": null,
     "shared": [
      null,
      null,
      null,
      null,
      {
       "kind": "macro",
       "no": 346
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
       "kind": "other",
       "type": 2
      },
      null
     ],
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
       "kind": "macro",
       "no": 259
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
     "defaultSource": "job"
    },
    "hb8": {
     "job": null,
     "shared": [
      {
       "kind": "macro",
       "no": 296
      },
      {
       "kind": "macro",
       "no": 297
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
       "kind": "macro",
       "no": 307
      },
      {
       "kind": "other",
       "type": 4
      },
      {
       "kind": "macro",
       "no": 259
      },
      {
       "kind": "macro",
       "no": 309
      },
      {
       "kind": "macro",
       "no": 310
      },
      {
       "kind": "macro",
       "no": 298
      },
      {
       "kind": "macro",
       "no": 299
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
       "kind": "macro",
       "no": 258
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
       "kind": "macro",
       "no": 257
      },
      {
       "kind": "macro",
       "no": 256
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
       "id": 7562
      },
      {
       "kind": "action",
       "id": 3610
      },
      {
       "kind": "action",
       "id": 3614
      },
      {
       "kind": "action",
       "id": 7561
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
       "id": 7568
      },
      {
       "kind": "action",
       "id": 3603
      },
      {
       "kind": "action",
       "id": 16560
      },
      {
       "kind": "action",
       "id": 3600
      },
      {
       "kind": "action",
       "id": 16554,
       "from": 3599
      },
      {
       "kind": "action",
       "id": 3606
      },
      {
       "kind": "action",
       "id": 25871,
       "from": 3596
      },
      {
       "kind": "action",
       "id": 3594
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
       "kind": "action",
       "id": 3613
      },
      {
       "kind": "action",
       "id": 16553
      },
      {
       "kind": "missing",
       "id": 3605
      },
      {
       "kind": "action",
       "id": 3612
      },
      {
       "kind": "missing",
       "id": 7443
      },
      {
       "kind": "action",
       "id": 16552
      },
      {
       "kind": "action",
       "id": 7571
      },
      {
       "kind": "action",
       "id": 25872,
       "from": 3615
      },
      {
       "kind": "missing",
       "id": 3593
      },
      {
       "kind": "action",
       "id": 7559
      },
      {
       "kind": "action",
       "id": 3595
      },
      {
       "kind": "action",
       "id": 37030,
       "from": 3601
      },
      {
       "kind": "missing",
       "id": 17055
      },
      {
       "kind": "missing",
       "id": 3604
      },
      {
       "kind": "missing",
       "id": 3590
      },
      {
       "kind": "missing",
       "id": 9629
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
      {
       "kind": "action",
       "id": 25874
      },
      null,
      {
       "kind": "action",
       "id": 16559
      },
      {
       "kind": "action",
       "id": 25873
      },
      {
       "kind": "missing",
       "id": 7448
      },
      {
       "kind": "action",
       "id": 16557
      },
      {
       "kind": "action",
       "id": 7439
      },
      {
       "kind": "action",
       "id": 16556
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
   "gauges": {
    "JobHudAST0": {
     "index": 370,
     "name": "アルカナゲージ",
     "x": 38.020835876464844,
     "y": 46.08796310424805,
     "scale": 0.800000011920929,
     "anchor": 4,
     "w": 230,
     "h": 156
    }
   },
   "gauge": {
    "names": [
     "JobHudAST0"
    ],
    "layouts": {
     "JobHudAST0": {
      "partLists": [
       {
        "id": 1,
        "parts": [
         {
          "texture": "JobHudAST0",
          "u": 368,
          "v": 2,
          "w": 64,
          "h": 88
         },
         {
          "texture": "JobHudAST0",
          "u": 309,
          "v": 1,
          "w": 58,
          "h": 78
         },
         {
          "texture": "JobHudAST0",
          "u": 249,
          "v": 1,
          "w": 58,
          "h": 78
         },
         {
          "texture": "JobHudAST0",
          "u": 0,
          "v": 124,
          "w": 152,
          "h": 120
         },
         {
          "texture": "JobHudAST0",
          "u": 1,
          "v": 391,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudAST0",
          "u": 71,
          "v": 391,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudAST0",
          "u": 262,
          "v": 235,
          "w": 38,
          "h": 38
         },
         {
          "texture": "JobHudAST0",
          "u": 302,
          "v": 235,
          "w": 38,
          "h": 38
         },
         {
          "texture": "JobHudAST0",
          "u": 342,
          "v": 235,
          "w": 38,
          "h": 38
         },
         {
          "texture": "JobHudAST0",
          "u": 423,
          "v": 92,
          "w": 24,
          "h": 24
         },
         {
          "texture": "JobHudAST0",
          "u": 449,
          "v": 92,
          "w": 24,
          "h": 24
         },
         {
          "texture": "JobHudAST0",
          "u": 475,
          "v": 92,
          "w": 24,
          "h": 24
         },
         {
          "texture": "JobHudAST0",
          "u": 144,
          "v": 281,
          "w": 168,
          "h": 78
         },
         {
          "texture": "JobHudAST0",
          "u": 249,
          "v": 84,
          "w": 76,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 382,
          "v": 235,
          "w": 38,
          "h": 38
         },
         {
          "texture": "JobHudAST0",
          "u": 152,
          "v": 124,
          "w": 108,
          "h": 42
         },
         {
          "texture": "JobHudAST0",
          "u": 152,
          "v": 166,
          "w": 108,
          "h": 42
         },
         {
          "texture": "JobHudAST0",
          "u": 185,
          "v": 362,
          "w": 36,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 225,
          "v": 362,
          "w": 36,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 265,
          "v": 362,
          "w": 36,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 0,
          "v": 244,
          "w": 40,
          "h": 18
         },
         {
          "texture": "JobHudAST0",
          "u": 40,
          "v": 244,
          "w": 40,
          "h": 18
         },
         {
          "texture": "JobHudAST0",
          "u": 152,
          "v": 232,
          "w": 48,
          "h": 48
         },
         {
          "texture": "JobHudAST0",
          "u": 200,
          "v": 232,
          "w": 48,
          "h": 48
         },
         {
          "texture": "JobHudAST0",
          "u": 80,
          "v": 244,
          "w": 72,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 201,
          "v": 401,
          "w": 36,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 239,
          "v": 401,
          "w": 36,
          "h": 36
         },
         {
          "texture": "JobHudAST0",
          "u": 1,
          "v": 460,
          "w": 146,
          "h": 126
         },
         {
          "texture": "JobHudAST0",
          "u": 146,
          "v": 460,
          "w": 102,
          "h": 126
         }
        ]
       },
       {
        "id": 2,
        "parts": [
         {
          "texture": "JobHudAST0",
          "u": 1,
          "v": 1,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 63,
          "v": 1,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 125,
          "v": 1,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 187,
          "v": 1,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 1,
          "v": 63,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 63,
          "v": 63,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 125,
          "v": 63,
          "w": 60,
          "h": 60
         },
         {
          "texture": "JobHudAST0",
          "u": 187,
          "v": 63,
          "w": 60,
          "h": 60
         }
        ]
       },
       {
        "id": 3,
        "parts": [
         {
          "texture": "JobHudAST0",
          "u": 422,
          "v": 235,
          "w": 38,
          "h": 38
         },
         {
          "texture": "JobHudAST0",
          "u": 314,
          "v": 281,
          "w": 176,
          "h": 176
         },
         {
          "texture": "JobHudAST0",
          "u": 327,
          "v": 92,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudAST0",
          "u": 358,
          "v": 91,
          "w": 26,
          "h": 30
         },
         {
          "texture": "JobHudAST0",
          "u": 391,
          "v": 96,
          "w": 20,
          "h": 20
         },
         {
          "texture": "JobHudAST0",
          "u": 435,
          "v": 1,
          "w": 64,
          "h": 90
         },
         {
          "texture": "JobHudAST0",
          "u": 0,
          "v": 280,
          "w": 110,
          "h": 110
         },
         {
          "texture": "JobHudAST0",
          "u": 261,
          "v": 124,
          "w": 110,
          "h": 110
         },
         {
          "texture": "JobHudAST0",
          "u": 371,
          "v": 124,
          "w": 110,
          "h": 110
         },
         {
          "texture": "JobHudAST0",
          "u": 110,
          "v": 280,
          "w": 33,
          "h": 29
         },
         {
          "texture": "JobHudAST0",
          "u": 110,
          "v": 309,
          "w": 33,
          "h": 70
         },
         {
          "texture": "JobHudAST0",
          "u": 1,
          "v": 391,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudAST0",
          "u": 71,
          "v": 391,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudAST0",
          "u": 141,
          "v": 401,
          "w": 58,
          "h": 58
         },
         {
          "texture": "JobHudAST0",
          "u": 144,
          "v": 360,
          "w": 38,
          "h": 38
         },
         {
          "texture": "JobHudAST0",
          "u": 417,
          "v": 118,
          "w": 82,
          "h": 5
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
          "w": 68,
          "h": 106,
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
          "x": -34,
          "y": 78,
          "w": 136,
          "h": 18,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 3,
          "parent": 1,
          "type": 1,
          "x": 4,
          "y": -10,
          "w": 60,
          "h": 70,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 30,
          "originY": 34,
          "add": [
           200,
           200,
           200
          ]
         },
         {
          "id": 4,
          "parent": 3,
          "type": 2,
          "x": 0,
          "y": 10,
          "w": 60,
          "h": 60,
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
         },
         {
          "id": 5,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 68,
          "h": 80,
          "alpha": 182,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 6,
          "parent": 5,
          "type": 4,
          "x": 5,
          "y": 0,
          "w": 59,
          "h": 80,
          "alpha": 204,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 23,
          "nineGrid": [
           20,
           20,
           20,
           20
          ]
         },
         {
          "id": 7,
          "parent": 1,
          "type": 4,
          "x": -25,
          "y": 68,
          "w": 120,
          "h": 36,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 13,
          "nineGrid": [
           0,
           0,
           36,
           36
          ]
         },
         {
          "id": 8,
          "parent": 1,
          "type": 1002,
          "x": 19,
          "y": 32,
          "w": 30,
          "h": 30,
          "alpha": 255,
          "scaleX": 0.7,
          "scaleY": 0.7,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           40,
           40,
           40
          ],
          "add": [
           50,
           30,
           -50
          ]
         },
         {
          "id": 9,
          "parent": 1,
          "type": 1004,
          "x": 22,
          "y": 37,
          "w": 30,
          "h": 30,
          "alpha": 255,
          "scaleX": 0.7,
          "scaleY": 0.7,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           30,
           50,
           -100
          ]
         },
         {
          "id": 10,
          "parent": 1,
          "type": 1004,
          "x": 14,
          "y": 26,
          "w": 30,
          "h": 30,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           0,
           0,
           130
          ]
         },
         {
          "id": 11,
          "parent": 1,
          "type": 1006,
          "x": 12,
          "y": 38,
          "w": 30,
          "h": 30,
          "alpha": 255,
          "scaleX": 0.8,
          "scaleY": 0.8,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           80,
           80,
           80
          ],
          "add": [
           0,
           -50,
           50
          ]
         },
         {
          "id": 12,
          "parent": 1,
          "type": 1006,
          "x": 23,
          "y": 25,
          "w": 30,
          "h": 30,
          "alpha": 255,
          "scaleX": 0.6,
          "scaleY": 0.6,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           0,
           -100,
           50
          ]
         },
         {
          "id": 13,
          "parent": 1,
          "type": 2,
          "x": 2,
          "y": -6,
          "w": 64,
          "h": 90,
          "alpha": 61,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 32,
          "originY": 45,
          "multiply": [
           30,
           30,
           30
          ],
          "add": [
           20,
           -150,
           -200
          ],
          "partListId": 3,
          "partId": 5,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 14,
          "parent": 1,
          "type": 2,
          "x": 2,
          "y": -4,
          "w": 64,
          "h": 88,
          "alpha": 0,
          "scaleX": 0,
          "scaleY": 1,
          "rotation": 0,
          "originX": 32,
          "originY": 44,
          "add": [
           50,
           50,
           50
          ],
          "partListId": 1,
          "partId": 0,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 15,
          "parent": 1,
          "type": 2,
          "x": -21,
          "y": -14,
          "w": 110,
          "h": 110,
          "alpha": 0,
          "scaleX": 0.5,
          "scaleY": 0.5,
          "rotation": 0,
          "originX": 55,
          "originY": 55,
          "add": [
           200,
           0,
           -50
          ],
          "partListId": 3,
          "partId": 8,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 16,
          "parent": 1,
          "type": 2,
          "x": -21,
          "y": -14,
          "w": 110,
          "h": 110,
          "alpha": 0,
          "scaleX": 0.3,
          "scaleY": 0.3,
          "rotation": -40,
          "originX": 55,
          "originY": 55,
          "add": [
           -50,
           -50,
           200
          ],
          "partListId": 3,
          "partId": 7,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 17,
          "parent": 1,
          "type": 2,
          "x": 15,
          "y": 22,
          "w": 38,
          "h": 38,
          "alpha": 0,
          "scaleX": 0.4,
          "scaleY": 0.4,
          "rotation": 0,
          "originX": 19,
          "originY": 19,
          "add": [
           20,
           -20,
           -100
          ],
          "partListId": 3,
          "partId": 0,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 18,
          "parent": 1,
          "type": 8,
          "x": 0,
          "y": 0,
          "w": 68,
          "h": 78,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         }
        ]
       },
       {
        "id": 1002,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 1,
          "y": 1,
          "w": 28,
          "h": 28,
          "alpha": 255,
          "scaleX": 0.75,
          "scaleY": 0.75,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "partListId": 3,
          "partId": 2,
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 1,
          "y": 1,
          "w": 28,
          "h": 28,
          "alpha": 255,
          "scaleX": 0.75,
          "scaleY": 0.75,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "partListId": 3,
          "partId": 2,
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 2,
          "y": 0,
          "w": 26,
          "h": 30,
          "alpha": 255,
          "scaleX": 0.75,
          "scaleY": 0.75,
          "rotation": 0,
          "originX": 13,
          "originY": 15,
          "partListId": 3,
          "partId": 3,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1005,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 2,
          "y": 0,
          "w": 26,
          "h": 30,
          "alpha": 255,
          "scaleX": 0.75,
          "scaleY": 0.75,
          "rotation": 0,
          "originX": 13,
          "originY": 15,
          "partListId": 3,
          "partId": 3,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1006,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 5,
          "y": 5,
          "w": 20,
          "h": 20,
          "alpha": 255,
          "scaleX": 0.75,
          "scaleY": 0.75,
          "rotation": 0,
          "originX": 10,
          "originY": 10,
          "partListId": 3,
          "partId": 4,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1007,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
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
          "id": 2,
          "parent": 1,
          "type": 2,
          "x": 5,
          "y": 5,
          "w": 20,
          "h": 20,
          "alpha": 255,
          "scaleX": 0.75,
          "scaleY": 0.75,
          "rotation": 0,
          "originX": 10,
          "originY": 10,
          "partListId": 3,
          "partId": 4,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1008,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 33,
          "h": 100,
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
          "y": 1,
          "w": 33,
          "h": 70,
          "alpha": 76,
          "scaleX": 1.3666667,
          "scaleY": 1.5333333,
          "rotation": 0,
          "originX": 15,
          "originY": 70,
          "multiply": [
           10,
           10,
           10
          ],
          "add": [
           0,
           -80,
           -250
          ],
          "partListId": 3,
          "partId": 10,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": 20,
          "y": 20,
          "w": 33,
          "h": 70,
          "alpha": 69,
          "scaleX": 1.3666667,
          "scaleY": 1.5333333,
          "rotation": 0,
          "originX": 15,
          "originY": 70,
          "multiply": [
           10,
           10,
           10
          ],
          "add": [
           0,
           -80,
           -250
          ],
          "partListId": 3,
          "partId": 10,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": -20,
          "y": 6,
          "w": 33,
          "h": 70,
          "alpha": 34,
          "scaleX": 1.3933333,
          "scaleY": 1.6266667,
          "rotation": 0,
          "originX": 15,
          "originY": 70,
          "multiply": [
           10,
           10,
           10
          ],
          "add": [
           0,
           -80,
           -250
          ],
          "partListId": 3,
          "partId": 10,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 70,
          "w": 33,
          "h": 29,
          "alpha": 51,
          "scaleX": 2,
          "scaleY": 3,
          "rotation": 0,
          "originX": 15,
          "originY": 29,
          "multiply": [
           30,
           30,
           30
          ],
          "add": [
           100,
           -50,
           -90
          ],
          "partListId": 3,
          "partId": 9,
          "nineGrid": [
           0,
           0,
           10,
           10
          ]
         },
         {
          "id": 6,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 70,
          "w": 33,
          "h": 29,
          "alpha": 76,
          "scaleX": 2,
          "scaleY": 3,
          "rotation": 0,
          "originX": 15,
          "originY": 29,
          "multiply": [
           30,
           30,
           30
          ],
          "add": [
           100,
           -50,
           -90
          ],
          "partListId": 3,
          "partId": 9,
          "nineGrid": [
           0,
           0,
           10,
           10
          ]
         }
        ]
       },
       {
        "id": 1009,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 120,
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
          "x": 0,
          "y": 1,
          "w": 33,
          "h": 70,
          "alpha": 76,
          "scaleX": 1.3666667,
          "scaleY": 1.5333333,
          "rotation": 0,
          "originX": 15,
          "originY": 70,
          "partListId": 3,
          "partId": 10,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": 20,
          "y": 36,
          "w": 33,
          "h": 70,
          "alpha": 19,
          "scaleX": 1.3133333,
          "scaleY": 1.3466666,
          "rotation": 0,
          "originX": 15,
          "originY": 70,
          "partListId": 3,
          "partId": 10,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": -20,
          "y": 26,
          "w": 33,
          "h": 70,
          "alpha": 17,
          "scaleX": 1.3133333,
          "scaleY": 1.3466666,
          "rotation": 0,
          "originX": 15,
          "originY": 70,
          "partListId": 3,
          "partId": 10,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 70,
          "w": 33,
          "h": 29,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 3,
          "rotation": 0,
          "originX": 15,
          "originY": 29,
          "partListId": 3,
          "partId": 9,
          "nineGrid": [
           0,
           0,
           10,
           10
          ]
         },
         {
          "id": 6,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 70,
          "w": 33,
          "h": 29,
          "alpha": 54,
          "scaleX": 1.4285715,
          "scaleY": 3.2857144,
          "rotation": 0,
          "originX": 15,
          "originY": 29,
          "partListId": 3,
          "partId": 9,
          "nineGrid": [
           0,
           0,
           10,
           10
          ]
         }
        ]
       },
       {
        "id": 1010,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 36,
          "h": 36,
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
          "x": 6,
          "y": 0,
          "w": 36,
          "h": 36,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 18,
          "originY": 18
         },
         {
          "id": 3,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 36,
          "h": 36,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 17,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 1005,
          "x": -15,
          "y": -5,
          "w": 30,
          "h": 30,
          "alpha": 20,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           150,
           -50,
           -20
          ]
         },
         {
          "id": 5,
          "parent": 1,
          "type": 1007,
          "x": 11,
          "y": -17,
          "w": 30,
          "h": 30,
          "alpha": 12,
          "scaleX": 0.8,
          "scaleY": 0.8,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           80,
           80,
           80
          ],
          "add": [
           150,
           -100,
           -100
          ]
         },
         {
          "id": 6,
          "parent": 1,
          "type": 1007,
          "x": -2,
          "y": -9,
          "w": 30,
          "h": 30,
          "alpha": 45,
          "scaleX": 0.6,
          "scaleY": 0.6,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           150,
           -150,
           -100
          ]
         },
         {
          "id": 7,
          "parent": 1,
          "type": 2,
          "x": -37,
          "y": -37,
          "w": 110,
          "h": 110,
          "alpha": 0,
          "scaleX": 0.25,
          "scaleY": 0.25,
          "rotation": 0,
          "originX": 55,
          "originY": 55,
          "add": [
           200,
           0,
           -50
          ],
          "partListId": 3,
          "partId": 8,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 8,
          "parent": 1,
          "type": 2,
          "x": -37,
          "y": -37,
          "w": 110,
          "h": 110,
          "alpha": 0,
          "scaleX": 0,
          "scaleY": 0,
          "rotation": -40,
          "originX": 55,
          "originY": 55,
          "add": [
           -50,
           -50,
           200
          ],
          "partListId": 3,
          "partId": 7,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1011,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 68,
          "h": 82,
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
          "type": 1013,
          "x": -26,
          "y": 32,
          "w": 120,
          "h": 36,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 3,
          "parent": 1,
          "type": 1,
          "x": 4,
          "y": -9,
          "w": 60,
          "h": 60,
          "alpha": 0,
          "scaleX": 0.7,
          "scaleY": 0.7,
          "rotation": 0,
          "originX": 30,
          "originY": 34
         },
         {
          "id": 4,
          "parent": 3,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 60,
          "h": 60,
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
         },
         {
          "id": 5,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": -18,
          "w": 68,
          "h": 82,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 34,
          "originY": 41
         },
         {
          "id": 6,
          "parent": 5,
          "type": 4,
          "x": 16,
          "y": 16,
          "w": 36,
          "h": 48,
          "alpha": 204,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 25,
          "nineGrid": [
           10,
           10,
           10,
           10
          ]
         },
         {
          "id": 7,
          "parent": 1,
          "type": 8,
          "x": 0,
          "y": 0,
          "w": 68,
          "h": 82,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         }
        ]
       },
       {
        "id": 1012,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 36,
          "h": 36,
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
          "x": 6,
          "y": 0,
          "w": 36,
          "h": 36,
          "alpha": 0,
          "scaleX": 0.6,
          "scaleY": 0.6,
          "rotation": 0,
          "originX": 18,
          "originY": 18
         },
         {
          "id": 3,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 36,
          "h": 36,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 18,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1013,
        "type": 19,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 120,
          "h": 36,
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
          "x": 10,
          "y": 10,
          "w": 100,
          "h": 18,
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
          "w": 120,
          "h": 36,
          "alpha": 191,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 13,
          "nineGrid": [
           0,
           0,
           36,
           36
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
        "w": 230,
        "h": 156,
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
        "x": 10,
        "y": 10,
        "w": 152,
        "h": 136,
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
        "type": 2,
        "x": -35,
        "y": -30,
        "w": 280,
        "h": 200,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "add": [
         255,
         255,
         255
        ],
        "partListId": 0,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 4,
        "parent": 2,
        "type": 1002,
        "x": 100,
        "y": -1,
        "w": 30,
        "h": 30,
        "alpha": 42,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 15,
        "originY": 15
       },
       {
        "id": 5,
        "parent": 2,
        "type": 1004,
        "x": 68,
        "y": 8,
        "w": 30,
        "h": 30,
        "alpha": 95,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 15,
        "originY": 15
       },
       {
        "id": 6,
        "parent": 2,
        "type": 1001,
        "x": 6,
        "y": 31,
        "w": 68,
        "h": 106,
        "alpha": 255,
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rotation": 0,
        "originX": 34,
        "originY": 52
       },
       {
        "id": 7,
        "parent": 2,
        "type": 1001,
        "x": 42,
        "y": 17,
        "w": 68,
        "h": 106,
        "alpha": 255,
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rotation": 0,
        "originX": 34,
        "originY": 52
       },
       {
        "id": 8,
        "parent": 2,
        "type": 1001,
        "x": 78,
        "y": 31,
        "w": 68,
        "h": 106,
        "alpha": 255,
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rotation": 0,
        "originX": 34,
        "originY": 52
       },
       {
        "id": 9,
        "parent": 2,
        "type": 1001,
        "x": 127,
        "y": 24,
        "w": 68,
        "h": 106,
        "alpha": 255,
        "scaleX": 0.65,
        "scaleY": 0.65,
        "rotation": 0,
        "originX": 34,
        "originY": 53
       },
       {
        "id": 10,
        "parent": 2,
        "type": 2,
        "x": 8,
        "y": 30,
        "w": 64,
        "h": 88,
        "alpha": 127,
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rotation": 0,
        "originX": 32,
        "originY": 44,
        "partListId": 1,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 11,
        "parent": 2,
        "type": 2,
        "x": 44,
        "y": 16,
        "w": 64,
        "h": 88,
        "alpha": 127,
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rotation": 0,
        "originX": 32,
        "originY": 44,
        "partListId": 1,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 12,
        "parent": 2,
        "type": 2,
        "x": 80,
        "y": 30,
        "w": 64,
        "h": 88,
        "alpha": 127,
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rotation": 0,
        "originX": 32,
        "originY": 44,
        "partListId": 1,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 13,
        "parent": 2,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 126,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 14,
        "parent": 13,
        "type": 2,
        "x": 132,
        "y": 32,
        "w": 58,
        "h": 78,
        "alpha": 127,
        "scaleX": 0.85,
        "scaleY": 0.85,
        "rotation": 0,
        "originX": 29,
        "originY": 39,
        "partListId": 1,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 15,
        "parent": 13,
        "type": 2,
        "x": 120,
        "y": 0,
        "w": 102,
        "h": 126,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 28,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 16,
        "parent": 13,
        "type": 2,
        "x": 1,
        "y": 0,
        "w": 146,
        "h": 126,
        "alpha": 255,
        "scaleX": 1.2,
        "scaleY": 1.2,
        "rotation": 0,
        "originX": 73,
        "originY": 63,
        "partListId": 1,
        "partId": 27,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 17,
        "parent": 2,
        "type": 2,
        "x": -11,
        "y": -10,
        "w": 176,
        "h": 176,
        "alpha": 255,
        "scaleX": 0.56,
        "scaleY": 0.56,
        "rotation": 0,
        "originX": 88,
        "originY": 88,
        "multiply": [
         60,
         60,
         60
        ],
        "add": [
         -200,
         -50,
         200
        ],
        "partListId": 3,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 18,
        "parent": 2,
        "type": 2,
        "x": -11,
        "y": -10,
        "w": 176,
        "h": 176,
        "alpha": 127,
        "scaleX": 0.63,
        "scaleY": 0.63,
        "rotation": 180,
        "originX": 88,
        "originY": 88,
        "multiply": [
         40,
         40,
         40
        ],
        "add": [
         -100,
         -150,
         200
        ],
        "partListId": 3,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 19,
        "parent": 2,
        "type": 2,
        "x": -11,
        "y": -10,
        "w": 176,
        "h": 176,
        "alpha": 76,
        "scaleX": 0.7,
        "scaleY": 0.7,
        "rotation": 180,
        "originX": 88,
        "originY": 88,
        "multiply": [
         40,
         40,
         40
        ],
        "add": [
         -150,
         -50,
         200
        ],
        "partListId": 3,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 20,
        "parent": 2,
        "type": 2,
        "x": 58,
        "y": 63,
        "w": 38,
        "h": 38,
        "alpha": 0,
        "scaleX": 5.5,
        "scaleY": 5.5,
        "rotation": 0,
        "originX": 19,
        "originY": 19,
        "partListId": 3,
        "partId": 6,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 21,
        "parent": 2,
        "type": 2,
        "x": 106,
        "y": 17,
        "w": 110,
        "h": 100,
        "alpha": 0,
        "scaleX": 0.7,
        "scaleY": 0.7,
        "rotation": 0,
        "originX": 55,
        "originY": 55,
        "partListId": 3,
        "partId": 6,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 22,
        "parent": 2,
        "type": 2,
        "x": 142,
        "y": 53,
        "w": 38,
        "h": 38,
        "alpha": 0,
        "scaleX": 2.5,
        "scaleY": 2.5,
        "rotation": 0,
        "originX": 19,
        "originY": 19,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -200,
         100,
         200
        ],
        "partListId": 3,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 23,
        "parent": 1,
        "type": 1,
        "x": 44,
        "y": 24,
        "w": 142,
        "h": 108,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 24,
        "parent": 23,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 142,
        "h": 108,
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
        "type": 1011,
        "x": -6,
        "y": 26,
        "w": 68,
        "h": 82,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 26,
        "parent": 24,
        "type": 1011,
        "x": 37,
        "y": 26,
        "w": 68,
        "h": 82,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 27,
        "parent": 24,
        "type": 1011,
        "x": 80,
        "y": 26,
        "w": 68,
        "h": 82,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 28,
        "parent": 24,
        "type": 1011,
        "x": 98,
        "y": 24,
        "w": 68,
        "h": 82,
        "alpha": 255,
        "scaleX": 0.8,
        "scaleY": 0.8,
        "rotation": 0,
        "originX": 34,
        "originY": 41
       },
       {
        "id": 29,
        "parent": 24,
        "type": 2,
        "x": 8,
        "y": 22,
        "w": 58,
        "h": 78,
        "alpha": 127,
        "scaleX": 0.7,
        "scaleY": 0.7,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 30,
        "parent": 24,
        "type": 2,
        "x": 51,
        "y": 22,
        "w": 58,
        "h": 78,
        "alpha": 127,
        "scaleX": 0.7,
        "scaleY": 0.7,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 31,
        "parent": 24,
        "type": 2,
        "x": 94,
        "y": 22,
        "w": 58,
        "h": 78,
        "alpha": 127,
        "scaleX": 0.7,
        "scaleY": 0.7,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 32,
        "parent": 24,
        "type": 2,
        "x": 103,
        "y": 12,
        "w": 58,
        "h": 78,
        "alpha": 127,
        "scaleX": 0.56,
        "scaleY": 0.56,
        "rotation": 0,
        "originX": 29,
        "originY": 39,
        "partListId": 1,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 33,
        "parent": 24,
        "type": 4,
        "x": -20,
        "y": 4,
        "w": 182,
        "h": 84,
        "alpha": 204,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 13,
        "nineGrid": [
         17,
         17,
         35,
         35
        ]
       },
       {
        "id": 34,
        "parent": 24,
        "type": 4,
        "x": -36,
        "y": 4,
        "w": 214,
        "h": 84,
        "alpha": 204,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 13,
        "nineGrid": [
         17,
         17,
         35,
         35
        ]
       },
       {
        "id": 35,
        "parent": 1,
        "type": 8,
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 132,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       }
      ]
     }
    },
    "textures": {
     "JobHudAST0": {
      "path": "../public/icons/job-gauges/textures/JobHudAST0.png",
      "w": 1000,
      "h": 1172,
      "scale": 2
     }
    },
    "sizes": {
     "JobHudAST0": [
      230,
      156
     ]
    }
   },
   "dmgUp": {},
   "upgrade": {
    "3596": 25871,
    "3598": 25871,
    "3599": 16554,
    "3601": 37030,
    "3608": 16554,
    "3615": 25872,
    "7442": 25871,
    "16555": 25871
   },
   "jobSet": 33,
   "buttonsAll": [
    3594,
    3595,
    3600,
    3603,
    3606,
    3610,
    3612,
    3613,
    3614,
    7439,
    16552,
    16553,
    16554,
    16556,
    16557,
    16559,
    25871,
    25872,
    25873,
    25874,
    25875,
    37017,
    37019,
    37020,
    37021,
    37022,
    37029,
    37030,
    37031
   ],
   "unplaced": [
    25875,
    37019,
    37020,
    37021,
    37029,
    37031
   ],
   "replaceGroups": {
    "37017": [
     37018
    ],
    "37019": [
     37023,
     37026
    ],
    "37020": [
     37024,
     37027
    ],
    "37021": [
     37025,
     37028
    ],
    "37022": [
     7444,
     7445
    ]
   },
   "splitDetected": []
  },
  "BLM": {
   "job": {
    "abbr": "BLM",
    "name": "黒魔道士",
    "icon": "../public/icons/jobs/BLM.png",
    "level": 100,
    "role": "ranged"
   },
   "actions": {
    "141": {
     "id": 141,
     "name": "ファイア",
     "desc": "対象に火属性魔法攻撃。　威力：180\n追加効果：自身に「アンブラルブリザード」が付与されている場合は、これを解除する。\n自身に「アンブラルブリザード」が付与されていない場合は、「アストラルファイア」を付与する。　効果時間：永続\n追加効果（発動確率40％）：自身に「ファイガ効果アップ」を付与する。　効果時間：永続\nファイガ効果アップ効果：次に詠唱するファイガの詠唱時間と消費ＭＰを0にする。",
     "icon": "../public/fankit/battle-pve/14_BLM/Fire.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 2,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 180
     },
     "eff": {
      "grant": [
       {
        "status": "ファイガ効果アップ",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "142": {
     "id": 142,
     "name": "ブリザド",
     "desc": "対象に氷属性魔法攻撃。　威力：180\n追加効果：自身に「アストラルファイア」が付与されている場合は、これを解除する。\n自身に「アストラルファイア」が付与されていない場合は、「アンブラルブリザード」を付与する。　効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/Blizzard.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 1,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 400,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 180
     },
     "eff": null,
     "replaces": []
    },
    "149": {
     "id": 149,
     "name": "トランス",
     "desc": "自身に「アストラルファイア」または「アンブラルブリザード」が付与されている場合、逆の属性の1段階目の状態にする。",
     "icon": "../public/fankit/battle-pve/14_BLM/Transpose.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 5000,
     "cooldownGroup": 2,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 4,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "152": {
     "id": 152,
     "name": "ファイガ",
     "desc": "対象に火属性魔法攻撃。　威力：290\n追加効果：自身に「アンブラルブリザード」が付与されている場合は、これを解除する。\n自身に最大スタック分の「アストラルファイア」を付与する。\n効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/Fire_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 3500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 35,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": 5,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 2000,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 290
     },
     "eff": null,
     "replaces": []
    },
    "154": {
     "id": 154,
     "name": "ブリザガ",
     "desc": "対象に氷属性魔法攻撃。　威力：290\n追加効果：自身に「アストラルファイア」が付与されている場合は、これを解除する。\n自身に最大スタック分の「アンブラルブリザード」を付与する。\n効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/Blizzard_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 3500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 35,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 290
     },
     "eff": null,
     "replaces": []
    },
    "155": {
     "id": 155,
     "name": "エーテリアルステップ",
     "desc": "パーティメンバーひとりを対象とする。\n対象の目前まで素早く移動する。\nバインド中は実行不可。",
     "icon": "../public/fankit/battle-pve/14_BLM/Aetherial_Manipulation.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 10000,
     "cooldownGroup": 3,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "156": {
     "id": 156,
     "name": "コラプス",
     "desc": "対象に無属性魔法攻撃。　威力：100\n追加効果（発動確率20％）：ダメージが2倍になる。",
     "icon": "../public/fankit/battle-pve/14_BLM/Scathe.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 15,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
    },
    "157": {
     "id": 157,
     "name": "マバリア",
     "desc": "一定時間、最大ＨＰの30％分のダメージを無効化することができるシールドを自身に張る。\n最大ＨＰの30％分のダメージを無効化することでシールドが切れる。　効果時間：20秒",
     "icon": "../public/fankit/battle-pve/14_BLM/Manaward.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 22,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "158": {
     "id": 158,
     "name": "マナフォント",
     "desc": "自身のＭＰを全回復する。\n追加効果：自身に最大スタック分の「アストラルファイア」を付与する。　効果時間：永続\n追加効果：自身に「サンダー系魔法実行可」を付与する。\n効果時間：永続\n追加効果：自身に「アンブラルハート」を3つ付与する。\nアンブラルハート効果：ファイア系魔法実行時の「アストラルファイア」による消費ＭＰの増加効果を防ぐ。\nさらに、フレア実行時に「アンブラルハート」を全て消費する代わりに、消費ＭＰを2/3にすることができる。\n追加効果：自身に「パラドックスシンボル」を付与する。\n発動条件：「アストラルファイア」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Manafont.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 24,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "サンダー系魔法実行可",
        "sec": null,
        "stacks": null,
        "combo": false
       },
       {
        "status": "パラドックスシンボル",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "アストラルファイア"
     },
     "replaces": []
    },
    "159": {
     "id": 159,
     "name": "フリーズ",
     "desc": "対象とその周囲の敵に氷属性範囲魔法攻撃。　威力：120\n追加効果：自身に「アンブラルハート」を3つ付与する。\nアンブラルハート効果：ファイア系魔法実行時の「アストラルファイア」による消費ＭＰの増加効果を防ぐ。\nさらに、フレア実行時に「アンブラルハート」を全て消費する代わりに、消費ＭＰを2/3にすることができる。\n発動条件：「アンブラルブリザード」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Freeze.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 40,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 1000,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 120
     },
     "eff": {
      "requires": "アンブラルブリザード"
     },
     "replaces": []
    },
    "162": {
     "id": 162,
     "name": "フレア",
     "desc": "対象とその周囲の敵に火属性範囲魔法攻撃。　威力：240\n2体目以降の対象への威力は30％減少する。\n追加効果：自身に最大スタック分の「アストラルファイア」を付与する。　効果時間：永続\n追加効果：自身に3スタックの「アストラルソウル」を付与する。\nこの効果はアストラルファイアの効果が切れると解除される。\n発動条件：「アストラルファイア」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Flare.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": -1,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 240
     },
     "eff": {
      "grant": [
       {
        "status": "アストラルソウル",
        "sec": null,
        "stacks": 3,
        "combo": false
       }
      ],
      "requires": "アストラルファイア"
     },
     "replaces": []
    },
    "3573": {
     "id": 3573,
     "name": "黒魔紋",
     "desc": "自身の足元に黒魔紋を生成する。\n黒魔紋効果：自身のオートアタックの攻撃間隔と、魔法のキャストタイムとリキャストタイムを15％短縮させる。\n効果時間：20秒\n最大チャージ数：2\n発動条件：「黒魔紋」非効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Ley_Lines.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 20,
     "maxCharges": 2,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 52,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 3,
     "ground": true,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "cost": {
       "gauge": "黒魔紋",
       "n": 1
      },
      "haste": {
       "pct": 15,
       "sec": 20
      }
     },
     "replaces": []
    },
    "3576": {
     "id": 3576,
     "name": "ブリザジャ",
     "desc": "対象に氷属性魔法攻撃。　威力：300\n追加効果：自身に「アンブラルハート」を3つ付与する。\nアンブラルハート効果：ファイア系魔法実行時の「アストラルファイア」による消費ＭＰの増加効果を防ぐ。\nさらに、フレア実行時に「アンブラルハート」を全て消費する代わりに、消費ＭＰを2/3にすることができる。\n発動条件：「アンブラルブリザード」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Blizzard_IV.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 58,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 300
     },
     "eff": {
      "requires": "アンブラルブリザード"
     },
     "replaces": []
    },
    "3577": {
     "id": 3577,
     "name": "ファイジャ",
     "desc": "対象に火属性魔法攻撃。　威力：300\n追加効果：自身に「アストラルソウル」を付与する。\nこの効果はアストラルファイアの効果が切れると解除される。\n発動条件：「アストラルファイア」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Fire_IV.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 60,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 300
     },
     "eff": {
      "grant": [
       {
        "status": "アストラルソウル",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "requires": "アストラルファイア"
     },
     "replaces": []
    },
    "7419": {
     "id": 7419,
     "name": "ラインズステップ",
     "desc": "自身が生成した黒魔紋の中心へ素早く移動する。\nバインド中は実行不可。",
     "icon": "../public/fankit/battle-pve/14_BLM/Between_the_Lines.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 3000,
     "cooldownGroup": 1,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 62,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": true,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7421": {
     "id": 7421,
     "name": "三連魔",
     "desc": "効果時間中に実行する3回までの、詠唱をともなう魔法について、詠唱時間無しで詠唱することができる。　効果時間：15秒\n最大チャージ数：2",
     "icon": "../public/fankit/battle-pve/14_BLM/Triplecast.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 19,
     "maxCharges": 2,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 66,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7422": {
     "id": 7422,
     "name": "ファウル",
     "desc": "対象とその周囲の敵に無属性範囲魔法攻撃。　威力：600\n2体目以降の対象への威力は25％減少する。\n発動条件：「ポリグロット」",
     "icon": "../public/fankit/battle-pve/14_BLM/Foul.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 70,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "cost": {
       "gauge": "ポリグロット",
       "n": 1
      }
     },
     "replaces": []
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
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7560": {
     "id": 7560,
     "name": "アドル",
     "desc": "一定時間、対象の与物理ダメージを5％、与魔法ダメージを10％減少させる。　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/14_BLM/Role_Actions/Addle.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 90000,
     "cooldownGroup": 47,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 8,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7562": {
     "id": 7562,
     "name": "ルーシッドドリーム",
     "desc": "自身のＭＰを継続回復する。\n効果量：55　効果時間：21秒",
     "icon": "../public/fankit/battle-pve/14_BLM/Role_Actions/Lucid_Dreaming.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 45,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 14,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 420
     },
     "eff": {
      "grant": [
       {
        "status": "ディセスティーム実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16505": {
     "id": 16505,
     "name": "デスペア",
     "desc": "対象に火属性魔法攻撃。　威力：350\n追加効果：自身に最大スタック分の「アストラルファイア」を付与する。　効果時間：永続\n発動条件：「アストラルファイア」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Despair.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 72,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": -1,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 350
     },
     "eff": {
      "requires": "アストラルファイア"
     },
     "replaces": []
    },
    "16506": {
     "id": 16506,
     "name": "アンブラルソウル",
     "desc": "自身に「アンブラルブリザード」を付与し、さらに「アンブラルハート」を1つ付与する。\nアンブラルハート効果：ファイア系魔法実行時の「アストラルファイア」による消費ＭＰの増加効果を防ぐ。\nさらに、フレア実行時に「アンブラルハート」を全て消費する代わりに、消費ＭＰを2/3にすることができる。\n追加効果：自身のＭＰが100％未満の場合、付与されているアンブラルブリザードのスタック数に応じてＭＰを回復する。\n1/2/3スタック時の回復量：2500/5000/10000\n自身が非戦闘状態であれば、「アンブラルブリザード」と「アンブラルハート」を最大スタック分付与し、さらに自身のＭＰが100％未満の場合にＭＰを10000回復する。\n発動条件：「アンブラルブリザード」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Umbral_Soul.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 35,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "requires": "アンブラルブリザード"
     },
     "replaces": []
    },
    "16507": {
     "id": 16507,
     "name": "ゼノグロシー",
     "desc": "対象に無属性魔法攻撃。　威力：890\n発動条件：「ポリグロット」",
     "icon": "../public/fankit/battle-pve/14_BLM/Xenoglossy.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 80,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 890
     },
     "eff": {
      "cost": {
       "gauge": "ポリグロット",
       "n": 1
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "requires": "暗黒"
     },
     "replaces": []
    },
    "25794": {
     "id": 25794,
     "name": "ハイファイラ",
     "desc": "対象とその周囲の敵に火属性範囲魔法攻撃。　威力：100\n追加効果：自身に「アンブラルブリザード」が付与されている場合は、これを解除する。\n自身に最大スタック分の「アストラルファイア」を付与する。\n効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/High_Fire_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 3000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 1500,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
    },
    "25795": {
     "id": 25795,
     "name": "ハイブリザラ",
     "desc": "対象とその周囲の敵に氷属性範囲魔法攻撃。　威力：100\n追加効果：自身に「アストラルファイア」が付与されている場合は、これを解除する。\n自身に最大スタック分の「アンブラルブリザード」を付与する。\n効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/High_Blizzard_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 3000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
    },
    "25796": {
     "id": 25796,
     "name": "アンプリファイア",
     "desc": "自身に「ポリグロット」を付与する。\n発動条件：「アストラルファイア」または「アンブラルブリザード」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Amplifier.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 21,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 86,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "ポリグロット",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "アストラルファイア",
       "n": 1
      }
     },
     "replaces": []
    },
    "25797": {
     "id": 25797,
     "name": "パラドックス",
     "desc": "対象に無属性魔法攻撃。　威力：540\nアストラルファイア時追加効果：自身に「ファイガ効果アップ」を付与する。　効果時間：永続\nファイガ効果アップ効果：次に詠唱するファイガの詠唱時間と消費ＭＰを0にする。\nアンブラルブリザード時追加効果：この魔法の消費ＭＰが0になる。\n発動条件：「パラドックスシンボル」\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとファイアとブリザドがパラドックスに変化する。",
     "icon": "../public/fankit/battle-pve/14_BLM/Paradox.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 1600,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 540
     },
     "eff": {
      "grant": [
       {
        "status": "ファイガ効果アップ",
        "sec": null,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "パラドックスシンボル",
       "n": 1
      }
     },
     "replaces": [
      141
     ]
    },
    "25880": {
     "id": 25880,
     "name": "スリプル",
     "desc": "対象とその周囲の敵に睡眠を付与する。　効果時間：30秒\n実行後にオートアタックを停止する。",
     "icon": "../public/fankit/battle-pve/14_BLM/Role_Actions/Sleep.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 10,
     "forJob": true,
     "isRole": true,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 800,
     "range": 30,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "36986": {
     "id": 36986,
     "name": "ハイサンダー",
     "desc": "対象に雷属性魔法攻撃。　威力：150\n追加効果：対象に雷属性の継続ダメージを付与する。\n威力：60　効果時間：30秒\n自身が実行するサンダー系魔法の継続ダメージ効果は、同時に1種類のみ付与される。\n発動条件：「サンダー系魔法実行可」効果中\nサンダー系魔法実行可は、アストラルファイアとアンブラルブリザードが付与されていない状態でいずれかが付与されたとき、またはいずれかが付与されている状態でもう一方に変化したときに付与される。　効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/High_Thunder.png",
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
     "isRole": false,
     "category": 2,
     "proc": 177,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 150,
      "dot": {
       "potency": 60,
       "sec": 30
      }
     },
     "eff": {
      "requires": "サンダー系魔法実行可"
     },
     "replaces": []
    },
    "36987": {
     "id": 36987,
     "name": "ハイサンダラ",
     "desc": "対象とその周囲の敵に雷属性範囲魔法攻撃。　威力：100\n追加効果：対象に雷属性の継続ダメージを付与する。\n威力：40　効果時間：24秒\n自身が実行するサンダー系魔法の継続ダメージ効果は、同時に1種類のみ付与される。\n発動条件：「サンダー系魔法実行可」効果中\nサンダー系魔法実行可は、アストラルファイアとアンブラルブリザードが付与されていない状態でいずれかが付与されたとき、またはいずれかが付与されている状態でもう一方に変化したときに付与される。　効果時間：永続",
     "icon": "../public/fankit/battle-pve/14_BLM/High_Thunder_II.png",
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
     "isRole": false,
     "category": 2,
     "proc": 177,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100,
      "dot": {
       "potency": 40,
       "sec": 24
      }
     },
     "eff": {
      "requires": "サンダー系魔法実行可"
     },
     "replaces": []
    },
    "36988": {
     "id": 36988,
     "name": "魔紋再設置",
     "desc": "自身の足元に黒魔紋を再設置する。\n再設置時の効果時間は、再設置する直前の残り効果時間を引き継ぐ。\n発動条件：「黒魔紋」効果中",
     "icon": "../public/fankit/battle-pve/14_BLM/Retrace.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 40000,
     "cooldownGroup": 9,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 96,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 7,
     "hostile": false,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 3,
     "ground": true,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "requires": "黒魔紋"
     },
     "replaces": []
    },
    "36989": {
     "id": 36989,
     "name": "フレアスター",
     "desc": "対象とその周囲の敵に火属性範囲魔法攻撃。　威力：500\n2体目以降の対象への威力は65％減少する。\n発動条件：「アストラルソウル」最大",
     "icon": "../public/fankit/battle-pve/14_BLM/Flare_Star.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 2000,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 100,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 500
     },
     "eff": {
      "cost": {
       "gauge": "アストラルソウル",
       "n": 1
      }
     },
     "replaces": []
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
    "堅実魔": "../public/icons/statuses/210452.png",
    "サンダー": "../public/icons/statuses/210457.png",
    "サンダラ": "../public/icons/statuses/210458.png",
    "サンダガ": "../public/icons/statuses/210459.png",
    "迅速魔": "../public/icons/statuses/210454.png",
    "マバリア": "../public/icons/statuses/210456.png",
    "アポカタスタシス": "../public/icons/statuses/210451.png",
    "シールドウォール": "../public/icons/statuses/216306.png",
    "ストロングホールド": "../public/icons/statuses/216306.png",
    "ラストバスティオン": "../public/icons/statuses/216306.png",
    "黒魔紋": "../public/icons/statuses/212653.png",
    "原初の大地": "../public/icons/statuses/216306.png",
    "ダークフォース": "../public/icons/statuses/216306.png",
    "アドル": "../public/icons/statuses/213917.png",
    "ルーシッドドリーム": "../public/icons/statuses/213909.png",
    "サンダジャ": "../public/icons/statuses/212657.png",
    "三連魔": {
     "icon": "../public/icons/statuses/219621.png",
     "max": 3,
     "base": 219621
    },
    "サンダー系魔法効果アップ": "../public/icons/statuses/210461.png",
    "コメテオ": "../public/icons/statuses/214843.png",
    "ソウルガンメタル": "../public/icons/statuses/216306.png",
    "ファントムダート": "../public/icons/statuses/214868.png",
    "バリア": "../public/icons/statuses/210456.png",
    "エーテルバースト": "../public/icons/statuses/214814.png",
    "フレア効果アップ": "../public/icons/statuses/212659.png",
    "ポリグロット": "../public/icons/statuses/214984.png",
    "アストラルファイア": "../public/icons/statuses/210463.png",
    "アストラルファイアII": "../public/icons/statuses/210464.png",
    "アンブラルブリザード": "../public/icons/statuses/210466.png",
    "アンブラルブリザードII": "../public/icons/statuses/210467.png",
    "アストラルファイア［被］": {
     "icon": "../public/icons/statuses/218333.png",
     "max": 3,
     "base": 218333
    },
    "アンブラルブリザード［被］": {
     "icon": "../public/icons/statuses/218337.png",
     "max": 3,
     "base": 218337
    },
    "火傷": "../public/icons/statuses/215524.png",
    "氷結": "../public/icons/statuses/215637.png",
    "バースト": "../public/icons/statuses/214959.png",
    "ソウルレゾナンス": {
     "icon": "../public/icons/statuses/219314.png",
     "max": 6,
     "base": 219314
    },
    "パラドックスシンボル": "../public/icons/statuses/214961.png",
    "アストラルファイアIII": "../public/icons/statuses/210465.png",
    "アンブラルブリザードIII": "../public/icons/statuses/210468.png",
    "サンダー系魔法実行可": "../public/icons/statuses/212660.png",
    "ハイサンダー": "../public/icons/statuses/212661.png",
    "ハイサンダラ": "../public/icons/statuses/212662.png",
    "リース・オブ・ファイア": "../public/icons/statuses/214733.png",
    "リース・オブ・アイス": "../public/icons/statuses/214734.png",
    "エレメントスター": "../public/icons/statuses/214736.png",
    "レサージー": "../public/icons/statuses/214735.png",
    "ダルウェポン": "../public/icons/statuses/214748.png",
    "ランパート": "../public/icons/statuses/210152.png",
    "ファイト・オア・フライト": "../public/icons/statuses/210155.png",
    "アイアンウィル": "../public/icons/statuses/212506.png",
    "ホークアイ": "../public/icons/statuses/210351.png",
    "猛者の撃": "../public/icons/statuses/210354.png",
    "乱れ撃ち": "../public/icons/statuses/210356.png",
    "賢人のバラード": "../public/icons/statuses/212603.png",
    "軍神のパイオン": "../public/icons/statuses/212605.png",
    "バトルボイス": "../public/icons/statuses/212601.png",
    "ケアルラ効果アップ": "../public/icons/statuses/210410.png",
    "神速魔": "../public/icons/statuses/212627.png",
    "ファイガ効果アップ": "../public/icons/statuses/210460.png",
    "サークル・オブ・ドゥーム": "../public/icons/statuses/210158.png",
    "アーゼマの均衡": "../public/icons/statuses/213204.png",
    "ハルオーネの槍": "../public/icons/statuses/213207.png",
    "ライトスピード": "../public/icons/statuses/213220.png",
    "シナストリー": "../public/icons/statuses/213223.png",
    "旅神のメヌエット": "../public/icons/statuses/212610.png",
    "コースティックバイト": "../public/icons/statuses/212616.png",
    "ストームバイト": "../public/icons/statuses/212617.png",
    "地神のミンネ": "../public/icons/statuses/212618.png",
    "シンエアー": "../public/icons/statuses/212631.png",
    "インドゥルゲンティア": "../public/icons/statuses/212637.png",
    "星の支配者": "../public/icons/statuses/213241.png",
    "彼岸花": "../public/icons/statuses/213304.png",
    "明鏡止水": {
     "icon": "../public/icons/statuses/219641.png",
     "max": 3,
     "base": 219641
    },
    "燕飛効果アップ": "../public/icons/statuses/213310.png",
    "巨星の支配者": "../public/icons/statuses/213242.png",
    "トゥルーノース": "../public/icons/statuses/213903.png",
    "風月": "../public/icons/statuses/213311.png",
    "風花": "../public/icons/statuses/213312.png",
    "残心実行可": "../public/icons/statuses/213318.png",
    "レクイエスカット": {
     "icon": "../public/icons/statuses/218345.png",
     "max": 4,
     "base": 218345
    },
    "ディア": "../public/icons/statuses/212635.png",
    "テンパランス": "../public/icons/statuses/212634.png",
    "ディヴィネーション": "../public/icons/statuses/213245.png",
    "コンバガ": "../public/icons/statuses/213248.png",
    "ホロスコープ": "../public/icons/statuses/213251.png",
    "ホロスコープ・ヘリオス": "../public/icons/statuses/213252.png",
    "ニュートラルセクト": "../public/icons/statuses/213253.png",
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "トルバドゥール": "../public/icons/statuses/212615.png",
    "神聖魔法効果アップ": "../public/icons/statuses/212521.png",
    "ブラストアロー実行可": "../public/icons/statuses/212621.png",
    "リタージー・オブ・ベル": {
     "icon": "../public/icons/statuses/218373.png",
     "max": 5,
     "base": 218373
    },
    "マクロコスモス": "../public/icons/statuses/213263.png",
    "光神のフィナーレ": "../public/icons/statuses/212622.png",
    "奥義波切実行可": "../public/icons/statuses/213313.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png",
    "燕返し実行可": "../public/icons/statuses/213315.png",
    "天道": "../public/icons/statuses/213319.png",
    "レゾナンスアロー実行可": "../public/icons/statuses/213076.png",
    "光神のアンコール実行可": "../public/icons/statuses/213077.png",
    "グレアジャ実行可": {
     "icon": "../public/icons/statuses/218669.png",
     "max": 3,
     "base": 218669
    },
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png",
    "オラクル実行可": "../public/icons/statuses/213264.png",
    "サンサイン実行可": "../public/icons/statuses/213266.png"
   },
   "bars": {
    "hb1": {
     "job": [
      {
       "kind": "action",
       "id": 16505
      },
      {
       "kind": "action",
       "id": 16507
      },
      {
       "kind": "action",
       "id": 141
      },
      {
       "kind": "action",
       "id": 25794,
       "from": 147
      },
      {
       "kind": "action",
       "id": 156
      },
      {
       "kind": "action",
       "id": 16506
      },
      {
       "kind": "action",
       "id": 36988
      },
      {
       "kind": "action",
       "id": 7562
      },
      {
       "kind": "action",
       "id": 25796
      },
      {
       "kind": "action",
       "id": 3576
      },
      {
       "kind": "action",
       "id": 3577
      },
      {
       "kind": "action",
       "id": 36986,
       "from": 153
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb2": {
     "job": [
      {
       "kind": "action",
       "id": 162
      },
      {
       "kind": "action",
       "id": 7422
      },
      {
       "kind": "action",
       "id": 25795,
       "from": 25793
      },
      {
       "kind": "action",
       "id": 159
      },
      null,
      null,
      {
       "kind": "action",
       "id": 7559
      },
      null,
      null,
      {
       "kind": "action",
       "id": 154
      },
      {
       "kind": "action",
       "id": 152
      },
      {
       "kind": "action",
       "id": 36987,
       "from": 7447
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb3": {
     "job": [
      {
       "kind": "action",
       "id": 36989
      },
      {
       "kind": "action",
       "id": 142
      },
      null,
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 158
      },
      {
       "kind": "action",
       "id": 3573
      },
      {
       "kind": "action",
       "id": 149
      },
      {
       "kind": "macro",
       "no": 266
      },
      {
       "kind": "macro",
       "no": 267
      },
      null
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb4": {
     "job": [
      {
       "kind": "macro",
       "no": 67
      },
      {
       "kind": "action",
       "id": 7561
      },
      {
       "kind": "action",
       "id": 7560
      },
      {
       "kind": "other",
       "type": 10
      },
      null,
      null,
      {
       "kind": "action",
       "id": 7419
      },
      {
       "kind": "action",
       "id": 7421
      },
      {
       "kind": "action",
       "id": 157
      },
      {
       "kind": "macro",
       "no": 9
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
       "kind": "macro",
       "no": 346
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
      null,
      {
       "kind": "other",
       "type": 2
      }
     ],
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
       "kind": "macro",
       "no": 259
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
     "defaultSource": "job"
    },
    "hb8": {
     "job": null,
     "shared": [
      {
       "kind": "macro",
       "no": 296
      },
      {
       "kind": "macro",
       "no": 297
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
       "kind": "macro",
       "no": 307
      },
      {
       "kind": "other",
       "type": 4
      },
      {
       "kind": "macro",
       "no": 259
      },
      {
       "kind": "macro",
       "no": 309
      },
      {
       "kind": "macro",
       "no": 310
      },
      {
       "kind": "macro",
       "no": 298
      },
      {
       "kind": "macro",
       "no": 299
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
       "kind": "macro",
       "no": 258
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
     "job": [
      null,
      null,
      null,
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 36986,
       "from": 153
      },
      {
       "kind": "action",
       "id": 152
      },
      {
       "kind": "action",
       "id": 25796
      },
      {
       "kind": "missing",
       "id": 3574
      },
      {
       "kind": "action",
       "id": 7421
      },
      {
       "kind": "action",
       "id": 3573
      }
     ],
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
       "kind": "macro",
       "no": 257
      },
      {
       "kind": "macro",
       "no": 256
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
     "defaultSource": "job"
    },
    "xhb1": {
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
       "id": 36987
      },
      null,
      {
       "kind": "action",
       "id": 25796
      },
      {
       "kind": "action",
       "id": 36986
      },
      {
       "kind": "action",
       "id": 25794
      },
      {
       "kind": "action",
       "id": 25795
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
     "defaultSource": "shared"
    },
    "xhb3": {
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
     "defaultSource": "shared"
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
   "gauges": {
    "JobHudBLM0": {
     "index": 325,
     "name": "エレメンタルゲージ",
     "x": 38.07291793823242,
     "y": 42.546295166015625,
     "scale": 0.800000011920929,
     "anchor": 4,
     "w": 204,
     "h": 208
    },
    "JobHudBLM1": {
     "index": 326,
     "name": "アストラルゲージ",
     "x": 43.64583206176758,
     "y": 47.407405853271484,
     "scale": 0.800000011920929,
     "anchor": 4,
     "w": 128,
     "h": 128
    }
   },
   "gauge": {
    "names": [
     "JobHudBLM0",
     "JobHudBLM1"
    ],
    "layouts": {
     "JobHudBLM0": {
      "partLists": [
       {
        "id": 1,
        "parts": [
         {
          "texture": "JobHudBLM0",
          "u": 0,
          "v": 0,
          "w": 162,
          "h": 144
         },
         {
          "texture": "JobHudBLM0",
          "u": 290,
          "v": 0,
          "w": 52,
          "h": 52
         },
         {
          "texture": "JobHudBLM0",
          "u": 290,
          "v": 52,
          "w": 52,
          "h": 52
         },
         {
          "texture": "JobHudBLM0",
          "u": 342,
          "v": 0,
          "w": 20,
          "h": 48
         },
         {
          "texture": "JobHudBLM0",
          "u": 342,
          "v": 48,
          "w": 20,
          "h": 48
         },
         {
          "texture": "JobHudBLM0",
          "u": 182,
          "v": 236,
          "w": 24,
          "h": 68
         },
         {
          "texture": "JobHudBLM0",
          "u": 342,
          "v": 96,
          "w": 20,
          "h": 48
         },
         {
          "texture": "JobHudBLM0",
          "u": 342,
          "v": 144,
          "w": 20,
          "h": 48
         },
         {
          "texture": "JobHudBLM0",
          "u": 162,
          "v": 0,
          "w": 128,
          "h": 124
         },
         {
          "texture": "JobHudBLM0",
          "u": 0,
          "v": 146,
          "w": 90,
          "h": 90
         },
         {
          "texture": "JobHudBLM0",
          "u": 95,
          "v": 153,
          "w": 80,
          "h": 78
         },
         {
          "texture": "JobHudBLM0",
          "u": 180,
          "v": 146,
          "w": 90,
          "h": 90
         },
         {
          "texture": "JobHudBLM0",
          "u": 362,
          "v": 0,
          "w": 30,
          "h": 128
         },
         {
          "texture": "JobHudBLM0",
          "u": 324,
          "v": 192,
          "w": 30,
          "h": 46
         },
         {
          "texture": "JobHudBLM0",
          "u": 354,
          "v": 192,
          "w": 30,
          "h": 46
         },
         {
          "texture": "JobHudBLM0",
          "u": 0,
          "v": 236,
          "w": 90,
          "h": 90
         },
         {
          "texture": "JobHudBLM0",
          "u": 90,
          "v": 236,
          "w": 68,
          "h": 68
         },
         {
          "texture": "JobHudBLM0",
          "u": 290,
          "v": 104,
          "w": 46,
          "h": 46
         },
         {
          "texture": "JobHudBLM0",
          "u": 362,
          "v": 128,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBLM0",
          "u": 270,
          "v": 150,
          "w": 54,
          "h": 83
         },
         {
          "texture": "JobHudBLM0",
          "u": 158,
          "v": 236,
          "w": 24,
          "h": 68
         },
         {
          "texture": "JobHudBLM0",
          "u": 206,
          "v": 236,
          "w": 64,
          "h": 36
         },
         {
          "texture": "JobHudBLM0",
          "u": 206,
          "v": 272,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudBLM0",
          "u": 270,
          "v": 233,
          "w": 32,
          "h": 42
         },
         {
          "texture": "JobHudBLM0",
          "u": 302,
          "v": 238,
          "w": 52,
          "h": 52
         },
         {
          "texture": "JobHudBLM0",
          "u": 307,
          "v": 290,
          "w": 85,
          "h": 36
         },
         {
          "texture": "JobHudBLM0",
          "u": 0,
          "v": 324,
          "w": 86,
          "h": 40
         },
         {
          "texture": "JobHudBLM0",
          "u": 86,
          "v": 324,
          "w": 86,
          "h": 40
         },
         {
          "texture": "JobHudBLM0",
          "u": 172,
          "v": 324,
          "w": 86,
          "h": 40
         },
         {
          "texture": "JobHudBLM0",
          "u": 90,
          "v": 306,
          "w": 29,
          "h": 18
         },
         {
          "texture": "JobHudBLM0",
          "u": 119,
          "v": 306,
          "w": 29,
          "h": 18
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
         },
         {
          "texture": "JobHudBLM0",
          "u": 238,
          "v": 272,
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
          "w": 54,
          "h": 83,
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
          "x": 12,
          "y": 20,
          "w": 30,
          "h": 46,
          "alpha": 51,
          "scaleX": 0.59999996,
          "scaleY": 0.59999996,
          "rotation": 0,
          "originX": 15,
          "originY": 23,
          "partListId": 1,
          "partId": 14,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 54,
          "h": 83,
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
          "type": 2,
          "x": 12,
          "y": 20,
          "w": 30,
          "h": 46,
          "alpha": 0,
          "scaleX": 2.2,
          "scaleY": 2.2,
          "rotation": 0,
          "originX": 15,
          "originY": 23,
          "partListId": 1,
          "partId": 14,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 3,
          "type": 2,
          "x": 12,
          "y": 18,
          "w": 30,
          "h": 46,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 15,
          "originY": 23,
          "partListId": 1,
          "partId": 13,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 54,
          "h": 83,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 7,
          "parent": 6,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 54,
          "h": 83,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 19,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1002,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 86,
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
          "w": 86,
          "h": 86,
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
          "type": 2,
          "x": 1,
          "y": 1,
          "w": 80,
          "h": 78,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": -90,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 10,
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
          "w": 28,
          "h": 128,
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
          "w": 30,
          "h": 128,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": -90,
          "originX": 15,
          "originY": 10,
          "partListId": 1,
          "partId": 12,
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
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32,
          "alpha": 127,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 22,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1005,
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
          "multiply": [
           80,
           75,
           80
          ],
          "add": [
           80,
           20,
           100
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
          "alpha": 0,
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
          "alpha": 0,
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
        "id": 1006,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 24,
          "h": 68,
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
          "w": 24,
          "h": 68,
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
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 24,
          "h": 68,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 12,
          "originY": 34,
          "partListId": 1,
          "partId": 20,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 24,
          "h": 68,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 12,
          "originY": 34,
          "add": [
           16,
           16,
           16
          ],
          "partListId": 1,
          "partId": 5,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1007,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 38,
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
          "x": 4,
          "y": 6,
          "w": 29,
          "h": 18,
          "alpha": 215,
          "scaleX": 0.43846154,
          "scaleY": 0.43846154,
          "rotation": 72.14793,
          "originX": 15,
          "originY": 9,
          "partListId": 1,
          "partId": 29,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": 21,
          "y": -18,
          "w": 29,
          "h": 18,
          "alpha": 212,
          "scaleX": 0.25,
          "scaleY": 0.25,
          "rotation": 119.44444,
          "originX": 15,
          "originY": 9,
          "partListId": 1,
          "partId": 29,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": 36,
          "y": -14,
          "w": 29,
          "h": 18,
          "alpha": 135,
          "scaleX": 0.39411765,
          "scaleY": 0.39411765,
          "rotation": 13.764706,
          "originX": 15,
          "originY": 9,
          "partListId": 1,
          "partId": 29,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 2,
          "x": 44,
          "y": -14,
          "w": 29,
          "h": 18,
          "alpha": 182,
          "scaleX": 0.51428574,
          "scaleY": 0.51428574,
          "rotation": 2.2857144,
          "originX": 15,
          "originY": 9,
          "partListId": 1,
          "partId": 30,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 2,
          "x": 32,
          "y": -20,
          "w": 29,
          "h": 18,
          "alpha": 153,
          "scaleX": 0.42000002,
          "scaleY": 0.42000002,
          "rotation": 314.8,
          "originX": 15,
          "originY": 9,
          "partListId": 1,
          "partId": 30,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 7,
          "parent": 1,
          "type": 2,
          "x": 18,
          "y": -12,
          "w": 29,
          "h": 18,
          "alpha": 42,
          "scaleX": 0.5,
          "scaleY": 0.5,
          "rotation": 26.166666,
          "originX": 15,
          "originY": 9,
          "partListId": 1,
          "partId": 30,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 8,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 38,
          "alpha": 0,
          "scaleX": 1.5,
          "scaleY": 1.5,
          "rotation": 0,
          "originX": 40,
          "originY": 18,
          "partListId": 1,
          "partId": 28,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 9,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 38,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 10,
          "parent": 9,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 38,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 40,
          "originY": 20,
          "partListId": 1,
          "partId": 27,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 11,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 38,
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
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 86,
          "h": 38,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 27,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1008,
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
           -7,
           -28,
           2
          ],
          "partListId": 2,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
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
          "originY": 16,
          "add": [
           80,
           80,
           80
          ]
         },
         {
          "id": 4,
          "parent": 3,
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
          "id": 5,
          "parent": 4,
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
           80,
           -80,
           -80
          ],
          "partListId": 2,
          "partId": 1,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
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
        "id": 1009,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
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
          "w": 20,
          "h": 48,
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
          "w": 20,
          "h": 48,
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
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 10,
          "originY": 24,
          "partListId": 1,
          "partId": 7,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 10,
          "originY": 24,
          "partListId": 1,
          "partId": 7,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": -16,
          "w": 20,
          "h": 48,
          "alpha": 35,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 10,
          "originY": 24,
          "partListId": 1,
          "partId": 4,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 7,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 8,
          "parent": 7,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 9,
          "parent": 8,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 10,
          "originY": 24,
          "partListId": 1,
          "partId": 6,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 10,
          "parent": 7,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 10,
          "originY": 24,
          "partListId": 1,
          "partId": 6,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 11,
          "parent": 7,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 20,
          "h": 48,
          "alpha": 127,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 3,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1010,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 52,
          "h": 52,
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
          "w": 52,
          "h": 52,
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
          "type": 2,
          "x": -2,
          "y": -34,
          "w": 90,
          "h": 90,
          "alpha": 147,
          "scaleX": 0.76,
          "scaleY": 0.76,
          "rotation": 0,
          "originX": 45,
          "originY": 45,
          "partListId": 1,
          "partId": 15,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 2,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 52,
          "h": 52,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 26,
          "originY": 26,
          "partListId": 1,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 2,
          "type": 2,
          "x": 4,
          "y": 4,
          "w": 46,
          "h": 46,
          "alpha": 242,
          "scaleX": 2,
          "scaleY": 2,
          "rotation": 0,
          "originX": 23,
          "originY": 23,
          "add": [
           255,
           -180,
           -200
          ],
          "partListId": 1,
          "partId": 17,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 52,
          "h": 52,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 7,
          "parent": 6,
          "type": 2,
          "x": -7,
          "y": -39,
          "w": 90,
          "h": 90,
          "alpha": 107,
          "scaleX": 0.44,
          "scaleY": 0.44,
          "rotation": 0,
          "originX": 45,
          "originY": 45,
          "partListId": 1,
          "partId": 15,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 8,
          "parent": 6,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 46,
          "h": 46,
          "alpha": 0,
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
          "id": 9,
          "parent": 6,
          "type": 2,
          "x": 4,
          "y": 4,
          "w": 46,
          "h": 46,
          "alpha": 140,
          "scaleX": 2,
          "scaleY": 2,
          "rotation": 0,
          "originX": 23,
          "originY": 23,
          "add": [
           -200,
           -180,
           255
          ],
          "partListId": 1,
          "partId": 17,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1011,
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
        "w": 204,
        "h": 208,
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
        "w": 214,
        "h": 220,
        "alpha": 255,
        "scaleX": 0.95,
        "scaleY": 0.95,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 3,
        "parent": 2,
        "type": 1,
        "x": 80,
        "y": 66,
        "w": 30,
        "h": 128,
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
        "type": 1003,
        "x": 0,
        "y": 0,
        "w": 30,
        "h": 128,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 5,
        "parent": 2,
        "type": 1,
        "x": 94,
        "y": 140,
        "w": 54,
        "h": 83,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 6,
        "parent": 5,
        "type": 1001,
        "x": -26,
        "y": 0,
        "w": 54,
        "h": 83,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 7,
        "parent": 5,
        "type": 1001,
        "x": 0,
        "y": 0,
        "w": 54,
        "h": 83,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 8,
        "parent": 5,
        "type": 1001,
        "x": 26,
        "y": 0,
        "w": 54,
        "h": 83,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 9,
        "parent": 2,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 162,
        "h": 160,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 10,
        "parent": 9,
        "type": 1,
        "x": 92,
        "y": 10,
        "w": 64,
        "h": 36,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 11,
        "parent": 10,
        "type": 3,
        "x": 15,
        "y": 8,
        "w": 34,
        "h": 22,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 12,
        "parent": 10,
        "type": 4,
        "x": 0,
        "y": 0,
        "w": 64,
        "h": 36,
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
       },
       {
        "id": 13,
        "parent": 9,
        "type": 2,
        "x": 68,
        "y": 48,
        "w": 52,
        "h": 52,
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
        "id": 14,
        "parent": 9,
        "type": 1,
        "x": 9,
        "y": -4,
        "w": 80,
        "h": 80,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 15,
        "parent": 14,
        "type": 1009,
        "x": 1,
        "y": 41,
        "w": 20,
        "h": 48,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -64,
        "originX": 10,
        "originY": 0
       },
       {
        "id": 16,
        "parent": 14,
        "type": 1009,
        "x": 16,
        "y": 19,
        "w": 20,
        "h": 48,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -44,
        "originX": 10,
        "originY": 0
       },
       {
        "id": 17,
        "parent": 14,
        "type": 1009,
        "x": 36,
        "y": 4,
        "w": 20,
        "h": 48,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -26,
        "originX": 10,
        "originY": 0
       },
       {
        "id": 18,
        "parent": 9,
        "type": 1,
        "x": 26,
        "y": 80,
        "w": 80,
        "h": 80,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 19,
        "parent": 18,
        "type": 1006,
        "x": -16,
        "y": 56,
        "w": 18,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -124,
        "originX": 10,
        "originY": 0
       },
       {
        "id": 20,
        "parent": 18,
        "type": 1006,
        "x": 4,
        "y": 76,
        "w": 18,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 216,
        "originX": 10,
        "originY": 0
       },
       {
        "id": 21,
        "parent": 18,
        "type": 1006,
        "x": 32,
        "y": 86,
        "w": 18,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 196,
        "originX": 10,
        "originY": 0
       },
       {
        "id": 22,
        "parent": 9,
        "type": 1,
        "x": -5,
        "y": 77,
        "w": 86,
        "h": 38,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 23,
        "parent": 22,
        "type": 1007,
        "x": 0,
        "y": 0,
        "w": 86,
        "h": 38,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 39,
        "originY": 8
       },
       {
        "id": 24,
        "parent": 9,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 162,
        "h": 144,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 25,
        "parent": 24,
        "type": 2,
        "x": -2,
        "y": 77,
        "w": 85,
        "h": 36,
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
       },
       {
        "id": 26,
        "parent": 24,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 162,
        "h": 144,
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
        "id": 27,
        "parent": 9,
        "type": 1010,
        "x": 68,
        "y": 48,
        "w": 52,
        "h": 52,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 28,
        "parent": 2,
        "type": 1,
        "x": 86,
        "y": 68,
        "w": 128,
        "h": 124,
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
        "type": 1002,
        "x": 11,
        "y": 10,
        "w": 86,
        "h": 86,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ]
       },
       {
        "id": 30,
        "parent": 28,
        "type": 2,
        "x": 6,
        "y": 5,
        "w": 90,
        "h": 90,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ],
        "partListId": 1,
        "partId": 11,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 31,
        "parent": 28,
        "type": 2,
        "x": 9,
        "y": 8,
        "w": 90,
        "h": 90,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ],
        "partListId": 1,
        "partId": 9,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 32,
        "parent": 28,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 128,
        "h": 124,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -20,
         -20,
         -20
        ],
        "partListId": 1,
        "partId": 8,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 33,
        "parent": 1,
        "type": 1,
        "x": -12,
        "y": 84,
        "w": 204,
        "h": 48,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 34,
        "parent": 33,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 166,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 35,
        "parent": 34,
        "type": 1004,
        "x": 0,
        "y": -1,
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
        "id": 36,
        "parent": 34,
        "type": 1008,
        "x": 96,
        "y": -16,
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
        "id": 37,
        "parent": 34,
        "type": 1,
        "x": 12,
        "y": 10,
        "w": 166,
        "h": 39,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 38,
        "parent": 37,
        "type": 1,
        "x": 96,
        "y": 4,
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
        "id": 39,
        "parent": 38,
        "type": 1008,
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
        "id": 40,
        "parent": 38,
        "type": 1008,
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
        "id": 41,
        "parent": 38,
        "type": 1008,
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
        "id": 42,
        "parent": 37,
        "type": 1,
        "x": 34,
        "y": 4,
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
        "id": 43,
        "parent": 42,
        "type": 1008,
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
        "id": 44,
        "parent": 42,
        "type": 1008,
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
        "id": 45,
        "parent": 42,
        "type": 1008,
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
        "id": 46,
        "parent": 37,
        "type": 1,
        "x": -15,
        "y": 3,
        "w": 64,
        "h": 36,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 47,
        "parent": 46,
        "type": 3,
        "x": 15,
        "y": 8,
        "w": 34,
        "h": 22,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 48,
        "parent": 46,
        "type": 4,
        "x": 0,
        "y": 0,
        "w": 64,
        "h": 36,
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
       },
       {
        "id": 49,
        "parent": 34,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 190,
        "h": 48,
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
        "type": 1008,
        "x": 182,
        "y": -1,
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
        "id": 51,
        "parent": 49,
        "type": 1008,
        "x": 202,
        "y": -1,
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
        "id": 52,
        "parent": 49,
        "type": 1008,
        "x": 222,
        "y": -1,
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
        "id": 53,
        "parent": 49,
        "type": 1005,
        "x": 30,
        "y": 6,
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
     "JobHudBLM1": {
      "partLists": [
       {
        "id": 1,
        "parts": [
         {
          "texture": "JobHudBLM1",
          "u": 0,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1",
          "u": 64,
          "v": 128,
          "w": 40,
          "h": 40
         },
         {
          "texture": "JobHudBLM1",
          "u": 104,
          "v": 128,
          "w": 40,
          "h": 40
         },
         {
          "texture": "JobHudBLM1",
          "u": 0,
          "v": 128,
          "w": 64,
          "h": 64
         }
        ]
       },
       {
        "id": 2,
        "parts": [
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 0,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 128,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 256,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 384,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 512,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 640,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 768,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 0,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 128,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 256,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 384,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 512,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 640,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 768,
          "v": 896,
          "w": 128,
          "h": 128
         },
         {
          "texture": "JobHudBLM1Effect",
          "u": 896,
          "v": 896,
          "w": 128,
          "h": 128
         }
        ]
       },
       {
        "id": 3,
        "parts": [
         {
          "texture": "JobHudSimple_StackB",
          "u": 0,
          "v": 0,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudSimple_StackB",
          "u": 32,
          "v": 0,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudSimple_StackB",
          "u": 0,
          "v": 32,
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
           -7,
           -28,
           2
          ],
          "partListId": 3,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
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
          "id": 4,
          "parent": 3,
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
           -50,
           -120
          ],
          "partListId": 3,
          "partId": 1,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
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
          "partListId": 3,
          "partId": 0,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1002,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 40,
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
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 40,
          "h": 40,
          "alpha": 0,
          "scaleX": 2,
          "scaleY": 2,
          "rotation": 0,
          "originX": 20,
          "originY": 20,
          "add": [
           255,
           0,
           0
          ],
          "partListId": 1,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 40,
          "h": 40,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 20,
          "originY": 20,
          "partListId": 1,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 40,
          "h": 40,
          "alpha": 0,
          "scaleX": 1.5,
          "scaleY": 1.5,
          "rotation": 0,
          "originX": 20,
          "originY": 20,
          "partListId": 1,
          "partId": 1,
          "flipH": false,
          "flipV": false
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
        "w": 128,
        "h": 128,
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
        "w": 128,
        "h": 128,
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
        "type": 2,
        "x": 0,
        "y": -10,
        "w": 128,
        "h": 128,
        "alpha": 76,
        "scaleX": 1.2,
        "scaleY": 1.2,
        "rotation": 0,
        "originX": 64,
        "originY": 64,
        "add": [
         255,
         0,
         0
        ],
        "partListId": 2,
        "partId": 10,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 4,
        "parent": 2,
        "type": 2,
        "x": 32,
        "y": 32,
        "w": 64,
        "h": 64,
        "alpha": 102,
        "scaleX": 1.05,
        "scaleY": 1.05,
        "rotation": 0,
        "originX": 32,
        "originY": 32,
        "add": [
         160,
         -125,
         -177
        ],
        "partListId": 1,
        "partId": 3,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 5,
        "parent": 2,
        "type": 2,
        "x": 32,
        "y": 32,
        "w": 64,
        "h": 64,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 32,
        "originY": 32,
        "partListId": 1,
        "partId": 3,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 6,
        "parent": 2,
        "type": 2,
        "x": 0,
        "y": -10,
        "w": 128,
        "h": 128,
        "alpha": 255,
        "scaleX": 1.2,
        "scaleY": 1.2,
        "rotation": 0,
        "originX": 64,
        "originY": 64,
        "partListId": 2,
        "partId": 42,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 7,
        "parent": 2,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 128,
        "h": 128,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 8,
        "parent": 7,
        "type": 1002,
        "x": 44,
        "y": 8,
        "w": 40,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 20,
        "originY": 56
       },
       {
        "id": 9,
        "parent": 7,
        "type": 1002,
        "x": 44,
        "y": 8,
        "w": 40,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 60,
        "originX": 20,
        "originY": 56
       },
       {
        "id": 10,
        "parent": 7,
        "type": 1002,
        "x": 44,
        "y": 8,
        "w": 40,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 120,
        "originX": 20,
        "originY": 56
       },
       {
        "id": 11,
        "parent": 7,
        "type": 1002,
        "x": 44,
        "y": 8,
        "w": 40,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 180,
        "originX": 20,
        "originY": 56
       },
       {
        "id": 12,
        "parent": 7,
        "type": 1002,
        "x": 44,
        "y": 8,
        "w": 40,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 240,
        "originX": 20,
        "originY": 56
       },
       {
        "id": 13,
        "parent": 7,
        "type": 1002,
        "x": 44,
        "y": 8,
        "w": 40,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 300,
        "originX": 20,
        "originY": 56
       },
       {
        "id": 14,
        "parent": 2,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 128,
        "h": 128,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         30,
         30,
         30
        ],
        "partListId": 1,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 15,
        "parent": 1,
        "type": 1,
        "x": 3,
        "y": 48,
        "w": 122,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 61,
        "originY": 16
       },
       {
        "id": 16,
        "parent": 15,
        "type": 1001,
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
        "id": 17,
        "parent": 15,
        "type": 1001,
        "x": 18,
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
        "id": 18,
        "parent": 15,
        "type": 1001,
        "x": 36,
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
        "id": 19,
        "parent": 15,
        "type": 1001,
        "x": 54,
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
        "id": 20,
        "parent": 15,
        "type": 1001,
        "x": 72,
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
        "id": 21,
        "parent": 15,
        "type": 1001,
        "x": 90,
        "y": 0,
        "w": 32,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       }
      ]
     }
    },
    "textures": {
     "JobHudBLM0": {
      "path": "../public/icons/job-gauges/textures/JobHudBLM0.png",
      "w": 784,
      "h": 728,
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
     "JobHudBLM1": {
      "path": "../public/icons/job-gauges/textures/JobHudBLM1.png",
      "w": 288,
      "h": 384,
      "scale": 2
     },
     "JobHudBLM1Effect": {
      "path": "../public/icons/job-gauges/textures/JobHudBLM1Effect.png",
      "w": 2048,
      "h": 2048,
      "scale": 2
     },
     "JobHudSimple_StackB": {
      "path": "../public/icons/job-gauges/textures/JobHudSimple_StackB.png",
      "w": 128,
      "h": 128,
      "scale": 2
     }
    },
    "sizes": {
     "JobHudBLM0": [
      204,
      208
     ],
     "JobHudBLM1": [
      128,
      128
     ]
    }
   },
   "dmgUp": {},
   "upgrade": {
    "144": 36986,
    "147": 25794,
    "153": 36986,
    "7420": 36987,
    "7447": 36987,
    "25793": 25795
   },
   "jobSet": 25,
   "buttonsAll": [
    141,
    142,
    149,
    152,
    154,
    155,
    156,
    157,
    158,
    159,
    162,
    3573,
    3576,
    3577,
    7419,
    7421,
    7422,
    16505,
    16506,
    16507,
    25794,
    25795,
    25796,
    36986,
    36987,
    36988,
    36989
   ],
   "unplaced": [
    155
   ],
   "replaceGroups": {
    "141": [
     25797
    ]
   },
   "splitDetected": []
  },
  "BRD": {
   "job": {
    "abbr": "BRD",
    "name": "吟遊詩人",
    "icon": "../public/icons/jobs/BRD.png",
    "level": 100,
    "role": "ranged"
   },
   "actions": {
    "101": {
     "id": 101,
     "name": "猛者の撃",
     "desc": "一定時間、自身の与ダメージを15％上昇させる。\n効果時間：20秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Raging_Strikes.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 15,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 4,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "dmgUp": {
       "pct": 15,
       "sec": 20
      }
     },
     "replaces": []
    },
    "107": {
     "id": 107,
     "name": "乱れ撃ち",
     "desc": "自身に「乱れ撃ち」を付与する。　効果時間：10秒\n乱れ撃ち効果：リフルジェントアローおよびシャドウバイトを実行できる。\nさらに、リフルジェントアローを実行すると3回分のダメージを与える。\nシャドウバイトを実行する場合はその威力を300に上昇させる。\n追加効果：自身に「レゾナンスアロー実行可」を付与する。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Barrage.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 20,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 38,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "乱れ撃ち",
        "sec": 10,
        "stacks": null,
        "combo": false
       },
       {
        "status": "レゾナンスアロー実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "112": {
     "id": 112,
     "name": "リペリングショット",
     "desc": "対象に向かって射撃を行い、自身の10m後方に飛び退く。\nバインド中は実行不可。",
     "icon": "../public/fankit/battle-pve/11_BRD/Repelling_Shot.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 6,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 15,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 15,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "114": {
     "id": 114,
     "name": "賢人のバラード",
     "desc": "賢人のバラードを歌い、自身と周囲50m以内のパーティメンバーの与ダメージを1％上昇させる。　効果時間：45秒\n追加効果（発動確率80％）：自身に「詩心」が付与される。\nこの効果は賢人のバラードの効果中に継続的に発動する。\n詩心効果：ハートブレイクショットおよびレイン・オブ・デスのリキャストタイムを7.5秒短縮する。\n追加効果：自身に「賢人のコーダ」が付与される。\n発動条件：自身が戦闘状態",
     "icon": "../public/fankit/battle-pve/11_BRD/Mage's_Ballad.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 16,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 30,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "116": {
     "id": 116,
     "name": "軍神のパイオン",
     "desc": "軍神のパイオンを歌い、自身と周囲50m以内のパーティメンバーのダイレクトヒット発動率を3％上昇させる。　効果時間：45秒\n追加効果（発動確率80％）：自身に「詩心」が付与される。\nこの効果は軍神のパイオンの効果中に継続的に発動する。\n詩心効果：自身のオートアタックの攻撃間隔と、ウェポンスキルおよび魔法のキャストタイムとリキャストタイムを4％短縮させる。\n最大スタック数：4\n追加効果：自身に「軍神のコーダ」が付与される。\n発動条件：自身が戦闘状態",
     "icon": "../public/fankit/battle-pve/11_BRD/Army's_Paeon.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 17,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 40,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "117": {
     "id": 117,
     "name": "レイン・オブ・デス",
     "desc": "対象とその周囲の敵に範囲物理攻撃。　威力：100\n最大チャージ数：3\nリキャストタイマーを「ハートブレイクショット」と共有する。",
     "icon": "../public/fankit/battle-pve/11_BRD/Rain_of_Death.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 15000,
     "cooldownGroup": 10,
     "maxCharges": 2,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 45,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 8,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": []
    },
    "118": {
     "id": 118,
     "name": "バトルボイス",
     "desc": "一定時間、自身と周囲のパーティメンバーのダイレクトヒット発動率を20％上昇させる。　効果時間：20秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Battle_Voice.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 19,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 50,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3558": {
     "id": 3558,
     "name": "エンピリアルアロー",
     "desc": "対象に物理攻撃。　威力：260\n追加効果：賢人のバラード、軍神のパイオン、旅神のメヌエットを実行している場合、自身に「詩心」が付与される。",
     "icon": "../public/fankit/battle-pve/11_BRD/Empyreal_Arrow.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 15000,
     "cooldownGroup": 3,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 54,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 260
     },
     "eff": null,
     "replaces": []
    },
    "3559": {
     "id": 3559,
     "name": "旅神のメヌエット",
     "desc": "旅神のメヌエットを歌い、自身と周囲50m以内のパーティメンバーのクリティカル発動率を2％上昇させる。　効果時間：45秒\n追加効果（発動確率80％)：自身に「詩心」が付与される。\nこの効果は旅神のメヌエットの効果中に継続的に発動する。\n詩心効果：「ピッチパーフェクト」を実行することができるようになる。　最大スタック数：3\n追加効果：自身に「旅神のコーダ」が付与される。\n発動条件：自身が戦闘状態",
     "icon": "../public/fankit/battle-pve/11_BRD/The_Wanderer's_Minuet.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 18,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 52,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3560": {
     "id": 3560,
     "name": "アイアンジョー",
     "desc": "対象に物理攻撃。　威力：100\n追加効果：自身が対象にコースティックバイト、ストームバイトを付与している場合、それらの効果を付与しなおす。\n自身が対象にそれらを付与していない場合は効果無し。\n追加効果（発動確率35％）：自身に「ホークアイ」を付与する。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Iron_Jaws.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 56,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": {
      "grant": [
       {
        "status": "ホークアイ",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "3561": {
     "id": 3561,
     "name": "時神のピーアン",
     "desc": "自身またはパーティメンバーひとりを対象とする。\n対象にかかった一部の弱体効果を1つ解除する。\nこの効果が発動しなかった場合、対象が次に受ける一部の弱体効果を1つ防ぐバリアを張る。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/The_Warden's_Paean.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 45000,
     "cooldownGroup": 11,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 35,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "3562": {
     "id": 3562,
     "name": "サイドワインダー",
     "desc": "対象に物理攻撃。　威力：400",
     "icon": "../public/fankit/battle-pve/11_BRD/Sidewinder.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 60000,
     "cooldownGroup": 13,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 60,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 400
     },
     "eff": null,
     "replaces": []
    },
    "7404": {
     "id": 7404,
     "name": "ピッチパーフェクト",
     "desc": "対象とその周囲の敵に範囲物理攻撃。\nこのアクションの威力は、自身に付与されている「詩心」のスタック数により変化する。\n詩心が1つのとき威力：100\n詩心が2つのとき威力：220\n詩心が3つのとき威力：360\n2体目以降の対象への威力は50％減少する。\n発動条件：旅神のメヌエット効果中かつ「詩心」1以上",
     "icon": "../public/fankit/battle-pve/11_BRD/Pitch_Perfect.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 1000,
     "cooldownGroup": 1,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 52,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100
     },
     "eff": null,
     "replaces": [
      3559
     ]
    },
    "7405": {
     "id": 7405,
     "name": "トルバドゥール",
     "desc": "一定時間、自身と周囲のパーティメンバーの被ダメージを15％軽減させる。　効果時間：15秒\n機工士のタクティシャン、踊り子の守りのサンバとは同時に付与されない。",
     "icon": "../public/fankit/battle-pve/11_BRD/Troubadour.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 21,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 62,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7406": {
     "id": 7406,
     "name": "コースティックバイト",
     "desc": "対象に物理攻撃。　威力：150\n追加効果：対象に毒の継続ダメージを付与する。\n威力：20　効果時間：45秒\n追加効果（発動確率35％）：自身に「ホークアイ」を付与する。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Caustic_Bite.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 64,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 150,
      "dot": {
       "potency": 20,
       "sec": 45
      }
     },
     "eff": {
      "grant": [
       {
        "status": "ホークアイ",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "7407": {
     "id": 7407,
     "name": "ストームバイト",
     "desc": "対象に風属性物理攻撃。　威力：100\n追加効果：対象に風属性の継続ダメージを付与する。\n威力：25　効果時間：45秒\n追加効果（発動確率35％）：自身に「ホークアイ」を付与する。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Stormbite.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 64,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 100,
      "dot": {
       "potency": 25,
       "sec": 45
      }
     },
     "eff": {
      "grant": [
       {
        "status": "ホークアイ",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "7408": {
     "id": 7408,
     "name": "地神のミンネ",
     "desc": "一定時間、自身と周囲のパーティメンバーが受けるＨＰ回復効果を15％上昇させる。　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Nature's_Minne.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 120000,
     "cooldownGroup": 22,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 66,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7409": {
     "id": 7409,
     "name": "リフルジェントアロー",
     "desc": "対象に物理攻撃。　威力：280\n発動条件：「ホークアイ」または「乱れ撃ち」効果中",
     "icon": "../public/fankit/battle-pve/11_BRD/Refulgent_Arrow.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 70,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 280
     },
     "eff": {
      "cost": {
       "gauge": "ホークアイ",
       "n": 1
      }
     },
     "replaces": []
    },
    "7541": {
     "id": 7541,
     "name": "内丹",
     "desc": "自身のＨＰを回復する。　回復力：800",
     "icon": "../public/fankit/battle-pve/11_BRD/Role_Actions/Second_Wind.png",
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "heal": 800,
      "party": false
     },
     "replaces": []
    },
    "7548": {
     "id": 7548,
     "name": "アームズレングス",
     "desc": "一定時間、一部を除くすべてのノックバックと引き寄せを無効化する。　効果時間：6秒\n追加効果：効果中に自身が物理攻撃を受けると、攻撃者に20％スロウを付与する。　効果時間：15秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Role_Actions/Arm's_Length.png",
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7551": {
     "id": 7551,
     "name": "ヘッドグレイズ",
     "desc": "対象のアクション詠唱を中断させる。",
     "icon": "../public/fankit/battle-pve/11_BRD/Role_Actions/Head_Graze.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 44,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 24,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7553": {
     "id": 7553,
     "name": "フットグレイズ",
     "desc": "対象にバインドを付与する。　効果時間：10秒\n実行後にオートアタックを停止する。",
     "icon": "../public/fankit/battle-pve/11_BRD/Role_Actions/Foot_Graze.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 42,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 10,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7554": {
     "id": 7554,
     "name": "レッググレイズ",
     "desc": "対象に40％ヘヴィを付与する。　効果時間：10秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Role_Actions/Leg_Graze.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 30000,
     "cooldownGroup": 43,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 6,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
    },
    "7557": {
     "id": 7557,
     "name": "プロトン",
     "desc": "自身と周囲のパーティメンバーの移動速度を上昇させる。\n戦闘状態に入ると効果が切れ、かつ戦闘状態では効果がかからない。\n効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Role_Actions/Peloton.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 5000,
     "cooldownGroup": 41,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 20,
     "forJob": true,
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": true,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": false,
     "toParty": true,
     "mp": 0,
     "range": 30,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": null,
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 420
     },
     "eff": {
      "grant": [
       {
        "status": "ディセスティーム実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16494": {
     "id": 16494,
     "name": "シャドウバイト",
     "desc": "対象とその周囲の敵に範囲物理攻撃。　威力：200\n乱れ撃ち時威力：300\n発動条件：「ホークアイ」または「乱れ撃ち」効果中",
     "icon": "../public/fankit/battle-pve/11_BRD/Shadowbite.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 72,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 200,
      "cond": [
       {
        "status": "乱れ撃ち",
        "potency": 300
       }
      ]
     },
     "eff": {
      "cost": {
       "gauge": "ホークアイ",
       "n": 1
      }
     },
     "replaces": []
    },
    "16495": {
     "id": 16495,
     "name": "バーストショット",
     "desc": "対象に物理攻撃。　威力：220\n追加効果（発動確率35％）：自身に「ホークアイ」を付与する。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Burst_Shot.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 76,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 220
     },
     "eff": {
      "grant": [
       {
        "status": "ホークアイ",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "16496": {
     "id": 16496,
     "name": "エイペックスアロー",
     "desc": "対象に向かって前方直線範囲物理攻撃。　威力：140～700\n実行時に「ソウルボイス」を全て消費する。\n「ソウルボイス」の消費量が高いほど威力が上昇する。\n追加効果（ソウルボイス80以上消費時）：自身に「ブラストアロー実行可」を付与する。　効果時間：10秒\n発動条件：「ソウルボイス」20以上",
     "icon": "../public/fankit/battle-pve/11_BRD/Apex_Arrow.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 80,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 25,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 140
     },
     "eff": {
      "grant": [
       {
        "status": "ブラストアロー実行可",
        "sec": 10,
        "stacks": null,
        "combo": false
       }
      ],
      "cost": {
       "gauge": "ソウルボイス",
       "n": 20
      }
     },
     "replaces": []
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
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 10,
     "crit": false,
     "effectRange": 10,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 600
     },
     "eff": {
      "requires": "暗黒"
     },
     "replaces": []
    },
    "25783": {
     "id": 25783,
     "name": "ラドンバイト",
     "desc": "対象に向かって前方扇範囲物理攻撃。　威力：140\n追加効果（発動確率35％）：自身に「ホークアイ」を付与する。　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/11_BRD/Ladonsbite.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 82,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": null,
     "procStatus": null,
     "shape": 3,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 12,
     "crit": false,
     "effectRange": 12,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 140
     },
     "eff": {
      "grant": [
       {
        "status": "ホークアイ",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "25784": {
     "id": 25784,
     "name": "ブラストアロー",
     "desc": "対象に向かって前方直線範囲物理攻撃。　威力：700\n2体目以降の対象への威力は50％減少する。\n発動条件：「ブラストアロー実行可」効果中\n\n※このアクションはホットバーに登録することはできない。\n　発動条件を満たすとエイペックスアローがブラストアローに変化する。",
     "icon": "../public/fankit/battle-pve/11_BRD/Blast_Arrow.png",
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
     "isRole": false,
     "category": 3,
     "proc": 53,
     "procStatus": null,
     "shape": 4,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": 25,
     "crit": false,
     "effectRange": 25,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 700
     },
     "eff": {
      "requires": "ブラストアロー実行可"
     },
     "replaces": [
      16496
     ]
    },
    "25785": {
     "id": 25785,
     "name": "光神のフィナーレ",
     "desc": "一定時間、自身と周囲のパーティメンバーの与ダメージを上昇させる。　効果時間：20秒\nこのアクションの効果量は、自身に付与されている「コーダシンボル」の種類数により変化する。\nシンボルが1種類のときの効果量：2％\nシンボルが2種類のときの効果量：4％\nシンボルが3種類のときの効果量：6％\n追加効果：自身に「光神のアンコール実行可」を付与する。\n効果時間：30秒\n発動条件：コーダシンボルが1つ以上付与されている",
     "icon": "../public/fankit/battle-pve/11_BRD/Radiant_Finale.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 110000,
     "cooldownGroup": 14,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 90,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 2,
     "hostile": false,
     "toSelf": true,
     "toParty": false,
     "mp": 0,
     "range": 0,
     "crit": false,
     "effectRange": 30,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": null,
     "eff": {
      "grant": [
       {
        "status": "光神のアンコール実行可",
        "sec": 30,
        "stacks": null,
        "combo": false
       }
      ]
     },
     "replaces": []
    },
    "36975": {
     "id": 36975,
     "name": "ハートブレイクショット",
     "desc": "対象に物理攻撃。　威力：180\n最大チャージ数：3\nリキャストタイマーを「レイン・オブ・デス」と共有する。",
     "icon": "../public/fankit/battle-pve/11_BRD/Heartbreak_Shot.png",
     "iconFramed": true,
     "isGcd": false,
     "castMs": 0,
     "recastMs": 15000,
     "cooldownGroup": 10,
     "maxCharges": 3,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 92,
     "forJob": true,
     "isRole": false,
     "category": 4,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 180
     },
     "eff": null,
     "replaces": []
    },
    "36976": {
     "id": 36976,
     "name": "レゾナンスアロー",
     "desc": "対象とその周囲の敵に範囲物理攻撃。　威力：640\n2体目以降の対象への威力は50％減少する。\n発動条件：「レゾナンスアロー実行可」効果中",
     "icon": "../public/fankit/battle-pve/11_BRD/Resonant_Arrow.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": true,
     "level": 96,
     "forJob": true,
     "isRole": false,
     "category": 3,
     "proc": 170,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 640
     },
     "eff": {
      "requires": "レゾナンスアロー実行可"
     },
     "replaces": []
    },
    "36977": {
     "id": 36977,
     "name": "光神のアンコール",
     "desc": "対象とその周囲の敵に範囲物理攻撃。\nこのアクションの威力は、直前に実行した光神のフィナーレにおける「コーダシンボル」の消費数により変化する。\nコーダシンボルが1つのとき威力：700\nコーダシンボルが2つのとき威力：800\nコーダシンボルが3つのとき威力：1100\n2体目以降の対象への威力は50％減少する。\n発動条件：「光神のアンコール実行可」効果中",
     "icon": "../public/fankit/battle-pve/11_BRD/Radiant_Encore.png",
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
     "isRole": false,
     "category": 3,
     "proc": 171,
     "procStatus": null,
     "shape": 2,
     "hostile": true,
     "toSelf": false,
     "toParty": false,
     "mp": 0,
     "range": -1,
     "crit": false,
     "effectRange": 5,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 700
     },
     "eff": {
      "requires": "光神のアンコール実行可"
     },
     "replaces": []
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
    "ベノムバイト": "../public/icons/statuses/210352.png",
    "猛者の撃": "../public/icons/statuses/210354.png",
    "乱れ撃ち": "../public/icons/statuses/210356.png",
    "ウィンドバイト": "../public/icons/statuses/210360.png",
    "ストレートショット": "../public/icons/statuses/210361.png",
    "賢人のバラード": "../public/icons/statuses/212603.png",
    "軍神のパイオン": "../public/icons/statuses/212605.png",
    "バトルボイス": "../public/icons/statuses/212601.png",
    "シールドウォール": "../public/icons/statuses/216306.png",
    "ストロングホールド": "../public/icons/statuses/216306.png",
    "ラストバスティオン": "../public/icons/statuses/216306.png",
    "レイン・オブ・デス": "../public/icons/statuses/212609.png",
    "原初の大地": "../public/icons/statuses/216306.png",
    "ダークフォース": "../public/icons/statuses/216306.png",
    "旅神のメヌエット": "../public/icons/statuses/212610.png",
    "時神のピーアン": "../public/icons/statuses/212611.png",
    "トルバドゥール：バラード": "../public/icons/statuses/212612.png",
    "クリティカル上昇": "../public/icons/statuses/212613.png",
    "トルバドゥール：パイオン": "../public/icons/statuses/212614.png",
    "トルバドゥール：メヌエット": "../public/icons/statuses/212615.png",
    "パリセード": "../public/icons/statuses/213905.png",
    "タクティシャン": "../public/icons/statuses/213906.png",
    "リフレッシュ": "../public/icons/statuses/213907.png",
    "プロトン": "../public/icons/statuses/213908.png",
    "コースティックバイト": "../public/icons/statuses/212616.png",
    "ストームバイト": "../public/icons/statuses/212617.png",
    "地神のミンネ": "../public/icons/statuses/212618.png",
    "アームズレングス": "../public/icons/statuses/213915.png",
    "ターミナルベロシティ": "../public/icons/statuses/214844.png",
    "ソウルガンメタル": "../public/icons/statuses/216306.png",
    "軍神の加護": "../public/icons/statuses/212619.png",
    "軍神の契約": "../public/icons/statuses/212620.png",
    "トルバドゥール": "../public/icons/statuses/212615.png",
    "戦歌": "../public/icons/statuses/212613.png",
    "リペリングショット": "../public/icons/statuses/214858.png",
    "時神の護り": "../public/icons/statuses/212618.png",
    "集中": "../public/icons/statuses/214815.png",
    "ブラストアロー実行可": "../public/icons/statuses/212621.png",
    "光神のフィナーレ": "../public/icons/statuses/212622.png",
    "シャドウバイト実行可": "../public/icons/statuses/212623.png",
    "詩心": "../public/icons/statuses/214913.png",
    "進撃のマーチ": "../public/icons/statuses/212603.png",
    "進撃のマーチ［被］": "../public/icons/statuses/212602.png",
    "エイペックス・フォルテ": "../public/icons/statuses/212605.png",
    "エイペックス・フォルテ［被］": "../public/icons/statuses/212604.png",
    "英雄のファンタジア": "../public/icons/statuses/214914.png",
    "英雄のファンタジア［被］": "../public/icons/statuses/214915.png",
    "英雄のファンタジア［戦］": "../public/icons/statuses/214916.png",
    "英雄のファンタジア［魔］": "../public/icons/statuses/214917.png",
    "ホークアイ": "../public/icons/statuses/213075.png",
    "レゾナンスアロー実行可": "../public/icons/statuses/213076.png",
    "光神のアンコール実行可": "../public/icons/statuses/213077.png",
    "英雄のアンコール実行可": "../public/icons/statuses/213077.png",
    "スピードスター": "../public/icons/statuses/216621.png",
    "ブレイブ": "../public/icons/statuses/216683.png",
    "ランパート": "../public/icons/statuses/210152.png",
    "ファイト・オア・フライト": "../public/icons/statuses/210155.png",
    "アイアンウィル": "../public/icons/statuses/212506.png",
    "ケアルラ効果アップ": "../public/icons/statuses/210410.png",
    "神速魔": "../public/icons/statuses/212627.png",
    "堅実魔": "../public/icons/statuses/210452.png",
    "ファイガ効果アップ": "../public/icons/statuses/210460.png",
    "迅速魔": "../public/icons/statuses/210454.png",
    "マバリア": "../public/icons/statuses/210456.png",
    "サークル・オブ・ドゥーム": "../public/icons/statuses/210158.png",
    "黒魔紋": "../public/icons/statuses/212653.png",
    "アーゼマの均衡": "../public/icons/statuses/213204.png",
    "ハルオーネの槍": "../public/icons/statuses/213207.png",
    "ライトスピード": "../public/icons/statuses/213220.png",
    "シナストリー": "../public/icons/statuses/213223.png",
    "ルーシッドドリーム": "../public/icons/statuses/213909.png",
    "三連魔": {
     "icon": "../public/icons/statuses/219621.png",
     "max": 3,
     "base": 219621
    },
    "シンエアー": "../public/icons/statuses/212631.png",
    "インドゥルゲンティア": "../public/icons/statuses/212637.png",
    "星の支配者": "../public/icons/statuses/213241.png",
    "彼岸花": "../public/icons/statuses/213304.png",
    "明鏡止水": {
     "icon": "../public/icons/statuses/219641.png",
     "max": 3,
     "base": 219641
    },
    "燕飛効果アップ": "../public/icons/statuses/213310.png",
    "巨星の支配者": "../public/icons/statuses/213242.png",
    "トゥルーノース": "../public/icons/statuses/213903.png",
    "風月": "../public/icons/statuses/213311.png",
    "風花": "../public/icons/statuses/213312.png",
    "残心実行可": "../public/icons/statuses/213318.png",
    "レクイエスカット": {
     "icon": "../public/icons/statuses/218345.png",
     "max": 4,
     "base": 218345
    },
    "ディア": "../public/icons/statuses/212635.png",
    "テンパランス": "../public/icons/statuses/212634.png",
    "ディヴィネーション": "../public/icons/statuses/213245.png",
    "コンバガ": "../public/icons/statuses/213248.png",
    "ホロスコープ": "../public/icons/statuses/213251.png",
    "ホロスコープ・ヘリオス": "../public/icons/statuses/213252.png",
    "ニュートラルセクト": "../public/icons/statuses/213253.png",
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "神聖魔法効果アップ": "../public/icons/statuses/212521.png",
    "リタージー・オブ・ベル": {
     "icon": "../public/icons/statuses/218373.png",
     "max": 5,
     "base": 218373
    },
    "マクロコスモス": "../public/icons/statuses/213263.png",
    "奥義波切実行可": "../public/icons/statuses/213313.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png",
    "燕返し実行可": "../public/icons/statuses/213315.png",
    "天道": "../public/icons/statuses/213319.png",
    "サンダー系魔法実行可": "../public/icons/statuses/212660.png",
    "ハイサンダー": "../public/icons/statuses/212661.png",
    "グレアジャ実行可": {
     "icon": "../public/icons/statuses/218669.png",
     "max": 3,
     "base": 218669
    },
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png",
    "オラクル実行可": "../public/icons/statuses/213264.png",
    "サンサイン実行可": "../public/icons/statuses/213266.png"
   },
   "bars": {
    "hb1": {
     "job": [
      {
       "kind": "action",
       "id": 16495,
       "from": 97
      },
      {
       "kind": "action",
       "id": 7409,
       "from": 98
      },
      {
       "kind": "action",
       "id": 36975,
       "from": 110
      },
      {
       "kind": "action",
       "id": 3558
      },
      {
       "kind": "action",
       "id": 7404
      },
      {
       "kind": "action",
       "id": 7557
      },
      {
       "kind": "action",
       "id": 25785
      },
      {
       "kind": "action",
       "id": 118
      },
      {
       "kind": "action",
       "id": 101
      },
      {
       "kind": "action",
       "id": 36977
      },
      {
       "kind": "action",
       "id": 7407,
       "from": 113
      },
      {
       "kind": "action",
       "id": 7406,
       "from": 100
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb2": {
     "job": [
      {
       "kind": "action",
       "id": 25783,
       "from": 106
      },
      {
       "kind": "action",
       "id": 16494,
       "from": 36974
      },
      {
       "kind": "action",
       "id": 117
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 3562
      },
      {
       "kind": "action",
       "id": 36976
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb3": {
     "job": [
      {
       "kind": "action",
       "id": 3559
      },
      {
       "kind": "action",
       "id": 114
      },
      {
       "kind": "action",
       "id": 116
      },
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 107
      },
      {
       "kind": "action",
       "id": 16496
      },
      null,
      null,
      null,
      {
       "kind": "other",
       "type": 29
      }
     ],
     "shared": null,
     "defaultSource": "job"
    },
    "hb4": {
     "job": [
      {
       "kind": "action",
       "id": 7408
      },
      {
       "kind": "action",
       "id": 7551
      },
      {
       "kind": "action",
       "id": 7405
      },
      {
       "kind": "other",
       "type": 10
      },
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 3560
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
     "job": [
      {
       "kind": "other",
       "type": 4
      },
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
      null
     ],
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
     "defaultSource": "job"
    },
    "hb6": {
     "job": [
      null,
      {
       "kind": "action",
       "id": 16495,
       "from": 97
      },
      {
       "kind": "action",
       "id": 7409,
       "from": 98
      },
      {
       "kind": "action",
       "id": 3558
      },
      {
       "kind": "action",
       "id": 36975,
       "from": 110
      },
      {
       "kind": "action",
       "id": 117
      },
      {
       "kind": "action",
       "id": 107
      },
      null,
      null,
      {
       "kind": "action",
       "id": 3559
      },
      {
       "kind": "action",
       "id": 114
      },
      {
       "kind": "action",
       "id": 116
      }
     ],
     "shared": [
      null,
      null,
      null,
      null,
      {
       "kind": "macro",
       "no": 346
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null
     ],
     "defaultSource": "job"
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
       "kind": "macro",
       "no": 259
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
       "kind": "macro",
       "no": 296
      },
      {
       "kind": "macro",
       "no": 297
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
       "kind": "macro",
       "no": 307
      },
      {
       "kind": "other",
       "type": 4
      },
      {
       "kind": "macro",
       "no": 259
      },
      {
       "kind": "macro",
       "no": 309
      },
      {
       "kind": "macro",
       "no": 310
      },
      {
       "kind": "macro",
       "no": 298
      },
      {
       "kind": "macro",
       "no": 299
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
       "kind": "macro",
       "no": 258
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
       "kind": "macro",
       "no": 257
      },
      {
       "kind": "macro",
       "no": 256
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
       "kind": "action",
       "id": 36975
      },
      null
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
       "kind": "action",
       "id": 7408
      },
      {
       "kind": "action",
       "id": 16494
      },
      {
       "kind": "action",
       "id": 7405
      },
      {
       "kind": "action",
       "id": 3562
      },
      {
       "kind": "action",
       "id": 3558
      },
      {
       "kind": "action",
       "id": 3560
      },
      {
       "kind": "action",
       "id": 7404
      },
      {
       "kind": "action",
       "id": 3559
      },
      {
       "kind": "action",
       "id": 117
      },
      {
       "kind": "action",
       "id": 118
      },
      {
       "kind": "action",
       "id": 3561
      },
      {
       "kind": "action",
       "id": 116
      },
      {
       "kind": "action",
       "id": 7548
      },
      {
       "kind": "action",
       "id": 107
      },
      {
       "kind": "action",
       "id": 7407,
       "from": 113
      },
      {
       "kind": "action",
       "id": 114
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
      null,
      null,
      null,
      null,
      {
       "kind": "action",
       "id": 16496
      },
      null
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
   "gauges": {
    "JobHudBRD0": {
     "index": 322,
     "name": "ソングゲージ",
     "x": 20,
     "y": 65.74073791503906,
     "scale": 1.600000023841858,
     "anchor": 3,
     "w": 260,
     "h": 160
    }
   },
   "gauge": {
    "names": [
     "JobHudBRD0"
    ],
    "layouts": {
     "JobHudBRD0": {
      "partLists": [
       {
        "id": 1,
        "parts": [
         {
          "texture": "JobHudBRD0",
          "u": 1,
          "v": 1,
          "w": 114,
          "h": 106
         },
         {
          "texture": "JobHudBRD0",
          "u": 117,
          "v": 1,
          "w": 114,
          "h": 106
         },
         {
          "texture": "JobHudBRD0",
          "u": 233,
          "v": 1,
          "w": 114,
          "h": 106
         },
         {
          "texture": "JobHudBRD0",
          "u": 1,
          "v": 109,
          "w": 78,
          "h": 98
         },
         {
          "texture": "JobHudBRD0",
          "u": 82,
          "v": 109,
          "w": 78,
          "h": 98
         },
         {
          "texture": "JobHudBRD0",
          "u": 163,
          "v": 109,
          "w": 78,
          "h": 98
         },
         {
          "texture": "JobHudBRD0",
          "u": 349,
          "v": 1,
          "w": 160,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 213,
          "v": 208,
          "w": 18,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 233,
          "v": 208,
          "w": 18,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 253,
          "v": 208,
          "w": 18,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 273,
          "v": 208,
          "w": 18,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 349,
          "v": 53,
          "w": 160,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 349,
          "v": 105,
          "w": 160,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 349,
          "v": 157,
          "w": 160,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 244,
          "v": 109,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudBRD0",
          "u": 278,
          "v": 109,
          "w": 32,
          "h": 32
         },
         {
          "texture": "JobHudBRD0",
          "u": 244,
          "v": 143,
          "w": 32,
          "h": 60
         },
         {
          "texture": "JobHudBRD0",
          "u": 278,
          "v": 143,
          "w": 32,
          "h": 60
         },
         {
          "texture": "JobHudBRD0",
          "u": 195,
          "v": 271,
          "w": 72,
          "h": 32
         },
         {
          "texture": "JobHudBRD0",
          "u": 188,
          "v": 308,
          "w": 92,
          "h": 92
         },
         {
          "texture": "JobHudBRD0",
          "u": 192,
          "v": 262,
          "w": 86,
          "h": 5
         },
         {
          "texture": "JobHudBRD0",
          "u": 116,
          "v": 434,
          "w": 36,
          "h": 46
         },
         {
          "texture": "JobHudBRD0",
          "u": 152,
          "v": 402,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBRD0",
          "u": 180,
          "v": 402,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBRD0",
          "u": 208,
          "v": 402,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBRD0",
          "u": 154,
          "v": 296,
          "w": 30,
          "h": 30
         },
         {
          "texture": "JobHudBRD0",
          "u": 154,
          "v": 326,
          "w": 30,
          "h": 30
         },
         {
          "texture": "JobHudBRD0",
          "u": 0,
          "v": 434,
          "w": 116,
          "h": 46
         },
         {
          "texture": "JobHudBRD0",
          "u": 218,
          "v": 458,
          "w": 6,
          "h": 12
         }
        ]
       },
       {
        "id": 2,
        "parts": [
         {
          "texture": "JobHudBRD0",
          "u": 1,
          "v": 208,
          "w": 160,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 312,
          "v": 109,
          "w": 30,
          "h": 32
         },
         {
          "texture": "JobHudBRD0",
          "u": 311,
          "v": 142,
          "w": 26,
          "h": 34
         },
         {
          "texture": "JobHudBRD0",
          "u": 312,
          "v": 178,
          "w": 20,
          "h": 30
         },
         {
          "texture": "JobHudBRD0",
          "u": 163,
          "v": 209,
          "w": 48,
          "h": 48
         },
         {
          "texture": "JobHudBRD0",
          "u": 155,
          "v": 260,
          "w": 34,
          "h": 34
         },
         {
          "texture": "JobHudBRD0",
          "u": 193,
          "v": 262,
          "w": 84,
          "h": 6
         },
         {
          "texture": "JobHudBRD0",
          "u": 207,
          "v": 276,
          "w": 29,
          "h": 15
         },
         {
          "texture": "JobHudBRD0",
          "u": 1,
          "v": 259,
          "w": 152,
          "h": 52
         },
         {
          "texture": "JobHudBRD0",
          "u": 1,
          "v": 313,
          "w": 152,
          "h": 52
         },
         {
          "texture": "JobHudBRD0",
          "u": 301,
          "v": 219,
          "w": 42,
          "h": 127
         },
         {
          "texture": "JobHudBRD0",
          "u": 345,
          "v": 217,
          "w": 35,
          "h": 103
         },
         {
          "texture": "JobHudBRD0",
          "u": 385,
          "v": 209,
          "w": 62,
          "h": 146
         },
         {
          "texture": "JobHudBRD0",
          "u": 449,
          "v": 209,
          "w": 62,
          "h": 146
         },
         {
          "texture": "JobHudBRD0",
          "u": 163,
          "v": 208,
          "w": 50,
          "h": 50
         }
        ]
       },
       {
        "id": 3,
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
        "id": 4,
        "parts": [
         {
          "texture": "JobHudBRD0",
          "u": 152,
          "v": 430,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBRD0",
          "u": 180,
          "v": 430,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBRD0",
          "u": 208,
          "v": 430,
          "w": 28,
          "h": 28
         },
         {
          "texture": "JobHudBRD0",
          "u": 152,
          "v": 458,
          "w": 22,
          "h": 22
         },
         {
          "texture": "JobHudBRD0",
          "u": 174,
          "v": 458,
          "w": 22,
          "h": 22
         },
         {
          "texture": "JobHudBRD0",
          "u": 196,
          "v": 458,
          "w": 22,
          "h": 22
         }
        ]
       },
       {
        "id": 5,
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
       },
       {
        "id": 6,
        "parts": [
         {
          "texture": "Parameter_Gauge2",
          "u": 0,
          "v": 0,
          "w": 160,
          "h": 16
         },
         {
          "texture": "Parameter_Gauge2",
          "u": 0,
          "v": 16,
          "w": 160,
          "h": 16
         },
         {
          "texture": "Parameter_Gauge2",
          "u": 0,
          "v": 32,
          "w": 160,
          "h": 16
         },
         {
          "texture": "Parameter_Gauge2",
          "u": 0,
          "v": 48,
          "w": 160,
          "h": 16
         },
         {
          "texture": "Parameter_Gauge2",
          "u": 0,
          "v": 64,
          "w": 160,
          "h": 16
         },
         {
          "texture": "Parameter_Gauge",
          "u": 50,
          "v": 1,
          "w": 8,
          "h": 8
         }
        ]
       },
       {
        "id": 7,
        "parts": [
         {
          "texture": "JobHudBRD0",
          "u": 280,
          "v": 356,
          "w": 226,
          "h": 46
         },
         {
          "texture": "JobHudBRD0",
          "u": 0,
          "v": 402,
          "w": 152,
          "h": 8
         },
         {
          "texture": "JobHudBRD0",
          "u": 0,
          "v": 410,
          "w": 152,
          "h": 8
         },
         {
          "texture": "JobHudBRD0",
          "u": 0,
          "v": 418,
          "w": 152,
          "h": 8
         },
         {
          "texture": "JobHudBRD0",
          "u": 0,
          "v": 426,
          "w": 152,
          "h": 8
         },
         {
          "texture": "JobHudBRD0",
          "u": 280,
          "v": 402,
          "w": 226,
          "h": 50
         },
         {
          "texture": "JobHudBRD0",
          "u": 218,
          "v": 458,
          "w": 6,
          "h": 12
         }
        ]
       }
      ],
      "components": [
       {
        "id": 1001,
        "type": 5,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 124,
          "h": 36,
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
          "type": 4,
          "x": 0,
          "y": 9,
          "w": 124,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "add": [
           -255,
           60,
           70
          ],
          "partListId": 7,
          "partId": 4,
          "nineGrid": [
           2,
           2,
           2,
           2
          ]
         },
         {
          "id": 3,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 9,
          "w": 124,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "add": [
           100,
           100,
           100
          ],
          "partListId": 7,
          "partId": 2,
          "nineGrid": [
           2,
           2,
           2,
           2
          ]
         },
         {
          "id": 4,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 9,
          "w": 124,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 7,
          "partId": 1,
          "nineGrid": [
           2,
           2,
           2,
           2
          ]
         },
         {
          "id": 5,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 9,
          "w": 124,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 7,
          "partId": 3,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1002,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 34,
          "h": 34,
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
          "w": 34,
          "h": 34,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 17,
          "originY": 17,
          "partListId": 2,
          "partId": 5,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1003,
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
          "partListId": 5,
          "partId": 0,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
          "parent": 1,
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
          "multiply": [
           80,
           80,
           80
          ],
          "add": [
           110,
           45,
           85
          ],
          "partListId": 5,
          "partId": 2,
          "nineGrid": [
           0,
           0,
           7,
           7
          ]
         },
         {
          "id": 4,
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
          "partListId": 5,
          "partId": 5,
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
           -7,
           -28,
           2
          ],
          "partListId": 3,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
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
          "id": 4,
          "parent": 3,
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
           -20,
           35,
           -140
          ],
          "partListId": 3,
          "partId": 1,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
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
          "partListId": 3,
          "partId": 0,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1005,
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
           -7,
           -28,
           2
          ],
          "partListId": 3,
          "partId": 2,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 3,
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
          "id": 4,
          "parent": 3,
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
           -25,
           10,
           130
          ],
          "partListId": 3,
          "partId": 1,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
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
          "partListId": 3,
          "partId": 0,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1006,
        "type": 5,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 160,
          "h": 16,
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
          "w": 160,
          "h": 16,
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
          "type": 4,
          "x": 120,
          "y": 4,
          "w": 6,
          "h": 8,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": -1,
          "rotation": 90,
          "originX": 0,
          "originY": 0,
          "partListId": 6,
          "partId": 5,
          "nineGrid": [
           0,
           0,
           2,
           2
          ]
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 160,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 6,
          "partId": 0,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 0,
          "w": 160,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 6,
          "originY": 0,
          "add": [
           -255,
           50,
           80
          ],
          "partListId": 6,
          "partId": 1,
          "nineGrid": [
           0,
           0,
           7,
           7
          ]
         },
         {
          "id": 6,
          "parent": 1,
          "type": 4,
          "x": 0,
          "y": 0,
          "w": 160,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 6,
          "originY": 0,
          "multiply": [
           80,
           80,
           80
          ],
          "partListId": 6,
          "partId": 2,
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
          "type": 4,
          "x": 0,
          "y": 0,
          "w": 160,
          "h": 16,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 6,
          "originY": 0,
          "partListId": 6,
          "partId": 3,
          "nineGrid": [
           0,
           0,
           7,
           7
          ]
         },
         {
          "id": 8,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 160,
          "h": 16,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 6,
          "partId": 4,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1007,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 28,
          "h": 28,
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
          "w": 28,
          "h": 28,
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
          "w": 28,
          "h": 28,
          "alpha": 231,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "add": [
           81,
           81,
           81
          ]
         },
         {
          "id": 4,
          "parent": 3,
          "type": 2,
          "x": 3,
          "y": 3,
          "w": 22,
          "h": 22,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 11,
          "originY": 11,
          "partListId": 4,
          "partId": 3,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 28,
          "h": 28,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 14,
          "originY": 14
         },
         {
          "id": 6,
          "parent": 5,
          "type": 2,
          "x": 3,
          "y": 3,
          "w": 22,
          "h": 22,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 11,
          "originY": 11,
          "partListId": 4,
          "partId": 3,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1008,
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
          "type": 1002,
          "x": -8,
          "y": 19,
          "w": 34,
          "h": 34,
          "alpha": 255,
          "scaleX": 0.6,
          "scaleY": 0.6,
          "rotation": 0,
          "originX": 0,
          "originY": 0
         },
         {
          "id": 3,
          "parent": 1,
          "type": 1002,
          "x": 3,
          "y": -44,
          "w": 34,
          "h": 34,
          "alpha": 0,
          "scaleX": 0.8,
          "scaleY": 0.8,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           0,
           200,
           -200
          ]
         },
         {
          "id": 4,
          "parent": 1,
          "type": 1002,
          "x": -3,
          "y": 0,
          "w": 34,
          "h": 34,
          "alpha": 218,
          "scaleX": 0.7,
          "scaleY": 0.7,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           -50,
           100,
           -200
          ]
         },
         {
          "id": 5,
          "parent": 1,
          "type": 2,
          "x": -8,
          "y": -8,
          "w": 48,
          "h": 48,
          "alpha": 255,
          "scaleX": 0.3,
          "scaleY": 0.3,
          "rotation": 0,
          "originX": 24,
          "originY": 24,
          "add": [
           -200,
           100,
           0
          ],
          "partListId": 2,
          "partId": 4,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 16,
          "originY": 16,
          "partListId": 1,
          "partId": 15,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 7,
          "parent": 1,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 16,
          "originY": 16,
          "partListId": 1,
          "partId": 15,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 8,
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
          "originX": 16,
          "originY": 16,
          "partListId": 1,
          "partId": 14,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1009,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 60,
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
          "x": 16,
          "y": -76,
          "w": 62,
          "h": 146,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 0,
          "rotation": -50,
          "originX": 31,
          "originY": 127,
          "add": [
           100,
           100,
           200
          ],
          "partListId": 2,
          "partId": 13,
          "flipH": false,
          "flipV": true
         },
         {
          "id": 3,
          "parent": 1,
          "type": 2,
          "x": -16,
          "y": 27,
          "w": 84,
          "h": 6,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 42,
          "originY": 3,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           -200,
           -200,
           200
          ],
          "partListId": 2,
          "partId": 6,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 1,
          "type": 2,
          "x": 2,
          "y": 6,
          "w": 48,
          "h": 48,
          "alpha": 255,
          "scaleX": 0.3,
          "scaleY": 0.3,
          "rotation": 0,
          "originX": 24,
          "originY": 24,
          "multiply": [
           50,
           50,
           50
          ],
          "add": [
           100,
           -100,
           100
          ],
          "partListId": 2,
          "partId": 4,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 2,
          "x": 10,
          "y": 0,
          "w": 32,
          "h": 60,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": -45,
          "originX": 16,
          "originY": 30,
          "partListId": 1,
          "partId": 17,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 2,
          "x": 10,
          "y": 0,
          "w": 32,
          "h": 60,
          "alpha": 0,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": -45,
          "originX": 16,
          "originY": 30,
          "partListId": 1,
          "partId": 17,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 7,
          "parent": 1,
          "type": 2,
          "x": 10,
          "y": 0,
          "w": 32,
          "h": 60,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": -45,
          "originX": 16,
          "originY": 30,
          "partListId": 1,
          "partId": 16,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1010,
        "type": 0,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 28,
          "h": 28,
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
          "w": 28,
          "h": 28,
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
          "type": 2,
          "x": -11,
          "y": -11,
          "w": 50,
          "h": 50,
          "alpha": 255,
          "scaleX": 0.4,
          "scaleY": 0.4,
          "rotation": 0,
          "originX": 25,
          "originY": 25,
          "add": [
           -255,
           0,
           255
          ],
          "partListId": 2,
          "partId": 14,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 4,
          "parent": 2,
          "type": 2,
          "x": -11,
          "y": -11,
          "w": 50,
          "h": 50,
          "alpha": 51,
          "scaleX": 0.8,
          "scaleY": 0.8,
          "rotation": 0,
          "originX": 25,
          "originY": 25,
          "add": [
           100,
           -255,
           100
          ],
          "partListId": 2,
          "partId": 14,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 5,
          "parent": 1,
          "type": 2,
          "x": -1,
          "y": -1,
          "w": 30,
          "h": 30,
          "alpha": 0,
          "scaleX": 1.5,
          "scaleY": 1.5,
          "rotation": 0,
          "originX": 15,
          "originY": 15,
          "add": [
           255,
           -100,
           -255
          ],
          "partListId": 1,
          "partId": 26,
          "flipH": false,
          "flipV": false
         },
         {
          "id": 6,
          "parent": 1,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 28,
          "h": 28,
          "alpha": 63,
          "scaleX": 1.75,
          "scaleY": 1.75,
          "rotation": 0,
          "originX": 14,
          "originY": 14,
          "multiply": [
           75,
           100,
           100
          ],
          "add": [
           37,
           37,
           3
          ]
         },
         {
          "id": 7,
          "parent": 6,
          "type": 2,
          "x": 0,
          "y": 0,
          "w": 28,
          "h": 28,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "add": [
           210,
           100,
           160
          ],
          "partListId": 1,
          "partId": 22,
          "flipH": false,
          "flipV": false
         }
        ]
       },
       {
        "id": 1011,
        "type": 19,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 100,
          "h": 28,
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
          "y": 4,
          "w": 80,
          "h": 20,
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
          "w": 100,
          "h": 28,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 18,
          "nineGrid": [
           15,
           15,
           20,
           20
          ]
         }
        ]
       },
       {
        "id": 1012,
        "type": 19,
        "nodes": [
         {
          "id": 1,
          "parent": 0,
          "type": 1,
          "x": 0,
          "y": 0,
          "w": 70,
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
          "x": 19,
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
          "w": 70,
          "h": 40,
          "alpha": 255,
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "originX": 0,
          "originY": 0,
          "partListId": 1,
          "partId": 18,
          "nineGrid": [
           15,
           15,
           30,
           30
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
        "w": 260,
        "h": 160,
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
        "w": 260,
        "h": 160,
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
        "type": 3,
        "x": 50,
        "y": 20,
        "w": 170,
        "h": 20,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 4,
        "parent": 2,
        "type": 3,
        "x": 162,
        "y": 80,
        "w": 50,
        "h": 22,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 5,
        "parent": 2,
        "type": 4,
        "x": 50,
        "y": 14,
        "w": 180,
        "h": 32,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 18,
        "nineGrid": [
         15,
         15,
         30,
         30
        ]
       },
       {
        "id": 6,
        "parent": 2,
        "type": 4,
        "x": 158,
        "y": 70,
        "w": 80,
        "h": 40,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 18,
        "nineGrid": [
         15,
         15,
         30,
         30
        ]
       },
       {
        "id": 7,
        "parent": 2,
        "type": 1,
        "x": 210,
        "y": 6,
        "w": 72,
        "h": 116,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 8,
        "parent": 7,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 72,
        "h": 116,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 9,
        "parent": 8,
        "type": 2,
        "x": -2,
        "y": -10,
        "w": 62,
        "h": 146,
        "alpha": 0,
        "scaleX": 0.6,
        "scaleY": 0.6,
        "rotation": 0,
        "originX": 31,
        "originY": 73,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -200,
         -200,
         200
        ],
        "partListId": 2,
        "partId": 13,
        "flipH": true,
        "flipV": true
       },
       {
        "id": 10,
        "parent": 8,
        "type": 2,
        "x": 0,
        "y": -13,
        "w": 62,
        "h": 146,
        "alpha": 170,
        "scaleX": 0.6,
        "scaleY": 0.6,
        "rotation": 0,
        "originX": 31,
        "originY": 73,
        "multiply": [
         83,
         83,
         83
        ],
        "add": [
         -166,
         -200,
         133
        ],
        "partListId": 2,
        "partId": 12,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 11,
        "parent": 8,
        "type": 2,
        "x": 8,
        "y": -22,
        "w": 62,
        "h": 146,
        "alpha": 0,
        "scaleX": 0.6,
        "scaleY": 0.6,
        "rotation": 0,
        "originX": 31,
        "originY": 73,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         0,
         0,
         200
        ],
        "partListId": 2,
        "partId": 13,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 12,
        "parent": 8,
        "type": 2,
        "x": 14,
        "y": 4,
        "w": 30,
        "h": 32,
        "alpha": 0,
        "scaleX": 0.6,
        "scaleY": 0.6,
        "rotation": 0,
        "originX": 15,
        "originY": 16,
        "multiply": [
         85,
         85,
         85
        ],
        "add": [
         250,
         0,
         250
        ],
        "partListId": 2,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 13,
        "parent": 8,
        "type": 2,
        "x": 36,
        "y": 29,
        "w": 26,
        "h": 34,
        "alpha": 170,
        "scaleX": 0.5,
        "scaleY": 0.5,
        "rotation": 10,
        "originX": 13,
        "originY": 17,
        "multiply": [
         70,
         70,
         70
        ],
        "add": [
         250,
         60,
         -100
        ],
        "partListId": 2,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 14,
        "parent": 8,
        "type": 2,
        "x": 16,
        "y": 74,
        "w": 20,
        "h": 30,
        "alpha": 191,
        "scaleX": 0.6,
        "scaleY": 0.6,
        "rotation": 0,
        "originX": 10,
        "originY": 15,
        "multiply": [
         85,
         85,
         85
        ],
        "add": [
         80,
         180,
         -100
        ],
        "partListId": 2,
        "partId": 3,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 15,
        "parent": 8,
        "type": 1010,
        "x": 22,
        "y": 14,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 14,
        "originY": 14
       },
       {
        "id": 16,
        "parent": 8,
        "type": 1010,
        "x": 22,
        "y": 40,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 14,
        "originY": 14
       },
       {
        "id": 17,
        "parent": 8,
        "type": 1010,
        "x": 22,
        "y": 66,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 14,
        "originY": 14
       },
       {
        "id": 18,
        "parent": 8,
        "type": 2,
        "x": 22,
        "y": 14,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 22,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 19,
        "parent": 8,
        "type": 2,
        "x": 22,
        "y": 40,
        "w": 28,
        "h": 28,
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
        "id": 20,
        "parent": 8,
        "type": 2,
        "x": 22,
        "y": 66,
        "w": 28,
        "h": 28,
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
        "id": 21,
        "parent": 8,
        "type": 2,
        "x": 60,
        "y": 0,
        "w": 116,
        "h": 46,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 90,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 27,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 22,
        "parent": 8,
        "type": 2,
        "x": 0,
        "y": 8,
        "w": 36,
        "h": 92,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 21,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 23,
        "parent": 2,
        "type": 1,
        "x": 16,
        "y": 98,
        "w": 226,
        "h": 48,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 24,
        "parent": 23,
        "type": 1012,
        "x": 143,
        "y": 26,
        "w": 74,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 25,
        "parent": 23,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 226,
        "h": 46,
        "alpha": 71,
        "scaleX": 1.016,
        "scaleY": 1.02,
        "rotation": 0,
        "originX": 113,
        "originY": 17,
        "partListId": 7,
        "partId": 5,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 26,
        "parent": 23,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 226,
        "h": 48,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 27,
        "parent": 26,
        "type": 4,
        "x": 152,
        "y": 25,
        "w": 6,
        "h": 11,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 7,
        "partId": 6,
        "nineGrid": [
         2,
         2,
         0,
         0
        ]
       },
       {
        "id": 28,
        "parent": 23,
        "type": 2,
        "x": 0,
        "y": 2,
        "w": 226,
        "h": 46,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 7,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 29,
        "parent": 23,
        "type": 2,
        "x": 20,
        "y": 22,
        "w": 86,
        "h": 10,
        "alpha": 193,
        "scaleX": 0.6,
        "scaleY": 1.26,
        "rotation": 0,
        "originX": 43,
        "originY": 3,
        "partListId": 1,
        "partId": 20,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 30,
        "parent": 23,
        "type": 1001,
        "x": 56,
        "y": 11,
        "w": 124,
        "h": 36,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 31,
        "parent": 2,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 260,
        "h": 160,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "add": [
         255,
         255,
         255
        ],
        "partListId": 0,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 32,
        "parent": 2,
        "type": 1,
        "x": 60,
        "y": 37,
        "w": 200,
        "h": 64,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 33,
        "parent": 32,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 167,
        "h": 52,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "multiply": [
         70,
         70,
         70
        ],
        "add": [
         250,
         60,
         30
        ]
       },
       {
        "id": 34,
        "parent": 33,
        "type": 2,
        "x": 98,
        "y": 10,
        "w": 26,
        "h": 34,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 13,
        "originY": 17,
        "partListId": 2,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 35,
        "parent": 33,
        "type": 2,
        "x": 137,
        "y": 13,
        "w": 20,
        "h": 30,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 10,
        "originY": 15,
        "partListId": 2,
        "partId": 3,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 36,
        "parent": 33,
        "type": 2,
        "x": 48,
        "y": -1,
        "w": 30,
        "h": 32,
        "alpha": 127,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 15,
        "originY": 16,
        "partListId": 2,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 37,
        "parent": 33,
        "type": 2,
        "x": -21,
        "y": 13,
        "w": 26,
        "h": 34,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 13,
        "originY": 17,
        "partListId": 2,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 38,
        "parent": 33,
        "type": 2,
        "x": 15,
        "y": 0,
        "w": 152,
        "h": 52,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 76,
        "originY": 26,
        "multiply": [
         50,
         50,
         50
        ],
        "partListId": 2,
        "partId": 9,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 39,
        "parent": 33,
        "type": 2,
        "x": -2,
        "y": -10,
        "w": 152,
        "h": 52,
        "alpha": 116,
        "scaleX": 1.2166667,
        "scaleY": 1.2166667,
        "rotation": 0,
        "originX": 76,
        "originY": 26,
        "multiply": [
         49,
         49,
         49
        ],
        "add": [
         1,
         1,
         -1
        ],
        "partListId": 2,
        "partId": 8,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 40,
        "parent": 33,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 50,
        "alpha": 255,
        "scaleX": 1.0842105,
        "scaleY": 1.0842105,
        "rotation": 0,
        "originX": 80,
        "originY": 25,
        "multiply": [
         70,
         70,
         70
        ],
        "add": [
         0,
         10,
         -20
        ],
        "partListId": 2,
        "partId": 0,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 41,
        "parent": 2,
        "type": 1,
        "x": 60,
        "y": 50,
        "w": 113,
        "h": 109,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 42,
        "parent": 41,
        "type": 1002,
        "x": 0,
        "y": 0,
        "w": 34,
        "h": 34,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 43,
        "parent": 41,
        "type": 1002,
        "x": 0,
        "y": 0,
        "w": 34,
        "h": 34,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 44,
        "parent": 41,
        "type": 1002,
        "x": 0,
        "y": 0,
        "w": 34,
        "h": 34,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 45,
        "parent": 41,
        "type": 1002,
        "x": 0,
        "y": 0,
        "w": 34,
        "h": 34,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 46,
        "parent": 41,
        "type": 2,
        "x": 15,
        "y": 23,
        "w": 84,
        "h": 6,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 2,
        "partId": 6,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 47,
        "parent": 41,
        "type": 2,
        "x": 15,
        "y": 23,
        "w": 29,
        "h": 15,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 2,
        "partId": 7,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 48,
        "parent": 41,
        "type": 2,
        "x": 15,
        "y": 23,
        "w": 84,
        "h": 6,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 2,
        "partId": 6,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 49,
        "parent": 41,
        "type": 2,
        "x": 72,
        "y": 0,
        "w": 32,
        "h": 60,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -45,
        "originX": 16,
        "originY": 30,
        "partListId": 1,
        "partId": 17,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 50,
        "parent": 41,
        "type": 2,
        "x": 42,
        "y": 0,
        "w": 32,
        "h": 60,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -45,
        "originX": 16,
        "originY": 30,
        "partListId": 1,
        "partId": 17,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 51,
        "parent": 41,
        "type": 2,
        "x": 10,
        "y": 0,
        "w": 32,
        "h": 60,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": -45,
        "originX": 16,
        "originY": 30,
        "partListId": 1,
        "partId": 17,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 52,
        "parent": 41,
        "type": 2,
        "x": 23,
        "y": -37,
        "w": 62,
        "h": 146,
        "alpha": 127,
        "scaleX": 0.8,
        "scaleY": 0.8,
        "rotation": 90,
        "originX": 31,
        "originY": 73,
        "multiply": [
         75,
         75,
         75
        ],
        "add": [
         0,
         10,
         200
        ],
        "partListId": 2,
        "partId": 13,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 53,
        "parent": 41,
        "type": 2,
        "x": 24,
        "y": -54,
        "w": 62,
        "h": 146,
        "alpha": 114,
        "scaleX": 0.8,
        "scaleY": 0.8,
        "rotation": 90,
        "originX": 31,
        "originY": 73,
        "multiply": [
         75,
         75,
         75
        ],
        "add": [
         -150,
         -200,
         150
        ],
        "partListId": 2,
        "partId": 12,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 54,
        "parent": 41,
        "type": 2,
        "x": 26,
        "y": -41,
        "w": 62,
        "h": 146,
        "alpha": 0,
        "scaleX": 0.8,
        "scaleY": 0.8,
        "rotation": 90,
        "originX": 31,
        "originY": 73,
        "multiply": [
         50,
         50,
         50
        ],
        "add": [
         -200,
         -200,
         200
        ],
        "partListId": 2,
        "partId": 13,
        "flipH": true,
        "flipV": true
       },
       {
        "id": 55,
        "parent": 41,
        "type": 1008,
        "x": 1,
        "y": 8,
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
        "id": 56,
        "parent": 41,
        "type": 1008,
        "x": 19,
        "y": 8,
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
        "id": 57,
        "parent": 41,
        "type": 1008,
        "x": 36,
        "y": 8,
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
        "id": 58,
        "parent": 41,
        "type": 1008,
        "x": 54,
        "y": 8,
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
        "id": 59,
        "parent": 41,
        "type": 2,
        "x": 0,
        "y": 6,
        "w": 78,
        "h": 28,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 15,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 60,
        "parent": 41,
        "type": 1009,
        "x": 0,
        "y": 0,
        "w": 50,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 61,
        "parent": 41,
        "type": 1009,
        "x": 32,
        "y": 0,
        "w": 50,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 62,
        "parent": 41,
        "type": 1009,
        "x": 63,
        "y": 0,
        "w": 50,
        "h": 60,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 63,
        "parent": 41,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 94,
        "h": 42,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 14,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 64,
        "parent": 2,
        "type": 1,
        "x": 61,
        "y": 36,
        "w": 160,
        "h": 50,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 65,
        "parent": 64,
        "type": 1,
        "x": -4,
        "y": -3,
        "w": 18,
        "h": 50,
        "alpha": 255,
        "scaleX": 0.8,
        "scaleY": 0.8,
        "rotation": 0,
        "originX": 9,
        "originY": 25
       },
       {
        "id": 66,
        "parent": 65,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 18,
        "h": 50,
        "alpha": 191,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 8,
        "originY": 50,
        "partListId": 1,
        "partId": 9,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 67,
        "parent": 65,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 18,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 8,
        "originY": 50,
        "partListId": 1,
        "partId": 8,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 68,
        "parent": 65,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 18,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 8,
        "originY": 0,
        "partListId": 1,
        "partId": 7,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 69,
        "parent": 64,
        "type": 1,
        "x": -160,
        "y": 0,
        "w": 160,
        "h": 50,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 50
       },
       {
        "id": 70,
        "parent": 69,
        "type": 1,
        "x": 160,
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
        "id": 71,
        "parent": 70,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 50,
        "alpha": 229,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 11,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 72,
        "parent": 2,
        "type": 2,
        "x": 0,
        "y": 4,
        "w": 92,
        "h": 92,
        "alpha": 51,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 1,
        "partId": 19,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 73,
        "parent": 2,
        "type": 2,
        "x": 61,
        "y": 36,
        "w": 160,
        "h": 50,
        "alpha": 51,
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
        "id": 74,
        "parent": 2,
        "type": 1,
        "x": 0,
        "y": -10,
        "w": 270,
        "h": 120,
        "alpha": 51,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 75,
        "parent": 74,
        "type": 2,
        "x": -9,
        "y": 9,
        "w": 114,
        "h": 106,
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
        "id": 76,
        "parent": 74,
        "type": 2,
        "x": 184,
        "y": 2,
        "w": 78,
        "h": 98,
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
        "id": 77,
        "parent": 1,
        "type": 1,
        "x": 33,
        "y": 33,
        "w": 194,
        "h": 95,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 97,
        "originY": 47
       },
       {
        "id": 78,
        "parent": 77,
        "type": 1011,
        "x": 0,
        "y": 0,
        "w": 100,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 79,
        "parent": 77,
        "type": 1,
        "x": 166,
        "y": 13,
        "w": 28,
        "h": 72,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 80,
        "parent": 79,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 28,
        "h": 72,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 81,
        "parent": 80,
        "type": 1007,
        "x": 0,
        "y": 0,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 82,
        "parent": 80,
        "type": 1007,
        "x": 0,
        "y": 22,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 83,
        "parent": 80,
        "type": 1007,
        "x": 0,
        "y": 44,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 84,
        "parent": 80,
        "type": 2,
        "x": 0,
        "y": 0,
        "w": 28,
        "h": 28,
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
        "id": 85,
        "parent": 80,
        "type": 2,
        "x": 0,
        "y": 44,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 4,
        "partId": 2,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 86,
        "parent": 80,
        "type": 2,
        "x": 0,
        "y": 22,
        "w": 28,
        "h": 28,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0,
        "partListId": 4,
        "partId": 1,
        "flipH": false,
        "flipV": false
       },
       {
        "id": 87,
        "parent": 77,
        "type": 1,
        "x": 10,
        "y": 39,
        "w": 166,
        "h": 56,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 88,
        "parent": 87,
        "type": 1012,
        "x": 109,
        "y": 16,
        "w": 57,
        "h": 40,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 89,
        "parent": 87,
        "type": 1006,
        "x": 0,
        "y": 12,
        "w": 160,
        "h": 16,
        "alpha": 0,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 90,
        "parent": 77,
        "type": 1,
        "x": 10,
        "y": 25,
        "w": 92,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 91,
        "parent": 90,
        "type": 1,
        "x": 0,
        "y": 0,
        "w": 92,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 92,
        "parent": 91,
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
        "id": 93,
        "parent": 91,
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
        "id": 94,
        "parent": 91,
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
        "id": 95,
        "parent": 91,
        "type": 1004,
        "x": 60,
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
        "id": 96,
        "parent": 91,
        "type": 1005,
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
        "id": 97,
        "parent": 91,
        "type": 1005,
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
        "id": 98,
        "parent": 91,
        "type": 1005,
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
        "id": 99,
        "parent": 77,
        "type": 1012,
        "x": 118,
        "y": 22,
        "w": 57,
        "h": 40,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 100,
        "parent": 77,
        "type": 1,
        "x": 10,
        "y": 16,
        "w": 160,
        "h": 46,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 101,
        "parent": 100,
        "type": 1003,
        "x": 0,
        "y": 0,
        "w": 160,
        "h": 32,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       },
       {
        "id": 102,
        "parent": 1,
        "type": 8,
        "x": 0,
        "y": 0,
        "w": 270,
        "h": 130,
        "alpha": 255,
        "scaleX": 1,
        "scaleY": 1,
        "rotation": 0,
        "originX": 0,
        "originY": 0
       }
      ]
     }
    },
    "textures": {
     "JobHudBRD0": {
      "path": "../public/icons/job-gauges/textures/JobHudBRD0.png",
      "w": 1024,
      "h": 960,
      "scale": 2
     },
     "JobHudSimple_StackA": {
      "path": "../public/icons/job-gauges/textures/JobHudSimple_StackA.png",
      "w": 128,
      "h": 128,
      "scale": 2
     },
     "Parameter_Gauge": {
      "path": "../public/icons/job-gauges/textures/Parameter_Gauge.png",
      "w": 320,
      "h": 304,
      "scale": 2
     },
     "Parameter_Gauge2": {
      "path": "../public/icons/job-gauges/textures/Parameter_Gauge2.png",
      "w": 320,
      "h": 160,
      "scale": 2
     }
    },
    "sizes": {
     "JobHudBRD0": [
      260,
      160
     ]
    }
   },
   "dmgUp": {
    "猛者の撃": 15
   },
   "upgrade": {
    "97": 16495,
    "98": 7409,
    "100": 7406,
    "106": 25783,
    "110": 36975,
    "113": 7407,
    "36974": 16494
   },
   "jobSet": 23,
   "buttonsAll": [
    101,
    107,
    112,
    114,
    116,
    117,
    118,
    3558,
    3559,
    3560,
    3561,
    3562,
    7405,
    7406,
    7407,
    7408,
    7409,
    16494,
    16495,
    16496,
    25783,
    25785,
    36975,
    36976,
    36977
   ],
   "unplaced": [
    112
   ],
   "replaceGroups": {
    "3559": [
     7404
    ],
    "16496": [
     25784
    ]
   },
   "splitDetected": [
    "3559"
   ]
  }
 },
 "npc": {
  "tank": {
   "abbr": "PLD",
   "name": "ナイト",
   "icon": "../public/icons/jobs/PLD.png"
  },
  "healer": {
   "abbr": "WHM",
   "name": "白魔道士",
   "icon": "../public/icons/jobs/WHM.png"
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
 "macros": {
  "chr": [
   {
    "icon": 7537,
    "cmds": [
     {
      "id": 7537,
      "target": "<2>",
      "at": 0
     }
    ]
   },
   {
    "icon": 27,
    "cmds": [
     {
      "id": 27,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 7382,
    "cmds": [
     {
      "id": 7382,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7382,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 7382,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 7533,
    "cmds": [
     {
      "id": 7533,
      "target": "<t>",
      "at": 0
     }
    ]
   },
   null,
   null,
   {
    "icon": 7393,
    "cmds": [
     {
      "id": 7393,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7393,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3541,
    "cmds": [
     {
      "id": 3541,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3541,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 25754,
    "cmds": [
     {
      "id": 25754,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 25754,
      "target": null,
      "at": 0
     }
    ]
   },
   null,
   {
    "icon": 3603,
    "cmds": [
     {
      "id": 3603,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 16464,
    "cmds": [
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<2>",
      "at": 0
     }
    ]
   },
   {
    "icon": 16464,
    "cmds": [
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16464,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 16151,
    "cmds": [
     {
      "id": 16151,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 16161,
    "cmds": [
     {
      "id": 16161,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16161,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3639,
    "cmds": [
     {
      "id": 3639,
      "target": "<me>",
      "at": 0
     }
    ]
   },
   {
    "icon": 43,
    "cmds": [
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     },
     {
      "id": 43,
      "target": "<me>",
      "at": 0
     }
    ]
   },
   {
    "icon": 16151,
    "cmds": [
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     },
     {
      "id": 16151,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 16161,
    "cmds": [
     {
      "id": 16161,
      "target": "<2>",
      "at": 0
     }
    ]
   },
   {
    "icon": 25867,
    "cmds": [
     {
      "id": 25867,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 25867,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 7571,
    "cmds": [
     {
      "id": 7571,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 120,
    "cmds": [
     {
      "id": 120,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 120,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 135,
    "cmds": [
     {
      "id": 135,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 135,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 137,
    "cmds": [
     {
      "id": 137,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 137,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 140,
    "cmds": [
     {
      "id": 140,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 137,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 16531,
    "cmds": [
     {
      "id": 16531,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16531,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 7432,
    "cmds": [
     {
      "id": 7432,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7432,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3570,
    "cmds": [
     {
      "id": 3570,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3570,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3594,
    "cmds": [
     {
      "id": 3594,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3594,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3614,
    "cmds": [
     {
      "id": 3614,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3614,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 125,
    "cmds": [
     {
      "id": 125,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 190,
    "cmds": [
     {
      "id": 190,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 190,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 185,
    "cmds": [
     {
      "id": 185,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 185,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 189,
    "cmds": [
     {
      "id": 189,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 189,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 7434,
    "cmds": [
     {
      "id": 7434,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7434,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7434,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7434,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 166,
    "cmds": [
     {
      "id": 167,
      "target": "<t>",
      "at": 0
     },
     {
      "id": 167,
      "target": "<tt>",
      "at": 0
     },
     {
      "id": 167,
      "target": "<t>",
      "at": 0
     },
     {
      "id": 166,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3585,
    "cmds": [
     {
      "id": 3585,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3585,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 7437,
    "cmds": [
     {
      "id": 7437,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7437,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3610,
    "cmds": [
     {
      "id": 3610,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3610,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 25873,
    "cmds": [
     {
      "id": 25873,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 25873,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 7568,
    "cmds": [
     {
      "id": 7568,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7568,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3595,
    "cmds": [
     {
      "id": 3595,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3595,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 16557,
    "cmds": [
     {
      "id": 16557,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16557,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3612,
    "cmds": [
     {
      "id": 3612,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3612,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 16556,
    "cmds": [
     {
      "id": 16556,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 16556,
      "target": null,
      "at": 0
     }
    ]
   },
   null,
   {
    "icon": 24284,
    "cmds": [
     {
      "id": 24284,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24284,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 24285,
    "cmds": [
     {
      "id": 24285,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24285,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 24296,
    "cmds": [
     {
      "id": 24296,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24296,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 24303,
    "cmds": [
     {
      "id": 24303,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24303,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 173,
    "cmds": [
     {
      "id": 173,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 24305,
    "cmds": [
     {
      "id": 24305,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24305,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 24295,
    "cmds": [
     {
      "id": 24295,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24295,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 24317,
    "cmds": [
     {
      "id": 24317,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 24317,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 25861,
    "cmds": [
     {
      "id": 25861,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 25861,
      "target": null,
      "at": 0
     }
    ]
   },
   null,
   null,
   null,
   null,
   null,
   {
    "icon": 24287,
    "cmds": [
     {
      "id": 24287,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   null,
   null,
   {
    "icon": 2262,
    "cmds": [
     {
      "id": 2262,
      "target": "<t>",
      "at": 0
     },
     {
      "id": 2262,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 25762,
    "cmds": [
     {
      "id": 25762,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 25762,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 3561,
    "cmds": [
     {
      "id": 3561,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 3561,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 16006,
    "cmds": [
     {
      "id": 16006,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 155,
    "cmds": [
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 155,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 7523,
    "cmds": [
     {
      "id": 7523,
      "target": "<mo>",
      "at": 0
     }
    ]
   },
   {
    "icon": 7514,
    "cmds": [
     {
      "id": 7514,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 7514,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 37019,
    "cmds": [
     {
      "id": 37019,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 37019,
      "target": null,
      "at": 0
     }
    ]
   },
   {
    "icon": 37020,
    "cmds": [
     {
      "id": 37020,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 37021,
      "target": "<mo>",
      "at": 0
     },
     {
      "id": 37020,
      "target": null,
      "at": 0
     },
     {
      "id": 37021,
      "target": null,
      "at": 0
     }
    ]
   },
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
   null
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
 "camera": {
  "left": [
   {
    "code": "ArrowLeft",
    "shift": false,
    "ctrl": false,
    "alt": false
   }
  ],
  "right": [
   {
    "code": "ArrowRight",
    "shift": false,
    "ctrl": false,
    "alt": false
   }
  ],
  "reset": [
   {
    "code": "End",
    "shift": true,
    "ctrl": true,
    "alt": false
   }
  ],
  "up": [
   {
    "code": "ArrowUp",
    "shift": false,
    "ctrl": true,
    "alt": false
   }
  ],
  "down": [
   {
    "code": "ArrowDown",
    "shift": false,
    "ctrl": true,
    "alt": false
   }
  ]
 },
 "target": {
  "tot": [
   {
    "code": "F24",
    "shift": false,
    "ctrl": false,
    "alt": false
   }
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
   "GLA,PLD"
  ],
  "15": [
   "ライオットソード",
   "GLA,PLD"
  ],
  "16": [
   "シールドバッシュ",
   "GLA,PLD"
  ],
  "17": [
   "センチネル",
   "GLA,PLD"
  ],
  "20": [
   "ファイト・オア・フライト",
   "GLA,PLD"
  ],
  "21": [
   "レイジ・オブ・ハルオーネ",
   "GLA,PLD"
  ],
  "22": [
   "ブルワーク",
   "PLD"
  ],
  "23": [
   "サークル・オブ・ドゥーム",
   "GLA,PLD"
  ],
  "24": [
   "シールドロブ",
   "GLA,PLD"
  ],
  "27": [
   "かばう",
   "PLD"
  ],
  "28": [
   "アイアンウィル",
   "GLA,PLD"
  ],
  "29": [
   "スピリッツウィズイン",
   "PLD"
  ],
  "30": [
   "インビンシブル",
   "PLD"
  ],
  "31": [
   "ヘヴィスウィング",
   "MRD,WAR"
  ],
  "37": [
   "メイム",
   "MRD,WAR"
  ],
  "38": [
   "バーサク",
   "MRD,WAR"
  ],
  "40": [
   "スリル・オブ・バトル",
   "MRD,WAR"
  ],
  "41": [
   "オーバーパワー",
   "MRD,WAR"
  ],
  "42": [
   "シュトルムヴィント",
   "MRD,WAR"
  ],
  "43": [
   "ホルムギャング",
   "MRD,WAR"
  ],
  "44": [
   "ヴェンジェンス",
   "MRD,WAR"
  ],
  "45": [
   "シュトルムブレハ",
   "MRD,WAR"
  ],
  "46": [
   "トマホーク",
   "MRD,WAR"
  ],
  "48": [
   "ディフェンダー",
   "MRD,WAR"
  ],
  "49": [
   "原初の魂",
   "WAR"
  ],
  "51": [
   "スチールサイクロン",
   "WAR"
  ],
  "52": [
   "ウォークライ",
   "WAR"
  ],
  "53": [
   "連撃",
   "PGL,MNK"
  ],
  "54": [
   "正拳突き",
   "PGL,MNK"
  ],
  "56": [
   "崩拳",
   "PGL,MNK"
  ],
  "61": [
   "双掌打",
   "PGL,MNK"
  ],
  "62": [
   "壊神衝",
   "PGL,MNK"
  ],
  "65": [
   "マントラ",
   "PGL,MNK"
  ],
  "66": [
   "破砕拳",
   "PGL,MNK"
  ],
  "69": [
   "踏鳴",
   "MNK"
  ],
  "70": [
   "地烈斬",
   "MNK"
  ],
  "74": [
   "双竜脚",
   "PGL,MNK"
  ],
  "75": [
   "トゥルースラスト",
   "LNC,DRG"
  ],
  "78": [
   "ボーパルスラスト",
   "LNC,DRG"
  ],
  "83": [
   "ライフサージ",
   "LNC,DRG"
  ],
  "84": [
   "フルスラスト",
   "LNC,DRG"
  ],
  "85": [
   "ランスチャージ",
   "LNC,DRG"
  ],
  "86": [
   "ドゥームスパイク",
   "DRG"
  ],
  "87": [
   "ディセムボウル",
   "LNC,DRG"
  ],
  "88": [
   "桜華狂咲",
   "LNC,DRG"
  ],
  "90": [
   "ピアシングタロン",
   "LNC,DRG"
  ],
  "92": [
   "ジャンプ",
   "DRG"
  ],
  "94": [
   "イルーシブジャンプ",
   "DRG"
  ],
  "96": [
   "ドラゴンダイブ",
   "DRG"
  ],
  "97": [
   "ヘヴィショット",
   "ARC,BRD"
  ],
  "98": [
   "ストレートショット",
   "ARC,BRD"
  ],
  "100": [
   "ベノムバイト",
   "ARC,BRD"
  ],
  "101": [
   "猛者の撃",
   "ARC,BRD"
  ],
  "106": [
   "クイックノック",
   "ARC,BRD"
  ],
  "107": [
   "乱れ撃ち",
   "ARC,BRD"
  ],
  "110": [
   "ブラッドレッター",
   "ARC,BRD"
  ],
  "112": [
   "リペリングショット",
   "ARC,BRD"
  ],
  "113": [
   "ウィンドバイト",
   "ARC,BRD"
  ],
  "114": [
   "賢人のバラード",
   "BRD"
  ],
  "116": [
   "軍神のパイオン",
   "BRD"
  ],
  "117": [
   "レイン・オブ・デス",
   "BRD"
  ],
  "118": [
   "バトルボイス",
   "BRD"
  ],
  "119": [
   "ストーン",
   "CNJ,WHM"
  ],
  "120": [
   "ケアル",
   "CNJ,WHM"
  ],
  "121": [
   "エアロ",
   "CNJ,WHM"
  ],
  "124": [
   "メディカ",
   "CNJ,WHM"
  ],
  "125": [
   "レイズ",
   "CNJ,WHM"
  ],
  "127": [
   "ストンラ",
   "CNJ,WHM"
  ],
  "131": [
   "ケアルガ",
   "WHM"
  ],
  "132": [
   "エアロラ",
   "CNJ,WHM"
  ],
  "133": [
   "メディカラ",
   "CNJ,WHM"
  ],
  "135": [
   "ケアルラ",
   "CNJ,WHM"
  ],
  "136": [
   "神速魔",
   "WHM"
  ],
  "137": [
   "リジェネ",
   "WHM"
  ],
  "139": [
   "ホーリー",
   "WHM"
  ],
  "140": [
   "ベネディクション",
   "WHM"
  ],
  "141": [
   "ファイア",
   "THM,BLM"
  ],
  "142": [
   "ブリザド",
   "THM,BLM"
  ],
  "144": [
   "サンダー",
   "THM,BLM"
  ],
  "147": [
   "ファイラ",
   "THM,BLM"
  ],
  "149": [
   "トランス",
   "THM,BLM"
  ],
  "152": [
   "ファイガ",
   "THM,BLM"
  ],
  "153": [
   "サンダガ",
   "BLM"
  ],
  "154": [
   "ブリザガ",
   "BLM"
  ],
  "155": [
   "エーテリアルステップ",
   "THM,BLM"
  ],
  "156": [
   "コラプス",
   "THM,BLM"
  ],
  "157": [
   "マバリア",
   "THM,BLM"
  ],
  "158": [
   "マナフォント",
   "BLM"
  ],
  "159": [
   "フリーズ",
   "BLM"
  ],
  "162": [
   "フレア",
   "BLM"
  ],
  "163": [
   "ルイン",
   "ACN,SMN"
  ],
  "166": [
   "エーテルフロー",
   "SCH"
  ],
  "167": [
   "エナジードレイン",
   "SCH"
  ],
  "172": [
   "ルインラ",
   "ACN,SMN"
  ],
  "173": [
   "リザレク",
   "ACN,SMN,SCH"
  ],
  "181": [
   "ミアズマバースト",
   "ACN,SMN"
  ],
  "185": [
   "鼓舞激励の策",
   "SCH"
  ],
  "186": [
   "士気高揚の策",
   "SCH"
  ],
  "188": [
   "野戦治療の陣",
   "SCH"
  ],
  "189": [
   "生命活性法",
   "SCH"
  ],
  "190": [
   "フィジク",
   "SCH"
  ],
  "2240": [
   "双刃旋",
   "ROG,NIN"
  ],
  "2241": [
   "残影",
   "ROG,NIN"
  ],
  "2242": [
   "風断ち",
   "ROG,NIN"
  ],
  "2245": [
   "かくれる",
   "ROG,NIN"
  ],
  "2246": [
   "終撃",
   "NIN"
  ],
  "2247": [
   "投刃",
   "ROG,NIN"
  ],
  "2248": [
   "ぶんどる",
   "ROG,NIN"
  ],
  "2254": [
   "血花五月雨",
   "ROG,NIN"
  ],
  "2255": [
   "旋風刃",
   "ROG,NIN"
  ],
  "2258": [
   "だまし討ち",
   "ROG,NIN"
  ],
  "2259": [
   "天の印",
   "NIN"
  ],
  "2260": [
   "忍術",
   "NIN"
  ],
  "2261": [
   "地の印",
   "NIN"
  ],
  "2262": [
   "縮地",
   "NIN"
  ],
  "2263": [
   "人の印",
   "NIN"
  ],
  "2264": [
   "活殺自在",
   "NIN"
  ],
  "2864": [
   "オートタレット・ルーク",
   "MCH"
  ],
  "2866": [
   "スプリットショット",
   "MCH"
  ],
  "2868": [
   "スラッグショット",
   "MCH"
  ],
  "2870": [
   "スプレッドショット",
   "MCH"
  ],
  "2872": [
   "ホットショット",
   "MCH"
  ],
  "2873": [
   "クリーンショット",
   "MCH"
  ],
  "2874": [
   "ガウスラウンド",
   "MCH"
  ],
  "2876": [
   "整備",
   "MCH"
  ],
  "2878": [
   "ワイルドファイア",
   "MCH"
  ],
  "2887": [
   "ウェポンブレイク",
   "MCH"
  ],
  "2890": [
   "リコシェット",
   "MCH"
  ],
  "3538": [
   "ゴアブレード",
   "PLD"
  ],
  "3539": [
   "ロイヤルアソリティ",
   "PLD"
  ],
  "3540": [
   "ディヴァインヴェール",
   "PLD"
  ],
  "3541": [
   "クレメンシー",
   "PLD"
  ],
  "3542": [
   "シェルトロン",
   "PLD"
  ],
  "3547": [
   "陰陽闘気斬",
   "MNK"
  ],
  "3549": [
   "フェルクリーヴ",
   "WAR"
  ],
  "3550": [
   "デシメート",
   "WAR"
  ],
  "3551": [
   "原初の直感",
   "WAR"
  ],
  "3552": [
   "エクリブリウム",
   "WAR"
  ],
  "3554": [
   "竜牙竜爪",
   "DRG"
  ],
  "3555": [
   "ゲイルスコグル",
   "DRG"
  ],
  "3556": [
   "竜尾大車輪",
   "DRG"
  ],
  "3557": [
   "バトルリタニー",
   "DRG"
  ],
  "3558": [
   "エンピリアルアロー",
   "BRD"
  ],
  "3559": [
   "旅神のメヌエット",
   "BRD"
  ],
  "3560": [
   "アイアンジョー",
   "BRD"
  ],
  "3561": [
   "時神のピーアン",
   "BRD"
  ],
  "3562": [
   "サイドワインダー",
   "BRD"
  ],
  "3563": [
   "強甲破点突",
   "NIN"
  ],
  "3566": [
   "夢幻三段",
   "NIN"
  ],
  "3568": [
   "ストンガ",
   "WHM"
  ],
  "3569": [
   "アサイラム",
   "WHM"
  ],
  "3570": [
   "テトラグラマトン",
   "WHM"
  ],
  "3571": [
   "アサイズ",
   "WHM"
  ],
  "3573": [
   "黒魔紋",
   "BLM"
  ],
  "3576": [
   "ブリザジャ",
   "BLM"
  ],
  "3577": [
   "ファイジャ",
   "BLM"
  ],
  "3578": [
   "ペインフレア",
   "SMN"
  ],
  "3579": [
   "ルインガ",
   "SMN"
  ],
  "3581": [
   "トランス・バハムート",
   "SMN"
  ],
  "3583": [
   "不撓不屈の策",
   "SCH"
  ],
  "3584": [
   "気炎法",
   "SCH"
  ],
  "3585": [
   "展開戦術",
   "SCH"
  ],
  "3586": [
   "応急戦術",
   "SCH"
  ],
  "3587": [
   "転化",
   "SCH"
  ],
  "3594": [
   "ベネフィク",
   "AST"
  ],
  "3595": [
   "アスペクト・ベネフィク",
   "AST"
  ],
  "3596": [
   "マレフィク",
   "AST"
  ],
  "3598": [
   "マレフィラ",
   "AST"
  ],
  "3599": [
   "コンバス",
   "AST"
  ],
  "3600": [
   "ヘリオス",
   "AST"
  ],
  "3601": [
   "アスペクト・ヘリオス",
   "AST"
  ],
  "3603": [
   "アセンド",
   "AST"
  ],
  "3606": [
   "ライトスピード",
   "AST"
  ],
  "3608": [
   "コンバラ",
   "AST"
  ],
  "3610": [
   "ベネフィラ",
   "AST"
  ],
  "3612": [
   "シナストリー",
   "AST"
  ],
  "3613": [
   "運命の輪",
   "AST"
  ],
  "3614": [
   "ディグニティ",
   "AST"
  ],
  "3615": [
   "グラビデ",
   "AST"
  ],
  "3617": [
   "ハードスラッシュ",
   "DRK"
  ],
  "3621": [
   "アンリーシュ",
   "DRK"
  ],
  "3623": [
   "サイフォンストライク",
   "DRK"
  ],
  "3624": [
   "アンメンド",
   "DRK"
  ],
  "3625": [
   "ブラッドウェポン",
   "DRK"
  ],
  "3629": [
   "グリットスタンス",
   "DRK"
  ],
  "3632": [
   "ソウルイーター",
   "DRK"
  ],
  "3634": [
   "ダークマインド",
   "DRK"
  ],
  "3636": [
   "シャドウウォール",
   "DRK"
  ],
  "3638": [
   "リビングデッド",
   "DRK"
  ],
  "3639": [
   "ソルトアース",
   "DRK"
  ],
  "3641": [
   "アビサルドレイン",
   "DRK"
  ],
  "3643": [
   "カーヴ・アンド・スピット",
   "DRK"
  ],
  "4262": [
   "演武",
   "MNK"
  ],
  "7381": [
   "トータルエクリプス",
   "GLA,PLD"
  ],
  "7382": [
   "インターベンション",
   "PLD"
  ],
  "7383": [
   "レクイエスカット",
   "PLD"
  ],
  "7384": [
   "ホーリースピリット",
   "PLD"
  ],
  "7385": [
   "パッセージ・オブ・アームズ",
   "PLD"
  ],
  "7386": [
   "オンスロート",
   "WAR"
  ],
  "7387": [
   "アップヒーバル",
   "WAR"
  ],
  "7388": [
   "シェイクオフ",
   "WAR"
  ],
  "7389": [
   "原初の解放",
   "WAR"
  ],
  "7390": [
   "ブラッドデリリアム",
   "DRK"
  ],
  "7391": [
   "クワイタス",
   "DRK"
  ],
  "7392": [
   "ブラッドスピラー",
   "DRK"
  ],
  "7393": [
   "ブラックナイト",
   "DRK"
  ],
  "7394": [
   "金剛の極意",
   "MNK"
  ],
  "7395": [
   "紅蓮の極意",
   "MNK"
  ],
  "7396": [
   "桃園結義",
   "MNK"
  ],
  "7397": [
   "ソニックスラスト",
   "DRG"
  ],
  "7399": [
   "ミラージュダイブ",
   "DRG"
  ],
  "7400": [
   "ナーストレンド",
   "DRG"
  ],
  "7401": [
   "口寄せの術・大蝦蟇",
   "NIN"
  ],
  "7402": [
   "六道輪廻",
   "NIN"
  ],
  "7403": [
   "天地人",
   "NIN"
  ],
  "7404": [
   "ピッチパーフェクト",
   "BRD"
  ],
  "7405": [
   "トルバドゥール",
   "BRD"
  ],
  "7406": [
   "コースティックバイト",
   "BRD"
  ],
  "7407": [
   "ストームバイト",
   "BRD"
  ],
  "7408": [
   "地神のミンネ",
   "BRD"
  ],
  "7409": [
   "リフルジェントアロー",
   "BRD"
  ],
  "7410": [
   "ヒートブラスト",
   "MCH"
  ],
  "7411": [
   "ヒートスプリットショット",
   "MCH"
  ],
  "7412": [
   "ヒートスラッグショット",
   "MCH"
  ],
  "7413": [
   "ヒートクリーンショット",
   "MCH"
  ],
  "7414": [
   "バレルヒーター",
   "MCH"
  ],
  "7415": [
   "オーバードライブ・ルーク",
   "MCH"
  ],
  "7418": [
   "フレイムスロアー",
   "MCH"
  ],
  "7419": [
   "ラインズステップ",
   "BLM"
  ],
  "7420": [
   "サンダジャ",
   "BLM"
  ],
  "7421": [
   "三連魔",
   "BLM"
  ],
  "7422": [
   "ファウル",
   "BLM"
  ],
  "7426": [
   "ルインジャ",
   "SMN"
  ],
  "7427": [
   "サモン・バハムート",
   "SMN"
  ],
  "7429": [
   "エンキンドル・バハムート",
   "SMN"
  ],
  "7430": [
   "シンエアー",
   "WHM"
  ],
  "7431": [
   "ストンジャ",
   "WHM"
  ],
  "7432": [
   "ディヴァインベニゾン",
   "WHM"
  ],
  "7433": [
   "インドゥルゲンティア",
   "WHM"
  ],
  "7434": [
   "深謀遠慮の策",
   "SCH"
  ],
  "7435": [
   "魔炎法",
   "SCH"
  ],
  "7436": [
   "連環計",
   "SCH"
  ],
  "7437": [
   "エーテルパクト",
   "SCH"
  ],
  "7439": [
   "アーサリースター",
   "AST"
  ],
  "7442": [
   "マレフィガ",
   "AST"
  ],
  "7447": [
   "サンダラ",
   "THM,BLM"
  ],
  "7477": [
   "刃風",
   "SAM"
  ],
  "7478": [
   "陣風",
   "SAM"
  ],
  "7479": [
   "士風",
   "SAM"
  ],
  "7480": [
   "雪風",
   "SAM"
  ],
  "7481": [
   "月光",
   "SAM"
  ],
  "7482": [
   "花車",
   "SAM"
  ],
  "7483": [
   "風雅",
   "SAM"
  ],
  "7484": [
   "満月",
   "SAM"
  ],
  "7485": [
   "桜花",
   "SAM"
  ],
  "7486": [
   "燕飛",
   "SAM"
  ],
  "7490": [
   "必殺剣・震天",
   "SAM"
  ],
  "7491": [
   "必殺剣・九天",
   "SAM"
  ],
  "7492": [
   "必殺剣・暁天",
   "SAM"
  ],
  "7493": [
   "必殺剣・夜天",
   "SAM"
  ],
  "7495": [
   "葉隠",
   "SAM"
  ],
  "7496": [
   "必殺剣・紅蓮",
   "SAM"
  ],
  "7497": [
   "黙想",
   "SAM"
  ],
  "7498": [
   "心眼",
   "SAM"
  ],
  "7499": [
   "明鏡止水",
   "SAM"
  ],
  "7503": [
   "ジョルト",
   "RDM"
  ],
  "7504": [
   "リポスト",
   "RDM"
  ],
  "7505": [
   "ヴァルサンダー",
   "RDM"
  ],
  "7506": [
   "コル・ア・コル",
   "RDM"
  ],
  "7507": [
   "ヴァルエアロ",
   "RDM"
  ],
  "7509": [
   "スキャッター",
   "RDM"
  ],
  "7510": [
   "ヴァルファイア",
   "RDM"
  ],
  "7511": [
   "ヴァルストーン",
   "RDM"
  ],
  "7512": [
   "ツヴェルクハウ",
   "RDM"
  ],
  "7513": [
   "ムーリネ",
   "RDM"
  ],
  "7514": [
   "ヴァルケアル",
   "RDM"
  ],
  "7515": [
   "デプラスマン",
   "RDM"
  ],
  "7516": [
   "ルドゥブルマン",
   "RDM"
  ],
  "7517": [
   "フレッシュ",
   "RDM"
  ],
  "7518": [
   "アクセラレーション",
   "RDM"
  ],
  "7519": [
   "コントルシクスト",
   "RDM"
  ],
  "7520": [
   "エンボルデン",
   "RDM"
  ],
  "7521": [
   "マナフィケーション",
   "RDM"
  ],
  "7523": [
   "ヴァルレイズ",
   "RDM"
  ],
  "7524": [
   "ジョルラ",
   "RDM"
  ],
  "7531": [
   "ランパート",
   "GLA,MRD,PLD,WAR,DRK,GNB"
  ],
  "7533": [
   "挑発",
   "GLA,MRD,PLD,WAR,DRK,GNB"
  ],
  "7535": [
   "リプライザル",
   "GLA,MRD,PLD,WAR,DRK,GNB"
  ],
  "7537": [
   "シャーク",
   "GLA,MRD,PLD,WAR,DRK,GNB"
  ],
  "7538": [
   "インタージェクト",
   "GLA,MRD,PLD,WAR,DRK,GNB"
  ],
  "7540": [
   "ロウブロウ",
   "GLA,MRD,PLD,WAR,DRK,GNB"
  ],
  "7541": [
   "内丹",
   "PGL,LNC,ARC,MNK,DRG,BRD,ROG,NIN,MCH,SAM,DNC,RPR,VPR"
  ],
  "7542": [
   "ブラッドバス",
   "PGL,LNC,MNK,DRG,ROG,NIN,SAM,RPR,VPR"
  ],
  "7546": [
   "トゥルーノース",
   "PGL,LNC,MNK,DRG,ROG,NIN,SAM,RPR,VPR"
  ],
  "7548": [
   "アームズレングス",
   "GLA,PGL,MRD,LNC,ARC,PLD,MNK,WAR,DRG,BRD,ROG,NIN,MCH,DRK,SAM,GNB,DNC,RPR,VPR"
  ],
  "7549": [
   "牽制",
   "PGL,LNC,MNK,DRG,ROG,NIN,SAM,RPR,VPR"
  ],
  "7551": [
   "ヘッドグレイズ",
   "ARC,BRD,MCH,DNC"
  ],
  "7553": [
   "フットグレイズ",
   "ARC,BRD,MCH,DNC"
  ],
  "7554": [
   "レッググレイズ",
   "ARC,BRD,MCH,DNC"
  ],
  "7557": [
   "プロトン",
   "ARC,BRD,MCH,DNC"
  ],
  "7559": [
   "堅実魔",
   "CNJ,THM,WHM,BLM,ACN,SMN,SCH,AST,RDM,BLU,SGE,PCT"
  ],
  "7560": [
   "アドル",
   "THM,BLM,ACN,SMN,RDM,BLU,PCT"
  ],
  "7561": [
   "迅速魔",
   "CNJ,THM,WHM,BLM,ACN,SMN,SCH,AST,RDM,BLU,SGE,PCT"
  ],
  "7562": [
   "ルーシッドドリーム",
   "CNJ,THM,WHM,BLM,ACN,SMN,SCH,AST,RDM,BLU,SGE,PCT"
  ],
  "7568": [
   "エスナ",
   "CNJ,WHM,SCH,AST,SGE"
  ],
  "7571": [
   "救出",
   "CNJ,WHM,SCH,AST,SGE"
  ],
  "7863": [
   "レッグスウィープ",
   "PGL,LNC,MNK,DRG,ROG,NIN,SAM,RPR,VPR"
  ],
  "7867": [
   "居合術",
   "SAM"
  ],
  "11383": [
   "鼻息",
   "BLU"
  ],
  "11384": [
   "4トンズ",
   "BLU"
  ],
  "11385": [
   "水鉄砲",
   "BLU"
  ],
  "11386": [
   "苦悶の歌",
   "BLU"
  ],
  "11387": [
   "高圧電流",
   "BLU"
  ],
  "11388": [
   "臭い息",
   "BLU"
  ],
  "11389": [
   "狂乱",
   "BLU"
  ],
  "11390": [
   "アクアブレス",
   "BLU"
  ],
  "11391": [
   "プレーンクラッカー",
   "BLU"
  ],
  "11392": [
   "どんぐり爆弾",
   "BLU"
  ],
  "11393": [
   "怒髪天",
   "BLU"
  ],
  "11394": [
   "マインドブラスト",
   "BLU"
  ],
  "11395": [
   "吸血",
   "BLU"
  ],
  "11396": [
   "爆弾投げ",
   "BLU"
  ],
  "11397": [
   "針千本",
   "BLU"
  ],
  "11398": [
   "ドリルキャノン",
   "BLU"
  ],
  "11399": [
   "怪視線",
   "BLU"
  ],
  "11400": [
   "とぎたて",
   "BLU"
  ],
  "11401": [
   "ルーム",
   "BLU"
  ],
  "11402": [
   "火炎放射",
   "BLU"
  ],
  "11403": [
   "猫だまし",
   "BLU"
  ],
  "11404": [
   "グラワー",
   "BLU"
  ],
  "11405": [
   "ミサイル",
   "BLU"
  ],
  "11406": [
   "ホワイトウィンド",
   "BLU"
  ],
  "11407": [
   "ファイナルスピア",
   "BLU"
  ],
  "11408": [
   "自爆",
   "BLU"
  ],
  "11409": [
   "融合",
   "BLU"
  ],
  "11410": [
   "ガマの脂",
   "BLU"
  ],
  "11411": [
   "ガードオファ",
   "BLU"
  ],
  "11412": [
   "スティッキータン",
   "BLU"
  ],
  "11413": [
   "テールスクリュー",
   "BLU"
  ],
  "11414": [
   "レベル5石化",
   "BLU"
  ],
  "11415": [
   "月の笛",
   "BLU"
  ],
  "11416": [
   "死の宣告",
   "BLU"
  ],
  "11417": [
   "マイティガード",
   "BLU"
  ],
  "11418": [
   "アイススパイク",
   "BLU"
  ],
  "11419": [
   "氷結の咆哮",
   "BLU"
  ],
  "11420": [
   "雷電の咆哮",
   "BLU"
  ],
  "11421": [
   "不思議な光",
   "BLU"
  ],
  "11422": [
   "インクジェット",
   "BLU"
  ],
  "11423": [
   "フライングサーディン",
   "BLU"
  ],
  "11424": [
   "超硬化",
   "BLU"
  ],
  "11425": [
   "ファイアアンゴン",
   "BLU"
  ],
  "11426": [
   "フェザーレイン",
   "BLU"
  ],
  "11427": [
   "エラプション",
   "BLU"
  ],
  "11428": [
   "マウンテンバスター",
   "BLU"
  ],
  "11429": [
   "ショックストライク",
   "BLU"
  ],
  "11430": [
   "氷雪乱舞",
   "BLU"
  ],
  "11431": [
   "水神のヴェール",
   "BLU"
  ],
  "15989": [
   "カスケード",
   "DNC"
  ],
  "15990": [
   "ファウンテン",
   "DNC"
  ],
  "15991": [
   "リバースカスケード",
   "DNC"
  ],
  "15992": [
   "ファウンテンフォール",
   "DNC"
  ],
  "15993": [
   "ウィンドミル",
   "DNC"
  ],
  "15994": [
   "ブレードシャワー",
   "DNC"
  ],
  "15995": [
   "ライジングウィンドミル",
   "DNC"
  ],
  "15996": [
   "ブラッドシャワー",
   "DNC"
  ],
  "15997": [
   "スタンダードステップ",
   "DNC"
  ],
  "15998": [
   "テクニカルステップ",
   "DNC"
  ],
  "16005": [
   "剣の舞い",
   "DNC"
  ],
  "16006": [
   "クローズドポジション",
   "DNC"
  ],
  "16007": [
   "扇の舞い【序】",
   "DNC"
  ],
  "16008": [
   "扇の舞い【破】",
   "DNC"
  ],
  "16009": [
   "扇の舞い【急】",
   "DNC"
  ],
  "16010": [
   "アン・アヴァン",
   "DNC"
  ],
  "16011": [
   "攻めのタンゴ",
   "DNC"
  ],
  "16012": [
   "守りのサンバ",
   "DNC"
  ],
  "16013": [
   "フラリッシュ",
   "DNC"
  ],
  "16014": [
   "インプロビゼーション",
   "DNC"
  ],
  "16015": [
   "癒やしのワルツ",
   "DNC"
  ],
  "16137": [
   "キーンエッジ",
   "GNB"
  ],
  "16138": [
   "ノー・マーシー",
   "GNB"
  ],
  "16139": [
   "ブルータルシェル",
   "GNB"
  ],
  "16140": [
   "カモフラージュ",
   "GNB"
  ],
  "16141": [
   "デーモンスライス",
   "GNB"
  ],
  "16142": [
   "ロイヤルガード",
   "GNB"
  ],
  "16143": [
   "サンダーバレット",
   "GNB"
  ],
  "16144": [
   "デンジャーゾーン",
   "GNB"
  ],
  "16145": [
   "ソリッドバレル",
   "GNB"
  ],
  "16146": [
   "ビートファング",
   "GNB"
  ],
  "16148": [
   "ネビュラ",
   "GNB"
  ],
  "16149": [
   "デーモンスローター",
   "GNB"
  ],
  "16151": [
   "オーロラ",
   "GNB"
  ],
  "16152": [
   "ボーライド",
   "GNB"
  ],
  "16153": [
   "ソニックブレイク",
   "GNB"
  ],
  "16155": [
   "コンティニュエーション",
   "GNB"
  ],
  "16159": [
   "バウショック",
   "GNB"
  ],
  "16160": [
   "ハート・オブ・ライト",
   "GNB"
  ],
  "16161": [
   "ハート・オブ・ストーン",
   "GNB"
  ],
  "16162": [
   "バーストストライク",
   "GNB"
  ],
  "16163": [
   "フェイテッドサークル",
   "GNB"
  ],
  "16164": [
   "ブラッドソイル",
   "GNB"
  ],
  "16165": [
   "ブラスティングゾーン",
   "GNB"
  ],
  "16230": [
   "フィジク",
   "ACN,SMN"
  ],
  "16457": [
   "プロミネンス",
   "PLD"
  ],
  "16458": [
   "ホーリーサークル",
   "PLD"
  ],
  "16459": [
   "コンフィテオル",
   "PLD"
  ],
  "16460": [
   "ロイエ",
   "PLD"
  ],
  "16461": [
   "インターヴィーン",
   "PLD"
  ],
  "16462": [
   "ミスリルテンペスト",
   "WAR"
  ],
  "16464": [
   "原初の猛り",
   "WAR"
  ],
  "16466": [
   "暗黒の波動",
   "DRK"
  ],
  "16467": [
   "暗黒の剣",
   "DRK"
  ],
  "16468": [
   "ストルワートソウル",
   "DRK"
  ],
  "16469": [
   "漆黒の波動",
   "DRK"
  ],
  "16470": [
   "漆黒の剣",
   "DRK"
  ],
  "16471": [
   "ダークミッショナリー",
   "DRK"
  ],
  "16472": [
   "影身具現",
   "DRK"
  ],
  "16473": [
   "四面脚",
   "MNK"
  ],
  "16474": [
   "万象闘気圏",
   "MNK"
  ],
  "16476": [
   "六合星導脚",
   "MNK"
  ],
  "16477": [
   "クルザントーメント",
   "DRG"
  ],
  "16478": [
   "ハイジャンプ",
   "DRG"
  ],
  "16480": [
   "スターダイバー",
   "DRG"
  ],
  "16481": [
   "必殺剣・閃影",
   "SAM"
  ],
  "16482": [
   "意気衝天",
   "SAM"
  ],
  "16483": [
   "燕返し",
   "SAM"
  ],
  "16487": [
   "照破",
   "SAM"
  ],
  "16488": [
   "八卦無刃殺",
   "NIN"
  ],
  "16489": [
   "命水",
   "NIN"
  ],
  "16493": [
   "分身の術",
   "NIN"
  ],
  "16494": [
   "シャドウバイト",
   "BRD"
  ],
  "16495": [
   "バーストショット",
   "BRD"
  ],
  "16496": [
   "エイペックスアロー",
   "BRD"
  ],
  "16497": [
   "オートボウガン",
   "MCH"
  ],
  "16498": [
   "ドリル",
   "MCH"
  ],
  "16499": [
   "バイオブラスト",
   "MCH"
  ],
  "16500": [
   "エアアンカー",
   "MCH"
  ],
  "16501": [
   "オートマトン・クイーン",
   "MCH"
  ],
  "16502": [
   "オーバードライブ・クイーン",
   "MCH"
  ],
  "16505": [
   "デスペア",
   "BLM"
  ],
  "16506": [
   "アンブラルソウル",
   "BLM"
  ],
  "16507": [
   "ゼノグロシー",
   "BLM"
  ],
  "16508": [
   "エナジードレイン",
   "ACN,SMN"
  ],
  "16510": [
   "エナジーサイフォン",
   "SMN"
  ],
  "16511": [
   "アウトバースト",
   "ACN,SMN"
  ],
  "16524": [
   "ヴァルサンダラ",
   "RDM"
  ],
  "16525": [
   "ヴァルエアロラ",
   "RDM"
  ],
  "16526": [
   "インパクト",
   "RDM"
  ],
  "16527": [
   "アンガジェマン",
   "RDM"
  ],
  "16529": [
   "ルプリーズ",
   "RDM"
  ],
  "16531": [
   "ハート・オブ・ソラス",
   "WHM"
  ],
  "16532": [
   "ディア",
   "WHM"
  ],
  "16533": [
   "グレア",
   "WHM"
  ],
  "16534": [
   "ハート・オブ・ラプチャー",
   "WHM"
  ],
  "16535": [
   "ハート・オブ・ミゼリ",
   "WHM"
  ],
  "16536": [
   "テンパランス",
   "WHM"
  ],
  "16537": [
   "光の囁き",
   "SCH"
  ],
  "16538": [
   "フェイイルミネーション",
   "SCH"
  ],
  "16539": [
   "破陣法",
   "SCH"
  ],
  "16540": [
   "蠱毒法",
   "SCH"
  ],
  "16541": [
   "死炎法",
   "SCH"
  ],
  "16542": [
   "秘策",
   "SCH"
  ],
  "16543": [
   "フェイブレッシング",
   "SCH"
  ],
  "16545": [
   "サモン・セラフィム",
   "SCH"
  ],
  "16546": [
   "コンソレイション",
   "SCH"
  ],
  "16552": [
   "ディヴィネーション",
   "AST"
  ],
  "16553": [
   "星天対抗",
   "AST"
  ],
  "16554": [
   "コンバガ",
   "AST"
  ],
  "16555": [
   "マレフィジャ",
   "AST"
  ],
  "16556": [
   "星天交差",
   "AST"
  ],
  "16557": [
   "ホロスコープ",
   "AST"
  ],
  "16559": [
   "ニュートラルセクト",
   "AST"
  ],
  "16560": [
   "リポーズ",
   "CNJ,WHM,SCH,AST,SGE"
  ],
  "16889": [
   "タクティシャン",
   "MCH"
  ],
  "17209": [
   "ハイパーチャージ",
   "MCH"
  ],
  "17215": [
   "サモン・エオス",
   "SCH"
  ],
  "17864": [
   "バイオ",
   "SCH"
  ],
  "17865": [
   "バイオラ",
   "SCH"
  ],
  "17869": [
   "ルイン",
   "SCH"
  ],
  "17870": [
   "ルインラ",
   "SCH"
  ],
  "18295": [
   "アルペンドラフト",
   "BLU"
  ],
  "18296": [
   "プロティアンウェイブ",
   "BLU"
  ],
  "18297": [
   "猛吹雪",
   "BLU"
  ],
  "18298": [
   "エレクトロジェネシス",
   "BLU"
  ],
  "18299": [
   "カルトシュトラール",
   "BLU"
  ],
  "18300": [
   "アビサルトランスフィクション",
   "BLU"
  ],
  "18301": [
   "チャープ",
   "BLU"
  ],
  "18302": [
   "怪音波",
   "BLU"
  ],
  "18303": [
   "ポンポンケアル",
   "BLU"
  ],
  "18304": [
   "ゴブスキン",
   "BLU"
  ],
  "18305": [
   "マジックハンマー",
   "BLU"
  ],
  "18306": [
   "防御指示",
   "BLU"
  ],
  "18307": [
   "フロッグレッグ",
   "BLU"
  ],
  "18308": [
   "ソニックブーム",
   "BLU"
  ],
  "18309": [
   "ホイッスル",
   "BLU"
  ],
  "18310": [
   "ホワイトナイトツアー",
   "BLU"
  ],
  "18311": [
   "ブラックナイトツアー",
   "BLU"
  ],
  "18312": [
   "レベル5デス",
   "BLU"
  ],
  "18313": [
   "ランチャー",
   "BLU"
  ],
  "18314": [
   "パーペチュアルレイ",
   "BLU"
  ],
  "18315": [
   "カクトガード",
   "BLU"
  ],
  "18316": [
   "リベンジブラスト",
   "BLU"
  ],
  "18317": [
   "天使のささやき",
   "BLU"
  ],
  "18318": [
   "イグジュビエーション",
   "BLU"
  ],
  "18319": [
   "リフラックス",
   "BLU"
  ],
  "18320": [
   "捕食",
   "BLU"
  ],
  "18321": [
   "プチライブラ",
   "BLU"
  ],
  "18322": [
   "エーテルコピー",
   "BLU"
  ],
  "18323": [
   "徹甲散弾",
   "BLU"
  ],
  "18324": [
   "クエーサー",
   "BLU"
  ],
  "18325": [
   "ジャスティスキック",
   "BLU"
  ],
  "23264": [
   "銛三段",
   "BLU"
  ],
  "23265": [
   "ビリビリ",
   "BLU"
  ],
  "23266": [
   "畳返しの術",
   "BLU"
  ],
  "23267": [
   "冷たい霧",
   "BLU"
  ],
  "23269": [
   "ストトラム",
   "BLU"
  ],
  "23270": [
   "セイントビーム",
   "BLU"
  ],
  "23271": [
   "ドロドロ掬い投げ",
   "BLU"
  ],
  "23272": [
   "天使のおやつ",
   "BLU"
  ],
  "23273": [
   "玄結界",
   "BLU"
  ],
  "23275": [
   "闘霊弾",
   "BLU"
  ],
  "23276": [
   "闘争本能",
   "BLU"
  ],
  "23277": [
   "超振動",
   "BLU"
  ],
  "23278": [
   "ブレイズ",
   "BLU"
  ],
  "23279": [
   "マスタードボム",
   "BLU"
  ],
  "23280": [
   "ドラゴンフォース",
   "BLU"
  ],
  "23281": [
   "エーテリックスパーク",
   "BLU"
  ],
  "23282": [
   "ハイドロプル",
   "BLU"
  ],
  "23283": [
   "水脈の呪詛",
   "BLU"
  ],
  "23284": [
   "チョコメテオ",
   "BLU"
  ],
  "23285": [
   "マトラマジック",
   "BLU"
  ],
  "23286": [
   "プリントアウト",
   "BLU"
  ],
  "23287": [
   "如意大旋風",
   "BLU"
  ],
  "23288": [
   "鬼宿脚",
   "BLU"
  ],
  "23290": [
   "月下彼岸花",
   "BLU"
  ],
  "23416": [
   "ストトラム",
   "BLU"
  ],
  "24283": [
   "ドシス",
   "SGE"
  ],
  "24284": [
   "ディアグノシス",
   "SGE"
  ],
  "24285": [
   "カルディア",
   "SGE"
  ],
  "24286": [
   "プログノシス",
   "SGE"
  ],
  "24287": [
   "エゲイロー",
   "SGE"
  ],
  "24288": [
   "ピュシス",
   "SGE"
  ],
  "24289": [
   "フレグマ",
   "SGE"
  ],
  "24290": [
   "エウクラシア",
   "SGE"
  ],
  "24294": [
   "ソーテリア",
   "SGE"
  ],
  "24295": [
   "イカロス",
   "SGE"
  ],
  "24296": [
   "ドルオコレ",
   "SGE"
  ],
  "24297": [
   "ディスクラシア",
   "SGE"
  ],
  "24298": [
   "ケーラコレ",
   "SGE"
  ],
  "24299": [
   "イックソコレ",
   "SGE"
  ],
  "24300": [
   "ゾーエ",
   "SGE"
  ],
  "24301": [
   "ペプシス",
   "SGE"
  ],
  "24302": [
   "ピュシスII",
   "SGE"
  ],
  "24303": [
   "タウロコレ",
   "SGE"
  ],
  "24304": [
   "トキシコン",
   "SGE"
  ],
  "24305": [
   "ハイマ",
   "SGE"
  ],
  "24306": [
   "ドシスII",
   "SGE"
  ],
  "24307": [
   "フレグマII",
   "SGE"
  ],
  "24309": [
   "リゾーマタ",
   "SGE"
  ],
  "24310": [
   "ホーリズム",
   "SGE"
  ],
  "24311": [
   "パンハイマ",
   "SGE"
  ],
  "24312": [
   "ドシスIII",
   "SGE"
  ],
  "24313": [
   "フレグマIII",
   "SGE"
  ],
  "24315": [
   "ディスクラシアII",
   "SGE"
  ],
  "24316": [
   "トキシコンII",
   "SGE"
  ],
  "24317": [
   "クラーシス",
   "SGE"
  ],
  "24318": [
   "プネウマ",
   "SGE"
  ],
  "24373": [
   "スライス",
   "RPR"
  ],
  "24374": [
   "ワクシングスライス",
   "RPR"
  ],
  "24375": [
   "インファナルスライス",
   "RPR"
  ],
  "24376": [
   "スピニングサイズ",
   "RPR"
  ],
  "24377": [
   "ナイトメアサイズ",
   "RPR"
  ],
  "24378": [
   "シャドウ・オブ・デス",
   "RPR"
  ],
  "24379": [
   "ワーラル・オブ・デス",
   "RPR"
  ],
  "24380": [
   "ソウルスライス",
   "RPR"
  ],
  "24381": [
   "ソウルサイズ",
   "RPR"
  ],
  "24382": [
   "ジビトゥ",
   "RPR"
  ],
  "24383": [
   "ギャロウズ",
   "RPR"
  ],
  "24384": [
   "ギロティン",
   "RPR"
  ],
  "24385": [
   "プレンティフルハーベスト",
   "RPR"
  ],
  "24386": [
   "ハルパー",
   "RPR"
  ],
  "24387": [
   "ソウルソウ",
   "RPR"
  ],
  "24389": [
   "ストークスウェーズ",
   "RPR"
  ],
  "24392": [
   "シーフスウェーズ",
   "RPR"
  ],
  "24393": [
   "グラトニー",
   "RPR"
  ],
  "24394": [
   "レムールシュラウド",
   "RPR"
  ],
  "24398": [
   "コムニオ",
   "RPR"
  ],
  "24401": [
   "ヘルズイングレス",
   "RPR"
  ],
  "24402": [
   "ヘルズイーグレス",
   "RPR"
  ],
  "24404": [
   "アルケインクレスト",
   "RPR"
  ],
  "24405": [
   "アルケインサークル",
   "RPR"
  ],
  "25746": [
   "ホーリーシェルトロン",
   "PLD"
  ],
  "25747": [
   "エクスピアシオン",
   "PLD"
  ],
  "25751": [
   "原初の血気",
   "WAR"
  ],
  "25752": [
   "オロジェネシス",
   "WAR"
  ],
  "25753": [
   "プライマルレンド",
   "WAR"
  ],
  "25754": [
   "オブレーション",
   "DRK"
  ],
  "25755": [
   "ソルト・アンド・ダーク",
   "DRK"
  ],
  "25757": [
   "シャドウブリンガー",
   "DRK"
  ],
  "25758": [
   "ハート・オブ・コランダム",
   "GNB"
  ],
  "25760": [
   "ダブルダウン",
   "GNB"
  ],
  "25761": [
   "鉄山靠",
   "PGL,MNK"
  ],
  "25762": [
   "抜重歩法",
   "MNK"
  ],
  "25763": [
   "空鳴拳",
   "MNK"
  ],
  "25764": [
   "必殺技",
   "MNK"
  ],
  "25766": [
   "疾風の極意",
   "MNK"
  ],
  "25767": [
   "壊神脚",
   "MNK"
  ],
  "25771": [
   "ヘヴンスラスト",
   "DRG"
  ],
  "25772": [
   "桜華繚乱",
   "DRG"
  ],
  "25773": [
   "天竜点睛",
   "DRG"
  ],
  "25774": [
   "残影鎌鼬",
   "NIN"
  ],
  "25777": [
   "月影雷獣爪",
   "NIN"
  ],
  "25778": [
   "月影雷獣牙",
   "NIN"
  ],
  "25780": [
   "風光",
   "SAM"
  ],
  "25781": [
   "奥義波切",
   "SAM"
  ],
  "25783": [
   "ラドンバイト",
   "BRD"
  ],
  "25785": [
   "光神のフィナーレ",
   "BRD"
  ],
  "25786": [
   "スキャッターガン",
   "MCH"
  ],
  "25788": [
   "回転のこぎり",
   "MCH"
  ],
  "25791": [
   "扇の舞い【終】",
   "DNC"
  ],
  "25792": [
   "流星の舞い",
   "DNC"
  ],
  "25793": [
   "ブリザラ",
   "THM,BLM"
  ],
  "25794": [
   "ハイファイラ",
   "BLM"
  ],
  "25795": [
   "ハイブリザラ",
   "BLM"
  ],
  "25796": [
   "アンプリファイア",
   "BLM"
  ],
  "25798": [
   "サモン・カーバンクル",
   "ACN,SMN"
  ],
  "25799": [
   "守りの光",
   "ACN,SMN"
  ],
  "25800": [
   "エーテルチャージ",
   "ACN,SMN"
  ],
  "25801": [
   "シアリングライト",
   "SMN"
  ],
  "25802": [
   "サモン・ルビー",
   "ACN,SMN"
  ],
  "25803": [
   "サモン・トパーズ",
   "ACN,SMN"
  ],
  "25804": [
   "サモン・エメラルド",
   "ACN,SMN"
  ],
  "25805": [
   "サモン・イフリート",
   "SMN"
  ],
  "25806": [
   "サモン・タイタン",
   "SMN"
  ],
  "25807": [
   "サモン・ガルーダ",
   "SMN"
  ],
  "25822": [
   "アストラルフロウ",
   "SMN"
  ],
  "25826": [
   "トライディザスター",
   "SMN"
  ],
  "25838": [
   "サモン・イフリートII",
   "SMN"
  ],
  "25839": [
   "サモン・タイタンII",
   "SMN"
  ],
  "25840": [
   "サモン・ガルーダII",
   "SMN"
  ],
  "25855": [
   "ヴァルサンダガ",
   "RDM"
  ],
  "25856": [
   "ヴァルエアロガ",
   "RDM"
  ],
  "25857": [
   "バマジク",
   "RDM"
  ],
  "25859": [
   "グレアガ",
   "WHM"
  ],
  "25860": [
   "ホーリガ",
   "WHM"
  ],
  "25861": [
   "アクアヴェール",
   "WHM"
  ],
  "25862": [
   "リタージー・オブ・ベル",
   "WHM"
  ],
  "25865": [
   "極炎法",
   "SCH"
  ],
  "25866": [
   "裂陣法",
   "SCH"
  ],
  "25867": [
   "生命回生法",
   "SCH"
  ],
  "25868": [
   "疾風怒濤の計",
   "SCH"
  ],
  "25871": [
   "フォールマレフィク",
   "AST"
  ],
  "25872": [
   "グラビラ",
   "AST"
  ],
  "25873": [
   "エクザルテーション",
   "AST"
  ],
  "25874": [
   "マクロコスモス",
   "AST"
  ],
  "25875": [
   "ミクロコスモス",
   "AST"
  ],
  "25880": [
   "スリプル",
   "THM,BLM,ACN,SMN,RDM,BLU,PCT"
  ],
  "25883": [
   "ジェムシャイン",
   "ACN,SMN"
  ],
  "25884": [
   "ジェムブリリアンス",
   "ACN,SMN"
  ],
  "34563": [
   "ゴブリンパンチ",
   "BLU"
  ],
  "34564": [
   "大回転",
   "BLU"
  ],
  "34565": [
   "スキルトロン",
   "BLU"
  ],
  "34566": [
   "補水",
   "BLU"
  ],
  "34567": [
   "マジカルブレス",
   "BLU"
  ],
  "34568": [
   "獣魂の怒り",
   "BLU"
  ],
  "34569": [
   "泥団子遊び",
   "BLU"
  ],
  "34570": [
   "大掃除",
   "BLU"
  ],
  "34571": [
   "ルビーダイナモ",
   "BLU"
  ],
  "34572": [
   "魔のルーン",
   "BLU"
  ],
  "34573": [
   "ディメンションシフト",
   "BLU"
  ],
  "34574": [
   "コンヴィクション・マルカート",
   "BLU"
  ],
  "34575": [
   "フォースフィールド",
   "BLU"
  ],
  "34576": [
   "断罪の飛翔",
   "BLU"
  ],
  "34577": [
   "メーザーアイ",
   "BLU"
  ],
  "34578": [
   "キャンディケーン",
   "BLU"
  ],
  "34579": [
   "必滅の炎",
   "BLU"
  ],
  "34580": [
   "グルグルザパーン",
   "BLU"
  ],
  "34581": [
   "アポカリュプシス",
   "BLU"
  ],
  "34582": [
   "死すべき定め",
   "BLU"
  ],
  "34606": [
   "壱の牙【咬創】",
   "VPR"
  ],
  "34607": [
   "壱の牙【穿裂】",
   "VPR"
  ],
  "34614": [
   "壱の大牙【咬創】",
   "VPR"
  ],
  "34615": [
   "壱の大牙【穿裂】",
   "VPR"
  ],
  "34620": [
   "壱の蛇【強砕】",
   "VPR"
  ],
  "34621": [
   "弐の蛇【猛襲】",
   "VPR"
  ],
  "34622": [
   "弐の蛇【疾速】",
   "VPR"
  ],
  "34623": [
   "壱の大蛇【強砕】",
   "VPR"
  ],
  "34624": [
   "弐の大蛇【猛襲】",
   "VPR"
  ],
  "34625": [
   "弐の大蛇【疾速】",
   "VPR"
  ],
  "34626": [
   "祖霊降ろし",
   "VPR"
  ],
  "34632": [
   "飛蛇の牙",
   "VPR"
  ],
  "34633": [
   "飛蛇の尾",
   "VPR"
  ],
  "34646": [
   "蛇行",
   "VPR"
  ],
  "34647": [
   "蛇の霊気",
   "VPR"
  ],
  "34650": [
   "レッドファイア",
   "PCT"
  ],
  "34653": [
   "シアンブリザド",
   "PCT"
  ],
  "34656": [
   "レッドファイラ",
   "PCT"
  ],
  "34659": [
   "シアンブリザラ",
   "PCT"
  ],
  "34662": [
   "ホワイトホーリー",
   "PCT"
  ],
  "34663": [
   "ブラックコメット",
   "PCT"
  ],
  "34676": [
   "モーグリストリーム",
   "PCT"
  ],
  "34678": [
   "ハンマースタンプ",
   "PCT"
  ],
  "34681": [
   "スタープリズム",
   "PCT"
  ],
  "34683": [
   "サブトラクティブパレット",
   "PCT"
  ],
  "34684": [
   "スマッジ",
   "PCT"
  ],
  "34685": [
   "テンペラコート",
   "PCT"
  ],
  "34686": [
   "テンペラグラッサ",
   "PCT"
  ],
  "34688": [
   "レインボードリップ",
   "PCT"
  ],
  "34689": [
   "ピクトアニマル",
   "PCT"
  ],
  "34690": [
   "ピクトウェポン",
   "PCT"
  ],
  "34691": [
   "ピクトスケープ",
   "PCT"
  ],
  "35347": [
   "イマジンアニマル",
   "PCT"
  ],
  "35348": [
   "イマジンウェポン",
   "PCT"
  ],
  "35349": [
   "イマジンスケープ",
   "PCT"
  ],
  "35920": [
   "蛇尾術",
   "VPR"
  ],
  "35921": [
   "双牙連術",
   "VPR"
  ],
  "35922": [
   "双牙乱術",
   "VPR"
  ],
  "36920": [
   "エクストリームガード",
   "PLD"
  ],
  "36921": [
   "インペラトル",
   "PLD"
  ],
  "36923": [
   "ダムネーション",
   "WAR"
  ],
  "36926": [
   "シャドウストライド",
   "DRK"
  ],
  "36927": [
   "シャドウヴィジル",
   "DRK"
  ],
  "36932": [
   "ディセスティーム",
   "DRK"
  ],
  "36934": [
   "トラジェクトリー",
   "GNB"
  ],
  "36935": [
   "グレートネビュラ",
   "GNB"
  ],
  "36937": [
   "ライズ・オブ・ハート",
   "GNB"
  ],
  "36940": [
   "鉄山闘気",
   "PGL,MNK"
  ],
  "36941": [
   "空鳴闘気",
   "MNK"
  ],
  "36942": [
   "陰陽闘気",
   "MNK"
  ],
  "36943": [
   "万象闘気",
   "MNK"
  ],
  "36944": [
   "金剛周天",
   "MNK"
  ],
  "36945": [
   "猿舞連撃",
   "MNK"
  ],
  "36946": [
   "竜頷正拳撃",
   "MNK"
  ],
  "36947": [
   "虎襲崩拳",
   "MNK"
  ],
  "36949": [
   "絶空拳",
   "MNK"
  ],
  "36950": [
   "乾坤闘気弾",
   "MNK"
  ],
  "36951": [
   "ウィンググライド",
   "DRG"
  ],
  "36952": [
   "雲蒸竜変",
   "DRG"
  ],
  "36953": [
   "ドラゴンライズ",
   "DRG"
  ],
  "36954": [
   "スラストラッシュ",
   "DRG"
  ],
  "36955": [
   "スパイラルブロウ",
   "DRG"
  ],
  "36956": [
   "スタークロッサー",
   "DRG"
  ],
  "36957": [
   "毒盛の術",
   "NIN"
  ],
  "36958": [
   "百雷銃",
   "NIN"
  ],
  "36962": [
   "天眼通",
   "SAM"
  ],
  "36963": [
   "暁風",
   "SAM"
  ],
  "36964": [
   "残心",
   "SAM"
  ],
  "36974": [
   "ワイドボレー",
   "ARC,BRD"
  ],
  "36975": [
   "ハートブレイクショット",
   "BRD"
  ],
  "36976": [
   "レゾナンスアロー",
   "BRD"
  ],
  "36977": [
   "光神のアンコール",
   "BRD"
  ],
  "36978": [
   "ブレイズショット",
   "MCH"
  ],
  "36979": [
   "ダブルチェック",
   "MCH"
  ],
  "36980": [
   "チェックメイト",
   "MCH"
  ],
  "36982": [
   "フルメタルバースト",
   "MCH"
  ],
  "36983": [
   "ラストダンス",
   "DNC"
  ],
  "36986": [
   "ハイサンダー",
   "BLM"
  ],
  "36987": [
   "ハイサンダラ",
   "BLM"
  ],
  "36988": [
   "魔紋再設置",
   "BLM"
  ],
  "36989": [
   "フレアスター",
   "BLM"
  ],
  "36990": [
   "ミアズマノヴァ",
   "SMN"
  ],
  "36991": [
   "シアリングスパーク",
   "SMN"
  ],
  "36997": [
   "ルクス・ソラリス",
   "SMN"
  ],
  "37004": [
   "ジョルガ",
   "RDM"
  ],
  "37005": [
   "ブライヤー・クロゼ",
   "RDM"
  ],
  "37007": [
   "プリフルジェンス",
   "RDM"
  ],
  "37008": [
   "エーテリアルシフト",
   "WHM"
  ],
  "37009": [
   "グレアジャ",
   "WHM"
  ],
  "37010": [
   "メディガ",
   "WHM"
  ],
  "37011": [
   "ディヴァインカレス",
   "WHM"
  ],
  "37012": [
   "埋伏の毒",
   "SCH"
  ],
  "37013": [
   "意気軒昂の策",
   "SCH"
  ],
  "37014": [
   "セラフィズム",
   "SCH"
  ],
  "37017": [
   "アストラルドロー",
   "AST"
  ],
  "37019": [
   "プレイI",
   "AST"
  ],
  "37020": [
   "プレイII",
   "AST"
  ],
  "37021": [
   "プレイIII",
   "AST"
  ],
  "37022": [
   "マイナーアルカナ",
   "AST"
  ],
  "37029": [
   "オラクル",
   "AST"
  ],
  "37030": [
   "コンジャンクション・ヘリオス",
   "AST"
  ],
  "37031": [
   "サンサイン",
   "AST"
  ],
  "37033": [
   "プシュケー",
   "SGE"
  ],
  "37035": [
   "フィロソフィア",
   "SGE"
  ],
  "37037": [
   "応急戦術",
   "SCH"
  ],
  "44879": [
   "スマッシュ",
   "BST"
  ],
  "44880": [
   "とらえる",
   "BST"
  ],
  "44881": [
   "壱の呼び笛",
   "BST"
  ],
  "44882": [
   "みやぶる",
   "BST"
  ],
  "44883": [
   "アクスバイト",
   "BST"
  ],
  "44884": [
   "アバランチアクス",
   "BST"
  ],
  "44885": [
   "シールドスプリッター",
   "BST"
  ],
  "44886": [
   "魔獣技",
   "BST"
  ],
  "44887": [
   "ミストラルアクス",
   "BST"
  ],
  "44888": [
   "スピニングアクス",
   "BST"
  ],
  "44889": [
   "ラファールアクス",
   "BST"
  ],
  "44890": [
   "はなつ",
   "BST"
  ],
  "44891": [
   "さいごのいちげき",
   "BST"
  ],
  "44892": [
   "弐の呼び笛",
   "BST"
  ],
  "44893": [
   "シールドチャージ",
   "BST"
  ],
  "44894": [
   "参の呼び笛",
   "BST"
  ],
  "44895": [
   "かりる",
   "BST"
  ],
  "44896": [
   "ビーストスキン",
   "BST"
  ],
  "44897": [
   "ヴァイルスキン",
   "BST"
  ],
  "44898": [
   "クラウドスキム",
   "BST"
  ],
  "44899": [
   "シードサワー",
   "BST"
  ],
  "44900": [
   "クェリングウェーブ",
   "BST"
  ],
  "44901": [
   "スケイルスキン",
   "BST"
  ],
  "44902": [
   "ソウルクラッシュ",
   "BST"
  ],
  "44903": [
   "アッシュクレンズ",
   "BST"
  ],
  "44904": [
   "おうえん",
   "BST"
  ],
  "44905": [
   "きあい",
   "BST"
  ],
  "44930": [
   "ブルータルレイジ",
   "BST"
  ],
  "44931": [
   "ホークスパイク",
   "BST"
  ],
  "44932": [
   "ライジングフォール",
   "BST"
  ],
  "44933": [
   "カラミティ",
   "BST"
  ],
  "47092": [
   "はなつ",
   "BST"
  ],
  "47093": [
   "おおわざ",
   "BST"
  ],
  "47238": [
   "かりる",
   "BST"
  ],
  "47239": [
   "かりる",
   "BST"
  ],
  "47240": [
   "かりる",
   "BST"
  ],
  "47241": [
   "かりる",
   "BST"
  ],
  "47242": [
   "かりる",
   "BST"
  ],
  "47243": [
   "かりる",
   "BST"
  ],
  "47244": [
   "かりる",
   "BST"
  ],
  "47245": [
   "かりる",
   "BST"
  ]
 }
};
