// 自動生成: node mock/build-mock-data.mjs（手で編集しない）
window.MOCK_DATA = {
 "gameVersion": "2026.09.15.0000.0000",
 "extractedAt": "2026-09-24T16:26:50+09:00",
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
    "ロイエ実行可": "../public/icons/statuses/212522.png",
    "コンフィテオル実行可": "../public/icons/statuses/212520.png",
    "ゲベート実行可": "../public/icons/statuses/212523.png",
    "グラブカッマー実行可": "../public/icons/statuses/212524.png",
    "ブレード・オブ・オナー実行可": "../public/icons/statuses/213052.png",
    "ゴアブレード実行可": "../public/icons/statuses/213053.png"
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
       "kind": "other",
       "type": 7
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
       "kind": "other",
       "type": 7
      },
      {
       "kind": "other",
       "type": 7
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
       "kind": "other",
       "type": 7
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
     "defaultSource": "job"
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
    "127": {
     "id": 127,
     "name": "ストンラ",
     "desc": "対象に土属性魔法攻撃。　威力：190",
     "icon": "../public/fankit/battle-pve/18_WHM/Stone_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 18,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 190
     },
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
    "132": {
     "id": 132,
     "name": "エアロラ",
     "desc": "対象に風属性魔法攻撃。　威力：50\n追加効果：対象に風属性の継続ダメージを付与する。\n威力：50　効果時間：30秒",
     "icon": "../public/fankit/battle-pve/18_WHM/Aero_II.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 0,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 46,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "range": 25,
     "crit": false,
     "effectRange": 0,
     "ground": false,
     "positional": null,
     "dash": false,
     "backstep": 0,
     "pot": {
      "base": 50,
      "dot": {
       "potency": 50,
       "sec": 30
      }
     },
     "eff": null,
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
    "3568": {
     "id": 3568,
     "name": "ストンガ",
     "desc": "対象に土属性魔法攻撃。　威力：220",
     "icon": "../public/fankit/battle-pve/18_WHM/Stone_III.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 54,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "range": 25,
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
    "7431": {
     "id": 7431,
     "name": "ストンジャ",
     "desc": "対象に土属性魔法攻撃。　威力：260",
     "icon": "../public/fankit/battle-pve/18_WHM/Stone_IV.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
     "recastMs": 2500,
     "cooldownGroup": 58,
     "maxCharges": 0,
     "comboFrom": [],
     "preservesCombo": false,
     "level": 64,
     "forJob": true,
     "isRole": false,
     "category": 2,
     "proc": null,
     "procStatus": null,
     "shape": 1,
     "hostile": true,
     "range": 25,
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
    "16533": {
     "id": 16533,
     "name": "グレア",
     "desc": "対象に無属性魔法攻撃。　威力：290",
     "icon": "../public/fankit/battle-pve/18_WHM/Glare.png",
     "iconFramed": true,
     "isGcd": true,
     "castMs": 1500,
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
    "グレアジャ実行可": "../public/icons/statuses/218669.png",
    "ディヴァインカレス実行可": "../public/icons/statuses/212640.png"
   },
   "bars": {
    "hb1": {
     "job": [
      {
       "kind": "other",
       "type": 7
      },
      {
       "kind": "other",
       "type": 7
      },
      {
       "kind": "action",
       "id": 37010,
       "from": 133
      },
      {
       "kind": "other",
       "type": 7
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
       "kind": "other",
       "type": 7
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
       "kind": "other",
       "type": 7
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
       "kind": "other",
       "type": 7
      },
      null,
      {
       "kind": "other",
       "type": 7
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
       "kind": "other",
       "type": 7
      },
      {
       "kind": "action",
       "id": 7561
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
       "type": 7
      },
      null,
      null,
      {
       "kind": "other",
       "type": 7
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
    "133": 37010,
    "139": 25860
   },
   "jobSet": 24,
   "buttonsAll": [
    120,
    124,
    125,
    127,
    131,
    132,
    135,
    136,
    137,
    140,
    3568,
    3569,
    3570,
    3571,
    7430,
    7431,
    7432,
    7433,
    16531,
    16532,
    16533,
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
    127,
    132,
    3568,
    7431,
    7432,
    16533,
    37009,
    37011
   ],
   "replaceGroups": {},
   "splitDetected": []
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
