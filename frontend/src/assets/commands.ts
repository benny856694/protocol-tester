const commands: { [index: string]: { [index: string]: object } } = {
  "人员管理": {
    "upload person(无图注册)": {
      "cmd": "upload person",
      "id": "0001",
      "name": "XiaoMing",
      "role": 1,
      "kind": 2,
    },
    "upload person(有图注册)": {
      "version": "0.9",
      "cmd": "upload person",
      "id": "test",
      "name": "测试人员",
      "role": 1,
      "reg_image": "",
      "wg_card_id": 0,
      "term": "forever",
      "term_start": "useless",
    },
    "request person(查询人员)": {
      "cmd": "request persons",
      "role": -1,
      "page_no": 1,
      "page_size": 10,
      "nomal_image_flag": 1,
      "image_flag": 1,
      "query_mode": 1,
      "condition": {
        "person_name": "",
      },
    },
    "get allpersonid(获取所有人员ID)": {
      "cmd": "get allpersonid",
    },
    "delete person(s)(删除人员)": {
      "cmd": "delete person(s)",
      "flag": -1,
      "id": "123aa",
    },
    "img to feature(获取特征值数据)": {
      "cmd": "img to feature",
      "data": [
        {
          "uid": "123465",
          "image": "",
        },
      ],
    },
    "register by feature(注册特征值数据)": {
      "cmd": "register by feature",
      "version": "EV500",
      "feature":
        "APAbAgoS0gAf4gu+9gn07PXlyjMU+NsO9Q3tBi/t//klFuwJ89IDC/kqAesO/ePj9s0h3/L8BuwDBv8T//T/5rrg2QT53+747/0CCw0Y7RcWBwsMA9oPCxoi6vb3Fwng+jD1HtXsBwoW5cgv8g/WCAgX+O//LRAW8Mfv0BoP+Rb9CPvx7P7t8Cr57xztD/0C7/n8Fxj78eXn9xsbCSnaHSj94gEC+CMIKvoi7u8DDCD96fMnD9jjGQjxBhQB9Cb8+ycC9f/e7Q77A/YxK+T29f7+DObt/Av+8P8nAPHpAwAnDAb67+n8FB4C8swM/CDV5jfxAwXu7PH6BRYlFRgA+tepBC07",
      "id": "123321",
      "name": "ysx",
      "role": 1,
    },
  },
  "设备控制": {
    "gpio control(开闸)": {
      "cmd": "gpio control",
      "port": 1,
      "ctrl_type": "on",
      "ctrl_mode": "force",
      "person_id": "0001",
    },
    "gpio control Extend(开闸+语音)": {
      "cmd": "gpio control Extend",
      "port": 1,
      "ctrl_type": "on",
      "ctrl_mode": "force",
      "person_id": "0001",
      "voicePlay": "No0.pass.wav",
    },
    "tts play(tts播放)": {
      "cmd": "tts play",
      "text": "TTS播放",
    },
    "text display(文字显示)": {
      "cmd": "text display",
      "coding_type": "utf8",
      "text_list": [
        {
          "position": {
            x: 0,
            y: 500,
          },
          "alive_time": 1000,
          "font_size": 100,
          "font_spacing": 1,
          "font_color": "0xffffffff",
          "text": "你好",
        },
        {
          "position": {
            x: 0,
            y: 610,
          },
          "alive_time": 1000,
          "font_size": 100,
          "font_spacing": 1,
          "font_color": "0xff00ff00",
          "text": "消费100",
        },
      ],
    },
    "image display(图片显示)": {
      "cmd": "image display",
      "position": {
        x: 20,
        y: 20,
      },
      "alive_time": 5000,
      "format": "jpg",
      "image_data": "",
    },
    "snap shot(截图)": {
      "cmd": "snapshot",
    },
    "wiegand control(韦根控制)": {
      "cmd": "wiegand control",
      "wiegand_card_no": 0,
      "long_card_id": 9223372036854775807,
      "ctrl_mode": "force",
      "person_id": "0001",
    },
  },
  "设备参数": {
    "request app params(请求应用参数)": {
      "cmd": "request app params",
    },
    "camera volume(相机音量)": {
      "cmd": "camera volume",
      "method": "SET",
      "volume": 50,
    },
    "reset app param(重置应用参数)": {
      "cmd": "reset app params",
    },
    "update app params(更新应用参数)": {
      "auth": {
        "enable": false,
        "password": "admin",
        "username": "admin",
      },
      "cmd": "update app params",
      "code": 0,
      "device_info": {
        "addr_name": "addr_name_test",
        "addr_no": "addr_no_test",
        "device_no": "",
      },
      "extranet": {
        "enable": true,
        "mode": "tcp",
        "server_domain": "a.b.com",
        "server_port": 10001,
      },
      "face": {
        "alive_level": 1,
        "audio_flip_interval": 0,
        "body_temperature": {
          "correction_value": 0.0,
          "enable": false,
          "fahrenheit_unit": false,
          "fast_mode": false,
          "limit": 37.3,
          "multi_frame_confir": false,
          "outdoor": false,
          "range_max": 42.0,
          "range_min": 35.0,
        },
        "card": {
          "managerCardEnable": false,
          "managerCardExpires": 5,
          "managerCardID": 0,
          "managerCardID_temp": 0,
          "manager_card_id": 0,
          "manager_card_id_temp": 0,
          "regist_user_by_card": false,
          "regist_user_valid_period": 1,
          "tempUserDuration": 60,
          "temp_user_duration": 3600,
        },
        "derep_timeout": 3,
        "enable_age": false,
        "enable_alive": false,
        "enable_dereplication": true,
        "enable_mask_inspect": false,
        "enable_match": true,
        "enable_output_feature": false,
        "enable_output_reg": true,
        "enable_same_face_reg": false,
        "enable_sex": false,
        "enable_temperatur": false,
        "hat": {
          "enable": false,
          "must_wear_hat": false,
        },
        "mask": {
          "enable": false,
          "mask_match_enable": true,
          "must_wear_mask": true,
          "no_mask_alarm": false,
        },
        "match_mode": "normal",
        "match_score": 80,
        "min_face_size": 180,
        "must_mask": true,
        "name_privacy": false,
        "pic_form": "closeup",
        "quality": 70,
        "qvalue_threshold": 75,
        "temp_outdoor_mode": false,
        "temperature_limit": 37.3,
        "valid_angle": 36,
        "valid_angle_enable": true,
        "valid_qvalue_enable": false,
        "work_mode": "offline",
      },
      "gate_control": {
        "gate_mode": 1,
        "gpio_linked": true,
        "gpio_retention_time": 1000,
        "gpio_state": 1,
        "match_mode": 3,
        "output_mode": "gpio",
        "wg_create_id_begin": 10,
        "wg_create_id_end": 20000,
        "wg_id_public": 8,
        "wg_linked": false,
        "wg_protocol": "wg26",
      },
      "language": 0,
      "lcd_control": {
        "lcd_display_item": 4294967295,
        "lcd_title": "",
        "led_mirror": true,
      },
      "led_control": {
        "led_brightness": 70,
        "led_mode": 3,
        "led_sensitivity": "mid",
      },
      "name_list": {
        "auto_clean": false,
      },
      "ntp": {
        "enable": false,
        "server_domain": "ntp1.aliyun.com",
        "update_cycle": 60,
      },
      "qr_code_control": {
        "enable": true,
        "repeat_interval": 0,
      },
      "record": {
        "resume_enable": true,
        "save_enable": true,
        "save_path": "EMMC",
      },
      "remote_upgrader": {
        "enable": false,
        "server_ip": "",
        "server_port": 0,
        "server_uri": "",
      },
      "reply": "ACK",
      "upload_info": {
        "method": "tcp",
        "server_domain": "a.c.com",
        "server_port": 10002,
      },
    },
    "Visitor Qrcode config(设置二维码参数)": {
      "cmd": "Visitor Qrcode config",
      "community_id": 1,
      "KeySecret": "567502e0e087c22b",
    },
  },
  "调度管理": {
    "request shedule param(查询调度规则)": {
      "cmd": "request schedule params",
    },

    "update shedule param(更新调度规则)": {
      "cmd": "update schedule params",
      "kinds": [
        {
          "name": "按天调度示例",
          "kind": 1,
          "mode": "daily",
          "days": [
            {
              "sections": [
                {
                  "start": {
                    "hour": 0,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 12,
                    "minute": 59,
                  },
                },
                {
                  "start": {
                    "hour": 13,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 59,
                  },
                },
              ],
            },
          ],
        },
        {
          "name": "按周调度示例",
          "kind": 2,
          "mode": "weekly",
          "days": [
            {
              "sections": [
                {
                  "start": {
                    "hour": 0,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 59,
                  },
                },
              ],
            },
            {
              "sections": [
                {
                  "start": {
                    "hour": 3,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 20,
                    "minute": 0,
                  },
                },
              ],
            },
            {
              "sections": [
                {
                  "start": {
                    "hour": 4,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 0,
                  },
                },
              ],
            },
            {
              "sections": [
                {
                  "start": {
                    "hour": 6,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 20,
                    "minute": 0,
                  },
                },
                {
                  "start": {
                    "hour": 23,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 10,
                  },
                },
              ],
            },
            {
              "sections": [
                {
                  "start": {
                    "hour": 0,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 59,
                  },
                },
              ],
            },
            {
              "sections": [
                {
                  "start": {
                    "hour": 0,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 59,
                  },
                },
              ],
            },
            {
              "sections": [
                {
                  "start": {
                    "hour": 0,
                    "minute": 0,
                  },
                  "end": {
                    "hour": 23,
                    "minute": 59,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    "set params(节假日规则)": {
      "cmd": "set params",
      "params": {
        "Festival": {
          "festival_num": 1,
          "festival_txt_0": "国庆节",
          "festival_term_start_0": 1696089600,
          "festival_term_end_0": 1696608000,
        },
      },
    },
  },
  "抓拍管理": {
    "delete record(删除抓拍记录)": {
      "cmd": "delete record",
      "sequnce": 24,
    },
    "request records(查询抓拍记录)": {
      "cmd": "request records",
      "page_no": 1,
      "page_size": 20,
      "face_image_flag": 1,
      "reg_image_flag": 0,
      "upload_state": 0,
      "fuzzy_flag": 1,
      "name": "林星",
    },
  },
  "设备时间": {
    "request date time(请求时间)": {
      "cmd": "request date time",
    },
    "update date time(更新时间)": {
      "cmd": "update date time",
      date_time: "2018/11/23 16:00:00",
      "timezone": "UTC+8",
      "12hour_time": false,
      "auto_dst": false,
    },
  },
  "设备授权": {
    "authorization(旧命令授权)": {
      "cmd": "authorization",
      "auth_id": 2,
      "auth_code": "xxxxxxxxxxx",
    },
    "func auth(新命令授权)": {
      "cmd": "func auth",
      "functionNo": 2,
      "license": "xxxxxxxxx",
    },
    "inquire authorization(旧命令查询授权状态)": {
      "cmd": "inquire authorization",
      "auth_id": 2,
    },
    "query func auth(新命令查询授权状态)": {
      "cmd": "query func auth",
      "functionNo": 2,
    },
    "func auth cancel(取消授权)": {
      "cmd": "func auth cancel",
      "functionNo": 2,
    },
  },
  "其他功能": {
    "send seial data(发送串口数据)": {
      "cmd": "send serial data",
      "device_no": 1,
      "content": [121, 1, 5, 25, 26],
    },
    "heart beat(心跳)": {
      "addr_name": "150",
      "addr_no": "",
      "cmd": "heart beat",
      "device_no": "",
      "device_sn": "0123E4-FB5BFC-9186EE",
      "ip": "192.168.0.150",
      "version": "0.42",
      "command_id": "",
    },
    "add snap records(考勤补录)": {
      "records": [
        {
          "id": "421202199000000000",
          "name": "张三",
          "image": "",
          "time": 1683620243,
          "worksite_id": "000116",
          "customer_text": "421202199005126215",
        },
      ],
      "cmd": "add snap records",
    },
    "get version(获取版本信息)": {
      "cmd": "get version",
    },
  },
};

export default commands;
