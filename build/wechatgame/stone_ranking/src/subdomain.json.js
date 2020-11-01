module.exports = [
  {
    "__type__": "cc.Texture2D",
    "content": "0,9729,9729,33071,33071,0,0,1"
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-2d-gray-sprite",
    "techniques": [
      {
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "properties": {
              "texture": {
                "value": "white",
                "type": 29
              }
            },
            "program": "builtin-2d-gray-sprite|vs|fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 4278481454,
        "glsl3": {
          "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nin vec3 a_position;\nin mediump vec2 a_uv0;\nout mediump vec2 v_uv0;\nin vec4 a_color;\nout vec4 v_color;\nvoid main () {\n  gl_Position = cc_matViewProj * vec4(a_position, 1);\n  v_uv0 = a_uv0;\n  v_color = a_color;\n}",
          "frag": "\nprecision highp float;\nuniform sampler2D texture;\nin mediump vec2 v_uv0;\nin vec4 v_color;\nvoid main () {\n  vec4 color = v_color;\n  vec4 texture_tmp = texture(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    color.a *= texture_tmp.a;\n  #else\n    color *= texture_tmp;\n  #endif\n  float gray = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;\n  gl_FragColor = vec4(gray, gray, gray, color.a);\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nattribute vec3 a_position;\nattribute mediump vec2 a_uv0;\nvarying mediump vec2 v_uv0;\nattribute vec4 a_color;\nvarying vec4 v_color;\nvoid main () {\n  gl_Position = cc_matViewProj * vec4(a_position, 1);\n  v_uv0 = a_uv0;\n  v_color = a_color;\n}",
          "frag": "\nprecision highp float;\nuniform sampler2D texture;\nvarying mediump vec2 v_uv0;\nvarying vec4 v_color;\nvoid main () {\n  vec4 color = v_color;\n  vec4 texture_tmp = texture2D(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture2D(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    color.a *= texture_tmp.a;\n  #else\n    color *= texture_tmp;\n  #endif\n  float gray = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;\n  gl_FragColor = vec4(gray, gray, gray, color.a);\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_ALPHA_ATLAS_texture",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "INPUT_IS_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [],
        "samplers": [
          {
            "name": "texture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-2d-gray-sprite|vs|fs"
      }
    ]
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-2d-sprite",
    "techniques": [
      {
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "properties": {
              "texture": {
                "value": "white",
                "type": 29
              },
              "alphaThreshold": {
                "value": [
                  0.5
                ],
                "type": 13
              }
            },
            "program": "builtin-2d-sprite|vs|fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 3278106612,
        "glsl3": {
          "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  #if USE_TEXTURE\n  vec4 texture_tmp = texture(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    o.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    o.a *= texture_tmp.a;\n  #else\n    o *= texture_tmp;\n  #endif\n  #endif\n  o *= v_color;\n  ALPHA_TEST(o);\n  gl_FragColor = o;\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  #if USE_TEXTURE\n  vec4 texture_tmp = texture2D(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture2D(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    o.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    o.a *= texture_tmp.a;\n  #else\n    o *= texture_tmp;\n  #endif\n  #endif\n  o *= v_color;\n  ALPHA_TEST(o);\n  gl_FragColor = o;\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "USE_TEXTURE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_MODEL",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "USE_ALPHA_TEST",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ALPHA_ATLAS_texture",
            "type": "boolean",
            "defines": [
              "USE_TEXTURE"
            ]
          },
          {
            "name": "INPUT_IS_GAMMA",
            "type": "boolean",
            "defines": [
              "USE_TEXTURE"
            ]
          }
        ],
        "blocks": [
          {
            "name": "ALPHA_TEST",
            "members": [
              {
                "name": "alphaThreshold",
                "type": 13,
                "count": 1
              }
            ],
            "defines": [
              "USE_ALPHA_TEST"
            ],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "texture",
            "type": 29,
            "count": 1,
            "defines": [
              "USE_TEXTURE"
            ],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-2d-sprite|vs|fs"
      }
    ]
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-unlit",
    "_effectAsset": {
      "__uuid__": "6dkeWRTOBGXICfYQ7JUBnG"
    },
    "_techniqueData": {
      "0": {
        "props": {
          "diffuseTexture": {
            "__uuid__": "02delMVqdBD70a/HSD99FK"
          }
        },
        "defines": {
          "USE_DIFFUSE_TEXTURE": true
        }
      }
    }
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-3d-trail",
    "techniques": [
      {
        "name": "add",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 1,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 1
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add"
          }
        ]
      },
      {
        "name": "alpha-blend",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add"
          }
        ]
      },
      {
        "name": "add-multiply",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:multiply"
          }
        ]
      },
      {
        "name": "add-smooth",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:addSmooth"
          }
        ]
      },
      {
        "name": "premultiply-blend",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:premultiplied"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 2929688198,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  in vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture(mainTexture, uv);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., 1.);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = add(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  varying vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture2D(mainTexture, uv);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., 1.);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = add(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          },
          {
            "name": "FragConstants",
            "members": [
              {
                "name": "tintColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 1
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add"
      },
      {
        "hash": 4224037318,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  in vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., col.a);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = multiply(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  varying vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture2D(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., col.a);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = multiply(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          },
          {
            "name": "FragConstants",
            "members": [
              {
                "name": "tintColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 1
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:multiply"
      },
      {
        "hash": 1704877102,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = addSmooth(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture2D(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = addSmooth(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:addSmooth"
      },
      {
        "hash": 2717357054,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = premultiplied(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture2D(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = premultiplied(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:premultiplied"
      }
    ]
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-2d-gray-sprite",
    "_effectAsset": {
      "__uuid__": "14TDKXr2NJ6LjvHPops74o"
    },
    "_techniqueData": {}
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-3d-particle",
    "_effectAsset": {
      "__uuid__": "82migssElAGb04Ws6NimQX"
    },
    "_techniqueData": {
      "0": {
        "props": {
          "mainTiling_Offset": {
            "__type__": "cc.Vec4",
            "x": 1,
            "y": 1
          },
          "tintColor": {
            "__type__": "cc.Color",
            "r": 172,
            "g": 165,
            "b": 165,
            "a": 127
          },
          "mainTexture": {
            "__uuid__": "60AwGqM1dKELCGhPAR+jK6"
          }
        },
        "defines": {
          "CC_USE_BILLBOARD": true,
          "CC_USE_STRETCHED_BILLBOARD": false,
          "CC_USE_HORIZONTAL_BILLBOARD": false,
          "CC_USE_VERTICAL_BILLBOARD": false,
          "CC_USE_MESH": false
        }
      }
    }
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-3d-trail",
    "_effectAsset": {
      "__uuid__": "2afAA24LNP4YmYiaVLiivs"
    },
    "_techniqueData": {
      "0": {
        "props": {
          "mainTexture": {
            "__uuid__": "02delMVqdBD70a/HSD99FK"
          }
        }
      }
    }
  },
  {
    "__type__": "cc.Texture2D",
    "content": "0,9729,9729,33071,33071,1,0,0"
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-unlit",
    "techniques": [
      {
        "name": "opaque",
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": true
            },
            "properties": {
              "diffuseTexture": {
                "value": "white",
                "type": 29
              },
              "diffuseColor": {
                "value": [
                  1,
                  1,
                  1,
                  1
                ],
                "editor": {
                  "type": "color"
                },
                "type": 16
              },
              "alphaThreshold": {
                "value": [
                  0.5
                ],
                "type": 13
              },
              "mainTiling": {
                "value": [
                  1,
                  1
                ],
                "type": 14
              },
              "mainOffset": {
                "value": [
                  0,
                  0
                ],
                "type": 14
              }
            },
            "program": "builtin-unlit|unlit-vs|unlit-fs"
          }
        ]
      },
      {
        "name": "transparent",
        "passes": [
          {
            "stage": "transparent",
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": true
            },
            "properties": {
              "diffuseTexture": {
                "value": "white",
                "type": 29
              },
              "diffuseColor": {
                "value": [
                  1,
                  1,
                  1,
                  1
                ],
                "editor": {
                  "type": "color"
                },
                "type": 16
              },
              "alphaThreshold": {
                "value": [
                  0.5
                ],
                "type": 13
              },
              "mainTiling": {
                "value": [
                  1,
                  1
                ],
                "type": 14
              },
              "mainOffset": {
                "value": [
                  0,
                  0
                ],
                "type": 14
              }
            },
            "program": "builtin-unlit|unlit-vs|unlit-fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 922858114,
        "glsl3": {
          "vert": "\nprecision highp float;\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\n#if CC_USE_SKINNING\n  in vec4 a_weights;\n  in vec4 a_joints;\n  #if CC_USE_JOINTS_TEXTRUE\n    uniform SKINNING {\n      vec2 jointsTextureSize;\n    };\n    uniform sampler2D jointsTexture;\n    #if CC_JOINTS_TEXTURE_FLOAT32\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 4.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = texture(jointsTexture, vec2(dx * (x + 0.5), y));\n        vec4 v2 = texture(jointsTexture, vec2(dx * (x + 1.5), y));\n        vec4 v3 = texture(jointsTexture, vec2(dx * (x + 2.5), y));\n        vec4 v4 = texture(jointsTexture, vec2(dx * (x + 3.5), y));\n        return mat4(v1, v2, v3, v4);\n      }\n    #else\n      float decode32(vec4 rgba) {\n        float Sign = 1.0 - step(128.0, rgba[0]) * 2.0;\n        float Exponent = 2.0 * mod(rgba[0], 128.0) + step(128.0, rgba[1]) - 127.0;\n        float Mantissa = mod(rgba[1], 128.0) * 65536.0 + rgba[2] * 256.0 + rgba[3] + 8388608.0;\n        return Sign * exp2(Exponent - 23.0) * Mantissa;\n      }\n      vec4 decodevec4 (vec4 x, vec4 y, vec4 z, vec4 w) {\n        return vec4(\n          decode32(x.wzyx * 255.0),\n          decode32(y.wzyx * 255.0),\n          decode32(z.wzyx * 255.0),\n          decode32(w.wzyx * 255.0)\n        );\n      }\n      vec4 decodevec4 (float dx, float x, float y) {\n        return decodevec4(\n          texture(jointsTexture, vec2(dx * (x + 0.5), y)),\n          texture(jointsTexture, vec2(dx * (x + 1.5), y)),\n          texture(jointsTexture, vec2(dx * (x + 2.5), y)),\n          texture(jointsTexture, vec2(dx * (x + 3.5), y))\n        );\n      }\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 16.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = decodevec4(dx, x,       y);\n        vec4 v2 = decodevec4(dx, x+4.0,   y);\n        vec4 v3 = decodevec4(dx, x+8.0,   y);\n        vec4 v4 = decodevec4(dx, x+12.0,  y);\n        return mat4(v1, v2, v3, v4);\n      }\n    #endif\n  #else\n    uniform JOINT_MATRIX {\n      mat4 jointMatrices[50];\n    };\n    mat4 getBoneMatrix(const in float i) {\n      return jointMatrices[int(i)];\n    }\n  #endif\n    mat4 skinMatrix() {\n      return\n        getBoneMatrix(a_joints.x) * a_weights.x +\n        getBoneMatrix(a_joints.y) * a_weights.y +\n        getBoneMatrix(a_joints.z) * a_weights.z +\n        getBoneMatrix(a_joints.w) * a_weights.w\n        ;\n    }\n#endif\nstruct StandardVertInput {\n  vec2 uv;\n  vec4 position;\n  vec3 normal;\n  vec4 tangent;\n  vec4 color;\n};\nin vec3 a_position;\n#if CC_USE_ATTRIBUTE_UV0\nin vec2 a_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\nin vec4 a_color;\n#endif\n#if CC_USE_ATTRIBUTE_NORMAL\nin vec3 a_normal;\n#endif\n#if CC_USE_ATTRIBUTE_TANGENT\nin vec4 a_tangent;\n#endif\nvoid CCAttribute (out StandardVertInput In) {\n  In.position = vec4(a_position, 1.0);\n  #if CC_USE_ATTRIBUTE_UV0\n    In.uv = a_uv0;\n  #else\n    In.uv = vec2(0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    In.color = a_color;\n  #else\n    In.color = vec4(1.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_NORMAL\n    In.normal = a_normal;\n  #else\n    In.normal = vec3(0.0, 1.0, 0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_TANGENT\n    In.tangent = a_tangent;\n  #else\n    In.tangent = vec4(1.0, 0.0, 0.0, 0.0);\n  #endif\n}\nvoid CCVertInput(out StandardVertInput In) {\n  CCAttribute(In);\n  #if CC_USE_SKINNING\n    mat4 m = skinMatrix();\n    In.position = m * In.position;\n    #if CC_USE_ATTRIBUTE_NORMAL\n      In.normal = (m * vec4(In.normal, 0)).xyz;\n    #endif\n    #if CC_USE_ATTRIBUTE_TANGENT\n      In.tangent = m * In.tangent;\n    #endif\n  #endif\n}\nuniform MAIN_TILING {\n  vec2 mainTiling;\n  vec2 mainOffset;\n};\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  out mediump vec2 v_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  out lowp vec4 v_color;\n#endif\nvoid main () {\n  StandardVertInput In;\n  CCVertInput(In);\n  #if CC_USE_ATTRIBUTE_COLOR\n    v_color = In.color;\n  #endif\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n    v_uv0 = In.uv * mainTiling + mainOffset;\n  #endif\n  gl_Position = cc_matViewProj * cc_matWorld * In.position;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nuniform UNLIT {\n  lowp vec4 diffuseColor;\n};\n#if USE_DIFFUSE_TEXTURE\n  uniform sampler2D diffuseTexture;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  in lowp vec4 v_color;\n#endif\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  in mediump vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 color = diffuseColor;\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  vec4 diffuseTexture_tmp = texture(diffuseTexture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_diffuseTexture\n      diffuseTexture_tmp.a *= texture(diffuseTexture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (diffuseTexture_tmp.rgb * diffuseTexture_tmp.rgb);\n    color.a *= diffuseTexture_tmp.a;\n  #else\n    color *= diffuseTexture_tmp;\n  #endif\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    color *= v_color;\n  #endif\n  ALPHA_TEST(color);\n  gl_FragColor = CCFragOutput(color);\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nuniform mat4 cc_matWorld;\nuniform mat4 cc_matViewProj;\n#if CC_USE_SKINNING\n  attribute vec4 a_weights;\n  attribute vec4 a_joints;\n  #if CC_USE_JOINTS_TEXTRUE\n    uniform vec2 jointsTextureSize;\n    uniform sampler2D jointsTexture;\n    #if CC_JOINTS_TEXTURE_FLOAT32\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 4.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = texture2D(jointsTexture, vec2(dx * (x + 0.5), y));\n        vec4 v2 = texture2D(jointsTexture, vec2(dx * (x + 1.5), y));\n        vec4 v3 = texture2D(jointsTexture, vec2(dx * (x + 2.5), y));\n        vec4 v4 = texture2D(jointsTexture, vec2(dx * (x + 3.5), y));\n        return mat4(v1, v2, v3, v4);\n      }\n    #else\n      float decode32(vec4 rgba) {\n        float Sign = 1.0 - step(128.0, rgba[0]) * 2.0;\n        float Exponent = 2.0 * mod(rgba[0], 128.0) + step(128.0, rgba[1]) - 127.0;\n        float Mantissa = mod(rgba[1], 128.0) * 65536.0 + rgba[2] * 256.0 + rgba[3] + 8388608.0;\n        return Sign * exp2(Exponent - 23.0) * Mantissa;\n      }\n      vec4 decodevec4 (vec4 x, vec4 y, vec4 z, vec4 w) {\n        return vec4(\n          decode32(x.wzyx * 255.0),\n          decode32(y.wzyx * 255.0),\n          decode32(z.wzyx * 255.0),\n          decode32(w.wzyx * 255.0)\n        );\n      }\n      vec4 decodevec4 (float dx, float x, float y) {\n        return decodevec4(\n          texture2D(jointsTexture, vec2(dx * (x + 0.5), y)),\n          texture2D(jointsTexture, vec2(dx * (x + 1.5), y)),\n          texture2D(jointsTexture, vec2(dx * (x + 2.5), y)),\n          texture2D(jointsTexture, vec2(dx * (x + 3.5), y))\n        );\n      }\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 16.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = decodevec4(dx, x,       y);\n        vec4 v2 = decodevec4(dx, x+4.0,   y);\n        vec4 v3 = decodevec4(dx, x+8.0,   y);\n        vec4 v4 = decodevec4(dx, x+12.0,  y);\n        return mat4(v1, v2, v3, v4);\n      }\n    #endif\n  #else\n    uniform mat4 jointMatrices[50];\n    mat4 getBoneMatrix(const in float i) {\n      return jointMatrices[int(i)];\n    }\n  #endif\n    mat4 skinMatrix() {\n      return\n        getBoneMatrix(a_joints.x) * a_weights.x +\n        getBoneMatrix(a_joints.y) * a_weights.y +\n        getBoneMatrix(a_joints.z) * a_weights.z +\n        getBoneMatrix(a_joints.w) * a_weights.w\n        ;\n    }\n#endif\nstruct StandardVertInput {\n  vec2 uv;\n  vec4 position;\n  vec3 normal;\n  vec4 tangent;\n  vec4 color;\n};\nattribute vec3 a_position;\n#if CC_USE_ATTRIBUTE_UV0\nattribute vec2 a_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\nattribute vec4 a_color;\n#endif\n#if CC_USE_ATTRIBUTE_NORMAL\nattribute vec3 a_normal;\n#endif\n#if CC_USE_ATTRIBUTE_TANGENT\nattribute vec4 a_tangent;\n#endif\nvoid CCAttribute (out StandardVertInput In) {\n  In.position = vec4(a_position, 1.0);\n  #if CC_USE_ATTRIBUTE_UV0\n    In.uv = a_uv0;\n  #else\n    In.uv = vec2(0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    In.color = a_color;\n  #else\n    In.color = vec4(1.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_NORMAL\n    In.normal = a_normal;\n  #else\n    In.normal = vec3(0.0, 1.0, 0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_TANGENT\n    In.tangent = a_tangent;\n  #else\n    In.tangent = vec4(1.0, 0.0, 0.0, 0.0);\n  #endif\n}\nvoid CCVertInput(out StandardVertInput In) {\n  CCAttribute(In);\n  #if CC_USE_SKINNING\n    mat4 m = skinMatrix();\n    In.position = m * In.position;\n    #if CC_USE_ATTRIBUTE_NORMAL\n      In.normal = (m * vec4(In.normal, 0)).xyz;\n    #endif\n    #if CC_USE_ATTRIBUTE_TANGENT\n      In.tangent = m * In.tangent;\n    #endif\n  #endif\n}\nuniform vec2 mainTiling;\nuniform vec2 mainOffset;\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  varying mediump vec2 v_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  varying lowp vec4 v_color;\n#endif\nvoid main () {\n  StandardVertInput In;\n  CCVertInput(In);\n  #if CC_USE_ATTRIBUTE_COLOR\n    v_color = In.color;\n  #endif\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n    v_uv0 = In.uv * mainTiling + mainOffset;\n  #endif\n  gl_Position = cc_matViewProj * cc_matWorld * In.position;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nuniform lowp vec4 diffuseColor;\n#if USE_DIFFUSE_TEXTURE\n  uniform sampler2D diffuseTexture;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  varying lowp vec4 v_color;\n#endif\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  varying mediump vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 color = diffuseColor;\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  vec4 diffuseTexture_tmp = texture2D(diffuseTexture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_diffuseTexture\n      diffuseTexture_tmp.a *= texture2D(diffuseTexture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (diffuseTexture_tmp.rgb * diffuseTexture_tmp.rgb);\n    color.a *= diffuseTexture_tmp.a;\n  #else\n    color *= diffuseTexture_tmp;\n  #endif\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    color *= v_color;\n  #endif\n  ALPHA_TEST(color);\n  gl_FragColor = CCFragOutput(color);\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_SKINNING",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_JOINTS_TEXTRUE",
            "type": "boolean",
            "defines": [
              "CC_USE_SKINNING"
            ]
          },
          {
            "name": "CC_JOINTS_TEXTURE_FLOAT32",
            "type": "boolean",
            "defines": [
              "CC_USE_SKINNING",
              "CC_USE_JOINTS_TEXTRUE"
            ]
          },
          {
            "name": "CC_USE_ATTRIBUTE_UV0",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ATTRIBUTE_COLOR",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ATTRIBUTE_NORMAL",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ATTRIBUTE_TANGENT",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "USE_DIFFUSE_TEXTURE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "USE_ALPHA_TEST",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ALPHA_ATLAS_diffuseTexture",
            "type": "boolean",
            "defines": [
              "CC_USE_ATTRIBUTE_UV0",
              "USE_DIFFUSE_TEXTURE"
            ]
          },
          {
            "name": "INPUT_IS_GAMMA",
            "type": "boolean",
            "defines": [
              "CC_USE_ATTRIBUTE_UV0",
              "USE_DIFFUSE_TEXTURE"
            ]
          }
        ],
        "blocks": [
          {
            "name": "SKINNING",
            "members": [
              {
                "name": "jointsTextureSize",
                "type": 14,
                "count": 1
              }
            ],
            "defines": [
              "CC_USE_SKINNING",
              "CC_USE_JOINTS_TEXTRUE"
            ],
            "binding": 0
          },
          {
            "name": "JOINT_MATRIX",
            "members": [
              {
                "name": "jointMatrices",
                "type": 26,
                "count": 50
              }
            ],
            "defines": [
              "CC_USE_SKINNING"
            ],
            "binding": 1
          },
          {
            "name": "MAIN_TILING",
            "members": [
              {
                "name": "mainTiling",
                "type": 14,
                "count": 1
              },
              {
                "name": "mainOffset",
                "type": 14,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 2
          },
          {
            "name": "ALPHA_TEST",
            "members": [
              {
                "name": "alphaThreshold",
                "type": 13,
                "count": 1
              }
            ],
            "defines": [
              "USE_ALPHA_TEST"
            ],
            "binding": 3
          },
          {
            "name": "UNLIT",
            "members": [
              {
                "name": "diffuseColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 4
          }
        ],
        "samplers": [
          {
            "name": "jointsTexture",
            "type": 29,
            "count": 1,
            "defines": [
              "CC_USE_SKINNING",
              "CC_USE_JOINTS_TEXTRUE"
            ],
            "binding": 30
          },
          {
            "name": "diffuseTexture",
            "type": 29,
            "count": 1,
            "defines": [
              "USE_DIFFUSE_TEXTURE"
            ],
            "binding": 31
          }
        ],
        "record": null,
        "name": "builtin-unlit|unlit-vs|unlit-fs"
      }
    ]
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-2d-base",
    "_effectAsset": {
      "__uuid__": "28dPjdQWxEQIG3VVl1Qm6T"
    },
    "_techniqueData": {}
  },
  [
    {
      "__type__": "cc.SceneAsset",
      "_name": "GameRankingList",
      "scene": {
        "__id__": 1
      },
      "asyncLoadAssets": null
    },
    {
      "__type__": "cc.Scene",
      "_name": "New Node",
      "_children": [
        {
          "__id__": 2
        }
      ],
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      },
      "autoReleaseAssets": false
    },
    {
      "__type__": "cc.Node",
      "_name": "Canvas",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 3
        },
        {
          "__id__": 4
        }
      ],
      "_components": [
        {
          "__type__": "cc.Canvas",
          "node": {
            "__id__": 2
          },
          "_designResolution": {
            "__type__": "cc.Size",
            "width": 1136,
            "height": 640
          },
          "_fitWidth": true
        },
        {
          "__type__": "cc.Widget",
          "node": {
            "__id__": 2
          },
          "_alignFlags": 45
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 1136,
        "height": 640
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          568,
          320,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      },
      "_id": "c0mJN16TZFf7+z0slFoR1F"
    },
    {
      "__type__": "cc.Node",
      "_name": "Main Camera",
      "_parent": {
        "__id__": 2
      },
      "_components": [
        {
          "__type__": "cc.Camera",
          "node": {
            "__id__": 3
          },
          "_clearFlags": 7,
          "_depth": -1
        }
      ],
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          248.20288601041972,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "GameRankingList",
      "_parent": {
        "__id__": 2
      },
      "_children": [
        {
          "__id__": 5
        },
        {
          "__id__": 7
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 4
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ]
        },
        {
          "__type__": "5b927M8yFlKoayzI+NDxP/u",
          "node": {
            "__id__": 4
          },
          "rankingScrollView": {
            "__id__": 10
          },
          "scrollViewContent": {
            "__id__": 9
          },
          "prefabRankItem": {
            "__uuid__": "c7SJCElU1KAZofLl6Fauo7"
          },
          "myScore": {
            "__id__": 6
          }
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 265,
        "height": 513
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          3,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "myScore",
      "_parent": {
        "__id__": 4
      },
      "_components": [
        {
          "__id__": 6
        }
      ],
      "_color": {
        "__type__": "cc.Color"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "height": 50.4
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          -260,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 5
      },
      "_materials": [
        {
          "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
        }
      ],
      "_useOriginalSize": false,
      "_N$horizontalAlign": 1,
      "_N$verticalAlign": 1
    },
    {
      "__type__": "cc.Node",
      "_name": "rankingScrollView",
      "_parent": {
        "__id__": 4
      },
      "_children": [
        {
          "__id__": 8
        }
      ],
      "_components": [
        {
          "__id__": 10
        }
      ],
      "_color": {
        "__type__": "cc.Color",
        "r": 184,
        "g": 184,
        "b": 184
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 720,
        "height": 440
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          30,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "view",
      "_parent": {
        "__id__": 7
      },
      "_children": [
        {
          "__id__": 9
        }
      ],
      "_components": [
        {
          "__type__": "cc.Mask",
          "node": {
            "__id__": 8
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_N$alphaThreshold": 1
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 440
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "scrollViewContent",
      "_parent": {
        "__id__": 8
      },
      "_components": [
        {
          "__type__": "cc.Layout",
          "node": {
            "__id__": 9
          },
          "_layoutSize": {
            "__type__": "cc.Size",
            "width": 600,
            "height": 90
          },
          "_resize": 1,
          "_N$layoutType": 2
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 90
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -3.31,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.ScrollView",
      "node": {
        "__id__": 7
      },
      "horizontal": false,
      "brake": 0.75,
      "elastic": false,
      "bounceDuration": 0.23,
      "_N$content": {
        "__id__": 9
      },
      "content": {
        "__id__": 9
      },
      "_N$horizontalScrollBar": null,
      "_N$verticalScrollBar": null
    }
  ],
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-3d-particle",
    "techniques": [
      {
        "name": "add",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 1,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 1
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-particle|particle-vs-legacy:lpvs_main|tinted-fs:add"
          }
        ]
      },
      {
        "name": "alpha-blend",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 771,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-particle|particle-vs-legacy:lpvs_main|tinted-fs:add"
          }
        ]
      },
      {
        "name": "add-multiply",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 771,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-particle|particle-vs-legacy:lpvs_main|tinted-fs:multiply"
          }
        ]
      },
      {
        "name": "add-smooth",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 771,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              }
            },
            "program": "builtin-3d-particle|particle-vs-legacy:lpvs_main|no-tint-fs:addSmooth"
          }
        ]
      },
      {
        "name": "premultiply-blend",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 771,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              }
            },
            "program": "builtin-3d-particle|particle-vs-legacy:lpvs_main|no-tint-fs:premultiplied"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 1682193167,
        "glsl3": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nin vec3 a_position;\nin vec3 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    in vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    in vec3 a_texCoord3;\n    in vec3 a_normal;\n    in vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture(mainTexture, uv);\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = add(); }"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform vec4 mainTiling_Offset;\nuniform vec4 frameTile_velLenScale;\nuniform vec4 scale;\nuniform mat4 cc_matView;\nuniform mat4 cc_matViewInv;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nattribute vec3 a_position;\nattribute vec3 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    attribute vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    attribute vec3 a_texCoord3;\n    attribute vec3 a_normal;\n    attribute vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture2D(mainTexture, uv);\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = add(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_STRETCHED_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_HORIZONTAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_VERTICAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_MESH",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          },
          {
            "name": "FragConstants",
            "members": [
              {
                "name": "tintColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 1
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-particle|particle-vs-legacy:lpvs_main|tinted-fs:add"
      },
      {
        "hash": 1933642753,
        "glsl3": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nin vec3 a_position;\nin vec3 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    in vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    in vec3 a_texCoord3;\n    in vec3 a_normal;\n    in vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = multiply(); }"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform vec4 mainTiling_Offset;\nuniform vec4 frameTile_velLenScale;\nuniform vec4 scale;\nuniform mat4 cc_matView;\nuniform mat4 cc_matViewInv;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nattribute vec3 a_position;\nattribute vec3 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    attribute vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    attribute vec3 a_texCoord3;\n    attribute vec3 a_normal;\n    attribute vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture2D(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = multiply(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_STRETCHED_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_HORIZONTAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_VERTICAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_MESH",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          },
          {
            "name": "FragConstants",
            "members": [
              {
                "name": "tintColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 1
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-particle|particle-vs-legacy:lpvs_main|tinted-fs:multiply"
      },
      {
        "hash": 1851787849,
        "glsl3": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nin vec3 a_position;\nin vec3 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    in vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    in vec3 a_texCoord3;\n    in vec3 a_normal;\n    in vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = addSmooth(); }"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform vec4 mainTiling_Offset;\nuniform vec4 frameTile_velLenScale;\nuniform vec4 scale;\nuniform mat4 cc_matView;\nuniform mat4 cc_matViewInv;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nattribute vec3 a_position;\nattribute vec3 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    attribute vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    attribute vec3 a_texCoord3;\n    attribute vec3 a_normal;\n    attribute vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture2D(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = addSmooth(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_STRETCHED_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_HORIZONTAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_VERTICAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_MESH",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-particle|particle-vs-legacy:lpvs_main|no-tint-fs:addSmooth"
      },
      {
        "hash": 145387972,
        "glsl3": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nin vec3 a_position;\nin vec3 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    in vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    in vec3 a_texCoord3;\n    in vec3 a_normal;\n    in vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = premultiplied(); }"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nvec4 quaternionFromAxis(vec3 xAxis,vec3 yAxis,vec3 zAxis){\n    mat3 m = mat3(xAxis,yAxis,zAxis);\n    float trace = m[0][0] + m[1][1] + m[2][2];\n    vec4 quat;\n    if (trace > 0.) {\n        float s = 0.5 / sqrt(trace + 1.0);\n        quat.w = 0.25 / s;\n        quat.x = (m[2][1] - m[1][2]) * s;\n        quat.y = (m[0][2] - m[2][0]) * s;\n        quat.z = (m[1][0] - m[0][1]) * s;\n    } else if ((m[0][0] > m[1][1]) && (m[0][0] > m[2][2])) {\n        float s = 2.0 * sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);\n        quat.w = (m[2][1] - m[1][2]) / s;\n        quat.x = 0.25 * s;\n        quat.y = (m[0][1] + m[1][0]) / s;\n        quat.z = (m[0][2] + m[2][0]) / s;\n    } else if (m[1][1] > m[2][2]) {\n        float s = 2.0 * sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);\n        quat.w = (m[0][2] - m[2][0]) / s;\n        quat.x = (m[0][1] + m[1][0]) / s;\n        quat.y = 0.25 * s;\n        quat.z = (m[1][2] + m[2][1]) / s;\n    } else {\n        float s = 2.0 * sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);\n        quat.w = (m[1][0] - m[0][1]) / s;\n        quat.x = (m[0][2] + m[2][0]) / s;\n        quat.y = (m[1][2] + m[2][1]) / s;\n        quat.z = 0.25 * s;\n    }\n    float len = quat.x * quat.x + quat.y * quat.y + quat.z * quat.z + quat.w * quat.w;\n    if (len > 0.) {\n        len = 1. / sqrt(len);\n        quat.x = quat.x * len;\n        quat.y = quat.y * len;\n        quat.z = quat.z * len;\n        quat.w = quat.w * len;\n    }\n    return quat;\n}\nvec4 quaternionFromEuler(vec3 angle){\n    float x = angle.x / 2.;\n    float y = angle.y / 2.;\n    float z = angle.z / 2.;\n    float sx = sin(x);\n    float cx = cos(x);\n    float sy = sin(y);\n    float cy = cos(y);\n    float sz = sin(z);\n    float cz = cos(z);\n    vec4 quat = vec4(0);\n    quat.x = sx * cy * cz + cx * sy * sz;\n    quat.y = cx * sy * cz + sx * cy * sz;\n    quat.z = cx * cy * sz - sx * sy * cz;\n    quat.w = cx * cy * cz - sx * sy * sz;\n    return quat;\n}\nmat4 matrixFromRT(vec4 q, vec3 p){\n    float x2 = q.x + q.x;\n    float y2 = q.y + q.y;\n    float z2 = q.z + q.z;\n    float xx = q.x * x2;\n    float xy = q.x * y2;\n    float xz = q.x * z2;\n    float yy = q.y * y2;\n    float yz = q.y * z2;\n    float zz = q.z * z2;\n    float wx = q.w * x2;\n    float wy = q.w * y2;\n    float wz = q.w * z2;\n    return mat4(\n        1. - (yy + zz), xy + wz, xz - wy, 0,\n        xy - wz, 1. - (xx + zz), yz + wx, 0,\n        xz + wy, yz - wx, 1. - (xx + yy), 0,\n        p.x, p.y, p.z, 1\n    );\n}\nmat4 matFromRTS(vec4 q, vec3 t, vec3 s){\n    float x = q.x, y = q.y, z = q.z, w = q.w;\n    float x2 = x + x;\n    float y2 = y + y;\n    float z2 = z + z;\n    float xx = x * x2;\n    float xy = x * y2;\n    float xz = x * z2;\n    float yy = y * y2;\n    float yz = y * z2;\n    float zz = z * z2;\n    float wx = w * x2;\n    float wy = w * y2;\n    float wz = w * z2;\n    float sx = s.x;\n    float sy = s.y;\n    float sz = s.z;\n    return mat4((1. - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,\n        (xy - wz) * sy, (1. - (xx + zz)) * sy, (yz + wx) * sy, 0,\n        (xz + wy) * sz, (yz - wx) * sz, (1. - (xx + yy)) * sz, 0,\n        t.x, t.y, t.z, 1);\n}\nvec4 quatMultiply(vec4 a, vec4 b){\n    vec4 quat;\n    quat.x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;\n    quat.y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;\n    quat.z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;\n    quat.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return quat;\n}\nvoid rotateVecFromQuat(inout vec3 v, vec4 q){\n    float ix = q.w * v.x + q.y * v.z - q.z * v.y;\n    float iy = q.w * v.y + q.z * v.x - q.x * v.z;\n    float iz = q.w * v.z + q.x * v.y - q.y * v.x;\n    float iw = -q.x * v.x - q.y * v.y - q.z * v.z;\n    v.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;\n    v.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;\n    v.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;\n}\nvec3 rotateInLocalSpace(vec3 pos, vec3 xAxis, vec3 yAxis, vec3 zAxis, vec4 q){\n    float z = pos.z;\n    float x = pos.x;\n    float y = pos.y;\n    vec4 viewQuat = quaternionFromAxis(xAxis, yAxis, zAxis);\n    vec4 rotQuat = quatMultiply(viewQuat, q);\n    rotateVecFromQuat(pos, rotQuat);\n    return pos;\n}\nvoid rotateCorner(inout vec2 corner, float angle){\n    float xOS = cos(angle) * corner.x - sin(angle) * corner.y;\n    float yOS = sin(angle) * corner.x + cos(angle) * corner.y;\n    corner.x = xOS;\n    corner.y = yOS;\n}\nuniform vec4 mainTiling_Offset;\nuniform vec4 frameTile_velLenScale;\nuniform vec4 scale;\nuniform mat4 cc_matView;\nuniform mat4 cc_matViewInv;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nvoid computeVertPos(inout vec4 pos, vec2 vertOffset, vec4 q, vec3 s\n#if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n    , mat4 viewInv\n#endif\n#if CC_USE_STRETCHED_BILLBOARD\n    , vec3 eye\n    , vec4 velocity\n    , float velocityScale\n    , float lengthScale\n    , float xIndex\n#endif\n) {\n#if CC_USE_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = normalize(vec3(viewInv[0][0], viewInv[1][0], viewInv[2][0]));\n    vec3 camY = normalize(vec3(viewInv[0][1], viewInv[1][1], viewInv[2][1]));\n    vec3 camZ = normalize(vec3(viewInv[0][2], viewInv[1][2], viewInv[2][2]));\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, camZ, q);\n#elif CC_USE_STRETCHED_BILLBOARD\n    vec3 camRight = normalize(cross(pos.xyz - eye, velocity.xyz)) * s.x;\n    vec3 camUp = velocity.xyz * velocityScale + normalize(velocity.xyz) * lengthScale * s.y;\n    pos.xyz += (camRight * abs(vertOffset.x) * sign(vertOffset.y)) - camUp * xIndex;\n#elif CC_USE_HORIZONTAL_BILLBOARD\n    vec3 viewSpaceVert = vec3(vertOffset.x * s.x, vertOffset.y * s.y, 0.);\n    vec3 camX = vec3(1, 0, 0);\n    vec3 camY = vec3(0, 0, -1);\n    pos.xyz += rotateInLocalSpace(viewSpaceVert, camX, camY, cross(camX, camY), q);\n#elif CC_USE_VERTICAL_BILLBOARD\n    vec2 viewSpaceVert = vec2(vertOffset.x * s.x, vertOffset.y * s.y);\n    rotateCorner(viewSpaceVert, q.z);\n    vec3 camX = normalize(vec3(cc_matView[0][0], cc_matView[1][0], cc_matView[2][0]));\n    vec3 camY = vec3(0, 1, 0);\n    vec3 offset = camX * viewSpaceVert.x + camY * viewSpaceVert.y;\n    pos.xyz += offset;\n#else\n    pos.x += vertOffset.x;\n    pos.y += vertOffset.y;\n#endif\n}\nvec2 computeUV(float frameIndex, vec2 vertIndex, vec2 frameTile){\n    vec2 aniUV = vec2(0, floor(frameIndex * frameTile.y));\n    aniUV.x = floor(frameIndex * frameTile.x * frameTile.y - aniUV.y * frameTile.x);\n#if !CC_USE_MESH\n    vertIndex.y = 1. - vertIndex.y;\n#endif\n    return (aniUV.xy + vertIndex) / vec2(frameTile.x, frameTile.y);\n}\nattribute vec3 a_position;\nattribute vec3 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_USE_STRETCHED_BILLBOARD\n    attribute vec3 a_color1;\n#endif\n#if CC_USE_MESH\n    attribute vec3 a_texCoord3;\n    attribute vec3 a_normal;\n    attribute vec4 a_color1;\n#endif\nvec4 lpvs_main() {\n    vec3 compScale = scale.xyz * a_texCoord1;\n    vec4 pos = vec4(a_position, 1);\n#if CC_USE_STRETCHED_BILLBOARD\n    vec4 velocity = vec4(a_color1.xyz, 0);\n#endif\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    #if CC_USE_STRETCHED_BILLBOARD\n        velocity = cc_matWorld * velocity;\n    #endif\n#endif\n#if !CC_USE_MESH\n    vec2 cornerOffset = vec2((a_texCoord.xy - 0.5));\n    #if CC_USE_BILLBOARD\n        vec3 rotEuler = a_texCoord2;\n    #elif CC_USE_STRETCHED_BILLBOARD\n        vec3 rotEuler = vec3(0.);\n    #else\n        vec3 rotEuler = vec3(0., 0., a_texCoord2.z);\n    #endif\n    computeVertPos(pos, cornerOffset, quaternionFromEuler(rotEuler), compScale\n    #if CC_USE_BILLBOARD || CC_USE_VERTICAL_BILLBOARD\n        , cc_matViewInv\n    #endif\n    #if CC_USE_STRETCHED_BILLBOARD\n        , cc_cameraPos.xyz\n        , velocity\n        , frameTile_velLenScale.z\n        , frameTile_velLenScale.w\n        , a_texCoord.x\n    #endif\n    );\n    color = a_color;\n#else\n    mat4 xformNoScale = matrixFromRT(quaternionFromEuler(a_texCoord2), pos.xyz);\n    mat4 xform = matFromRTS(quaternionFromEuler(a_texCoord2), pos.xyz, compScale);\n    pos = xform * vec4(a_texCoord3, 1);\n    vec4 normal = xformNoScale * vec4(a_normal, 0);\n    color = a_color * a_color1;\n#endif\n    uv = computeUV(a_texCoord.z, a_texCoord.xy, frameTile_velLenScale.xy) * mainTiling_Offset.xy + mainTiling_Offset.zw;\n    pos = cc_matViewProj * pos;\n    return pos;\n}\nvoid main() { gl_Position = lpvs_main(); }",
          "frag": "\nprecision highp float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture2D(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = premultiplied(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_STRETCHED_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_HORIZONTAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_VERTICAL_BILLBOARD",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_MESH",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-particle|particle-vs-legacy:lpvs_main|no-tint-fs:premultiplied"
      }
    ]
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-clear-stencil",
    "techniques": [
      {
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "program": "builtin-clear-stencil|vs|fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 2075641479,
        "glsl3": {
          "vert": "\nprecision highp float;\nin vec3 a_position;\nvoid main () {\n  gl_Position = vec4(a_position, 1);\n}",
          "frag": "\nprecision highp float;\nvoid main () {\n  gl_FragColor = vec4(1.0);\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nattribute vec3 a_position;\nvoid main () {\n  gl_Position = vec4(a_position, 1);\n}",
          "frag": "\nprecision highp float;\nvoid main () {\n  gl_FragColor = vec4(1.0);\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [],
            "samplers": []
          },
          "locals": {
            "blocks": [],
            "samplers": []
          }
        },
        "defines": [],
        "blocks": [],
        "samplers": [],
        "record": null,
        "name": "builtin-clear-stencil|vs|fs"
      }
    ]
  },
  [
    {
      "__type__": "cc.Prefab",
      "_name": "RankItem",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "RankItem",
      "_children": [
        {
          "__id__": 2
        },
        {
          "__id__": 3
        },
        {
          "__id__": 5
        },
        {
          "__id__": 7
        },
        {
          "__id__": 9
        }
      ],
      "_components": [
        {
          "__type__": "0c1cd8aKgxMl7vTM0wrjXeF",
          "node": {
            "__id__": 1
          },
          "backSprite": {
            "__id__": 2
          },
          "rankLabel": {
            "__id__": 4
          },
          "avatarImgSprite": {
            "__id__": 6
          },
          "nickLabel": {
            "__id__": 8
          },
          "topScoreLabel": {
            "__id__": 10
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "a0nzpWj15Nq4AGs5/KLxkD"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 90
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "backSprite",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 2
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "e2jukjVt1Lk4oJcHeUYrvc"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 600,
        "height": 90
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "rankLabel",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__id__": 4
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "beo2tu8dJDz7rSnz+XUPMa"
      },
      "_color": {
        "__type__": "cc.Color"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 22.25,
        "height": 50.4
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -270,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 3
      },
      "_materials": [
        {
          "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
        }
      ],
      "_useOriginalSize": false,
      "_string": "1",
      "_N$string": "1",
      "_N$horizontalAlign": 1,
      "_N$verticalAlign": 1
    },
    {
      "__type__": "cc.Node",
      "_name": "avatarImgSprite",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__id__": 6
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "3dYVBX29tAPom5C9WoQzoD"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 40,
        "height": 40
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -201,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Sprite",
      "node": {
        "__id__": 5
      },
      "_materials": [
        {
          "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
        }
      ],
      "_sizeMode": 0
    },
    {
      "__type__": "cc.Node",
      "_name": "nickLabel",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__id__": 8
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "9aVjBIY1xBAodoDMhh6rKI"
      },
      "_color": {
        "__type__": "cc.Color"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 160,
        "height": 50.4
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -90,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 7
      },
      "_materials": [
        {
          "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
        }
      ],
      "_useOriginalSize": false,
      "_string": "追风少年",
      "_N$string": "追风少年",
      "_N$horizontalAlign": 1,
      "_N$verticalAlign": 1
    },
    {
      "__type__": "cc.Node",
      "_name": "topScoreLabel",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__id__": 10
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "5eIlJU0ZdHb7hC/NaARteW"
      },
      "_color": {
        "__type__": "cc.Color",
        "r": 228,
        "g": 42,
        "b": 183
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 111.23,
        "height": 50.4
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          180,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Label",
      "node": {
        "__id__": 9
      },
      "_materials": [
        {
          "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
        }
      ],
      "_useOriginalSize": false,
      "_string": "12300",
      "_N$string": "12300",
      "_N$horizontalAlign": 1,
      "_N$verticalAlign": 1
    }
  ],
  {
    "__type__": "cc.Material",
    "_name": "builtin-clear-stencil",
    "_effectAsset": {
      "__uuid__": "c0BAyVxX9JzZy8EjFrc9DU"
    },
    "_techniqueData": {}
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-2d-sprite",
    "_effectAsset": {
      "__uuid__": "28dPjdQWxEQIG3VVl1Qm6T"
    },
    "_techniqueData": {
      "0": {
        "defines": {
          "USE_TEXTURE": true
        }
      }
    }
  }
];
